import './globals.css'
import type { Metadata } from 'next'
import "@fontsource/lato";
import "@fontsource/inter";

export const metadata: Metadata = {
  title: 'BlueX Trade',
  description: 'Welcome to BlueX',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return <>{children}</>
}
