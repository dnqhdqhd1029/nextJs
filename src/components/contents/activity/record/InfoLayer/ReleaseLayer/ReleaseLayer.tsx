import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import OwnerItem from '~/components/common/ui/OwnerItemActivity'
import Tooltips from '~/components/common/ui/Tooltips'
import { createReceiverInfo, getShareCodeShortNm } from '~/components/contents/activity/common/defaultData'
import { getActionDataProps } from '~/stores/modules/contents/activity/activityList'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { getDateFormat } from '~/utils/common/date'
import { downloadCompanyFile } from '~/utils/common/file'
import { openToast } from '~/utils/common/toast'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'

const ReleaseLayer = () => {
  const {
    getActionData,
    timeZone,
    userInfo,
    activityOwnerLayer,
    activityOwnerGroup,
    userSelectGroup,
    setActivityOwnerLayerAction,
    getActivityOwnerLayer,
    setOwnerPopupAction,
    setTagFilterSearch,
    ownerFunction,
  } = useRecordActivity()
  const [isOpenReceiver, setIsOpenReceiver] = useState(false)

  useEffect(() => {
    setIsOpenReceiver(() => false)
  }, [getActionData])

  return (
    <>
      <li>
        <div className="activity-detail__section">
          <ul className="interval-mt28">
            <li>
              <ul className="grid-col2 type-interval20">
                <li>
                  <dl className="dl-table-type1__section">
                    <dt>
                      <p className="dl-table-type1__text">활동 유형</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">{getActionData?.categoryName}</p>
                    </dd>
                    <dt>
                      <p className="dl-table-type1__text">상태</p>
                    </dt>
                    <dd>
                      <p className="dl-table-type1__text">
                        {getActionData?.stateName}
                        {getActionData?.dueAt &&
                          getActionData.dueAt !== '' &&
                          !(
                            (getActionData?.category === 'PRESS_RELEASE' && getActionData?.state === 'DRA_DRAFT') ||
                            getActionData?.category === 'NEWSWIRE_RELEASE'
                          ) &&
                          `(${getDateFormat(timeZone, getActionData?.dueAt || '', true)})`}
                      </p>
                    </dd>
                    {getActionData?.mailingForAction && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">보낸 사람</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">{getActionData?.mailingForAction?.sender?.name || ''}</p>
                        </dd>
                      </>
                    )}
                    {getActionData?.category && getActionData?.category !== 'NEWSWIRE_RELEASE' && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">받는 사람</p>
                        </dt>
                        <dd>
                          <div className="accordion-type3__group">
                            <div className="accordion-type3-button__group">
                              <span className="accordion-type3__label">
                                {getActionData?.mailingCount?.totalCount}명
                              </span>
                              <button
                                className="accordion-type3__button"
                                onClick={() => setIsOpenReceiver(prevState => !prevState)}
                              >
                                <span className="accordion-type3__button-txt">명단</span>
                                <span className="accordion-type3__button-ico">
                                  <IcoSvg data={icoSvgData.chevronDown} />
                                </span>
                              </button>
                            </div>
                            <div
                              className={cn('accordion-type3-panel__group', {
                                'display-block': isOpenReceiver,
                              })}
                            >
                              <ul className="accordion-type3-panel__list">
                                {getActionData?.jrnlstListList && getActionData?.jrnlstListList.length > 0 && (
                                  <li>
                                    <div className="font-body__regular">
                                      <span className="mr-4">언론인 리스트:</span>
                                      {getActionData?.jrnlstListList &&
                                        getActionData?.jrnlstListList.length > 0 &&
                                        getActionData?.jrnlstListList.map((e, index) => (
                                          <span key={`jrnlistList-${e.jrnlstListId}`}>
                                            {index > 0 && index !== getActionData?.jrnlstListList?.length && (
                                              <span>, </span>
                                            )}
                                            <a
                                              href={`/contacts/list`}
                                              className={cn(
                                                `button-${'link-text'}`,
                                                `size-${'m'}`,
                                                `colors-${'body-link'}`
                                              )}
                                            >
                                              <span
                                                className={cn(
                                                  `button__label button-${'link-text'}__label`,
                                                  `size-${'m'}`
                                                )}
                                              >
                                                {e.title ?? ''}
                                              </span>
                                            </a>
                                            <span className="ml-4">{e.journalistCount}명</span>
                                          </span>
                                        ))}
                                    </div>
                                  </li>
                                )}
                                {getActionData?.mediaListList && getActionData?.mediaListList.length > 0 && (
                                  <li>
                                    <div className="font-body__regular">
                                      <span className="mr-4">미디어 리스트:</span>
                                      {getActionData?.mediaListList &&
                                        getActionData?.mediaListList.length > 0 &&
                                        getActionData?.mediaListList.map((e, index) => (
                                          <span key={`jrnlistList-${e.mediaListId}`}>
                                            {index > 0 && index !== getActionData?.mediaListList?.length && (
                                              <span>, </span>
                                            )}
                                            <a
                                              href={`/media/list`}
                                              className={cn(
                                                `button-${'link-text'}`,
                                                `size-${'m'}`,
                                                `colors-${'body-link'}`
                                              )}
                                            >
                                              <span
                                                className={cn(
                                                  `button__label button-${'link-text'}__label`,
                                                  `size-${'m'}`
                                                )}
                                              >
                                                {e.title ?? ''}
                                              </span>
                                            </a>
                                            <span className="ml-4">
                                              {e.mediaCount}개 (이메일 {e?.emailCount}개)
                                            </span>
                                          </span>
                                        ))}
                                    </div>
                                  </li>
                                )}
                                {getActionData?.journalistList && getActionData?.journalistList.length > 0 && (
                                  <li>
                                    <div className="font-body__regular">
                                      <span className="mr-4">언론인:</span>
                                      <Tooltips
                                        key={'getActionData?.journalistList' + getActionData?.journalistList[0].email}
                                        tooltipId={'tt1'}
                                        tooltipPlace={'top'}
                                        tooltipHtml={`${getActionData?.journalistList[0]?.mediaName || ''} ${
                                          getActionData?.journalistList[0]?.department || ''
                                        } ${getActionData?.journalistList[0]?.position || ''}`}
                                        tooltipContents={getActionData?.journalistList[0]?.name || ''}
                                        url={`/contacts/record/${
                                          Number(getActionData?.journalistList[0].journalistId) || 0
                                        }`}
                                      />
                                      {getActionData?.journalistList.length > 1 && (
                                        <span className="ml-4">외 {getActionData?.journalistList?.length - 1}명</span>
                                      )}
                                    </div>
                                  </li>
                                )}
                                {getActionData?.mediaList && getActionData?.mediaList.length > 0 && (
                                  <li>
                                    <div className="font-body__regular">
                                      <span className="mr-4">미디어:</span>
                                      <Tooltips
                                        key={'getActionData?.mediaList' + getActionData?.mediaList[0].email}
                                        tooltipId={'tt1'}
                                        tooltipPlace={'top'}
                                        tooltipContents={getActionData?.mediaList[0]?.name || ''}
                                        url={`/media/record/${Number(getActionData?.mediaList[0]?.mediaId) || 0}`}
                                      />
                                      {getActionData?.mediaList.length > 1 && (
                                        <span className="ml-4">외 {getActionData?.mediaList?.length - 1}명</span>
                                      )}
                                    </div>
                                  </li>
                                )}
                                {getActionData?.extraMailList && getActionData?.extraMailList.length > 0 && (
                                  <li>
                                    <div className="font-body__regular">
                                      <span className="mr-4">메일 추가:</span>
                                      {getActionData?.extraMailList[0]}
                                      {getActionData?.extraMailList.length > 1 && (
                                        <span className="ml-4">외 {getActionData?.extraMailList?.length - 1}명</span>
                                      )}
                                    </div>
                                  </li>
                                )}
                                {getActionData?.mailingForAction && getActionData?.mailingForAction?.includeUser && (
                                  <li>
                                    <div className="me-send-email__group">
                                      <IcoSvg data={icoSvgData.checkLg} />
                                      <p className="me-send-email__text">나에게도 보내기</p>
                                    </div>
                                  </li>
                                )}
                                {[
                                  getActionData?.mailingCount?.dupCount,
                                  getActionData?.mailingCount?.blockReceiveCount,
                                  getActionData?.mailingCount?.blockSendCount,
                                  getActionData?.mailingCount?.errorSendCount,
                                ].some(v => v && v > 0) && (
                                  <>
                                    <br />
                                    <li>
                                      <div className="font-body__regular">
                                        <span>
                                          {createReceiverInfo(
                                            getActionData?.mailingCount?.dupCount || 0,
                                            getActionData?.mailingCount?.blockReceiveCount || 0,
                                            getActionData?.mailingCount?.blockSendCount || 0,
                                            getActionData?.mailingCount?.errorSendCount || 0
                                          )}{' '}
                                          제외
                                        </span>
                                      </div>
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        </dd>
                      </>
                    )}
                    <OwnerItem
                      getActionData={getActionData as getActionDataProps}
                      userInfo={userInfo}
                      activityOwnerLayer={activityOwnerLayer}
                      activityOwnerGroup={activityOwnerGroup}
                      setActivityOwnerLayerAction={setActivityOwnerLayerAction}
                      getActivityOwnerLayer={getActivityOwnerLayer}
                      setOwnerPopupAction={setOwnerPopupAction}
                      ownerFunction={ownerFunction}
                    />
                    {getActionData?.updater && getActionData?.updater.displayName && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">수정자</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            <Button
                              label={getActionData?.updater.displayName}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                              onClick={async () => {
                                if (getActionData?.updater) {
                                  const { status, message } = await apiGetOneUser(getActionData?.updater?.userId || 0)
                                  if (status === 'S') {
                                    ownerFunction(getActionData?.updater)
                                  } else {
                                    openToast(message?.message, 'error')
                                  }
                                }
                              }}
                            />
                          </p>
                        </dd>
                      </>
                    )}
                    {getActionData?.fileAttachList && getActionData?.fileAttachList.length > 0 && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">첨부</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            {getActionData?.fileAttachList.map(e => (
                              <li key={'ActivitySearch_d-link__list_files' + e.fileId}>
                                <Button
                                  elem="a"
                                  label={e?.name || ''}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-link'}
                                  onClick={() => downloadCompanyFile(e, userSelectGroup)}
                                />
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </>
                    )}
                  </dl>
                </li>
                <li>
                  <dl className="dl-table-type1__section">
                    {getActionData?.state && getActionData?.category === 'NEWSWIRE_RELEASE' && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">희망일</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {getDateFormat(timeZone, getActionData?.nwReservedAt || '', true)}
                          </p>
                        </dd>
                      </>
                    )}

                    {getActionData?.state && getActionData?.category === 'NEWSWIRE_RELEASE' && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">등록일</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {getDateFormat(timeZone, getActionData?.nwSendAt || '', true)}
                          </p>
                        </dd>
                      </>
                    )}

                    {getActionData?.state && getActionData?.category === 'NEWSWIRE_RELEASE' && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">게재일</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {getDateFormat(timeZone, getActionData?.nwPublishAt || '', true)}
                          </p>
                        </dd>
                      </>
                    )}

                    {getActionData?.state &&
                      getActionData?.state === 'FIN_COMPLETE_SENDING' &&
                      getActionData.mailingForAction && (
                        <>
                          <dt>
                            <p className="dl-table-type1__text">발송일</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">
                              {getDateFormat(timeZone, getActionData?.mailingForAction?.startAt || '', true)}
                            </p>
                          </dd>
                        </>
                      )}
                    {getActionData?.regisAt && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">생성일</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {getDateFormat(timeZone, getActionData?.regisAt, true)}
                          </p>
                        </dd>
                      </>
                    )}
                    {getActionData?.regisAt &&
                      getActionData.updateAt &&
                      getActionData?.updater &&
                      getActionData?.updater.displayName && (
                        <>
                          <dt>
                            <p className="dl-table-type1__text">수정일</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">
                              {getDateFormat(timeZone, getActionData?.updateAt, true)}
                            </p>
                          </dd>
                        </>
                      )}
                    {getActionData?.shareCode && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">공유</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            {getShareCodeShortNm(getActionData?.shareCodeNm || '')}
                          </p>
                        </dd>
                      </>
                    )}
                    {getActionData?.tagList && getActionData?.tagList.length > 0 && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">태그</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            {getActionData?.tagList.map(e => (
                              <li key={'ActivitySearch_d-link__list_tags' + e.tagId}>
                                <Button
                                  elem="a"
                                  label={e?.name || ''}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-link'}
                                  onClick={() => e.tagId && setTagFilterSearch(e.tagId.toString())}
                                />
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </>
                    )}
                  </dl>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
    </>
  )
}

export default ReleaseLayer
