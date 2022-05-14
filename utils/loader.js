import ContentLoader from 'react-content-loader'

export const PostsLoader = (props) => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={'100%'}
        height={'100%'}
        viewBox="0 0 1571 1002"
        backgroundColor="#f3f3f3"
        foregroundColor="#DFDFDF"
        {...props}
        className="hidden md:flex"
      >
        <rect x="0" y="1" rx="16" ry="16" width="291" height="400" />
        <path d="M 55 415 h 91 v 10 H 55 z" />
        <circle cx="21" cy="431" r="21" />
        <path d="M 55 431 h 130 v 20 H 55 z" />
        <rect x="320" y="1" rx="16" ry="16" width="291" height="336" />
        <path d="M 375 364 h 91 v 10 h -91 z" />
        <circle cx="341" cy="380" r="21" />
        <path d="M 375 380 h 130 v 20 H 375 z" />
        <rect x="1280" y="481" rx="16" ry="16" width="291" height="336" />
        <path d="M 1335 844 h 91 v 10 h -91 z" />
        <circle cx="1301" cy="860" r="21" />
        <path d="M 1335 860 h 130 v 20 h -130 z" />
        <rect x="640" y="0" rx="16" ry="16" width="291" height="512" />
        <path d="M 695 540 h 91 v 10 h -91 z" />
        <circle cx="661" cy="556" r="21" />
        <path d="M 695 556 h 130 v 20 H 695 z" />
        <rect x="320" y="425" rx="16" ry="16" width="291" height="512" />
        <path d="M 375 965 h 91 v 10 h -91 z" />
        <circle cx="341" cy="981" r="21" />
        <path d="M 375 981 h 130 v 20 H 375 z" />
        <rect x="960" y="1" rx="16" ry="16" width="291" height="222" />
        <path d="M 1015 246 h 91 v 10 h -91 z" />
        <circle cx="981" cy="262" r="21" />
        <path d="M 1015 262 h 130 v 20 h -130 z" />
        <rect x="0" y="476" rx="16" ry="16" width="291" height="222" />
        <path d="M 55 721 h 91 v 10 H 55 z" />
        <circle cx="21" cy="737" r="21" />
        <path d="M 55 737 h 130 v 20 H 55 z" />
        <rect x="640" y="616" rx="16" ry="16" width="291" height="156" />
        <path d="M 695 801 h 91 v 10 h -91 z" />
        <circle cx="661" cy="817" r="21" />
        <path d="M 695 817 h 130 v 20 H 695 z" />
        <rect x="1280" y="1" rx="16" ry="16" width="291" height="400" />
        <path d="M 1335 415 h 91 v 10 h -91 z" />
        <circle cx="1301" cy="431" r="21" />
        <path d="M 1335 431 h 130 v 20 h -130 z" />
        <rect x="961" y="308" rx="16" ry="16" width="291" height="400" />
        <path d="M 1016 722 h 91 v 10 h -91 z" />
        <circle cx="982" cy="738" r="21" />
        <path d="M 1016 738 h 130 v 20 h -130 z" />
      </ContentLoader>

      {/* mobile */}
      <ContentLoader
        speed={2}
        width={'100%'}
        height={'100%'}
        viewBox="0 0 350 1410"
        backgroundColor="#f3f3f3"
        foregroundColor="#DFDFDF"
        {...props}
        className="mt-10 block md:hidden"
      >
        <path d="M 1 0 h 347 v 476.976 H 1 z M 53 524 h 108.512 v 11.924 H 53 z M 53 492 h 155.017 v 23.849 H 53 z" />
        <circle cx="22" cy="514" r="22" />
        <rect x="2" y="573" rx="20" ry="20" width="347" height="197" />
        <path d="M 54 825 h 108.512 v 11.924 H 54 z M 54 793 h 155.017 v 23.849 H 54 z" />
        <circle cx="23" cy="815" r="22" />
        <path d="M 3 874 h 347 v 476.976 H 3 z M 55 1398 h 108.512 v 11.924 H 55 z M 55 1366 h 155.017 v 23.849 H 55 z" />
        <circle cx="24" cy="1388" r="22" />
      </ContentLoader>
    </>
  )
}
