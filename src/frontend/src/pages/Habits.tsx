import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useHabits } from '../hooks/useHabits';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, TrendingUp } from 'lucide-react';

export default function Habits() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: habits, isLoading } = useHabits();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  if (!identity) {
    return null;
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-coral" />
            Habits
          </h1>
          <p className="text-lg text-muted-foreground">Build positive routines and track your progress.</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Habit
        </Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : habits && habits.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {habits.map((habit) => (
            <HabitCard key={habit.id.toString()} habit={habit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
            <TrendingUp className="w-12 h-12 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No habits yet</h3>
          <p className="text-muted-foreground mb-6">Start building positive routines by adding your first habit.</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Habit
          </Button>
        </div>
      )}

      {showForm && <HabitForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
