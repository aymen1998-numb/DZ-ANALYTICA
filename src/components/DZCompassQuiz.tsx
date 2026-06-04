import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, BrainCircuit, Brain, RotateCcw, ShieldCheck } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    text: "ما هو التحدي الأكبر الذي يواجه الجزائر اليوم؟",
    options: [
      { text: "التهديدات الخارجية والحاجة للحفاظ على الاستقرار والأمن", trait: "guardian" },
      { text: "التمسك بالسياسات القديمة ورفض التغيير الجذري", trait: "activist" },
      { text: "البيروقراطية وضعف المؤسسات الاقتصادية", trait: "pragmatist" },
      { text: "نقص الكفاءات في الإدارة والحاجة لإصلاح تدريجي هادئ", trait: "reformer" }
    ]
  },
  {
    id: 2,
    text: "كيف ترى دور الدولة في الاقتصاد؟",
    options: [
      { text: "يجب أن تتدخل بقوة وتحتكر القطاعات الاستراتيجية لحماية المواطن", trait: "guardian" },
      { text: "يجب محاربة الفساد والمحسوبية أولاً قبل أي أيديولوجيا اقتصادية", trait: "activist" },
      { text: "يجب أن تنسحب وتترك المجال للقطاع الخاص والمبادرة الحرة", trait: "pragmatist" },
      { text: "يجب أن تكون شريكاً وراعياً وتوفر بيئة تنافسية شفافة", trait: "reformer" }
    ]
  },
  {
    id: 3,
    text: "ما هي الطريقة الأفضل لإحداث التغيير المنشود؟",
    options: [
      { text: "الحفاظ على الاستقرار وإجراء تغييرات مدروسة جداً لتجنب الفوضى", trait: "guardian" },
      { text: "تغيير شامل وجذري والقطيعة التامة مع الممارسات السابقة", trait: "activist" },
      { text: "التركيز على الاقتصاد الملموس وتجاهل الشعارات السياسية", trait: "pragmatist" },
      { text: "العمل من داخل المؤسسات وتطويرها وتحديثها خطوة بخطوة", trait: "reformer" }
    ]
  },
  {
    id: 4,
    text: "في رأيك، ما هو المعيار الأهم لاختيار مسؤول عمومي؟",
    options: [
      { text: "الولاء للوطن والحفاظ على ثوابت الأمة وتاريخها", trait: "guardian" },
      { text: "النزاهة التامة ونظافة اليد والشجاعة في التغيير", trait: "activist" },
      { text: "الكفاءة الإدارية العالية في التسيير والقدرة على جلب الاستثمارات", trait: "pragmatist" },
      { text: "الرؤية الاستراتيجية والقدرة على توحيد الجهود والإصلاح الإداري", trait: "reformer" }
    ]
  },
  {
    id: 5,
    text: "كيف تنظر إلى مشاركة الشباب في صناعة القرار؟",
    options: [
      { text: "يجب أن يتم تأطيرهم وتوجيههم من قبل ذوي الحكمة والخبرة", trait: "guardian" },
      { text: "هم محرك التغيير الحقيقي ويجب أن يقودوا المرحلة القادمة فوراً", trait: "activist" },
      { text: "يجب التركيز على توفير فرص العمل والثروة لهم قبل المناصب السياسية", trait: "pragmatist" },
      { text: "يجب دمجهم تدريجياً لضمان انتقال سلس ومدروس بين الأجيال", trait: "reformer" }
    ]
  },
  {
    id: 6,
    text: "ما هي أولويتك في مجال العلاقات الخارجية والدبلوماسية؟",
    options: [
      { text: "حماية السيادة الوطنية ومواجهة التدخلات الأجنبية بحزم", trait: "guardian" },
      { text: "مراجعة شاملة للتحالفات القديمة وبناء علاقات مبنية على الشفافية", trait: "activist" },
      { text: "التركيز الكلي على الدبلوماسية الاقتصادية وجلب الاستثمارات", trait: "pragmatist" },
      { text: "تعزيز دورنا في المنظمات الدولية وبناء شراكات استراتيجية متوازنة", trait: "reformer" }
    ]
  },
  {
    id: 7,
    text: "كيف يمكن إصلاح منظومة التربية والتعليم في الجزائر؟",
    options: [
      { text: "التركيز على حماية الهوية الوطنية والقيم الأصيلة في المناهج", trait: "guardian" },
      { text: "إحداث قطيعة مع المناهج الموروثة وإشراك الطلبة في اتخاذ القرار", trait: "activist" },
      { text: "ربط التكوين باحتياجات سوق العمل وتشجيع الجامعات الخاصة", trait: "pragmatist" },
      { text: "رقمنة المؤسسات التعليمية وتطوير قدرات الأساتذة تدريجياً", trait: "reformer" }
    ]
  },
  {
    id: 8,
    text: "ما هو موقفك من حرية التعبير والصحافة؟",
    options: [
      { text: "يجب أن تكون مسؤولة ولا تمس باستقرار وأمن البلاد أبداً", trait: "guardian" },
      { text: "حرية مطلقة وبلا قيود لكشف بؤر الفساد ومساءلة المسؤولين علناً", trait: "activist" },
      { text: "نحتاج إعلاماً اقتصادياً يسلط الضوء على فرص التنمية بدلاً من الجدل السياسي", trait: "pragmatist" },
      { text: "تنظيم القطاع بقوانين حديثة تضمن المهنية وتحمي حقوق الصحفيين", trait: "reformer" }
    ]
  },
  {
    id: 9,
    text: "فيما يخص سياسة الدعم الاجتماعي (دعم الأسعار السلع الأساسية):",
    options: [
      { text: "الحفاظ على الدعم الشامل لحماية الفئات الهشة والطبقة العاملة", trait: "guardian" },
      { text: "إعادة توزيعه بشفافية بعد استرجاع الأموال المنهوبة", trait: "activist" },
      { text: "عقلنة الدعم وتوجيه الأموال للاستثمار وتطوير البنية التحتية", trait: "pragmatist" },
      { text: "توجيه الدعم حصرياً للمحتاجين عبر نظام بيانات رقمي حديث وفعال", trait: "reformer" }
    ]
  },
  {
    id: 10,
    text: "كيف ترى دور الرقمنة والإدارة الإلكترونية؟",
    options: [
      { text: "ضرورية ولكن مع رقابة سيادية صارمة لحماية قواعد البيانات الوطنية", trait: "guardian" },
      { text: "هي السلاح الأول للقضاء النهائي على البيروقراطية وتجاوز المسؤولين الفاسدين", trait: "activist" },
      { text: "أداة أساسية لتسهيل بيئة الأعمال ودفع النمو الاقتصادي للقطاع الخاص", trait: "pragmatist" },
      { text: "مشروع هيكلي يتطلب خطة مدروسة طويلة الأمد وتكويناً مستمراً للإطارات", trait: "reformer" }
    ]
  },
  {
    id: 11,
    text: "في المبادرات المجتمعية والمشاريع العامة، كيف يكون تفاعلك؟",
    options: [
      { text: "أشارك دائماً بفعالية في المبادرات المنظمة", trait: "guardian" },
      { text: "أشارك أحياناً حسب طبيعة المبادرة", trait: "reformer" },
      { text: "لا أشارك حالياً ولكنني مهتم بتنظيم المبادرات", trait: "activist" },
      { text: "أفضل التركيز على أهدافي الخاصة على المشاركة العامة", trait: "pragmatist" }
    ]
  }
];

