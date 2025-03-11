import { useRouter } from 'next/router'

import Loader from '~/components/common/ui/Loader'
import { useSharedLink } from '~/utils/hooks/contents/shared/useSharedLink'

const SharedLink = () => {
  const { isLoading } = useSharedLink()

  if (isLoading)
    return (
      <div>
        <Loader
          screen={'absolute'}
          size={'s48'}
        />
      </div>
    )
  return <div></div>
}

export default SharedLink
