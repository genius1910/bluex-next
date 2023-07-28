import { AvailableLangs  } from "@/fetchers/types"

export async function generateStaticParams() {
  return AvailableLangs.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { lang: string },
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  )
}
