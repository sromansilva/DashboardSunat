import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
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
              Usuario
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="username"
                type="text"
                placeholder="Ingrese su usuario"
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

          <Button
            type="submit"
            className="w-full bg-[#003876] hover:bg-[#002654] text-white py-6"
          >
            Iniciar Sesión
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
