import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, RefreshCw, Copy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NeuralBackground } from '@/components/NeuralBackground';
import { toast } from 'sonner';

const IDEA_TEMPLATES = [
  {
    category: 'Business',
    ideas: [
      'AI-powered personal finance advisor for Gen Z',
      'Sustainable fashion marketplace with carbon tracking',
      'Remote work wellness platform with mental health focus'
    ]
  },
  {
    category: 'Creative',
    ideas: [
      'Interactive storytelling platform with branching narratives',
      'AI art collaboration tool for digital artists',
      'Music composition assistant using neural networks'
    ]
  },
  {
    category: 'Social Impact',
    ideas: [
      'Community-driven food waste reduction app',
      'Educational platform for underserved communities',
      'Climate action gamification for daily habits'
    ]
  }
];

export const IdeaGenerator = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [savedIdeas, setSavedIdeas] = useState([]);

  const generateIdeas = async () => {
    if (!topic.trim()) return;

    setGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockIdeas = [
      `${topic}-focused mobile app with AI personalization`,
      `Blockchain-based ${topic} marketplace`,
      `Community platform connecting ${topic} enthusiasts`,
      `${topic} learning platform with gamification`,
      `Smart ${topic} assistant using machine learning`
    ];

    setIdeas(mockIdeas);
    setGenerating(false);
  };

  const saveIdea = (idea) => {
    if (!savedIdeas.includes(idea)) {
      setSavedIdeas([...savedIdeas, idea]);
      toast.success('Idea saved!');
    }
  };

  const copyIdea = (idea) => {
    navigator.clipboard.writeText(idea);
    toast.success('Copied to clipboard!');
  };

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
                <Sparkles size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Idea Generator</h1>
                <p className="text-xs text-muted-foreground">Creative thought synthesis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4">Generate New Ideas</h2>
            <p className="text-muted-foreground mb-6">
              Enter a topic or domain, and let AI synthesize creative ideas for you.
            </p>

            <div className="flex gap-4">
              <Input
                placeholder="E.g., education, healthcare, entertainment..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 h-12 glass-card"
                onKeyDown={(e) => e.key === 'Enter' && generateIdeas()}
              />
              <Button
                variant="neural"
                size="lg"
                onClick={generateIdeas}
                disabled={!topic.trim() || generating}
              >
                {generating ? (
                  <RefreshCw size={20} className="animate-spin" />
                ) : (
                  <Sparkles size={20} />
                )}
                Generate
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Generated Ideas */}
        {ideas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold mb-4">Generated Ideas</h3>
            <div className="space-y-3">
              {ideas.map((idea, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-card p-4">
                    <div className="flex items-center justify-between">
                      <p className="flex-1">{idea}</p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => copyIdea(idea)}>
                          <Copy size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => saveIdea(idea)}>
                          <Star size={16} className={savedIdeas.includes(idea) ? 'fill-primary text-primary' : ''} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Templates */}
        <div>
          <h3 className="text-xl font-bold mb-4">Idea Templates</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {IDEA_TEMPLATES.map((template, i) => (
              <motion.div
                key={template.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card p-6 h-full flex flex-col">
                  <h4 className="font-semibold mb-4">{template.category}</h4>
                  <ul className="space-y-3 flex-1">
                    {template.ideas.map((idea, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{idea}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Saved Ideas */}
        {savedIdeas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <h3 className="text-xl font-bold mb-4">Saved Ideas ({savedIdeas.length})</h3>
            <div className="space-y-3">
              {savedIdeas.map((idea, i) => (
                <Card key={i} className="glass-card p-4">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-primary fill-primary flex-shrink-0" />
                    <p className="flex-1">{idea}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};