import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import I18nProvider from "@/components/I18n-provider";
import ToastProvider from "@/providers/toast-provider";
import ModalProvider from "@/providers/modal-provider";
import AuthProvider from "@/providers/auth-provider";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Agritech",
  description: "The website for farmers to improve the field outcomes",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
   return (
    <html lang="en">
    <head>
    <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_AD_CLIENT_ID}`}
     crossOrigin="anonymous"></Script>
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         
        <AuthProvider>
        <ModalProvider />
        <I18nProvider>
        <ToastProvider/>
       
        {children}

        </I18nProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
