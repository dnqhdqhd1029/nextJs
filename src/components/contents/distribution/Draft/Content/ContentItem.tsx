import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import cn from 'classnames'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import {
  defaultActivityRecordWorkList,
  defaultNotEditableReleaseActivityRecordWorkList,
  defaultReleaseActivityRecordList,
  defaultReleaseActivityRecordWorkList,
  defaultReleaseActivityRecordWorkListFull,
  defaultReleaseActivityRecordWorkListOptions,
} from '~/components/contents/activity/common/defaultData'
import TableDropDownItem from '~/components/contents/common/forms/TableDropDowns/TableDropDowns'
import OwnerItem from '~/components/contents/distribution/Draft/Content/OwnerItem'
import ShareItem from '~/components/contents/distribution/Draft/Content/ShareItem'
import { draftCategoryList, extendedShareScopeList } from '~/components/contents/distribution/Draft/defaultData'
import ItemDeletePopup from '~/components/contents/distribution/Draft/Popup/ItemDeletePopup'
import TemplatePopup from '~/components/contents/distribution/Draft/Popup/TemplatePopup'
import { TemplateWarningMsg } from '~/components/contents/distribution/Release/Press/TemplateStep/Warning'
import { SVC_DOMAIN_URL } from '~/constants/common'
import { searchContentListProps } from '~/stores/modules/contents/activity/searchActivity'
import { initEmailPopupAction } from '~/stores/modules/contents/email/email'
import { importPopupType } from '~/stores/modules/contents/newswireRelease/newswireRelease'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import { BaseResponseCommonObject, UserDtoForGroup } from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { apiPutActionShareCodeOwner } from '~/utils/api/action/usePutActionShareCodeOwner'
import { usePutEmailPressReleaseCancel } from '~/utils/api/emailPressRelease/usePutEmailPressReleaseCancel'
import { apiDeleteNewswireRelease } from '~/utils/api/release/draft/useDeleteNewswireRelease'
import { apiDelete, useLockRelease } from '~/utils/api/release/draft/useDeleteRelease'
import { apiMailtemplateListAdd } from '~/utils/api/release/press/useMailTemplateRelease'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { usePressListManagement } from '~/utils/hooks/contents/pressMedia/usePressListManagement'

