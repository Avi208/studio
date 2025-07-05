import Header from '@/components/header';
import ContactFooter from '@/components/contact-footer';
import FeedbackPageClient from '@/components/feedback-page-client';
import { getFeedback } from '@/app/actions';
import { type Feedback } from '@/components/feedback-page-client';

export const dynamic = 'force-dynamic';

export default async function FeedbackPage() {
  const initialFeedback = await getFeedback() as Feedback[];

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <FeedbackPageClient initialFeedback={initialFeedback} />
      </main>
      <ContactFooter />
    </div>
  );
}
