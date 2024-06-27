import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/db";

const redirectUrl = process.env.NEXT_PUBLIC_APP_URL as string || "http://localhost:3000";

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return Response.redirect(redirectUrl)
    }


    let dbUser = await prisma.user.findUnique({
        where: { kindeId: user?.id }
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                kindeId: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
            }
        });
    }

    return Response.redirect(redirectUrl)
}