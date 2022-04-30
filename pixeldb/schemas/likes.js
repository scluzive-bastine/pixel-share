export default {
  name: 'likes',
  title: 'Likes',
  type: 'document',
  fields: [
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: { type: 'post' },
    },
  ],
}
