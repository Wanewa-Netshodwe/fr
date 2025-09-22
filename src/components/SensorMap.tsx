import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MapPin, Droplets, Wifi, WifiOff, AlertTriangle, CheckCircle, 
  Clock, Search, Filter, Layers, Zap, Thermometer, BarChart3,
  RefreshCw, Settings, Download, Eye, EyeOff
} from 'lucide-react';

// Simulated map component (since we can't use actual Leaflet in this environment)
const MapContainer = ({ children, center, zoom, style }: any) => (
  <div style={style} className="relative bg-blue-50 rounded-lg overflow-hidden border-2 border-dashed border-blue-200">
    <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-green-200"></div>
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="text-center text-blue-600">
        <MapPin className="h-12 w-12 mx-auto mb-2" />
        <p className="font-medium">Interactive Tshwane Sensor Map</p>
        <p className="text-sm opacity-75">Zoom: {zoom} | Center: [{center[0].toFixed(3)}, {center[1].toFixed(3)}]</p>
      </div>
    </div>
    {children}
  </div>
);

const TileLayer = ({ url, attribution }: any) => null;
const Marker = ({ position, children }: any) => (
  <div 
    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
    style={{
      left: `${((position[1] + 28.2) / 0.6) * 100}%`,
      top: `${((25.8 - position[0]) / 0.4) * 100}%`
    }}
  >
    {children}
  </div>
);

const Popup = ({ children }: any) => (
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-30">
    <div className="bg-white rounded-lg shadow-lg border p-3 min-w-48 max-w-xs">
      {children}
    </div>
  </div>
);

// Sensor data types
interface Sensor {
  id: string;
  name: string;
  position: [number, number];
  status: 'online' | 'offline' | 'warning' | 'maintenance';
  type: 'flow' | 'quality' | 'level' | 'pressure';
  location: string;
  carWashId?: string;
  lastUpdate: string;
  metrics: {
    waterFlow: number;
    pressure: number;
    temperature: number;
    ph?: number;
    turbidity?: number;
  };
  wifiStrength: number;
  batteryLevel: number;
}

// Mock sensor data for Tshwane area
const mockSensors: Sensor[] = [
  {
    id: 'TWW001',
    name: 'Mamelodi Flow Sensor',
    position: [-25.7308, 28.3228],
    status: 'online',
    type: 'flow',
    location: 'Mamelodi Extension 2',
    carWashId: 'CW001',
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    metrics: { waterFlow: 45.2, pressure: 2.3, temperature: 24.1 },
    wifiStrength: 85,
    batteryLevel: 92
  },
  {
    id: 'TWW002',
    name: 'Soshanguve Quality Monitor',
    position: [-25.5372, 28.1103],
    status: 'online',
    type: 'quality',
    location: 'Soshanguve Block L',
    carWashId: 'CW002',
    lastUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    metrics: { waterFlow: 32.1, pressure: 1.8, temperature: 22.8, ph: 7.2, turbidity: 1.4 },
    wifiStrength: 72,
    batteryLevel: 78
  },
  {
    id: 'TWW003',
    name: 'Pretoria CBD Pressure',
    position: [-25.7479, 28.2293],
    status: 'warning',
    type: 'pressure',
    location: 'Pretoria CBD, Church Street',
    carWashId: 'CW003',
    lastUpdate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    metrics: { waterFlow: 18.7, pressure: 0.9, temperature: 26.3 },
    wifiStrength: 45,
    batteryLevel: 34
  },
  {
    id: 'TWW004',
    name: 'Centurion Flow Control',
    position: [-25.8598, 28.1888],
    status: 'online',
    type: 'flow',
    location: 'Centurion Central',
    carWashId: 'CW004',
    lastUpdate: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    metrics: { waterFlow: 67.4, pressure: 3.1, temperature: 23.5 },
    wifiStrength: 91,
    batteryLevel: 85
  },
  {
    id: 'TWW005',
    name: 'Hammanskraal Monitor',
    position: [-25.4167, 28.2667],
    status: 'offline',
    type: 'level',
    location: 'Hammanskraal',
    lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    metrics: { waterFlow: 0, pressure: 0, temperature: 0 },
    wifiStrength: 0,
    batteryLevel: 12
  },
  {
    id: 'TWW006',
    name: 'Akasia Water Quality',
    position: [-25.6167, 28.1167],
    status: 'maintenance',
    type: 'quality',
    location: 'Akasia',
    lastUpdate: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    metrics: { waterFlow: 0, pressure: 0, temperature: 0, ph: 0, turbidity: 0 },
    wifiStrength: 67,
    batteryLevel: 45
  },
  {
    id: 'TWW007',
    name: 'Wonderboom Flow Meter',
    position: [-25.6833, 28.1333],
    status: 'online',
    type: 'flow',
    location: 'Wonderboom',
    carWashId: 'CW005',
    lastUpdate: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    metrics: { waterFlow: 52.8, pressure: 2.7, temperature: 25.2 },
    wifiStrength: 78,
    batteryLevel: 91
  },
  {
    id: 'TWW008',
    name: 'Ga-Rankuwa Pressure',
    position: [-25.6333, 27.9833],
    status: 'online',
    type: 'pressure',
    location: 'Ga-Rankuwa',
    carWashId: 'CW006',
    lastUpdate: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    metrics: { waterFlow: 38.9, pressure: 2.1, temperature: 24.8 },
    wifiStrength: 82,
    batteryLevel: 76
  }
];

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-red-500',
  warning: 'bg-yellow-500',
  maintenance: 'bg-blue-500'
};

