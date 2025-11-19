import { useState } from 'react';
import { FileText, Download, Filter, Calendar, TrendingUp, Users, DollarSign, AlertTriangle, FileBarChart, Eye, Printer, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Report {
  id: string;
  name: string;
  type: string;
  period: string;
  generatedDate: string;
  generatedBy: string;
  size: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Informe Mensual de Fiscalización - Enero 2024',
    type: 'Mensual',
    period: 'Enero 2024',
    generatedDate: '2024-02-01',
    generatedBy: 'Sistema Automático',
    size: '2.4 MB',
    status: 'completed',
  },
  {
    id: '2',
    name: 'Análisis de Riesgo Tributario - Q1 2024',
    type: 'Trimestral',
    period: 'Q1 2024',
    generatedDate: '2024-02-05',
    generatedBy: 'María González',
    size: '5.1 MB',
    status: 'completed',
  },
  {
    id: '3',
    name: 'Reporte de Casos de Alto Impacto',
    type: 'Especial',
    period: 'Febrero 2024',
    generatedDate: '2024-02-10',
    generatedBy: 'Carlos Méndez',
    size: '1.8 MB',
    status: 'completed',
  },
  {
    id: '4',
    name: 'Estadísticas de Recuperación Tributaria',
    type: 'Mensual',
    period: 'Febrero 2024',
    generatedDate: '2024-02-15',
    generatedBy: 'Ana Torres',
    size: '3.2 MB',
    status: 'completed',
  },
];

// Data for charts
const monthlyCollectionData = [
  { month: 'Ago', recaudado: 4200000, objetivo: 4000000 },
  { month: 'Sep', recaudado: 3800000, objetivo: 4000000 },
  { month: 'Oct', recaudado: 4500000, objetivo: 4200000 },
  { month: 'Nov', recaudado: 4800000, objetivo: 4500000 },
  { month: 'Dic', recaudado: 5200000, objetivo: 4800000 },
  { month: 'Ene', recaudado: 5500000, objetivo: 5000000 },
];

const casesByTypeData = [
  { name: 'Renta', value: 45, color: '#003876' },
  { name: 'IGV', value: 30, color: '#0066CC' },
  { name: 'Drawback', value: 15, color: '#4A90E2' },
  { name: 'Otros', value: 10, color: '#7FB3E8' },
];

const auditorsPerformanceData = [
  { name: 'María González', casos: 23, recuperacion: 2500000 },
  { name: 'Carlos Méndez', casos: 18, recuperacion: 1800000 },
  { name: 'Ana Torres', casos: 15, recuperacion: 1500000 },
  { name: 'Roberto Silva', casos: 20, recuperacion: 3200000 },
  { name: 'Pedro Ramírez', casos: 12, recuperacion: 950000 },
];

const COLORS = ['#003876', '#0066CC', '#4A90E2', '#7FB3E8'];

