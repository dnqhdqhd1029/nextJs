import { Fragment } from 'react'
import cn from 'classnames'
import moment from 'moment'

import Popup from '~/components/common/ui/Popup'
import { useMonitoringClipbookSearch } from '~/utils/hooks/contents/monitoring/useClipbookSearch'

const ClipBookDetailPopup = () => {
  const { licenseInfo, clipbookDetailPopup, setClipbookDetailPopupAction } = useMonitoringClipbookSearch()

  return (
    <Popup
      isOpen={clipbookDetailPopup.isOpen}
      title={'상세 정보'}
      onClose={() =>
        setClipbookDetailPopupAction({
          isOpen: false,
          data: null,
        })
      }
      width={500}
      hasCloseButton
      showFooter={false}
    >
      <dl className="dl-table-type1__section">
        <dt>
          <p className="dl-table-type1__text">이름</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">{clipbookDetailPopup.data !== null && clipbookDetailPopup.data.title}</p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">뉴스</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {clipbookDetailPopup.data !== null &&
              clipbookDetailPopup.data.newslist &&
              clipbookDetailPopup.data.prlist &&
              clipbookDetailPopup.data.newslist?.length + clipbookDetailPopup.data.prlist?.length}
            개
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">유형</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {clipbookDetailPopup.data !== null && clipbookDetailPopup.data.categoryName !== '' ? '커버리지' : '일반'}
          </p>
        </dd>
        {licenseInfo?.flagShare && (
          <>
            <dt>
              <p className="dl-table-type1__text">공유</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                {clipbookDetailPopup.data !== null && clipbookDetailPopup.data.shareCodeNm}
              </p>
            </dd>
            <dt>
              <p className="dl-table-type1__text">소유자</p>
            </dt>
            <dd>
              <p className="dl-table-type1__text">
                {clipbookDetailPopup.data !== null && clipbookDetailPopup.data?.owner?.displayName}
              </p>
            </dd>
          </>
        )}
        <dt>
          <p className="dl-table-type1__text">수정자</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {clipbookDetailPopup.data !== null && clipbookDetailPopup.data?.updater?.displayName}
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">생성일</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {clipbookDetailPopup.data !== null && moment(clipbookDetailPopup.data.regisAt).format('YYYY-MM-DD HH:mm')}
          </p>
        </dd>
        <dt>
          <p className="dl-table-type1__text">수정일</p>
        </dt>
        <dd>
          <p className="dl-table-type1__text">
            {clipbookDetailPopup.data !== null && moment(clipbookDetailPopup.data.updateAt).format('YYYY-MM-DD HH:mm')}
          </p>
        </dd>
        {clipbookDetailPopup.data !== null &&
          clipbookDetailPopup.data.pressReleaseInfo &&
          clipbookDetailPopup.data.pressReleaseInfo.length > 0 &&
          clipbookDetailPopup.data.pressReleaseInfo.map((e, index) => (
            <Fragment key={'clipbookDetailPopup.data.prlist' + e}>
              <dt>
                <p className="dl-table-type1__text">{index === 0 && '보도자료'}</p>
              </dt>
              <dd>
                <a
                  //@ts-ignore
                  href={`/activity/record/${Number(e?.actionId) || 0}`}
                  className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`, `colors-${'primary'}`)}
                >
                  <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                    {e.title.toString()}
                  </span>
                </a>
              </dd>
            </Fragment>
          ))}
      </dl>
    </Popup>
  )
}

export default ClipBookDetailPopup
