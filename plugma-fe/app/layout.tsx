import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Head from "next/head";

// Define fonts using Next.js font optimization


// Properly define metadata in Next.js 15
export const metadata: Metadata = {
  title: "plugma - luma with community analytics",
  description:
    "Create delightful events with Luma, the elegant way to host events.",
  authors: [{ name: "Sean Lai" }],
  openGraph: {
    title: "plugma, the elegant way to host events",
    description:
      "Create delightful events with plugma, the elegant way to host events.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={` antialiased`}>
        {children}
      </body>
    </html>
  );
}
