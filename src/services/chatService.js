// Chat Service — calls n8n webhook when configured, falls back to local engine
import { getResponse as localGetResponse, setEmailCollected as localSetEmailCollected, resetConversation as localReset } from '../chatEngine';

const CHAT_WEBHOOK = import.meta.env.VITE_N8N_CHAT_WEBHOOK || null;
const EMAIL_WEBHOOK = import.meta.env.VITE_N8N_EMAIL_WEBHOOK || null;

export const isUsingN8n = !!CHAT_WEBHOOK;

export function resetConversation() {
  if (!isUsingN8n) localReset();
}

export async function sendMessage(message, history = []) {
  // ── n8n path ──────────────────────────────────────────────────────────────
  if (CHAT_WEBHOOK) {
    const res = await fetch(CHAT_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    if (!res.ok) throw new Error(`n8n webhook error: ${res.status}`);

    const data = await res.json();
    return {
      text: data.text || 'Something went wrong. Please try again.',
      quickReplies: data.quickReplies || [],
      collectEmail: data.collectEmail || false,
      cta: data.cta || null,
    };
  }

  // ── Local fallback ────────────────────────────────────────────────────────
  return localGetResponse(message);
}

export async function submitEmail(email, source = 'chatbot') {
  // ── n8n path ──────────────────────────────────────────────────────────────
  if (EMAIL_WEBHOOK) {
    const res = await fetch(EMAIL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
    const data = await res.json();
    return data.success !== false;
  }

  // ── Local fallback ────────────────────────────────────────────────────────
  localSetEmailCollected();
  console.log('[Odd Shoes] Email captured (local):', email);
  return true;
}
