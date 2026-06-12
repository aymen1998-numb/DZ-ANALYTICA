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
  { name: 'التحليلات', href: 'https://news.dzanalytica.com' },
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

export default function App() {
  const { t, lang, setLang } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);
  const [isEthicsOpen, setIsEthicsOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState<'market-polling' | 'ai-prediction' | 'software-erp'>('market-polling');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

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
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dz-gold mb-6">
                  <Database className="h-4 w-4" />
                  <span className="text-sm font-semibold tracking-wider">{t("مركز القيادة الرقمي ومحاكاة MiroFish")}</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {t("مركز القيادة الرقمي لمشاريعك التواصلية الميدانية")} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-gold to-dz-gold-light">
                    {t("المدمج بالكامل مع محاكاة الرأي العام والعدوى الاجتماعية (MiroFish).")}
                  </span>
                </h2>
                <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                  {t("نقدم أول منصة سحابية جزائرية تدمج بين القيادة الرقمية الميدانية ومحاكاة الرأي العام وسلوك المستهلك بالاعتماد على الذكاء الاصطناعي (MiroFish). تتيح لك المنصة نمذجة آلاف الحسابات والبروفايلات الافتراضية، ورسم خرائط إدراكية لشخصياتهم، ومحاكاة كيفية تفاعلهم وانتشار الأفكار والعدوى الاجتماعية بينهم لتوجيه حملاتك الميدانية بدقة متناهية.")}
                </p>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {t("تُمكنك المنصة من اختبار القرارات، الإعلانات، والسياسات قبل إطلاقها ميدانياً. بنقرة واحدة، يمكنك إطلاق محاكاة تفاعلية كاملة بين الحسابات الافتراضية ومراقبة كيف تتطور النقاشات وتتحول الآراء وتتأثر الفئات المختلفة بلحظات، لتحديد الاستراتيجية الأنسب وتوجيه الميدان بكل أمان.")}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[
                    { icon: Layers, title: t("الخرائط الإدراكية السيكومترية"), desc: t("رسم خرائط ذهنية إدراكية مفصلة للبروفايلات الافتراضية وتحديد قيمها وتوجهاتها الأساسية.") },
                    { icon: BrainCircuit, title: t("محاكاة النقاش والعدوى الاجتماعية"), desc: t("نمذجة انتشار الأفكار، الإشاعات، والمشاعر الاجتماعية بين آلاف الوكلاء في شبكة تواصل افتراضية.") },
                    { icon: Target, title: t("التوجيه التنبؤي الاستراتيجي"), desc: t("تحديد الرسائل والزوايا الإقناعية الأكثر تأثيراً في الفئات المستهدفة بناءً على نتائج المحاكاة.") },
                    { icon: ShieldCheck, title: t("بيئة رملية سيادية وآمنة"), desc: t("اختبر سيناريوهات \"ماذا لو\" (What-if) الحساسة في بيئة سحابية جزائرية محلية آمنة ومتوافقة 100%.") }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4">
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
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Mock SaaS Dashboard UI */}
                <div className="bg-dz-darker rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
                      <Cloud className="w-3 h-3" />
                      MiroFish / Swarm Control
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-lg font-bold">{t("لوحة محاكاة الرأي العام (MiroFish)")}</h3>
                        <p className="text-sm text-gray-500">{t("السيناريو: ردود الفعل على إطلاق منتج وطني جديد")}</p>
                      </div>
                      <div className="bg-dz-green/20 text-dz-green px-3 py-1 rounded-full text-xs font-bold border border-dz-green/30 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-dz-green animate-pulse" />
                        {t("محاكاة نشطة")}
                      </div>
                    </div>

                    {/* Query UI */}
                    <div className="space-y-3 mb-8">
                       <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="bg-black/30 px-2 py-1 rounded text-white font-mono">{t("الناشط المتمرد")}</span>
                       </div>
                       <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="text-gray-500 font-bold">{t("استبعاد")}</span>
                         <span className="text-gray-300">{t("درجة التردد العالية في اتخاذ القرار")}</span>
                         <span className="bg-black/30 px-2 py-1 rounded text-red-400 font-mono">&gt; 70%</span>
                       </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-gray-500 text-xs mb-1">{t("المطابقة الكلية")}</div>
                        <div className="text-xl font-bold text-white">12,450</div>
                        <div className="text-[10px] text-gray-500 mt-1">{t("شخص يطابق المعايير")}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center border border-dz-gold/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-dz-gold/5" />
                        <div className="text-dz-gold text-xs mb-1 relative z-10">{t("فرصة التفاعل")}</div>
                        <div className="text-xl font-bold text-white relative z-10">68%</div>
                        <div className="text-[10px] text-gray-400 mt-1 relative z-10">High Propensity</div>
                      </div>
                      <div className="bg-dz-green hover:bg-dz-green-light cursor-pointer transition-colors rounded-xl p-4 text-center flex flex-col items-center justify-center group">
                        <Share2 className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{t("إرسال للميدان")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Element */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="relative mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-dz-darker p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-4 z-20"
                >
                  <div className="w-12 h-12 bg-dz-green/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-dz-green" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t("تم تخصيص القائمة")}</div>
                    <div className="text-xs text-gray-400">{t("لـ فريق العمل الميداني (حسين داي)")}</div>
                  </div>
                </motion.div>
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
        <section id="blog" className="py-20 bg-dz-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4">{t("تحليلات دزاير (DZ Insights)")}</h2>
              <p className="text-gray-400 text-lg">
                {t("تحليلات ودراسات أسبوعية معمقة حول السوق والتوجهات الاقتصادية والتكنولوجية بالجزائر.")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(0, 3).map((article, index) => {
                const title = article.title[lang] || article.title['ar'];
                const excerpt = article.excerpt[lang] || article.excerpt['ar'];
                return (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dz-darker border border-white/10 rounded-2xl p-6 hover:border-dz-gold/50 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs text-dz-gold mb-3 font-mono">
                        {formatDate(article.date, lang)}
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-dz-gold transition-colors line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {excerpt}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-dz-green hover:text-dz-green-light font-bold text-sm flex items-center gap-2 transition-colors self-start cursor-pointer mt-auto"
                    >
                      {t("اقرأ التحليل الكامل")} &rarr;
                    </button>
                  </motion.div>
                );
              })}
            </div>
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

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-dz-darker w-full max-w-4xl max-h-[85vh] rounded-3xl border border-white/10 overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/40">
                <div className="text-xs font-mono text-dz-gold">
                  {formatDate(selectedArticle.date, lang)}
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/5"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {selectedArticle.title[lang] || selectedArticle.title['ar']}
                </h1>
                
                {selectedArticle.keywords[lang] && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedArticle.keywords[lang].split(',').map((kw: string, i: number) => (
                      <span key={i} className="bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/5">
                        #{kw.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div 
                  className="text-gray-300 space-y-4 leading-relaxed text-lg whitespace-pre-line prose prose-invert max-w-none pt-4 border-t border-white/5"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                >
                  {(selectedArticle.content[lang] || selectedArticle.content['ar'])
                    .split('\n')
                    .map((paragraph: string, i: number) => {
                      const trimmed = paragraph.trim();
                      if (!trimmed) return null;
                      
                      const isHeader = trimmed.startsWith('###') || /<h[1-6]>/.test(trimmed);
                      if (isHeader) {
                        const cleanText = trimmed
                          .replace(/^###/g, '')
                          .replace(/<\/?[a-z0-9]+[^>]*>/gi, '')
                          .trim();
                        return (
                          <h3 key={i} className="text-xl font-bold text-dz-gold mt-6 mb-3">
                            {cleanText}
                          </h3>
                        );
                      }
                      
                      const cleanPara = trimmed.replace(/<\/?[a-z0-9]+[^>]*>/gi, '').trim();
                      return cleanPara ? (
                        <p key={i} className="text-gray-300">
                          {cleanPara}
                        </p>
                      ) : null;
                    })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

