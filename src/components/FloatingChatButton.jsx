import { Bot, X } from 'lucide-react';

export default function FloatingChatButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: isOpen ? '#ef4444' : 'linear-gradient(135deg, #1a3a6b, #0ea5e9)',
      }}
      aria-label={isOpen ? 'AI 채팅 닫기' : 'AI 채팅 열기'}
    >
      {isOpen
        ? <X size={22} className="text-white" />
        : <Bot size={22} className="text-white" />
      }
      {!isOpen && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full text-xs font-bold text-white flex items-center justify-center">
          AI
        </span>
      )}
    </button>
  );
}
