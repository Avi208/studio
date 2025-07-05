"use client";

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Loader2, Award, ChevronsUpDown, Check } from 'lucide-react';
import { handleFeedbackSubmit } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from '@/lib/utils';

// Zod schema for validation
const feedbackFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')),
  rating: z.coerce.number().min(1, { message: "Please provide a rating." }).max(5),
  feedback: z.string().min(10, { message: "Feedback must be at least 10 characters." }),
  survey: z.object({
    cleanliness: z.coerce.number().min(1).max(5),
    hospitality: z.coerce.number().min(1).max(5),
    location: z.coerce.number().min(1).max(5),
    value: z.coerce.number().min(1).max(5),
  }),
  suggestions: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

export type Feedback = FeedbackFormValues & {
  id: string;
  timestamp: { seconds: number; nanoseconds: number } | null;
};

interface FeedbackPageClientProps {
  initialFeedback: Feedback[];
}

const StarRatingInput = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-8 w-8 cursor-pointer transition-colors",
            star <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          )}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
};

const filterOptions = [
  { value: 0, label: "All Ratings" },
  { value: 5, label: "5 Stars" },
  { value: 4, label: "4 Stars" },
  { value: 3, label: "3 Stars" },
  { value: 2, label: "2 Stars" },
  { value: 1, label: "1 Star" },
];


export default function FeedbackPageClient({ initialFeedback }: FeedbackPageClientProps) {
  const { toast } = useToast();
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(initialFeedback);
  const [filter, setFilter] = useState<number>(0);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: '',
      email: '',
      rating: 0,
      feedback: '',
      survey: {
        cleanliness: 3,
        hospitality: 3,
        location: 3,
        value: 3,
      },
      suggestions: '',
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    const optimisticFeedback: Feedback = {
      ...data,
      id: `temp-${Date.now()}`,
      timestamp: null, // Temp null timestamp
    };
    setFeedbackList(prev => [optimisticFeedback, ...prev]);
    
    const result = await handleFeedbackSubmit(data);

    if (result.success) {
      toast({
        title: 'Success!',
        description: result.message,
      });
      form.reset();
      // The list will be updated by the revalidation from the server action.
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
      // remove optimistic feedback on failure
      setFeedbackList(prev => prev.filter(fb => fb.id !== optimisticFeedback.id));
    }
  };

  const filteredFeedback = useMemo(() => {
    if (filter === 0) return feedbackList;
    return feedbackList.filter(fb => fb.rating === filter);
  }, [feedbackList, filter]);

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">Share Your Experience</h1>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Your feedback helps us grow and improve. We'd love to hear about your stay with us!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <div className="p-8 border rounded-lg bg-card shadow-lg">
            <h3 className="text-2xl font-headline font-semibold mb-6">Leave a Review</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Name (Optional)</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email (Optional)</FormLabel><FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="rating" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overall Rating</FormLabel>
                    <FormControl><StarRatingInput value={field.value} onChange={field.onChange} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="feedback" render={({ field }) => (
                  <FormItem><FormLabel>Your Feedback</FormLabel><FormControl><Textarea placeholder="Tell us about your experience..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <div>
                  <h4 className="text-lg font-semibold mb-4">Detailed Survey</h4>
                  <div className="space-y-4">
                    <FormField control={form.control} name="survey.cleanliness" render={({ field }) => (
                      <FormItem><FormLabel>Cleanliness: {field.value}</FormLabel><FormControl><Slider defaultValue={[3]} min={1} max={5} step={1} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="survey.hospitality" render={({ field }) => (
                      <FormItem><FormLabel>Hospitality: {field.value}</FormLabel><FormControl><Slider defaultValue={[3]} min={1} max={5} step={1} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="survey.location" render={({ field }) => (
                      <FormItem><FormLabel>Location: {field.value}</FormLabel><FormControl><Slider defaultValue={[3]} min={1} max={5} step={1} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="survey.value" render={({ field }) => (
                      <FormItem><FormLabel>Value for Money: {field.value}</FormLabel><FormControl><Slider defaultValue={[3]} min={1} max={5} step={1} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl></FormItem>
                    )} />
                  </div>
                </div>

                <FormField control={form.control} name="suggestions" render={({ field }) => (
                  <FormItem><FormLabel>Suggestions for Improvement (Optional)</FormLabel><FormControl><Textarea placeholder="How can we make your next stay even better?" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Feedback'}
                </Button>
              </form>
            </Form>
          </div>

          {/* Feedback Display */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-headline font-semibold">Guest Reviews</h3>
              
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="w-[200px] justify-between">
                        {filter > 0 ? filterOptions.find(f => f.value === filter)?.label : "Filter by rating..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search ratings..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {filterOptions.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        onSelect={() => setFilter(option.value)}
                                    >
                                        <Check className={cn("mr-2 h-4 w-4", filter === option.value ? "opacity-100" : "opacity-0")}/>
                                        {option.label}
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

            </div>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
              {filteredFeedback.length > 0 ? (
                filteredFeedback.map(fb => (
                  <Card key={fb.id} className="shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {fb.name || 'Anonymous'}
                            {fb.rating === 5 && <Award className="h-5 w-5 text-amber-500" />}
                          </CardTitle>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn("h-4 w-4", i < fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{fb.timestamp ? new Date(fb.timestamp.seconds * 1000).toLocaleDateString() : "Just now"}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-foreground/90 italic">"{fb.feedback}"</p>
                      {fb.suggestions && <p className="mt-2 text-sm text-foreground/70"><strong className="font-semibold">Suggestions:</strong> {fb.suggestions}</p>}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground text-center pt-8">No reviews yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
