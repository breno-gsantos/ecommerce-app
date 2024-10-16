'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { formSchema } from "@/schemas";
import { z } from "zod";

export async function createStore(values: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(values);
  if (!validatedFields.success) {
    return {success: false, error: validatedFields.error.flatten().fieldErrors as string}
  }

  const session = await auth();
  if (!session?.user || !session.user.email || !session.user.id) {
    return {error: 'User not found'}
  }

  const { name } = validatedFields.data;
  if (!name) {
    return {error: 'Name is required'}
  }

  try {
    const store = await db.store.create({
      data: {
        name,
        userId: session.user.id
      }
    });

    return {success: 'Store created!', store}
  } catch (error) {
    console.log('[CREATE_STORE]', error)
    return {sucess: false, error: 'User not found'}
  }
}