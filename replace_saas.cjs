const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');

const tStore = {
  ar: {},
  en: {},
  fr: {}
};

const texts = [
  "صوت دزاير (Saout Dzayer)",
  "منصة استماع اجتماعي تراقب النبض العام للشارع الجزائري وتحلل المشاعر والانطباعات في الوقت الفعلي.",
  "استطلاعات ضمنية 2.0",
  "قياس الانحيازات الضمنية وردود الفعل العفوية تجاه القضايا الساخنة خارج نطاق الاستطلاعات التقليدية.",
  "برمجيات كخدمة (SaaS)",
  "مركز القيادة الرقمي",
  "لمشاريعك التواصلية الميدانية.",
  "على غرار المنصات العالمية (مثل Civis Analytics)، نقدم أول منصة سحابية جزائرية لإدارة وتحليل بيانات الجمهور. منصتنا تجمع بياناتك المشتتة، وتنقلها عبر خوارزميات الذكاء الاصطناعي وتحولها إلى رؤى وقوائم استهداف دقيقة لفريقك.",
  "تُمكنك المنصة من الاستغناء تماماً عن الإدارة التقليدية المعقدة؛ فبنقرة واحدة، يمكنك بناء قوائم مفصّلة للجمهور المستهدف، وتوجيه فرقك إلى المناطق الأكثر أهمية، ومراقبة الأداء لحظة بلحظة ضمن بيئة سحابية مؤمنة.",
  "توحيد البيانات (Identity Resolution)",
  "دمج قواعد البيانات المفتوحة، الاستبيانات، والتفاعلات في منصة مركزية موحدة.",
  "النمذجة التنبؤية (Predictive Modeling)",
  "توقع السلوكيات والانطباعات، تحديد التوجهات، ودراسة تفاعل الجمهور مع مبادراتك.",
  "التوجيه الميداني (Activation)",
  "إنشاء خرائط تحرك وتوجيه للمناضلين لاستهداف الأحياء الأكثر أهمية.",
  "استضافة سيادية محليّة",
  "بنية أمنية متوافقة تماماً مع قانون 18-07 لحماية البيانات الشخصية.",
  "احجز عرضاً تجريبياً للمنصة (Demo)",
  "بناء جمهور مستهدف (Audience Builder)",
  "بلدية: حسين داي | الفئة: متأرجحين شباب",
  "جاهز للتصدير",
  "تطابق",
  "العمر بين",
  "النمط السايكومتري:",
  "الناشط المتمرد",
  "استبعاد",
  "درجة التردد العالية في اتخاذ القرار",
  "المطابقة الكلية",
  "شخص يطابق المعايير",
  "فرصة التفاعل",
  "إرسال للميدان",
  "دزاير",
  "أناليتيكا"
];

