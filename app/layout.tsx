import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import ToastProvider from "@/components/common/toast";
import SessionProviderWrapper from "@/components/common/sessionProviderWrapper";

const iransansMedium = localFont({
  src: [
    {
      path: '../public/fonts/iran-sans/IRANSansXFaNum-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-sans/IRANSansXFaNum-UltraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-sans/IRANSansXFaNum-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-sans/IRANSansXFaNum-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-sans/IRANSansXFaNum-Bold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-sans/IRANSansXFaNum-ExtraBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/iran-sans/IRANSansXFaNum-Black.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-iransans',
});

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: "Chat Bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${iransansMedium.variable} font-iransans font-normal antialiased`}
      >
        <SessionProviderWrapper>
          <ToastProvider>{children}</ToastProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
