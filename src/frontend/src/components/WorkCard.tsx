import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';
import type { WorkItem } from '../backend';

interface WorkCardProps {
  workItem: WorkItem;
}

export default function WorkCard({ workItem }: WorkCardProps) {
  const deadline = new Date(Number(workItem.deadline) / 1000000);
  const isOverdue = deadline < new Date() && !workItem.completed;
  const daysUntil = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className={`hover:shadow-lg transition-shadow ${workItem.completed ? 'opacity-75' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span className="text-xl">{workItem.projectName}</span>
          {workItem.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{workItem.description}</p>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className={isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}>
            {deadline.toLocaleDateString()}
          </span>
        </div>
        {!workItem.completed && (
          <Badge variant={isOverdue ? 'destructive' : daysUntil <= 3 ? 'default' : 'secondary'}>
            {isOverdue ? 'Overdue' : daysUntil === 0 ? 'Due today' : `${daysUntil} days left`}
          </Badge>
        )}
        {workItem.completed && <Badge variant="outline">Completed</Badge>}
      </CardContent>
    </Card>
  );
}
