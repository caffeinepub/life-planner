import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGoals } from '../hooks/useGoals';
import GoalCard from '../components/GoalCard';
import GoalForm from '../components/GoalForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Goals() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: goals, isLoading } = useGoals();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  if (!identity) {
    return null;
  }

  const activeGoals = goals?.filter((goal) => !goal.completed) || [];
  const completedGoals = goals?.filter((goal) => goal.completed) || [];

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Target className="w-8 h-8 text-coral" />
            Goals
          </h1>
          <p className="text-lg text-muted-foreground">Set ambitious goals and track your milestones.</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      ) : goals && goals.length > 0 ? (
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active ({activeGoals.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedGoals.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {activeGoals.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {activeGoals.map((goal) => (
                  <GoalCard key={goal.id.toString()} goal={goal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No active goals. Set a new goal to get started!</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed">
            {completedGoals.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {completedGoals.map((goal) => (
                  <GoalCard key={goal.id.toString()} goal={goal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No completed goals yet. Keep working towards your dreams!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
            <Target className="w-12 h-12 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No goals yet</h3>
          <p className="text-muted-foreground mb-6">Start achieving your dreams by setting your first goal.</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Goal
          </Button>
        </div>
      )}

      {showForm && <GoalForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
