import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  User, LogOut, FileText, MapPin, Calendar, Clock, Camera,
  CheckCircle, AlertTriangle, XCircle, Plus, Eye, Settings,
  Shield, Bell, Droplets, BarChart3, TrendingUp, Users
} from 'lucide-react';
import { AuthView } from '../App';

interface CitizenDashboardProps {
  onLogout: () => void;
  onViewChange: (view: AuthView) => void;
  currentView: AuthView;
  citizenData: any;
}

interface Report {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  status: 'submitted' | 'under-review' | 'in-progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  submittedDate: string;
  lastUpdate: string;
  trackingId: string;
  hasPhotos: boolean;
  adminResponse?: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Illegal Water Dumping',
    description: 'Car wash operators dumping dirty water into storm drain near my home',
    type: 'Waste Mismanagement',
    location: 'Mamelodi Extension 2, Corner Street',
    status: 'in-progress',
    priority: 'high',
    submittedDate: '2024-01-10T14:30:00Z',
    lastUpdate: '2024-01-14T09:15:00Z',
    trackingId: 'WW240110001',
    hasPhotos: true,
    adminResponse: 'Investigation team deployed. Enforcement action scheduled for January 16.'
  },
  {
    id: '2',
    title: 'Unauthorized Water Usage',
    description: 'New car wash operating without permits, using municipal water',
    type: 'Unauthorized Water Use',
    location: 'Soshanguve Block L, Extension Road',
    status: 'under-review',
    priority: 'medium',
    submittedDate: '2024-01-08T11:00:00Z',
    lastUpdate: '2024-01-12T16:45:00Z',
    trackingId: 'WW240108002',
    hasPhotos: false,
    adminResponse: 'Report verified. Scheduling compliance inspection.'
  },
  {
    id: '3',
    title: 'Water Leak at Car Wash',
    description: 'Large water leak at registered car wash causing wastage',
    type: 'Water Leak',
    location: 'Pretoria CBD, Church Street',
    status: 'resolved',
    priority: 'medium',
    submittedDate: '2024-01-05T08:20:00Z',
    lastUpdate: '2024-01-07T12:00:00Z',
    trackingId: 'WW240105003',
    hasPhotos: true,
    adminResponse: 'Leak repaired. Thank you for reporting this issue.'
  }
];

const statusColors = {
  'submitted': 'bg-blue-100 text-blue-800',
  'under-review': 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-orange-100 text-orange-800',
  'resolved': 'bg-green-100 text-green-800',
  'rejected': 'bg-red-100 text-red-800'
};

const statusIcons = {
  'submitted': Clock,
  'under-review': Eye,
  'in-progress': AlertTriangle,
  'resolved': CheckCircle,
  'rejected': XCircle
};

const priorityColors = {
  'low': 'bg-gray-100 text-gray-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'high': 'bg-red-100 text-red-800'
};

