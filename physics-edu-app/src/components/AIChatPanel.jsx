import { useState, useRef, useEffect } from 'react';
import { X, Send, Trash2, Key, CheckCircle, AlertCircle, Bot, User } from 'lucide-react';
import { useGemini } from '../hooks/useGemini';
import { useLocalStorage } from '../hooks/useLocalStorage';

const QUICK_PROMPTS = [
  '물리교육과 졸업 후 임용 외 진로를 알고 싶어요',
  '물리가 너무 어려운데 어떻게 공부해야 할까요?',
  '교사 적성이 없는 것 같아요. 어떻게 생각하시나요?',
  '자기진단 결과를 바탕으로 조언해주세요',
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-2xl rounded-tl-sm w-fit max-w-xs">
      <Bot size={14} className="text-slate-400 flex-shrink-0" />
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-slate-400 typing-dot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: isUser ? '#1a3a6b' : '#f1f5f9' }}
      >
        {isUser
          ? <User size={14} className="text-white" />
          : <Bot size={14} className="text-slate-500" />
        }
      </div>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'rounded-tr-sm text-white'
            : 'rounded-tl-sm text-slate-700 bg-slate-100'
        }`}
        style={isUser ? { backgroundColor: '#1a3a6b' } : {}}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function AIChatPanel({ isOpen, onClose, initialMessage = null }) {
  const [apiKey, setApiKey, removeApiKey] = useLocalStorage('gemini_api_key', '');
  const [keyInput, setKeyInput] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const prevInitialMessage = useRef(null);

  const { sendMessage, isLoading } = useGemini(apiKey);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Handle initialMessage from DiagnosisPage
  useEffect(() => {
    if (
      isOpen &&
      initialMessage &&
      initialMessage !== prevInitialMessage.current &&
      apiKey
    ) {
      prevInitialMessage.current = initialMessage;
      handleSend(initialMessage);
    }
  }, [isOpen, initialMessage, apiKey]);

  const handleSend = async (text) => {
    const msgText = (text || input).trim();
    if (!msgText || isLoading) return;
    if (!apiKey) {
      setShowKeyInput(true);
      return;
    }

    setInput('');
    const userMsg = { role: 'user', content: msgText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setStreamingContent('');

    let accumulated = '';
    await sendMessage(
      newMessages,
      (chunk, full) => {
        accumulated = full;
        setStreamingContent(full);
      },
      (fullText) => {
        setStreamingContent('');
        if (fullText) {
          setMessages((prev) => [...prev, { role: 'assistant', content: fullText }]);
        }
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveKey = () => {
    if (keyInput.trim()) {
      setApiKey(keyInput.trim());
      setKeyInput('');
      setShowKeyInput(false);
    }
  };

  const handleDeleteKey = () => {
    removeApiKey();
    setShowKeyInput(true);
  };

  const handleClear = () => {
    setMessages([]);
    setStreamingContent('');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out
          w-full sm:w-96 lg:w-[400px]`}
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100" style={{ backgroundColor: '#1a3a6b' }}>
          <div className="flex items-center gap-2 text-white">
            <Bot size={20} />
            <span className="font-bold text-sm">물리교육 AI 진로 상담</span>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                title="대화 초기화"
              >
                <Trash2 size={15} />
              </button>
            )}
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="API 키 설정"
            >
              <Key size={15} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* API Key Section */}
        {(showKeyInput || !apiKey) && (
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            {apiKey ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={15} className="text-green-500" />
                  <span className="text-slate-600">API 키 연결됨</span>
                </div>
                <button
                  onClick={handleDeleteKey}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  키 삭제
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 flex items-start gap-1">
                  <AlertCircle size={12} className="mt-0.5 flex-shrink-0 text-amber-500" />
                  Google AI Studio(aistudio.google.com)에서 무료 API 키를 발급받아 입력해주세요.
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveKey()}
                    placeholder="API 키 입력..."
                    className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
                  />
                  <button
                    onClick={handleSaveKey}
                    className="px-3 py-2 text-sm font-semibold text-white rounded-lg transition-colors"
                    style={{ backgroundColor: '#1a3a6b' }}
                  >
                    저장
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Prompts */}
        {messages.length === 0 && (
          <div className="px-4 py-3 border-b border-slate-50">
            <p className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wide">빠른 질문</p>
            <div className="flex flex-col gap-2">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  disabled={!apiKey || isLoading}
                  className="text-left text-xs px-3 py-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-slate-600 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && !streamingContent && (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-10">
              <Bot size={40} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">물리교육 진로 상담 AI</p>
              <p className="text-xs mt-1">진로 고민, 학업 슬럼프,<br />자기진단 결과 분석을 도와드립니다</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <Message key={idx} msg={msg} />
          ))}

          {isLoading && !streamingContent && <TypingIndicator />}

          {streamingContent && (
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100">
                <Bot size={14} className="text-slate-500" />
              </div>
              <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed text-slate-700 bg-slate-100 whitespace-pre-wrap">
                {streamingContent}
                <span className="inline-block w-0.5 h-4 bg-slate-400 ml-0.5 animate-pulse" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-slate-100">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!apiKey || isLoading}
              placeholder={apiKey ? '질문을 입력하세요... (Enter로 전송)' : 'API 키를 먼저 입력해주세요'}
              rows={1}
              className="flex-1 resize-none text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-400"
              style={{ maxHeight: '100px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || !apiKey || isLoading}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed self-end"
              style={{ backgroundColor: '#1a3a6b' }}
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 text-center">Powered by Google Gemini 1.5 Flash</p>
        </div>
      </div>
    </>
  );
}
