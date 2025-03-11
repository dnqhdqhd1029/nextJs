import { ReactNode } from 'react'

import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'

interface Props {
  children: ReactNode
}
const NoAuthLayout = ({ children }: Props) => {
  return (
    <div className="mb-wrap layout3">
      <header className="header__section">
        <div className="header-gnb__section">
          <div
            className="header-gnb__group"
            style={{ height: '52px' }}
          >
            <MediaBeeLogo />
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
export default NoAuthLayout
