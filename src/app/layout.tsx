import './globals.css'
import type { Metadata } from 'next'
import "@fontsource/lato";
import "@fontsource/inter";

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return <>{children}</>
}
