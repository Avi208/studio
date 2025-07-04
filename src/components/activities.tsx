import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const activities = [
  {
    title: 'Coffee Plantation Tour',
    description: 'Walk through the lush coffee estates, learn about the bean-to-cup process, and taste fresh coffee.',
    image: {
      src: 'https://placehold.co/600x400.png',
      alt: 'Coffee Plantation',
      aiHint: 'coffee plantation'
    }
  },
  {
    title: 'Nature Walk & Trekking',
    description: 'Explore the scenic beauty of the Western Ghats with our guided nature walks and trekking trails.',
    image: {
      src: 'https://placehold.co/600x400.png',
      alt: 'Trekking in hills',
      aiHint: 'nature trail'
    }
  },
  {
    title: 'Bird Watching',
    description: 'A paradise for bird lovers. Spot a variety of exotic birds in their natural habitat around our property.',
    image: {
      src: 'https://placehold.co/600x400.png',
      alt: 'Bird watching with binoculars',
      aiHint: 'bird watching'
    }
  },
  {
    title: 'Rain Dance',
    description: 'Cool off and have a blast with our exciting rain dance setup, complete with music to get you moving.',
    image: {
      src: 'https://placehold.co/600x400.png',
      alt: 'Rain dance party',
      aiHint: 'rain dance'
    }
  },
  {
    title: 'Campfire with Music',
    description: 'Enjoy a classic campfire experience under the stars, with live music to set the mood.',
    image: {
      src: 'https://placehold.co/600x400.png',
      alt: 'Campfire with music',
      aiHint: 'campfire music'
    }
  }
];

export default function Activities() {
  return (
    <section id="activities" className="py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Things to Do During Your Stay</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            From relaxing swims to exciting nights by the fire, there's something for everyone at Serene Stays.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <Card key={activity.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                 <Image
                  src={activity.image.src}
                  alt={activity.image.alt}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                  data-ai-hint={activity.image.aiHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl mb-2">{activity.title}</CardTitle>
                <CardDescription>{activity.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