const TRIBES = {
  guardian: {
    name: "مُحافِظ وحارس للاستقرار",
    description: "أنت تقدر التقاليد، الاستقرار، والأمن القومي فوق كل شيء. بالنسبة لك، الدولة القوية هي الضامن الوحيد لحماية المجتمع من الهزات. تفضل التغيير البطيء والمدروس جداً بدلاً من القفز في المجهول.",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-indigo-900/40",
    border: "border-indigo-500/30",
    text: "text-indigo-300"
  },
  activist: {
    name: "ناشط القطيعة",
    description: "أنت تؤمن بأن الأنظمة القديمة لا يمكن إصلاحها من الداخل ويجب تجاوزها. النزاهة والشفافية هي بوصلتك. لا ترضى بأنصاف الحلول، وتطالب بتغيير جذري وشامل يقوده الشباب وأصحاب الأيادي النظيفة.",
    color: "from-rose-500 to-red-600",
    bg: "bg-rose-900/40",
    border: "border-rose-500/30",
    text: "text-rose-300"
  },
  pragmatist: {
    name: "البراغماتي العملي",
    description: "أنت لا تهتم كثيراً بالأيديولوجيا أو الشعارات السياسية، بل بالنتائج الملموسة. الاقتصاد والتنمية وخلق الثروة هي أولوياتك. تعتقد أن المشاكل تتطلب كفاءات إدارية من التكنوقراط وحلولاً تقنية، لا سياسية.",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-900/40",
    border: "border-amber-500/30",
    text: "text-amber-300"
  },
  reformer: {
    name: "المُصلح الصامت",
    description: "أنت تؤمن بقوة المؤسسات، وترى أن التغيير الحقيقي يتطلب وقتاً وإصلاحات هيكلية مدروسة من الداخل. تتجنب الفوضى وكذلك الركود، وتفضل التحديث التدريجي، الانتقال السلس، وتطوير الأنظمة خطوة بخطوة.",
    color: "from-emerald-400 to-teal-600",
    bg: "bg-emerald-900/40",
    border: "border-emerald-500/30",
    text: "text-emerald-300"
  }
};

