import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import {
  Users,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  Route,
  CheckCircle,
  AlertCircle,
  UserCheck,
  Navigation,
  Phone,
  Wrench,
  FileText,
  Plus,
  Filter,
  MoreHorizontal,
} from "lucide-react";

interface WorkerProfile {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: "available" | "busy" | "off-duty";
  currentLocation: string;
  phone: string;
  completedTasks: number;
  rating: number;
}

interface DeploymentTask {
  id: string;
  title: string;
  type:
    | "inspection"
    | "repair"
    | "installation"
    | "enforcement";
  priority: "low" | "medium" | "high" | "urgent";
  status:
    | "scheduled"
    | "en-route"
    | "in-progress"
    | "completed"
    | "cancelled";
  location: string;
  assignedTo?: string;
  estimatedDuration: number;
  scheduledDate: string;
  description: string;
  equipment?: string[];
}

const mockWorkers: WorkerProfile[] = [
  {
    id: "W001",
    name: "J. Mokoena",
    role: "Senior Inspector",
    skills: ["Water Systems", "Compliance", "Enforcement"],
    availability: "available",
    currentLocation: "Pretoria CBD",
    phone: "+27 82 123 4567",
    completedTasks: 47,
    rating: 4.8,
  },
  {
    id: "W002",
    name: "T. Ndlovu",
    role: "Field Technician",
    skills: ["Sensor Installation", "Repairs", "IoT Systems"],
    availability: "busy",
    currentLocation: "Mamelodi",
    phone: "+27 83 987 6543",
    completedTasks: 32,
    rating: 4.6,
  },
  {
    id: "W003",
    name: "M. Sibeko",
    role: "Compliance Officer",
    skills: [
      "Legal Enforcement",
      "Documentation",
      "Investigations",
    ],
    availability: "available",
    currentLocation: "Centurion",
    phone: "+27 84 555 1234",
    completedTasks: 28,
    rating: 4.9,
  },
  {
    id: "W004",
    name: "L. Van Der Merwe",
    role: "IoT Specialist",
    skills: [
      "Sensor Maintenance",
      "Data Analysis",
      "Technical Support",
    ],
    availability: "available",
    currentLocation: "Hatfield",
    phone: "+27 81 777 8888",
    completedTasks: 19,
    rating: 4.7,
  },
];

const mockTasks: DeploymentTask[] = [
  {
    id: "T001",
    title: "Emergency Leak Investigation",
    type: "inspection",
    priority: "urgent",
    status: "scheduled",
    location: "Marabastad Car Wash #247",
    assignedTo: "W001",
    estimatedDuration: 120,
    scheduledDate: "2024-01-15T14:00:00Z",
    description:
      "Investigate high pressure alert from sensor S247. Possible major leak detected.",
    equipment: [
      "Pressure meter",
      "Leak detection kit",
      "Camera",
    ],
  },
  {
    id: "T002",
    title: "Sensor Installation - New Facility",
    type: "installation",
    priority: "medium",
    status: "in-progress",
    location: "Soshanguve Block L",
    assignedTo: "W002",
    estimatedDuration: 180,
    scheduledDate: "2024-01-15T09:00:00Z",
    description:
      "Install IoT water monitoring sensors at newly registered car wash facility.",
    equipment: [
      "IoT sensors (3x)",
      "Installation kit",
      "Calibration tools",
    ],
  },
  {
    id: "T003",
    title: "Compliance Check - Payment Audit",
    type: "inspection",
    priority: "medium",
    status: "scheduled",
    location: "Hammanskraal Extension 4",
    estimatedDuration: 90,
    scheduledDate: "2024-01-16T10:00:00Z",
    description:
      "Routine compliance audit for payment verification and documentation review.",
    equipment: [
      "Tablet",
      "Documentation kit",
      "Receipt scanner",
    ],
  },
  {
    id: "T004",
    title: "Enforcement Action - Illegal Operation",
    type: "enforcement",
    priority: "high",
    status: "scheduled",
    location: "Centurion Business District",
    assignedTo: "W003",
    estimatedDuration: 150,
    scheduledDate: "2024-01-16T08:00:00Z",
    description:
      "Issue cease operations notice for unauthorized water usage. Legal documentation required.",
    equipment: [
      "Legal documents",
      "Camera",
      "Measuring equipment",
    ],
  },
];

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  "en-route": "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-800",
};

