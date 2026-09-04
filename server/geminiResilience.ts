import { GoogleGenAI } from '@google/genai';

// Valid models from gemini-api skill
export const RESILIENT_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.1-pro-preview',
  'gemini-flash-latest'
];

export interface GeminiCallResult {
  text: string;
  modelUsed: string;
}

/**
 * Checks whether an error is transient (e.g. 503 high demand, 429 rate limit, 500 server error)
 */
export function isTransientGeminiError(error: any): boolean {
  if (!error) return false;
  const msg = String(error.message || error.status || error.code || '').toLowerCase();
  return (
    msg.includes('503') ||
    msg.includes('unavailable') ||
    msg.includes('high demand') ||
    msg.includes('spikes in demand') ||
    msg.includes('temporary') ||
    msg.includes('429') ||
    msg.includes('resource_exhausted') ||
    msg.includes('rate limit') ||
    msg.includes('quota') ||
    msg.includes('500') ||
    msg.includes('internal') ||
    msg.includes('econnreset') ||
    msg.includes('etimedout')
  );
}

/**
 * Executes a Gemini prompt with automatic model fallback and retries.
 * Tries the preferred model first, retries on 503/429 with backoff,
 * then tries fallback models (gemini-3.1-pro-preview, gemini-flash-latest).
 */
export async function callGeminiWithResilience(
  ai: GoogleGenAI,
  prompt: string,
  systemInstruction: string,
  preferredModel = 'gemini-3.8-flash'
): Promise<GeminiCallResult> {
  const modelsToTry = [
    preferredModel,
    ...RESILIENT_MODELS.filter((m) => m !== preferredModel),
  ];

  let lastError: any = null;

  for (const modelName of modelsToTry) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });

        const text = response.text?.trim() || '';
        if (text) {
          return { text, modelUsed: modelName };
        }
      } catch (err: any) {
        lastError = err;
        const transient = isTransientGeminiError(err);
        console.warn(
          `[DharmaCraft AI] Model ${modelName} (attempt ${attempt}/2) error:`,
          err?.message || err
        );

        if (transient && attempt === 1) {
          // Brief pause before second attempt on same model
          await new Promise((resolve) => setTimeout(resolve, 800));
        } else {
          // Break inner loop to try next fallback model
          break;
        }
      }
    }
  }

  throw lastError || new Error('All Gemini candidate models exhausted');
}

/**
 * Safely parses JSON returned by model, handling potential markdown code blocks
 */
export function extractAndParseJSON<T = any>(rawText: string, fallbackDefault: T): T {
  if (!rawText || !rawText.trim()) {
    return fallbackDefault;
  }

  let clean = rawText.trim();
  // Strip ```json ... ``` or ``` ... ``` wrappers if present
  if (clean.startsWith('```json')) {
    clean = clean.slice(7);
  } else if (clean.startsWith('```')) {
    clean = clean.slice(3);
  }

  if (clean.endsWith('```')) {
    clean = clean.slice(0, -3);
  }

  clean = clean.trim();

  try {
    return JSON.parse(clean) as T;
  } catch (err) {
    console.warn('[DharmaCraft AI] JSON parse error, attempting extraction:', err);
    // Find outermost { ... } or [ ... ]
    const firstBrace = clean.indexOf('{');
    const firstBracket = clean.indexOf('[');
    
    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
      const lastBracket = clean.lastIndexOf(']');
      if (lastBracket > firstBracket) {
        try {
          return JSON.parse(clean.substring(firstBracket, lastBracket + 1)) as T;
        } catch {
          // ignore
        }
      }
    } else if (firstBrace !== -1) {
      const lastBrace = clean.lastIndexOf('}');
      if (lastBrace > firstBrace) {
        try {
          return JSON.parse(clean.substring(firstBrace, lastBrace + 1)) as T;
        } catch {
          // ignore
        }
      }
    }

    return fallbackDefault;
  }
}
