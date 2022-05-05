export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
    },
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'reference',
      to: { type: 'user' },
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [{ type: 'like' }],
    },
    {
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      of: [{ type: 'downloads' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
