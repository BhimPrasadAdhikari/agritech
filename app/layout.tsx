
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import I18nProvider from "@/components/I18n-provider";
import ToastProvider from "@/providers/toast-provider";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import ModalProvider from "@/providers/modal-provider";
import AuthProvider from "@/providers/auth-provider";
// import { ThemeProvider } from "@/components/theme-provider";

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
