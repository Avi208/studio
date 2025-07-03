import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative h-[80dvh] w-full">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Lush hills of Chikmagalur"
        fill
        className="object-cover"
        data-ai-hint="chikmagalur hills"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-background sm:text-5xl md:text-6xl lg:text-7xl">
          Experience Tranquility
        </h1>
        <h2 className="mt-4 font-headline text-2xl font-bold tracking-tight text-background sm:text-3xl md:text-4xl">
          in the Heart of Coffee Country
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-background/90">
          A cozy homestay nestled in the lush, misty hills of Chikmagalur.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="#booking">Book Your Stay</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
