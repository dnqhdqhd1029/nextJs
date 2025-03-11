import { useLayoutEffect } from 'react'
import moment from 'moment'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import Tabs from '~/components/common/ui/Tabs'
import { draftTab } from '~/components/contents/distribution/Draft/defaultData'
import ItemDeletePopupOld from '~/components/contents/distribution/Draft/Popup/ItemDeletePopupOld'
import { useDraft } from '~/utils/hooks/contents/draft/useDraft'

const DraftListOld = () => {
  const { tab, setTabAction, draftList, setSelectedDeleteData, isLoading, moveToNext, initDraftList } = useDraft()

  useLayoutEffect(() => {
    initDraftList()
  }, [])

  return (
    <>
      <div className="mb-container">
        <div className="mb-common-inner distribute">
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__contents">
                <div className="distribute-steps__section">
                  <div className="distribute-steps__group">
                    <div className="tabs__section type1-medium">
                      <Tabs
                        activeId={tab.id}
                        onChange={tabId => setTabAction(tabId)}
                        items={draftTab}
                        type="medium"
                      />
                      <div className="popup-contents__section">
                        <ul className="interval-mt20">
                          <li>
                            <p className="font-body__regular">배포하지 않은 초안을 이어서 작업할 수 있습니다.</p>
                          </li>
                          <li>
                            <ul className="ul-table-type1__section type-li0">
                              {isLoading ? (
                                <li>
                                  <div className="ul-table-type1__btn">
                                    <Skeleton
                                      key={10}
                                      width={'100%'}
                                      height="35px"
                                    />
                                  </div>
                                </li>
                              ) : (
                                <>
                                  {draftList.length > 0 ? (
                                    <>
                                      {draftList.map((e, index) => (
                                        <li key={index.toString() + 'draft'}>
                                          <div className="ul-table-type1__btn">
                                            <Button
                                              elem="a"
                                              // @ts-ignore
                                              label={e?.titleForManage || '-'}
                                              cate={'link-text-arrow'}
                                              size={'m'}
                                              color={'primary'}
                                              icoRight={true}
                                              icoRightData={icoSvgData.chevronRight}
                                              onClick={i =>
                                                e.mailingId && moveToNext(i, e.mailingId, tab.id, tab, 'get')
                                              }
                                            />
                                          </div>
                                          <div className="ul-table-type1__info">
                                            <p className="ul-table-type1__info-text">
                                              {e.cuType === 'CREATE'
                                                ? `${moment(e.regisAt).format('YYYY-MM-DD HH:mm')} 생성`
                                                : `${moment(e.updateAt).format('MM-DD HH:mm')} 수정`}
                                            </p>
                                            <Button
                                              label={'삭제'}
                                              cate={'default'}
                                              size={'m'}
                                              color={'link'}
                                              onClick={() =>
                                                e.mailingId &&
                                                setSelectedDeleteData(
                                                  e.mailingId,
                                                  // @ts-ignore
                                                  e.title || e.titleForManage || '',
                                                  true
                                                )
                                              }
                                            />
                                          </div>
                                        </li>
                                      ))}
                                    </>
                                  ) : (
                                    <p className="font-body__regular">작성중인 초안이 없습니다</p>
                                  )}
                                </>
                              )}
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 15 }}>
                      <Button
                        label={tab.title + ' ' + ' 새로 만들기'}
                        cate={'default-ico-text'}
                        size={'m'}
                        color={'primary'}
                        onClick={i => moveToNext(i, 0, '', tab, 'new')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ItemDeletePopupOld />
    </>
  )
}

export default DraftListOld
