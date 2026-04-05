import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  retrieveContext,
  formatContextForPrompt,
  extractSources,
  keywordSearch,
} from '@/lib/knowledge-retrieval';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

/* ─── System Prompt (RAG-powered) ─── */
function buildSystemPrompt(retrievedContext: string, language: 'en' | 'es' = 'en'): string {
  const langInstructions =
    language === 'es'
      ? '\nIMPORTANT: Respond in Spanish. The user is speaking Spanish.'
      : '';

  return `You are a friendly and knowledgeable AI assistant for Shree Krishna Gauli (shreegauli.com), a digital marketing specialist based in Dallas, TX. You help visitors learn about Shree's services, approach, and work.

PERSONALITY:
- Warm, conversational, and genuinely helpful — not robotic
- Use simple, natural language — sound like a real person who cares
- Keep answers concise (2-4 sentences) unless the user asks for detail
- Ask a brief follow-up question when it helps guide the conversation
- Use the user's language style to shape your tone (casual → casual, professional → professional)
${langInstructions}

KNOWLEDGE RULES:
1. Answer ONLY from the RETRIEVED WEBSITE CONTENT below. Do NOT make up information.
2. If the retrieved content contains the answer, give a clear, helpful response and cite the source page URL.
3. If the retrieved content does NOT contain the answer, say: "I'm not fully sure about that, but I can help! Try visiting https://shreegauli.com/contact or ask me something else."
4. Never fabricate pricing, service details, features, or statistics.
5. When mentioning pages from the site, include the full URL (e.g., https://shreegauli.com/services).

LEAD HANDLING:
- When users ask about services or projects → guide them to:
  • Book a free strategy call: https://shreegauli.com/book
  • Get in touch: https://shreegauli.com/contact
  • Learn about services: https://shreegauli.com/services
  • Try the free SEO tool: https://shreegauli.com/seo-tools
- Shree specializes in SEO, paid media (Google Ads, Meta Ads), social media management, and marketing automation

OFF-TOPIC HANDLING:
- If the question is completely unrelated, politely redirect: "Great question! That's outside my area though. I'm here to help with digital marketing — things like SEO, paid ads, social media, and automation. What can I help you with?"

FORMAT:
- Keep it natural and conversational
- When mentioning pages, use markdown links: [Page Name](url)
- Use bullet points for lists
- Bold key terms with **term**

${retrievedContext}`.trim();
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  messages: Message[];
  sessionId?: string;
  visitorId?: string;
  language?: 'en' | 'es';
}

type FallbackIntent =
  | 'pricing'
  | 'services'
  | 'booking'
  | 'dashboard'
  | 'industries'
  | 'results'
  | 'about-company';

interface FallbackDecision {
  reply: string;
  matchedIntent: boolean;
}

function isLikelySpanish(text: string, language: 'en' | 'es') {
  return language === 'es' || /[¿¡]|\b(precio|servicio|consulta|clinica|urgencia|empresa|agendar)\b/.test(text);
}

function detectFallbackIntent(text: string): FallbackIntent | null {
  const q = text.toLowerCase();

  if (/(price|pricing|cost|rates?|plans?|precio|precios|costo|tarifa|plan)/.test(q)) return 'pricing';
  if (/(services?|offer|offering|field marketing|marketing services?|servicio|servicios|estrategia|seo|ads?|google ads|meta ads|social media|email|automation|automatiz)/.test(q)) return 'services';
  if (/(book|consult|schedule|demo|call|consulta|agendar|cita|llamada)/.test(q)) return 'booking';
  if (/(dashboard|analytics|reporting|data|roi|métricas|metricas|anal[ií]tica)/.test(q)) return 'dashboard';
  if (/(urgent care|er\b|medspa|clinic|dental|specialt|industry|industria|cl[ií]nica|clinica)/.test(q)) return 'industries';
  if (/(result|patient|growth|performance|outcome|inquiries?|leads?|resultado|paciente|crecimiento|rendimiento)/.test(q)) return 'results';
  if (/(shree|gauli|about|who are you|your company|company|agencia|empresa|quienes|quiénes|acerca de)/.test(q)) return 'about-company';

  return null;
}

