import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useGetCallerUserProfile';
import { useStudies } from '../hooks/useStudies';
import { useWorkItems } from '../hooks/useWorkItems';
import { useHabits } from '../hooks/useHabits';
import { useGoals } from '../hooks/useGoals';
import DashboardCard from '../components/DashboardCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: studies, isLoading: studiesLoading } = useStudies();
  const { data: workItems, isLoading: workLoading } = useWorkItems();
  const { data: habits, isLoading: habitsLoading } = useHabits();
  const { data: goals, isLoading: goalsLoading } = useGoals();

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  if (!identity) {
    return null;
  }

  const isLoading = studiesLoading || workLoading || habitsLoading || goalsLoading;

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back{userProfile?.name ? `, ${userProfile.name}` : ''}! 👋
        </h1>
        <p className="text-lg text-muted-foreground">Here's an overview of your progress.</p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Studies"
            count={studies?.length || 0}
            iconSrc="/assets/generated/icon-studies.dim_64x64.png"
            navigationPath="/studies"
            gradient="from-blue-500 to-cyan-500"
          />
          <DashboardCard
            title="Work"
            count={workItems?.length || 0}
            iconSrc="/assets/generated/icon-work.dim_64x64.png"
            navigationPath="/work"
            gradient="from-purple-500 to-pink-500"
          />
          <DashboardCard
            title="Habits"
            count={habits?.length || 0}
            iconSrc="/assets/generated/icon-habits.dim_64x64.png"
            navigationPath="/habits"
            gradient="from-green-500 to-emerald-500"
          />
          <DashboardCard
            title="Goals"
            count={goals?.length || 0}
            iconSrc="/assets/generated/icon-goals.dim_64x64.png"
            navigationPath="/goals"
            gradient="from-orange-500 to-red-500"
          />
        </div>
      )}

      {!isLoading && (
        <div className="mt-12 p-8 bg-gradient-to-br from-coral/10 via-amber/10 to-teal/10 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold mb-4">Quick Tips for Success</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>📚 Review your study schedule daily to stay on track</li>
            <li>💼 Prioritize work items by deadline to avoid last-minute stress</li>
            <li>✅ Check off habits consistently to build strong routines</li>
            <li>🎯 Break down big goals into smaller, achievable milestones</li>
          </ul>
        </div>
      )}
    </div>
  );
}
