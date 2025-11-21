import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { NeuralBackground } from '@/components/NeuralBackground';
import { MindAvatar } from '@/components/MindAvatar';

const BOOT_STEPS = [
  { text: 'Initializing Cognitive Kernel', icon: Brain },
  { text: 'Activating Emotional Engine', icon: Sparkles },
  { text: 'Mapping Neural Preferences', icon: Zap },
  { text: 'Building Digital Twin', icon: Target },
  { text: 'System Ready', icon: Shield }
];

export const Home = () => {
  const navigate = useNavigate();
  const [bootStep, setBootStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if onboarding is complete
    const onboardingComplete = localStorage.getItem('mindos_onboarding_complete');
    if (onboardingComplete === 'true') {
      navigate('/dashboard');
      return;
    }

    // Boot sequence animation
    const timer = setInterval(() => {
      setBootStep(prev => {
        if (prev >= BOOT_STEPS.length - 1) {
          clearInterval(timer);
          setTimeout(() => setShowContent(true), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <NeuralBackground />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-12"
        >
          <div className="flex justify-center mb-8">
            <MindAvatar size="xl" animated />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">MindOS</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            The Human Brain Operating System
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A revolutionary cognitive platform that creates a digital twin of your mind,
            analyzing patterns, optimizing decisions, and enhancing your mental performance
          </p>
        </motion.div>

        {/* Boot Sequence */}
        {!showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Card className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Your Brain is Booting...</h3>
              <div className="space-y-4">
                {BOOT_STEPS.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === bootStep;
                  const isComplete = index < bootStep;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary/10 border border-primary/30'
                          : isComplete
                          ? 'bg-success/10 border border-success/30'
                          : 'opacity-40'
                      }`}
                    >
                      <StepIcon
                        size={24}
                        className={`${
                          isActive
                            ? 'text-primary animate-pulse-glow'
                            : isComplete
                            ? 'text-success'
                            : 'text-muted-foreground'
                        }`}
                      />
                      <span className="flex-1">{step.text}</span>
                      {isActive && (
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: '0.2s' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" style={{ animationDelay: '0.4s' }} />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Features & CTA */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Feature Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
              {[
                {
                  icon: Brain,
                  title: 'Cognitive Analysis',
                  description: 'Deep understanding of your thought patterns and mental processes'
                },
                {
                  icon: Zap,
                  title: 'Real-Time Optimization',
                  description: 'Adaptive suggestions that evolve with your cognitive state'
                },
                {
                  icon: Target,
                  title: 'Goal Achievement',
                  description: 'Predictive timelines and probability scenarios for your objectives'
                }
              ].map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="glass-card p-6 h-full flex flex-col">
                      <div className="w-14 h-14 rounded-lg glass-card flex items-center justify-center mb-4 animate-neural-pulse">
                        <FeatureIcon size={28} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                variant="neural"
                size="xl"
                onClick={() => navigate('/onboarding')}
                className="group"
              >
                Initialize Your Mind
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Takes 2 minutes • No credit card required
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};