function buildFallbackQuery(input: string, recentUserMessages: string[]): string {
  const normalizedInput = input.trim();
  if (!normalizedInput) return '';

  const wordCount = normalizedInput.split(/\s+/).length;
  const lower = normalizedInput.toLowerCase();
  const vaguePattern = /^(this|that|it|more|details|info|field marketing|marketing|shree|about|tell me more)$/;
  const isVagueFollowUp = wordCount <= 3 || vaguePattern.test(lower);

  if (!isVagueFollowUp || recentUserMessages.length < 2) {
    return normalizedInput;
  }

  const previousMessage = recentUserMessages[recentUserMessages.length - 2]?.trim() || '';
  if (!previousMessage) return normalizedInput;

  return `${previousMessage} ${normalizedInput}`.trim();
}

function fallbackReply(
  input: string,
  recentUserMessages: string[],
  language: 'en' | 'es' = 'en'
): FallbackDecision {
  const fallbackQuery = buildFallbackQuery(input, recentUserMessages);
  const directIntent = detectFallbackIntent(input);
  const contextIntent = detectFallbackIntent(fallbackQuery);
  const intent = directIntent || contextIntent;
  const isEs = isLikelySpanish(fallbackQuery.toLowerCase(), language);

  if (intent === 'pricing') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Los precios dependen del alcance del proyecto. Por favor agenda una llamada para discutir tus necesidades 👉 https://shreegauli.com/book'
        : "Pricing depends on the scope of work. Let's hop on a quick call so I can understand your needs and give you a clear quote: https://shreegauli.com/book",
    };
  }

  if (intent === 'services') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Shree ofrece SEO, Google & Meta Ads, gestión de redes sociales y automatización de marketing. Más detalles en https://shreegauli.com/services'
        : "Shree specializes in **SEO**, **Google & Meta Ads**, **social media management**, and **marketing automation**. See the full list: https://shreegauli.com/services. What's your biggest marketing challenge right now?",
    };
  }

  if (intent === 'booking') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Puedes agendar una consulta estratégica gratuita aquí 👉 https://shreegauli.com/book. ¡Será un placer ayudarte!'
        : "You can book a **free 30-minute strategy call** right here: https://shreegauli.com/book. Available Mon, Thu, Fri, Sat & Sun mornings (9 AM – 1 PM CT).",
    };
  }

  if (intent === 'dashboard') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'El dashboard unificado pone todos los datos de marketing en un solo lugar — Google Ads, SEO, redes sociales. Agenda una demo: https://shreegauli.com/book'
        : "The **unified analytics dashboard** puts all your marketing data in one place — Google Ads, Meta, SEO, social metrics. Want to see it? Book a call: https://shreegauli.com/book",
    };
  }

  if (intent === 'industries') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Shree trabaja con empresas de diversos sectores, especialmente en salud, servicios profesionales y e-commerce. Más info: https://shreegauli.com/services'
        : "Shree works with businesses across various industries including **healthcare, professional services, and e-commerce**. Each strategy is tailored to your niche. Learn more: https://shreegauli.com/services",
    };
  }

  if (intent === 'results') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Puedes ver casos de éxito y resultados en https://shreegauli.com/work. ¿Qué objetivos de crecimiento tienes en mente?'
        : "Check out the case studies and proven results at https://shreegauli.com/work. What growth goals do you have in mind?",
    };
  }

  if (intent === 'about-company') {
    return {
      matchedIntent: true,
      reply: isEs
        ? 'Shree Krishna Gauli es un especialista en marketing digital con sede en Dallas, TX. Se enfoca en SEO, publicidad digital, redes sociales y automatización. Conócelo en https://shreegauli.com/about'
        : "Shree Krishna Gauli is a **digital marketing specialist** based in Dallas, TX. He focuses on SEO, paid media, social media, and marketing automation. Learn more at https://shreegauli.com/about",
    };
  }

  return {
    matchedIntent: false,
    reply: isEs
      ? 'Soy el asistente de Shree. Puedo ayudarte con información sobre servicios, procesos y más. ¿Qué te gustaría saber? 😊'
      : "I'm Shree's AI assistant! I can help with info about services, process, results, and more. What would you like to know? 😊",
  };
}

