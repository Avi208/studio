import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer id="contact" className="bg-primary/95 text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-xl font-headline font-semibold">Serene Stays</h3>
            <p className="text-primary-foreground/80">
              Your perfect getaway in the lush hills of Chikmagalur. We look forward to welcoming you.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-headline font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="tel:+911234567890" className="hover:underline">Phone: +91 12345 67890</a></li>
              <li><a href="mailto:contact@serenestays.com" className="hover:underline">Email: contact@serenestays.com</a></li>
              <li><a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp: +91 12345 67890</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-headline font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-primary-foreground/60 border-t border-primary-foreground/20 pt-8">
            <p>&copy; {new Date().getFullYear()} Serene Stays, Chikmagalur. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