export default function ReportsPage() {
  const [reports] = useState<Report[]>(mockReports);
  const [reportType, setReportType] = useState('all');
  const [period, setPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState<string>('dashboard');

  const filteredReports = reports.filter(r => 
    reportType === 'all' || r.type.toLowerCase() === reportType
  );

  const handleGenerateReport = () => {
    toast.success('Generando reporte...', {
      description: 'El reporte estará disponible en unos momentos',
    });
  };

  const handleDownloadReport = (report: Report) => {
    toast.success(`Descargando: ${report.name}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#003876]">Sistema de Reportes</h1>
          <p className="text-gray-600">Genera y visualiza reportes de fiscalización tributaria</p>
        </div>
        <Button onClick={handleGenerateReport} className="bg-[#003876] hover:bg-[#002555]">
          <FileText className="w-4 h-4 mr-2" />
          Generar Reporte
        </Button>
      </div>

      {/* Report Type Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card 
          className={`cursor-pointer transition-all ${selectedReport === 'dashboard' ? 'ring-2 ring-[#003876]' : ''}`}
          onClick={() => setSelectedReport('dashboard')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-[#003876] mx-auto mb-2" />
              <p className="text-sm">Dashboard Ejecutivo</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${selectedReport === 'cases' ? 'ring-2 ring-[#003876]' : ''}`}
          onClick={() => setSelectedReport('cases')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <FileBarChart className="w-8 h-8 text-[#003876] mx-auto mb-2" />
              <p className="text-sm">Análisis de Casos</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${selectedReport === 'collection' ? 'ring-2 ring-[#003876]' : ''}`}
          onClick={() => setSelectedReport('collection')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-[#003876] mx-auto mb-2" />
              <p className="text-sm">Recuperación</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${selectedReport === 'auditors' ? 'ring-2 ring-[#003876]' : ''}`}
          onClick={() => setSelectedReport('auditors')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="w-8 h-8 text-[#003876] mx-auto mb-2" />
              <p className="text-sm">Desempeño Auditores</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${selectedReport === 'risk' ? 'ring-2 ring-[#003876]' : ''}`}
          onClick={() => setSelectedReport('risk')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 text-[#003876] mx-auto mb-2" />
              <p className="text-sm">Análisis de Riesgo</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Reporte</CardTitle>
          <CardDescription>Personaliza los parámetros del reporte a generar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diario</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="annual">Anual</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Reporte</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <FileText className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="mensual">Mensual</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="especial">Especial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Formato de Exportación</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <Download className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel (XLSX)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="word">Word (DOCX)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview/Dashboard */}
      {selectedReport === 'dashboard' && (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Total Recaudado</p>
                    <p className="text-[#003876]">S/. 28.0M</p>
                    <p className="text-xs text-green-600">+12% vs mes anterior</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Casos Activos</p>
                    <p className="text-[#003876]">247</p>
                    <p className="text-xs text-blue-600">18 nuevos esta semana</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Tasa de Cierre</p>
                    <p className="text-[#003876]">68%</p>
                    <p className="text-xs text-green-600">+5% vs trimestre anterior</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Promedio Recuperación</p>
                    <p className="text-[#003876]">S/. 113K</p>
                    <p className="text-xs text-yellow-600">Por caso cerrado</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recaudación Mensual vs Objetivo</CardTitle>
                <CardDescription>Comparativa de montos recaudados (en millones S/.)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyCollectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => `S/. ${(value / 1000000).toFixed(1)}M`}
                    />
                    <Legend />
                    <Bar dataKey="recaudado" fill="#003876" name="Recaudado" />
                    <Bar dataKey="objetivo" fill="#7FB3E8" name="Objetivo" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Casos por Tipo</CardTitle>
                <CardDescription>Clasificación de casos activos</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={casesByTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {casesByTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedReport === 'auditors' && (
        <Card>
          <CardHeader>
            <CardTitle>Desempeño de Auditores</CardTitle>
            <CardDescription>Casos cerrados y recuperación por auditor</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={auditorsPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip 
                  formatter={(value: number, name: string) => 
                    name === 'recuperacion' 
                      ? `S/. ${(value / 1000000).toFixed(2)}M` 
                      : value
                  }
                />
                <Legend />
                <Bar dataKey="casos" fill="#003876" name="Casos Cerrados" />
                <Bar dataKey="recuperacion" fill="#4A90E2" name="Recuperación (S/.)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {selectedReport === 'collection' && (
        <Card>
          <CardHeader>
            <CardTitle>Evolución de Recuperación Tributaria</CardTitle>
            <CardDescription>Tendencia de montos recuperados (últimos 6 meses)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyCollectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => `S/. ${(value / 1000000).toFixed(1)}M`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="recaudado" 
                  stroke="#003876" 
                  strokeWidth={3}
                  name="Recaudado"
                  dot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="objetivo" 
                  stroke="#E74C3C" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Objetivo"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {selectedReport === 'cases' && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis Detallado de Casos</CardTitle>
            <CardDescription>Métricas y estadísticas de casos de fiscalización</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Tiempo Promedio de Cierre</p>
                <p className="text-[#003876]">45 días</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Efectividad de Casos</p>
                <p className="text-green-600">82%</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Casos en Apelación</p>
                <p className="text-yellow-600">12</p>
              </div>
            </div>
            <div className="text-center py-8 text-gray-500">
              <FileBarChart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Visualización de análisis detallado</p>
              <p className="text-sm">Gráficos y métricas adicionales en desarrollo</p>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedReport === 'risk' && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Riesgo Tributario</CardTitle>
            <CardDescription>Indicadores de riesgo y alertas tempranas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-600">Riesgo Alto</span>
                </div>
                <p className="text-sm text-gray-600">23 contribuyentes requieren revisión inmediata</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-600">Riesgo Medio</span>
                </div>
                <p className="text-sm text-gray-600">67 contribuyentes en monitoreo preventivo</p>
              </div>
            </div>
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Matriz de riesgo y scoring</p>
              <p className="text-sm">Sistema de evaluación automática en desarrollo</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Reports History */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Generados ({filteredReports.length})</CardTitle>
          <CardDescription>Historial de reportes disponibles para descarga</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#003876] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#003876]" />
                  </div>
                  <div>
                    <p className="text-[#003876]">{report.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(report.generatedDate).toLocaleDateString('es-PE')}
                      </span>
                      <span>{report.generatedBy}</span>
                      <Badge variant="outline">{report.type}</Badge>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" title="Ver reporte">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Imprimir">
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Compartir">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDownloadReport(report)}
                    title="Descargar"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
