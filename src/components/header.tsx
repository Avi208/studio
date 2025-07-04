import { Coffee, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#rooms', label: 'Rooms' },
  { href: '/#activities', label: 'Activities' },
  { href: '/#food', label: 'Dining' },
  { href: '/#explore', label: 'Explore' },
  { href: '/#booking', label: 'Booking' },
  { href: '/location', label: 'Location' },
];
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">The Bee Hive</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <a href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Coffee className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">Serene Stays</span>
                </a>
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
