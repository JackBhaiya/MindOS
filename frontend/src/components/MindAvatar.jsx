import { Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const MindAvatar = ({ size = 'md', animated = true }) => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const iconSizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  };

  const AvatarContent = () => (
    <div className={`${sizes[size]} relative`}>
      <div className="absolute inset-0 glass-card rounded-full flex items-center justify-center animate-neural-pulse">
        <Brain size={iconSizes[size]} className="text-primary" />
      </div>
      <div className="absolute -top-2 -right-2">
        <Sparkles size={iconSizes[size] / 3} className="text-accent animate-pulse-glow" />
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <AvatarContent />
      </motion.div>
    );
  }

  return <AvatarContent />;
};