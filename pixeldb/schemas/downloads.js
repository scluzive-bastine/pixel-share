export default {
  name: 'downloads',
  title: 'Downloads',
  type: 'document',
  fields: [
    {
      name: 'downloads',
      title: 'Downloads',
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
