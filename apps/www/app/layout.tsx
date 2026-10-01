import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
import { SiteHeader } from "../components/site/header";
import { SiteFooter } from "../components/site/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GeoCN — Open-Source Geographic UI Registry",
    template: "%s | GeoCN",
  },
  description:
    "Open-source geographic UI registry and cartographic component ecosystem for React and Next.js, built on copy-and-own principles.",
  keywords: [
    "geographic ui",
    "shadcn",
    "maps",
    "gis",
    "cartography",
    "react",
    "nextjs",
    "d3-geo",
    "topojson",
    "geojson",
  ],
  authors: [{ name: "GeoCN Maintainers" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
