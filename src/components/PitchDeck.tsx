import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  BrainCircuit,
  Target,
  Database,
  BarChart3,
  ShieldCheck,
  PieChart,
  Users,
  LineChart,
  Globe,
  CheckCircle2,
} from "lucide-react";

const slides = [
  {
    id: "title",
    title: "DZ Analytica",
    subtitle: "أول منصة للنمذجة التنبؤية وتحليل السلوك السياسي في الجزائر",
    content: (
      <div className="flex flex-col items-center justify-center h-full space-y-8 text-center pt-10">
        <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(200,162,82,0.2)]">
          <BrainCircuit className="w-16 h-16 text-dz-gold" />
        </div>
        <div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-l from-dz-gold to-white drop-shadow-lg">
            DZ Analytica
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 font-light">
            البناء العلمي للحملات التواصلية والمبادرات
          </p>
        </div>
      </div>
    ),
    bg: "bg-dz-darker",
  },
  {
    id: "problem",
    title: "المشكلة",
    subtitle: "لماذا تفشل الحملات التواصلية التقليدية؟",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[
          {
            icon: Target,
            title: "غياب الاستهداف",
            desc: "الحملات تعتمد على الحدس العشوائي والتجمعات التقليدية بدلاً من التوجيه الميداني المبني على البيانات.",
          },
          {
            icon: Users,
            title: "الجهل بالجمهور",
            desc: "عدم فهم الدوافع النفسية والسيكومترية للجمهور المستهدف يؤدي لرسائل غير مطابقة لتطلعاتهم.",
          },
          {
            icon: PieChart,
            title: "نقص البيانات",
            desc: "تشتت قواعد البيانات وافتقارها إلى أبعاد التحليل الحديث مثل الاهتمامات الرقمية والسلوك الميداني.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <item.icon className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
    bg: "bg-dz-dark",
  },
  {
    id: "solution",
    title: "الحل",
    subtitle: "دزاير أناليتيكا: منصة النمذجة التنبؤية",
    content: (
      <div className="flex flex-col md:flex-row items-center gap-12 mt-12">
        <div className="flex-1 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-dz-green/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
              <Database className="w-6 h-6 text-dz-green" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                توحيد البيانات (Identity Resolution)
              </h3>
              <p className="text-gray-400">
                دمج قواعد البيانات المفتوحة، الردود الاستبيانية، والتفاعلات الرقمية
                في قاعدة موحدة ومجهولة الهوية لتكوين صورة دقيقة للجمهور.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-dz-gold/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
              <LineChart className="w-6 h-6 text-dz-gold" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                سبر الآراء والإحصائيات التنبؤية
              </h3>
              <p className="text-gray-400">
                استخدام أدوات مسح حديثة لفهم وتصنيف توجهات المجتمع.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-dz-green/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
              <Target className="w-6 h-6 text-dz-green" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                توجيه ميداني ذكي (Activation)
              </h3>
              <p className="text-gray-400">
                استخراج الخرائط التفاعلية وتوجيه جهود الحملة التواصلية و
                التركيز على المناطق والشرائح ذات التأثير العالي.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden flex items-center justify-center min-h-[300px]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 text-center">
            <BarChart3 className="w-24 h-24 text-dz-gold mx-auto mb-6 opacity-80" />
            <div className="text-2xl font-bold text-white">
              تحويل البيانات الخام إلى استراتيجيات ناجحة
            </div>
          </div>
        </div>
      </div>
    ),
    bg: "bg-dz-darker",
  },
  {
    id: "product",
    title: "المنتج التفاعلي: DZ Compass",
    subtitle: "البوصلة السياسية الأولى المصممة خصيصاً للبيئة الجزائرية",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
        <div className="bg-gradient-to-br from-dz-dark to-black border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-dz-gold/20 rounded-full blur-3xl"></div>
          <BrainCircuit className="w-20 h-20 text-dz-gold mx-auto mb-6 relative z-10" />
          <h3 className="text-3xl font-black mb-4 relative z-10">
            البوصلة السياسية
          </h3>
          <p className="text-gray-400 mb-6 relative z-10">
            نظام استبيان مدروس يصنف المشاركين إلى 4 أنماط سيكومترية رئيسية
            لتحليل توجهات المجتمع بفعالية.
          </p>
          <div className="inline-block bg-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 font-bold border border-white/5 relative z-10">
            معدل الانتهاء من الاختبار: +85%
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-xl leading-relaxed text-gray-300 drop-shadow-md border-r-4 border-dz-gold pr-6 rounded-r-sm">
            يُعتبر DZ Compass واجهة جذابة للمستخدمين لفهم موقعهم المجتمعي، وهو في
            الوقت نفسه طريقة مبتكرة لجمع البيانات السيكومترية بشكل طوعي وأخلاقي.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-dz-green" />
              <span className="text-lg">
                استيعاب التفضيلات الثقافية والاقتصادية.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-dz-green" />
              <span className="text-lg">
                قياس الانطباعات والتفاعلات المجتمعية.
              </span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-dz-green" />
              <span className="text-lg">
                قابلية المشاركة على وسائل التواصل لتأثير فيروسي (Viral).
              </span>
            </li>
          </ul>
        </div>
      </div>
    ),
    bg: "bg-dz-dark",
  },
  {
    id: "market",
    title: "حجم السوق والفرص",
    subtitle: "بيئة مهيأة للابتكار في دراسات الرأي العام في الجزائر ومنطقة الـ MENA",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {[
          {
            title: "المجتمع",
            value: "24.5M+",
            desc: "حجم الكتلة الجماهيرية الفاعلة في الجزائر",
            icon: Users,
          },
          {
            title: "المؤسسات",
            value: "60+",
            desc: "مؤسسات وهيئات تبحث عن طرق مبتكرة للتواصل",
            icon: Target,
          },
          {
            title: "قيادة الرأي",
            value: "الآلاف",
            desc: "فاعلون وقادة رأي في المجتمع",
            icon: LineChart,
          },
          {
            title: "الاستهداف",
            value: "MENA",
            desc: "قابلية التوسع لكل دول المنطقة (تونس، موريتانيا...)",
            icon: Globe,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <stat.icon className="w-6 h-6 text-dz-gold" />
            </div>
            <div className="text-3xl font-black text-white mb-2">
              {stat.value}
            </div>
            <div className="text-lg font-bold text-gray-300 mb-2">
              {stat.title}
            </div>
            <div className="text-sm text-gray-500">{stat.desc}</div>
          </div>
        ))}
      </div>
    ),
    bg: "bg-dz-darker",
  },
  {
    id: "security",
    title: "سيادة وأمن البيانات",
    subtitle: "الأخلاقيات والقانون كأساس ثابت للعمل",
    content: (
      <div className="flex flex-col items-center text-center mt-12 max-w-4xl mx-auto space-y-10">
        <ShieldCheck className="w-24 h-24 text-dz-green" />
        <h3 className="text-3xl font-bold">
          متوافقون كلياً مع القانون العضوي 18-07
        </h3>
        <p className="text-xl text-gray-300 leading-relaxed">
          نحن نعي تماماً حساسية البيانات السياسية. لذلك تعتمد بنيتنا التحتية على
          تشفير متقدم للخوادم وتخزين البيانات حصرياً داخل الخوادم الوطنية
          الجزائرية لضمان السيادة الرقمية الكاملة ومنع أي تسريبات.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <div className="bg-dz-dark p-6 rounded-xl border border-white/5">
            <div className="font-bold text-dz-gold mb-2">موافقة صريحة</div>
            <p className="text-sm text-gray-400">
              لا نجمع بيانات بدون موافقة Opt-In واضحة من المستخدمين.
            </p>
          </div>
          <div className="bg-dz-dark p-6 rounded-xl border border-white/5">
            <div className="font-bold text-dz-green mb-2">استضافة محلية</div>
            <p className="text-sm text-gray-400">
              خوادم متواجدة في الجزائر للامتثال الصارم لقوانين السيادة الوطنية.
            </p>
          </div>
          <div className="bg-dz-dark p-6 rounded-xl border border-white/5">
            <div className="font-bold text-dz-gold mb-2">عدم التضليل</div>
            <p className="text-sm text-gray-400">
              نرفض بشكل قطعي التعاون مع أي حملات ترويج للأخبار الكاذبة.
            </p>
          </div>
        </div>
      </div>
    ),
    bg: "bg-dz-dark",
  },
  {
    id: "business-model",
    title: "نموذج العمل المستقبلي",
    subtitle: "كيف نولد الأرباح بشكل مستدام؟",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white/5 border border-dz-gold/30 rounded-2xl p-8 relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-dz-gold/20 blur-2xl rounded-full"></div>
          <h3 className="text-2xl font-bold mb-4">
            العقود الاستشارية والتواصلية
          </h3>
          <p className="text-gray-400 leading-relaxed">
            شراكات مباشرة B2B و B2G مع المؤسسات والوكالات لتقديم التحليلات
            التنبؤية والتوجيه الميداني خلال فترات المشاريع الاستراتيجية.
          </p>
        </div>
        <div className="bg-white/5 border border-dz-green/30 rounded-2xl p-8 relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-dz-green/20 blur-2xl rounded-full"></div>
          <h3 className="text-2xl font-bold mb-4">نموذج الاشتراك (SaaS)</h3>
          <p className="text-gray-400 leading-relaxed">
            الوصول إلى لوحات تحكم ديناميكية لمعرفة توجهات الرأي العام،
            الإحصائيات الديموغرافية، وسبر الآراء بشكل دوري للباحثين والمؤسسات.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 blur-2xl rounded-full"></div>
          <h3 className="text-2xl font-bold mb-4">
            أبحاث السوق والـ A/B Testing
          </h3>
          <p className="text-gray-400 leading-relaxed">
            إتاحة أدوات القياس السيكومترية لوكالات الاتصال والعلاقات العامة
            لاختبار الرسائل التسويقية.
          </p>
        </div>
      </div>
    ),
    bg: "bg-dz-darker",
  },
  {
    id: "ask",
    title: "ماذا نحتاج؟ (رؤيتنا الاستباقية)",
    subtitle: "توسيع النطاق والبنية التحتية",
    content: (
      <div className="flex flex-col items-center text-center mt-10">
        <h3 className="text-4xl font-black text-dz-gold mb-10">
          نبحث عن تمويل أوّلي (Seed Funding)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-right">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-dz-gold/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-dz-gold">1</span>
              </div>
              <h4 className="text-xl font-bold">
                بناء البنية التحتية المحلية للبيانات
              </h4>
            </div>
            <p className="text-gray-400">
              تطوير خوادم السحابة ومراكز البيانات المطابقة للمعايير الوطنية
              للتعامل مع الـ Big Data.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-right">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-dz-gold/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-dz-gold">2</span>
              </div>
              <h4 className="text-xl font-bold">تعزيز المواهب التقنية</h4>
            </div>
            <p className="text-gray-400">
              توظيف أقوى العقول في مجالات علوم البيانات (Data Science)، الذكاء
              الاصطناعي، ومهندسي تعلم الآلة.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-right">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-dz-gold/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-dz-gold">3</span>
              </div>
              <h4 className="text-xl font-bold">
                تطوير نماذج ذكاء اصطناعي وتحليل خاصة بالجزائر
              </h4>
            </div>
            <p className="text-gray-400">
              بناء LLMs مدربة خصيصاً على السرديات الثقافية الجزائرية
              لفهم اللهجات والتعبيرات بطريقة دقيقة.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-right">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-dz-gold/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-dz-gold">4</span>
              </div>
              <h4 className="text-xl font-bold">التوسع الجغرافي والتشغيلي</h4>
            </div>
            <p className="text-gray-400">
              الترسخ في السوق الوطنية أولاً، كخطوة للتوسع في الأسواق الناشئة
              والمحيط الإفريقي القريب.
            </p>
          </div>
        </div>
      </div>
    ),
    bg: "bg-dz-dark",
  },
];

interface PitchDeckProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeck: React.FC<PitchDeckProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black text-white font-sans overflow-hidden flex flex-col"
          dir="rtl"
        >
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[110]">
            <button
              onClick={onClose}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <div className="text-sm font-bold text-gray-400">
                {currentSlide + 1} / {slides.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Slide Content */}
          <div
            className={`flex-1 relative transition-colors duration-700 ${slides[currentSlide].bg}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 overflow-y-auto"
              >
                <div className="w-full max-w-6xl mx-auto py-10">
                  {currentSlide !== 0 && (
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-5xl font-black mb-4">
                        {slides[currentSlide].title}
                      </h2>
                      {slides[currentSlide].subtitle && (
                        <p className="text-xl text-dz-gold">
                          {slides[currentSlide].subtitle}
                        </p>
                      )}
                    </div>
                  )}
                  {slides[currentSlide].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <motion.div
              initial={false}
              animate={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
              }}
              className="h-full bg-dz-gold"
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
