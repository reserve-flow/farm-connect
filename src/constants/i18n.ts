export type Lang = "fa" | "en";

export const DEFAULT_LANG: Lang = "fa";
export const SUPPORTED_LANGS: readonly Lang[] = ["fa", "en"] as const;

export function resolveLang(lang?: string | null): Lang {
  if (!lang) return DEFAULT_LANG;
  const normalized = lang.toLowerCase();
  return SUPPORTED_LANGS.includes(normalized as Lang)
    ? (normalized as Lang)
    : DEFAULT_LANG;
}

export function toggleLang(current: Lang): Lang {
  return current === "fa" ? "en" : "fa";
}

export const navLabels = {
  harvests: { fa: "موجودی", en: "Lots" },
  trust: { fa: "چطور؟", en: "How" },
  story: { fa: "چرا", en: "Why" },
} as const;

export const footerLabels = {
  transparencyLine: {
    fa: "اگر شفافیت ناراحت‌کننده است، این پلتفرم برای شما ساخته نشده است.",
    en: "If transparency feels uncomfortable, this platform may not be for you.",
  },
  copyright: {
    fa: "تمام حقوق محفوظ است.",
    en: "All rights reserved.",
  },
  story: { fa: "داستان", en: "Story" },
  trustManifesto: { fa: "بیانیه اعتماد", en: "Trust Manifesto" },
  terms: { fa: "قوانین و مسئولیت‌ها", en: "Terms & Responsibility" },
  contact: { fa: "تماس", en: "Contact" },
  title: { fa: "نوبینج", en: "FarmConnect" },
} as const;
