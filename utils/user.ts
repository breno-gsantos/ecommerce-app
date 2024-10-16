import { db } from "@/lib/db";
import bcrypt from 'bcryptjs';

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email }
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id }
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}