const statusLabels = {
  online: 'Online',
  offline: 'Offline',
  warning: 'Warning',
  maintenance: 'Maintenance'
};

const typeIcons = {
  flow: Droplets,
  quality: BarChart3,
  level: Thermometer,
  pressure: Zap
};

export function SensorMap() {
  const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showClustering, setShowClustering] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-25.7479, 28.2293]);
  const [mapZoom, setMapZoom] = useState(11);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setSensors(prevSensors => 
        prevSensors.map(sensor => ({
          ...sensor,
          lastUpdate: sensor.status === 'online' || sensor.status === 'warning' 
            ? new Date().toISOString() 
            : sensor.lastUpdate,
          metrics: sensor.status === 'online' || sensor.status === 'warning' ? {
            ...sensor.metrics,
            waterFlow: sensor.metrics.waterFlow + (Math.random() - 0.5) * 5,
            pressure: Math.max(0, sensor.metrics.pressure + (Math.random() - 0.5) * 0.2),
            temperature: sensor.metrics.temperature + (Math.random() - 0.5) * 2,
            ph: sensor.metrics.ph ? sensor.metrics.ph + (Math.random() - 0.5) * 0.2 : undefined,
            turbidity: sensor.metrics.turbidity ? Math.max(0, sensor.metrics.turbidity + (Math.random() - 0.5) * 0.3) : undefined
          } : sensor.metrics,
          wifiStrength: sensor.status !== 'offline' 
            ? Math.max(0, Math.min(100, sensor.wifiStrength + (Math.random() - 0.5) * 10))
            : 0,
          batteryLevel: Math.max(0, sensor.batteryLevel - Math.random() * 0.1)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Filter sensors based on search and filters
  const filteredSensors = useMemo(() => {
    return sensors.filter(sensor => {
      const matchesSearch = sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sensor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sensor.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || sensor.status === statusFilter;
      const matchesType = typeFilter === 'all' || sensor.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [sensors, searchTerm, statusFilter, typeFilter]);

  const getSensorIcon = (sensor: Sensor) => {
    const Icon = typeIcons[sensor.type];
    const isSelected = selectedSensor?.id === sensor.id;
    
    return (
      <div 
        className={`relative cursor-pointer transform transition-all duration-200 ${isSelected ? 'scale-125' : 'hover:scale-110'}`}
        onClick={() => setSelectedSensor(selectedSensor?.id === sensor.id ? null : sensor)}
      >
        <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${statusColors[sensor.status]}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        
        {/* Pulse animation for online sensors */}
        {sensor.status === 'online' && (
          <div className={`absolute inset-0 w-8 h-8 rounded-full ${statusColors[sensor.status]} animate-ping opacity-20`}></div>
        )}
        
        {/* WiFi indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center border">
          {sensor.wifiStrength > 0 ? (
            <Wifi className="h-2 w-2 text-green-600" />
          ) : (
            <WifiOff className="h-2 w-2 text-red-600" />
          )}
        </div>

        {/* Popup */}
        {isSelected && (
          <Popup>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{sensor.name}</h4>
                <Badge className={statusColors[sensor.status].replace('bg-', 'bg-opacity-20 text-')} variant="secondary">
                  {statusLabels[sensor.status]}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600">{sensor.location}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Flow:</span>
                  <span className="ml-1 font-medium">{sensor.metrics.waterFlow.toFixed(1)}L/min</span>
                </div>
                <div>
                  <span className="text-gray-500">Pressure:</span>
                  <span className="ml-1 font-medium">{sensor.metrics.pressure.toFixed(1)}bar</span>
                </div>
                <div>
                  <span className="text-gray-500">Temp:</span>
                  <span className="ml-1 font-medium">{sensor.metrics.temperature.toFixed(1)}°C</span>
                </div>
                <div>
                  <span className="text-gray-500">Battery:</span>
                  <span className="ml-1 font-medium">{sensor.batteryLevel.toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-xs text-gray-500">
                  Updated {new Date(sensor.lastUpdate).toLocaleTimeString()}
                </span>
                <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                  Details
                </Button>
              </div>
            </div>
          </Popup>
        )}
      </div>
    );
  };

  const getStatusCounts = () => {
    return {
      total: sensors.length,
      online: sensors.filter(s => s.status === 'online').length,
      offline: sensors.filter(s => s.status === 'offline').length,
      warning: sensors.filter(s => s.status === 'warning').length,
      maintenance: sensors.filter(s => s.status === 'maintenance').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">IoT Sensor Network</h2>
          <p className="text-gray-600">Real-time monitoring across Tshwane water infrastructure</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.total}</div>
            <div className="text-sm text-gray-600">Total Sensors</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.online}</div>
            <div className="text-sm text-gray-600">Online</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.offline}</div>
            <div className="text-sm text-gray-600">Offline</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.warning}</div>
            <div className="text-sm text-gray-600">Warning</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.maintenance}</div>
            <div className="text-sm text-gray-600">Maintenance</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search sensors by name, location, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="flow">Flow Meters</SelectItem>
                <SelectItem value="quality">Quality Monitors</SelectItem>
                <SelectItem value="level">Level Sensors</SelectItem>
                <SelectItem value="pressure">Pressure Sensors</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setShowClustering(!showClustering)}
              className={showClustering ? 'bg-blue-50 border-blue-200' : ''}
            >
              <Layers className="h-4 w-4 mr-2" />
              {showClustering ? 'Clustering On' : 'Clustering Off'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Sensor Distribution Map</span>
              </CardTitle>
              <CardDescription>
                Geographic view of IoT sensors across Tshwane • Showing {filteredSensors.length} of {sensors.length} sensors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '500px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {filteredSensors.map((sensor) => (
                  <Marker key={sensor.id} position={sensor.position}>
                    {getSensorIcon(sensor)}
                  </Marker>
                ))}
              </MapContainer>
              
              {/* Map Legend */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Legend
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {Object.entries(statusColors).map(([status, color]) => (
                    <div key={status} className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${color}`}></div>
                      <span className="capitalize">{statusLabels[status as keyof typeof statusLabels]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sensor List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Sensor Details</CardTitle>
              <CardDescription>
                Live sensor data and status information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto">
                {filteredSensors.map((sensor, index) => {
                  const Icon = typeIcons[sensor.type];
                  const isLast = index === filteredSensors.length - 1;
                  
                  return (
                    <div 
                      key={sensor.id} 
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!isLast ? 'border-b' : ''} ${selectedSensor?.id === sensor.id ? 'bg-blue-50' : ''}`}
                      onClick={() => {
                        setSelectedSensor(sensor);
                        setMapCenter(sensor.position);
                        setMapZoom(14);
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${statusColors[sensor.status]}`}></div>
                          <div>
                            <h4 className="font-medium text-sm">{sensor.name}</h4>
                            <p className="text-xs text-gray-600">{sensor.id}</p>
                          </div>
                        </div>
                        <Icon className="h-4 w-4 text-gray-400" />
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-2">{sensor.location}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Flow:</span>
                          <span className="ml-1 font-medium">{sensor.metrics.waterFlow.toFixed(1)}L/min</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Battery:</span>
                          <span className="ml-1 font-medium">{sensor.batteryLevel.toFixed(0)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          {sensor.wifiStrength > 0 ? (
                            <Wifi className="h-3 w-3 text-green-600" />
                          ) : (
                            <WifiOff className="h-3 w-3 text-red-600" />
                          )}
                          <span className="text-xs text-gray-500">{sensor.wifiStrength}%</span>
                        </div>
                        
                        <span className="text-xs text-gray-500">
                          {new Date(sensor.lastUpdate).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
                
                {filteredSensors.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No sensors found matching your criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}