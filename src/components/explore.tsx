import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const places = [
  {
    name: 'Mullayanagiri Peak',
    image: { src: 'https://placehold.co/600x400.png', alt: 'Mullayanagiri Peak', aiHint: 'scenic mountain peak' },
  },
  {
    name: 'Baba Budangiri',
    image: { src: 'https://placehold.co/600x400.png', alt: 'Baba Budangiri', aiHint: 'mountain shrine' },
  },
  {
    name: 'Hebbe Falls',
    image: { src: 'https://placehold.co/600x400.png', alt: 'Hebbe Falls', aiHint: 'cascading waterfall' },
  },
  {
    name: 'Kudremukh National Park',
    image: { src: 'https://placehold.co/600x400.png', alt: 'Kudremukh National Park', aiHint: 'wildlife park' },
  },
  {
    name: 'Coffee Museum',
    image: { src: 'https://placehold.co/600x400.png', alt: 'Coffee Museum', aiHint: 'coffee museum' },
  },
  {
    name: 'Bhadra Wildlife Sanctuary',
    image: { src: 'https://placehold.co/600x400.png', alt: 'Bhadra Wildlife Sanctuary', aiHint: 'wildlife sanctuary' },
  },
  {
    name: 'Hirekolale Lake',
    image: { src: 'https://placehold.co/600x400.png', alt: 'Hirekolale Lake', aiHint: 'serene lake' },
  },
];

export default function Explore() {
  return (
    <section id="explore" className="py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Discover the Best of Chikmagalur</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Our homestay is the perfect base to explore the natural wonders and attractions of Chikmagalur.
          </p>
        </div>
        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent>
            {places.map((place) => (
              <CarouselItem key={place.name} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="relative flex aspect-[4/3] items-end justify-center p-6">
                      <Image
                        src={place.image.src}
                        alt={place.image.alt}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        data-ai-hint={place.image.aiHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <h3 className="relative z-10 text-xl font-headline font-semibold text-white">
                        {place.name}
                      </h3>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
