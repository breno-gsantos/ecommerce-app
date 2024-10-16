'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { deleteStoreSchema, formSchema, updateStoreSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
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

    revalidatePath('/')

    return {success: 'Store created!', store}
  } catch (error) {
    console.log('[CREATE_STORE]', error)
    return {sucess: false, error: 'User not found'}
  }
}

export async function updateStore(values: z.infer<typeof updateStoreSchema>) {
  const validatedFields = updateStoreSchema.safeParse(values);
  if (!validatedFields.success) {
    return {success: false, error: validatedFields.error.flatten().fieldErrors}
  }

  const session = await auth();
  if (!session?.user || !session.user.email || !session.user.id) {
    return {error: 'User not found'}
  }

  const { id, name } = validatedFields.data;
  if (!id) {
    return {error: 'StoreID is required'}
  }
  if (!name) {
    return {error: 'Name is required'}
  }

  try {
    const existingStore = await db.store.findFirst({
      where: {
        id: id,
        userId: session.user.id
      }
    });

    if (!existingStore) {
      return {error: 'Store not found or you do not have permission to update'}
    }

    const updateStore = await db.store.updateMany({
      where: {
        id: id,
        userId: session.user.id
      },
      data: { name }
    });

    revalidatePath('/');

    return {success: 'Store updated!', store: updateStore}
  } catch (error) {
    console.log('[UPDATE_STORE]', error)
    return { success: false, error: 'Failed to update store' }
  }
}

export async function deleteStore(values: z.infer<typeof deleteStoreSchema>) {
  const validatedFields = deleteStoreSchema.safeParse(values);
    if (!validatedFields.success) {
      return {success: false, error: validatedFields.error.flatten().fieldErrors}
    }

  const session = await auth();
    if (!session?.user || !session.user.email || !session.user.id) {
    return {error: 'User not found'}
  }

  const { id } = validatedFields.data;

  try {
    const existingStore = await db.store.findFirst({
      where: {
        id: id,
        userId: session.user.id
      }
    });

    if (!existingStore) {
      return {error: 'Store not found or you do not have permission to update'}
    }

    await db.store.delete({
      where: {
        id
      }
    })

    revalidatePath('/');

    return {success: 'Store deleted!'}
  } catch (error) {
    console.log('[DELETE_STORE]', error)
    return { success: false, error: 'Failed to delete store' }
  }
}