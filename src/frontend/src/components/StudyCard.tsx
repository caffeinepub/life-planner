import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { Study } from '../backend';

interface StudyCardProps {
  study: Study;
}

export default function StudyCard({ study }: StudyCardProps) {
  const progress = Number(study.progress);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span className="text-xl">{study.subjectName}</span>
          <Badge variant="secondary" className="ml-2">
            {progress}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{study.description}</p>
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Schedule:</span> {study.studySchedule}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
