import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie Management - Watchlist App",
  description: "Movie management application - Manage your watchlist with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
