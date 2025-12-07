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
  title: "Bateram no MetroBus! - Dias sem acidentes em Coimbra",
  description: "Quantos dias passaram desde que alguém bateu no Metrobus em Coimbra? Um contador dos acidentes causados por outros condutores ao Metro Mondego.",
  keywords: ["metrobus", "coimbra", "acidentes", "metro mondego", "portugal", "bateram no metrobus"],
  openGraph: {
    title: "Bateram no MetroBus!",
    description: "Quantos dias passaram desde que alguém bateu no Metrobus em Coimbra?",
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