function summarizeConversation(messages: Message[], language: 'en' | 'es' = 'en') {
  const userMessages = messages.filter((m) => m.role === 'user').map((m) => m.content.trim()).filter(Boolean);
  const combined = userMessages.join(' ').toLowerCase();
  const intents: string[] = [];

  const has = (patterns: string[]) => patterns.some((pattern) => combined.includes(pattern));

  if (has(['price', 'pricing', 'cost', 'precio'])) intents.push('Pricing Inquiry');
  if (has(['service', 'offer', 'seo', 'ads', 'website', 'servicio'])) intents.push('Service Inquiry');
  if (has(['book', 'schedule', 'consult', 'contact', 'consulta', 'agendar'])) intents.push('Consultation Intent');
  if (has(['urgent care', 'er', 'medspa', 'dental', 'clinic', 'clínica'])) intents.push('Industry Fit Check');

  const leadSignal = has(['book', 'schedule', 'contact', 'quote', 'proposal', 'precio', 'agendar'])
    ? 'High'
    : userMessages.length >= 3
      ? 'Medium'
      : 'Low';

  const topQuestions = userMessages.slice(-3).join(' | ') || (language === 'es' ? 'Sin preguntas registradas' : 'No user questions captured');
  const intentText = intents.length > 0 ? intents.join(', ') : language === 'es' ? 'Consulta general' : 'General Inquiry';

  const summary = language === 'es'
    ? `Intereses: ${intentText}. Nivel de intención: ${leadSignal}. Últimas preguntas: ${topQuestions}`
    : `Interests: ${intentText}. Lead intent: ${leadSignal}. Latest questions: ${topQuestions}`;

  const report = language === 'es'
    ? `Reporte de visita: Usuario preguntó sobre ${intentText.toLowerCase()}. Señal de conversión: ${leadSignal}. Recomendación: seguimiento comercial con propuesta y llamada.`
    : `Visit report: User asked about ${intentText.toLowerCase()}. Conversion signal: ${leadSignal}. Recommendation: sales follow-up with proposal and strategy call.`;

  return { summary, report };
}

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId, visitorId, language } = (await req.json()) as ChatRequestBody;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const currentLanguage: 'en' | 'es' = language === 'es' ? 'es' : 'en';
    const activeSessionKey = sessionId || `anon-${Date.now()}`;

    let session: { id: string } | null = null;
    try {
      session = await prisma.chatSession.upsert({
        where: { sessionKey: activeSessionKey },
        update: {
          visitorId: visitorId || undefined,
          language: currentLanguage,
        },
        create: {
          sessionKey: activeSessionKey,
          visitorId,
          language: currentLanguage,
        },
        select: { id: true },
      });
    } catch (dbError) {
      console.error('Chat session persistence skipped:', dbError);
    }

    const latestUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';

    // Keep only last 10 messages to control context length
    const recentMessages = messages.slice(-10);
    const recentUserMessages = recentMessages
      .filter((m) => m.role === 'user')
      .map((m) => m.content)
      .filter(Boolean);

    if (latestUserMessage && session) {
      try {
        await prisma.chatMessage.create({
          data: {
            sessionId: session.id,
            role: 'user',
            content: latestUserMessage,
          },
        });
      } catch (dbError) {
        console.error('User chat message persistence skipped:', dbError);
      }
    }

    // ── RAG: Retrieve relevant website content ──
    let retrievedChunks: Awaited<ReturnType<typeof retrieveContext>> = [];
    let sources: { url: string; title: string }[] = [];
    let isUnanswered = false;

    const retrievalQuery = buildFallbackQuery(latestUserMessage, recentUserMessages);

    try {
      retrievedChunks = await retrieveContext(retrievalQuery, 5);
      if (retrievedChunks.length === 0) {
        // Fallback to keyword search
        retrievedChunks = keywordSearch(retrievalQuery, 3);
      }
      sources = extractSources(retrievedChunks);
      if (retrievedChunks.length === 0) {
        console.log('[Chat API] No relevant content found for:', retrievalQuery.substring(0, 80));
      }
    } catch (ragError) {
      console.error('[Chat API] RAG retrieval failed, continuing without context:', ragError);
    }

    const retrievedContext = formatContextForPrompt(retrievedChunks);
    const systemPrompt = buildSystemPrompt(retrievedContext, currentLanguage);

    // Build Gemini conversation contents with RAG context
    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Understood. I\'m Shree\'s AI assistant on shreegauli.com. I\'ll answer using the retrieved website content and follow all guidelines.' }] },
      ...recentMessages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    ];

    let reply = '';
    let usedFallback = false;
    let fallbackMatchedIntent = false;

    // Check if API key is properly configured
    if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
      console.error('[Chat API] GEMINI_API_KEY is not configured.');
      usedFallback = true;
      const fallbackDecision = fallbackReply(latestUserMessage, recentUserMessages, currentLanguage);
      reply = fallbackDecision.reply;
      fallbackMatchedIntent = fallbackDecision.matchedIntent;
    } else {
      try {
        console.log('[Chat API] Calling Gemini with', recentMessages.length, 'messages and', retrievedChunks.length, 'RAG chunks');

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
            body: JSON.stringify({
              contents,
              generationConfig: {
                maxOutputTokens: 600,
                temperature: 0.7,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[Chat API] Gemini API error:', response.status, errorText);
          usedFallback = true;
          const fallbackDecision = fallbackReply(latestUserMessage, recentUserMessages, currentLanguage);
          reply = fallbackDecision.reply;
          fallbackMatchedIntent = fallbackDecision.matchedIntent;
        } else {
          const data = await response.json();
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!generatedText || generatedText.trim() === '') {
            console.warn('[Chat API] Gemini returned empty response, using fallback');
            usedFallback = true;
            const fallbackDecision = fallbackReply(latestUserMessage, recentUserMessages, currentLanguage);
            reply = fallbackDecision.reply;
            fallbackMatchedIntent = fallbackDecision.matchedIntent;
          } else {
            reply = generatedText;
            console.log('[Chat API] Gemini response OK (%d RAG chunks used)', retrievedChunks.length);
          }
        }
      } catch (error) {
        console.error('[Chat API] Gemini API call failed:', error);
        usedFallback = true;
        const fallbackDecision = fallbackReply(latestUserMessage, recentUserMessages, currentLanguage);
        reply = fallbackDecision.reply;
        fallbackMatchedIntent = fallbackDecision.matchedIntent;
      }
    }

    isUnanswered = retrievedChunks.length === 0 && usedFallback && !fallbackMatchedIntent;

    // Log unanswered questions for review
    if (isUnanswered && latestUserMessage.length > 5) {
      try {
        await prisma.unansweredQuestion.create({
          data: {
            question: latestUserMessage.substring(0, 500),
            sessionId: session?.id,
          },
        });
      } catch (dbError) {
        console.error('Unanswered question logging skipped:', dbError);
      }
    }

    if (session) {
      try {
        await prisma.chatMessage.create({
          data: {
            sessionId: session.id,
            role: 'assistant',
            content: reply,
          },
        });
      } catch (dbError) {
        console.error('Assistant chat message persistence skipped:', dbError);
      }
    }

    const fullConversation: Message[] = [...messages, { role: 'assistant', content: reply } as Message];
    const { summary, report } = summarizeConversation(fullConversation, currentLanguage);

    if (session) {
      try {
        await prisma.chatSession.update({
          where: { id: session.id },
          data: { summary, report, language: currentLanguage },
        });
      } catch (dbError) {
        console.error('Chat session summary update skipped:', dbError);
      }
    }

    return NextResponse.json({ reply, sources, fallback: usedFallback, unanswered: isUnanswered });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ reply: "Oops, I hit a small snag! Please try again, or reach out at https://shreegauli.com/contact. 😊", sources: [], fallback: true, unanswered: false });
  }
}
