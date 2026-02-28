import { useState, useRef, useEffect } from 'react';
import { getResponse, setEmailCollected, resetConversation } from './chatEngine';
import './App.css';

// Simple markdown-like renderer for bot messages
function renderMarkdown(text) {
  return text
    .split('\n')
    .map((line) => {
      // Headers
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      // Bold
      line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Italic
      line = line.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // Horizontal rule
      if (line.trim() === '---') return '<hr/>';
      // Bullet points
      if (line.startsWith('• ') || line.startsWith('- ')) return `<div style="padding-left:8px">${line}</div>`;
      // Empty line
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      setEmailCollected();
      onSubmit(email);
    }
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
              <button type="submit" className="email-submit-btn">Send</button>
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

// Welcome screen starter chips
const starterChips = [
  { icon: '🔨', label: 'What services do you offer?' },
  { icon: '💰', label: 'How much does it cost?' },
  { icon: '🚀', label: 'I want to build something' },
  { icon: '👋', label: 'Who is Odd Shoes?' },
  { icon: '🤖', label: 'Tell me about AI & Automation' },
  { icon: '💛', label: "What's Give Him 50?" },
];

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [emails, setEmails] = useState([]);
  const chatRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    resetConversation();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay (300-900ms based on response length)
    const delay = 400 + Math.random() * 500;
    setTimeout(() => {
      const response = getResponse(text.trim());
      const botMsg = {
        role: 'bot',
        text: response.text,
        quickReplies: response.quickReplies,
        collectEmail: response.collectEmail,
        cta: response.cta,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleEmailCollected = (email) => {
    setEmails((prev) => [...prev, email]);
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
            <div className="header-subtitle">AI Marketing Agent</div>
          </div>
        </div>
        <div className="header-right">
          <div className="status-dot" />
          <span className="status-text">Online</span>
          <a
            className="header-cta"
            href="https://oddshoes.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit oddshoes.dev
          </a>
        </div>
      </header>

      {/* Chat Area */}
      <div className="chat-area" ref={chatRef}>
        {messages.length === 0 && (
          <div className="welcome">
            <span className="welcome-icon">👟</span>
            <h2>
              Welcome to Odd <span>Shoes</span>
            </h2>
            <p>
              We build production-grade apps for Christian founders. 50% of our
              profits go to Kingdom work. Ask me anything!
            </p>
            <div className="welcome-chips">
              {starterChips.map((chip, i) => (
                <button
                  key={i}
                  className="welcome-chip"
                  onClick={() => sendMessage(chip.label)}
                >
                  <span className="chip-icon">{chip.icon}</span>
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            <div className={`message-row ${msg.role}`}>
              <div className={`avatar ${msg.role}`}>
                {msg.role === 'bot' ? 'OS' : 'You'}
              </div>
              <div
                className={`bubble ${msg.role}`}
                dangerouslySetInnerHTML={
                  msg.role === 'bot'
                    ? { __html: renderMarkdown(msg.text) }
                    : undefined
                }
              >
                {msg.role === 'user' ? msg.text : undefined}
              </div>
            </div>

            {/* Quick Replies */}
            {msg.role === 'bot' && msg.quickReplies?.length > 0 && i === messages.length - 1 && (
              <div className="quick-replies">
                {msg.quickReplies.map((qr, j) => (
                  <button
                    key={j}
                    className="quick-reply-btn"
                    onClick={() => sendMessage(qr)}
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* CTA Button */}
            {msg.role === 'bot' && msg.cta && i === messages.length - 1 && (
              <div className="cta-container">
                <a
                  className="cta-btn"
                  href={msg.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {msg.cta.text}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            )}

            {/* Email Collector */}
            {msg.role === 'bot' && msg.collectEmail && i === messages.length - 1 && (
              <EmailCollector onSubmit={handleEmailCollected} />
            )}
          </div>
        ))}

        {isTyping && <TypingIndicator />}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <form className="input-container" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask about our services, pricing, team..."
              rows={1}
            />
          </div>
          <button
            type="submit"
            className="send-btn"
            disabled={!input.trim() || isTyping}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        <div className="input-footer">
          Powered by <a href="https://oddshoes.dev" target="_blank" rel="noopener noreferrer">Odd Shoes</a> &middot; 50% of profits to Kingdom work
        </div>
      </div>
    </div>
  );
}

export default App;
