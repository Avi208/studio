"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { handleBookingRequest, handleAIInquiry } from '@/app/actions';

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  checkInDate: z.date({ required_error: 'Check-in date is required.' }),
  checkOutDate: z.date({ required_error: 'Check-out date is required.' }),
  guests: z.coerce.number().min(1, { message: 'Must have at least 1 guest.' }),
  requests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const aiInquirySchema = z.object({
  inquiry: z.string().min(10, { message: 'Inquiry must be at least 10 characters.' }),
});
type AIInquiryValues = z.infer<typeof aiInquirySchema>;

export default function Booking() {
  const { toast } = useToast();
  const [aiResponse, setAiResponse] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);

  const bookingForm = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guests: 1,
    },
  });

  const aiForm = useForm<AIInquiryValues>({
    resolver: zodResolver(aiInquirySchema),
  });

  const onBookingSubmit: SubmitHandler<BookingFormValues> = async (data) => {
    const result = await handleBookingRequest(data);
    if (result.success) {
      toast({
        title: 'Request Sent!',
        description: result.message,
      });
      bookingForm.reset();
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };
  
  const onAIInquirySubmit: SubmitHandler<AIInquiryValues> = async (data) => {
    setIsAIThinking(true);
    setAiResponse('');
    const result = await handleAIInquiry(data);
    if (result.success && result.response) {
      setAiResponse(result.response);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to get AI response.',
        variant: 'destructive',
      });
    }
    setIsAIThinking(false);
  };


  return (
    <section id="booking" className="py-12 md:py-24 bg-primary/5">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary">Plan Your Stay</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            We're excited to host you. Fill out the form below to request a booking, or ask our AI assistant a question.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div className="p-8 border rounded-lg bg-card shadow-lg">
            <h3 className="text-2xl font-headline font-semibold mb-6">Booking Request</h3>
            <Form {...bookingForm}>
              <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                <FormField control={bookingForm.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your full name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={bookingForm.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={bookingForm.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={bookingForm.control} name="checkInDate" render={({ field }) => (
                        <FormItem className="flex flex-col"><FormLabel>Check-in Date</FormLabel>
                        <Popover><PopoverTrigger asChild>
                            <FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button></FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} initialFocus />
                        </PopoverContent></Popover><FormMessage /></FormItem>
                    )}/>
                    <FormField control={bookingForm.control} name="checkOutDate" render={({ field }) => (
                        <FormItem className="flex flex-col"><FormLabel>Check-out Date</FormLabel>
                        <Popover><PopoverTrigger asChild>
                            <FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button></FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date <= (bookingForm.getValues("checkInDate") || new Date())} initialFocus />
                        </PopoverContent></Popover><FormMessage /></FormItem>
                    )}/>
                </div>
                <FormField control={bookingForm.control} name="guests" render={({ field }) => (
                    <FormItem><FormLabel>Number of Guests</FormLabel><FormControl><Input type="number" min="1" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={bookingForm.control} name="requests" render={({ field }) => (
                    <FormItem><FormLabel>Special Requests</FormLabel><FormControl><Textarea placeholder="Any special requirements? (e.g., dietary needs, allergies, late check-in)" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={bookingForm.formState.isSubmitting}>
                  {bookingForm.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Booking Request'}
                </Button>
              </form>
            </Form>
          </div>
          {/* AI Inquiry */}
          <div className="p-8 border rounded-lg bg-card shadow-lg">
             <h3 className="text-2xl font-headline font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="text-accent" /> Quick Inquiry
            </h3>
            <p className="mb-4 text-foreground/70">Have a question? Ask our AI assistant for a quick response about our homestay, activities, or booking details.</p>
             <Form {...aiForm}>
              <form onSubmit={aiForm.handleSubmit(onAIInquirySubmit)} className="space-y-4">
                 <FormField control={aiForm.control} name="inquiry" render={({ field }) => (
                    <FormItem><FormLabel>Your Question</FormLabel><FormControl><Textarea placeholder="e.g., 'Do you have pet-friendly rooms?' or 'What is the best time to visit?'" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={isAIThinking}>
                  {isAIThinking ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking...</> : 'Ask AI Assistant'}
                </Button>
              </form>
            </Form>
            {(isAIThinking || aiResponse) && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">AI Response:</h4>
                {isAIThinking && <div className="space-y-2"><div className="h-4 bg-muted/50 rounded w-full animate-pulse"/><div className="h-4 bg-muted/50 rounded w-5/6 animate-pulse"/><div className="h-4 bg-muted/50 rounded w-3/4 animate-pulse"/></div>}
                {aiResponse && <div className="p-4 bg-muted/50 rounded-md text-sm whitespace-pre-wrap">{aiResponse}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
