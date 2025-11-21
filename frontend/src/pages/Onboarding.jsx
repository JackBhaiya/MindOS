import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Heart, Target, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button-variants';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { NeuralBackground } from '@/components/NeuralBackground';
import { MindAvatar } from '@/components/MindAvatar';

const ONBOARDING_STEPS = [
  {
    id: 'boot',
    title: 'Initializing MindOS',
    subtitle: 'Booting cognitive kernel...',
    icon: Brain,
    autoProgress: true
  },
  {
    id: 'name',
    title: 'Identity Recognition',
    subtitle: 'What should we call you?',
    icon: Sparkles,
    field: 'name'
  },
  {
    id: 'cognitive',
    title: 'Cognitive Calibration',
    subtitle: 'Mapping neural preferences...',
    icon: Zap,
    autoProgress: true
  },
  {
    id: 'emotional',
    title: 'Emotional Scan',
    subtitle: 'How are you feeling today?',
    icon: Heart,
    options: ['Motivated', 'Calm', 'Energetic', 'Reflective', 'Focused']
  },
  {
    id: 'goals',
    title: 'Objective Alignment',
    subtitle: 'What do you want to achieve?',
    icon: Target,
    options: ['Better Focus', 'Emotional Control', 'Decision Making', 'Memory Enhancement', 'Productivity']
  },
  {
    id: 'complete',
    title: 'Digital Twin Created',
    subtitle: 'Your cognitive OS is ready',
    icon: Brain,
    autoProgress: true
  }
];

export const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    mood: '',
    goals: []
  });
  const [bootProgress, setBootProgress] = useState(0);

  const step = ONBOARDING_STEPS[currentStep];

  useEffect(() => {
    // Auto-progress for boot screens
    if (step.autoProgress) {
      const timer = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              if (currentStep < ONBOARDING_STEPS.length - 1) {
                nextStep();
              } else {
                completeOnboarding();
              }
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [currentStep, step.autoProgress]);

  useEffect(() => {
    setProgress((currentStep / (ONBOARDING_STEPS.length - 1)) * 100);
    if (step.autoProgress) {
      setBootProgress(0);
    }
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('mindos_user', JSON.stringify(formData));
    localStorage.setItem('mindos_onboarding_complete', 'true');
    navigate('/dashboard');
  };

  const handleInputChange = (value) => {
    setFormData({ ...formData, [step.field]: value });
  };

  const handleOptionSelect = (option) => {
    if (step.id === 'emotional') {
      setFormData({ ...formData, mood: option });
      setTimeout(nextStep, 300);
    } else if (step.id === 'goals') {
      const goals = formData.goals.includes(option)
        ? formData.goals.filter(g => g !== option)
        : [...formData.goals, option];
      setFormData({ ...formData, goals });
    }
  };

  const canProceed = () => {
    if (step.field && !formData[step.field]) return false;
    if (step.id === 'goals' && formData.goals.length === 0) return false;
    return true;
  };

  const StepIcon = step.icon;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <NeuralBackground />
      
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={progress} className="h-1 rounded-none" />
      </div>

      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <Card className="glass-card p-8 md:p-12">
              {/* Icon */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center animate-neural-pulse">
                  <StepIcon size={48} className="text-primary" />
                </div>
              </motion.div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
                {step.title}
              </h1>
              <p className="text-center text-muted-foreground mb-8 text-lg">
                {step.subtitle}
              </p>

              {/* Boot progress */}
              {step.autoProgress && (
                <div className="space-y-4">
                  <Progress value={bootProgress} className="h-2" />
                  <div className="text-center text-sm text-muted-foreground">
                    {bootProgress}% Complete
                  </div>
                </div>
              )}

              {/* Input field */}
              {step.field === 'name' && (
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="text-lg h-14 glass-card border-primary/30"
                    autoFocus
                  />
                  {formData.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center"
                    >
                      <MindAvatar size="md" animated />
                    </motion.div>
                  )}
                </div>
              )}

              {/* Options */}
              {step.options && (
                <div className="grid grid-cols-2 gap-4">
                  {step.options.map((option) => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-4 rounded-lg glass-card border-2 transition-all ${
                        (step.id === 'emotional' && formData.mood === option) ||
                        (step.id === 'goals' && formData.goals.includes(option))
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Navigation */}
              {!step.autoProgress && (
                <div className="mt-8 flex justify-end">
                  <Button
                    variant="neural"
                    size="lg"
                    onClick={step.id === 'goals' ? completeOnboarding : nextStep}
                    disabled={!canProceed()}
                  >
                    {step.id === 'goals' ? 'Complete Setup' : 'Continue'}
                    <ArrowRight size={20} />
                  </Button>
                </div>
              )}
            </Card>

            {/* Step indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {ONBOARDING_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-primary'
                      : index < currentStep
                      ? 'w-2 bg-primary/50'
                      : 'w-2 bg-muted'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};