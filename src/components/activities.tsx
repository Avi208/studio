import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const activities = [
  {
    title: 'Chess and Carrom',
    description: 'Challenge your mind with a strategic game of chess, and classic game of carrom in a cozy setting, Perfect for relaxing evenings at the homestay.',
    image: {
      src: '/chess_carrom.jpg',
      alt: 'Coffee Plantation',
      aiHint: 'Challenge your mind with a strategic game of chess, and classic game of carrom in a cozy setting, Perfect for relaxing evenings at the homestay.'
    }
  },
  {
    title: 'Shuttle Badminton',
    description: 'Stay active and energized with a lively game of shuttle badminton in the fresh outdoor air. Perfect for friendly matches and fun moments with fellow guests.',
    image: {
      src: '/badminton.jpeg',
      alt: 'Trekking in hills',
      aiHint: 'nature trail'
    }
  },
  {
    title: 'Swimming Pool',
    description: 'Take a refreshing dip and unwind with a relaxing swim surrounded by nature. Perfect for cooling off and enjoying leisurely moments during your stay.',
    image: {
      src: '/swimming_pool.jpeg',
      alt: 'Bird watching with binoculars',
      aiHint: 'bird watching'
    }
  },
  {
    title: 'Rain Dance',
    description: 'Cool off and have a blast with our exciting rain dance setup, complete with music to get you moving.',
    image: {
      src: '/rain_dance.jpg',
      alt: 'Rain dance party',
      aiHint: 'rain dance'
    }
  },
  {
    title: 'Campfire with Music',
    description: 'Enjoy a classic campfire experience under the stars, with live music to set the mood.',
    image: {
      src: '/fire_camp.jpeg',
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
            From relaxing swims to exciting nights by the fire, there's something for everyone at The Bee Hive Home Stay.
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
