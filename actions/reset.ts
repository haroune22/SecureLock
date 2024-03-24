"use server"

import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { ResetSchema } from "@/lib/schemas"
import { generatePasswordResetToken } from "@/lib/tokens"
import * as z from "zod"

export const reset = async (values:z.infer<typeof ResetSchema>) => {

    const validatedFeilds = ResetSchema.safeParse(values)
    if(!validatedFeilds.success){
        return { error: "Invalid email!"}
    };

    const { email } = validatedFeilds.data;

    const existingUser = await getUserByEmail(email)

    if(!existingUser){
        return { error: "Email not found!"}
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success: "Reset email sent!"}

}