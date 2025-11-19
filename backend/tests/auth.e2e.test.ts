import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/app';
import prisma from '../src/config/prisma';

jest.mock('../src/config/prisma', () => {
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
    },
    $queryRaw: jest.fn(),
  };

  return {
    __esModule: true,
    default: mockPrisma,
  };
});

const mockPrisma = prisma as unknown as {
  user: { findUnique: jest.Mock };
  $queryRaw: jest.Mock;
};

const buildUser = async (password: string) => ({
  id: 1,
  username: 'admin',
  email: 'admin@sunat.pe',
  passwordHash: await bcrypt.hash(password, 10),
  role: 'admin',
  createdAt: new Date(),
});

describe('Auth & Security flows', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects login when user does not exist', async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'missing@test.com', password: 'Secret123!' });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('rejects login when password is invalid', async () => {
    const user = await buildUser('Correct$123');
    mockPrisma.user.findUnique.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: 'WrongPassword1!' });

    expect(mockPrisma.user.findUnique).toHaveBeenCalled();
    expect(response.status).toBe(401);
  });

  it('returns tokens when credentials are valid', async () => {
    const user = await buildUser('Correct$123');
    mockPrisma.user.findUnique.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: 'Correct$123' });

    expect(response.status).toBe(200);
    expect(response.body.data.tokens.accessToken).toBeDefined();
    expect(response.body.data.tokens.refreshToken).toBeDefined();
  });

  it('blocks access to protected endpoint without token', async () => {
    const response = await request(app).get('/api/v1/system/protected-ping');
    expect(response.status).toBe(401);
  });

  it('blocks access with invalid token and allows with valid token', async () => {
    const user = await buildUser('Correct$123');
    mockPrisma.user.findUnique.mockResolvedValue(user);

    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: 'Correct$123' });

    const token = loginResponse.body.data.tokens.accessToken;
    expect(token).toBeTruthy();

    const invalidResponse = await request(app)
      .get('/api/v1/system/protected-ping')
      .set('Authorization', 'Bearer invalid');
    expect(invalidResponse.status).toBe(401);

    const validResponse = await request(app)
      .get('/api/v1/system/protected-ping')
      .set('Authorization', `Bearer ${token}`);

    expect(validResponse.status).toBe(200);
  });

  it('verifies Neon connectivity via /test-db', async () => {
    const now = new Date('2025-01-01T00:00:00Z');
    mockPrisma.$queryRaw.mockResolvedValueOnce([{ now }]);

    const response = await request(app).get('/api/v1/system/test-db');
    expect(response.status).toBe(200);
    expect(response.body.data.timestamp).toBe(now.toISOString());
  });
});

