'use server';

import { z } from 'zod';
import { bookingInquiryResponse } from '@/ai/flows/booking-inquiry-response';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import { revalidatePath } from 'next/cache';

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

const feedbackSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  rating: z.number().min(1).max(5),
  feedback: z.string().min(10, "Feedback must be at least 10 characters."),
  survey: z.object({
    cleanliness: z.number().min(1).max(5),
    hospitality: z.number().min(1).max(5),
    location: z.number().min(1).max(5),
    value: z.number().min(1).max(5),
  }),
  suggestions: z.string().optional(),
});

export async function handleFeedbackSubmit(formData: unknown) {
  const parsed = feedbackSchema.safeParse(formData);
  if (!parsed.success) {
    console.error("Feedback validation error:", parsed.error.flatten().fieldErrors);
    return { success: false, error: "Invalid data submitted. Please check the form and try again." };
  }

  try {
    await addDoc(collection(db, "customer_feedback"), {
      ...parsed.data,
      timestamp: serverTimestamp(),
    });
    revalidatePath('/feedback');
    return { success: true, message: "Thank you for your feedback!" };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: "Failed to submit feedback. Please try again later." };
  }
}

export async function getFeedback() {
    try {
        const feedbackCol = collection(db, 'customer_feedback');
        const q = query(feedbackCol, orderBy('timestamp', 'desc'));
        const feedbackSnapshot = await getDocs(q);
        const feedbackList = feedbackSnapshot.docs.map(doc => {
            const data = doc.data();
            // Firestore Timestamps need to be converted to a serializable format
            const timestamp = data.timestamp ? {
                seconds: data.timestamp.seconds,
                nanoseconds: data.timestamp.nanoseconds,
            } : null;

            return {
                id: doc.id,
                ...data,
                timestamp,
            };
        });
        return feedbackList;
    } catch (error) {
        console.error("Error fetching feedback: ", error);
        return [];
    }
}
