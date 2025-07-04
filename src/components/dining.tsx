import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

const diningInfo = {
  breakfast: {
    title: 'Breakfast',
    items: ['Idli & Vada', 'Masala Dosa', 'Akki Roti', 'Freshly Brewed Coffee'],
  },
  lunch: {
    title: 'Lunch',
    items: ['Authentic Veg Thali', 'Flavorful Non-Veg Thali', 'Sambar & Rasam', 'Steamed Rice'],
  },
  dinner: {
    title: 'Dinner',
    items: ['Soft Chapatis', 'Rich Paneer & Chicken Curry', 'Aromatic Rice', 'Homemade Dessert'],
  },
};

export default function Dining() {
  return (
    <section id="food" className="py-12 md:py-24 bg-primary/5">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Delicious Local Cuisine</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Savor the authentic taste of Malnad cuisine, prepared with love and the freshest local ingredients.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 md:col-span-2 flex items-center">
            <Image 
              src="/creative_food_collage_600x800.jpg"
              alt="Local Cuisine"
              width={600}
              height={800}
              className="rounded-lg shadow-lg object-cover w-full h-full"
              data-ai-hint="indian food platter"
            />
          </div>
          <div className="lg:col-span-2 md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">{diningInfo.breakfast.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/80">
                  {diningInfo.breakfast.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">{diningInfo.lunch.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/80">
                    {diningInfo.lunch.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">{diningInfo.dinner.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-foreground/80">
                    {diningInfo.dinner.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>
            <div className="flex items-center gap-4 p-4 border-l-4 border-accent bg-accent/10 rounded-r-lg">
                <Leaf className="h-8 w-8 text-accent"/>
                <p className="font-semibold text-foreground">
                    All our meals are home-cooked with fresh ingredients sourced from local farms.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
