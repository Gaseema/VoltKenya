import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getIsMobile } from "@/lib/device";
import { Navbar, Footer } from "@/components/web/layout-components";
import BottomNav from "@/components/mobile/BottomNav";
import MobileHeader from "@/components/mobile/MobileHeader";
import { AuthProvider } from "@/components/shared/AuthProvider";
import { CartProvider } from "@/components/shared/CartProvider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "VoltKenya - Ride Electric Today",
  description:
    "Kenya's leading electric motorcycle platform with flexible Lipa Pole Pole financing.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = await getIsMobile();

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background-light"
      >
        <AuthProvider>
          <CartProvider>
            {isMobile ? (
              <div className="flex flex-col min-h-screen">
                <MobileHeader />
                <main className="flex-1 max-w-md mx-auto w-full pb-24 px-4">
                  {children}
                </main>
                <BottomNav />
              </div>
            ) : (
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            )}
            <Toaster position="top-center" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
