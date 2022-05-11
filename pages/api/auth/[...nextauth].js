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
      const username = session.session.user.name.split(' ')
      const slug = username[0].toLowerCase() + '-' + username[1].toLowerCase()

      session.token = session.token.sub
      session.session.user.slug = slug

      // const slug = session.
      const user = {
        _id: session.token,
        _type: 'user',
        name: session.session.user.name,
        email: session.session.user.email,
        image: session.session.user.image,
        slug: slug,
      }
      // client
      //   .createIfNotExists(user)
      //   .then(() => {
      //     // console.log('User created')
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })

      return { session }
    },
  },
  //   pages: {
  //     signIn: '/auth/signin',
  //   },
})
