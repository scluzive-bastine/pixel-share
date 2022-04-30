export default {
  name: 'followers',
  title: 'Followers',
  type: 'document',
  fields: [
    {
      name: 'followers',
      title: 'Followers',
      type: 'number',
    },
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: { type: 'user' },
    },
  ],
}
