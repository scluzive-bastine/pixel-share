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
      <div className="grid grid-cols-5 items-center gap-2">
        <div>
          <FacebookShareButton url={SHARE_URL} quote={name}>
            <FacebookIcon size={26} />
          </FacebookShareButton>
        </div>
        <div>
          <TwitterShareButton url={SHARE_URL} title={name}>
            <TwitterIcon size={26} />
          </TwitterShareButton>
        </div>
        <div>
          <LinkedinShareButton url={SHARE_URL} title={name}>
            <LinkedinIcon size={26} />
          </LinkedinShareButton>
        </div>
        <div>
          <PinterestShareButton url={SHARE_URL} media={SHARE_URL}>
            <PinterestIcon size={26} />
          </PinterestShareButton>
        </div>
        <div
          className="-mt-1 flex h-[26px] w-[26px] cursor-pointer items-center justify-center bg-blue-500"
          onClick={handlCopyText}
        >
          <HiLink className="text-white" />
        </div>
      </div>
      {copied && <Success message="Link copied to clipboard" />}
    </div>
  )
}

export default ShareButtons
