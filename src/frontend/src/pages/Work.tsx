import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useWorkItems } from '../hooks/useWorkItems';
import WorkCard from '../components/WorkCard';
import WorkForm from '../components/WorkForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Briefcase } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Work() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: workItems, isLoading } = useWorkItems();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  if (!identity) {
    return null;
  }

  const activeItems = workItems?.filter((item) => !item.completed) || [];
  const completedItems = workItems?.filter((item) => item.completed) || [];

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-coral" />
            Work
          </h1>
          <p className="text-lg text-muted-foreground">Track your projects and manage deadlines.</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Work Item
        </Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : workItems && workItems.length > 0 ? (
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active ({activeItems.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedItems.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {activeItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeItems.map((item) => (
                  <WorkCard key={item.id.toString()} workItem={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No active work items. Great job! 🎉</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed">
            {completedItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedItems.map((item) => (
                  <WorkCard key={item.id.toString()} workItem={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No completed work items yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <Briefcase className="w-12 h-12 text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No work items yet</h3>
          <p className="text-muted-foreground mb-6">Start by adding your first project or task.</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Work Item
          </Button>
        </div>
      )}

      {showForm && <WorkForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
