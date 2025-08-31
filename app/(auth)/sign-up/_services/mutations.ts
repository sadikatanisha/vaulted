"use server";
import {
  signUpSchema,
  SignUpSchema,
} from "@/app/(auth)/sign-up/_types/signUpSchema";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeAction";
import { hashPassword } from "@/lib/utils";
import { Role } from "@prisma/client";

const normalizeRole = (raw?: string): Role => {
  if (!raw) return Role.BUYER;
  const r = raw.toString().toLowerCase();

  if (r === "seller" || r === "seller") return Role.SELLER;
  if (r === "buyer" || r === "buyER" || r === "user" || r === "USER")
    return Role.BUYER;
  if (r === "admin" || r === "ADMIN") return Role.ADMIN;

  return Role.BUYER;
};
const signUp = async (data: SignUpSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = signUpSchema.parse(data);
      const hashedPassword = await hashPassword(validatedData.password);

      const roleToSave = normalizeRole((validatedData as any).role);

      try {
        const user = await db.user.create({
          data: {
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
            role: roleToSave,
          },
        });
        return user;
      } catch (error) {
        console.error("User creation failed:", error);
        throw error;
      }
    },
  });
};

export { signUp };