interface DZCompassQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DZCompassQuiz({ isOpen, onClose }: DZCompassQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAnswer = (trait: string) => {
    const newAnswers = [...answers, trait];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowLeadForm(true);
    }
  };

  const submitLeadAndShowResult = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      /* مفتاح Web3Forms الخاص بك */
      formData.append("access_key", "725a478f-56ab-4808-856a-a00df97c5738");
      formData.append("subject", "DZ Analytica - استبيان جديد");
      
      const resultObj = getResult();
      formData.append("النتيجة السياسية (Tribe)", resultObj.name);

      // Add detailed answers to formData
      answers.forEach((answerTrait, index) => {
        const questionObj = QUESTIONS[index];
        const selectedOption = questionObj.options.find(opt => opt.trait === answerTrait);
        formData.append(`السؤال ${index + 1}: ${questionObj.text}`, selectedOption ? selectedOption.text : answerTrait);
      });

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      // Regardless of success, show result
    } catch (err) {
      console.error("Error submitting form", err);
    }
    
    setIsSubmittingLead(false);
    setShowLeadForm(false);
    setIsFinished(true);
  };

  const getResult = () => {
    const counts: Record<string, number> = {
      guardian: 0,
      activist: 0,
      pragmatist: 0,
      reformer: 0
    };

    answers.forEach(trait => {
      if (counts[trait] !== undefined) {
        counts[trait]++;
      }
    });

    let topTrait = 'reformer';
    let max = -1;

    for (const [trait, count] of Object.entries(counts)) {
      if (count > max) {
        max = count;
        topTrait = trait;
      }
    }

    return TRIBES[topTrait as keyof typeof TRIBES];
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsFinished(false);
    setShowLeadForm(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir="rtl">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-dz-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-dz-darker shrink-0">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-6 h-6 text-dz-green" />
              <h2 className="text-xl font-bold">DZ Compass | البوصلة السياسية</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-10 overflow-y-auto w-full">
            {!showLeadForm && !isFinished ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-dz-gold">السؤال {currentQuestionIndex + 1} من {QUESTIONS.length}</span>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> مجهول الهوية
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
                      <motion.div 
                        className="h-full bg-dz-green"
                        initial={{ width: `${(currentQuestionIndex / QUESTIONS.length) * 100}%` }}
                        animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold leading-relaxed">
                      {QUESTIONS[currentQuestionIndex].text}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option.trait)}
                        className="w-full text-right p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-dz-gold/50 transition-all duration-300 flex items-center justify-between group"
                      >
                        <span className="text-lg text-gray-200 group-hover:text-white">{option.text}</span>
                        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-dz-gold group-hover:bg-dz-gold/10 shrink-0 mr-4">
                          <div className="w-2.5 h-2.5 rounded-full bg-dz-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : showLeadForm ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 max-w-md mx-auto"
              >
                <div className="w-16 h-16 mx-auto bg-dz-gold/20 rounded-full flex items-center justify-center mb-6">
                  <BrainCircuit className="w-8 h-8 text-dz-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-2">اكتمل تحليل إجاباتك!</h3>
                <p className="text-gray-400 mb-8">
                  الرجاء إدخال معلوماتك البسيطة لنرسل لك النتائج التفصيلية ونخبرك بقبيلتك السياسية.
                </p>
                <form onSubmit={submitLeadAndShowResult} className="space-y-4">
                  <div>
                    <input 
                      name="name" 
                      required 
                      type="text" 
                      placeholder="كيف نناديك؟ (الاسم الكامل)" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors text-right"
                    />
                  </div>
                  <button 
                    disabled={isSubmittingLead}
                    type="submit"
                    className="w-full mt-4 px-8 py-4 rounded-xl bg-dz-gold hover:bg-dz-gold-light text-dz-darker font-bold transition-colors disabled:opacity-50"
                  >
                    {isSubmittingLead ? "جاري المعالجة..." : "اكتشف نتيجتك الآن"}
                  </button>
                  <p className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    معلوماتك تبقى سرية (قانون 18-07)
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 relative">
                  <div className={`absolute inset-0 rounded-full blur-xl opacity-50 bg-gradient-to-r ${getResult().color}`} />
                  <div className="relative z-10 w-full h-full flex items-center justify-center bg-dz-dark rounded-full shadow-inner border border-white/10">
                    <Brain className={`w-10 h-10 ${getResult().text}`} />
                  </div>
                </div>
                
                <h3 className="text-sm font-bold tracking-widest text-gray-400 mb-4">قبيلتك السياسية هي:</h3>
                <h4 className={`text-4xl sm:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-l ${getResult().color} drop-shadow-xl`}>
                  {getResult().name}
                </h4>
                
                <div className={`p-8 rounded-2xl ${getResult().bg} ${getResult().border} border shadow-lg mb-10`}>
                  <p className="text-lg leading-relaxed text-gray-200 font-medium">
                    {getResult().description}
                  </p>
                </div>

                <div className="flex flex-col flex-wrap sm:flex-row items-center justify-center gap-4 mt-6">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://dz-analytica.vercel.app')}&quote=${encodeURIComponent(`لقد أجريت اختبار البوصلة السياسية (DZ Compass) وكانت نتيجتي: ${getResult().name}.\nتُرى ما هي هويتك السياسية؟ جرب الاختبار الآن واكتشف قبيلتك السياسية!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#1877F2] text-white font-bold transition-all flex items-center justify-center gap-2 hover:bg-[#1877F2]/90"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
                    مشاركة على فيسبوك
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://dz-analytica.vercel.app')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#0A66C2] text-white font-bold transition-all flex items-center justify-center gap-2 hover:bg-[#0A66C2]/90"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    مشاركة على لينكد إن
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://dz-analytica.vercel.app')}&text=${encodeURIComponent(`لقد أجريت اختبار البوصلة السياسية (DZ Compass) وكانت نتيجتي: ${getResult().name}.\nتُرى ما هي هويتك السياسية؟ جرب الاختبار الآن واكتشف ذلك مع @DZAnalytica!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-black border border-white/20 text-white font-bold transition-all flex items-center justify-center gap-2 hover:bg-white/10"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.925H5.022z"/></svg>
                    مشاركة على X
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <button 
                    onClick={onClose}
                    className={`w-full sm:w-auto px-10 py-4 rounded-xl font-bold transition-all shadow-xl bg-gradient-to-r ${getResult().color} text-white hover:scale-[1.02] border border-white/10`}
                  >
                    العودة للموقع
                  </button>
                  <button 
                    onClick={resetQuiz}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    إعادة الاختبار
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
