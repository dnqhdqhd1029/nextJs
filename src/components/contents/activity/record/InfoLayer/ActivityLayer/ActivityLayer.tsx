import Button from '~/components/common/ui/Button'
import OwnerItem from '~/components/common/ui/OwnerItemActivity'
import Tooltips from '~/components/common/ui/Tooltips'
import { getShareCodeShortNm } from '~/components/contents/activity/common/defaultData'
import { getActionDataProps } from '~/stores/modules/contents/activity/activityList'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { getDateFormat } from '~/utils/common/date'
import { downloadCompanyFile } from '~/utils/common/file'
import { openToast } from '~/utils/common/toast'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'

const ActivityLayer = () => {
  const {
    getActionData,
    userSelectGroup,
    timeZone,
    userInfo,
    activityOwnerLayer,
    activityOwnerGroup,
    setActivityOwnerLayerAction,
    getActivityOwnerLayer,
    setOwnerPopupAction,
    setTagFilterSearch,
    ownerFunction,
  } = useRecordActivity()

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
                    {getActionData && getActionData.category !== 'NOTE' && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">상태</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">{getActionData?.stateName}</p>
                        </dd>
                      </>
                    )}
                    {getActionData?.dueAt && getActionData.dueAt !== '' && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">날짜</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">{getDateFormat(timeZone, getActionData.dueAt, true)}</p>
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
                    {getActionData?.journalistList && getActionData?.journalistList.length > 0 && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">언론인</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            {getActionData?.journalistList.map(e => (
                              <li key={'ActivitySearch_getActionData?.journalistList' + e.email}>
                                <Tooltips
                                  tooltipId={'tt1'}
                                  tooltipPlace={'top'}
                                  tooltipHtml={`${e?.mediaName || ''} ${e?.department || ''} ${e?.position || ''}`}
                                  tooltipContents={e?.name || ''}
                                  url={`/contacts/record/${Number(e.journalistId) || 0}`}
                                />
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </>
                    )}
                    {getActionData?.mediaList && getActionData?.mediaList.length > 0 && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">매체</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            {getActionData?.mediaList.map(e => (
                              <li key={'ActivitySearch_getActionData?.mediaList' + e.description}>
                                <Tooltips
                                  tooltipId={'tt1'}
                                  tooltipPlace={'top'}
                                  tooltipContents={e?.name || ''}
                                  url={`/media/record/${Number(e.mediaId) || 0}`}
                                />
                              </li>
                            ))}
                          </ul>
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
                    {getActionData?.regisAt && (
                      <>
                        <dt>
                          <p className="dl-table-type1__text">생성일</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">{getDateFormat(timeZone, getActionData.regisAt, true)}</p>
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
                              {getDateFormat(timeZone, getActionData.updateAt, true)}
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
            {/*<li>*/}
            {/*  <div className="import-info__group">*/}
            {/*    <h6 className="import-info__title">본문</h6>*/}
            {/*    <div className="import-info__contents">*/}
            {/*      {getActionData?.content && (*/}
            {/*        <div*/}
            {/*          dangerouslySetInnerHTML={{*/}
            {/*            __html: DOMPurify.sanitize(getActionData?.content?.replaceAll('ruby-text', 'block'), {*/}
            {/*              ADD_ATTR: ['target', 'rel'],*/}
            {/*            }),*/}
            {/*          }}*/}
            {/*        />*/}
            {/*      )}*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</li>*/}
          </ul>
        </div>
      </li>
    </>
  )
}

export default ActivityLayer
