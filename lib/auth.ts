import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer } from "better-auth/plugins";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [bearer()],
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
        defaultValue: "",
        input: false,
      },
      lastName: {
        type: "string",
        required: false,
        defaultValue: "",
        input: false,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false,
      },
    },
    fields: {
      image: "imageUrl",
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const name = user.name ?? "";
          const [firstName, ...rest] = name.split(" ");
          return {
            data: {
              ...user,
              firstName: firstName || name || "",
              lastName: rest.join(" "),
            },
          };
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;

/** Returns the current Better Auth session for server components / actions. */
export async function getServerSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Admin guard for server components and actions.
 * Returns null unless a signed-in user with the ADMIN role calls.
 */
export async function requireAdmin() {
  const session = await getServerSession();
  if (!session || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}
