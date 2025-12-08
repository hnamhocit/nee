import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8)
  .regex(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    "Password is too weak (need uppercase, lowercase, number/special character)",
  );

export const loginSchema = z.object({
  email: z.email(),
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "At least 3 characters")
    .max(30, "At most 30 characters"),
  email: z.email(),
  password: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
