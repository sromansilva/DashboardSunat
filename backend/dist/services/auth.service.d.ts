import { UserRole } from '@prisma/client';
interface RegisterInput {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
}
export declare const registerUser: (input: RegisterInput) => Promise<{
    id: number;
    username: string;
    email: string;
    role: import("@prisma/client").$Enums.UserRole;
    createdAt: Date;
}>;
export declare const loginUser: (emailOrUsername: string, password: string) => Promise<{
    user: {
        id: number;
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}>;
export declare const refreshTokens: (userId: number, role: UserRole) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export {};
//# sourceMappingURL=auth.service.d.ts.map