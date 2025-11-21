import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ArrowLeft, Sparkles, Target, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { NeuralBackground } from '@/components/NeuralBackground';

export const LifeSimulation = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [timeframe, setTimeframe] = useState('30');
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState(null);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const runSimulation = async () => {
    if (!goal) return;

    setSimulating(true);
    setSimulationProgress(0);

    // Simulate AI processing
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockResults = {
      goal: goal,
      timeframe: timeframe,
      prediction: `Based on your cognitive profile and current trajectory, achieving "${goal}" within ${timeframe} days shows strong potential with strategic execution.`,
      mostLikely: {
        outcome: `You will make significant progress toward ${goal}, achieving approximately 75-80% of your target. This requires consistent daily effort and periodic adjustments to your approach.`,
        probability: 72,
        keyFactors: [
          'Current momentum and motivation levels are high',
          'Historical pattern shows strong follow-through on similar goals',
          'Resource availability aligns with requirements'
        ]
      },
      bestCase: {
        outcome: `You exceed your goal by 120%, establishing new standards and creating sustainable systems. This becomes a cornerstone achievement that catalyzes future success.`,
        probability: 28,
        requirements: [
          'Maintain peak focus without interruption',
          'Leverage unexpected opportunities that arise',
          'Optimize all available resources and connections'
        ]
      },
      worstCase: {
        outcome: `Progress stalls at 40% completion due to unforeseen challenges. However, valuable lessons learned position you for future success with refined strategy.`,
        probability: 15,
        risks: [
          'External disruptions (health, environment, commitments)',
          'Underestimating complexity or resource requirements',
          'Energy management and burnout prevention'
        ]
      },
      actionSteps: [
        {
          phase: 'Week 1',
          actions: [
            'Break down goal into daily micro-objectives',
            'Establish baseline metrics and tracking system',
            'Identify and eliminate potential obstacles'
          ]
        },
        {
          phase: `Days ${timeframe > 30 ? '8-15' : '8-14'}`,
          actions: [
            'Review progress and adjust strategy',
            'Double down on what\'s working',
            'Seek feedback and course-correct'
          ]
        },
        {
          phase: 'Final Phase',
          actions: [
            'Intensify effort in critical areas',
            'Prepare for completion and transition',
            'Document lessons and celebrate progress'
          ]
        }
      ],
      insights: [
        'Your cognitive profile suggests morning hours (6am-10am) will be most productive',
        'Energy levels typically peak mid-week; schedule challenging tasks accordingly',
        'Past patterns indicate you perform 23% better with accountability partner'
      ]
    };

    setResults(mockResults);
    setSimulating(false);
  };

  const resetSimulation = () => {
    setResults(null);
    setGoal('');
    setTimeframe('30');
    setSimulationProgress(0);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <NeuralBackground />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft size={20} />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center animate-neural-pulse">
                  <TrendingUp size={24} className="text-accent" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Life Simulation Engine</h1>
                  <p className="text-xs text-muted-foreground">Predict future outcomes with AI</p>
                </div>
              </div>
            </div>
            {results && (
              <Button variant="outline" size="sm" onClick={resetSimulation}>
                New Simulation
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <AnimatePresence mode="wait">
          {!results && !simulating && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-2">What do you want to achieve?</h2>
                <p className="text-muted-foreground mb-6">
                  Describe your goal in detail. The more specific, the better the simulation.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Goal</label>
                    <Textarea
                      placeholder="E.g., Launch my side project and get 100 users, Learn Python and build 3 projects, Establish a morning meditation routine..."
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      rows={4}
                      className="glass-card"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Timeframe (days)</label>
                    <select
                      className="w-full h-12 px-4 rounded-lg glass-card border border-border"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                    >
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="180">6 months</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>

                  <Button
                    variant="neural"
                    size="lg"
                    className="w-full"
                    onClick={runSimulation}
                    disabled={!goal}
                  >
                    Run Simulation
                    <Sparkles size={20} />
                  </Button>
                </div>
              </Card>

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Neural Analysis', desc: 'Cognitive pattern matching', icon: Activity },
                  { title: 'Probability Engine', desc: 'Multi-scenario modeling', icon: TrendingUp },
                  { title: 'Action Planning', desc: 'Strategic roadmap generation', icon: Target }
                ].map((item, i) => {
                  const ItemIcon = item.icon;
                  return (
                    <Card key={i} className="glass-card p-4">
                      <ItemIcon size={24} className="text-primary mb-2" />
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          )}

          {simulating && (
            <motion.div
              key="simulating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="glass-card p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center animate-neural-pulse">
                    <TrendingUp size={48} className="text-accent" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Simulating Future Timelines...</h2>
                <p className="text-muted-foreground mb-6">Analyzing cognitive patterns and probability matrices</p>
                <div className="max-w-md mx-auto">
                  <Progress value={simulationProgress} className="h-3 mb-2" />
                  <div className="text-sm text-muted-foreground">{simulationProgress}%</div>
                </div>
              </Card>
            </motion.div>
          )}

          {results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* AI Prediction Summary */}
              <Card className="glass-card p-8 border-2 border-primary/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI Prediction</h3>
                    <p className="text-foreground leading-relaxed">{results.prediction}</p>
                  </div>
                </div>
              </Card>

              {/* Most Likely Outcome */}
              <Card className="glass-card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Target size={24} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Most Likely Outcome</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <Progress value={results.mostLikely.probability} className="flex-1 h-2" />
                      <span className="text-2xl font-bold text-secondary">{results.mostLikely.probability}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground mb-6 leading-relaxed">{results.mostLikely.outcome}</p>
                <div>
                  <h4 className="font-semibold mb-3">Key Success Factors:</h4>
                  <ul className="space-y-2">
                    {results.mostLikely.keyFactors.map((factor, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle size={20} className="text-success flex-shrink-0 mt-0.5" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Best Case Scenario */}
              <Card className="glass-card p-8 border border-success/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={24} className="text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Best Case Scenario</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <Progress value={results.bestCase.probability} className="flex-1 h-2" />
                      <span className="text-2xl font-bold text-success">{results.bestCase.probability}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground mb-6 leading-relaxed">{results.bestCase.outcome}</p>
                <div>
                  <h4 className="font-semibold mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {results.bestCase.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-success">{i + 1}</span>
                        </div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Worst Case Scenario */}
              <Card className="glass-card p-8 border border-warning/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={24} className="text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Worst Case Scenario</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <Progress value={results.worstCase.probability} className="flex-1 h-2" />
                      <span className="text-2xl font-bold text-warning">{results.worstCase.probability}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground mb-6 leading-relaxed">{results.worstCase.outcome}</p>
                <div>
                  <h4 className="font-semibold mb-3">Potential Risks:</h4>
                  <ul className="space-y-2">
                    {results.worstCase.risks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <AlertTriangle size={20} className="text-warning flex-shrink-0 mt-0.5" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Action Steps */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-bold mb-6">Strategic Action Plan</h3>
                <div className="space-y-6">
                  {results.actionSteps.map((phase, i) => (
                    <div key={i} className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-0 last:pb-0">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>
                      <h4 className="font-semibold mb-3">{phase.phase}</h4>
                      <ul className="space-y-2">
                        {phase.actions.map((action, j) => (
                          <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
                            <span className="text-primary mt-1">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              {/* AI Insights */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4">Cognitive Insights</h3>
                <div className="space-y-3">
                  {results.insights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/20">
                      <Activity size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{insight}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};