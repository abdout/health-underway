import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { DefaultSession } from "next-auth"
import { db } from "@/lib/db"
import { getUserById } from "@/components/auth/user"
import { getTwoFactorConfirmationByUserId } from "@/components/auth/verification/2f-confirmation"
import { getAccountByUserId } from "@/components/auth/account"
import authConfig from "./auth.config"
import { validateEnv } from "@/lib/env-check"

// Validate environment variables
validateEnv();

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: UserRole
      isTwoFactorEnabled: boolean
      isOAuth: boolean
    } & DefaultSession["user"]
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  // Add proper trustHost configuration for production
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  // Use environment variable for URL
  ...(process.env.NEXTAUTH_URL && { url: process.env.NEXTAUTH_URL }),
  events: {
    async linkAccount({ user, account }) {
      console.log("OAuth account linked:", { 
        userId: user.id,
        email: user.email, 
        provider: account.provider 
      });
      if (user.id) {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() }
        })
      }
    },
    async signIn({ user, account, isNewUser }) {
      console.log("Sign-in event:", { 
        userId: user.id, 
        email: user.email,
        provider: account?.provider,
        isNewUser
      });
      
      // Facebook-specific logging
      if (account?.provider === "facebook") {
        console.log("Facebook sign-in details:", {
          accessToken: account.access_token ? "present" : "missing",
          providerAccountId: account.providerAccountId,
          type: account.type
        });
      }
    },
    async createUser({ user }) {
      console.log("User created:", { userId: user.id, email: user.email });
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Enhanced logging for debugging
      console.log("=== SignIn Callback Debug ===");
      console.log("Provider:", account?.provider);
      console.log("User ID:", user.id);
      console.log("User Email:", user.email);
      
      if (account?.provider === "facebook") {
        console.log("Facebook Profile:", {
          id: profile?.id,
          name: profile?.name,
          email: profile?.email,
          verified: profile?.email_verified
        });
        console.log("Facebook Account:", {
          access_token: account.access_token ? "present" : "missing",
          token_type: account.token_type,
          expires_at: account.expires_at
        });
      }
      
      if (!user.id) {
        console.error("SignIn failed: No user ID");
        return false;
      }
      
      if (account?.provider !== "credentials") {
        console.log("OAuth sign-in successful for provider:", account?.provider);
        return true;
      }

      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) {
        console.error("SignIn failed: Email not verified for user:", user.id);
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) {
          console.error("SignIn failed: 2FA confirmation missing for user:", user.id);
          return false;
        }

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }

      console.log("SignIn successful for user:", user.id);
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = !!token.isTwoFactorEnabled
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.isOAuth = !!token.isOAuth
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  // Enable debug for Facebook issues
  debug: process.env.NODE_ENV === "development" || process.env.DEBUG_NEXTAUTH === "true",
  
  // Add error logging
  logger: {
    error(code: any, metadata?: any) {
      console.error("=== NextAuth Error ===");
      console.error("Error Code:", code);
      console.error("Metadata:", metadata);
      console.error("=== End NextAuth Error ===");
    },
    warn(code: any) {
      console.warn("NextAuth Warning:", code);
    },
    debug(code: any, metadata?: any) {
      if (process.env.DEBUG_NEXTAUTH === "true") {
        console.log("NextAuth Debug:", code, metadata);
      }
    }
  },
  
  ...authConfig,
})