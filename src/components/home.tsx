// import Image from 'next/image'
// import Link from 'next/link'
import Header from '@/components/Header'
// import ConsoleLog from '@/components/console-log'
import FrontMainSection from '@/components/main-section'
import FrontContents from "@/constants/mockup/front-contents";

export default function Home() {
  return (
    <main>
      <Header />
      <FrontMainSection contents={FrontContents} />
    </main>
  )
}
