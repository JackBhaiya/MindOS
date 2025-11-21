import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Home } from '@/pages/Home';
import { Onboarding } from '@/pages/Onboarding';
import { Dashboard } from '@/pages/Dashboard';
import { MindVault } from '@/pages/modules/MindVault';
import { EmotionCore } from '@/pages/modules/EmotionCore';
import { FocusMode } from '@/pages/modules/FocusMode';
import { IdeaGenerator } from '@/pages/modules/IdeaGenerator';
import { LifeSimulation } from '@/pages/modules/LifeSimulation';
import { DailyReflection } from '@/pages/modules/DailyReflection';
import '@/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/module/vault" element={<MindVault />} />
          <Route path="/module/emotion" element={<EmotionCore />} />
          <Route path="/module/focus" element={<FocusMode />} />
          <Route path="/module/ideas" element={<IdeaGenerator />} />
          <Route path="/module/simulation" element={<LifeSimulation />} />
          <Route path="/module/reflection" element={<DailyReflection />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;