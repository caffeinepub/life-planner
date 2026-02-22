import { useState } from 'react';
import { useAddStudy } from '../hooks/useStudies';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';

interface StudyFormProps {
  onClose: () => void;
}

export default function StudyForm({ onClose }: StudyFormProps) {
  const [subjectName, setSubjectName] = useState('');
  const [description, setDescription] = useState('');
  const [studySchedule, setStudySchedule] = useState('');
  const [progress, setProgress] = useState([0]);
  const { mutate: addStudy, isPending } = useAddStudy();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subjectName.trim() && description.trim() && studySchedule.trim()) {
      addStudy(
        {
          id: BigInt(Date.now()),
          subjectName: subjectName.trim(),
          description: description.trim(),
          studySchedule: studySchedule.trim(),
          progress: BigInt(progress[0]),
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
          <DialogTitle>Add New Study</DialogTitle>
          <DialogDescription>Create a new study subject to track your learning progress.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subjectName">Subject Name *</Label>
            <Input
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g., Mathematics, History, Programming"
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
              placeholder="What are you studying? What are your goals?"
              rows={3}
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studySchedule">Study Schedule *</Label>
            <Input
              id="studySchedule"
              value={studySchedule}
              onChange={(e) => setStudySchedule(e.target.value)}
              placeholder="e.g., Mon-Fri 6-8 PM, Weekends 2 hours"
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="progress">Current Progress: {progress[0]}%</Label>
            <Slider
              id="progress"
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={5}
              disabled={isPending}
              className="py-4"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !subjectName.trim() || !description.trim() || !studySchedule.trim()}
              className="flex-1"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Study'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