const availabilityColors = {
  available: "bg-green-100 text-green-800",
  busy: "bg-red-100 text-red-800",
  "off-duty": "bg-gray-100 text-gray-800",
};

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

export function WorkDeployment() {
  const [workers, setWorkers] =
    useState<WorkerProfile[]>(mockWorkers);
  const [tasks, setTasks] =
    useState<DeploymentTask[]>(mockTasks);
  const [selectedDate, setSelectedDate] = useState<
    Date | undefined
  >(new Date());

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      month: "short",
      day: "numeric",
    });
  };

  const TaskCard = ({ task }: { task: DeploymentTask }) => {
    const assignedWorker = workers.find(
      (w) => w.id === task.assignedTo,
    );

    return (
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono text-gray-600">
                {task.id}
              </span>
              <Badge
                className={priorityColors[task.priority]}
                variant="secondary"
              >
                {task.priority}
              </Badge>
              <Badge
                className={statusColors[task.status]}
                variant="secondary"
              >
                {task.status}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-base">
            {task.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            {task.description}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{task.location}</span>
            </div>

            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                {formatDate(task.scheduledDate)} at{" "}
                {formatTime(task.scheduledDate)}
              </span>
              <span className="ml-2 text-xs">
                ({task.estimatedDuration}min)
              </span>
            </div>

            {assignedWorker && (
              <div className="flex items-center text-gray-500">
                <UserCheck className="h-4 w-4 mr-2" />
                <span>
                  {assignedWorker.name} ({assignedWorker.role})
                </span>
              </div>
            )}

            {task.equipment && (
              <div className="flex items-center text-gray-500">
                <Wrench className="h-4 w-4 mr-2" />
                <span className="text-xs">
                  {task.equipment.join(", ")}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              {!task.assignedTo && (
                <Button size="sm" variant="outline">
                  Assign Worker
                </Button>
              )}
              <Button size="sm" variant="outline">
                <Route className="h-4 w-4 mr-1" />
                Route
              </Button>
            </div>

            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const WorkerCard = ({
    worker,
  }: {
    worker: WorkerProfile;
  }) => {
    const assignedTasks = tasks.filter(
      (t) =>
        t.assignedTo === worker.id && t.status !== "completed",
    );

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>
                  {worker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{worker.name}</h3>
                <p className="text-sm text-gray-600">
                  {worker.role}
                </p>
              </div>
            </div>
            <Badge
              className={
                availabilityColors[worker.availability]
              }
              variant="secondary"
            >
              {worker.availability}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{worker.currentLocation}</span>
            </div>

            <div className="flex items-center text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              <span>{worker.phone}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Completed: {worker.completedTasks}</span>
              <span>Rating: ⭐ {worker.rating}</span>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">
              Skills:
            </p>
            <div className="flex flex-wrap gap-1">
              {worker.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {assignedTasks.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-600 mb-2">
                Current Tasks: {assignedTasks.length}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
              >
                View Tasks
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Work Deployment
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="workers">
            Team Management
          </TabsTrigger>
          <TabsTrigger value="tasks">Task List</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Deployments</CardTitle>
                  <CardDescription>
                    {
                      tasks.filter(
                        (t) => t.status !== "completed",
                      ).length
                    }{" "}
                    active tasks scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks
                      .filter((t) => t.status !== "completed")
                      .map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>

          {/* Team Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {
                    workers.filter(
                      (w) => w.availability === "available",
                    ).length
                  }
                </div>
                <p className="text-sm text-gray-600">
                  Available Workers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {
                    workers.filter(
                      (w) => w.availability === "busy",
                    ).length
                  }
                </div>
                <p className="text-sm text-gray-600">
                  On Assignment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {
                    tasks.filter(
                      (t) => t.status === "completed",
                    ).length
                  }
                </div>
                <p className="text-sm text-gray-600">
                  Completed Today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {
                    tasks.filter(
                      (t) =>
                        t.priority === "urgent" &&
                        t.status !== "completed",
                    ).length
                  }
                </div>
                <p className="text-sm text-gray-600">
                  Urgent Tasks
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">
                Scheduled & In Progress
              </h3>
              <div className="space-y-4">
                {tasks
                  .filter((t) =>
                    [
                      "scheduled",
                      "en-route",
                      "in-progress",
                    ].includes(t.status),
                  )
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                Completed Today
              </h3>
              <div className="space-y-4">
                {tasks
                  .filter((t) => t.status === "completed")
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}

                {tasks.filter((t) => t.status === "completed")
                  .length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      No completed tasks today
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}