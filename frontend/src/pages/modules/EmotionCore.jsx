import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, TrendingUp, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { NeuralBackground } from '@/components/NeuralBackground';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EMOTIONS = [
  { name: 'Joy', value: 85, color: '#10b981' },
  { name: 'Calm', value: 72, color: '#3b82f6' },
  { name: 'Energy', value: 68, color: '#f59e0b' },
  { name: 'Focus', value: 90, color: '#8b5cf6' },
  { name: 'Stress', value: 25, color: '#ef4444' }
];

const MOOD_DATA = [
  { time: '6am', mood: 65 },
  { time: '9am', mood: 75 },
  { time: '12pm', mood: 82 },
  { time: '3pm', mood: 78 },
  { time: '6pm', mood: 85 },
  { time: '9pm', mood: 70 }
];

export const EmotionCore = () => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState('Focused');
  const [moodScore, setMoodScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMoodScore(prev => (prev >= 82 ? 82 : prev + 1));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <NeuralBackground />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center animate-neural-pulse">
                <Heart size={24} className="text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Emotion Core</h1>
                <p className="text-xs text-muted-foreground">Real-time emotional intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Current State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass-card p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center animate-neural-pulse">
                <Heart size={48} className="text-accent" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Current State: {currentMood}</h2>
            <p className="text-muted-foreground mb-6">Your emotional wellness score</p>
            <div className="max-w-md mx-auto">
              <div className="text-4xl font-bold gradient-text mb-2">{moodScore}%</div>
              <Progress value={moodScore} className="h-3" />
            </div>
          </Card>
        </motion.div>

        {/* Emotion Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold mb-4">Emotional Analysis</h3>
          <Card className="glass-card p-6">
            <div className="space-y-4">
              {EMOTIONS.map((emotion, i) => (
                <motion.div
                  key={emotion.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{emotion.name}</span>
                    <span className="text-sm text-muted-foreground">{emotion.value}%</span>
                  </div>
                  <Progress value={emotion.value} className="h-2" style={{ '--progress-color': emotion.color }} />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Mood Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4">Today's Mood Timeline</h3>
          <Card className="glass-card p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MOOD_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                <XAxis dataKey="time" stroke="#a78bfa" />
                <YAxis stroke="#a78bfa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h3 className="text-xl font-bold mb-4">AI Insights</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Peak Performance',
                content: 'Your focus peaks between 3pm-6pm. Schedule important tasks during this window.',
                icon: TrendingUp
              },
              {
                title: 'Energy Pattern',
                content: 'Morning routine positively correlates with afternoon energy levels.',
                icon: Activity
              }
            ].map((insight, i) => {
              const InsightIcon = insight.icon;
              return (
                <Card key={i} className="glass-card p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <InsightIcon size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.content}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};