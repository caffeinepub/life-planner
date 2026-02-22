import { useState } from 'react';
import { useAddWorkItem } from '../hooks/useWorkItems';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface WorkFormProps {
  onClose: () => void;
}

export default function WorkForm({ onClose }: WorkFormProps) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const { mutate: addWorkItem, isPending } = useAddWorkItem();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim() && description.trim() && deadline) {
      const deadlineDate = new Date(deadline);
      addWorkItem(
        {
          id: BigInt(Date.now()),
          projectName: projectName.trim(),
          description: description.trim(),
          deadline: BigInt(deadlineDate.getTime() * 1000000),
          completed: false,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Work Item</DialogTitle>
          <DialogDescription>Create a new project or task to track your work.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Website Redesign, Research Paper"
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be done? What are the deliverables?"
              rows={3}
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline *</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              disabled={isPending}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !projectName.trim() || !description.trim() || !deadline}
              className="flex-1"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Work Item'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
