import { useState, useRef, useEffect } from 'react';
import { sendMessage, submitEmail, resetConversation, isUsingN8n } from './services/chatService';
import './App.css';

// Simple markdown renderer for bot messages
function renderMarkdown(text) {
  return text
    .split('\n')
    .map((line) => {
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      line = line.replace(/\*(.+?)\*/g, '<em>$1</em>');
      if (line.trim() === '---') return '<hr/>';
      if (line.startsWith('• ') || line.startsWith('- ')) return `<div class="bullet">${line}</div>`;
      if (line.trim() === '') return '<br/>';
      return `<p>${line}</p>`;
    })
    .join('');
}

function TypingIndicator() {
  return (
    <div className="typing-row">
      <div className="avatar bot">OS</div>
      <div className="typing-bubble">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}

function EmailCollector({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    const ok = await submitEmail(email);
    if (ok) {
      setSubmitted(true);
      onSubmit(email);
    }
    setLoading(false);
  };

  return (
    <div className="email-collector">
      <div className="email-box">
        {!submitted ? (
          <>
            <strong>Stay in the loop</strong>
            <p>Drop your email and we'll follow up personally.</p>
            <form className="email-input-row" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="email-submit-btn" disabled={loading}>
                {loading ? '...' : 'Send'}
              </button>
            </form>
          </>
        ) : (
          <div className="email-success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Got it! We'll be in touch soon. God bless!
          </div>
        )}
      </div>
    </div>
  );
}

const starterChips = [
  { icon: '🔨', label: 'What services do you offer?' },
  { icon: '💰', label: 'How much does it cost?' },
  { icon: '🚀', label: 'I want to build something' },
  { icon: '👋', label: 'Who is Odd Shoes?' },
  { icon: '🤖', label: 'Tell me about AI & Automation' },
  { icon: '💛', label: "What's Give Him 50?" },
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    resetConversation();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const send = async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = { role: 'user', text: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    // Build history for n8n context (exclude the message we just added)
    const history = messages.map((m) => ({ role: m.role, text: m.text }));

    try {
      const response = await sendMessage(text.trim(), history);
      setMessages([
        ...updatedMessages,
        {
          role: 'bot',
          text: response.text,
          quickReplies: response.quickReplies,
          collectEmail: response.collectEmail,
          cta: response.cta,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([
        ...updatedMessages,
        {
          role: 'bot',
          text: "Oops — something went wrong on our end. Try again or email us at **buildit@oddshoes.dev** 🙏",
          quickReplies: ['Try again', 'Email us'],
          collectEmail: false,
          cta: { text: 'Email us →', url: 'mailto:buildit@oddshoes.dev' },
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const handleTextareaInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo-mark">OS</div>
          <div className="header-text">
            <h1>Odd <span>shoes</span></h1>
            <div className="header-subtitle">
              AI Agent {isUsingN8n ? '· n8n powered' : '· local mode'}
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="status-dot" />
          <span className="status-text">Online</span>
          <a className="header-cta" href="https://oddshoes.dev" target="_blank" rel="noopener noreferrer">
            Visit oddshoes.dev
          </a>
        </div>
      </header>

      {/* Chat Area */}
      <div className="chat-area" ref={chatRef}>
        {messages.length === 0 && (
          <div className="welcome">
            <span className="welcome-icon">👟</span>
            <h2>Welcome to Odd <span>Shoes</span></h2>
            <p>
              We build production-grade apps for Christian founders. 50% of our profits go to Kingdom work. Ask me anything!
            </p>
            <div className="welcome-chips">
              {starterChips.map((chip, i) => (
                <button key={i} className="welcome-chip" onClick={() => send(chip.label)}>
                  <span className="chip-icon">{chip.icon}</span>
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          const isLastBot = msg.role === 'bot' && i === messages.length - 1;
          return (
            <div key={i}>
              <div className={`message-row ${msg.role}`}>
                <div className={`avatar ${msg.role}`}>{msg.role === 'bot' ? 'OS' : 'You'}</div>
                <div
                  className={`bubble ${msg.role}`}
                  dangerouslySetInnerHTML={
                    msg.role === 'bot' ? { __html: renderMarkdown(msg.text) } : undefined
                  }
                >
                  {msg.role === 'user' ? msg.text : undefined}
                </div>
              </div>

              {isLastBot && msg.quickReplies?.length > 0 && (
                <div className="quick-replies">
                  {msg.quickReplies.map((qr, j) => (
                    <button key={j} className="quick-reply-btn" onClick={() => send(qr)}>
                      {qr}
                    </button>
                  ))}
                </div>
              )}

              {isLastBot && msg.cta && (
                <div className="cta-container">
                  <a className="cta-btn" href={msg.cta.url} target="_blank" rel="noopener noreferrer">
                    {msg.cta.text}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              )}

              {isLastBot && msg.collectEmail && (
                <EmailCollector onSubmit={(email) => console.log('[Odd Shoes] Lead captured:', email)} />
              )}
            </div>
          );
        })}

        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="input-area">
        <form className="input-container" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <textarea
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask about our services, pricing, team..."
              rows={1}
            />
          </div>
          <button type="submit" className="send-btn" disabled={!input.trim() || isTyping}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        <div className="input-footer">
          Powered by <a href="https://oddshoes.dev" target="_blank" rel="noopener noreferrer">Odd Shoes</a> · 50% of profits to Kingdom work
        </div>
      </div>
    </div>
  );
}
