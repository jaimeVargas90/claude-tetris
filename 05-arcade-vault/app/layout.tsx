import type { Metadata } from "next";
import { Press_Start_2P, JetBrains_Mono } from "next/font/google";
import { Nav } from "./_components/Nav";
import "./globals.css";

const pixelFont = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono-av",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcade Vault",
  description: "Portal retro para jugar online y competir por puntos y leaderboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${pixelFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="av-body min-h-full flex flex-col">
        <div className="av-bg" />
        <div className="av-noise" />
        <div id="av-root">
          <Nav />
          <main className="av-main">{children}</main>
          <footer
            className="mono"
            style={{
              textAlign: "center",
              padding: "24px 16px",
              fontSize: 11,
              color: "var(--ink-faint)",
              letterSpacing: "0.08em",
              borderTop: "1px solid var(--line-2)",
            }}
          >
            ARCADE VAULT © 2026 · TODOS LOS DERECHOS RESERVADOS
          </footer>
        </div>
      </body>
    </html>
  );
}
