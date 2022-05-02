import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2021-03-25',
}

const client = sanityClient(config);

export default async function createPost(
    req: NextApiRequest,
    res: NextApiResponse)
{
    
    const { name, description, category, image, user } = JSON.parse(req.body);
    const doc = {
        _type: 'post',
        name: name,
        description: description,
        category: {
            _type: 'reference',
            _ref: category
        },
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: image?._id,
          },
        },
        postedBy: {
            _type: 'reference',
            _ref: user
        }
    }
    try {
        await client.create(doc);
        res.status(200).json({
            message: 'Post created successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error occured when saving data', err
        })
        console.log(err);
        
    }
}