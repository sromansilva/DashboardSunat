import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FileText, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const kpiData = [
  {
    title: 'Casos en Curso',
    value: '284',
    change: '+12%',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    title: 'Auditorías Completadas',
    value: '1,547',
    change: '+8%',
    icon: CheckCircle,
    color: 'bg-green-500',
  },
  {
    title: 'Alertas Generadas',
    value: '67',
    change: '+23%',
    icon: AlertTriangle,
    color: 'bg-red-500',
  },
  {
    title: 'Nivel de Riesgo Promedio',
    value: '6.8/10',
    change: '-2%',
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
];

const monthlyData = [
  { mes: 'Ene', casos: 245, completados: 198 },
  { mes: 'Feb', casos: 289, completados: 234 },
  { mes: 'Mar', casos: 312, completados: 267 },
  { mes: 'Abr', casos: 298, completados: 289 },
  { mes: 'May', casos: 334, completados: 301 },
  { mes: 'Jun', casos: 356, completados: 324 },
];

const regionData = [
  { region: 'Lima', casos: 456, riesgo: 7.8 },
  { region: 'Arequipa', casos: 234, riesgo: 6.2 },
  { region: 'Cusco', casos: 187, riesgo: 5.9 },
  { region: 'Piura', casos: 156, riesgo: 7.1 },
  { region: 'Trujillo', casos: 143, riesgo: 6.5 },
];

const highRiskCases = [
  { id: '001234', ruc: '20123456789', razonSocial: 'Constructora del Sur SAC', riesgo: 9.2, estado: 'En revisión', sector: 'Construcción' },
  { id: '001235', ruc: '20987654321', razonSocial: 'Importaciones Express EIRL', riesgo: 8.9, estado: 'Alertado', sector: 'Comercio' },
  { id: '001236', ruc: '20456789123', razonSocial: 'Servicios Mineros del Norte SA', riesgo: 8.7, estado: 'En revisión', sector: 'Minería' },
  { id: '001237', ruc: '20789123456', razonSocial: 'Distribuidora Nacional EIRL', riesgo: 8.4, estado: 'Pendiente', sector: 'Comercio' },
  { id: '001238', ruc: '20321654987', razonSocial: 'Exportadora Agrícola SA', riesgo: 8.1, estado: 'En revisión', sector: 'Agricultura' },
];

export default function MainDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                    <p className="text-gray-900 mb-2">{kpi.value}</p>
                    <Badge variant="secondary" className="text-xs">
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className={`${kpi.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Evolución Mensual de Casos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="casos" stroke="#003876" strokeWidth={2} name="Casos Abiertos" />
                <Line type="monotone" dataKey="completados" stroke="#10b981" strokeWidth={2} name="Completados" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Casos por Región</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="casos" fill="#003876" name="Casos" />
                <Bar dataKey="riesgo" fill="#dc2626" name="Riesgo Promedio" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Peru Map Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Mapa de Fiscalización - Zonas Activas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
            {/* Simplified Peru Map Representation */}
            <div className="relative w-full max-w-2xl h-96">
              <svg viewBox="0 0 400 500" className="w-full h-full">
                {/* Simplified Peru outline */}
                <path
                  d="M200,50 L250,80 L280,120 L290,180 L280,250 L260,320 L240,380 L220,440 L200,460 L180,440 L160,380 L140,320 L120,250 L110,180 L120,120 L150,80 Z"
                  fill="#003876"
                  opacity="0.2"
                  stroke="#003876"
                  strokeWidth="2"
                />
                
                {/* Active zones */}
                <circle cx="200" cy="150" r="30" fill="#dc2626" opacity="0.4">
                  <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="230" cy="220" r="20" fill="#f59e0b" opacity="0.4">
                  <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="170" cy="280" r="25" fill="#dc2626" opacity="0.4">
                  <animate attributeName="r" values="25;30;25" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="210" cy="340" r="18" fill="#10b981" opacity="0.4">
                  <animate attributeName="r" values="18;23;18" dur="2s" repeatCount="indefinite" />
                </circle>
                
                {/* Labels */}
                <text x="200" y="145" textAnchor="middle" fill="#1f2937" fontSize="12">Lima</text>
                <text x="230" y="215" textAnchor="middle" fill="#1f2937" fontSize="12">Arequipa</text>
                <text x="170" y="275" textAnchor="middle" fill="#1f2937" fontSize="12">Cusco</text>
                <text x="210" y="335" textAnchor="middle" fill="#1f2937" fontSize="12">Piura</text>
              </svg>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Riesgo Alto</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Riesgo Medio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Riesgo Bajo</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Risk Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contribuyentes con Alto Riesgo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-sm text-gray-600">Caso ID</th>
                  <th className="text-left p-3 text-sm text-gray-600">RUC</th>
                  <th className="text-left p-3 text-sm text-gray-600">Razón Social</th>
                  <th className="text-left p-3 text-sm text-gray-600">Sector</th>
                  <th className="text-left p-3 text-sm text-gray-600">Nivel de Riesgo</th>
                  <th className="text-left p-3 text-sm text-gray-600">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {highRiskCases.map((caso) => (
                  <tr key={caso.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-sm">{caso.id}</td>
                    <td className="p-3 text-sm">{caso.ruc}</td>
                    <td className="p-3 text-sm">{caso.razonSocial}</td>
                    <td className="p-3 text-sm">{caso.sector}</td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[100px] h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${caso.riesgo >= 8.5 ? 'bg-red-500' : 'bg-orange-500'}`}
                            style={{ width: `${caso.riesgo * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-900">{caso.riesgo}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">
                      <Badge 
                        variant={caso.estado === 'Alertado' ? 'destructive' : 'secondary'}
                      >
                        {caso.estado}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
