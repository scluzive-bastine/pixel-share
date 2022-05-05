import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2021-03-25',
}

const client = sanityClient(config)
export default async function CreateComment(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { id, user, comment } = JSON.parse(req.body)

    const doc = {   
        _type: 'comment',
        post: {
            _type: 'reference',
            _ref: id
        },
        user: {
            _type: 'reference',
            _ref: user
        },
        comment: comment,

    }
    try {
        await client.create(doc).then(() => {
            res.status(200).json({
                success: true
            })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error })
        
    }

}

