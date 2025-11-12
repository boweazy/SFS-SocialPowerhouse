import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Search, Filter, Plus } from 'lucide-react';

export default function ContentLibrary() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <FileText className="w-8 h-8 text-primary" />
              Content Library
            </h1>
            <p className="text-muted-foreground">
              Manage all your content assets in one place
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Upload Content
          </Button>
        </div>

        {/* Search & Filters */}
        <Card className="glass-card p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search content..." className="pl-10" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="glass-card p-4">
              <div className="aspect-video bg-accent/50 rounded-lg mb-3 flex items-center justify-center">
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Content Item {i}</h3>
              <p className="text-sm text-muted-foreground mb-3">Image • 1.2 MB</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Use
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
