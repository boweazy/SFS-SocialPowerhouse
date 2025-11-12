import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Zap, Eye } from 'lucide-react';

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-primary" />
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your social media performance and insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Reach</p>
                <h3 className="text-3xl font-bold mt-2">156.2K</h3>
                <p className="text-sm text-green-600 mt-2">+22.5% from last month</p>
              </div>
              <Eye className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Engagement</p>
                <h3 className="text-3xl font-bold mt-2">45.2K</h3>
                <p className="text-sm text-green-600 mt-2">+8.3% from last month</p>
              </div>
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Followers</p>
                <h3 className="text-3xl font-bold mt-2">23.5K</h3>
                <p className="text-sm text-green-600 mt-2">+15.2% from last month</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Engagement Rate</p>
                <h3 className="text-3xl font-bold mt-2">3.8%</h3>
                <p className="text-sm text-green-600 mt-2">+0.4% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Engagement Over Time</h2>
            <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Chart coming soon</p>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
            <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Chart coming soon</p>
            </div>
          </Card>
        </div>

        {/* Top Posts */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Top Performing Posts</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div>
                  <p className="font-medium">Post title {i}</p>
                  <p className="text-sm text-muted-foreground">Facebook • 2 days ago</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{1200 + i * 100}</p>
                  <p className="text-sm text-muted-foreground">engagements</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
