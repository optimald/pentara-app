import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: 'ADMIN' | 'COACH'
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: 'ADMIN' | 'COACH'
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role?: 'ADMIN' | 'COACH'
  }
}
