import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";

const lausanne = localFont({
    src: [
        {
            path: './fonts/lausanne/TWKLausanne-300.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/lausanne/TWKLausanne-400.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/lausanne/TWKLausanne-500.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/lausanne/TWKLausanne-600.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: './fonts/lausanne/TWKLausanne-700.woff2',
            weight: '700',
            style: 'normal',
        }
    ],
    variable: '--font-lausanne'
})

export const metadata: Metadata = {
  title: "Seth Villa",
  description: "S3th Villa Portfolio",
};

// ${geistSans.variable} ${geistMono.variable}


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body
        className={`
        ${lausanne.className}
         antialiased`}
      >
      {children}
      </body>
    </html>
  );
}
