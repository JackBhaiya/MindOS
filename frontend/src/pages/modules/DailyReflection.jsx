import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Save, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { NeuralBackground } from '@/components/NeuralBackground';
import { toast } from 'sonner';

const REFLECTION_PROMPTS = [
  'What was the most important thing you learned today?',
  'What challenge did you overcome?',
  'What are you grateful for today?',
  'What would you do differently tomorrow?',
  'What made you feel most alive today?'
];

export const DailyReflection = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      content: 'Today I realized the importance of taking breaks. Deep work is powerful, but recovery is equally important.'
    }
  ]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(REFLECTION_PROMPTS[0]);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const entry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      content: currentEntry
    };

    setEntries([entry, ...entries]);
    setCurrentEntry('');
    toast.success('Reflection saved successfully!');
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
                <BookOpen size={24} className="text-secondary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Daily Reflection</h1>
                <p className="text-xs text-muted-foreground">Thought journaling</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* New Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4">Today's Reflection</h2>
            
            {/* Prompt Selector */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Reflection Prompt</label>
              <select
                className="w-full h-12 px-4 rounded-lg glass-card border border-border"
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
              >
                {REFLECTION_PROMPTS.map((prompt, i) => (
                  <option key={i} value={prompt}>{prompt}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <Textarea
                placeholder="Write your thoughts..."
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                rows={6}
                className="glass-card"
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {currentEntry.length} characters
              </span>
              <Button variant="neural" onClick={saveEntry} disabled={!currentEntry.trim()}>
                <Save size={16} />
                Save Reflection
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Past Entries */}
        <div>
          <h3 className="text-xl font-bold mb-4">Past Reflections</h3>
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar size={16} />
                    <span>{entry.date}</span>
                  </div>
                  <p className="text-foreground leading-relaxed">{entry.content}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};