const translationsExt = {
  en: {
    "صوت دزاير (Saout Dzayer)": "Saout Dzayer",
    "منصة استماع اجتماعي تراقب النبض العام للشارع الجزائري وتحلل المشاعر والانطباعات في الوقت الفعلي.": "Social listening platform monitoring the Algerian public pulse in real-time.",
    "استطلاعات ضمنية 2.0": "Implicit Polling 2.0",
    "قياس الانحيازات الضمنية وردود الفعل العفوية تجاه القضايا الساخنة خارج نطاق الاستطلاعات التقليدية.": "Measuring implicit biases and spontaneous reactions beyond traditional polling.",
    "برمجيات كخدمة (SaaS)": "Software as a Service (SaaS)",
    "مركز القيادة الرقمي": "Digital Command Center",
    "لمشاريعك التواصلية الميدانية.": "For your field communication projects.",
    "على غرار المنصات العالمية (مثل Civis Analytics)، نقدم أول منصة سحابية جزائرية لإدارة وتحليل بيانات الجمهور. منصتنا تجمع بياناتك المشتتة، وتنقلها عبر خوارزميات الذكاء الاصطناعي وتحولها إلى رؤى وقوائم استهداف دقيقة لفريقك.": "Similar to global platforms (like Civis Analytics), we offer the first Algerian cloud platform for audience data management. It unifies scattered data, runs AI algorithms, and generates precise targeting lists for your team.",
    "تُمكنك المنصة من الاستغناء تماماً عن الإدارة التقليدية المعقدة؛ فبنقرة واحدة، يمكنك بناء قوائم مفصّلة للجمهور المستهدف، وتوجيه فرقك إلى المناطق الأكثر أهمية، ومراقبة الأداء لحظة بلحظة ضمن بيئة سحابية مؤمنة.": "Eliminate complex traditional management. In one click, you can build detailed audience lists, direct your teams to critical areas, and monitor real-time performance in a secure cloud environment.",
    "توحيد البيانات (Identity Resolution)": "Identity Resolution",
    "دمج قواعد البيانات المفتوحة، الاستبيانات، والتفاعلات في منصة مركزية موحدة.": "Integrating open databases, surveys, and interactions into a unified central platform.",
    "النمذجة التنبؤية (Predictive Modeling)": "Predictive Modeling",
    "توقع السلوكيات والانطباعات، تحديد التوجهات، ودراسة تفاعل الجمهور مع مبادراتك.": "Predict behaviors, identify trends, and study audience reactions to your initiatives.",
    "التوجيه الميداني (Activation)": "Field Activation",
    "إنشاء خرائط تحرك وتوجيه للمناضلين لاستهداف الأحياء الأكثر أهمية.": "Create tactical maps and guide field agents to target the most crucial neighborhoods.",
    "استضافة سيادية محليّة": "Sovereign Local Hosting",
    "بنية أمنية متوافقة تماماً مع قانون 18-07 لحماية البيانات الشخصية.": "Security architecture fully compliant with Law 18-07 regarding personal data protection.",
    "احجز عرضاً تجريبياً للمنصة (Demo)": "Book a Demo",
    "بناء جمهور مستهدف (Audience Builder)": "Audience Builder",
    "بلدية: حسين داي | الفئة: متأرجحين شباب": "Hussein Dey | Category: Young Swing",
    "جاهز للتصدير": "Ready to Export",
    "تطابق": "Match",
    "العمر بين": "Age between",
    "النمط السايكومتري:": "Psychometric Type:",
    "الناشط المتمرد": "Rebel Activist",
    "استبعاد": "Exclude",
    "درجة التردد العالية في اتخاذ القرار": "High decision-making hesitation",
    "المطابقة الكلية": "Total match",
    "شخص يطابق المعايير": "individuals match criteria",
    "فرصة التفاعل": "Engagement Chance",
    "إرسال للميدان": "Send to Field",
    "دزاير": "DZ ",
    "أناليتيكا": "Analytica"
  },
  fr: {
    "صوت دزاير (Saout Dzayer)": "Saout Dzayer",
    "منصة استماع اجتماعي تراقب النبض العام للشارع الجزائري وتحلل المشاعر والانطباعات في الوقت الفعلي.": "Nouvelle plateforme d'écoute sociale surveillant en temps réel les opinions publiques (Social Listening) en Algérie.",
    "استطلاعات ضمنية 2.0": "Sondages implicites 2.0",
    "قياس الانحيازات الضمنية وردود الفعل العفوية تجاه القضايا الساخنة خارج نطاق الاستطلاعات التقليدية.": "Mesurer les biais implicites et les réactions spontanées au-delà des sondages traditionnels.",
    "برمجيات كخدمة (SaaS)": "Logiciel en tant que service (SaaS)",
    "مركز القيادة الرقمي": "Centre de Commandement Numérique",
    "لمشاريعك التواصلية الميدانية.": "Pour vos projets de communication de terrain.",
    "على غرار المنصات العالمية (مثل Civis Analytics)، نقدم أول منصة سحابية جزائرية لإدارة وتحليل بيانات الجمهور. منصتنا تجمع بياناتك المشتتة، وتنقلها عبر خوارزميات الذكاء الاصطناعي وتحولها إلى رؤى وقوائم استهداف دقيقة لفريقك.": "À l'instar des plateformes mondiales (comme Civis Analytics), nous proposons la première plateforme cloud algérienne de gestion des données du public. Elle unifie les données, applique des algorithmes d'IA et génère des listes de ciblage précises.",
    "تُمكنك المنصة من الاستغناء تماماً عن الإدارة التقليدية المعقدة؛ فبنقرة واحدة، يمكنك بناء قوائم مفصّلة للجمهور المستهدف، وتوجيه فرقك إلى المناطق الأكثر أهمية، ومراقبة الأداء لحظة بلحظة ضمن بيئة سحابية مؤمنة.": "La plateforme vous permet de vous passer de la gestion traditionnelle complexe : créez des listes ciblées, guidez vos équipes et suivez les performances en temps réel de manière sécurisée.",
    "توحيد البيانات (Identity Resolution)": "Résolution d'Identité",
    "دمج قواعد البيانات المفتوحة، الاستبيانات، والتفاعلات في منصة مركزية موحدة.": "Intégration de bases de données ouvertes, de sondages et d'interactions dans une plateforme centrale.",
    "النمذجة التنبؤية (Predictive Modeling)": "Modélisation Prédictive",
    "توقع السلوكيات والانطباعات، تحديد التوجهات، ودراسة تفاعل الجمهور مع مبادراتك.": "Prévoyez les comportements, identifiez les tendances et étudiez les réactions du public.",
    "التوجيه الميداني (Activation)": "Activation Terrain",
    "إنشاء خرائط تحرك وتوجيه للمناضلين لاستهداف الأحياء الأكثر أهمية.": "Créer des cartes de déplacement et guider les agents de terrain vers les quartiers prioritaires.",
    "استضافة سيادية محليّة": "Hébergement Local Souverain",
    "بنية أمنية متوافقة تماماً مع قانون 18-07 لحماية البيانات الشخصية.": "Architecture de sécurité conforme à la loi 18-07 relative à la protection des données personnelles.",
    "احجز عرضاً تجريبياً للمنصة (Demo)": "Réserver une Démo",
    "بناء جمهور مستهدف (Audience Builder)": "Créateur d'Audience",
    "بلدية: حسين داي | الفئة: متأرجحين شباب": "Hussein Dey | Catégorie : Jeunes Indécis",
    "جاهز للتصدير": "Prêt à Exporter",
    "تطابق": "Correspondance",
    "العمر بين": "Âge entre",
    "النمط السايكومتري:": "Type Psychométrique :",
    "الناشط المتمرد": "Militant Rebelle",
    "استبعاد": "Exclure",
    "درجة التردد العالية في اتخاذ القرار": "Forte hésitation décisionnelle",
    "المطابقة الكلية": "Correspondance totale",
    "شخص يطابق المعايير": "personnes correspondent",
    "فرصة التفاعل": "Chances d'Interaction",
    "إرسال للميدان": "Envoyer sur le terrain",
    "دزاير": "DZ ",
    "أناليتيكا": "Analytica"
  }
};

