'use server'

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/user";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.flatten().fieldErrors as string }
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {error: "Email doesn't exist"}
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    return {success: 'Logged In!'}
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' }
        default: 
          return {error: 'Something went wrong'}
      }
    }
    throw error
  }
}