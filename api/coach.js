const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function buildPrompt(topic) {
  return [
    'Act as an expert debate coach for students.',
    'Use clear markdown headings and concise bullet points.',
    `Topic: ${topic}`,
    '',
    'Provide:',
    '1. A one-sentence framing of the debate',
    '2. Three strong arguments FOR the topic',
    '3. Three strong arguments AGAINST the topic',
    '4. Two likely rebuttals for each side',
    '5. A short opening statement for each side',
    '6. Search keywords students can use to find evidence',
  ].join('\n');
}

function extractText(payload) {
  if (typeof payload?.output_text === 'string') {
    return payload.output_text;
  }

  const output = Array.isArray(payload?.output) ? payload.output : [];
  return output
    .flatMap((item) => (Array.isArray(item?.content) ? item.content : []))
    .map((content) => (typeof content?.text === 'string' ? content.text : ''))
    .filter(Boolean)
    .join('\n')
    .trim();
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST /api/coach' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
  }

  const topic = String(req.body?.topic || '').trim();
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  try {
    const openaiResponse = await fetch(OPENAI_RESPONSES_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        instructions:
          'You are a sharp, supportive debate coach. Help students build balanced, evidence-aware arguments. Keep responses practical and easy to use in a live debate.',
        input: buildPrompt(topic),
        max_output_tokens: 900,
      }),
    });

    const payload = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return res.status(openaiResponse.status).json({
        error: payload?.error?.message || 'OpenAI returned an error.',
      });
    }

    const answer = extractText(payload);
    if (!answer) {
      return res.status(502).json({ error: 'OpenAI returned an empty response.' });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error('OpenAI coach error:', error);
    return res.status(500).json({ error: 'Failed to generate coach response.' });
  }
}
