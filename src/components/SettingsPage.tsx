import { useState } from 'react';
import { Settings, User, Bell, Shield, Database, Mail, Lock, Globe, Palette, Zap, Save, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';
import { Slider } from './ui/slider';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [monthlyReports, setMonthlyReports] = useState(true);
  const [autoAssignCases, setAutoAssignCases] = useState(false);
  const [aiAnalytics, setAiAnalytics] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState([30]);
  const [riskThreshold, setRiskThreshold] = useState([70]);

  const handleSaveSettings = () => {
    toast.success('Configuración guardada exitosamente');
  };

  const handleResetSettings = () => {
    toast.info('Configuración restablecida a valores predeterminados');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#003876]">Configuración del Sistema</h1>
          <p className="text-gray-600">Personaliza tu experiencia y gestiona preferencias</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetSettings}>
            Restablecer
          </Button>
          <Button className="bg-[#003876] hover:bg-[#002555]" onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="system">
            <Database className="w-4 h-4 mr-2" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="w-4 h-4 mr-2" />
            Apariencia
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Zap className="w-4 h-4 mr-2" />
            Avanzado
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza tu información de perfil y datos de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-[#003876] text-white text-2xl">
                    MG
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Cambiar Foto</Button>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG. Máx 2MB</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombres</Label>
                  <Input id="firstName" defaultValue="María" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input id="lastName" defaultValue="González Ramírez" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" defaultValue="maria.gonzalez@sunat.gob.pe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" defaultValue="+51 987 654 321" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input id="position" defaultValue="Auditor Senior" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Input id="department" defaultValue="Fiscalización Tributaria" readOnly />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="office">Oficina</Label>
                <Select defaultValue="lima">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lima">Lima - Oficina Principal</SelectItem>
                    <SelectItem value="callao">Callao</SelectItem>
                    <SelectItem value="arequipa">Arequipa</SelectItem>
                    <SelectItem value="cusco">Cusco</SelectItem>
                    <SelectItem value="trujillo">Trujillo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Gestiona cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones por Email</Label>
                    <p className="text-sm text-gray-500">Recibe alertas y actualizaciones por correo electrónico</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones Push</Label>
                    <p className="text-sm text-gray-500">Recibe notificaciones en tiempo real en el navegador</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas Críticas</Label>
                    <p className="text-sm text-gray-500">Notificaciones inmediatas para casos de alta prioridad</p>
                  </div>
                  <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm mb-4">Reportes Automáticos</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reporte Semanal</Label>
                      <p className="text-sm text-gray-500">Resumen de actividades cada lunes</p>
                    </div>
                    <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reporte Mensual</Label>
                      <p className="text-sm text-gray-500">Informe completo el primer día de cada mes</p>
                    </div>
                    <Switch checked={monthlyReports} onCheckedChange={setMonthlyReports} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Correo para Notificaciones</Label>
                <Input type="email" defaultValue="maria.gonzalez@sunat.gob.pe" />
                <p className="text-sm text-gray-500">Se enviarán copias a este correo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>Protege tu cuenta y datos personales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm mb-4">Cambiar Contraseña</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña Actual</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button variant="outline">Actualizar Contraseña</Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticación de Dos Factores</Label>
                    <p className="text-sm text-gray-500">Agrega una capa extra de seguridad a tu cuenta</p>
                  </div>
                  <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Tiempo de Inactividad (minutos)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={sessionTimeout}
                      onValueChange={setSessionTimeout}
                      max={120}
                      min={5}
                      step={5}
                      className="flex-1"
                    />
                    <span className="w-12 text-sm text-gray-600">{sessionTimeout[0]} min</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Cerrar sesión automáticamente después de este tiempo de inactividad
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm mb-3">Sesiones Activas</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm">Windows - Chrome</p>
                      <p className="text-xs text-gray-500">Lima, Perú - Activa ahora</p>
                    </div>
                    <Button variant="outline" size="sm">Cerrar</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm">Android - Mobile App</p>
                      <p className="text-xs text-gray-500">Lima, Perú - Hace 2 horas</p>
                    </div>
                    <Button variant="outline" size="sm">Cerrar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>Ajusta el comportamiento del sistema de fiscalización</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Asignación Automática de Casos</Label>
                    <p className="text-sm text-gray-500">Distribuir casos nuevos automáticamente entre auditores</p>
                  </div>
                  <Switch checked={autoAssignCases} onCheckedChange={setAutoAssignCases} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IA Analítica Habilitada</Label>
                    <p className="text-sm text-gray-500">Usar inteligencia artificial para detección de patrones</p>
                  </div>
                  <Switch checked={aiAnalytics} onCheckedChange={setAiAnalytics} />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Umbral de Riesgo para Alertas Automáticas</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={riskThreshold}
                      onValueChange={setRiskThreshold}
                      max={100}
                      min={0}
                      step={5}
                      className="flex-1"
                    />
                    <span className="w-12 text-sm text-gray-600">{riskThreshold[0]}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Generar alerta automática cuando el score de riesgo supere este valor
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Región/Idioma</Label>
                  <Select defaultValue="es-pe">
                    <SelectTrigger>
                      <Globe className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es-pe">Español (Perú)</SelectItem>
                      <SelectItem value="es">Español (España)</SelectItem>
                      <SelectItem value="en">English (US)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Zona Horaria</Label>
                  <Select defaultValue="america-lima">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-lima">(GMT-5) Lima</SelectItem>
                      <SelectItem value="america-bogota">(GMT-5) Bogotá</SelectItem>
                      <SelectItem value="america-mexico">(GMT-6) Ciudad de México</SelectItem>
                      <SelectItem value="america-santiago">(GMT-4) Santiago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Formato de Fecha</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Formato de Moneda</Label>
                  <Select defaultValue="pen">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pen">Soles (S/.)</SelectItem>
                      <SelectItem value="usd">Dólares ($)</SelectItem>
                      <SelectItem value="eur">Euros (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalización de Interfaz</CardTitle>
              <CardDescription>Ajusta la apariencia visual del dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Oscuro</Label>
                  <p className="text-sm text-gray-500">Activar tema oscuro para reducir fatiga visual</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Densidad de Interfaz</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compacto</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="comfortable">Cómodo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tamaño de Fuente</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeña</SelectItem>
                    <SelectItem value="medium">Mediana</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Color de Acento</Label>
                <div className="grid grid-cols-6 gap-3">
                  {[
                    { name: 'Azul SUNAT', color: '#003876' },
                    { name: 'Azul', color: '#0066CC' },
                    { name: 'Verde', color: '#10B981' },
                    { name: 'Rojo', color: '#E74C3C' },
                    { name: 'Morado', color: '#8B5CF6' },
                    { name: 'Naranja', color: '#F59E0B' },
                  ].map((item) => (
                    <button
                      key={item.name}
                      className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                      style={{ backgroundColor: item.color }}
                      title={item.name}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Página de Inicio Predeterminada</Label>
                <Select defaultValue="dashboard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard Principal</SelectItem>
                    <SelectItem value="casos">Casos</SelectItem>
                    <SelectItem value="contribuyentes">Contribuyentes</SelectItem>
                    <SelectItem value="alertas">Alertas</SelectItem>
                    <SelectItem value="reportes">Reportes</SelectItem>
                    <SelectItem value="ia-analytics">IA Analítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración Avanzada</CardTitle>
              <CardDescription>Opciones para usuarios avanzados y administradores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Estas opciones son para usuarios avanzados. Cambios incorrectos pueden afectar el funcionamiento del sistema.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm mb-3">Base de Datos</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">Sincronización de Datos</p>
                        <p className="text-xs text-gray-500">Última sincronización: Hace 5 minutos</p>
                      </div>
                      <Button variant="outline" size="sm">Sincronizar Ahora</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">Respaldo de Base de Datos</p>
                        <p className="text-xs text-gray-500">Último respaldo: Hoy 02:00 AM</p>
                      </div>
                      <Button variant="outline" size="sm">Crear Respaldo</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm mb-3">Integraciones</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">API SUNAT</p>
                        <p className="text-xs text-gray-500">Estado: Conectado</p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">Sistema de Comprobantes Electrónicos</p>
                        <p className="text-xs text-gray-500">Estado: Activo</p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">Motor de IA Analítica</p>
                        <p className="text-xs text-gray-500">Versión: 2.4.1</p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm mb-3">Logs y Auditoría</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">Registro de Actividades</p>
                        <p className="text-xs text-gray-500">12,453 eventos registrados hoy</p>
                      </div>
                      <Button variant="outline" size="sm">Ver Logs</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm">Auditoría de Cambios</p>
                        <p className="text-xs text-gray-500">247 cambios en el sistema este mes</p>
                      </div>
                      <Button variant="outline" size="sm">Ver Auditoría</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm mb-3">Mantenimiento</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="w-4 h-4 mr-2" />
                      Limpiar Caché del Sistema
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="w-4 h-4 mr-2" />
                      Optimizar Base de Datos
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Reiniciar Sistema
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Versión del Sistema</p>
                  <p>v3.2.1</p>
                </div>
                <div>
                  <p className="text-gray-600">Última Actualización</p>
                  <p>15 de Febrero, 2024</p>
                </div>
                <div>
                  <p className="text-gray-600">Base de Datos</p>
                  <p>PostgreSQL 14.5</p>
                </div>
                <div>
                  <p className="text-gray-600">Servidor</p>
                  <p>SUNAT-FISC-PROD-01</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
