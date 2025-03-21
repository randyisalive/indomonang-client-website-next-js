import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { AccountDataProvider } from "./admin/context/AccountDataContext";
import { AccountSettingProvider } from "./admin/context/AccountSettingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PT Indomonang Jadi | JadiCRM",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} flex flex-col antialiased min-h-screen `}
      >
        <AccountDataProvider>
          <AccountSettingProvider>{children}</AccountSettingProvider>
        </AccountDataProvider>
      </body>
    </html>
  );
}
