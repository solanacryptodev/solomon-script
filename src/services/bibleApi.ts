

/**
 * Bible API Service
 * 
 * This service provides functions to interact with Bible data using OpenRouter
 */

export interface Verse {
  reference: string;
  text: string;
}

export interface Translation {
  id: string;
  name: string;
  abbreviation: string;
}

/**
 * Search for Bible verses related to a specific topic using OpenRouter AI
 * @param params - Search parameters
 * @param params.topic - The topic to search for
 * @param params.translation - The Bible translation to use
 * @returns A promise that resolves to an array of verse objects
 */
export async function searchVerses({ topic, translation }: { topic: string; translation: string }): Promise<Verse[]> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  console.log('topic and translation:', topic, translation)
  
  if (!apiKey) {
    throw new Error('OpenRouter API key is required');
  }

  try {
    const prompt = `Find 5-10 relevant Bible verses about "${topic}" from the ${translation} translation. 
    Return ONLY a JSON array of objects with this exact format:
    [{"reference": "BOOK CHAPTER:VERSE", "text": "exact verse text"}]
    
    Do not include any other text, explanations, or formatting. Only return the JSON array.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://solomonsweb.replit.app',
        'X-Title': 'Solomon\'s Web Bible App'
      },
      body: JSON.stringify({
        model: 'google/gemma-3-27b-it',
        messages: [
          {
            role: 'system',
            content: 'You are a biblical scholar with access to all Bible translations. Return only valid JSON arrays of Bible verses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    console.log('API content:', content);
    
    if (!content) {
      throw new Error('No content received from OpenRouter API');
    }

    // Parse the JSON response
    try {
      const verses = JSON.parse(content);
      console.log('Parsed verses:', verses);
      
      if (!Array.isArray(verses)) {
        throw new Error('Invalid response format from API');
      }

      return verses;
    } catch (parseError) {
      console.error('Failed to parse JSON response:', content);
      console.error('Parse error:', parseError);
      throw new Error('Invalid JSON response from API');
    }
    
    // if (!Array.isArray(verses)) {
    //   throw new Error('Invalid response format from API');
    // }

    return content;
  } catch (error) {
    console.error('Error fetching verses from OpenRouter:', error);
    throw error;
  }
}

/**
 * Get a list of available Bible translations
 * @returns A promise that resolves to an array of translation objects
 */
export async function getTranslations(): Promise<Translation[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    { id: 'NIV', name: 'New International Version', abbreviation: 'NIV' },
    { id: 'ESV', name: 'English Standard Version', abbreviation: 'ESV' },
    { id: 'KJV', name: 'King James Version', abbreviation: 'KJV' },
    { id: 'NASB', name: 'New American Standard Bible', abbreviation: 'NASB' },
    { id: 'NLT', name: 'New Living Translation', abbreviation: 'NLT' },
    { id: 'CSB', name: 'Christian Standard Bible', abbreviation: 'CSB' }
  ];
}

/**
 * In a production environment, this would integrate with a proper Bible API
 * such as Bible API, ESV API, or YouVersion API
 */