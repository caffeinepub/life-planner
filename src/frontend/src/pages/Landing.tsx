import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { BookOpen, Briefcase, Target, TrendingUp, ArrowRight } from 'lucide-react';

export default function Landing() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: '/dashboard' });
    }
  }, [identity, navigate]);

  const features = [
    {
      icon: '/assets/generated/icon-studies.dim_64x64.png',
      title: 'Studies',
      description: 'Organize your subjects, track progress, and manage study schedules effectively.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '/assets/generated/icon-work.dim_64x64.png',
      title: 'Work',
      description: 'Keep track of projects, deadlines, and tasks to stay on top of your workload.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '/assets/generated/icon-habits.dim_64x64.png',
      title: 'Habits',
      description: 'Build positive routines, track daily completions, and maintain streaks.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '/assets/generated/icon-goals.dim_64x64.png',
      title: 'Goals',
      description: 'Set ambitious goals, break them into milestones, and achieve your dreams.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="container py-12 md:py-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-coral via-amber to-teal bg-clip-text text-transparent">
          Plan Your Life, Achieve Your Dreams
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          The all-in-one platform for young people to manage studies, work, habits, and goals in one simple place.
        </p>
        <Button
          size="lg"
          onClick={login}
          disabled={isLoggingIn}
          className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0 text-lg px-8 py-6"
        >
          {isLoggingIn ? 'Logging in...' : 'Get Started'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Hero Banner */}
      <div className="max-w-5xl mx-auto mb-20 rounded-2xl overflow-hidden shadow-2xl">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="MOMENTUM workspace showing organized study materials and planning tools"
          className="w-full h-auto"
        />
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Everything You Need to Succeed</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-3 flex-shrink-0`}>
                  <img src={feature.icon} alt={`${feature.title} icon`} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto text-center mt-20 p-12 bg-gradient-to-br from-coral/10 via-amber/10 to-teal/10 rounded-3xl border border-border">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Life?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of young people who are taking control of their future.
        </p>
        <Button
          size="lg"
          onClick={login}
          disabled={isLoggingIn}
          className="bg-gradient-to-r from-coral to-amber hover:from-coral/90 hover:to-amber/90 text-white border-0 text-lg px-8 py-6"
        >
          {isLoggingIn ? 'Logging in...' : 'Start Planning Today'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
