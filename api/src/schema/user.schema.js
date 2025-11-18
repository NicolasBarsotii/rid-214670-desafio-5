import { z } from 'zod';

const userSchema = z.object({
    username: z.string().min(3, 'Username is required'),
    email: z.string().email('invalid email'),
    password: z.string().min(6, 'password must be at least 6 characters long'),
    avatar: z.string().url('inavalid url').optional()
})

const userIdSchema = z.object({
    userId: z.number().int().positive('User ID must be a positive integer'),
});

export {userSchema, userIdSchema};