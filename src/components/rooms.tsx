import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const roomsData = [
  {
    name: 'The Coffee Bloom Suite',
    description: 'A spacious suite offering panoramic views of the coffee plantations. Perfect for families or small groups.',
    price: '₹5,000',
    amenities: ['King Size Bed', 'Private Balcony', 'Wi-Fi', 'Hot Water', 'Room Service'],
    image: {
      src: 'https://placehold.co/600x400.png',
      alt: 'Coffee Bloom Suite',
      aiHint: 'luxury suite'
    }
  },
  {
    name: 'Misty Valley Room',
    description: 'A cozy room with a view of the mist-covered valleys. Ideal for couples seeking a romantic getaway.',
    price: '₹4,000',
    amenities: ['Queen Size Bed', 'Valley View', 'Wi-Fi', 'Hot Water', 'Kettle'],
    image: {
      src: 'https://placehold.co/600x400.png',
      alt: 'Misty Valley Room',
      aiHint: 'cozy bedroom'
    }
  },
  {
    name: 'The Planter\'s Cottage',
    description: 'A charming, rustic cottage that gives you an authentic estate living experience.',
    price: '₹4,500',
    amenities: ['Attached Sit-out', 'Garden Access', 'Wi-Fi', 'Hot Water', 'Bonfire Access'],
    image: {
      src: 'https://placehold.co/600x400.png',
      alt: 'The Planter\'s Cottage',
      aiHint: 'rustic cottage'
    }
  }
];

export default function Rooms() {
  return (
    <section id="rooms" className="py-12 md:py-24 bg-primary/5">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Comfort Meets Nature</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Each of our rooms is designed to offer a unique blend of comfort and a deep connection with the natural world around us.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsData.map((room) => (
            <Card key={room.name} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={room.image.src}
                  alt={room.image.alt}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                  data-ai-hint={room.image.aiHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl mb-2">{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
                <div className="mt-4 space-y-2">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="text-sm text-foreground/80">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 bg-muted/50 flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-primary">{room.price}</span>
                  <span className="text-sm text-foreground/70"> / night</span>
                </div>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <a href="#booking">Check Availability</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
