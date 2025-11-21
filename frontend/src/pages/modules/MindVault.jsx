import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Plus, Search, ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const MindVault = () => {
  const navigate = useNavigate();
  const [memories, setMemories] = useState([
    {
      id: 1,
      title: 'Core Belief: Growth Mindset',
      content: 'I believe that abilities can be developed through dedication and hard work.',
      date: '2024-01-15',
      tags: ['belief', 'mindset'],
      category: 'belief'
    },
    {
      id: 2,
      title: 'Memory: First Major Achievement',
      content: 'Successfully launched my first project. Felt accomplished and validated.',
      date: '2024-01-10',
      tags: ['achievement', 'milestone'],
      category: 'memory'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMemory, setNewMemory] = useState({ title: '', content: '', tags: '', category: 'memory' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredMemories = memories.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addMemory = () => {
    if (!newMemory.title || !newMemory.content) return;

    const memory = {
      id: Date.now(),
      title: newMemory.title,
      content: newMemory.content,
      date: new Date().toISOString().split('T')[0],
      tags: newMemory.tags.split(',').map(t => t.trim()).filter(t => t),
      category: newMemory.category
    };

    setMemories([memory, ...memories]);
    setNewMemory({ title: '', content: '', tags: '', category: 'memory' });
    setDialogOpen(false);
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
                  <Brain size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Mind Vault</h1>
                  <p className="text-xs text-muted-foreground">Your cognitive memory storage</p>
                </div>
              </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="neural" size="sm">
                  <Plus size={16} />
                  Add Memory
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card">
                <DialogHeader>
                  <DialogTitle>Add New Memory</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input
                      placeholder="Memory title"
                      value={newMemory.title}
                      onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Content</label>
                    <Textarea
                      placeholder="Describe your memory, belief, or thought..."
                      value={newMemory.content}
                      onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                    <Input
                      placeholder="belief, achievement, insight"
                      value={newMemory.tags}
                      onChange={(e) => setNewMemory({ ...newMemory, tags: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select
                      className="w-full h-10 px-3 rounded-lg glass-card border border-border"
                      value={newMemory.category}
                      onChange={(e) => setNewMemory({ ...newMemory, category: e.target.value })}
                    >
                      <option value="memory">Memory</option>
                      <option value="belief">Belief</option>
                      <option value="insight">Insight</option>
                    </select>
                  </div>
                  <Button variant="neural" className="w-full" onClick={addMemory}>
                    Save Memory
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <Search size={20} className="text-muted-foreground" />
              <Input
                placeholder="Search memories, beliefs, insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0"
              />
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Memories', value: memories.length, color: 'primary' },
            { label: 'This Month', value: memories.filter(m => m.date.startsWith('2024-01')).length, color: 'accent' },
            { label: 'Categories', value: new Set(memories.map(m => m.category)).size, color: 'secondary' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card p-4 text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Memories Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{memory.title}</h3>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    {memory.category}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 flex-1">{memory.content}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={14} />
                    <span>{memory.date}</span>
                  </div>
                  <div className="flex gap-2">
                    {memory.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-muted/50 text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMemories.length === 0 && (
          <Card className="glass-card p-12 text-center">
            <Brain size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No memories found. Start adding to your vault!</p>
          </Card>
        )}
      </div>
    </div>
  );
};