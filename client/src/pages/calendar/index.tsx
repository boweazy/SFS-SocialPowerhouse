import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <CalendarIcon className="w-8 h-8 text-primary" />
              Content Calendar
            </h1>
            <p className="text-muted-foreground">
              Plan and schedule your social media posts
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Schedule Post
          </Button>
        </div>

        {/* Month Navigation */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-xl font-semibold">November 2025</h2>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendar Grid Placeholder */}
          <div className="grid grid-cols-7 gap-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square border border-border rounded-lg p-2 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="text-sm">{i > 0 && i < 31 ? i : ''}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Posts */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Posts</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div>
                  <p className="font-medium">Scheduled post {i}</p>
                  <p className="text-sm text-muted-foreground">Nov 15, 2025 at 2:00 PM</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
