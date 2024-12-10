
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    // Create prompt
    const prompt = messages.map(m => `${m.role === 'user' ? 'Human' : 'Assistant'}: ${m.content}`).join('\n') + '\nAssistant:';

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    const data = await response.json();

    // Check if candidates exist
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const assistantResponse = data.candidates[0].content.parts[0].text.trim();
      return res.status(200).json({ message: assistantResponse });
    } else {
      return res.status(500).json({ message: 'Invalid response structure from API' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
}

