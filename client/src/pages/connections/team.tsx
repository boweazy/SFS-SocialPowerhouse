import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, MoreVertical, Trash2, UserCog } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
    email: string;
    name: string | null;
    avatar: string | null;
  } | null;
}

export default function TeamMembers() {
  const { toast } = useToast();
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');

  // Fetch team members
  const { data: membersData, isLoading } = useQuery<{ members: TeamMember[] }>({
    queryKey: ['/api/team/members'],
  });

  const members = membersData?.members || [];

  // Invite member mutation
  const inviteMutation = useMutation({
    mutationFn: async (data: { email: string; role: string }) => {
      return await apiRequest('POST', '/api/team/members', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/team/members'] });
      toast({
        title: 'Member invited',
        description: 'Team member has been invited successfully',
      });
      setInviteDialogOpen(false);
      setInviteEmail('');
      setInviteRole('viewer');
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to invite member',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  // Update member role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async (data: { id: string; role: string }) => {
      return await apiRequest('PATCH', `/api/team/members/${data.id}`, { role: data.role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/team/members'] });
      toast({
        title: 'Role updated',
        description: 'Member role has been updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update role',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  // Remove member mutation
  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest('DELETE', `/api/team/members/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/team/members'] });
      toast({
        title: 'Member removed',
        description: 'Team member has been removed successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to remove member',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  const handleInvite = () => {
    if (!inviteEmail || !inviteRole) {
      toast({
        title: 'Validation error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    inviteMutation.mutate({ email: inviteEmail, role: inviteRole });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'owner':
        return 'default';
      case 'admin':
        return 'secondary';
      case 'editor':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="heading-team-members">
              <Users className="w-8 h-8 text-primary" />
              Team Members
            </h1>
            <p className="text-muted-foreground">
              Manage your team and their permissions
            </p>
          </div>
          
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-invite-member">
                <Plus className="w-4 h-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Invite a new member to your team by entering their email address
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="member@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    data-testid="input-invite-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger id="role" data-testid="select-invite-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {inviteRole === 'admin' && 'Can manage team members and all content'}
                    {inviteRole === 'editor' && 'Can create and edit content'}
                    {inviteRole === 'viewer' && 'Can view content only'}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setInviteDialogOpen(false)}
                  data-testid="button-cancel-invite"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleInvite}
                  disabled={inviteMutation.isPending}
                  data-testid="button-send-invite"
                >
                  {inviteMutation.isPending ? 'Sending...' : 'Send Invite'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team List */}
        <Card className="glass-card p-6">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground" data-testid="loading-members">
              Loading team members...
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground" data-testid="empty-members">
              No team members yet. Invite someone to get started!
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                  data-testid={`member-${member.id}`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.user?.avatar || undefined} />
                      <AvatarFallback>
                        {member.user?.name?.charAt(0) || member.user?.username?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold" data-testid={`member-name-${member.id}`}>
                        {member.user?.name || member.user?.username || 'Unknown'}
                      </p>
                      <p className="text-sm text-muted-foreground" data-testid={`member-email-${member.id}`}>
                        {member.user?.email || 'No email'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getRoleBadgeVariant(member.role)} data-testid={`member-role-${member.id}`}>
                      {member.role}
                    </Badge>
                    {member.role !== 'owner' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" data-testid={`button-member-actions-${member.id}`}>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => updateRoleMutation.mutate({ id: member.id, role: 'admin' })}
                            disabled={member.role === 'admin'}
                            data-testid={`action-make-admin-${member.id}`}
                          >
                            <UserCog className="w-4 h-4 mr-2" />
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateRoleMutation.mutate({ id: member.id, role: 'editor' })}
                            disabled={member.role === 'editor'}
                            data-testid={`action-make-editor-${member.id}`}
                          >
                            <UserCog className="w-4 h-4 mr-2" />
                            Make Editor
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateRoleMutation.mutate({ id: member.id, role: 'viewer' })}
                            disabled={member.role === 'viewer'}
                            data-testid={`action-make-viewer-${member.id}`}
                          >
                            <UserCog className="w-4 h-4 mr-2" />
                            Make Viewer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => removeMutation.mutate(member.id)}
                            className="text-destructive"
                            data-testid={`action-remove-${member.id}`}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
