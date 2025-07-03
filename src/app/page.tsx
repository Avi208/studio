import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Rooms from '@/components/rooms';
import Activities from '@/components/activities';
import Dining from '@/components/dining';
import Explore from '@/components/explore';
import Booking from '@/components/booking';
import ContactFooter from '@/components/contact-footer';

export default function Home() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Rooms />
        <Activities />
        <Dining />
        <Explore />
        <Booking />
      </main>
      <ContactFooter />
    </div>
  );
}
