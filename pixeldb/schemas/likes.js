export default {
  name: 'like',
  title: 'Like',
  type: 'document',
  fields: [
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
    },
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: { type: 'user' },
    },
  ],
}
