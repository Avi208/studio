'use server';
/**
 * @fileOverview AI tool to respond to open-ended booking requests or other customer inquiries by composing polite, informative replies.
 *
 * - bookingInquiryResponse - A function that handles the inquiry response process.
 * - BookingInquiryInput - The input type for the bookingInquiryResponse function.
 * - BookingInquiryOutput - The return type for the bookingInquiryResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookingInquiryInputSchema = z.object({
  inquiry: z.string().describe('The customer inquiry or booking request.'),
});
export type BookingInquiryInput = z.infer<typeof BookingInquiryInputSchema>;

const BookingInquiryOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the customer inquiry.'),
});
export type BookingInquiryOutput = z.infer<typeof BookingInquiryOutputSchema>;

export async function bookingInquiryResponse(input: BookingInquiryInput): Promise<BookingInquiryOutput> {
  return bookingInquiryResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bookingInquiryResponsePrompt',
  input: {schema: BookingInquiryInputSchema},
  output: {schema: BookingInquiryOutputSchema},
  prompt: `You are a customer service agent for Serene Stays in Chikmagalur. Your task is to respond to customer inquiries and booking requests in a polite and informative manner.

Here is the customer's inquiry:
{{{inquiry}}}

Please provide a helpful and friendly response. Focus on clear and concise information. Consider the customer's potential needs such as booking information, room details, activity options, and dining.
`,
});

const bookingInquiryResponseFlow = ai.defineFlow(
  {
    name: 'bookingInquiryResponseFlow',
    inputSchema: BookingInquiryInputSchema,
    outputSchema: BookingInquiryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
