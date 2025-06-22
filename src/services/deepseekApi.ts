/**
 * Bible Analysis API Service using OpenRouter
 * 
 * This service provides functions to analyze Bible verses using AI
 */

export interface AnalysisResponse {
  analysis: string;
  keyThemes: string[];
  practicalApplications: string[];
}

/**
 * Analyze a collection of Bible verses on a specific topic using OpenRouter
 * @param topic - The biblical topic being analyzed
 * @param verseTexts - The text of the verses to analyze
 * @param translation - The Bible translation used
 * @returns A promise that resolves to the analysis text
 */
export async function analyzeVerses(topic: string, verseTexts: string, translation: string = 'NIV'): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenRouter API key is required');
  }

  try {
    const prompt = `As a biblical scholar and theologian, provide a comprehensive analysis of these Bible verses about "${topic}" from the ${translation} translation:

${verseTexts}

Please provide:
1. Key theological themes and their significance
2. Historical and cultural context where relevant
3. Practical applications for modern Christian living
4. Connections between the verses and how they complement each other

Format your response in markdown with clear headings and bullet points for readability.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Solomon\'s Web Bible App'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable biblical scholar and theologian who provides thoughtful, historically informed analysis of Scripture. Your responses should be educational, respectful, and accessible to both new and experienced students of the Bible.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysis = data.choices[0]?.message?.content;
    
    if (!analysis) {
      throw new Error('No analysis received from OpenRouter API');
    }

    return analysis;
  } catch (error) {
    console.error('Error generating analysis with OpenRouter:', error);
    throw error;
  }
}

/**
 * In a production environment, this would use the actual Deepseek API
 * Example of what that implementation might look like:
 */
async function callDeepseekApi(prompt: string): Promise<string> {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are a biblical scholar and theologian who provides thoughtful, historically informed analysis of Scripture.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    throw new Error(`Deepseek API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}