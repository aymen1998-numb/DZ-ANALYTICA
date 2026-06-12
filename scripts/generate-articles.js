import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY is missing in .env');
  process.exit(1);
}

const feedUrl = 'https://news.google.com/rss/search?q=Algeria+economy+OR+Algeria+business+OR+Algeria+technology&hl=en-US&gl=US&ceid=US:en';

async function fetchRssFeed() {
  try {
    const response = await fetch(feedUrl);
    const xml = await response.text();
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];
      const title = itemContent.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
      const description = itemContent.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';
      const pubDate = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '';
      // Decode HTML entities a bit
      const cleanTitle = title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      items.push({ title: cleanTitle, description, pubDate });
    }
    return items.slice(0, 15); // Top 15 articles
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

async function generateArticle(newsItems) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const prompt = `
You are the Lead Market Analyst at DZ Analytica. 
Analyze the following recent news items from Algeria:
${JSON.stringify(newsItems, null, 2)}

Identify the single most significant trend (e.g. macro-economic, tech, B2B business, cotton, fiber, industry expansion, or Odoo ERP integration). 
Write a high-quality, professional, data-driven analytical news article about this trend.
The article must be written in three languages: Arabic, English, and French.

Your response must be in raw JSON format matching this exact schema:
{
  "slug": "url-friendly-slug-in-english-only",
  "title": {
    "ar": "عنوان احترافي باللغة العربية",
    "en": "Professional Title in English",
    "fr": "Titre professionnel en Français"
  },
  "excerpt": {
    "ar": "ملخص للمقالة باللغة العربية (سطرين)",
    "en": "Summary of the article in English (2 sentences)",
    "fr": "Résumé de l'article en Français (2 phrases)"
  },
  "content": {
    "ar": "المحتوى الكامل للمقالة باللغة العربية في فقرات واضحة مع عناوين فرعية ومؤشرات دقيقة.",
    "en": "Full analytical content of the article in English, in clean paragraphs with subheaders.",
    "fr": "Contenu analytique complet de l'article en Français, avec des paragraphes et des sous-titres."
  },
  "keywords": {
    "ar": "الكلمات المفتاحية مفصولة بفواصل",
    "en": "keywords separated by commas",
    "fr": "mots-clés séparés par des virgules"
  }
}
`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });
  
  const data = await response.json();
  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No candidates returned from Gemini API: ' + JSON.stringify(data));
  }
  const rawText = data.candidates[0].content.parts[0].text;
  return JSON.parse(rawText);
}

async function generateCustomArticle(subject) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const prompt = `
You are the Lead Market Analyst at DZ Analytica. 
Write a high-quality, professional, data-driven analytical news/market prediction report about this specific subject, query, or trend in Algeria:
"${subject}"

Your article should focus on predictive analysis and forecasting (e.g., consumer behavior shifts, advertising swarm trends, economic impact, B2B opportunities, or sports-related economic forecasts like the World Cup impact).
Write the report in three languages: Arabic, English, and French.

Your response must be in raw JSON format matching this exact schema:
{
  "slug": "url-friendly-slug-in-english-only",
  "title": {
    "ar": "عنوان احترافي باللغة العربية",
    "en": "Professional Title in English",
    "fr": "Titre professionnel en Français"
  },
  "excerpt": {
    "ar": "ملخص للمقالة باللغة العربية (سطرين)",
    "en": "Summary of the article in English (2 sentences)",
    "fr": "Résumé de l'article en Français (2 phrases)"
  },
  "content": {
    "ar": "المحتوى الكامل للمقالة باللغة العربية في فقرات واضحة مع عناوين فرعية ومؤشرات دقيقة.",
    "en": "Full analytical content of the article in English, in clean paragraphs with subheaders.",
    "fr": "Contenu analytique complet de l'article en Français, avec des paragraphes et des sous-titres."
  },
  "keywords": {
    "ar": "الكلمات المفتاحية مفصولة بفواصل",
    "en": "keywords separated by commas",
    "fr": "mots-clés séparés par des virgules"
  }
}
`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });
  
  const data = await response.json();
  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No candidates returned from Gemini API: ' + JSON.stringify(data));
  }
  const rawText = data.candidates[0].content.parts[0].text;
  return JSON.parse(rawText);
}

async function main() {
  const customSubject = process.env.ARTICLE_SUBJECT;
  let newArticle;

  if (customSubject && customSubject.trim() !== '') {
    console.log(`Generating article for custom subject: "${customSubject}" via Gemini...`);
    newArticle = await generateCustomArticle(customSubject);
  } else {
    console.log('Fetching news feed...');
    const newsItems = await fetchRssFeed();
    if (newsItems.length === 0) {
      console.log('No news items found in feed. Exiting.');
      return;
    }
    console.log(`Found ${newsItems.length} news items. Generating article via Gemini...`);
    newArticle = await generateArticle(newsItems);
  }
  
  newArticle.date = new Date().toISOString();
  
  console.log('Article generated successfully:', newArticle.title.en);
  
  const dataDir = path.resolve('src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const filePath = path.join(dataDir, 'articles.json');
  let articles = [];
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    try {
      articles = JSON.parse(rawData);
    } catch (e) {
      articles = [];
    }
  }
  
  // Prepend the new article
  articles.unshift(newArticle);
  
  // Keep only the last 12 articles
  articles = articles.slice(0, 12);
  
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf8');
  console.log(`Successfully saved new article to ${filePath}`);
  
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `title=${newArticle.title.en}\n`, 'utf8');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `slug=${newArticle.slug}\n`, 'utf8');
  }
}

main().catch(console.error);
