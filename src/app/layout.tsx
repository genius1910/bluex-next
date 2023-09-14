import "@fontsource/inter";
import "@fontsource/lato";
import type { Metadata } from 'next';
import './globals.css'; // Specify weight and style

export const metadata: Metadata = {
  title: 'BlueX Trade',
  description: 'Welcome to BlueX',
}

// keep root layout empty because we do not know what language is being used when renderering it
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return( <>{children}</>)
}
