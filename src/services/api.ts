/**
 * Servicio centralizado para llamadas HTTP al backend
 * Maneja autenticación, refresh de tokens y errores
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { skipAuth = false, ...fetchOptions } = options;

  const token = localStorage.getItem('accessToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && !skipAuth && { Authorization: `Bearer ${token}` }),
    ...(fetchOptions.headers as HeadersInit),
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    // Intentar parsear JSON, pero manejar errores si no es JSON válido
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new ApiError(text || 'Error en la respuesta del servidor', response.status);
    }

    // Si el token expiró, intentar refresh
    if (response.status === 401 && !skipAuth && token) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const refreshResponse = await fetch(`${API_BASE}/auth/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem('accessToken', refreshData.data.accessToken);
            localStorage.setItem('refreshToken', refreshData.data.refreshToken);

            // Reintentar request original
            return request<T>(endpoint, options);
          }
        } catch (refreshError) {
          // Refresh falló, limpiar tokens y redirigir a login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
          throw new ApiError('Sesión expirada', 401);
        }
      }
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || 'Error en la petición',
        response.status,
        data.details
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Error de conexión', 0, error);
  }
}

export const api = {
  get: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = unknown>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = unknown>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export { ApiError };