export function CitizenDashboard({ onLogout, onViewChange, currentView, citizenData }: CitizenDashboardProps) {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    type: '',
    location: ''
  });

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    const report: Report = {
      id: Date.now().toString(),
      title: newReport.title,
      description: newReport.description,
      type: newReport.type,
      location: newReport.location,
      status: 'submitted',
      priority: 'medium',
      submittedDate: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      trackingId: `WW${new Date().toISOString().slice(2,10).replace(/-/g, '')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      hasPhotos: false
    };

    setReports([report, ...reports]);
    setNewReport({ title: '', description: '', type: '', location: '' });
    setShowReportForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const ReportCard = ({ report }: { report: Report }) => {
    const StatusIcon = statusIcons[report.status];
    
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedReport(report)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono text-gray-600">{report.trackingId}</span>
              <Badge className={priorityColors[report.priority]} variant="secondary">
                {report.priority}
              </Badge>
            </div>
            <Badge className={statusColors[report.status]} variant="secondary">
              <StatusIcon className="h-3 w-3 mr-1" />
              {report.status.replace('-', ' ')}
            </Badge>
          </div>
          <CardTitle className="text-base">{report.title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{report.description}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="truncate">{report.location}</span>
            </div>
            
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Submitted {formatDate(report.submittedDate)}</span>
            </div>
            
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>Updated {formatDate(report.lastUpdate)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              {report.hasPhotos && (
                <Camera className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-xs text-gray-500">{report.type}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (showReportForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => setShowReportForm(false)}>
                  ← Back to Dashboard
                </Button>
              </div>
              <h1 className="font-semibold">Submit New Report</h1>
              <div></div>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Report Water Issue</CardTitle>
              <CardDescription>
                Provide details about the water-related issue you'd like to report
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmitReport} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the issue"
                    value={newReport.title}
                    onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Issue Type</Label>
                  <Select onValueChange={(value) => setNewReport({...newReport, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of issue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unauthorized Water Use">Unauthorized Water Use</SelectItem>
                      <SelectItem value="Waste Mismanagement">Illegal Waste Dumping</SelectItem>
                      <SelectItem value="Water Leak">Water Leak/Pipe Burst</SelectItem>
                      <SelectItem value="Wastewater Discharge">Improper Wastewater Discharge</SelectItem>
                      <SelectItem value="Unregistered Carwash">Unregistered Car Wash</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Street address or area description"
                    value={newReport.location}
                    onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide as much detail as possible about the issue..."
                    value={newReport.description}
                    onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Photo Evidence (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Click to upload photos or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowReportForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Submit Report
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">My Dashboard</h1>
                  <p className="text-sm text-blue-600">Water Issue Reporting</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {citizenData ? getInitials(citizenData.firstName, citizenData.lastName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">
                    {citizenData ? `${citizenData.firstName} ${citizenData.lastName}` : 'User'}
                  </p>
                  <p className="text-gray-500">
                    {citizenData?.verificationStatus === 'verified' ? 'Verified Account' : 'Pending Verification'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {citizenData?.firstName || 'Citizen'}!
          </h2>
          <p className="text-gray-600">
            Track your reports and contribute to water conservation in Tshwane.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-blue-600">{reports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600 opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {reports.filter(r => r.status === 'in-progress').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600 opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reports.filter(r => r.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600 opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-blue-600">92%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600 opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>My Reports</span>
            </TabsTrigger>
            <TabsTrigger value="sensors" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Water Network</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Community Impact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">My Reports</h3>
                  <Button 
                    onClick={() => setShowReportForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                </div>

                <div className="space-y-4">
                  {reports.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">No reports yet</h4>
                        <p className="text-gray-600 mb-4">Start by reporting a water-related issue in your area.</p>
                        <Button onClick={() => setShowReportForm(true)}>
                          Submit Your First Report
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    reports.map(report => (
                      //@ts-ignore
                      <ReportCard key={report.id} report={report} />
                    ))
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Account Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Verified</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phone Verified</span>
                      {citizenData?.phone ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Account Level</p>
                      <Badge className="bg-blue-100 text-blue-800">
                        {citizenData?.verificationStatus === 'verified' ? 'Verified Citizen' : 'Standard User'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      Report Nearby Issues
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Evidence
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Area Statistics
                    </Button>
                  </CardContent>
                </Card>

                {/* Privacy Notice */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>Privacy Protected</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Your data is used only for tracking reports and improving community services. 
                      We never share personal information with third parties.
                    </p>
                    <Button variant="link" className="text-sm p-0 mt-2">
                      View Privacy Policy
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sensors">
            <div className="space-y-6">
              {/* Sensor Network Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>Water Monitoring Network</span>
                  </CardTitle>
                  <CardDescription>
                    Transparency view of IoT sensors monitoring water usage across Tshwane
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-green-600">6</div>
                      <div className="text-sm text-green-600">Online Sensors</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">8</div>
                      <div className="text-sm text-blue-600">Total Sensors</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-purple-600">247</div>
                      <div className="text-sm text-purple-600">Monitored Sites</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-orange-600">94%</div>
                      <div className="text-sm text-orange-600">Network Uptime</div>
                    </div>
                  </div>

                  {/* Sensor Location Preview */}
                  <div className="relative bg-gradient-to-br from-green-100 via-blue-100 to-green-200 rounded-lg h-64 overflow-hidden mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-blue-600">
                        <MapPin className="h-8 w-8 mx-auto mb-2" />
                        <p className="font-medium">Interactive Sensor Map</p>
                        <p className="text-xs opacity-75">Real-time monitoring across your area</p>
                      </div>
                    </div>
                    
                    {/* Simulated sensor indicators */}
                    <div className="absolute top-8 left-16 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white shadow-md"></div>
                    <div className="absolute top-16 right-20 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white shadow-md"></div>
                    <div className="absolute bottom-20 left-20 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
                    <div className="absolute bottom-12 right-16 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white shadow-md"></div>
                    <div className="absolute top-24 left-1/2 w-4 h-4 bg-yellow-500 rounded-full animate-pulse border-2 border-white shadow-md"></div>
                    <div className="absolute bottom-16 left-1/3 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                    <div className="absolute top-20 right-1/3 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white shadow-md"></div>
                    <div className="absolute bottom-24 right-1/4 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white shadow-md"></div>
                  </div>

                  {/* Your Area Sensors */}
                  <div>
                    <h4 className="font-medium mb-3">Sensors in Your Area</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-sm">Mamelodi Flow Monitor</p>
                            <p className="text-xs text-gray-600">2.1km from your location</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div>
                            <p className="font-medium text-sm">Pretoria CBD Pressure</p>
                            <p className="text-xs text-gray-600">5.7km from your location</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low Battery</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="space-y-6">
              {/* Community Impact Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Community Water Conservation Impact</span>
                  </CardTitle>
                  <CardDescription>
                    See how citizen reports are making a difference in water conservation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">15.4M</div>
                      <div className="text-sm text-gray-600">Liters Saved This Year</div>
                      <div className="text-xs text-green-600 mt-1">↑ 23% from last year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">1,247</div>
                      <div className="text-sm text-gray-600">Issues Resolved</div>
                      <div className="text-xs text-green-600 mt-1">↑ 12% this month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">2,850</div>
                      <div className="text-sm text-gray-600">Active Citizens</div>
                      <div className="text-xs text-green-600 mt-1">↑ 45% growth</div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h4 className="font-medium mb-4">Recent Community Achievements</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Mamelodi Water Leak Fixed</p>
                          <p className="text-xs text-gray-600">Thanks to citizen report #WW240110001 - Saved 2,500L daily</p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Droplets className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">New Water-Efficient Car Wash Registered</p>
                          <p className="text-xs text-gray-600">Centurion operator adopted recycling system - 40% water reduction</p>
                          <p className="text-xs text-gray-500">5 days ago</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Users className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Community Workshop Completed</p>
                          <p className="text-xs text-gray-600">50 car wash operators trained on water conservation techniques</p>
                          <p className="text-xs text-gray-500">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedReport.title}</h3>
                  <p className="text-sm text-gray-600">{selectedReport.trackingId}</p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedReport(null)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <p className="text-sm text-gray-600 mt-1">{selectedReport.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Badge className={`${statusColors[selectedReport.status]} mt-1`}>
                      {selectedReport.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge className={`${priorityColors[selectedReport.priority]} mt-1`}>
                      {selectedReport.priority}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <Label>Location</Label>
                  <p className="text-sm text-gray-600 mt-1">{selectedReport.location}</p>
                </div>
                
                {selectedReport.adminResponse && (
                  <div>
                    <Label>Admin Response</Label>
                    <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded">
                      {selectedReport.adminResponse}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}