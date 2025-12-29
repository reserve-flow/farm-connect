import type { Lang } from "./i18n";

export type CopyKey =
	| "hero"
	| "howTrustWorks"
	| "howTrustWorksDetail"
	| "liveCommitmentsTitle"
	| "manifesto"
	| "story"
	| "ctaStory";

type CopyBlock<T> = Record<Lang, T>;

export const copy: Record<CopyKey, CopyBlock<any>> = {
	hero: {
		fa: {
			titleLine1: "برنج را مستقیم از کشاورز رزرو کنید.",
			titleLine2: "بدون واسطه. بدون پرداخت در پلتفرم.",
			titleLine3: "اعتماد، به‌صورت عمومی ساخته می‌شود.",
			primaryCta: "مشاهده برداشت‌های فعال",
			secondaryCta: "اعتماد چگونه کار می‌کند؟",
		},
		en: {
			titleLine1: "Reserve rice directly from the farmer.",
			titleLine2: "No middlemen. No platform payments.",
			titleLine3: "Trust is built in public.",
			primaryCta: "View active harvests",
			secondaryCta: "How trust works",
		},
	},
	howTrustWorks: {
		fa: [
			{ title: "کشاورزان انتخاب‌شده", text: "فقط کشاورزان دعوت‌شده با هویت مشخص." },
			{ title: "تعهدات عمومی", text: "مقدار و زمان تحویل ثبت و عمومی می‌شود." },
			{ title: "سابقه دائمی", text: "نتیجه تحویل همیشه قابل مشاهده است." },
		],
		en: [
			{ title: "Selected farmers", text: "Invite-only. Real identities." },
			{ title: "Public commitments", text: "Quantity and delivery window are recorded." },
			{ title: "Permanent track record", text: "Delivery outcomes remain visible." },
		],
	},
	howTrustWorksDetail: {
		en: [
			"We log every commitment publicly, so anyone can see when a farmer promises a delivery and when it is fulfilled or missed.",
			"Reservations are simple requests — no payments on the platform — and each outcome is recorded with time and reporter.",
			"Repeated failures surface as suspension flags; they stay visible so buyers know the history before reserving.",
		],
		fa: [
			"ما هر تعهد را به‌صورت عمومی ثبت می‌کنیم تا همه ببینند کشاورز چه زمانی قول تحویل می‌دهد و تحویل یا عدم تحویل چه زمانی رخ می‌دهد.",
			"رزرو فقط درخواست ساده است و هیچ پرداختی روی پلتفرم انجام نمی‌شود؛ هر نتیجه با زمان و گزارش‌کننده ثبت می‌شود.",
			"شکست‌های تکراری به شکل پرچم تعلیق نمایش داده می‌شود و در دید می‌ماند تا خریدار قبل از رزرو تاریخچه را ببیند.",
		],
	},
	liveCommitmentsTitle: {
		fa: "برداشت‌های در حال رزرو",
		en: "Active harvest commitments",
	},
	manifesto: {
		fa: {
			title: "نقش ما فقط اعتماد است.",
			points: [
				"پولی دریافت نمی‌کنیم",
				"فروشنده نیستیم",
				"تعهدات را عمومی ثبت می‌کنیم",
				"خلف وعده پنهان نمی‌شود",
			],
			cta: "داستان این پلتفرم",
		},
		en: {
			title: "Our role is trust — nothing else.",
			points: [
				"We don’t handle money",
				"We don’t sell rice",
				"We record public commitments",
				"Failures are never hidden",
			],
			cta: "Read our story",
		},
	},
	ctaStory: {
		fa: "داستان این پلتفرم",
		en: "Read our story",
	},
	story: {
		fa: {
			intro: "این پلتفرم برای ساختن اعتماد میان خریدار و کشاورز به‌وجود آمده، نه برای فروش یا دریافت پول.",
			body: [
				"از یک زمستان پر از وعده‌های ناتمام شروع شد؛ خریداران سردرگم بودند و کشاورزان بی‌سند اعتماد نمی‌گرفتند.",
				"تصمیم گرفتیم همه چیز را ثبت کنیم: هر تعهد، هر تحویل، هر شکست با زمان و گزارش‌کننده.",
				"پول در پلتفرم جابجا نمی‌شود؛ تنها شفافیت و سوابق ماندگار ارائه می‌شود تا تصمیم‌گیری آسان‌تر شود.",
			],
			outro: {
				before: "اگر می‌خواهید به این ثبت عمومی بپیوندید یا نقدی دارید، همینجا بگویید. این پروژه با ",
				linkText: "بازخورد",
				after: " شما کامل می‌شود.",
			},
		},
		en: {
			intro: "This platform exists to build trust between buyers and farmers — not to sell, not to handle money.",
			body: [
				"It started after a winter of missed promises; buyers were left hanging and farmers couldn’t prove their reliability.",
				"We chose to record everything: each commitment, every delivery, every failure with time and reporter.",
				"No payments flow through us; we only provide transparency and a durable record so decisions get easier.",
			],
			outro: {
				before: "If you want to join the public ledger or challenge it, tell us. The project improves with your ",
				linkText: "feedback",
				after: ".",
			},
		},
	},
};

export function t<T>(key: CopyKey, lang: Lang): T {
	return copy[key][lang] as T;
}
