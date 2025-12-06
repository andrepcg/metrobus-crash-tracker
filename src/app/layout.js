import { Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "MetroBus Bateu? - Dias sem acidentes em Coimbra",
  description: "Quantos dias passaram desde o último acidente do Metrobus em Coimbra? Um contador humorístico dos acidentes do Metro Mondego.",
  keywords: ["metrobus", "coimbra", "acidentes", "metro mondego", "portugal", "metrobus bateu"],
  openGraph: {
    title: "MetroBus Bateu?",
    description: "Quantos dias passaram desde o último acidente do Metrobus em Coimbra?",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <body
        className={`${dmSans.variable} ${spaceMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
