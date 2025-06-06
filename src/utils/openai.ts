// Utility for streaming OpenAI chat completions
import type { ChatMessage } from '../types';

const ENV_OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/responses';

// System prompt for postpartum/Whoop context
const SYSTEM_PROMPT = `You are Ester, a compassionate, medically-informed postpartum recovery assistant. You support all individuals through their postpartum journey, including those who have experienced live births, stillbirths, or pregnancy losses. Use the user's Whoop health data (if provided) to give personalized, supportive, and clear advice. Be sensitive to the full spectrum of postpartum experiences and emotions. Never ask the user to provide a date in a specific format such as YYYY-MM-DD, ISO, or W3C. Always ask for and reference dates in a natural, conversational way.`;
const INSTRUCTIONS = `Format all responses in markdown for readability. Use Whoop health data context if available. Be empathetic, clear, and actionable. Be mindful that users may have experienced different pregnancy outcomes. Never ask the user to provide a date in a specific format such as YYYY-MM-DD, ISO, or W3C. Always ask for and reference dates in a natural, conversational way. Sign off as Ester.`;

export async function streamOpenAIChat({
  messages,
  whoopData,
  max_tokens = 512,
  temperature = 0.7,
  user,
  systemPromptPrefix = ''
}: {
  messages: ChatMessage[];
  whoopData?: any;
  max_tokens?: number;
  temperature?: number;
  user: any;
  systemPromptPrefix?: string;
}) {
  // Prefer the user's API key if set, otherwise use the env key
  const OPENAI_API_KEY = user?.openaiApiKey || ENV_OPENAI_API_KEY;
  if (!OPENAI_API_KEY) throw new Error('Missing OpenAI API key. Please add it in your Profile page.');

  // Compose a single input string for the API
  let input = (systemPromptPrefix ? systemPromptPrefix + '\n' : '') + SYSTEM_PROMPT + '\n';
  if (whoopData) {
    input += `User's latest Whoop health data: ${JSON.stringify(whoopData)}\n`;
  }
  for (const m of messages) {
    input += (m.isAI ? 'Assistant: ' : 'User: ') + m.content + '\n';
  }

  // Get commit ID from environment variables
  const commitId = import.meta.env.VITE_COMMIT_ID || 'local-development';

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      input,
      instructions: INSTRUCTIONS,
      temperature,
      stream: true,
      metadata: {
        commit: commitId
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    throw new Error('OpenAI API error: ' + errorText);
  }

  if (!response.body) throw new Error('No response body from OpenAI');

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let done = false;
  let buffer = '';

  async function* streamChunks() {
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        buffer += decoder.decode(value, { stream: true });
        let lines = buffer.split('\n');
        buffer = lines.pop()!;
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.replace('data: ', '').trim();
            if (data === '[DONE]') return;
            try {
              const parsed = JSON.parse(data);
              console.log('OpenAI stream chunk:', parsed);
              if (parsed.type === "response.output_text.delta" && parsed.delta) {
                yield parsed.delta;
              }
            } catch {}
          }
        }
      }
    }
  }
  return streamChunks();
}
