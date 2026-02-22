import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, CheckCircle2 } from 'lucide-react';
import type { Goal } from '../backend';

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const targetDate = new Date(Number(goal.targetDate) / 1000000);
  const completionPercentage = goal.milestones.length > 0 ? 0 : 0;

  return (
    <Card className={`hover:shadow-lg transition-shadow ${goal.completed ? 'opacity-75' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span className="text-xl">{goal.title}</span>
          {goal.completed && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{goal.description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Target: {targetDate.toLocaleDateString()}</span>
        </div>
        {goal.milestones.length > 0 && (
          <>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            <div className="space-y-2 pt-2 border-t border-border">
              <p className="text-sm font-medium">Milestones:</p>
              {goal.milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Checkbox disabled className="mt-0.5 pointer-events-none" />
                  <span className="text-sm text-muted-foreground">{milestone}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {goal.completed && <Badge variant="outline">Completed</Badge>}
      </CardContent>
    </Card>
  );
}
