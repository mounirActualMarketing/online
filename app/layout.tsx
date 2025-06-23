import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto-kufi-arabic",
});

export const metadata: Metadata = {
  title: "Wall Street English - تعلم الانجليزي من أي مكان",
  description: "احترف اللغة الإنجليزية مع أفضل المدرسين والطرق التفاعلية الحديثة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoKufiArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
