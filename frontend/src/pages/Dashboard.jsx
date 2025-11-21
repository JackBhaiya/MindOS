import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain, Heart, Target, Sparkles, Zap, BookOpen,
  TrendingUp, Activity, Menu, X, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { NeuralBackground } from '@/components/NeuralBackground';
import { MindAvatar } from '@/components/MindAvatar';

const MODULES = [
  { id: 'vault', name: 'Mind Vault', icon: Brain, color: 'primary', description: 'Your cognitive memory storage' },
  { id: 'emotion', name: 'Emotion Core', icon: Heart, color: 'accent', description: 'Emotional state tracking' },
  { id: 'focus', name: 'Focus Mode', icon: Target, color: 'secondary', description: 'Deep work environment' },
  { id: 'ideas', name: 'Idea Generator', icon: Sparkles, color: 'primary', description: 'Creative thought synthesis' },
  { id: 'simulation', name: 'Life Simulation', icon: TrendingUp, color: 'accent', description: 'Future outcome prediction' },
  { id: 'reflection', name: 'Daily Reflection', icon: BookOpen, color: 'secondary', description: 'Thought journaling' },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cognitiveScore, setCognitiveScore] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('mindos_user');
    const onboardingComplete = localStorage.getItem('mindos_onboarding_complete');

    if (!onboardingComplete) {
      navigate('/onboarding');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Animate cognitive score
    const timer = setInterval(() => {
      setCognitiveScore(prev => (prev >= 87 ? 87 : prev + 1));
    }, 30);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <NeuralBackground />

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-full w-72 glass-card z-50 p-6 md:hidden"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold gradient-text">MindOS</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        {/* Sidebar content */}
      </motion.div>

      {/* Header */}
      <div className="sticky top-0 z-40 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold gradient-text">MindOS</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 glass-card px-4 py-2 rounded-lg">
                <Activity size={20} className="text-primary animate-pulse-glow" />
                <span className="text-sm">System Active</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass-card p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <MindAvatar size="lg" animated={false} />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h2>
                <p className="text-muted-foreground mb-4">
                  Your digital twin is analyzing patterns and optimizing your cognitive performance
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {user.goals?.map((goal, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{cognitiveScore}%</div>
                <p className="text-sm text-muted-foreground">Cognitive Score</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Focus Sessions', value: '12', icon: Target, trend: '+8%' },
            { label: 'Thoughts Logged', value: '34', icon: Brain, trend: '+12%' },
            { label: 'Simulations Run', value: '7', icon: TrendingUp, trend: '+3' },
            { label: 'Energy Level', value: 'High', icon: Zap, trend: '94%' },
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <StatIcon size={20} className="text-primary" />
                    <span className="text-xs text-success">{stat.trend}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Modules Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Cognitive Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((module, index) => {
              const ModuleIcon = module.icon;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="glass-card p-6 cursor-pointer group hover:border-primary/50 transition-all h-full flex flex-col"
                    onClick={() => navigate(`/module/${module.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-lg glass-card flex items-center justify-center animate-neural-pulse`}>
                        <ModuleIcon size={28} className="text-primary" />
                      </div>
                      <div className="w-3 h-3 rounded-full bg-success animate-pulse-glow" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {module.name}
                    </h4>
                    <p className="text-muted-foreground text-sm mt-auto">{module.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Cognitive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6">Today's Cognitive Activity</h3>
            <div className="space-y-4">
              {[
                { time: '09:00', action: 'Focus session completed', icon: Target, color: 'primary' },
                { time: '11:30', action: 'Emotional state: Calm', icon: Heart, color: 'accent' },
                { time: '14:00', action: 'New memory added to vault', icon: Brain, color: 'secondary' },
                { time: '16:45', action: 'Life simulation executed', icon: TrendingUp, color: 'primary' },
              ].map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ItemIcon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.action}</div>
                      <div className="text-sm text-muted-foreground">{item.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};