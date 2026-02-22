import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Flame } from 'lucide-react';
import type { Habit } from '../backend';

interface HabitCardProps {
  habit: Habit;
}

export default function HabitCard({ habit }: HabitCardProps) {
  const frequencyTarget = Number(habit.frequencyTarget);
  const completedDays = habit.trackingHistory.filter((day) => day).length;
  const streak = calculateStreak(habit.trackingHistory);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span className="text-xl">{habit.name}</span>
          {streak > 0 && (
            <Badge variant="secondary" className="ml-2 flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" />
              {streak} day{streak !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{habit.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Target: {frequencyTarget}x per week</span>
          <span className="font-medium">
            {completedDays}/{frequencyTarget} this week
          </span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">{day}</span>
              <Checkbox checked={habit.trackingHistory[index] || false} disabled className="pointer-events-none" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function calculateStreak(trackingHistory: boolean[]): number {
  let streak = 0;
  for (let i = trackingHistory.length - 1; i >= 0; i--) {
    if (trackingHistory[i]) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
