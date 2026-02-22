import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useStudies } from '../hooks/useStudies';
import StudyCard from '../components/StudyCard';
import StudyForm from '../components/StudyForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, BookOpen } from 'lucide-react';

export default function Studies() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: studies, isLoading } = useStudies();
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
            <BookOpen className="w-8 h-8 text-coral" />
            Studies
          </h1>
          <p className="text-lg text-muted-foreground">Manage your subjects and track your progress.</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Study
        </Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : studies && studies.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((study) => (
            <StudyCard key={study.id.toString()} study={study} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No studies yet</h3>
          <p className="text-muted-foreground mb-6">Start by adding your first study subject.</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Study
          </Button>
        </div>
      )}

      {showForm && <StudyForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
