import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Menu, X, Map, FlaskConical, Ear, PenTool, BarChart3, GraduationCap, 
  ChevronDown, ArrowLeft, Send, ShieldCheck, Users, BrainCircuit, Brain, Globe, CheckCircle2, ChevronLeft, LineChart, Database, Target, Layers, Cloud, Share2, Linkedin, Facebook, Twitter, Presentation, PieChart
} from 'lucide-react';
import { DZCompassQuiz } from './components/DZCompassQuiz';
import { PitchDeck } from './components/PitchDeck';

const navLinks = [
  { name: 'الرئيسية', href: '#home' },
  { name: 'من نحن', href: '#about' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'دراسات حالة', href: '#case-studies' },
  { name: 'اتصل بنا', href: '#contact' },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-dz-darker text-white font-sans overflow-x-hidden selection:bg-dz-gold selection:text-dz-darker" dir="rtl">
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>DZ Analytica | دزاير أناليتيكا - استراتيجيات انتخابية بالذكاء الاصطناعي</title>
        <meta name="description" content="دزاير أناليتيكا هي أول منصة جزائرية للنمذجة التنبؤية وتحليل البيانات، متخصصة في الحملات السياسية، صناعة القرار، وإدارة الحملات الانتخابية بالذكاء الاصطناعي." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DZ Analytica",
              "alternateName": "دزاير أناليتيكا",
              "url": "https://dz-analytica.vercel.app",
              "logo": "https://dz-analytica.vercel.app/brand-assets.html",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+213-XX-XX-XX-XX",
                "contactType": "customer service",
                "areaServed": "DZ",
                "availableLanguage": "Arabic"
              },
              "sameAs": [
                "https://www.linkedin.com/company/dz-analytica"
              ]
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Political Consulting & Data Analytics",
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
                "name": "Election Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "النمذجة التنبؤية",
                      "description": "نماذج رياضية لتوقع سلوك الناخبين"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "إدارة البيانات السحابية (SaaS)",
                      "description": "منصة سحابية لإدارة البيانات السياسية والحملات الميدانية"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "هندسة الرسائل والتواصل",
                      "description": "صياغة خطابات سياسية دقيقة وموجهة استناداً إلى تحليل المشاعر"
                    }
                  }
                ]
              }
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
                <span className="text-white">دزاير </span>
                <span className="text-dz-gold">أناليتيكا</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = link.href.replace('#', '');
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-300 hover:text-dz-gold transition-colors font-medium text-sm lg:text-base mr-8"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={(e) => { e.preventDefault(); setIsQuizOpen(true); }}
                className="bg-dz-green hover:bg-dz-green-light text-white px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(0,98,51,0.5)] hover:shadow-[0_0_25px_rgba(0,180,90,0.6)] !mr-8 cursor-pointer"
              >
                الخريطة السياسية
              </button>
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
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
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
                    {link.name}
                  </a>
                ))}
                <button
                  onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setIsQuizOpen(true); }}
                  className="mt-4 text-center bg-transparent border-2 border-dz-green text-dz-green px-4 py-3 rounded-md font-bold w-full cursor-pointer"
                >
                  الخريطة السياسية
                </button>
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
                الناخبون ليسوا مجرد حشد.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-gold to-dz-gold-light">
                  إنهم 24 مليون شخصية مختلفة.
                </span><br />
                ونحن نعرفهم.
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                دزاير أناليتيكا: أول وكالة استشارات سياسية سايكومترية في الجزائر. 
                نحول البيانات إلى استراتيجيات انتخابية رابحة باستخدام الذكاء الاصطناعي وعلم النفس.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#services"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-dz-green hover:bg-dz-green-light text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  استكشف خدماتنا
                  <ChevronLeft className="h-5 w-5" />
                </a>
                <button 
                  onClick={() => setIsQuizOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-white/20 hover:border-dz-gold hover:text-dz-gold text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Brain className="h-5 w-5 text-dz-gold group-hover:animate-pulse" />
                  اكتشف شخصيتك السياسية
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
                { label: 'ناخب محلل', value: '+50,000' },
                { label: 'حملة انتخابية تجريبية', value: '8' },
                { label: 'نمط شخصية', value: '8' },
                { label: 'دقة التوقع', value: '94%' }
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dz-gold mb-6">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-sm font-semibold tracking-wider">ميثاق الأخلاقيات</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">علم النفس يلتقي بالسياسة، <br/>بنزاهة تامة.</h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  بدأت دزاير أناليتيكا كمشروع مختص في الأبحاث السايكومترية. فريقنا، بقيادة د. أمينة منصوري وياسين ولد علي، يجمع بين خبرات معمقة في علم النفس السياسي، علوم البيانات، واستراتيجيات الحملات الانتخابية.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'لا نستخدم بيانات مسروقة أو غير مصرح بها.',
                    'موافقة صريحة وكاملة لجمع البيانات.',
                    'معالجة البيانات محلياً وفقاً لقانون حماية البيانات 18-07.',
                    'لا نتعامل مع حملات التضليل أو نشر الكراهية.'
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
                    alt="فريق الخبراء" 
                    className="w-full h-full object-cover filter grayscale"
                  />
                  <div className="absolute bottom-8 right-8 left-8 z-20 bg-dz-darker/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-xl mb-2">قيادة أكاديمية وعملية</h3>
                    <p className="text-gray-400 text-sm">نحن نترجم الأبحاث الأكاديمية المعقدة إلى استراتيجيات سياسية قابلة للتنفيذ على أرض الواقع الجزائري.</p>
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
              <h2 className="text-4xl font-bold mb-6">حلولنا الانتخابية</h2>
              <p className="text-gray-400 text-lg">
                باقات خدمات متكاملة مصممة خصيصاً لتلبية احتياجات المرشحين والأحزاب السياسية في الجزائر، من البلديات إلى الرئاسيات.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                  {
                    id: "predictive-modeling",
                    title: "النمذجة التنبؤية",
                    description: "نماذج رياضية وإحصائية لتوقع سلوك الناخبين وتحديد الفئات المترددة بدقة رياضية عالية.",
                    icon: LineChart,
                  },
                  {
                    id: "voter-mapping",
                    title: "الخريطة السيكومترية",
                    description: "فهم عميق لشخصيات الناخبين ودوافعهم الخفية باستخدام تقنيات تحليل البيانات وعلم النفس.",
                    icon: Map,
                  },
                  {
                    id: "message-lab",
                    title: "مختبر اختبار الرسائل",
                    description: "اختبر فعالية رسائلك السياسية قبل إطلاقها. نستخدم تقنيات A/B Testing لضمان أقصى تأثير.",
                    icon: FlaskConical,
                  },
                  {
                    id: "social-listening",
                    title: "صوت دزاير (Saout Dzayer)",
                    description: "منصة استماع اجتماعي تراقب النبض العام للشارع الجزائري وتحلل المشاعر والانطباعات في الوقت الفعلي.",
                    icon: Ear,
                  },
                  {
                    id: "narrative-design",
                    title: "تصميم السردية",
                    description: "صياغة قصة حملتك الانتخابية بطريقة تتوافق مع التوجهات النفسية والقيمية لشريحتك المستهدفة.",
                    icon: PenTool,
                  },
                  {
                    id: "implicit-polling",
                    title: "استطلاعات ضمنية 2.0",
                    description: "قياس الانحيازات الضمنية وردود الفعل العفوية تجاه القضايا الساخنة خارج نطاق الاستطلاعات التقليدية.",
                    icon: BarChart3,
                  },
                  {
                    id: "campaign-academy",
                    title: "أكاديمية الحملات",
                    description: "تدريب مكثف لفرق الحملات والمرشحين على استراتيجيات التواصل المبنية على البيانات وإدارة الأزمات.",
                    icon: GraduationCap,
                  },
                ].map((service, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
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
                  <span className="text-sm font-semibold tracking-wider">برمجيات كخدمة (SaaS)</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  مركز القيادة الرقمي <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-gold to-dz-gold-light">
                    لحملتك الانتخابية.
                  </span>
                </h2>
                <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                  على غرار المنصات العالمية (مثل Civis Analytics)، نقدم أول منصة سحابية جزائرية لإدارة البيانات السياسية. منصتنا تجمع قواعد بياناتك المشتتة، تنقلها عبر خوارزميات الذكاء الاصطناعي، وتحولها إلى قوائم استهداف دقيقة لفريقك الميداني.
                </p>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  تُمكنك المنصة من الاستغناء تماماً عن الإدارة التقليدية والجداول المعقدة؛ فبنقرة واحدة، يمكنك بناء قوائم للناخبين المحتملين، توجيه مناصريك إلى الأحياء المترددة، ومراقبة أداء حملتك الميدانية لحظة بلحظة ضمن بيئة سحابية مؤمنة.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[
                    { icon: Layers, title: 'توحيد البيانات (Identity Resolution)', desc: 'دمج القوائم الانتخابية المحلية، بيانات المتعاطفين، والتفاعلات في قاعدة موحدة.' },
                    { icon: LineChart, title: 'النمذجة التنبؤية (Predictive Modeling)', desc: 'توقع نسب المشاركة، الانتماء الحزبي، والمترددين على مستوى مكاتب الاقتراع.' },
                    { icon: Target, title: 'التوجيه الميداني (Activation)', desc: 'إنشاء خرائط تحرك وتوجيه للمناضلين لاستهداف الأحياء الأكثر أهمية.' },
                    { icon: ShieldCheck, title: 'استضافة سيادية محليّة', desc: 'بنية أمنية متوافقة تماماً مع قانون 18-07 لحماية البيانات الشخصية.' }
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
                  احجز عرضاً تجريبياً للمنصة (Demo)
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
                      DZ-Cloud / Workspace
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-lg font-bold">بناء جمهور مستهدف (Audience Builder)</h3>
                        <p className="text-sm text-gray-500">بلدية: حسين داي | الفئة: متأرجحين شباب</p>
                      </div>
                      <div className="bg-dz-green/20 text-dz-green px-3 py-1 rounded-full text-xs font-bold border border-dz-green/30 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-dz-green" />
                        جاهز للتصدير
                      </div>
                    </div>

                    {/* Query UI */}
                    <div className="space-y-3 mb-8">
                       <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="text-dz-gold font-bold">تطابق</span>
                         <span className="text-gray-300">العمر بين</span>
                         <span className="bg-black/30 px-2 py-1 rounded text-white font-mono">18 - 35</span>
                       </div>
                       <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="text-dz-gold font-bold">تطابق</span>
                         <span className="text-gray-300">النمط السايكومتري:</span>
                         <span className="bg-black/30 px-2 py-1 rounded text-white font-mono">الناشط المتمرد</span>
                       </div>
                       <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="text-gray-500 font-bold">استبعاد</span>
                         <span className="text-gray-300">احتمالية التصويت للمنافس العالية</span>
                         <span className="bg-black/30 px-2 py-1 rounded text-red-400 font-mono">&gt; 70%</span>
                       </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-gray-500 text-xs mb-1">المطابقة الكلية</div>
                        <div className="text-xl font-bold text-white">12,450</div>
                        <div className="text-[10px] text-gray-500 mt-1">ناخب محتمل</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center border border-dz-gold/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-dz-gold/5" />
                        <div className="text-dz-gold text-xs mb-1 relative z-10">فرصة الإقناع</div>
                        <div className="text-xl font-bold text-white relative z-10">68%</div>
                        <div className="text-[10px] text-gray-400 mt-1 relative z-10">High Propensity</div>
                      </div>
                      <div className="bg-dz-green hover:bg-dz-green-light cursor-pointer transition-colors rounded-xl p-4 text-center flex flex-col items-center justify-center group">
                        <Share2 className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">إرسال للميدان</div>
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
                    <div className="text-sm font-bold">تم تخصيص القائمة</div>
                    <div className="text-xs text-gray-400">لـ فريق العمل الميداني (حسين داي)</div>
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
              <h2 className="text-4xl font-bold mb-6">نتائج على أرض الواقع</h2>
              <p className="text-gray-400 text-lg">
                كيف حولنا البيانات إلى مقاعد في المجالس المنتخبة.
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
                <div className="text-sm font-bold tracking-widest text-dz-gold mb-4 uppercase">حالة دراسية مجهولة الهوية</div>
                <h3 className="text-3xl font-bold mb-6">انتخابات المجلس الشعبي البلدي (APC) - ولاية البليدة</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  واجه مرشح مستقل تحدياً في الوصول إلى فئة الشباب (18-35 عاماً) الذين يشكلون الأغلبية الصامتة في البلدية. كانت رسائل التواصل التقليدية غير فعالة.
                </p>
                <div className="space-y-6">
                  <div>
                    <div className="font-bold text-white mb-2">التدخل:</div>
                    <p className="text-gray-400 text-sm leading-relaxed">استخدمنا الخريطة السيكومترية لتحديد أنماط الشباب. اكتشفنا أن فئة "الناشط المتمرد" كانت الأكبر. قمنا بتعديل السردية من "الاستقرار والخبرة" إلى "تفكيك البيروقراطية المحلية".</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-3xl font-bold text-dz-green mb-1">12%</div>
                      <div className="text-xs text-gray-500">الدعم الأولي للشباب</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-dz-gold mb-1">34%</div>
                      <div className="text-xs text-gray-500">الدعم بعد التوجيه السايكومتري</div>
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
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '30%' }} viewport={{ once:true }} className="flex-1 bg-white/10 rounded-t-md relative group"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">12%</span></motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '45%' }} viewport={{ once:true }} transition={{ delay: 0.1 }} className="flex-1 bg-dz-green/50 rounded-t-md relative group"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">18%</span></motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '85%' }} viewport={{ once:true }} transition={{ delay: 0.2 }} className="flex-1 bg-dz-gold/80 rounded-t-md relative group shadow-[0_0_15px_rgba(200,162,82,0.5)]"><span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold">34%</span></motion.div>
                    </div>
                    <div className="flex gap-4 mt-4 text-center text-xs text-gray-400">
                      <div className="flex-1">قبل الحملة</div>
                      <div className="flex-1">الأسبوع 2</div>
                      <div className="flex-1 text-dz-gold font-bold">يوم الاقتراع</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 bg-dz-darker border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">نتعاون مع مؤسسات رائدة وموثوقة</h3>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 transition-all duration-500">
              <div className="flex flex-col items-center gap-3 group">
                <img src="/ons-logo.png" alt="ONS" className="h-20 md:h-24 object-contain mx-auto invert opacity-70 group-hover:opacity-100 transition-all cursor-pointer" />
                <span className="text-xs text-gray-400 font-bold">الديوان الوطني للإحصائيات (ONS)</span>
              </div>
              
              <div className="flex flex-col items-center gap-3 group">
                <img src="/anie-logo.png" alt="ANIE" className="h-24 md:h-28 object-contain mx-auto opacity-80 group-hover:opacity-100 transition-all cursor-pointer grayscale group-hover:grayscale-0" />
                <span className="text-xs text-gray-400 font-bold">السلطة المستقلة للانتخابات</span>
              </div>
              
              <div className="flex flex-col items-center gap-3 group">
                <img src="/cread-logo.png" alt="CREAD" className="h-[88px] md:h-28 object-contain mx-auto opacity-70 group-hover:opacity-100 transition-all cursor-pointer grayscale group-hover:grayscale-0 bg-white/10 rounded-xl p-2" />
                <span className="text-xs text-gray-400 font-bold">مركز البحث في الاقتصاد المطبق (CREAD)</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Quiz Portal (Data Funnel) */}
        <section id="quiz" className="py-32 bg-dz-darker relative overflow-hidden">
           <div className="absolute inset-0 z-0">
             <div className="absolute right-1/4 top-0 w-[800px] h-[800px] bg-dz-green/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30" />
           </div>
           <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <BrainCircuit className="h-16 w-16 text-dz-green mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">شارك في بناء أكبر دراسة<br/>للسلوكيات السياسية في الجزائر</h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                البوصلة السياسية الجزائرية (DZ Compass) هو اختبار مجاني ومجهول الهوية بالكامل. في 10 أسئلة فقط، اكتشف القبيلة السياسية التي تنتمي إليها.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-dz-green to-dz-green-dark hover:from-dz-green-light hover:to-dz-green text-white px-10 py-5 rounded-2xl font-bold text-2xl shadow-[0_0_30px_rgba(0,98,51,0.6)] hover:shadow-[0_0_50px_rgba(0,180,90,0.8)] transition-all flex items-center justify-center gap-4 mx-auto w-full md:w-auto cursor-pointer"
                onClick={() => setIsQuizOpen(true)}
              >
                <Brain className="h-8 w-8 animate-pulse" />
                <span dir="rtl">اكتشف شخصيتك السياسية</span>
              </motion.button>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                <ShieldCheck className="h-4 w-4" />
                <span>البيانات مجهولة الهوية بنسبة 100٪ ولن يتم بيعها لأطراف ثالثة.</span>
              </div>
           </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-dz-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-bold mb-6">ابدأ حملتك المبنية على البيانات اليوم.</h2>
                <p className="text-gray-400 text-lg mb-12">
                  هل تقود حملة انتخابية؟ تواصل معنا لتحديد موعد استشارة سرية ومناقشة كيف يمكن للبيانات أن تغير مسار حملتك.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                      <Map className="w-5 h-5 text-dz-gold" />
                    </div>
                    <div>
                      <div className="font-bold mb-1">المقر الرئيسي</div>
                      <div className="text-gray-400">حيدرة، الجزائر العاصمة<br/>الجمهورية الجزائرية الديمقراطية الشعبية</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                      <Ear className="w-5 h-5 text-dz-gold" />
                    </div>
                    <div>
                      <div className="font-bold mb-1">استفسارات أكاديمية وإعلامية</div>
                      <div className="text-gray-400" dir="ltr">press@dzanalytica.dz</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dz-darker p-8 rounded-3xl border border-white/10 shadow-2xl">
                <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6" onSubmit={(e) => {
                  // e.preventDefault();
                  // We remove preventDefault so it submits to web3forms!
                  setIsSubmitted(true);
                  setTimeout(() => setIsSubmitted(false), 5000);
                }}>
                  {/* مفتاح Web3Forms الخاص بك */}
                  <input type="hidden" name="access_key" value="725a478f-56ab-4808-856a-a00df97c5738" />
                  <input type="hidden" name="subject" value="DZ Analytica - طلب جديد من الموقع" />
                  <input type="hidden" name="redirect" value="https://web3forms.com/success" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-sm text-gray-400">الاسم الكامل</label>
                       <input name="fullName" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors" placeholder="محمد كمال..." />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm text-gray-400">رقم الهاتف / الواتساب</label>
                       <input name="phone" required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors text-left" placeholder="+213..." dir="ltr" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-sm text-gray-400">الانتماء أو الحزب (اختياري)</label>
                     <input name="party" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">نوع الحملة</label>
                      <select name="campaignType" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors appearance-none outline-none">
                        <option value="" className="bg-dz-darker">اختر نوع الحملة...</option>
                        <option value="apc" className="bg-dz-darker">بلدية (APC)</option>
                        <option value="apw" className="bg-dz-darker">ولائية (APW)</option>
                        <option value="apn" className="bg-dz-darker">تشريعية (APN)</option>
                        <option value="presidential" className="bg-dz-darker">رئاسية</option>
                        <option value="saas" className="bg-dz-darker text-dz-gold font-bold">عرض تجريبي للمنصة السحابية (SaaS Demo)</option>
                        <option value="other" className="bg-dz-darker">أخرى</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">النطاق الجغرافي (الولاية/البلدية)</label>
                      <input name="location" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                      <label className="text-sm text-gray-400">نطاق الميزانية التقديرية (دينار جزائري)</label>
                      <select name="budget" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors appearance-none" dir="rtl">
                        <option value="" className="bg-dz-darker">اختر الميزانية...</option>
                        <option value="150k-500k" className="bg-dz-darker">150,000 - 500,000 دج</option>
                        <option value="500k-1m" className="bg-dz-darker">500,000 - 1,000,000 دج</option>
                        <option value="1m+" className="bg-dz-darker">+ 1,000,000 دج</option>
                      </select>
                  </div>

                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-dz-green/20 border border-dz-green text-dz-green rounded-xl p-4 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>تم إرسال طلبك بنجاح. سنتواصل معك قريباً.</span>
                    </motion.div>
                  ) : (
                    <button type="submit" className="w-full bg-dz-gold hover:bg-dz-gold-light text-dz-darker font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                      <span>طلب استشارة سرية</span>
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                  <p className="text-xs text-center text-gray-500">يخضع هذا النموذج لسرية العميل والخصوصية التامة.</p>
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
                  <span>دزاير أناليتيكا</span>
                </span>
              </div>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/dz-analytica/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all transform hover:scale-110" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all transform hover:scale-110" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all transform hover:scale-110" aria-label="X (Twitter)">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <a href="/brand-assets.html" target="_blank" className="hover:text-dz-gold transition-colors font-bold text-white">الهوية البصرية (شعارات)</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">ميثاق الأخلاقيات</a>
              <a href="https://www.arpce.dz/ar/pub/c7e6n6" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">سياسة الخصوصية (قانون 18-07)</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("شروط الخدمة: المنصة قيد التطوير التجريبي ولا تتحمل أي مسؤولية قانونية في هذه المرحلة."); }} className="hover:text-white transition-colors">شروط الخدمة</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <span dir="ltr">© {new Date().getFullYear()} DZ Analytica.</span> 
            <span>البيانات قوة، فاستخدمها بحكمة.</span>
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
    </div>
  );
}

