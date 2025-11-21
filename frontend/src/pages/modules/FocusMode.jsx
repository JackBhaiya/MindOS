import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { NeuralBackground } from '@/components/NeuralBackground';

const PRESET_SESSIONS = [
  { name: 'Quick Focus', duration: 15, color: 'secondary' },
  { name: 'Deep Work', duration: 25, color: 'primary' },
  { name: 'Extended Flow', duration: 45, color: 'accent' },
  { name: 'Ultra Deep', duration: 90, color: 'primary' }
];

export const FocusMode = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startSession = (minutes) => {
    setDuration(minutes);
    setTimeLeft(minutes * 60);
    setIsActive(true);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

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
                <Target size={24} className="text-secondary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Focus Mode</h1>
                <p className="text-xs text-muted-foreground">Deep work environment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Timer Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card className="glass-card p-12 text-center">
            <div className="flex justify-center mb-8">
              <div className={`w-64 h-64 rounded-full glass-card flex items-center justify-center relative ${
                isActive ? 'animate-neural-pulse' : ''
              }`}>
                <div className="text-6xl font-bold gradient-text">
                  {formatTime(timeLeft)}
                </div>
                <div className="absolute inset-0 rounded-full">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="48%"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      strokeDasharray={`${progress * 3.14 * 2 * 0.48 * 128 / 100} ${3.14 * 2 * 0.48 * 128}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <Button variant="neural" size="lg" onClick={toggleTimer}>
                {isActive ? <Pause size={24} /> : <Play size={24} />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button variant="glass" size="lg" onClick={resetTimer}>
                <RotateCcw size={24} />
                Reset
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setSoundEnabled(!soundEnabled)}>
                {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </Button>
            </div>

            <Progress value={progress} className="h-2" />
          </Card>
        </motion.div>

        {/* Preset Sessions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Quick Start</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRESET_SESSIONS.map((session, i) => (
              <motion.div
                key={session.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="glass-card p-6 cursor-pointer hover:border-primary/50 transition-all text-center"
                  onClick={() => startSession(session.duration)}
                >
                  <div className="text-3xl font-bold gradient-text mb-2">{session.duration}</div>
                  <div className="text-sm text-muted-foreground">{session.name}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="glass-card p-6">
          <h3 className="text-xl font-bold mb-4">Today's Focus Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Sessions', value: '3' },
              { label: 'Total Time', value: '95 min' },
              { label: 'Streak', value: '7 days' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-muted/20">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};