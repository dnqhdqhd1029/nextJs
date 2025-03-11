import { Fragment, useLayoutEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { useMonitoringSearchDetail } from '~/utils/hooks/contents/monitoring/useMonitoringSearchDetail'

const Notice = () => {
  const { userInfo, newsCheckDuplicateParam, newsIdParams, setNoticeClose, setSelectedDeleteData } =
    useMonitoringSearchDetail()

  if (newsCheckDuplicateParam === null || newsCheckDuplicateParam.length < 1) {
    return null
  }
  return (
    <>
      {newsCheckDuplicateParam && (
        <div className="notification-header__section colors-alert-border button-type1">
          <div className="notification-header__group">
            <div className="notification-header__contents">
              <p style={{ color: '#000' }}>URL이 동일한 시스템 제공 뉴스가 있습니다.</p>
              <p>
                <a
                  href={`/news/record/${Number(newsCheckDuplicateParam[0])}`}
                  className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                >
                  <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                    {newsCheckDuplicateParam[1] || ''}
                  </span>
                </a>{' '}
                <span className="color-secondary">{`${newsCheckDuplicateParam[2]}` ?? ''}</span>
              </p>
              {newsIdParams &&
                newsIdParams.owner &&
                newsIdParams.owner.uid &&
                userInfo.userId &&
                newsIdParams.owner.uid.toString() === userInfo.userId.toString() && (
                  <div className="flex-wrap">
                    <p>아래 뉴스를 삭제하겠습니까?</p>
                    <Button
                      label={'삭제하기'}
                      cate={'default'}
                      size={'s'}
                      color={'dark'}
                      onClick={() => setSelectedDeleteData(newsIdParams?.newsid || 0, newsIdParams?.title || '', true)}
                    />
                  </div>
                )}
            </div>
          </div>
          <div className="notification-header__btn">
            <Button
              label={'삭제'}
              cate={'ico-only'}
              size={'s24'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.iconCloseButton}
              icoSize={16}
              onClick={() => newsIdParams?.newsid && setNoticeClose(newsIdParams?.newsid)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Notice
