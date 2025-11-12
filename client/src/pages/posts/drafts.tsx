import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2 } from 'lucide-react';

export default function Drafts() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            Drafts
          </h1>
          <p className="text-muted-foreground">
            Continue working on your saved drafts
          </p>
        </div>

        {/* Drafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="glass-card p-6">
              <div className="flex items-start justify-between mb-3">
                <FileText className="w-6 h-6 text-primary" />
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="font-semibold mb-2">Draft post {i}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Last edited 2 hours ago
              </p>
              <Button variant="outline" className="w-full gap-2">
                <Edit className="w-4 h-4" />
                Continue Editing
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
