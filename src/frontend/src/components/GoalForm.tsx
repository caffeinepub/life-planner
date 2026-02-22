import { useState } from 'react';
import { useAddGoal } from '../hooks/useGoals';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, X } from 'lucide-react';

interface GoalFormProps {
  onClose: () => void;
}

export default function GoalForm({ onClose }: GoalFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [milestones, setMilestones] = useState<string[]>(['']);
  const { mutate: addGoal, isPending } = useAddGoal();

  const handleAddMilestone = () => {
    setMilestones([...milestones, '']);
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleMilestoneChange = (index: number, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validMilestones = milestones.filter((m) => m.trim());
    if (title.trim() && description.trim() && targetDate) {
      const targetDateTime = new Date(targetDate);
      addGoal(
        {
          id: BigInt(Date.now()),
          title: title.trim(),
          description: description.trim(),
          targetDate: BigInt(targetDateTime.getTime() * 1000000),
          milestones: validMilestones,
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogDescription>Set an ambitious goal and break it down into milestones.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Learn a new language, Run a marathon"
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
              placeholder="Why is this goal important to you? What will you achieve?"
              rows={3}
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetDate">Target Date *</Label>
            <Input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
              disabled={isPending}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="space-y-2">
            <Label>Milestones</Label>
            <div className="space-y-2">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={milestone}
                    onChange={(e) => handleMilestoneChange(index, e.target.value)}
                    placeholder={`Milestone ${index + 1}`}
                    disabled={isPending}
                  />
                  {milestones.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveMilestone(index)}
                      disabled={isPending}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddMilestone}
              disabled={isPending}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !title.trim() || !description.trim() || !targetDate}
              className="flex-1"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Goal'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
