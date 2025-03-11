import { MouseEvent, useCallback, useEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import ActionDeletePopup from '~/components/contents/activity/record/ActionDeletePopup/ActionDeletePopup'
import CommentDeletePopup from '~/components/contents/activity/record/CommentDeletePopup/CommentDeletePopup'
import ContentComment from '~/components/contents/activity/record/ContentComment/ContentComment'
import ContentData from '~/components/contents/activity/record/ContentData/ContentData'
import ContentHistory from '~/components/contents/activity/record/ContentHistory/ContentHistory'
import ContentMailReceiver from '~/components/contents/activity/record/ContentMailReceiver/ContentMailReceiver'
import ActivityLayer from '~/components/contents/activity/record/InfoLayer/ActivityLayer/ActivityLayer'
import ReleaseLayer from '~/components/contents/activity/record/InfoLayer/ReleaseLayer/ReleaseLayer'
import OwnerChangePopup from '~/components/contents/activity/record/OwnerChangePopup/OwnerChangePopup'
import TemplatePopup from '~/components/contents/activity/record/TemplatePopup/TemplatePopup'
import UserProfilePopup from '~/components/contents/activity/record/UserProfilePopup/UserProfilePopup'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'

const ActivityRecord = () => {
  const router = useRouter()
  const {
    getActionDataKey,
    workListOpenRef,
    getActionData,
    contentsTabList,
    contentsTab,
    commonCodeWorkType,
    commonCodeUpdateFieldName,
    isWorkListOpen,
    commonCodeCategory,
    commonCodeState,
    commonCodeStateFilter,
    setIsWorkListOpenAction,
    activityRecordWorkList,
    setContentsTabListAction,
    recordWorkAction,
    init,
  } = useRecordActivity()

  const handleClick = useCallback(
    (e: globalThis.MouseEvent) => {
      if (workListOpenRef.current && !workListOpenRef.current.contains(e.target as Node)) setIsWorkListOpenAction(false)
    },
    [isWorkListOpen]
  )

  const eventAction = (e: string) => {
    if (getActionData) {
      setIsWorkListOpenAction(false)
      recordWorkAction(e, getActionData, commonCodeCategory, commonCodeState, commonCodeStateFilter)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      init()
    }, 50)
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <>
      {getActionData && (
        <div className="mb-container responsive-type1 type-max-w1400">
          <div className="mb-common-inner">
            <div className="mb-contents">
              <div className="activity__section">
                <div className="mb-contents-header__section type-control">
                  <div className="common-title__section">
                    <div className="common-title__group">
                      <div className="common-title__path">
                        <Button
                          label={'arrowLeft'}
                          cate={'ico-only'}
                          size={'s'}
                          color={'body-text'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.arrowLeft}
                          icoSize={24}
                          onClick={e => {
                            e.preventDefault()
                            router.back()
                          }}
                        />
                      </div>
                      {activityRecordWorkList && activityRecordWorkList.length > 0 && (
                        <div className="common-title__buttons">
                          <div
                            ref={workListOpenRef}
                            // className="select__section select-type1-small select-line select-align-right"
                            className={cn(
                              'select__section select-type1-small select-type1-tertiary select-align-right',
                              {
                                'is-show': isWorkListOpen,
                              }
                            )}
                          >
                            <button
                              className="select__label"
                              onClick={() => setIsWorkListOpenAction(!isWorkListOpen)}
                            >
                              <span className="select__label-text">작업하기</span>
                              <IcoSvg data={icoSvgData.chevronDown} />
                            </button>

                            <div className={cn('select-option__section', { 'display-block': isWorkListOpen })}>
                              <div className="select-option__area">
                                <ul className="select-option__group">
                                  {activityRecordWorkList &&
                                    activityRecordWorkList.map(e => (
                                      <li key={'defaultActivityRecordWorkList_select-option__item' + e.id}>
                                        <button
                                          className="select-option__item"
                                          onClick={() => eventAction(e.id)}
                                        >
                                          <span className="select-option__item-text">{e.name}</span>
                                        </button>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="aside-activity__section">
                  <ul className="interval-mt20">
                    <li>
                      <h3 className="activity-detail__title">
                        {getActionData.category === 'PHONE_CALL' && <IcoSvg data={icoSvgData.actPhone} />}
                        {getActionData.category === 'MAILING' && <IcoSvg data={icoSvgData.actEmail} />}
                        {getActionData.category === 'PROMISE' && <IcoSvg data={icoSvgData.actPromise} />}
                        {getActionData.category === 'NOTE' && <IcoSvg data={icoSvgData.actNote} />}
                        {getActionData.category === 'PRESS_RELEASE' && <IcoSvg data={icoSvgData.actPressRelease} />}
                        {getActionData.category === 'INQUIRY' && <IcoSvg data={icoSvgData.actQuestion} />}
                        {getActionData.category === 'NEWSWIRE_RELEASE' && <IcoSvg data={icoSvgData.actNewswire} />}
                        {getActionData?.category === 'PRESS_RELEASE'
                          ? getActionData?.mailingForAction?.titleForManage
                          : getActionData?.title || ''}
                      </h3>
                    </li>
                    <li>
                      <div className="activity-detail__section">
                        <ul className="interval-mt28">
                          {getActionData &&
                          getActionData.category !== 'PRESS_RELEASE' &&
                          getActionData.category !== 'MAILING' &&
                          getActionData.category !== 'NEWSWIRE_RELEASE' ? (
                            <ActivityLayer />
                          ) : (
                            <ReleaseLayer />
                          )}
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
                                          key={'ActivitySearch_contentsTabList' + item.id}
                                        >
                                          <button
                                            type="button"
                                            className="tabs-menu__btn"
                                            onClick={() =>
                                              setContentsTabListAction(
                                                item.id,
                                                getActionDataKey,
                                                getActionData?.mailingId || 0,
                                                commonCodeWorkType,
                                                commonCodeUpdateFieldName
                                              )
                                            }
                                          >
                                            <span className="tabs-menu__name">{item.title}</span>
                                            {item.id === 'comment' && (
                                              <span className="tabs-menu__number">
                                                {getActionData?.commentCount || ''}
                                              </span>
                                            )}
                                          </button>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                                <ContentMailReceiver />
                                <ContentData />
                                <ContentHistory />
                                <ContentComment />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <UserProfilePopup />
      <CommentDeletePopup />
      <ActionDeletePopup />
      <OwnerChangePopup />
      <TemplatePopup />
    </>
  )
}

export default ActivityRecord
