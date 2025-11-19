import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock, User, AlertCircle } from 'lucide-react';
import { api, ApiError } from '../services/api';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // El backend ahora acepta email o username
      const response = await api.post<{
        success: boolean;
        data: {
          user: { id: number; username: string; email: string; role: string };
          tokens: { accessToken: string; refreshToken: string };
        };
      }>('/auth/login', { email: username, password }, { skipAuth: true });

      if (response.success && response.data) {
        localStorage.setItem('accessToken', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLogin();
      } else {
        setError('Error al iniciar sesión. Intenta nuevamente.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof ApiError) {
        // Mensajes más específicos según el error
        if (err.status === 401) {
          setError('Credenciales inválidas. Verifica tu usuario y contraseña.');
        } else if (err.status === 0) {
          setError('Error de conexión. Verifica que el backend esté corriendo en http://localhost:4000');
        } else if (err.status === 400) {
          setError(err.message || 'Datos inválidos. Verifica el formato de tus credenciales.');
        } else {
          setError(err.message || 'Error al iniciar sesión. Intenta nuevamente.');
        }
      } else {
        setError('Error inesperado. Verifica la consola para más detalles.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003876] to-[#0a5aa8] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760726347919-bad0548803df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwZ292ZXJubWVudCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjM3NjE0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        {/* SUNAT Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-[#003876] rounded-full flex items-center justify-center mb-4">
            <svg viewBox="0 0 100 100" className="w-16 h-16">
              <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="32">
                S
              </text>
            </svg>
          </div>
          <h1 className="text-[#003876] text-center mb-1">SUNAT</h1>
          <p className="text-gray-600 text-center">
            Dashboard de Fiscalización Inteligente
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700">
              Usuario o Email
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="username"
                type="text"
                placeholder="Ingrese su usuario o email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded" />
              Recordarme
            </label>
            <a href="#" className="text-[#003876] hover:underline">
              ¿Olvidó su contraseña?
            </a>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003876] hover:bg-[#002654] text-white py-6 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Acceso institucional autorizado</p>
          <p className="mt-1">© 2025 SUNAT - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}
