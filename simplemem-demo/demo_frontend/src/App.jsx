import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Mail,
  Key,
  Server,
  MessageCircle,
  Send,
  Loader,
  AlertCircle,
  Clock,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Step 1: Configuration
const ConfigStep = ({ onNext, serverStatus }) => {
  const [email, setEmail] = useState('');
  const [contextText, setContextText] = useState('');
  const [useOwnKey, setUseOwnKey] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !contextText) {
      setError('Email and context text are required');
      return;
    }

    if (useOwnKey && !apiKey) {
      setError('API key is required for BYOK mode');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/session/create`, {
        email,
        context_text: contextText,
        use_own_key: useOwnKey,
        api_key: useOwnKey ? apiKey : null,
        base_url: useOwnKey && baseUrl ? baseUrl : null
      });

      onNext(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h2>Step 1: Configure Your Session</h2>
        <p>Set up your SimpleMem demo session with context and API preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="config-form">
        {/* Email Input */}
        <div className="form-group">
          <label>
            <Mail size={18} />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>

        {/* Context Text */}
        <div className="form-group">
          <label>
            <MessageSquare size={18} />
            <span>Context Text</span>
            <span className="label-hint">Enter the dialogue or information to build memory from</span>
          </label>
          <textarea
            value={contextText}
            onChange={(e) => setContextText(e.target.value)}
            placeholder="Alice: Let's meet at Starbucks tomorrow at 2pm&#10;Bob: Sure, I'll bring the project files&#10;Alice: Don't forget the Q3 report"
            rows={8}
            required
          />
          <small className="form-hint">
            Format: "Speaker: Message" (one per line) or plain text
          </small>
        </div>

        {/* API Key Mode Selection */}
        <div className="form-group">
          <label>API Key Mode</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                checked={!useOwnKey}
                onChange={() => setUseOwnKey(false)}
              />
              <div className="radio-content">
                <Server size={20} />
                <div>
                  <strong>Server Key</strong>
                  <span>Limited to 2 conversation turns</span>
                </div>
              </div>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                checked={useOwnKey}
                onChange={() => setUseOwnKey(true)}
              />
              <div className="radio-content">
                <Key size={20} />
                <div>
                  <strong>Bring Your Own Key (BYOK)</strong>
                  <span>Up to 8 conversation turns</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* API Key Inputs (conditional) */}
        {useOwnKey && (
          <>
            <div className="form-group">
              <label>
                <Key size={18} />
                <span>OpenAI API Key</span>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                required={useOwnKey}
              />
            </div>
            <div className="form-group">
              <label>
                <Server size={18} />
                <span>Base URL (Optional)</span>
              </label>
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.openai.com/v1"
              />
            </div>
          </>
        )}

        {/* Server Status */}
        {serverStatus && (
          <div className="server-status">
            <div className="status-item">
              <span>Active Sessions:</span>
              <strong>{serverStatus.active_sessions}/{serverStatus.max_sessions}</strong>
            </div>
            <div className="status-item">
              <span>Available Slots:</span>
              <strong>{serverStatus.available_slots}</strong>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <>
              <Loader className="spin" size={18} />
              <span>Creating Session...</span>
            </>
          ) : (
            <>
              <span>Create Session & Build Memory</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

// Step 2: Building Memory
const BuildingStep = ({ sessionData, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="step-container building-step">
      <div className="step-header">
        <h2>Step 2: Building Memory</h2>
        <p>SimpleMem is processing your context and building atomic memory entries...</p>
      </div>

      <div className="building-content">
        <div className="loader-animation">
          <Loader className="spin" size={64} />
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="building-steps">
          <div className={`building-step-item ${progress >= 30 ? 'active' : ''}`}>
            <CheckCircle size={20} />
            <span>Semantic Structured Compression: Filtering and decomposing dialogue</span>
          </div>
          <div className={`building-step-item ${progress >= 60 ? 'active' : ''}`}>
            <CheckCircle size={20} />
            <span>Structured Indexing: Creating multi-view index (semantic, lexical, symbolic)</span>
          </div>
          <div className={`building-step-item ${progress >= 90 ? 'active' : ''}`}>
            <CheckCircle size={20} />
            <span>Memory Ready: Prepared for adaptive retrieval</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 3: Chat Interface
const ChatStep = ({ sessionData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionStatus, setSessionStatus] = useState(null);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Poll session status
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/session/${sessionData.session_id}/status`
        );
        setSessionStatus(response.data);
      } catch (err) {
        console.error('Failed to fetch session status:', err);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Update every 10s

    return () => clearInterval(interval);
  }, [sessionData.session_id]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/session/${sessionData.session_id}/chat`,
        { message: input }
      );

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Update session status
      setSessionStatus(prev => ({
        ...prev,
        turn_count: response.data.turn_count,
        session_remaining_time: response.data.session_remaining_time
      }));

    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send message');
      const errorMessage = {
        role: 'error',
        content: err.response?.data?.detail || 'Failed to send message'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="step-container chat-step">
      <div className="step-header">
        <h2>Step 3: Chat with Memory Agent</h2>
        {sessionStatus && (
          <div className="session-info">
            <div className="info-item">
              <Clock size={16} />
              <span>{sessionStatus.session_remaining_time || sessionStatus.remaining_time}</span>
            </div>
            <div className="info-item">
              <MessageCircle size={16} />
              <span>
                {sessionStatus.turn_count}/{sessionData.max_turns} turns
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.length === 0 && (
            <div className="empty-state">
              <MessageCircle size={48} />
              <p>Ask questions about the context you provided!</p>
              <small>SimpleMem will retrieve relevant information using adaptive query-aware retrieval</small>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`message message-${msg.role}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="message message-assistant">
              <div className="message-content">
                <Loader className="spin" size={16} />
                <span>Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          {sessionStatus && !sessionStatus.can_chat && (
            <div className="session-ended-notice">
              <AlertCircle size={18} />
              <span>
                {sessionStatus.turn_count >= sessionData.max_turns
                  ? 'Maximum turns reached'
                  : 'Session expired'}
              </span>
            </div>
          )}

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                sessionStatus?.can_chat
                  ? 'Ask a question about your context...'
                  : 'Session ended'
              }
              disabled={loading || (sessionStatus && !sessionStatus.can_chat)}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim() || (sessionStatus && !sessionStatus.can_chat)}
              className="btn-send"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App
function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionData, setSessionData] = useState(null);
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    // Fetch server status
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/status`);
        setServerStatus(response.data);
      } catch (err) {
        console.error('Failed to fetch server status:', err);
      }
    };

    fetchStatus();
  }, []);

  const handleConfigNext = (data) => {
    setSessionData(data);
    setCurrentStep(2);
  };

  const handleBuildingComplete = () => {
    setCurrentStep(3);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>SimpleMem Demo</h1>
        <p>Efficient Lifelong Memory for LLM Agents</p>
      </header>

      <main className="app-main">
        {currentStep === 1 && (
          <ConfigStep onNext={handleConfigNext} serverStatus={serverStatus} />
        )}
        {currentStep === 2 && (
          <BuildingStep sessionData={sessionData} onComplete={handleBuildingComplete} />
        )}
        {currentStep === 3 && (
          <ChatStep sessionData={sessionData} />
        )}
      </main>

      <footer className="app-footer">
        <p>
          ⚠️ <strong>Demo Server Notice:</strong> This is a limited-resource demonstration server.
          Maximum {serverStatus?.max_sessions || 8} concurrent sessions, 5-minute timeout per session.
          For production use, please deploy your own instance.
        </p>
      </footer>
    </div>
  );
}

export default App;
