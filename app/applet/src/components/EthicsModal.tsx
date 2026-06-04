import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, CheckCircle2, Lock, Eye, Check } from 'lucide-react';
import { useTranslation } from '../translations';

interface EthicsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EthicsModal({ isOpen, onClose }: EthicsModalProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-dz-darker border border-white/10 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-dz-gold/10 text-dz-gold">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {t("ميثاق الأخلاقيات والمسؤولية")}
                </h3>
                <p className="text-sm text-gray-400">
                  {t("مبادئ استخدام البيانات والذكاء الديموغرافي في دزاير أناليتيكا")}
                </p>
              </div>
            </div>

            {/* Core commitment */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-8">
              <p className="text-gray-300 text-sm leading-relaxed text-right md:text-justify font-sans">
                {t("تلتزم دزاير أناليتيكا بتقديم حلول البيانات، التحليلات، وترخيص أنظمة الـ SaaS وOdoo وفق أعلى المعايير الأخلاقية. نؤمن بأن البيانات والبرمجيات هي أدوات للبناء والتطوير، ولسنا وسيلة للتضليل أو اختراق الحريات.")}
              </p>
            </div>

            {/* Principles list */}
            <div className="space-y-6 mb-8 text-right">
              {/* Principle 1 */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-dz-gold text-lg mb-2">
                  <Check className="w-5 h-5 text-dz-green shrink-0" />
                  <span>{t("1. سيادة البيانات والامتثال المحلي (قانون 18-07)")}</span>
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mr-7">
                  {t("نمتثل بشكل صارم وكامل للقانون الجزائري 18-07 المتعلق بحماية الأشخاص الطبيعيين في مجال معالجة المعطيات ذات الطابع الشخصي. يتم تخزين ونمذجة البيانات السلوكية محلياً وآمناً بنسبة 100%.")}
                </p>
              </div>

              {/* Principle 2 */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-dz-gold text-lg mb-2">
                  <Check className="w-5 h-5 text-dz-green shrink-0" />
                  <span>{t("2. مكافحة التضليل ومقاطعة خطاب الكراهية")}</span>
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mr-7">
                  {t("نرفض قطعياً تقديم التراخيص البرمجية أو التحليلات لإطلاق حملات تهدف لنشر معلومات كاذبة أو مضللة، أو بث التفرقة، أو استهداف النسيج الاجتماعي والسياسي الجزائري بأي مساعٍ غير أخلاقية.")}
                </p>
              </div>

              {/* Principle 3 */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-dz-gold text-lg mb-2">
                  <Check className="w-5 h-5 text-dz-green shrink-0" />
                  <span>{t("3. الموافقة الصريحة والشفافية التامة")}</span>
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mr-7">
                  {t("كل البيانات التي يتم جمعها في أبحاثنا الميدانية أو استطلاعات الرأي تتم بموافقة صريحة وكاملة من المشاركين، مع حقهم الكامل في السحب أو إخفاء هويتهم من النماذج التحليلية.")}
                </p>
              </div>

              {/* Principle 4 */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-dz-gold text-lg mb-2">
                  <Check className="w-5 h-5 text-dz-green shrink-0" />
                  <span>{t("4. جودة البرمجيات والنزاهة التجارية")}</span>
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mr-7">
                  {t("نكرس خبراتنا في تنفيذ Odoo وإدارة خدمات السحاب لتمكين الشركات الجزائرية من النمو الهيكلي السليم، وتسهيل توسع المستثمرين الأجانب برؤية واضحة وموثوقة.")}
                </p>
              </div>
            </div>

            {/* Footer inside Modal */}
            <div className="flex justify-end pt-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-dz-gold hover:bg-dz-gold-light text-dz-darker font-bold transition-all"
              >
                {t("موافق ومغلق")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
