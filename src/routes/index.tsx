import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabase';
import Header from '@/components/Header';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import HowItWorks from '@/components/Home/HowItWorks';
import Footer from '@/components/Home/Foooter';
import CTA from '@/components/Home/CTA';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  return (
   <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  )
}
