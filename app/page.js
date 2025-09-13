'use client';
import LogisticsServices from '@/components/Home/OurServices';
import Hero from '../components/Home/Hero';
import TServices from '@/components/Home/TransportServices';
import Testimonial from '@/components/Home/Testimonial';
import WhoAreWe from '@/components/Home/WhoAreWe';
import BlogInsights from '@/components/Home/BlogInsights';
import FeatureCards from '@/components/Home/features-cards';
import Process from '@/components/Home/proccess';
import DirtBikeTransport from '@/components/Home/DirtBikeTransport';
import PopularDestinations from '@/components/Home/PopularDestinations';
import RegionalWebsites from '@/components/Home/RegionalWebsites';

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoAreWe />
      <LogisticsServices />
      <DirtBikeTransport />
      <BlogInsights />
      <Process />
      {/* <FeatureCards /> */}
      {/* <TServices /> */}
      <Testimonial />
      <PopularDestinations />
      <RegionalWebsites />
    </main>
  );
}
