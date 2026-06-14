import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Menu, X, Map, FlaskConical, Ear, PenTool, BarChart3, GraduationCap, 
  ChevronDown, ArrowLeft, Send, ShieldCheck, Users, BrainCircuit, Brain, Globe, CheckCircle2, ChevronLeft, LineChart, Database, Target, Layers, Cloud, Share2, Linkedin, Facebook, Twitter, Presentation, PieChart, Languages
} from 'lucide-react';
import { DZCompassQuiz } from './components/DZCompassQuiz';
import { PitchDeck } from './components/PitchDeck';
import { useTranslation, Language } from './translations';
import { EthicsModal } from './components/EthicsModal';
import { StatsHub } from './components/StatsHub';
import articlesData from './data/articles.json';

const articles = articlesData as any[];

const navLinks = [
  { name: 'الرئيسية', href: '#home' },
  { name: 'من نحن', href: '#about' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'دراسات حالة', href: '#case-studies' },
  { name: 'المرصد', href: '#stats-hub' },
  { name: 'التحليلات', href: '#blog' },
  { name: 'اتصل بنا', href: '#contact' },
];

const formatDate = (dateString: string, currentLang: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(currentLang === 'ar' ? 'ar-DZ' : currentLang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const categoryTranslations: Record<string, Record<string, string>> = {
  all: { ar: 'الكل', en: 'All', fr: 'Tout' },
  wc: { ar: 'كأس العالم 2026', en: 'World Cup 2026', fr: 'Coupe du Monde 2026' },
  dz: { ar: 'السوق الجزائري', en: 'Algerian Market', fr: 'Marché Algérien' },
  erp: { ar: 'أنظمة Odoo ERP', en: 'Odoo ERP Systems', fr: 'Systèmes Odoo ERP' }
};

const getCategoryOfArticle = (article: any, currentLang: string) => {
  const titleText = (article.title[currentLang] || article.title['ar'] || '').toLowerCase();
  const excerptText = (article.excerpt[currentLang] || article.excerpt['ar'] || '').toLowerCase();
  const contentText = (article.content[currentLang] || article.content['ar'] || '').toLowerCase();
  const keywords = ((article.keywords[currentLang] || article.keywords['en'] || '') + ' ' + titleText + ' ' + excerptText + ' ' + contentText).toLowerCase();
  
  if (keywords.includes('odoo') || keywords.includes('erp') || keywords.includes('نظام') || keywords.includes('برمجيات')) {
    return 'erp';
  }
  if (keywords.includes('algeria') || keywords.includes('الجزائر') || keywords.includes('فنك') || keywords.includes('dz')) {
    if (keywords.includes('world cup') || keywords.includes('كأس العالم') || keywords.includes('مونديال')) {
      return 'wc';
    }
    return 'dz';
  }
  if (keywords.includes('world cup') || keywords.includes('كأس العالم') || keywords.includes('مونديال') || keywords.includes('منتخب') || keywords.includes('مباراة') || keywords.includes('كرة')) {
    return 'wc';
  }
  return 'other';
};

const getGaugesForArticle = (slug: string, lang: string) => {
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  switch (slug) {
    case 'fifa-world-cup-2026-overall-winner-predictions':
      return [
        { label: isAr ? 'إسبانيا — احتمالية اللقب' : isFr ? 'Espagne — Probabilité de Titre' : 'Spain — Championship Prob.', value: '18.5%', desc: isAr ? 'المرشح الأول للبطولة' : isFr ? 'Favori numéro 1' : 'Top ranked contender', pct: 18.5, color: 'green' },
        { label: isAr ? 'البرازيل — احتمالية اللقب' : isFr ? 'Brésil — Probabilité de Titre' : 'Brazil — Championship Prob.', value: '16.2%', desc: isAr ? 'المرشح الثاني للبطولة' : isFr ? 'Favori numéro 2' : 'Second ranked contender', pct: 16.2, color: 'green' },
        { label: isAr ? 'فرنسا — احتمالية اللقب' : isFr ? 'France — Probabilité de Titre' : 'France — Championship Prob.', value: '14.8%', desc: isAr ? 'بطل نسخة 2018' : isFr ? 'Champion 2018' : '2018 Champion', pct: 14.8, color: 'gold' },
        { label: isAr ? 'عمليات المحاكاة' : isFr ? 'Simulations de Monte Carlo' : 'Monte Carlo Simulations', value: '10,000', desc: isAr ? 'محاكاة كاملة للمسار' : isFr ? 'Simulations complètes' : 'Complete tournament paths', pct: 100, color: 'slate' }
      ];
    case 'algeria-vs-austria-2026-world-cup-prediction':
      return [
        { label: isAr ? 'الجزائر — احتمالية الفوز' : isFr ? 'Algérie — Probabilité de Victoire' : 'Algeria — Win Probability', value: '42%', desc: isAr ? 'توقعات عالية للفوز' : isFr ? 'Forte chance de victoire' : 'High win expectancy', pct: 42, color: 'green' },
        { label: isAr ? 'احتمالية التعادل' : isFr ? 'Probabilité de Match Nul' : 'Draw Probability', value: '30%', desc: isAr ? 'سيناريو التعادل التكتيكي' : isFr ? 'Scénario nul tactique' : 'Tactical draw scenario', pct: 30, color: 'gold' },
        { label: isAr ? 'النمسا — احتمالية الفوز' : isFr ? 'Autriche — Probabilité de Victoire' : 'Austria — Win Probability', value: '28%', desc: isAr ? 'تحت قيادة رالف رانجنيك' : isFr ? 'Sous Ralf Rangnick' : 'Under Ralf Rangnick', pct: 28, color: 'slate' },
        { label: isAr ? 'الجزائر — الأهداف المتوقعة' : isFr ? 'Algérie — Expected Goals (xG)' : 'Algeria — Expected Goals (xG)', value: '1.45', desc: isAr ? 'معدل التهديف المتوقع' : isFr ? 'Taux de buts attendus' : 'Projected scoring rate', pct: 65, color: 'green' }
      ];
    case 'morocco-vs-brazil-2026-world-cup-simulation':
      return [
        { label: isAr ? 'احتمالية التعادل' : isFr ? 'Probabilité de Match Nul' : 'Draw Probability', value: '41%', desc: isAr ? 'سيناريو الجولة الأولى الفعلي' : isFr ? 'Scénario réel Matchday 1' : 'Actual Matchday 1 scenario', pct: 41, color: 'green' },
        { label: isAr ? 'البرازيل — الاستحواذ' : isFr ? 'Brésil — Possession' : 'Brazil — Possession', value: '62%', desc: isAr ? 'سيطرة متوقعة على الكرة' : isFr ? 'Contrôle attendu' : 'Expected ball control', pct: 62, color: 'slate' },
        { label: isAr ? 'ياسين بونو — نسبة الإنقاذ' : isFr ? 'Bono — Taux d\'Arrêts' : 'Bono — Save Rate', value: '89%', desc: isAr ? 'أداء حاسم أمام الهجوم' : isFr ? 'Performance décisive' : 'Decisive performance', pct: 89, color: 'green' },
        { label: isAr ? 'تصنيف إيلو للمغرب' : isFr ? 'Classement Elo Maroc' : 'Morocco Elo Rating', value: '1,841', desc: isAr ? 'الأعلى في القارة الأفريقية' : isFr ? 'Top en Afrique' : 'Highest in Africa', pct: 90, color: 'gold' }
      ];
    default:
      return [
        { label: isAr ? 'دقة التوقع للنموذج' : isFr ? 'Précision du Modèle' : 'Model Prediction Accuracy', value: '94%', desc: isAr ? 'دقة المعايرة الإحصائية' : isFr ? 'Calibration statistique' : 'Statistical calibration accuracy', pct: 94, color: 'green' },
        { label: isAr ? 'النمو المتوقع لسوق الرعاية B2B' : isFr ? 'Croissance du Sponsoring B2B' : 'B2B Sponsorship Market Growth', value: '+40%', desc: isAr ? 'مقارنة بنسخة 2022' : isFr ? 'Par rapport à 2022' : 'Compared to 2022 tournament', pct: 40, color: 'gold' },
        { label: isAr ? 'حجم العينة المستهدفة' : isFr ? 'Taille de l\'Échantillon' : 'Target Sample Size', value: '50k+', desc: isAr ? 'سلوكيات مستهلكين محللة' : isFr ? 'Profils de consommation' : 'Analyzed consumer profiles', pct: 80, color: 'green' },
        { label: isAr ? 'نقاط البيانات الكلية' : isFr ? 'Points de Données Totaux' : 'Total Data Points', value: '1.2M', desc: isAr ? 'بيانات ديموغرافية وجغرافية' : isFr ? 'Données démographiques' : 'Demographic & geographic variables', pct: 100, color: 'slate' }
      ];
  }
};

const getSidebarInsights = (slug: string, lang: string) => {
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  switch (slug) {
    case 'fifa-world-cup-2026-overall-winner-predictions':
      return {
        takeaways: [
          isAr ? 'حملات الرعاية المشتركة بين العلامات التجارية الإسبانية والبرازيلية ستشهد عوائد قياسية.' : 'Joint sponsorship campaigns between Spanish and Brazilian brands will yield record returns.',
          isAr ? 'الشركات الرقمية الرياضية يجب أن تستهدف خدمات البث المباشر المخصصة للأجهزة المحمولة.' : 'Sports digital agencies should target mobile-focused streaming integrations.',
          isAr ? 'الحصص السوقية للشركات الراعية لفرنسا مهددة بالانخفاض في حال الخروج المبكر.' : 'Market share for brands sponsoring France is at risk in case of an early exit.'
        ],
        confidence: isAr ? 'دقة عالية (92%)' : 'High Confidence (92%)',
        elo: '2,071 (Spain)'
      };
    case 'algeria-vs-austria-2026-world-cup-prediction':
      return {
        takeaways: [
          isAr ? 'مباراة حسم التأهل ستشهد أعلى معدل مشاهدة تلفزيونية ورقمية في الجزائر لعام 2026.' : 'The decider match will command the highest TV and digital viewership in Algeria for 2026.',
          isAr ? 'العلامات التجارية المحلية للأغذية والمشروبات يجب أن تكثف حملاتها قبل المباراة بـ 48 ساعة.' : 'Local food and beverage brands should ramp up campaigns 48 hours before kickoff.',
          isAr ? 'قطاع الفعاليات ومناطق المشجعين سيشهد تدفقات مالية استثنائية B2B.' : 'B2B hospitality and fan zone sectors will see exceptional financial inflows.'
        ],
        confidence: isAr ? 'متوسطة (78%)' : 'Medium Confidence (78%)',
        elo: '1,814 (Algeria)'
      };
    case 'morocco-vs-brazil-2026-world-cup-simulation':
      return {
        takeaways: [
          isAr ? 'تعادل المغرب التاريخي مع البرازيل ضاعف القيمة التجارية لأسود الأطلس بنسبة 220%.' : 'Morocco\'s historic draw with Brazil multiplied the commercial value of the Atlas Lions by 220%.',
          isAr ? 'الاستثمار الإعلاني الموجه للجمهور المغربي يمثل القناة التسويقية الأكثر ربحية للمعلنين الإقليميين.' : 'Ad spend targeting the Moroccan audience represents the most profitable channel for regional advertisers.',
          isAr ? 'الأداء الدفاعي المميز للمغرب يدعم الشراكات التجارية طويلة الأجل مع العلامات التجارية الكبرى.' : 'Morocco\'s outstanding defensive performance supports long-term commercial partnerships with global brands.'
        ],
        confidence: isAr ? 'عالية (85%)' : 'High Confidence (85%)',
        elo: '1,841 (Morocco)'
      };
    default:
      return {
        takeaways: [
          isAr ? 'يجب على الشركات الجزائرية استغلال قنوات التواصل الرقمية المتكاملة لتوسيع حصتها السوقية.' : 'Algerian companies must leverage integrated digital communication channels to expand market share.',
          isAr ? 'التحليلات الديموغرافية الدقيقة تمثل المفتاح الأساسي لتصميم استراتيجيات تسويق موجهة وفعالة.' : 'Precise demographic analytics represent the key to designing targeted and effective marketing strategies.',
          isAr ? 'الاستثمار في أنظمة إدارة الموارد السحابية Odoo ERP يدعم التحول الهيكلي للشركات المحلية.' : 'Investment in cloud Odoo ERP systems supports the structural transformation of local enterprises.'
        ],
        confidence: isAr ? 'عالية (94%)' : 'High Confidence (94%)',
        elo: '1,756 (Qatar)'
      };
  }
};

export default function App() {
  const { t, lang, setLang } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);
  const [isEthicsOpen, setIsEthicsOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState<'market-polling' | 'ai-prediction' | 'software-erp'>('market-polling');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleArticlesCount, setVisibleArticlesCount] = useState(6);

  // Filter articles based on category and search query
  const filteredArticles = articles.filter(article => {
    const titleText = (article.title[lang] || article.title['ar'] || '').toLowerCase();
    const excerptText = (article.excerpt[lang] || article.excerpt['ar'] || '').toLowerCase();
    const contentText = (article.content[lang] || article.content['ar'] || '').toLowerCase();
    
    const matchesSearch = !searchQuery || 
      titleText.includes(searchQuery.toLowerCase()) ||
      excerptText.includes(searchQuery.toLowerCase()) ||
      contentText.includes(searchQuery.toLowerCase());
      
    const cat = getCategoryOfArticle(article, lang);
    const matchesCategory = selectedCategory === 'all' || selectedCategory === cat;
    
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // Secret ways to open modals directly via URL path or parameters
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    
    if (search.includes('pitchdeck=true') || path === '/pitchdeck' || path === '/deck') {
      setIsPitchDeckOpen(true);
    }
    if (search.includes('quiz=true') || search.includes('survey=true') || path === '/quiz' || path === '/survey' || path === '/compass') {
      setIsQuizOpen(true);
    }
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Contact Form Data:", data);
    e.currentTarget.reset();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen bg-dz-darker text-white overflow-x-hidden selection:bg-dz-gold selection:text-dz-darker ${isRtl ? 'font-sans' : 'font-sans-inter'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Helmet>
        <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'} />
        <link rel="canonical" href="https://www.dzanalytica.com/" />
        <link rel="alternate" hreflang="ar" href="https://www.dzanalytica.com/?lang=ar" />
        <link rel="alternate" hreflang="en" href="https://www.dzanalytica.com/?lang=en" />
        <link rel="alternate" hreflang="fr" href="https://www.dzanalytica.com/?lang=fr" />
        <link rel="alternate" hreflang="x-default" href="https://www.dzanalytica.com/" />
        <title>{t("دزاير أناليتيكا | تحليل السوق، Odoo ERP، ومحاكاة الرأي العام MiroFish بالجزائر")}</title>
        <meta name="description" content={t("دزاير أناليتيكا هي خيارك الأول لفهم السوق الجزائري، محاكاة الرأي العام وسلوك المستهلك (MiroFish)، تنفيذ أنظمة Odoo ERP للشركات، وتحليل البيانات الذكية في الجزائر.")} />
        <meta name="keywords" content={t("دراسات السوق الجزائرية, محاكاة الرأي العام الجزائر, MiroFish, Odoo ERP الجزائر, تكامل Odoo, تحليلات البيانات الجزائر, محاكاة سلوك المستهلك, B2B data Algeria, swarm analysis Algeria, دزاير أناليتيكا")} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DZ Analytica",
              "alternateName": "DZ Analytica",
              "url": "https://www.dzanalytica.com",
              "logo": "https://www.dzanalytica.com/favicon.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "dzair.analytica@gmail.com",
                "contactType": "customer service",
                "areaServed": "DZ",
                "availableLanguage": ["Arabic", "English", "French"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/dz-analytica",
                "https://www.facebook.com/share/1BDxWWJLZq/"
              ]
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Market Intelligence, Data Analytics, Swarm Simulations & Strategy Consulting",
              "provider": {
                "@type": "Organization",
                "name": "DZ Analytica"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Algeria"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Data Analytics & Market Entry Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Market Intelligence & Research",
                      "description": "${t("دراسات السوق والرأي العام")} - Deep insights into Algerian consumer behavior, market trends, and B2B opportunities."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "MiroFish Swarm Simulation & Cognitive Mapping",
                      "description": "Public opinion simulation, cognitive mapping of target personas, and social contagion analysis in Algeria."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Cloud Data Management (SaaS)",
                      "description": "${t("إدارة البيانات السحابية (SaaS)")} - Cloud platform for data management and scalable B2B/B2C communications in Algeria."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Odoo Implementation & ERP",
                      "description": "${t("تنفيذ وتطوير أنظمة Odoo")} - Customized deployment in Algeria."
                    }
                  }
                ]
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "${t("ما هي الخدمات التي تقدمها دزاير أناليتيكا في الجزائر؟")}",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${t("تقدم دزاير أناليتيكا دراسات واستشارات السوق، تحليل بيانات الجمهور، محاكاة الرأي العام (MiroFish)، تنفيذ وتطوير أنظمة Odoo ERP لمساعدة الشركات في الجزائر.")}"
                  }
                },
                {
                  "@type": "Question",
                  "name": "${t("ما هي منصة MiroFish وما أهميتها للشركات بالجزائر؟")}",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${t("منصة MiroFish هي أداة متطورة لمحاكاة الرأي العام والعدوى الاجتماعية بالجزائر، تمكن الشركات والمؤسسات من اختبار القرارات، الإعلانات، والسياسات رقمياً عبر آلاف الحسابات الافتراضية قبل إطلاقها الفعلي.")}"
                  }
                },
                {
                  "@type": "Question",
                  "name": "${t("هل توفر دزاير أناليتيكا خدمات تكامل وتطوير Odoo ERP للشركات الجزائرية؟")}",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${t("نعم، نحن متخصصون في تخصيص وتنفيذ نظام Odoo لإدارة الموارد (ERP) في الجزائر، بما في ذلك إدارة المبيعات، المحاسبة المتوافقة مع النظام الجبائي الجزائري، المخازن، والربط السحابي الآمن.")}"
                  }
                },
                {
                  "@type": "Question",
                  "name": "${t("كيف تساعد المنصة في توسيع نطاق الأعمال B2B ودراسة السوق الجزائري؟")}",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${t("نستخدم خوارزميات الذكاء الاصطناعي والنمذجة التنبؤية لربط الشركات بقواعد بيانات دقيقة للمشترين وصناع القرار الشرائي (B2B qualified leads) في مختلف الولايات الجزائرية.")}"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-dz-darker/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-dz-gold" />
              <span className="font-bold text-2xl tracking-tight">
                <span className="text-white">{t("دزاير")} </span>
                <span className="text-dz-gold">{t("أناليتيكا")}</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith('http')) return;
                    e.preventDefault();
                    const targetId = link.href.replace('#', '');
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-300 hover:text-dz-gold transition-colors font-medium text-sm lg:text-base mr-8"
                >
                  {t(link.name)}
                </a>
              ))}
              <div className="relative group mr-4">
                <button className="flex items-center text-gray-300 hover:text-white font-medium text-sm uppercase">
                  <Languages className="w-4 h-4 ml-1" />
                  {lang}
                </button>
                <div className="absolute right-0 mt-2 w-24 bg-dz-darker border border-white/10 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
                  {['ar', 'en', 'fr'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l as Language)}
                      className={`block w-full text-left px-4 py-2 text-sm uppercase hover:bg-white/5 ${lang === l ? 'text-dz-gold' : 'text-gray-300'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <a 
                href="https://quiz.dzanalytica.com"
                className="bg-dz-green hover:bg-dz-green-light text-white px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(0,98,51,0.5)] hover:shadow-[0_0_25px_rgba(0,180,90,0.6)] !mr-4 cursor-pointer inline-block text-center"
              >
                {t("الخريطة السياسية")}
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dz-dark border-b border-white/10"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
                <div className="flex justify-between items-center px-3 py-3 border-b border-white/10 mb-2">
                   <div className="text-gray-400 text-sm flex items-center"><Languages className="w-4 h-4 ml-2"/> Language</div>
                   <div className="flex gap-2">
                     {['ar', 'en', 'fr'].map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLang(l as Language); setIsMobileMenuOpen(false); }}
                          className={`uppercase text-sm px-3 py-1 rounded ${lang === l ? 'bg-dz-gold text-dz-darker font-bold' : 'bg-white/5 text-gray-300'}`}
                        >
                          {l}
                        </button>
                     ))}
                   </div>
                </div>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('http')) {
                        setIsMobileMenuOpen(false);
                        return;
                      }
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      const targetId = link.href.replace('#', '');
                      const element = document.getElementById(targetId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-dz-gold hover:bg-white/5 rounded-md"
                  >
                    {t(link.name)}
                  </a>
                ))}
                <a
                  href="https://quiz.dzanalytica.com"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 block text-center bg-transparent border-2 border-dz-green text-dz-green px-4 py-3 rounded-md font-bold w-full cursor-pointer"
                >
                  {t("الخريطة السياسية")}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Home Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dz-green-dark/20 to-dz-darker z-10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dz-green rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dz-gold rounded-full mix-blend-screen filter blur-[128px] opacity-10" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                {t("المجتمع ليس مجرد أرقام.")}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-gold to-dz-gold-light">
                  {t("إنهم أكثر من 28 مليون بالغ في الجزائر.")}
                </span><br />
                {t("ونحن نمتلك البيانات لفهم ما يحركهم.")}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                {t("دزاير أناليتيكا: المنصة الجزائرية الأولى لتحليل البيانات وتقييم الرأي العام السايكومتري. نحول البيانات إلى استراتيجيات تواصلية وتأثيرية دقيقة باستخدام الذكاء الاصطناعي وعلم النفس.")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#services"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-dz-green hover:bg-dz-green-light text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {t("استكشف خدماتنا")}
                  <ChevronLeft className="h-5 w-5" />
                </a>
                <button 
                  onClick={() => setIsQuizOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-white/20 hover:border-dz-gold hover:text-dz-gold text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Brain className="h-5 w-5 text-dz-gold group-hover:animate-pulse" />
                  {t("اكتشف تفضيلاتك الثقافية")}
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-10"
            >
              {[
                { label: t('سلوك محلل'), value: '+50,000' },
                { label: t('دراسة وتحليل معمق'), value: '8' },
                { label: t('نمط شخصية'), value: '8' },
                { label: t('دقة التوقع'), value: '94%' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-dz-gold mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-dz-dark relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  onClick={() => setIsEthicsOpen(true)} 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dz-gold mb-6 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-sm font-semibold tracking-wider">{t("ميثاق الأخلاقيات")}</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 whitespace-pre-line">{t("علم النفس يلتقي بالبيانات، \nبنزاهة تامة.")}</h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  {t("بدأت دزاير أناليتيكا كمشروع مختص في الأبحاث السايكومترية. فريقنا، بقيادة د. أمينة منصوري وياسين ولد علي، يجمع بين خبرات معمقة في دراسات السلوك والمجتمع، علوم البيانات، واستراتيجيات التأثير الجماهيري.")}
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    t('لا نستخدم بيانات مسروقة أو غير مصرح بها.'),
                    t('موافقة صريحة وكاملة لجمع البيانات.'),
                    t('معالجة البيانات محلياً وفقاً لقانون حماية البيانات 18-07.'),
                    t('لا نتعامل مع أهداف تضليلية أو نشر الكراهية.')
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-dz-green shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-dz-green-dark/80 to-transparent z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
                    alt={t("فريق الخبراء")} 
                    className="w-full h-full object-cover filter grayscale"
                  />
                  <div className="absolute bottom-8 right-8 left-8 z-20 bg-dz-darker/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-xl mb-2">{t("قيادة أكاديمية وعملية")}</h3>
                    <p className="text-gray-400 text-sm">{t("نحن نترجم الأبحاث الأكاديمية المعقدة إلى استراتيجيات سياسية قابلة للتنفيذ على أرض الواقع الجزائري.")}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-dz-darker">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">{t("حلولنا الذكية")}</h2>
              <p className="text-gray-400 text-lg">
                {t("باقات خدمات متكاملة مصممة خصيصاً لتلبية احتياجات المؤسسات، صُنّاع القرار والوكالات الكبرى في الجزائر لفهم وتوجيه الجمهور.")}
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 max-w-4xl mx-auto">
              {[
                { id: 'market-polling', label: t('دراسات السوق والرأي العام') },
                { id: 'ai-prediction', label: t('الذكاء الاصطناعي والتوقع') },
                { id: 'software-erp', label: t('الحلول البرمجية والـ ERP') }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceTab(tab.id as any)}
                  className={`px-5 py-3 sm:px-6 sm:py-3.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
                    activeServiceTab === tab.id
                      ? 'bg-dz-gold text-dz-darker shadow-[0_0_20px_rgba(200,162,82,0.3)]'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[380px]">
              <AnimatePresence mode="popLayout">
                {[
                  {
                    id: "voter-mapping",
                    title: t("الخريطة السيكومترية"),
                    description: t("فهم عميق لشخصيات الجمهور ودوافعهم الخفية باستخدام تقنيات تحليل البيانات وعلم النفس."),
                    icon: Map,
                    category: "market-polling"
                  },
                  {
                    id: "social-listening",
                    title: t("صوت دزاير (Saout Dzayer)"),
                    description: lang === 'ar' ? t("منصة استماع اجتماعي تراقب النبض العام للشارع الجزائري وتحلل المشاعر والانطباعات في الوقت الفعلي.") : "Social listening platform monitoring the Algerian public pulse in real-time.",
                    icon: Ear,
                    category: "market-polling"
                  },
                  {
                    id: "surveys-running",
                    title: t("تصميم وتنفيذ الاستبيانات"),
                    description: t("جمع البيانات الميدانية بدقة عالية، وتصميم اختبارات ودراسات استقصائية شاملة لتغذية نماذج الذكاء الاصطناعي وبناء استراتيجيات معتمدة على الواقع المجتمعي."),
                    icon: PieChart,
                    category: "market-polling"
                  },
                  {
                    id: "predictive-modeling",
                    title: t("النمذجة التنبؤية"),
                    description: t("نماذج رياضية وإحصائية لتوقع سلوكيات الجمهور وتحديد الفئات المتأرجحة بدقة رياضية عالية."),
                    icon: LineChart,
                    category: "ai-prediction"
                  },
                  {
                    id: "mirofish-swarm",
                    title: t("رسم الخرائط الإدراكية ومحاكاة التفاعل الاجتماعي (MiroFish)"),
                    description: t("نمذجة الخرائط الإدراكية لآلاف الحسابات الافتراضية ومحاكاة تفاعلاتهم، نقاشاتهم، والعدوى الاجتماعية بينهم لتوقع انتشار الأفكار وسلوك المستهلك."),
                    icon: Users,
                    category: "ai-prediction"
                  },
                  {
                    id: "message-lab",
                    title: t("مختبر اختبار الرسائل"),
                    description: t("اختبر فعالية رسائلك التواصلية والتسويقية قبل إطلاقها. نستخدم تقنيات A/B Testing لضمان أقصى تأثير."),
                    icon: FlaskConical,
                    category: "ai-prediction"
                  },
                  {
                    id: "odoo-implementation",
                    title: t("تنفيذ وتطوير أنظمة Odoo"),
                    description: t("تهيئة وإدماج أنظمة تخطيط الموارد (ERP) باستخدام Odoo لإدارة المؤسسات والمشاريع بفعالية، مع الدعم الفني المستمر واستضافة سحابية آمنة في الجزائر."),
                    icon: Database,
                    category: "software-erp"
                  },
                  {
                    id: "saas-licensing",
                    title: t("ترخيص برمجيات السحاب (SaaS)"),
                    description: t("نوفر تراخيص برمجية ذكية وسحابية لتمكينك من إطلاق وإدارة حملاتك السياسية أو الإعلانية أو التسويقية بشكل رقمي ومستقل تماماً."),
                    icon: Cloud,
                    category: "software-erp"
                  }
                ]
                .filter(service => service.category === activeServiceTab)
                .map((service) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.3 }}
                    key={service.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-dz-gold/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-dz-green/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-dz-gold/20 transition-all">
                      <service.icon className="h-7 w-7 text-dz-green group-hover:text-dz-gold" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SaaS Platform / Numerical Solutions */}
        <section id="saas-platform" className="py-24 bg-dz-dark relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-dz-green rounded-full mix-blend-screen filter blur-[150px] opacity-10" />
            <div className="absolute left-0 top-1/2 w-80 h-80 bg-dz-gold rounded-full mix-blend-screen filter blur-[150px] opacity-10" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dz-gold mb-6">
                  <Database className="h-4 w-4" />
                  <span className="text-sm font-semibold tracking-wider">{t("مركز القيادة الرقمي ومحاكاة MiroFish")}</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-center">
                  {t("مركز القيادة الرقمي لمشاريعك التواصلية الميدانية")} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-gold to-dz-gold-light">
                    {t("المدمج بالكامل مع محاكاة الرأي العام والعدوى الاجتماعية (MiroFish).")}
                  </span>
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed text-center max-w-3xl">
                  {t("نقدم أول منصة سحابية جزائرية تدمج بين القيادة الرقمية الميدانية ومحاكاة الرأي العام وسلوك المستهلك بالاعتماد على الذكاء الاصطناعي (MiroFish). تتيح لك المنصة نمذجة آلاف الحسابات والبروفايلات الافتراضية، ورسم خرائط إدراكية لشخصياتهم، ومحاكاة كيفية تفاعلهم وانتشار الأفكار والعدوى الاجتماعية بينهم لتوجيه حملاتك الميدانية بدقة متناهية.")}
                </p>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed text-center max-w-3xl">
                  {t("تُمكنك المنصة من اختبار القرارات، الإعلانات، والسياسات قبل إطلاقها ميدانياً. بنقرة واحدة، يمكنك إطلاق محاكاة تفاعلية كاملة بين الحسابات الافتراضية ومراقبة كيف تتطور النقاشات وتتحول الآراء وتتأثر الفئات المختلفة بلحظات، لتحديد الاستراتيجية الأنسب وتوجيه الميدان بكل أمان.")}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-right max-w-3xl">
                  {[
                    { icon: Layers, title: t("الخرائط الإدراكية السيكومترية"), desc: t("رسم خرائط ذهنية إدراكية مفصلة للبروفايلات الافتراضية وتحديد قيمها وتوجهاتها الأساسية.") },
                    { icon: BrainCircuit, title: t("محاكاة النقاش والعدوى الاجتماعية"), desc: t("نمذجة انتشار الأفكار، الإشاعات، والمشاعر الاجتماعية بين آلاف الوكلاء في شبكة تواصل افتراضية.") },
                    { icon: Target, title: t("التوجيه التنبؤي الاستراتيجي"), desc: t("تحديد الرسائل والزوايا الإقناعية الأكثر تأثيراً في الفئات المستهدفة بناءً على نتائج المحاكاة.") },
                    { icon: ShieldCheck, title: t("بيئة رملية سيادية وآمنة"), desc: t("اختبر سيناريوهات \"ماذا لو\" (What-if) الحساسة في بيئة سحابية جزائرية محلية آمنة ومتوافقة 100%.") }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-dz-green/20 flex items-center justify-center shrink-0 mt-1">
                        <feature.icon className="w-5 h-5 text-dz-green" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a 
                  href="#contact"
                  onClick={() => {
                    const select = document.querySelector('select[name="campaignType"]') as HTMLSelectElement;
                    if(select) { select.value = 'saas'; select.dispatchEvent(new Event('change', {bubbles: true})); }
                  }}
                  className="inline-flex px-8 py-4 rounded-full bg-dz-gold hover:bg-dz-gold-light text-dz-darker font-bold text-lg transition-all duration-300 items-center justify-center gap-2 shadow-[0_0_20px_rgba(200,162,82,0.3)] hover:shadow-[0_0_30px_rgba(200,162,82,0.5)]"
                >
                  {t("احجز عرضاً تجريبياً لمحاكاة MiroFish")}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="py-24 bg-dz-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">{t("نتائج على أرض الواقع")}</h2>
              <p className="text-gray-400 text-lg">
                {t("كيف حولنا البيانات إلى تأثير مجتمعي ونجاحات ملموسة.")}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dz-darker border border-white/10 rounded-3xl overflow-hidden flex flex-col lg:flex-row relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-dz-gold opacity-10 blur-3xl rounded-full" />
              <div className="p-10 lg:w-1/2 flex flex-col justify-center relative z-10">
                <div className="text-sm font-bold tracking-widest text-dz-gold mb-4 uppercase">{t("حالة دراسية تجارية")}</div>
                <h3 className="text-3xl font-bold mb-6">{t("توسع شركة ألياف قطنية إسبانية في السوق الجزائرية")}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t("سعت شركة إسبانية رائدة لتصدير القطن والألياف الصناعية إلى دخول السوق الجزائري وبناء شراكات تجارية مع مصانع النسيج والملابس الكبرى. واجهت الشركة صعوبة في التوجيه والوصول المباشر إلى صناع القرار الحقيقيين في قطاع مشتت جغرافياً وإدارياً.")}
                </p>
                <div className="space-y-6">
                  <div>
                    <div className="font-bold text-white mb-2">{t("التدخل:")}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{t("قمنا باستخدام قواعد البيانات المدمجة وخرائط السمت الذكي في منصة دزاير أناليتيكا لرسم خريطة شاملة لمصانع وموزعي النسيج الكبرى بالجزائر. صممنا قوائم استهداف دقيقة (B2B Qualified Leads) تحتوي على بيانات التواصل المباشرة والقدرات الشرائية المتوقعة، لتمكين الفريق الإسباني من استهداف العملاء الأكثر ملاءمة.")}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-3xl font-bold text-dz-green mb-1">5%</div>
                      <div className="text-xs text-gray-500">{t("معدل نجاح الاتصالات الباردة قبل التوجيه")}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-dz-gold mb-1">42%</div>
                      <div className="text-xs text-gray-500">{t("معدل الاستجابة والاتفاقات بعد التوجيه المعتمد على البيانات")}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 min-h-[400px] bg-gradient-to-br from-dz-green-dark to-dz-dark relative overflow-hidden flex items-center justify-center p-8">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                 <BarChart3 className="w-48 h-48 text-dz-gold/20 absolute" />
                 
                 {/* Decorative Data Visualization */}
                 <div className="relative z-10 w-full max-w-sm">
                    <div className="flex items-end gap-4 h-64 border-b border-white/20 pb-4">
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '30%' }} viewport={{ once:true }} className="flex-1 bg-white/10 rounded-t-md relative group"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">5%</span></motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '45%' }} viewport={{ once:true }} transition={{ delay: 0.1 }} className="flex-1 bg-dz-green/50 rounded-t-md relative group"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">18%</span></motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '85%' }} viewport={{ once:true }} transition={{ delay: 0.2 }} className="flex-1 bg-dz-gold/80 rounded-t-md relative group shadow-[0_0_15px_rgba(200,162,82,0.5)]"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold">42%</span></motion.div>
                    </div>
                    <div className="flex gap-4 mt-4 text-center text-xs text-gray-400">
                      <div className="flex-1">{t("بدء مساعي التوسع")}</div>
                      <div className="flex-1">{t("دمج قوائم الاستهداف الموجهة")}</div>
                      <div className="flex-1 text-dz-gold font-bold">{t("تحقيق صفقات وشراكات توريد فعالة")}</div>
                    </div>
                  </div>
              </div>
            </motion.div>
          </div>
        </section>

        <StatsHub />

        {/* Blog / Insights Section */}
        <section id="blog" className="py-24 bg-dz-dark relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute left-1/3 top-0 w-96 h-96 bg-dz-gold/5 rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">{t("تحليلات دزاير (DZ Insights)")}</h2>
              <p className="text-gray-400 text-lg">
                {t("تحليلات ودراسات أسبوعية معمقة حول السوق والتوجهات الاقتصادية والتكنولوجية بالجزائر.")}
              </p>
            </div>

            {/* Category tabs and Search bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-white/5 p-4 rounded-2xl border border-white/10">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {['all', 'wc', 'dz', 'erp'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setVisibleArticlesCount(6); // Reset pagination
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border ${
                      selectedCategory === cat
                        ? 'bg-dz-gold text-dz-darker border-dz-gold shadow-[0_0_15px_rgba(200,162,82,0.3)]'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10 font-sans'
                    }`}
                  >
                    {categoryTranslations[cat]?.[lang] || cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80 font-sans">
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'البحث في التحليلات والتقارير...' : lang === 'fr' ? 'Rechercher des analyses...' : 'Search insights and reports...'}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleArticlesCount(6); // Reset pagination
                  }}
                  className="w-full bg-dz-darker border border-white/10 rounded-xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:border-dz-gold transition-colors text-white placeholder-gray-500 text-right"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 font-sans">
                <p className="text-gray-400 text-sm">{lang === 'ar' ? 'لم يتم العثور على أي تحليلات تطابق بحثك.' : 'No insights found matching your search.'}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.slice(0, visibleArticlesCount).map((article, index) => {
                  const title = article.title[lang] || article.title['ar'];
                  const excerpt = article.excerpt[lang] || article.excerpt['ar'];
                  const cat = getCategoryOfArticle(article, lang);
                  return (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 3) * 0.1 }}
                      className="bg-dz-darker border border-white/10 rounded-2xl p-6 hover:border-dz-gold/50 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4 text-[10px] font-bold text-dz-gold uppercase tracking-wider font-sans">
                          <span>{categoryTranslations[cat]?.[lang] || 'Insights'}</span>
                          <span className="text-gray-500 font-mono font-normal">{formatDate(article.date, lang)}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-dz-gold transition-colors line-clamp-2 leading-snug">
                          {title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                          {excerpt}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedArticle(article);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-dz-green hover:text-dz-green-light font-bold text-sm flex items-center gap-2 transition-colors self-start cursor-pointer mt-auto font-sans"
                      >
                        {t("اقرأ التحليل الكامل")} &rarr;
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Load More Button */}
            {filteredArticles.length > visibleArticlesCount && (
              <div className="flex justify-center mt-12 font-sans">
                <button
                  onClick={() => setVisibleArticlesCount(prev => prev + 6)}
                  className="px-8 py-3 rounded-full bg-transparent border-2 border-white/20 hover:border-dz-gold hover:text-dz-gold text-white font-bold text-sm transition-all duration-300 cursor-pointer"
                >
                  {lang === 'ar' ? 'عرض المزيد من التحليلات' : lang === 'fr' ? 'Afficher plus d\'analyses' : 'Load More Insights'}
                </button>
              </div>
            )}

          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 bg-dz-darker border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">{t("نتعاون مع مؤسسات رائدة وموثوقة")}</h3>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 transition-all duration-500">
              <div className="flex flex-col items-center gap-3 group">
                <img src="/ons-logo.webp" alt={t("شعار ONS")} title={t("شعار ONS")} className="h-20 md:h-24 object-contain mx-auto invert opacity-70 group-hover:opacity-100 transition-all cursor-pointer" />
                <span className="text-xs text-gray-400 font-bold">{t("الديوان الوطني للإحصائيات (ONS)")}</span>
              </div>
              
              <div className="flex flex-col items-center gap-3 group">
                <img src="/cread-logo.webp" alt={t("شعار CREAD")} title={t("شعار CREAD")} className="h-[88px] md:h-28 object-contain mx-auto opacity-70 group-hover:opacity-100 transition-all cursor-pointer grayscale group-hover:grayscale-0 bg-white/10 rounded-xl p-2" />
                <span className="text-xs text-gray-400 font-bold">{t("مركز البحث في الاقتصاد المطبق (CREAD)")}</span>
              </div>

              <div className="flex flex-col items-center gap-3 group">
                <img src="/anie-logo.webp" alt={t("شعار ANIE")} title={t("شعار ANIE")} className="h-20 md:h-24 object-contain mx-auto opacity-70 group-hover:opacity-100 transition-all cursor-pointer" />
                <span className="text-xs text-gray-400 font-bold">{t("السلطة الوطنية المستقلة للانتخابات (ANIE)")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-dz-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-bold mb-6">{t("ابدأ حملتك المبنية على البيانات اليوم.")}</h2>
                <p className="text-gray-400 text-lg mb-12">
                  {t("هل تقود مبادرة مجتمعية أو مشروع تواصلي أو ترغب بدخول السوق الجزائري؟ تواصل معنا لتحديد موعد استشارة سرية ومناقشة كيف يمكن للبيانات أن تغير مسار مشروعك.")}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                      <Map className="w-5 h-5 text-dz-gold" />
                    </div>
                    <div>
                      <div className="font-bold mb-1">{t("المقر الرئيسي")}</div>
                      <div className="text-gray-400">{t("بئر خادم، الجزائر العاصمة، 16330")}<br/>{t("الجمهورية الجزائرية الديمقراطية الشعبية")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                      <Ear className="w-5 h-5 text-dz-gold" />
                    </div>
                    <div>
                      <div className="font-bold mb-1">{t("استفسارات أكاديمية وإعلامية")}</div>
                      <div className="text-gray-400" dir="ltr"><a href="mailto:dzair.analytica@gmail.com">dzair.analytica@gmail.com</a></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dz-darker p-8 rounded-3xl border border-white/10 shadow-2xl relative">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 z-20 bg-dz-darker rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-dz-green mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{t("تم الإرسال بنجاح")}</h3>
                    <p className="text-gray-400 text-lg">{t("سنتواصل معك قريباً.")}</p>
                  </motion.div>
                ) : null}
                
                <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6" id="contactForm" onSubmit={(e) => {
                  setIsSubmitted(true);
                  const form = e.currentTarget;
                  setTimeout(() => {
                    setIsSubmitted(false);
                    form.reset();
                  }, 5000);
                }}>
                  {/* Web3Forms Key */}
                  <input type="hidden" name="access_key" value="725a478f-56ab-4808-856a-a00df97c5738" />
                  <input type="hidden" name="subject" value="DZ Analytica - New request" />
                  <input type="hidden" name="redirect" value="https://web3forms.com/success" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-sm text-gray-400">{t("الاسم الكامل")}</label>
                       <input name="fullName" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors" placeholder="" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm text-gray-400">{t("رقم الهاتف / الواتساب")}</label>
                       <input name="phone" required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors text-left" placeholder="+213..." dir="ltr" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-sm text-gray-400">{t("الانتماء أو المؤسسة (اختياري)")}</label>
                     <input name="party" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">{t("نوع المشروع")}</label>
                      <select name="campaignType" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors appearance-none outline-none">
                        <option value="" className="bg-dz-darker">{t("اختر نوع المشروع...")}</option>
                        <option value="research" className="bg-dz-darker">{t("دراسة رأي عام")}</option>
                        <option value="communication" className="bg-dz-darker">{t("حملة تواصلية ومناصرة")}</option>
                        <option value="market" className="bg-dz-darker">{t("أبحاث سوق وسلوك مستهلك")}</option>
                        <option value="saas" className="bg-dz-darker text-dz-gold font-bold">{t("عرض تجريبي للمنصة السحابية (SaaS Demo)")}</option>
                        <option value="odoo" className="bg-dz-darker text-dz-green font-bold">{t("تنفيذ وتطوير أنظمة Odoo")}</option>
                        <option value="surveys" className="bg-dz-darker">{t("تصميم وتنفيذ الاستبيانات")}</option>
                        <option value="other_comm" className="bg-dz-darker">{t("أخرى")}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">{t("النطاق الجغرافي (الولاية/البلدية)")}</label>
                      <input name="location" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                      <label className="text-sm text-gray-400">{t("نطاق الميزانية التقديرية (دينار جزائري)")}</label>
                      <select name="budget" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors appearance-none" dir="rtl">
                        <option value="" className="bg-dz-darker">{t("اختر الميزانية...")}</option>
                        <option value="150k-500k" className="bg-dz-darker">{t("150,000 - 500,000 دج")}</option>
                        <option value="500k-1m" className="bg-dz-darker">{t("500,000 - 1,000,000 دج")}</option>
                        <option value="1m+" className="bg-dz-darker">{t("+ 1,000,000 دج")}</option>
                      </select>
                  </div>
                  
                  <button type="submit" className="w-full bg-dz-gold hover:bg-dz-gold-light text-dz-darker font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4">
                    <span>{t("طلب استشارة سرية")}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-xs text-center text-gray-500 mt-6">{t("يخضع هذا النموذج لسرية العميل والخصوصية التامة.")}</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-gray-500" />
                <span className="font-bold text-xl tracking-tight text-gray-500">
                  <span>{t("دزاير أناليتيكا")}</span>
                </span>
              </div>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/dz-analytica/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all transform hover:scale-110" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/share/1BDxWWJLZq/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all transform hover:scale-110" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all transform hover:scale-110" aria-label="X (Twitter)">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <button onClick={() => setIsEthicsOpen(true)} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">{t("ميثاق الأخلاقيات")}</button>
              <a href="https://www.arpce.dz/ar/pub/c7e6n6" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t("سياسة الخصوصية (قانون 18-07)")}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert(t("شروط الخدمة") + " - " + t("المنصة قيد التطوير التجريبي ولا تتحمل أي مسؤولية قانونية في هذه المرحلة.")); }} className="hover:text-white transition-colors">{t("شروط الخدمة")}</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <span dir="ltr">© {new Date().getFullYear()} DZ Analytica.</span> 
            <span>{t("البيانات قوة، فاستخدمها بحكمة.")}</span>
          </div>
        </div>
      </footer>

      {/* Quiz Modal */}
      <DZCompassQuiz isOpen={isQuizOpen} onClose={() => {
        setIsQuizOpen(false);
        if (window.location.pathname !== '/') window.history.pushState({}, '', '/');
      }} />

      {/* Pitch Deck Modal */}
      <PitchDeck isOpen={isPitchDeckOpen} onClose={() => {
        setIsPitchDeckOpen(false);
        if (window.location.pathname !== '/') window.history.pushState({}, '', '/');
      }} />

      {/* Ethics Modal */}
      <EthicsModal isOpen={isEthicsOpen} onClose={() => setIsEthicsOpen(false)} />

      {/* Full-Page Article Takeover Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dz-darker overflow-y-auto w-full h-full flex flex-col font-sans"
          >
            {/* Takeover Header */}
            <header className="sticky top-0 z-40 bg-dz-darker/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-dz-gold" />
                <span className="font-bold text-lg tracking-tight">
                  <span className="text-white">{t("دزاير")} </span>
                  <span className="text-dz-gold">{t("أناليتيكا")}</span>
                </span>
              </div>
              
              <div className="text-xs text-gray-500 font-mono hidden md:block">
                {lang === 'ar' ? 'تقرير دزاير أناليتيكا التنبؤي B2B' : 'DZ Analytica B2B Market & Sports Report'}
              </div>

              <div className="flex items-center gap-3">
                {/* Language Switcher inside reader */}
                <div className="relative group mr-2">
                  <button className="flex items-center text-gray-300 hover:text-white font-medium text-xs uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                    <Languages className="w-3.5 h-3.5 ml-1" />
                    {lang}
                  </button>
                  <div className="absolute right-0 mt-2 w-24 bg-dz-darker border border-white/10 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
                    {['ar', 'en', 'fr'].map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l as Language)}
                        className={`block w-full text-left px-4 py-2 text-xs uppercase hover:bg-white/5 ${lang === l ? 'text-dz-gold' : 'text-gray-300'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer bg-white/5 border border-white/10 hover:border-dz-gold/50 px-4 py-2 rounded-full font-bold text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>{lang === 'ar' ? 'العودة' : lang === 'fr' ? 'Retour' : 'Back'}</span>
                </button>
              </div>
            </header>

            {/* Immersive Article Content Container */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              
              {/* HERO SECTION */}
              <section className="relative mb-12 pb-8 border-b border-white/10">
                {/* Background Large Text Watermark */}
                <div className="absolute right-0 top-0 text-[160px] font-black text-white/5 select-none pointer-events-none font-sans leading-none z-0 hidden lg:block uppercase tracking-wider">
                  {selectedArticle.keywords[lang]?.split(',')[0]?.trim() || 'DZ-ANALYTICA'}
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-dz-gold uppercase tracking-wider">
                    <span className="px-2.5 py-0.5 rounded bg-dz-gold/10 border border-dz-gold/20">
                      {categoryTranslations[getCategoryOfArticle(selectedArticle, lang)]?.[lang] || 'Insights'}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 font-mono">{formatDate(selectedArticle.date, lang)}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{lang === 'ar' ? 'قراءة 5 دقائق' : lang === 'fr' ? 'Lecture 5 min' : '5 min read'}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-sans">
                    {selectedArticle.title[lang] || selectedArticle.title['ar']}
                  </h1>

                  <p className="text-gray-400 text-lg sm:text-xl font-light max-w-4xl leading-relaxed">
                    {selectedArticle.excerpt[lang] || selectedArticle.excerpt['ar']}
                  </p>
                </div>

                {/* GAUGE CARDS ROW */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 relative z-10">
                  {getGaugesForArticle(selectedArticle.slug, lang).map((gauge, idx) => (
                    <div key={idx} className="bg-dz-darker border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-2">{gauge.label}</div>
                        <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                          gauge.color === 'green' ? 'text-dz-green-light' : gauge.color === 'gold' ? 'text-dz-gold' : 'text-white'
                        }`}>{gauge.value}</div>
                      </div>
                      <div className="mt-3">
                        <div className="text-[10px] text-gray-400 leading-normal mb-2">{gauge.desc}</div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${
                            gauge.color === 'green' ? 'bg-dz-green' : gauge.color === 'gold' ? 'bg-dz-gold' : 'bg-gray-500'
                          }`} style={{ width: `${gauge.pct}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CONTENT GRID: main body & sidebar */}
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                
                {/* Main Content (2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                  <article 
                    className="article-body font-sans text-gray-300 leading-relaxed text-[15px] prose prose-invert max-w-none"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    dangerouslySetInnerHTML={{ 
                      __html: selectedArticle.content[lang] || selectedArticle.content['ar'] 
                    }}
                  />
                </div>

                {/* Sidebar Column (1 column) */}
                <div className="space-y-6">
                  {/* B2B Strategic Takeaways Card */}
                  <div className="bg-dz-darker border border-white/10 rounded-2xl p-6">
                    <h3 className="text-md font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-dz-gold" />
                      <span>{lang === 'ar' ? 'أهم التوصيات الاستراتيجية B2B' : lang === 'fr' ? 'Recommandations Stratégiques B2B' : 'B2B Strategic Takeaways'}</span>
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
                      {getSidebarInsights(selectedArticle.slug, lang).takeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex gap-2 items-start leading-relaxed text-right">
                          <span className="w-1.5 h-1.5 rounded-full bg-dz-gold mt-1.5 shrink-0" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Model Projections Card */}
                  <div className="bg-dz-darker border border-white/10 rounded-2xl p-6">
                    <h3 className="text-md font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-dz-green" />
                      <span>{lang === 'ar' ? 'مؤشرات النمذجة التنبؤية' : lang === 'fr' ? 'Indicateurs de Modélisation' : 'Model Projections'}</span>
                    </h3>
                    
                    <div className="space-y-4 text-right">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{lang === 'ar' ? 'مستوى الثقة الإحصائية' : 'Model Confidence Index'}</div>
                        <div className="text-sm font-bold text-white">{getSidebarInsights(selectedArticle.slug, lang).confidence}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{lang === 'ar' ? 'تصنيف Elo الفعلي للمرشح' : 'Candidate Elo Rating'}</div>
                        <div className="text-sm font-bold text-white">{getSidebarInsights(selectedArticle.slug, lang).elo}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{lang === 'ar' ? 'إشراف وتحليل البيانات' : 'Data Integrity & Supervision'}</div>
                        <div className="text-sm font-bold text-white">DZ Analytica Sports Lab</div>
                      </div>
                    </div>
                  </div>

                  {/* Tag Cloud Card */}
                  <div className="bg-dz-darker border border-white/10 rounded-2xl p-6">
                    <h3 className="text-md font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-gray-400" />
                      <span>{lang === 'ar' ? 'الوسوم والكلمات الدليليلة' : 'Taxonomy Tags'}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(selectedArticle.keywords[lang] || selectedArticle.keywords['en'])?.split(',').map((kw: string, idx: number) => (
                        <span key={idx} className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1.5 rounded-lg hover:border-dz-gold hover:text-white transition-colors">
                          #{kw.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* RELATED COVERAGE CARD GRID */}
              <section className="mt-16 pt-12 border-t border-white/10">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-dz-gold" />
                  <span>{lang === 'ar' ? 'تغطية ذات صلة بالحدث' : lang === 'fr' ? 'Couverture Connexe' : 'Related Coverage'}</span>
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {articles
                    .filter(a => a.slug !== selectedArticle.slug)
                    .slice(0, 3)
                    .map((article, idx) => {
                      const title = article.title[lang] || article.title['ar'];
                      const excerpt = article.excerpt[lang] || article.excerpt['ar'];
                      const catCategory = getCategoryOfArticle(article, lang);
                      return (
                        <div
                          key={article.slug}
                          onClick={() => {
                            setSelectedArticle(article);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-dz-darker border border-white/10 rounded-2xl p-6 hover:border-dz-gold/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-[10px] text-dz-gold font-bold uppercase tracking-wider mb-2">
                              {categoryTranslations[catCategory]?.[lang] || 'Insights'}
                            </div>
                            <h3 className="text-md font-bold text-white group-hover:text-dz-gold transition-colors line-clamp-2 leading-snug mb-3">
                              {title}
                            </h3>
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4">
                              {excerpt}
                            </p>
                          </div>
                          <div className="text-dz-green group-hover:text-white transition-colors text-xs font-bold flex items-center gap-1 mt-auto">
                            <span>{lang === 'ar' ? 'اقرأ المزيد' : 'Read more'}</span>
                            <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

