import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Building2, Users, Calendar, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Properties",
      value: "156",
      icon: Building2,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Active Tenants",
      value: "432",
      icon: Users,
      trend: "+4.3%",
      trendUp: true,
    },
    {
      title: "Scheduled Visits",
      value: "89",
      icon: Calendar,
      trend: "-2.1%",
      trendUp: false,
    },
    {
      title: "New Messages",
      value: "24",
      icon: MessageSquare,
      trend: "+8.9%",
      trendUp: true,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John</h1>
          <p className="text-gray-500 mt-2">Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div
                  className={`text-sm ${
                    stat.trendUp ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="ml-4">
                      <p className="text-sm font-medium">
                        New property listing added
                      </p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Upcoming Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">
                        Visit at 123 Main Street
                      </p>
                      <p className="text-sm text-gray-500">Today at 2:00 PM</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;