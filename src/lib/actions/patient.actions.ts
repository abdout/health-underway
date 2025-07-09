// src/services/users.service.ts

"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { CreateUserParams } from "../../components/patient/type";
import { parseStringify } from "../utils";
import { User } from "@prisma/client";

export const createUser = async (
  user: CreateUserParams
): Promise<User | null> => {
  try {
    const existingUser = await db.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      return existingUser;
    }

    const hashedPassword = user.password
      ? await bcrypt.hash(user.password, 10)
      : undefined;

    const newUser = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        phone: user.phone,
      },
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  if (!userId) {
    throw new Error("User ID is undefined or invalid");
  }

  // Remove MongoDB-specific length validation - cuid() generates different lengths
  if (typeof userId !== 'string' || userId.trim().length === 0) {
    throw new Error("Invalid User ID format");
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
