import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Next Clerk Auth",
  description: "Clerk Authentication with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="dark antialiased">{children}</body>
      </html>
      <Toaster position="top-right" duration={2000} richColors />
    </ClerkProvider>
  );
}
