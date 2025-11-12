import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { PenSquare, Send, Calendar, Save } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { apiRequest } from '@/lib/queryClient';
import { insertPostSchema } from '@shared/schema';

const createPostSchema = insertPostSchema.extend({
  content: z.string().min(1, 'Content is required'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
  status: z.enum(['draft', 'scheduled', 'published']).default('draft'),
}).omit({ userId: true });

type CreatePostForm = z.infer<typeof createPostSchema>;

const AVAILABLE_PLATFORMS = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
];

export default function CreatePost() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const form = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
      platforms: [],
      status: 'draft',
      scheduledAt: undefined,
      aiGenerated: false,
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostForm) => {
      const res = await apiRequest('POST', '/api/posts', data);
      return res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      const messages = {
        draft: { title: 'Draft saved', description: 'Your draft has been saved successfully' },
        scheduled: { title: 'Post scheduled', description: 'Your post has been scheduled successfully' },
        published: { title: 'Post published', description: 'Your post has been published successfully' },
      };
      const message = messages[variables.status];
      toast({
        title: message.title,
        description: message.description,
      });
      form.reset();
      setScheduleDate('');
      setScheduleTime('');
      if (variables.status === 'published') {
        navigate('/posts');
      } else if (variables.status === 'scheduled') {
        navigate('/posts/scheduled');
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save post',
        variant: 'destructive',
      });
    },
  });

  const handleSubmitStatus = (status: 'draft' | 'published' | 'scheduled') => {
    if (status === 'scheduled') {
      if (!scheduleDate || !scheduleTime) {
        toast({
          title: 'Schedule required',
          description: 'Please select a date and time to schedule your post',
          variant: 'destructive',
        });
        return;
      }
      const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`);
      if (scheduledAt <= new Date()) {
        toast({
          title: 'Invalid schedule',
          description: 'Scheduled time must be in the future',
          variant: 'destructive',
        });
        return;
      }
      form.setValue('scheduledAt', scheduledAt as any);
    }
    form.setValue('status', status);
    form.handleSubmit((data) => {
      createPostMutation.mutate(data);
    })();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="heading-create-post">
            <PenSquare className="w-8 h-8 text-primary" />
            Create Post
          </h1>
          <p className="text-muted-foreground">
            Create and publish content across all your platforms
          </p>
        </div>

        <Form {...form}>
          <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card p-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Content</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="What's on your mind?"
                            className="mt-2 min-h-48"
                            data-testid="input-content"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Preview</h2>
                <div className="border border-border rounded-lg p-4 min-h-32">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {form.watch('content') || 'Preview will appear here...'}
                  </p>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Platforms</h2>
                <FormField
                  control={form.control}
                  name="platforms"
                  render={() => (
                    <FormItem>
                      <div className="space-y-2">
                        {AVAILABLE_PLATFORMS.map((platform) => (
                          <FormField
                            key={platform.id}
                            control={form.control}
                            name="platforms"
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(platform.id)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      field.onChange(
                                        checked
                                          ? [...current, platform.id]
                                          : current.filter((p) => p !== platform.id)
                                      );
                                    }}
                                    data-testid={`checkbox-platform-${platform.id}`}
                                  />
                                </FormControl>
                                <FormLabel className="cursor-pointer font-normal">
                                  {platform.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <Card className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Schedule</h2>
                <div className="space-y-3 mb-4">
                  <div>
                    <Label htmlFor="schedule-date">Date</Label>
                    <Input
                      id="schedule-date"
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      data-testid="input-schedule-date"
                    />
                  </div>
                  <div>
                    <Label htmlFor="schedule-time">Time</Label>
                    <Input
                      id="schedule-time"
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      data-testid="input-schedule-time"
                    />
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <div className="space-y-3">
                  <Button
                    type="button"
                    className="w-full gap-2"
                    onClick={() => handleSubmitStatus('published')}
                    disabled={createPostMutation.isPending}
                    data-testid="button-publish-now"
                  >
                    <Send className="w-4 h-4" />
                    {createPostMutation.isPending && form.watch('status') === 'published' 
                      ? 'Publishing...' 
                      : 'Publish Now'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full gap-2"
                    onClick={() => handleSubmitStatus('scheduled')}
                    disabled={createPostMutation.isPending}
                    data-testid="button-schedule-post"
                  >
                    <Calendar className="w-4 h-4" />
                    {createPostMutation.isPending && form.watch('status') === 'scheduled' 
                      ? 'Scheduling...' 
                      : 'Schedule Post'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => handleSubmitStatus('draft')}
                    disabled={createPostMutation.isPending}
                    data-testid="button-save-draft"
                  >
                    <Save className="w-4 h-4" />
                    {createPostMutation.isPending && form.watch('status') === 'draft' 
                      ? 'Saving...' 
                      : 'Save as Draft'}
                  </Button>
                </div>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
}
