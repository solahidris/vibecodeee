import Head from 'next/head'
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
    <>
      <Head>
        <title>VibeCodeee - Premium Community Platform | Connect & Grow Together</title>
        <meta name="description" content="Join our exclusive premium community platform. Access expert resources, AI tools, prompting guides, and connect with like-minded professionals. Start your journey today." />
        <meta property="og:title" content="VibeCodeee - Premium Community Platform | Connect & Grow Together" />
        <meta property="og:url" content="https://vibecode.com" />
        <meta name="twitter:title" content="VibeCodeee - Premium Community Platform" />
      </Head>
      <div className={`${geistSans.variable} font-sans`}>
        <Navigation />
        <Hero />
        <TopicsGrid />
        <Benefits />
        <Footer />
      </div>
    </>
  )
}
