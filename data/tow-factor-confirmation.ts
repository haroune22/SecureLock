import { db } from "@/lib/db";


export const getTwoFactorConfirmationByUserId = async (userId: string)=> {
    try {
        const TwoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where:{
                userId
            }
        })
        return TwoFactorConfirmation
    } catch (error) {
        return null
    }
};