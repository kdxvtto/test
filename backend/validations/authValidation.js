import { z } from "zod";

const safeUserRegex = /^[a-zA-Z0-9_]+$/

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long").regex(safeUserRegex, "Username must contain only letters, numbers, and underscores").transform((value) => value.toLowerCase()),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").regex(safeUserRegex, "Username must contain only letters, numbers, and underscores").transform((value) => value.toLowerCase()),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})
