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
  }
];

const TRIBES = {
  guardian: {
    name: "مُحافِظ وحارس للاستقرار",
    description: "أنت تقدر التقاليد، الاستقرار، والأمن القومي فوق كل شيء. بالنسبة لك، الدولة القوية هي الضامن الوحيد لحماية المجتمع من الهزات. تفضل التغيير البطيء والمدروس جداً بدلاً من القفز في المجهول.",
    color: "from-blue-600 to-blue-800",
    bg: "bg-blue-900/20",
    text: "text-blue-400"
  },
  activist: {
    name: "ناشط القطيعة",
    description: "أنت تؤمن بأن الأنظمة القديمة لا يمكن إصلاحها من الداخل ويجب تجاوزها. النزاهة والشفافية هي بوصلتك. لا ترضى بأنصاف الحلول، وتطالب بتغيير جذري وشامل يقوده الشباب وأصحاب الأيادي النظيفة.",
    color: "from-red-600 to-red-800",
    bg: "bg-red-900/20",
    text: "text-red-400"
  },
  pragmatist: {
    name: "البراغماتي العملي",
    description: "أنت لا تهتم كثيراً بالأيديولوجيا أو الشعارات السياسية، بل بالنتائج الملموسة. الاقتصاد والتنمية وخلق الثروة هي أولوياتك. تعتقد أن المشاكل تتطلب كفاءات إدارية من التكنوقراط وحلولاً تقنية، لا سياسية.",
    color: "from-yellow-500 to-yellow-700",
    bg: "bg-yellow-900/20",
    text: "text-yellow-400"
  },
  reformer: {
    name: "المُصلح الصامت",
    description: "أنت تؤمن بقوة المؤسسات، وترى أن التغيير الحقيقي يتطلب وقتاً وإصلاحات هيكلية مدروسة من الداخل. تتجنب الفوضى وكذلك الركود، وتفضل التحديث التدريجي، الانتقال السلس، وتطوير الأنظمة خطوة بخطوة.",
    color: "from-dz-green-light to-dz-green-dark",
    bg: "bg-dz-green-dark/20",
    text: "text-dz-green"
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
      formData.append("quiz_result", getResult().name);
      
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
                  <div>
                    <input 
                      name="phone" 
                      required 
                      type="tel" 
                      placeholder="رقم الهاتف الخلوي المجاني" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-dz-gold transition-colors text-right"
                      dir="rtl"
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
                  <Brain className={`w-12 h-12 relative z-10 ${getResult().text}`} />
                </div>
                
                <h3 className="text-xl text-gray-400 mb-2">قبيلتك السياسية هي:</h3>
                <h4 className={`text-4xl sm:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r ${getResult().color}`}>
                  {getResult().name}
                </h4>
                
                <div className={`p-6 rounded-2xl ${getResult().bg} border border-white/5 mb-10`}>
                  <p className="text-lg leading-relaxed text-gray-200">
                    {getResult().description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={onClose}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dz-gold hover:bg-dz-gold-light text-dz-darker font-bold transition-colors"
                  >
                    العودة للموقع
                  </button>
                  <button 
                    onClick={resetQuiz}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
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
