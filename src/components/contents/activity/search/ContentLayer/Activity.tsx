import cn from 'classnames'
import DOMPurify from 'dompurify'

import Button from '~/components/common/ui/Button'
import OwnerItem from '~/components/common/ui/OwnerItemActivity'
import Tooltips from '~/components/common/ui/Tooltips'
import { getShareCodeShortNm } from '~/components/contents/activity/common/defaultData'
import ContentComment from '~/components/contents/activity/search/ContentComment/ContentComment'
import ContentData from '~/components/contents/activity/search/ContentData/ContentData'
import ContentHistory from '~/components/contents/activity/search/ContentHistory/ContentHistory'
import { getActionDataProps } from '~/stores/modules/contents/activity/activityList'
import { getDateFormat } from '~/utils/common/date'
import { downloadCompanyFile } from '~/utils/common/file'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'
const ActivityLayer = () => {
  const {
    userSelectGroup,
    activityId,
    getActionData,
    contentsTabList,
    contentsTab,
    timeZone,
    apiParams,
    filterSubParamActions,
    userInfo,
    activityOwnerLayer,
    activityOwnerGroup,
    ownerFunction,
    setContentsTabListAction,
    setTagFilterSearch,
    setActivityOwnerLayerAction,
    getActivityOwnerLayer,
    setOwnerPopupAction,
  } = useActivityList()

  return (
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
                        <p className="dl-table-type1__text">
                          {getDateFormat(timeZone, getActionData?.dueAt || '', true)}
                        </p>
                      </dd>
                    </>
                  )}

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
                            onClick={() => getActionData?.updater && ownerFunction(getActionData?.updater)}
                          />
                        </p>
                      </dd>
                    </>
                  )}
                  {getActionData?.jrnlstListList && getActionData?.jrnlstListList.length > 0 && (
                    <>
                      <dt>
                        <p className="dl-table-type1__text">언론인 목록</p>
                      </dt>
                      <dd>
                        <ul className="d-link__list">
                          {getActionData?.jrnlstListList.map(e => (
                            <li key={'ContentLayer_getActionData?.jrnlstListList' + e.jrnlstListId}>
                              <Tooltips
                                tooltipId={'tt1'}
                                tooltipPlace={'top'}
                                tooltipContents={e?.title || ''}
                                url={`/contacts/list-result?jrnlstList_id=${e.jrnlstListId}`}
                              />
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </>
                  )}
                  {getActionData?.mediaListList && getActionData?.mediaListList.length > 0 && (
                    <>
                      <dt>
                        <p className="dl-table-type1__text">매체 목록</p>
                      </dt>
                      <dd>
                        <ul className="d-link__list">
                          {getActionData?.mediaListList &&
                            getActionData?.mediaListList.map(e => (
                              <li key={'ContentLayer_getActionData?.mediaListList' + e.mediaListId}>
                                <Tooltips
                                  tooltipId={'tt1'}
                                  tooltipPlace={'top'}
                                  tooltipContents={e?.title || ''}
                                  url={`/media/list-result?mediaList_id=${e.mediaListId}`}
                                />
                              </li>
                            ))}
                        </ul>
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
                            <li key={'ContentLayer_getActionData?.journalistList' + e.email}>
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
                          {getActionData?.mediaList &&
                            getActionData?.mediaList.map(e => (
                              <li key={'ContentLayer_getActionData?.mediaList' + e.description}>
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
                  {getActionData?.fileAttachList && getActionData?.fileAttachList.length > 0 && (
                    <>
                      <dt>
                        <p className="dl-table-type1__text">첨부</p>
                      </dt>
                      <dd>
                        <ul className="d-link__list">
                          {getActionData?.fileAttachList.map(e => (
                            <li key={'ContentLayer_d-link__list_files' + e.fileId}>
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
                    getActionData?.updater.name && (
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
                        <p className="dl-table-type1__text">{getShareCodeShortNm(getActionData?.shareCodeNm || '')}</p>
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
                            <li key={'ContentLayer_d-link__list_tags' + e.tagId}>
                              <Button
                                elem="a"
                                label={e?.name || ''}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                                onClick={() =>
                                  e.tagId && setTagFilterSearch(e.tagId.toString(), filterSubParamActions, apiParams)
                                }
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
          {/*      <div style={{ paddingBottom: 20 }}>{getActionData?.title || ''}</div>*/}
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
          <li>
            <div className="d-tabs__group">
              <div className="tabs__section type1-small">
                <div className="tabs-menu__group">
                  <ul
                    className="tabs-menu__list"
                    style={{ width: 'unset' }}
                  >
                    {contentsTabList &&
                      contentsTabList.map(item => (
                        <li
                          className={cn({ 'is-active': contentsTab === item.id })}
                          key={'ContentLayer_contentsTabList' + item.id}
                        >
                          <button
                            type="button"
                            className="tabs-menu__btn"
                            onClick={() => setContentsTabListAction(item.id, activityId)}
                          >
                            <span className="tabs-menu__name">{item.title}</span>
                            {item.id === 'comment' && (
                              <span className="tabs-menu__number">{getActionData?.commentCount || ''}</span>
                            )}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
                <ContentData />
                <ContentComment />
                <ContentHistory />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default ActivityLayer
