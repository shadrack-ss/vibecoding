// Chat Service — calls n8n chatTrigger webhook, falls back to local engine
import { getResponse as localGetResponse, setEmailCollected as localSetEmailCollected, resetConversation as localReset } from '../chatEngine';

// n8n chatTrigger webhook URL:
// Format: https://[your-n8n]/webhook/[webhookId]/chat
const CHAT_WEBHOOK = import.meta.env.VITE_N8N_CHAT_WEBHOOK || null;
const EMAIL_WEBHOOK = import.meta.env.VITE_N8N_EMAIL_WEBHOOK || null;

export const isUsingN8n = !!CHAT_WEBHOOK;

// Stable session ID for this browser session (keeps n8n memory working)
let sessionId = sessionStorage.getItem('os_session_id');
if (!sessionId) {
  sessionId = 'os-' + Math.random().toString(36).slice(2, 11);
  sessionStorage.setItem('os_session_id', sessionId);
}

export function resetConversation() {
  // Reset session so n8n starts a fresh memory window
  sessionId = 'os-' + Math.random().toString(36).slice(2, 11);
  sessionStorage.setItem('os_session_id', sessionId);
  if (!isUsingN8n) localReset();
}

// Parse the n8n agent output:
// Birdie always appends ---SUGGESTIONS---\n[...]\n---END---
function parseAgentOutput(raw) {
  const suggestionsMatch = raw.match(/---SUGGESTIONS---\s*([\s\S]*?)\s*---END---/);

  // Everything before the ---SUGGESTIONS--- block is the main text
  let text = raw.replace(/---SUGGESTIONS---[\s\S]*?---END---/g, '').trim();

  let quickReplies = [];
  if (suggestionsMatch) {
    try {
      quickReplies = JSON.parse(suggestionsMatch[1].trim());
    } catch {
      // Fallback: extract quoted strings
      const matches = suggestionsMatch[1].match(/"([^"]+)"/g);
      if (matches) quickReplies = matches.map((s) => s.replace(/"/g, ''));
    }
  }

  if (!quickReplies.length) {
    quickReplies = ['Tell me about your services', 'How much does it cost?', 'I want to build something'];
  }

  // Detect if we should collect email (based on keywords in response)
  const collectEmail =
    /get started|project planner|reach out|follow up|contact|email us/i.test(text) &&
    Math.random() > 0.5; // Only show 50% of the time to avoid spam

  // Detect if we should show a CTA button
  let cta = null;
  if (/project planner|get started|launch/i.test(text)) {
    cta = { text: 'Launch Project Planner →', url: 'https://oddshoes.dev' };
  } else if (/portfolio|our work|projects/i.test(text)) {
    cta = { text: 'View Our Work →', url: 'https://oddshoes.dev' };
  } else if (/email|contact|reach/i.test(text)) {
    cta = { text: 'Email buildit@oddshoes.dev', url: 'mailto:buildit@oddshoes.dev' };
  }

  return { text, quickReplies, collectEmail, cta };
}

export async function sendMessage(message, _history = []) {
  // ── n8n chatTrigger path ──────────────────────────────────────────────────
  if (CHAT_WEBHOOK) {
    const res = await fetch(CHAT_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatInput: message,   // n8n chatTrigger expects "chatInput"
        sessionId,            // ties to Conversation Memory node
      }),
    });

    if (!res.ok) throw new Error(`n8n error: ${res.status}`);

    const data = await res.json();

    // n8n chatTrigger returns { output: "agent text" }
    const raw = data.output || data.text || JSON.stringify(data);
    return parseAgentOutput(raw);
  }

  // ── Local fallback (no .env configured) ──────────────────────────────────
  return localGetResponse(message);
}

export async function submitEmail(email, source = 'chatbot') {
  if (EMAIL_WEBHOOK) {
    const res = await fetch(EMAIL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
    const data = await res.json();
    return data.success !== false;
  }

  localSetEmailCollected();
  console.log('[Odd Shoes] Email captured (local):', email);
  return true;
}
