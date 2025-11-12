import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PenSquare, Image as ImageIcon, Calendar, Send } from 'lucide-react';

export default function CreatePost() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <PenSquare className="w-8 h-8 text-primary" />
            Create Post
          </h1>
          <p className="text-muted-foreground">
            Create and publish content across all your platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content">Post Content</Label>
                  <Textarea
                    id="content"
                    placeholder="What's on your mind?"
                    className="mt-2 min-h-48"
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Add Media
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </Button>
                </div>
              </div>
            </Card>

            {/* Platform Preview */}
            <Card className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="border border-border rounded-lg p-4 min-h-32">
                <p className="text-muted-foreground">Preview will appear here...</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platform Selection */}
            <Card className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">Platforms</h2>
              <div className="space-y-2">
                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((platform) => (
                  <label key={platform} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>{platform}</span>
                  </label>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <Card className="glass-card p-6">
              <div className="space-y-3">
                <Button className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Publish Now
                </Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
