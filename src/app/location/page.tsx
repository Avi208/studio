import Header from '@/components/header';
import ContactFooter from '@/components/contact-footer';

export default function LocationPage() {
  // IMPORTANT: Replace this with your Google Maps embed URL
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124458.02613581177!2d75.7138328428581!3d13.321156641774312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbad96843339591%3A0x29c719119059f635!2sChikkamagaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1622543210987!5m2!1sen!2sus";

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section id="location" className="py-12 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">Our Location</h1>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                Find us nestled in the serene hills of Chikmagalur.
              </p>
            </div>
            <div className="aspect-video w-full border rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location of Serene Stays on Google Maps"
              ></iframe>
            </div>
             <div className="mt-4 text-center">
                 <p className="text-sm text-muted-foreground">
                   To update the map, replace the URL in <code className="p-1 bg-muted rounded text-xs">src/app/location/page.tsx</code> with your Google Maps embed link.
                 </p>
               </div>
          </div>
        </section>
      </main>
      <ContactFooter />
    </div>
  );
}
