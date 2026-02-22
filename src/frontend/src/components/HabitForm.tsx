import { useState } from 'react';
import { useAddHabit } from '../hooks/useHabits';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';

interface HabitFormProps {
  onClose: () => void;
}

export default function HabitForm({ onClose }: HabitFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequencyTarget, setFrequencyTarget] = useState([3]);
  const { mutate: addHabit, isPending } = useAddHabit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      addHabit(
        {
          id: BigInt(Date.now()),
          name: name.trim(),
          description: description.trim(),
          frequencyTarget: BigInt(frequencyTarget[0]),
          trackingHistory: [false, false, false, false, false, false, false],
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
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogDescription>Create a new habit to build positive routines.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Habit Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning Exercise, Read for 30 minutes"
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
              placeholder="Why is this habit important to you?"
              rows={3}
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequencyTarget">
              Target Frequency: {frequencyTarget[0]} time{frequencyTarget[0] !== 1 ? 's' : ''} per week
            </Label>
            <Slider
              id="frequencyTarget"
              value={frequencyTarget}
              onValueChange={setFrequencyTarget}
              min={1}
              max={7}
              step={1}
              disabled={isPending}
              className="py-4"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !name.trim() || !description.trim()} className="flex-1">
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Habit'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
