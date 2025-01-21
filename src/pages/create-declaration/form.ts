import { z } from "zod";

export const CreateDeclarationFormSchema = z.object({
    year: z.number().min(1900, { message: "Year must be greater than 1900" }),
    name: z
        .string()
        .min(3, { message: "Name must have at least 3 characters long." })
        .trim(),
    birthday: z.string().datetime().trim(),
    observation: z
        .string()
        .min(5, {
            message: "Observation must have at least 5 characters long.",
        })
        .trim()
        .optional(),
    declaredAmount: z.number().gte(0),
    userId: z.number(),
});
