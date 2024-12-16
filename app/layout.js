import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PT Indomonang Jadi | Client Website",
  description: "Generated by create next app",
};

const roboto = Roboto({ weight: "400" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} flex flex-col antialiased min-h-screen `}
      >
        {children}
      </body>
    </html>
  );
}
