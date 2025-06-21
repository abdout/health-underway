import { getUserByEmail } from "@/components/auth/user";
import { LoginSchema } from "@/components/auth/validation";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          username: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: new Date(),
        };
      },
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "email,public_profile"
        }
      },
      userinfo: {
        url: "https://graph.facebook.com/me",
        params: {
          fields: "id,name,email,picture"
        },
        async request({ tokens, provider }: { tokens: any; provider: any }) {
          console.log("=== Facebook Userinfo Request ===");
          console.log("Access Token:", tokens.access_token ? "present" : "missing");
          
          if (!tokens.access_token) {
            throw new Error("No access token received from Facebook");
          }

          const url = `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${tokens.access_token}`;
          
          try {
            const response = await fetch(url);
            console.log("Facebook API Response Status:", response.status);
            
            if (!response.ok) {
              const errorText = await response.text();
              console.error("Facebook API Error:", errorText);
              throw new Error(`Facebook API error: ${response.status} - ${errorText}`);
            }
            
            const profile = await response.json();
            console.log("Facebook Profile Success:", { id: profile.id, name: profile.name, email: profile.email });
            return profile;
          } catch (error) {
            console.error("Facebook Profile Fetch Error:", error);
            throw error;
          }
        }
      },
      profile(profile) {
        console.log("=== Facebook Profile Mapping ===");
        console.log("Raw profile:", profile);
        
        const mappedProfile = {
          id: profile.id,
          username: profile.name || "Facebook User",
          email: profile.email || null,
          image: profile.picture?.data?.url || null,
          emailVerified: profile.email ? new Date() : null,
        };
        
        console.log("Mapped profile:", mappedProfile);
        return mappedProfile;
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
} satisfies NextAuthConfig