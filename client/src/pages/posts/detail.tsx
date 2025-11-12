import { useRoute, Link, useLocation } from 'wouter';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation } from '@tanstack/react-query';
import type { Post } from '@shared/schema';
import { ArrowLeft, Trash2, Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function PostDetail() {
  const [, params] = useRoute('/posts/:id');
  const [, setLocation] = useLocation();
  const postId = params?.id;
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch post details
  const { data: postData, isLoading } = useQuery<{ post: Post }>({
    queryKey: [`/api/posts/${postId}`],
    enabled: !!postId,
  });

  const post = postData?.post;

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!postId) throw new Error('Post ID required');
      return apiRequest('DELETE', `/api/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      toast({
        title: 'Post deleted',
        description: 'Your post has been deleted successfully.',
      });
      setLocation('/posts');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete post. Please try again.',
        variant: 'destructive',
      });
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12" data-testid="loading-post">Loading post...</div>
      </DashboardLayout>
    );
  }

  if (!post) {
    return (
      <DashboardLayout>
        <Card className="glass-card p-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The post you're looking for doesn't exist or has been deleted.
          </p>
          <Link href="/posts">
            <Button>Back to Posts</Button>
          </Link>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/posts">
            <Button variant="outline" className="gap-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Posts
            </Button>
          </Link>
          <Button
            variant="outline"
            className="gap-2 text-destructive"
            onClick={() => setShowDeleteDialog(true)}
            data-testid="button-delete"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>

        {/* Post Details */}
        <Card className="glass-card p-6">
          <div className="space-y-4">
            {/* Status and Platforms */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant={post.status === 'published' ? 'default' : 'secondary'} data-testid="badge-status">
                  {post.status}
                </Badge>
                {post.platforms.map((platform) => (
                  <Badge key={platform} variant="outline" data-testid={`badge-platform-${platform}`}>
                    {platform}
                  </Badge>
                ))}
              </div>
              {post.scheduledAt && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {format(parseISO(post.scheduledAt.toString()), 'MMM d, yyyy')}
                  <Clock className="w-4 h-4 ml-2" />
                  {format(parseISO(post.scheduledAt.toString()), 'HH:mm')}
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-2">Content</h2>
              <p className="text-lg whitespace-pre-wrap" data-testid="text-content">{post.content}</p>
            </div>

            {/* AI Metadata */}
            {post.aiGenerated && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">AI Metadata</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {post.tone && (
                    <div>
                      <span className="text-muted-foreground">Tone:</span>
                      <span className="ml-2 font-medium">{post.tone}</span>
                    </div>
                  )}
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Hashtags:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {post.hashtags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="border-t pt-4 text-sm text-muted-foreground">
              {post.createdAt && <p>Created: {format(parseISO(post.createdAt.toString()), 'MMM d, yyyy HH:mm')}</p>}
              {post.updatedAt && <p>Updated: {format(parseISO(post.updatedAt.toString()), 'MMM d, yyyy HH:mm')}</p>}
            </div>
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this post. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate()}
              className="bg-destructive text-destructive-foreground"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
