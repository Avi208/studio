import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Your Home in the Hills</h2>
            <p className="text-foreground/80">
              Welcome to Serene Stays, your personal retreat in the beautiful landscapes of Chikmagalur. Founded by our family with a passion for hospitality and a deep love for nature, our homestay is more than just a place to stay—it's an experience. We believe in offering a warm, personal touch that makes you feel right at home.
            </p>
            <p className="text-foreground/80">
              Our property is nestled amidst a thriving coffee estate, offering you a chance to wake up to the aroma of fresh coffee and the soothing sounds of nature. What makes us unique is our commitment to sustainable, eco-friendly practices and our dedication to sharing the rich local culture and cuisine with our guests. Come, be a part of our family and create memories that will last a lifetime.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Homestay Exterior"
              width={600}
              height={400}
              className="rounded-lg shadow-md aspect-video object-cover"
              data-ai-hint="homestay exterior"
            />
            <Image
              src="https://placehold.co/600x400.png"
              alt="Homestay Interior"
              width={600}
              height={400}
              className="rounded-lg shadow-md aspect-video object-cover"
              data-ai-hint="cozy interior"
            />
             <Image
              src="https://placehold.co/600x400.png"
              alt="Homestay Surroundings"
              width={600}
              height={400}
              className="rounded-lg shadow-md aspect-video object-cover"
              data-ai-hint="lush surroundings"
            />
             <Image
              src="https://placehold.co/600x400.png"
              alt="View from room"
              width={600}
              height={400}
              className="rounded-lg shadow-md aspect-video object-cover"
              data-ai-hint="mountain view"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
