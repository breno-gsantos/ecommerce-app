import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(1, 'Password is required')
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters.").max(50, { message: "Name cannot exceed 50 characters." }),
  email: z.string().email("Email is required."),
  password: z.string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number." )
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords do not match.",
});


export const formSchema = z.object({
  name: z.string().min(1, 'Required')
})

export const updateStoreSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1)
})

export const deleteStoreSchema = z.object({
  id: z.string().uuid()
})