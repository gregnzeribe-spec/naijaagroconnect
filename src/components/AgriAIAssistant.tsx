import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  HelpCircle, 
  ShieldAlert, 
  Lightbulb, 
  RefreshCw 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AgriAIAssistant: React.FC = () => {
  const [promptInput, setPromptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Sannu & Welcome! I am NaijaAgri AI, your dedicated market analyst and farm advisory system. Ask me about commodity prices in Kano or Benue, NEPC export procedures for yams or cocoa, crop yield optimization, or shipping estimates to London and Houston!",
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    "What is the current sesame seed price trend in Kano Dawanau market?",
    "How do I get NEPC export clearance for Benue white yams to the UK?",
    "Best storage tips to prevent post-harvest spoilage for cassava & garri?",
    "Explain how the crypto & fiat escrow protection works on naijaagroconnect.com."
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || promptInput;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setPromptInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agri-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });

      const data = await res.json();
      const aiReply = data.reply || "I was unable to retrieve market advisory data at this second. Please try again.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: "I experienced a network disruption connecting to the market analytical server. Please try again or toggle Offline Sync mode.",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-[#3A5A40] text-white border border-[#E5E9D3] p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#F0F4E8] text-[#3A5A40] text-xs font-bold px-3 py-1 rounded-full border border-[#D8E2C3] flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#D4A373]" />
              Gemini AI Powered
            </span>
            <span className="text-xs text-[#DAD7CD] font-medium">NaijaAgri Advisory System</span>
          </div>

          <h2 className="text-2xl font-serif font-bold text-white tracking-tight mt-2">
            Real-Time Market Advisory & Agronomy AI
          </h2>
          <p className="text-xs text-[#DAD7CD] mt-1 max-w-2xl">
            Get instant answers on Nigerian produce pricing trends across 6 zones, NEPC export documentation, crop yield optimization, and cold-chain logistics.
          </p>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="space-y-1.5">
        <span className="text-xs text-[#3A5A40] font-bold flex items-center">
          <Lightbulb className="w-3.5 h-3.5 mr-1 text-[#D4A373]" /> Frequent Market & Agronomy Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp)}
              disabled={loading}
              className="bg-[#F0F4E8] hover:bg-[#E5E9D3] text-[#3A5A40] text-xs font-medium px-3.5 py-1.5 rounded-full border border-[#D8E2C3] transition-all text-left disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-[#E5E9D3] rounded-3xl p-5 shadow-sm flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#3A5A40] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                  <Bot className="w-4 h-4 text-[#A3B18A]" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs space-y-1 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#3A5A40] text-white rounded-tr-none font-medium'
                    : 'bg-[#F8F9F1] text-[#2C3327] rounded-tl-none border border-[#E5E9D3]'
                }`}
              >
                <div className={`flex items-center justify-between text-[10px] mb-1 ${
                  msg.sender === 'user' ? 'text-[#A3B18A]' : 'text-[#588157]'
                }`}>
                  <span className="font-bold uppercase tracking-wider">
                    {msg.sender === 'user' ? 'You' : 'NaijaAgri AI Advisor'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="whitespace-pre-line font-sans">
                  {msg.text}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#F0F4E8] border border-[#D8E2C3] flex items-center justify-center text-[#3A5A40] font-bold text-xs shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-[#588157] text-xs py-2">
              <div className="w-4 h-4 border-2 border-[#3A5A40] border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing market demand signals & agronomy data...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-[#E5E9D3] mt-2 flex items-center space-x-2">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about produce prices, NEPC export rules, or livestock tips..."
            className="flex-1 bg-[#F8F9F1] border border-[#D8E2C3] rounded-xl px-4 py-2.5 text-xs text-[#2C3327] placeholder-[#A3B18A] focus:outline-none focus:border-[#3A5A40]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !promptInput.trim()}
            className="bg-[#3A5A40] hover:bg-[#588157] disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center space-x-1.5 text-xs transition-colors"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5 text-[#A3B18A]" />
          </button>
        </div>
      </div>
    </div>
  );
};
