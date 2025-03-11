/**
 * @file MailInfoLink.tsx
 * @description 시스템 발송 링크 통합
 */
import { useRouter } from 'next/router'

import Loader from '~/components/common/ui/Loader'
import { useMailInfoLink } from '~/utils/hooks/contents/mailInfoLink/useMailInfoLink'

const MailInfoLink = () => {
  const { isLoading } = useMailInfoLink()

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

export default MailInfoLink
