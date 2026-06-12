import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

async function run() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Write a short one-sentence hello to DZ Analytica.'
          }]
        }]
      })
    });
    const data = await response.json();
    console.log('SUCCESS:', data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

run();
