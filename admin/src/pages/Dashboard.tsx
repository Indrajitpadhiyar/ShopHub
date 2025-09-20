import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Activity,
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { ChartCard } from "@/components/ChartCard";

const salesData = [
  { name: "Jan", sales: 4000, orders: 240 },
  { name: "Feb", sales: 3000, orders: 198 },
  { name: "Mar", sales: 5000, orders: 320 },
  { name: "Apr", sales: 4500, orders: 280 },
  { name: "May", sales: 6000, orders: 390 },
  { name: "Jun", sales: 5500, orders: 350 },
];

const revenueData = [
  { name: "Week 1", revenue: 24000 },
  { name: "Week 2", revenue: 28000 },
  { name: "Week 3", revenue: 32000 },
  { name: "Week 4", revenue: 35000 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "hsl(221, 83%, 53%)" },
  { name: "Clothing", value: 25, color: "hsl(142, 76%, 36%)" },
  { name: "Books", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Home", value: 20, color: "hsl(199, 89%, 48%)" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$125,432"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <StatsCard
          title="Total Orders"
          value="1,284"
          change="+8.3% from last month"
          changeType="positive"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Active Users"
          value="8,549"
          change="+2.1% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Products Sold"
          value="3,462"
          change="-1.2% from last month"
          changeType="negative"
          icon={Package}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Overview */}
        <ChartCard title="Sales Overview">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis
                dataKey="name"
                className="text-xs text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                className="text-xs text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-medium)",
                }}
              />
              <Bar
                dataKey="sales"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue Trend */}
        <ChartCard title="Revenue Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis
                dataKey="name"
                className="text-xs text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                className="text-xs text-muted-foreground"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-medium)",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--accent-success))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--accent-success))", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: "hsl(var(--accent-success))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Category Distribution */}
        <ChartCard title="Sales by Category" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-medium)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <ChartCard title="Recent Activity">
            <div className="space-y-4">
              {[
                {
                  icon: ShoppingCart,
                  title: "New order received",
                  description: "Order #1234 from John Doe - $125.99",
                  time: "2 minutes ago",
                  type: "order",
                },
                {
                  icon: Users,
                  title: "New user registered",
                  description: "jane.smith@example.com joined",
                  time: "15 minutes ago",
                  type: "user",
                },
                {
                  icon: Package,
                  title: "Product updated",
                  description: "iPhone 15 Pro inventory updated",
                  time: "1 hour ago",
                  type: "product",
                },
                {
                  icon: TrendingUp,
                  title: "Sales milestone reached",
                  description: "Monthly target of $100k achieved",
                  time: "2 hours ago",
                  type: "milestone",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}