import { Geist } from 'next/font/google'
import { Navigation } from '@/components/landing/Navigation'
import { Hero } from '@/components/landing/Hero'
import { TopicsGrid } from '@/components/landing/TopicsGrid'
import { Benefits } from '@/components/landing/Benefits'
import { Footer } from '@/components/landing/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div className={`${geistSans.variable} font-sans`}>
      <Navigation />
      <Hero />
      <TopicsGrid />
      <Benefits />
      <Footer />
    </div>
  )
}
