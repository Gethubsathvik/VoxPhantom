// Validation schemas for API requests
import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const CallInitiateSchema = z.object({
  recipientNumber: z.string().min(10, 'Invalid phone number'),
  country: z.string().optional(),
});

export const CreditsDailyBonusSchema = z.object({
  userId: z.string().uuid(),
});

export const HealthCheckSchema = z.object({
  // No parameters needed for health check
});