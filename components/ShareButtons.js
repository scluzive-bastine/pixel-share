import { useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
} from 'react-share'
import { HiLink } from 'react-icons/hi'
import Success from './alerts/Success'

const ShareButtons = ({ title: name, id }) => {
  const SHARE_URL = process.env.NEXT_PUBLIC_HOST + `/post/${id}`
  const [copied, setCopied] = useState(false)

  const handlCopyText = () => {
    navigator.clipboard.writeText(SHARE_URL)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 10000)
  }

  return (
    <div>
      <h1 className="mb-2 flex text-sm uppercase md:hidden">Share</h1>
      <div className="grid-cols-5 items-center gap-2 md:grid">
        <div>
          <FacebookShareButton url={SHARE_URL} quote={name}>
            <div className="flex space-x-2">
              <FacebookIcon size={26} />{' '}
              <span className="flex md:hidden">Facebook</span>
            </div>
          </FacebookShareButton>
        </div>
        <div>
          <TwitterShareButton url={SHARE_URL} title={name}>
            <div className="flex space-x-2">
              <TwitterIcon size={26} />{' '}
              <span className="flex md:hidden">Twitter</span>
            </div>
          </TwitterShareButton>
        </div>
        <div>
          <LinkedinShareButton url={SHARE_URL} title={name}>
            <div className="flex space-x-2">
              <LinkedinIcon size={26} />{' '}
              <span className="flex md:hidden">LinkedIn</span>
            </div>
          </LinkedinShareButton>
        </div>
        <div>
          <PinterestShareButton url={SHARE_URL} media={SHARE_URL}>
            <div className="flex space-x-2">
              <PinterestIcon size={26} />{' '}
              <span className="flex md:hidden">Pinterest</span>
            </div>
          </PinterestShareButton>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="-mt-1 flex h-[26px] w-[26px] cursor-pointer items-center justify-center bg-blue-500"
            onClick={handlCopyText}
          >
            <HiLink className="text-white" />
          </div>
          <span className="flex md:hidden">Copy</span>
        </div>
      </div>
      {copied && <Success message="Link copied to clipboard" />}
    </div>
  )
}

export default ShareButtons
