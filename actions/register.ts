'use server'

import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";
import { getUserByEmail, hashPassword } from "@/utils/user";
import { z } from "zod";

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors as string }
  }

  const { name, email, password } = validatedFields.data

  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {error: 'Email already in use'}
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })
}