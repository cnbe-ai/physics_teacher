import { useState } from 'react';
import Navigation from './components/Navigation';
import AIChatPanel from './components/AIChatPanel';
import FloatingChatButton from './components/FloatingChatButton';
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import CareerPage from './pages/CareerPage';
import MotivationPage from './pages/MotivationPage';
import DiagnosisPage from './pages/DiagnosisPage';
import ResourcesPage from './pages/ResourcesPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState(null);

  const handleOpenChat = (message) => {
    setInitialChatMessage(message);
    setChatOpen(true);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage />;
      case 'roadmap': return <RoadmapPage />;
      case 'career': return <CareerPage />;
      case 'motivation': return <MotivationPage />;
      case 'diagnosis': return <DiagnosisPage onOpenChat={handleOpenChat} />;
      case 'resources': return <ResourcesPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 pb-24">
        {renderPage()}
      </main>

      {/* AI Chat */}
      <AIChatPanel
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        initialMessage={initialChatMessage}
      />
      <FloatingChatButton isOpen={chatOpen} onClick={() => setChatOpen(!chatOpen)} />
    </div>
  );
}
