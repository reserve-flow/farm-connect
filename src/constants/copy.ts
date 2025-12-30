import type { Lang } from "./i18n";

export type CopyKey =
	| "hero"
	| "howTrustWorks"
	| "howTrustWorksDetail"
	| "liveCommitmentsTitle"
	| "manifesto"
	| "story"
	| "ctaStory"
	| "terms";

type CopyBlock<T> = Record<Lang, T>;

export const copy: Record<CopyKey, CopyBlock<any>> = {
	hero: {
		fa: {
			titleLine1: "برنج را مستقیم از کشاورز رزرو کنید.",
			titleLine2: "بدون واسطه. بدون پرداخت در پلتفرم.",
			titleLine3: "اعتماد، به‌صورت عمومی ساخته می‌شود.",
			primaryCta: "مشاهده برداشت‌های فعال",
			secondaryCta: "بیانیه اعتماد",
		},
		en: {
			titleLine1: "Reserve rice directly from the farmer.",
			titleLine2: "No middlemen. No platform payments.",
			titleLine3: "Trust is built in public.",
			primaryCta: "View active harvests",
			secondaryCta: "Trust",
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
	terms: {
		fa: {
			summaryTitle: "خلاصه (حتماً بخوانید)",
			summaryItems: [
				"پلتفرم فروشنده، خریدار یا واسطه پرداخت نیست.",
				"پرداخت‌ها بیرون از پلتفرم و مستقیم بین خریدار و کشاورز انجام می‌شود؛ پول نگه‌داری یا بازپرداخت نمی‌شود.",
				"تعهدات و نتیجه تحویل عمومی، زمان‌دار و دائمی هستند؛ حذف یا ویرایش نمی‌شوند.",
				"مسئولیت تصمیم خرید بر عهده خریدار است.",
			],
			sections: [
				{
					title: "۱. نقش پلتفرم",
					body: "این پلتفرم فروشنده نیست، خریدار نیست و واسطه پرداخت نیست. نقش آن فقط انتخاب کشاورزان، ثبت تعهدات و نمایش نتایج است.",
				},
				{
					title: "۲. پرداخت‌ها",
					body: "تمام پرداخت‌ها، در صورت انجام، خارج از پلتفرم و مستقیم بین خریدار و کشاورز انجام می‌شود.",
					bullets: ["پول دریافت نمی‌کند", "پول نگه نمی‌دارد", "بازپرداخت انجام نمی‌دهد"],
				},
				{
					title: "۳. تعهدات و سابقه",
					body: "تعهدات ثبت‌شده عمومی، زمان‌دار و غیرقابل حذف یا ویرایش هستند. نتیجه تحویل (انجام شد / انجام نشد) دائمی نمایش داده می‌شود.",
				},
				{
					title: "۴. پاسخ‌گویی",
					body: "در صورت عدم انجام تعهد، نتیجه عمومی می‌ماند و حساب کشاورز ممکن است تعلیق شود. پلتفرم داور سابقه است، نه ضامن معامله.",
				},
				{
					title: "۵. مسئولیت خریدار",
					body: "مسئولیت تصمیم خرید بر عهده خریدار است. استفاده از پلتفرم به معنی پذیرش این نقش است.",
					emphasis: "اگر اعتماد از بین برود، این پلتفرم دلیلی برای وجود ندارد.",
				},
				{
					title: "۶. شفافیت و همکاری قانونی",
					body: "در صورت نیاز حقوقی، پلتفرم تمام سوابق ثبت‌شده مرتبط را در چارچوب قوانین کشور محل فعالیت در اختیار مراجع قرار می‌دهد. این پلتفرم پنهان یا ناشناس نیست و بر مبنای اعتماد و شفافیت عمل می‌کند.",
				},
			],
		},
		en: {
			summaryTitle: "Summary (read this first)",
			summaryItems: [
				"The platform is not a seller, buyer, or payment intermediary.",
				"Payments happen off-platform directly between buyer and farmer; funds are never held or refunded here.",
				"Commitments and delivery outcomes are public, time-stamped, and permanent; they cannot be edited or removed.",
				"Purchase decisions are the buyer’s responsibility.",
			],
			sections: [
				{
					title: "1. Platform role",
					body: "The platform is not a seller, not a buyer, and not a payment intermediary. Its sole role is curating farmers, recording commitments, and displaying outcomes.",
				},
				{
					title: "2. Payments",
					body: "All payments, if any, occur outside the platform directly between buyer and farmer.",
					bullets: ["Does not receive funds", "Does not hold funds", "Does not issue refunds"],
				},
				{
					title: "3. Commitments & records",
					body: "Recorded commitments are public, time-stamped, and not editable or removable. Delivery outcomes (delivered / not delivered) remain visible permanently.",
				},
				{
					title: "4. Accountability",
					body: "If a commitment is not fulfilled, the outcome stays public and the farmer account may be suspended. The platform is a record keeper, not a guarantor of transactions.",
				},
				{
					title: "5. Buyer responsibility",
					body: "Purchase decisions are the buyer’s responsibility. Using the platform signals acceptance of this role.",
					emphasis: "If trust breaks, this platform has no reason to exist.",
				},
				{
					title: "6. Transparency & legal cooperation",
					body: "If lawful action requires it, the platform will provide all recorded evidence of the transaction within the laws of the operating country. The platform is transparent, not hidden, and runs on a trust-first model.",
				},
			],
		},
	},
};

export function t<T>(key: CopyKey, lang: Lang): T {
	return copy[key][lang] as T;
}
