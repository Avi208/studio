import { Mountain, Coffee, Bird, Flame, Tractor, Gamepad2, Droplets } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const activities = [
  {
    icon: Coffee,
    title: 'Coffee Plantation Walks',
    description: 'Stroll through our lush coffee estate and learn about the bean-to-cup journey.',
  },
  {
    icon: Mountain,
    title: 'Guided Treks',
    description: 'Embark on an adventurous trek to nearby peaks like Mullayanagiri or Baba Budangiri.',
  },
  {
    icon: Bird,
    title: 'Bird Watching',
    description: 'Discover the diverse avian life that inhabits the hills of Chikmagalur.',
  },
  {
    icon: Flame,
    title: 'Campfire & Barbecue',
    description: 'Enjoy a cozy evening with a warm campfire and delicious barbecue under the stars.',
  },
  {
    icon: Tractor,
    title: 'Jeep Rides',
    description: 'Experience a thrilling off-road jeep ride through the scenic estate trails.',
  },
  {
    icon: Gamepad2,
    title: 'Indoor/Outdoor Games',
    description: 'We have a variety of games to keep you entertained during your stay.',
  },
  {
    icon: Droplets,
    title: 'Waterfall Visits',
    description: 'Visit spectacular nearby waterfalls like Hebbe Falls and Jhari Falls.',
  },
];

const ActivityCard = ({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) => (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-headline text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-foreground/70">{description}</p>
      </div>
    </div>
);


export default function Activities() {
  return (
    <section id="activities" className="py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Things to Do During Your Stay</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            From serene walks to adventurous treks, there's something for everyone at Serene Stays.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>
      </div>
    </section>
  );
}
