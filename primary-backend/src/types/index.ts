import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string().min(5).max(20),
    password: z.string().min(8).max(20),
    email: z.string().email(),
});

export const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
});

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(
        z.object({
            availableActionId: z.string(),
            actionMetadata: z.any().optional(),
        })
    ),
})

