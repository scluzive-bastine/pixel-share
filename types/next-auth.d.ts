import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    session: {
      session: {
        expires: string
        user: {
          email: string
          image: string
          name: string
        }
      }
      token: string
    }
  }
  declare module 'next-auth/jwt' {
    interface JWT {
      /** This is an example. You can find me in types/next-auth.d.ts */
      token: {
        sub: string
      }
    }
  }
}
