import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import Providers from "./providers";
import { BottomNav } from "@/components/BottomNav";
import "../styles/globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const vazirmatn = Vazirmatn({
	subsets: ["arabic"],
	variable: "--font-vazirmatn",
	display: "swap",
});


//TODO SEO
export const metadata: Metadata = {
	title: "خرید مستقیم برنج از کشاورز",
	description: "رزرو مستقیم برنج از کشاورز تائید شده - برنج باکیفیت فریدونکنار - پیش خرید برنج شمال - قیمت مناسب برنج - برنج تضمینی",
	authors: [{ name: "RiceDirect" }],
	openGraph: {
		title: "RiceDirect - Reserve Premium Rice Direct from Farmers",
		description:
			"Reserve premium rice directly from verified farmers. Pre-order your harvest with transparent pricing and quality assurance.",
		type: "website",
		images: ["https://lovable.dev/opengraph-image-p98pqg.png"],//TODO update image
	},
	twitter: {
		card: "summary_large_image",
		site: "@RiceDirect",
		images: ["https://lovable.dev/opengraph-image-p98pqg.png"],//TODO update image
	},
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fa" dir="rtl">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Vazirmatn:wght@400;500;600;700&display=swap" rel="stylesheet" />

				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>

			</head>
			<body className={`${inter.variable} ${vazirmatn.variable} antialiased bg-background text-foreground`}>
				<Providers>
					<main className="flex-1 w-full">
						{children}
					</main>
					<BottomNav />
				</Providers>
			</body>
		</html>
	);
}