const ContentItem = ({
  props,
  stateList,
  nwStateList,
  refineValue,
  ownerGroup,
  onListRefetch,
  onClickItem,
}: {
  props: searchContentListProps
  stateList: Record<string, string>
  nwStateList: Record<string, string>
  refineValue: Record<string, string>
  ownerGroup: Array<UserDtoForGroup>
  onListRefetch: () => void
  onClickItem?: (e: number, props: importPopupType) => void
}) => {
  const router = useRouter()
  const { userInfo, isDemoLicense, userSelectGroup, shareCodeData } = useAppSelector(state => state.authSlice)
  const { importPopup } = useAppSelector(state => state.newswireReleaseSlice)
  const OptionIdOpenRef = useRef<HTMLDivElement>(null)
  const { setOtherActions, ownerFunction } = usePressListManagement()
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState(false)
  const [isOption, setIsOption] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)
  const [isTemplateCreateModal, setIsTemplateCreateModal] = useState<boolean>(false)
  const [shareCodeNm, setShareCodeNm] = useState<string>('')
  const [buttonList, setButtonList] = useState<Array<SelectListOptionItem>>([])
  const dispatch = useDispatch()
  const apiLock = useLockRelease()

  const sendCancel = usePutEmailPressReleaseCancel({
    onSuccess: response => {
      const { status, code, message } = response as BaseResponseCommonObject
      if (status === 'S') {
        openToast(message?.message, 'success')
        onListRefetch()
      } else {
        openToast(message?.message, 'error')
      }
    },
    onError: error => console.log('error : ', error),
  })

  const handleMoreButton = async (id: string) => {
    switch (id) {
      case 'cancel': // 예약 취소
        if (props.mailingId) {
          sendCancel.mutate({
            id: props.mailingId,
            info: {
              groupId: userSelectGroup,
            },
          })
        } else {
          openToast('정보를 확인할 수 없습니다.', 'error')
        }
        break
      case 'edit': // 수정하기
        if (props.mailingId) {
          const { status, data, message } = await apiLock.mutateAsync({
            id: props.mailingId,
            group: userSelectGroup,
          })
          if (status !== 'S') {
            openToast(message?.message, 'error')
          } else {
            if (props.category === 'MAILING') {
              dispatch(
                initEmailPopupAction({
                  key: props.mailingId,
                  name: userInfo.name ?? '-',
                  scrop: shareCodeData.distribute,
                })
              )
            } else if (props.category === 'PRESS_RELEASE') {
              await router.push({
                pathname: '/press-release',
                query: {
                  mailingId: props.mailingId,
                },
              })
            }
          }
        } else {
          // 뉴스와이어 배포
          await router.push({
            pathname: '/newswire',
            query: {
              nwReleaseId: props.nwReleaseId,
            },
          })
        }
        break
      case 'delete': // 삭제하기
        setIsDeleteModal(() => true)
        break
      case 'template': // 템플릿으로 저장
        setIsTemplateCreateModal(() => true)
        break
      case 'find': // 템플릿으로 저장
        findNewsByTitle(props?.title || '')
        break
      case 'share': // 공유하기
        shareKeyCheck()
        break
      default:
        break
    }
  }

  const findNewsByTitle = async (sTitle: string) => {
    const newsParam = {
      keyword: {
        and: sTitle,
        or: '',
        not: '',
      },
      extra: {
        period: { id: '', name: '선택' },
        startPeriod: new Date(),
        endPeriod: new Date(),
        periodTag: [],
        mediaType: [],
        mediaValue: { id: '', name: '선택' },
        mediaTagList: [],
        journalistTagList: [],
        existMultimedia: [],
        tone: [],
        tag: [],
        url: '',
        publishingPeriod: [],
        mediaBookList: [],
        clipbookValue: [],
        clipbook: { id: '', name: '선택' },
        coverage: { id: '', name: '선택' },
        informationType: { id: '', name: '선택' },
      },
    }
    const res = setObjectToBase64({ ...newsParam.keyword, ...newsParam.extra })
    await router.push(`/news/search?filter=${res}`)
  }

  const shareKeyCheck = () => {
    dispatch(
      sharedKeyAction({
        key: props?.actionId ?? 0,
        title: '활동 공유 - ' + props?.title || '',
        editor: props?.title || '',
        type:
          props.category === 'MAILING'
            ? 'MAILING'
            : props.category === 'PRESS_RELEASE'
            ? 'PRESS_RELEASE'
            : 'NEWSWIRE_RELEASE',
        sharedUrl:
          process.env.MY_ENV_VAR === 'production'
            ? SVC_DOMAIN_URL.PROD
            : SVC_DOMAIN_URL.DEV + `/activity/record/${props?.actionId ?? 0}`,
      })
    )
  }

  const handleChangeShareCode = async (share_code: string) => {
    if (props.actionId) {
      const { status, code, message } = (await apiPutActionShareCodeOwner({
        id: props.actionId,
        modify_share_code_owner_dto: {
          groupId: userSelectGroup,
          shareCode: share_code,
        },
      })) as BaseResponseCommonObject
      if (status === 'S') {
        openToast(message?.message, 'success')
        onListRefetch()
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('활동 정볼를 찾을 수 없습니다.', 'error')
    }
  }

  const handleChangeOwner = async (owner_id: number) => {
    if (props.actionId) {
      const { status, code, message } = (await apiPutActionShareCodeOwner({
        id: props.actionId,
        modify_share_code_owner_dto: {
          groupId: userSelectGroup,
          ownerId: owner_id,
        },
      })) as BaseResponseCommonObject
      if (status === 'S') {
        openToast(message?.message, 'success')
        onListRefetch()
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('활동 정보를 찾을 수 없습니다.', 'error')
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    if (props.mailingId) {
      const { status, code, message } = (await apiDelete({
        id: props.mailingId,
        group: userSelectGroup,
      })) as BaseResponseCommonObject
      if (status === 'S') {
        openToast(message?.message, 'success')
        setIsDeleteModal(false)
        onListRefetch()
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('삭제할 정보를 확인할 수 없습니다.', 'error')
    }
    setIsLoading(false)
  }

  const handleDeleteNewswireRelease = async () => {
    setIsLoading(true)
    if (props.nwReleaseId) {
      const { status, code, message } = (await apiDeleteNewswireRelease({
        id: props.nwReleaseId,
        group: userSelectGroup,
      })) as BaseResponseCommonObject
      if (status === 'S') {
        openToast(message?.message, 'success')
        setIsDeleteModal(false)
        onListRefetch()
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('삭제할 정보를 확인할 수 없습니다.', 'error')
    }
    setIsLoading(false)
  }

  const handleCreateTemplate = async (template_title: string) => {
    setIsLoading(true)
    const { status, code, message } = (await apiMailtemplateListAdd({
      title: template_title,
      content: props.content ?? '',
      groupId: userSelectGroup,
      isDefault: false,
    })) as BaseResponseCommonObject
    if (status === 'S') {
      openToast(message?.message, 'success')
      setIsTemplateCreateModal(false)
    } else {
      if (code === '00002' && message?.code === 'LIMITED_TEMPLATE_COUNT') {
        openToast(
          <TemplateWarningMsg templateCount={parseInt(refineValue['max_template_number'] ?? '20')} />,
          'warning'
        )
      } else {
        openToast(message?.message, 'error')
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const findShareScopeList = extendedShareScopeList.find(e => e.id === props.shareCode)
    if (findShareScopeList) {
      setShareCodeNm(findShareScopeList.name)
    }
  }, [props.shareCode])

  useEffect(() => {
    if (props.category === 'PRESS_RELEASE' || props.category === 'MAILING') {
      if (props.shareCode === 'WRITABLE') {
        if (props.state === 'FIN_COMPLETE_SENDING') {
          setButtonList(
            props.category === 'PRESS_RELEASE'
              ? [
                  ...defaultReleaseActivityRecordWorkListOptions,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              : defaultReleaseActivityRecordWorkListOptions
          )
        } else if (props.state === 'RES_RESERVED') {
          setButtonList(
            props.category === 'PRESS_RELEASE'
              ? [
                  ...defaultReleaseActivityRecordWorkListFull,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              : defaultReleaseActivityRecordWorkListFull
          )
        } else {
          setButtonList(
            props.category === 'PRESS_RELEASE'
              ? [
                  ...defaultReleaseActivityRecordWorkList,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              : defaultReleaseActivityRecordWorkList
          )
        }
      } else if (props.owner?.userId === userInfo.userId) {
        if (props.state === 'FIN_COMPLETE_SENDING') {
          setButtonList(
            props.category === 'PRESS_RELEASE'
              ? [
                  ...defaultReleaseActivityRecordWorkListOptions,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              : defaultReleaseActivityRecordWorkListOptions
          )
        } else if (props.state === 'RES_RESERVED') {
          setButtonList(
            props.category === 'PRESS_RELEASE'
              ? [
                  ...defaultReleaseActivityRecordWorkListFull,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              : defaultReleaseActivityRecordWorkListFull
          )
        } else {
          setButtonList(
            props.category === 'PRESS_RELEASE'
              ? [
                  ...defaultReleaseActivityRecordWorkList,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              : defaultReleaseActivityRecordWorkList
          )
        }
      } else {
        setButtonList(
          props.category === 'PRESS_RELEASE'
            ? [
                ...defaultReleaseActivityRecordList,
                {
                  id: 'find',
                  name: '유사 뉴스 찾기',
                },
              ]
            : defaultReleaseActivityRecordList
        )
      }
    } else if (props.category === 'NEWSWIRE_RELEASE') {
      setButtonList(
        props.state === 'DRA_DRAFT'
          ? [
              ...defaultActivityRecordWorkList,
              {
                id: 'find',
                name: '유사 뉴스 찾기',
              },
            ]
          : [
              ...defaultNotEditableReleaseActivityRecordWorkList,
              {
                id: 'find',
                name: '유사 뉴스 찾기',
              },
            ]
      )
    }
  }, [props.shareCode, props.state])

  const handleOptionClick = useCallback(
    (e: MouseEvent) => {
      if (OptionIdOpenRef.current && !OptionIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  const handleClickItem = () => {
    router.push(`/activity/record/${props.actionId}?category=${props?.category}`)
  }

  useEffect(() => {
    window.addEventListener('mousedown', e => {
      handleOptionClick(e)
    })
    return () =>
      window.removeEventListener('mousedown', e => {
        handleOptionClick(e)
      })
  }, [])

  return (
    <>
      <li>
        <div
          onClick={() => {
            if (importPopup.isOpen) {
              onClickItem && onClickItem(props?.mailingId || 0, importPopup)
            }
          }}
          className={cn('list-type4-item__section', {
            'is-selected': isSelected,
            'is-clicked': importPopup.selectedId === props?.mailingId,
          })}
          style={{
            cursor: importPopup.isOpen ? 'pointer' : 'default',
          }}
          id={props.actionId?.toString() || ''}
          ref={OptionIdOpenRef}
        >
          <ul className="list-type4-item__list">
            <li
              className="list-type4-item__title type-flex-grow"
              onClick={() => {
                !importPopup.isOpen && handleClickItem()
              }}
            >
              <p className="list-type4-item__text">
                <span
                  onClick={e => {
                    if (!importPopup.isOpen) {
                      e.stopPropagation()
                      if (props.category === 'NEWSWIRE_RELEASE' && props.state === 'DRA_DRAFT') {
                        window.open(`${window.location.origin}/newswire?nwReleaseId=${props.nwReleaseId}`)
                      } else if (props.category === 'PRESS_RELEASE' && props.state === 'DRA_DRAFT') {
                        window.open(`${window.location.origin}/press-release?mailingId=${props.mailingId}`)
                      } else {
                        handleClickItem()
                      }
                    }
                  }}
                >
                  {props.title}
                </span>
                {userInfo.userId === props.owner?.userId && <IcoSvg data={icoSvgData.personLineBroken} />}
              </p>
            </li>
            <li
              className="list-type4-item__group"
              onClick={() => {
                !importPopup.isOpen && handleClickItem()
              }}
            >
              <p className="list-type4-item__text">
                {props?.category ? draftCategoryList.find(e => e.id === props?.category)?.title : ''}
              </p>
            </li>
            {!importPopup.isOpen && (
              <li className="list-type4-item__group">
                <p className="list-type4-item__text">
                  {props.category === 'NEWSWIRE_RELEASE' &&
                  ['PRO', 'FIN'].includes(props?.state_filter ?? '') &&
                  !!props?.state
                    ? nwStateList[props.state]
                    : ''}
                </p>
              </li>
            )}
            <li
              className="list-type4-item__group"
              onClick={() => {
                !importPopup.isOpen && handleClickItem()
              }}
            >
              <p className="list-type4-item__text">{!!props?.state_filter ? stateList[props.state_filter] : ''}</p>
            </li>
            {userInfo.userId === props.owner?.userId && !importPopup.isOpen ? (
              <ShareItem
                props={{ ...props, shareCodeNm }}
                onChage={handleChangeShareCode}
              />
            ) : (
              <li className="list-type4-item__share-filter">
                <div className="select__section select-type1-small">
                  <button className="select__label pointer-events-none">
                    <span className="select__label-text">{shareCodeNm}</span>
                  </button>
                </div>
              </li>
            )}
            {userInfo.userId === props.owner?.userId && !importPopup.isOpen ? (
              <OwnerItem
                props={props}
                ownerGroup={ownerGroup}
                onChage={handleChangeOwner}
              />
            ) : (
              <li className={`list-type4-item__share-group`}>
                <div className="select__section select-type2-pd">
                  <button className="select__label">
                    <span
                      className="select__label-text"
                      style={{ paddingLeft: 4 }}
                    >
                      {props?.owner?.displayName}
                    </span>
                  </button>
                </div>
              </li>
            )}
            <li className="list-type4-item__history">
              <div className="list-type4-item__history-user">
                <p className="list-type4-item__text">
                  {props.cuType === 'CREATE'
                    ? props.register?.displayName + ' 생성' || ''
                    : props.cuUser?.displayName + ' 수정' || ''}
                </p>
              </div>
              <div className="list-type4-item__history-date">
                <p className="list-type4-item__text">
                  {props.cuType === 'CREATE'
                    ? moment(props.regisAt).format('YYYY-MM-DD')
                    : moment(props.updateAt).format('YYYY-MM-DD')}
                </p>
              </div>
            </li>
            {!importPopup.isOpen && (
              <li className="list-type4-item__more">
                <TableDropDownItem
                  isOption={isOption}
                  settingList={buttonList}
                  setIsOption={() => setIsOption(!isOption)}
                  tableDropDownAction={(i, k) => handleMoreButton(i.id)}
                />
              </li>
            )}
          </ul>
        </div>
      </li>

      {isDeleteModal && (
        <ItemDeletePopup
          title={props.title ?? ''}
          isLoading={isLoading}
          onClose={() => setIsDeleteModal(false)}
          onDelete={props.nwReleaseId ? handleDeleteNewswireRelease : handleDelete}
        />
      )}

      {isTemplateCreateModal && (
        <TemplatePopup
          isLoading={isLoading}
          onClose={() => setIsTemplateCreateModal(false)}
          onCreate={handleCreateTemplate}
        />
      )}
    </>
  )
}

export default ContentItem
