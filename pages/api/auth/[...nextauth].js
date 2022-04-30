import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { client } from '../../../sanity'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    session: async (session) => {
      // Store user data in session
      session.token = session.token.sub
      const user = {
        _id: session.token.sub,
        _type: 'user',
        name: session.session.user.name,
        email: session.session.user.email,
        image: session.session.user.image,
      }
      //   client
      //     .createIfNotExists(user)
      //     .then(() => {
      //       console.log('User created')
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })
      return { session }
    },
  },
  //   pages: {
  //     signIn: '/auth/signin',
  //   },
})
