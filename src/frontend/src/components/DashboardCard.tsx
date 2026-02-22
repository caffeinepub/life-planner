import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  count: number;
  iconSrc: string;
  navigationPath: string;
  gradient: string;
}

export default function DashboardCard({ title, count, iconSrc, navigationPath, gradient }: DashboardCardProps) {
  return (
    <Link to={navigationPath} className="group">
      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} p-3`}>
              <img src={iconSrc} alt={`${title} icon`} className="w-full h-full object-contain" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-2xl font-bold mb-1">{title}</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-coral to-amber bg-clip-text text-transparent">
            {count}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{count === 1 ? 'item' : 'items'}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
