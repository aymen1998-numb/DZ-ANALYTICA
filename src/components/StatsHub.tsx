import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Building2, Globe, Users, BarChart3, Mail, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../translations';

export function StatsHub() {
  const { t, lang } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stats = [
    {
      id: 'gdp',
      title: t('نمو الناتج المحلي الإجمالي'),
      value: '+3.8%',
      desc: t('معدل نمو الاقتصاد الجزائري المتوقع لعام 2026'),
      icon: TrendingUp,
      color: 'text-dz-green'
    },
    {
      id: 'companies',
      title: t('الشركات النشطة والمؤسسات'),
      value: '+120,000',
      desc: t('قاعدة بيانات الشركات النشطة في السوق الجزائرية'),
      icon: Building2,
      color: 'text-dz-gold'
    },
    {
      id: 'internet',
      title: t('انتشار الإنترنت والرقمنة'),
      value: '74.5%',
      desc: t('معدل الوصول للشبكة والخدمات الرقمية بالجزائر'),
      icon: Globe,
      color: 'text-dz-green-light'
    },
    {
      id: 'demographics',
      title: t('الفئة الاستهلاكية النشطة'),
      value: '28.2M',
      desc: t('عدد البالغين وصناع القرار الشرائي في المجتمع'),
      icon: Users,
      color: 'text-dz-gold-light'
    }
  ];

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('access_key', '725a478f-56ab-4808-856a-a00df97c5738');
      formData.append('subject', 'DZ Analytica - اشتراك نشرة إحصائية جديدة');
      formData.append('project', 'DZ Analytica');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Subscription error', err);
    }

    setIsSubmitting(false);
  };

  return (
    <section id="stats-hub" className="py-24 bg-dz-dark relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 bottom-0 w-[600px] h-[600px] bg-dz-gold/5 rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-dz-gold mb-6">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-wider">{t('المرصد الديموغرافي والاقتصادي')}</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            {t('المركز الوطني للبيانات وسلوكيات المجتمع')}
          </h2>
          <p className="text-gray-400 text-lg">
            {t('نراقب المؤشرات السوسيو-اقتصادية والديموغرافية الكبرى في الجزائر لتغذية النماذج التحليلية وتقديم قراءة دقيقة لواقع السوق.')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={stat.id}
              className="bg-dz-darker border border-white/10 rounded-2xl p-6 hover:border-dz-gold/30 hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-xs text-gray-500 font-mono">DZ-DATA</span>
              </div>
              <h3 className="text-sm text-gray-400 mb-2 font-medium">{stat.title}</h3>
              <div className="text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
              <p className="text-xs text-gray-500 leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Newsletter / Subscription Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-dz-green-dark/20 to-dz-darker border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-dz-green opacity-10 blur-3xl rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="h-6 w-6 text-dz-gold" />
                {t('النشرة الاقتصادية والاجتماعية')}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('اشترك لتلقي تقارير أسبوعية، دراسات المستهلك الجزائري، وتحليل المؤشرات القطاعية مباشرة في بريدك الإلكتروني.')}
              </p>
            </div>

            <div className="w-full md:w-1/2">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dz-green/20 border border-dz-green/30 rounded-xl p-4 text-center text-white flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="h-5 w-5 text-dz-green" />
                  <span className="text-sm font-bold">{t('تم الاشتراك بنجاح')}</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('أدخل بريدك الإلكتروني')}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-dz-gold text-right"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-dz-gold hover:bg-dz-gold-light text-dz-darker font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(200,162,82,0.3)] hover:shadow-[0_0_25px_rgba(200,162,82,0.5)] cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {isSubmitting ? t('جاري الإرسال...') : t('اشترك الآن')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
