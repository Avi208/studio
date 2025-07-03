'use server';

import { z } from 'zod';
import { bookingInquiryResponse } from '@/ai/flows/booking-inquiry-response';

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  checkInDate: z.date(),
  checkOutDate: z.date(),
  guests: z.number().min(1),
  requests: z.string().optional(),
});

export async function handleBookingRequest(formData: unknown) {
  const parsed = bookingSchema.safeParse(formData);
  if (!parsed.success) {
    console.error("Booking validation error:", parsed.error.flatten().fieldErrors);
    return { success: false, error: "Invalid data submitted. Please check the form and try again." };
  }
  
  // In a real application, you would save this data to a database.
  console.log("New Booking Request Received:", parsed.data);
  
  return { success: true, message: "Booking request submitted successfully! We will contact you shortly to confirm." };
}

const inquirySchema = z.object({
  inquiry: z.string().min(10, "Inquiry must be at least 10 characters long."),
});

export async function handleAIInquiry(formData: { inquiry: string }) {
  const parsed = inquirySchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors.inquiry?.[0] };
  }

  try {
    const result = await bookingInquiryResponse({ inquiry: parsed.data.inquiry });
    return { success: true, response: result.response };
  } catch (e) {
    console.error("AI Inquiry Error:", e);
    return { success: false, error: "Sorry, our AI assistant is currently unavailable. Please try again later." };
  }
}
