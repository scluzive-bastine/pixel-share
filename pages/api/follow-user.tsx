import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'


export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2021-03-25',
}

const client = sanityClient(config);
export default async function FollowUser(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { user, follower } = JSON.parse(req.body);
        client.patch(user).setIfMissing({ followers: [] }).insert('after', 'followers[-1]', [{
        followers: 1,
        _key: uuidv4(),
        user: {
            _type: 'reference',
            _ref: follower
        }
    }]).commit()
    .then((data) => {
        res.status(200).json({
            success: true,
            data
        })
    }).catch((error) => {
        res.status(500).json({
            success: false,
            error
        })
    })
    
}