let transCode = fs.readFileSync('src/translations.ts', 'utf8');

const enAdditions = Object.entries(translationsExt.en).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n');
const frAdditions = Object.entries(translationsExt.fr).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n');

transCode = transCode.replace('"دزاير أناليتيكا": "DZ Analytica"\n  },', '"دزاير أناليتيكا": "DZ Analytica",\n' + enAdditions + '\n  },');
transCode = transCode.replace('"دزاير أناليتيكا": "DZ Analytica"\n  }', '"دزاير أناليتيكا": "DZ Analytica",\n' + frAdditions + '\n  }');

fs.writeFileSync('src/translations.ts', transCode);

let updated = code;

for (const txt of texts) {
  // Be careful with simple replace on string literal text vs inside JS expressions
  // e.g.   >text<   becomes   >{t("text")}<
  
  if (txt === "دزاير " || txt === "أناليتيكا" || txt === "دزاير" || txt === "أناليتيكا") {
     const res1 = `>{t("${txt}")}<`;
     updated = updated.split(`>${txt}<`).join(res1);
     
     const res2 = ` {t("${txt}")} `;
     updated = updated.split(` ${txt} `).join(res2);
     
     // Also for JSX children like: className="text-white">دزاير </span>
     updated = updated.split(`className="text-white">دزاير </span>`).join(`className="text-white">{t("دزاير")} </span>`);
     updated = updated.split(`className="text-dz-gold">أناليتيكا</span>`).join(`className="text-dz-gold">{t("أناليتيكا")}</span>`);
  } else {
     // general string replacement
     
     // For normal text inside JSX
     updated = updated.split(`>${txt}<`).join(`>{t("${txt.replace(/"/g, '\\"')}")}<`);
     
     // For text with trailing/leading spaces inside JSX
     // but let's just do standard replace for exact strings too
     if (updated.includes(`'${txt}'`)) updated = updated.split(`'${txt}'`).join(`t('${txt.replace(/'/g, "\\'")}')`);
     else if (updated.includes(`"${txt}"`)) updated = updated.split(`"${txt}"`).join(`t("${txt.replace(/"/g, '\\"')}")`);
     else updated = updated.split(txt).join(`{t("${txt.replace(/"/g, '\\"')}")}`);
  }
}

// Special cases that might have been mangled or missed:
updated = updated.replace(/lang === 'ar' \? "منصة استماع اجتماعي تراقب النبض العام للشارع الجزائري وتحلل المشاعر والانطباعات في الوقت الفعلي\." : "Social listening platform monitoring the Algerian public pulse in real-time\."/g, `t("منصة استماع اجتماعي تراقب النبض العام للشارع الجزائري وتحلل المشاعر والانطباعات في الوقت الفعلي.")`);

updated = updated.replace(/lang === 'ar' \? "استطلاعات ضمنية 2\.0" : "Implicit Polling 2\.0"/g, `t("استطلاعات ضمنية 2.0")`);

updated = updated.replace(/lang === 'ar' \? "قياس الانحيازات الضمنية وردود الفعل العفوية تجاه القضايا الساخنة خارج نطاق الاستطلاعات التقليدية\." : "Measuring implicit biases and spontaneous reactions beyond traditional polling\."/g, `t("قياس الانحيازات الضمنية وردود الفعل العفوية تجاه القضايا الساخنة خارج نطاق الاستطلاعات التقليدية.")`);


// fix any double {{t(...)}}
updated = updated.replace(/\{\{t\((.*?)\)\}\}/g, '{t($1)}');
// fix any >{t(...)}< instead of >{t(...)}< -> Wait, ">{" is not wrong.
// fix `{{t("استطلاعات ضمنية 2.0")}}` etc
updated = updated.replace(/\{\{t\(/g, '{t(');
updated = updated.replace(/\)\}\}/g, ')}');

fs.writeFileSync('src/App.tsx', updated);
console.log('App.tsx and translations updated.');
