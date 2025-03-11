import { Fragment } from 'react'

interface Props {
  isOpen: boolean
}
const SearchLimitAlarm = (props: Props) => {
  return (
    <Fragment>
      {props.isOpen && (
        <div className="header-notification__group">
          <div
            className="notification-header__section colors-alert-border button-type1"
            style={{ background: '#fff', borderBottom: '1px solid #d9dbdb' }}
          >
            <div className="notification-header__group">
              <div className="notification-header__contents">
                <p style={{ color: '#000' }}>
                  검색 결과가 더 있으나 시스템 성능을 위하여 더 이상은 보여주지 않습니다. 원하는 결과가 포함되지
                  않았다면 검색옵션을 바꾸어 다시 시도해 보세요.
                </p>{' '}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default SearchLimitAlarm
