import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarInitials } from './ui/avatar';
import { 
  Search, Filter, Calendar, MapPin, Camera, User, Clock, 
  AlertTriangle, CheckCircle, XCircle, ArrowRight, Eye,
  MessageSquare, Paperclip, MoreHorizontal
} from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'assigned' | 'in-progress' | 'resolved' | 'escalated';
  type: 'citizen-report' | 'sensor-alert' | 'inspection' | 'enforcement';
  location: string;
  assignee?: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  hasAttachments: boolean;
  comments: number;
}

const mockTickets: Ticket[] = [
  {
    id: 'TW-2024-001',
    title: 'Unauthorized Water Usage',
    description: 'Multiple car wash operators using municipal water without permits in Soshanguve area',
    priority: 'high',
    status: 'new',
    type: 'citizen-report',
    location: 'Soshanguve Block L',
    reporter: 'Anonymous Citizen',
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    hasAttachments: true,
    comments: 0
  },
  {
    id: 'TW-2024-002',
    title: 'High Water Pressure Alert',
    description: 'Sensor #S247 detected abnormal pressure readings indicating potential leak',
    priority: 'critical',
    status: 'assigned',
    type: 'sensor-alert',
    location: 'Marabastad Car Wash #247',
    assignee: 'J. Mokoena',
    reporter: 'IoT System',
    createdAt: '2024-01-15T08:15:00Z',
    updatedAt: '2024-01-15T10:22:00Z',
    hasAttachments: false,
    comments: 3
  },
  {
    id: 'TW-2024-003',
    title: 'Illegal Waste Dumping',
    description: 'Improper disposal of car wash wastewater near residential area',
    priority: 'medium',
    status: 'in-progress',
    type: 'citizen-report',
    location: 'Hammanskraal Extension 4',
    assignee: 'T. Ndlovu',
    reporter: 'Community Leader',
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
    hasAttachments: true,
    comments: 5
  },
  {
    id: 'TW-2024-004',
    title: 'Payment Compliance Check',
    description: 'Routine inspection for payment compliance at registered facilities',
    priority: 'low',
    status: 'resolved',
    type: 'inspection',
    location: 'Centurion Business District',
    assignee: 'M. Sibeko',
    reporter: 'System Scheduler',
    createdAt: '2024-01-12T12:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    hasAttachments: false,
    comments: 2
  }
];

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

const statusColors = {
  new: 'bg-gray-100 text-gray-800',
  assigned: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  escalated: 'bg-red-100 text-red-800'
};

const typeIcons = {
  'citizen-report': User,
  'sensor-alert': AlertTriangle,
  'inspection': CheckCircle,
  'enforcement': XCircle
};

export function TicketBoard() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const ticketsByStatus = {
    new: filteredTickets.filter(t => t.status === 'new'),
    assigned: filteredTickets.filter(t => t.status === 'assigned'),
    'in-progress': filteredTickets.filter(t => t.status === 'in-progress'),
    resolved: filteredTickets.filter(t => t.status === 'resolved'),
    escalated: filteredTickets.filter(t => t.status === 'escalated')
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const TicketCard = ({ ticket }: { ticket: Ticket }) => {
    const IconComponent = typeIcons[ticket.type];
    
    return (
      <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <IconComponent className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-mono text-gray-600">{ticket.id}</span>
            </div>
            <div className="flex space-x-1">
              <Badge className={priorityColors[ticket.priority]} variant="secondary">
                {ticket.priority}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-sm font-medium leading-tight">
            {ticket.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {ticket.description}
          </p>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{ticket.location}</span>
            </div>
            
            <div className="flex items-center text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            
            {ticket.assignee && (
              <div className="flex items-center text-gray-500">
                <User className="h-3 w-3 mr-1" />
                <span>Assigned to {ticket.assignee}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              {ticket.hasAttachments && (
                <Paperclip className="h-3 w-3 text-gray-400" />
              )}
              {ticket.comments > 0 && (
                <div className="flex items-center text-gray-400">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span className="text-xs">{ticket.comments}</span>
                </div>
              )}
            </div>
            
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Ticket Tracking</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="escalated">Escalated</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 overflow-x-auto">
        {Object.entries(ticketsByStatus).map(([status, statusTickets]) => (
          <div key={status} className="min-w-80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium capitalize">{status.replace('-', ' ')}</h3>
                <Badge variant="secondary" className={statusColors[status as keyof typeof statusColors]}>
                  {statusTickets.length}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {statusTickets.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No tickets</p>
                </div>
              ) : (
                statusTickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{ticketsByStatus.new.length}</div>
            <p className="text-sm text-gray-600">New Tickets</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{ticketsByStatus['in-progress'].length}</div>
            <p className="text-sm text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{ticketsByStatus.resolved.length}</div>
            <p className="text-sm text-gray-600">Resolved Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{ticketsByStatus.escalated.length}</div>
            <p className="text-sm text-gray-600">Escalated</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}