import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Activity, Zap, Droplets, Gauge, MapPin, Calendar, 
  AlertTriangle, CheckCircle, Settings, TrendingUp, TrendingDown,
  Wifi, WifiOff, Battery, BatteryLow, RefreshCw
} from 'lucide-react';

interface SensorData {
  id: string;
  location: string;
  type: 'flow' | 'pressure' | 'quality' | 'level';
  status: 'online' | 'offline' | 'warning' | 'error';
  batteryLevel: number;
  signalStrength: number;
  lastReading: string;
  currentValue: number;
  unit: string;
  threshold: {
    min: number;
    max: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface SensorReading {
  timestamp: string;
  value: number;
}

const mockSensors: SensorData[] = [
  {
    id: 'S001',
    location: 'Marabastad Car Wash #247',
    type: 'pressure',
    status: 'warning',
    batteryLevel: 85,
    signalStrength: 92,
    lastReading: '2024-01-15T11:45:00Z',
    currentValue: 4.8,
    unit: 'bar',
    threshold: { min: 1.0, max: 4.0 },
    coordinates: { lat: -25.7479, lng: 28.2293 }
  },
  {
    id: 'S002',
    location: 'Soshanguve Block L - Site 1',
    type: 'flow',
    status: 'online',
    batteryLevel: 67,
    signalStrength: 78,
    lastReading: '2024-01-15T11:47:00Z',
    currentValue: 15.2,
    unit: 'L/min',
    threshold: { min: 0, max: 25.0 },
    coordinates: { lat: -25.5503, lng: 28.1136 }
  },
  {
    id: 'S003',
    location: 'Hammanskraal Extension 4',
    type: 'level',
    status: 'online',
    batteryLevel: 45,
    signalStrength: 65,
    lastReading: '2024-01-15T11:46:00Z',
    currentValue: 78,
    unit: '%',
    threshold: { min: 20, max: 95 },
    coordinates: { lat: -25.4167, lng: 28.2667 }
  },
  {
    id: 'S004',
    location: 'Centurion Business District',
    type: 'quality',
    status: 'offline',
    batteryLevel: 12,
    signalStrength: 0,
    lastReading: '2024-01-14T16:22:00Z',
    currentValue: 6.8,
    unit: 'pH',
    threshold: { min: 6.0, max: 8.0 },
    coordinates: { lat: -25.8601, lng: 28.1881 }
  },
  {
    id: 'S005',
    location: 'Pretoria CBD - Sensor Hub',
    type: 'flow',
    status: 'online',
    batteryLevel: 91,
    signalStrength: 95,
    lastReading: '2024-01-15T11:48:00Z',
    currentValue: 8.7,
    unit: 'L/min',
    threshold: { min: 0, max: 20.0 },
    coordinates: { lat: -25.7461, lng: 28.1881 }
  }
];

// Generate mock historical data
const generateMockData = (sensor: SensorData): SensorReading[] => {
  const data: SensorReading[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    let baseValue = sensor.currentValue;
    
    // Add some realistic variation
    const variation = (Math.random() - 0.5) * 0.3 * baseValue;
    const value = Math.max(0, baseValue + variation);
    
    data.push({
      timestamp: timestamp.toISOString(),
      value: parseFloat(value.toFixed(1))
    });
  }
  
  return data;
};

const statusColors = {
  online: 'bg-green-100 text-green-800 border-green-200',
  offline: 'bg-red-100 text-red-800 border-red-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200'
};

const statusIcons = {
  online: CheckCircle,
  offline: WifiOff,
  warning: AlertTriangle,
  error: Zap
};

const typeIcons = {
  flow: Droplets,
  pressure: Gauge,
  quality: Activity,
  level: TrendingUp
};

export function SensorDashboard() {
  const [sensors, setSensors] = useState<SensorData[]>(mockSensors);
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(current => 
        current.map(sensor => {
          if (sensor.status === 'offline') return sensor;
          
          // Simulate small changes in readings
          const variation = (Math.random() - 0.5) * 0.1;
          const newValue = Math.max(0, sensor.currentValue * (1 + variation));
          
          return {
            ...sensor,
            currentValue: parseFloat(newValue.toFixed(1)),
            lastReading: new Date().toISOString()
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const formatLastReading = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getStatusColor = (sensor: SensorData) => {
    if (sensor.status === 'offline') return statusColors.offline;
    
    const { currentValue, threshold } = sensor;
    if (currentValue < threshold.min || currentValue > threshold.max) {
      return statusColors.warning;
    }
    
    return statusColors.online;
  };

  const SensorCard = ({ sensor }: { sensor: SensorData }) => {
    const StatusIcon = statusIcons[sensor.status];
    const TypeIcon = typeIcons[sensor.type];
    const isAbnormal = sensor.currentValue < sensor.threshold.min || sensor.currentValue > sensor.threshold.max;
    
    return (
      <Card className={`hover:shadow-lg transition-all cursor-pointer ${selectedSensor === sensor.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedSensor(sensor.id)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <TypeIcon className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-sm">{sensor.id}</h3>
                <p className="text-xs text-gray-600 capitalize">{sensor.type} Sensor</p>
              </div>
            </div>
            <Badge className={getStatusColor(sensor)} variant="outline">
              <StatusIcon className="h-3 w-3 mr-1" />
              {sensor.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm truncate">{sensor.location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Reading</span>
              {isAbnormal && <AlertTriangle className="h-4 w-4 text-orange-500" />}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-bold ${isAbnormal ? 'text-orange-600' : 'text-blue-600'}`}>
                {sensor.currentValue}
              </span>
              <span className="text-sm text-gray-500">{sensor.unit}</span>
            </div>
            <div className="text-xs text-gray-500">
              Range: {sensor.threshold.min}-{sensor.threshold.max} {sensor.unit}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-1 mb-1">
                <Battery className={`h-3 w-3 ${sensor.batteryLevel < 20 ? 'text-red-500' : 'text-green-500'}`} />
                <span className="text-xs text-gray-600">Battery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={sensor.batteryLevel} className="flex-1 h-2" />
                <span className="text-xs text-gray-500">{sensor.batteryLevel}%</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-1 mb-1">
                <Wifi className={`h-3 w-3 ${sensor.signalStrength < 30 ? 'text-red-500' : 'text-green-500'}`} />
                <span className="text-xs text-gray-600">Signal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={sensor.signalStrength} className="flex-1 h-2" />
                <span className="text-xs text-gray-500">{sensor.signalStrength}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Last update: {formatLastReading(sensor.lastReading)}</span>
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const onlineSensors = sensors.filter(s => s.status === 'online').length;
  const warningSensors = sensors.filter(s => s.status === 'warning').length;
  const offlineSensors = sensors.filter(s => s.status === 'offline').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">IoT Sensor Management</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sensors</p>
                <p className="text-2xl font-bold text-blue-600">{sensors.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600 opacity-75" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Online</p>
                <p className="text-2xl font-bold text-green-600">{onlineSensors}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-75" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">{warningSensors}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600 opacity-75" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Offline</p>
                <p className="text-2xl font-bold text-red-600">{offlineSensors}</p>
              </div>
              <WifiOff className="h-8 w-8 text-red-600 opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensors.map(sensor => (
          //@ts-ignore
          <SensorCard key={sensor.id} sensor={sensor} />
        ))}
      </div>

      {/* Real-time Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span>Real-time Monitoring</span>
          </CardTitle>
          <CardDescription>
            Live sensor data feed with automated anomaly detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>[11:48:23] S002 → Flow: 15.2 L/min</span>
                <span className="text-green-500">✓ NORMAL</span>
              </div>
              <div className="flex justify-between">
                <span>[11:48:18] S005 → Flow: 8.7 L/min</span>
                <span className="text-green-500">✓ NORMAL</span>
              </div>
              <div className="flex justify-between">
                <span>[11:48:12] S001 → Pressure: 4.8 bar</span>
                <span className="text-yellow-500">⚠ HIGH</span>
              </div>
              <div className="flex justify-between">
                <span>[11:47:55] S003 → Level: 78%</span>
                <span className="text-green-500">✓ NORMAL</span>
              </div>
              <div className="flex justify-between">
                <span>[11:45:30] S004 → Connection lost</span>
                <span className="text-red-500">✗ OFFLINE</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Integration Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Sensor Location Map</CardTitle>
          <CardDescription>Geographic distribution of IoT sensors across Tshwane</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive Map with Sensor Locations</p>
              <p className="text-sm text-gray-500">Real-time status indicators and clustering</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}