import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

type SessionPayload = {
    userId: string;
    expiresAt: string;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const payload: SessionPayload = {
    userId,
    expiresAt: expiresAt.toISOString(), // Store as string
  };

  const session = await encrypt(payload);

  const cookieStore = cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSession() {
    cookies().delete("session");
}

export async function encrypt(payload : SessionPayload) {
    return new SignJWT(payload) 
        .setProtectedHeader({ alg: "HS256" }) //Hashing algorithm
        .setIssuedAt()
        .setExpirationTime("7d") // expires in 7 days
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    // Verify the JWT Token
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);//Get error -> If session expired
  }
}