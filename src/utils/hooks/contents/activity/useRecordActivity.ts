import { useCallback, useRef } from 'react'
import { useRouter } from 'next/router'

import {
  defaultActivityRecordWorkList,
  defaultNewswireActivityRecordWorkList,
  defaultNotEditableReleaseActivityRecordWorkList,
  defaultReleaseActivityRecordWorkList,
  defaultReleaseActivityRecordWorkListFull,
  defaultReleaseActivityRecordWorkListOptions,
  defaultWorkTypeData,
  extendedShareScopeList,
} from '~/components/contents/activity/common/defaultData'
import { extendedCommonCodeTargetList } from '~/components/contents/activity/record/defaultData'
import { ALLOWED_ORIGINS, SVC_DOMAIN_URL } from '~/constants/common'
import { initActivityPopupAction } from '~/stores/modules/contents/activity/activityPopup'
import {
  actionDeleteAction,
  actionLogListAction,
  actionLogListJustOnChangeAction,
  actionStatusDetailListAction,
  actionStatusListAction,
  activityOwnerLayerAction,
  commentPopupAction,
  commmentListAction,
  commmentListJustOnChangeAction,
  commonCodeCategoryAction,
  commonCodeStateAction,
  commonCodeStateFilterAction,
  commonCodeUpdateFieldNameAction,
  commonCodeWorkTypeAction,
  contentsActionLogListProps,
  contentsActionStatusDetailProps,
  contentsCommentTextAction,
  contentsTabListAction,
  createCommentAction,
  dataOnChangeActionProps,
  dataOnChangeActionTypeProps,
  editCommentAction,
  getActionDataAction,
  getActionDataJustOnChangeAction,
  getActionDataLoadingAction,
  getActionDataProps,
  getActivityOwnerLayerAction,
  initAction,
  initRecordActivity,
  isWorkListOpenAction,
  ownerPopupAction,
  ownerPopupProps,
  setActionDataFromOtherAction,
  templatePopupAction,
  templatePopupProps,
  userPopupAction,
} from '~/stores/modules/contents/activity/recordActivity'
import { initEmailPopupAction } from '~/stores/modules/contents/email/email'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  ActionCommentDto,
  ActionDto,
  ActionLogDto,
  GroupDto,
  PageActionCommentDto,
  type UserDto,
  type UserDtoForGroup,
} from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { useDeleteAction } from '~/utils/api/action/useDeleteAction'
import { apiGetOneAction } from '~/utils/api/action/useGetOneAction'
import { usePutActionUpdate } from '~/utils/api/action/usePutActionUpdate'
import { useDeleteActionComment } from '~/utils/api/actionComment/useDeleteActionComment'
import { apiGetActionCommentList } from '~/utils/api/actionComment/useGetActionCommentList'
import { usePostActionCommentCreate } from '~/utils/api/actionComment/usePostActionCommentCreate'
import { usePutActionComment } from '~/utils/api/actionComment/usePutActionComment'
import { apiGetActionLogs } from '~/utils/api/actionLog/useGetActionLogs'
import {
  apiGetActionMailReceiver,
  apiGetActionMailReceiverDetail,
  UseGetActionMailReceiverParams,
} from '~/utils/api/actionMailReceiver/useActionMailReceiver'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { usePutEmailPressReleaseCancel } from '~/utils/api/emailPressRelease/usePutEmailPressReleaseCancel'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import { usePutmailingControlUpdate } from '~/utils/api/mailing/useMailingControl'
import {
  useDeleteRelease as useDeleteNwRelease,
  useLockRelease as useLockNwRelease,
} from '~/utils/api/release/draft/useDeleteNewswireRelease'
import { useDeleteRelease, useLockRelease } from '~/utils/api/release/draft/useDeleteRelease'
import { useMailtemplateListAdd } from '~/utils/api/release/press/useMailTemplateRelease'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useRecordActivity = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    contentsTabList,
    contentsTab,
    contentsCommentList,
    createComment,
    getActionData,
    contentsCommentText,
    userPopup,
    commentPopup,
    eidtComment,
    contentsActionLogList,
    getActionDataKey,
    isWorkListOpen,
    actionDelete,
    activityOwnerGroup,
    activityOwnerLayer,
    ownerPopup,
    activityRecordWorkList,
    templatePopup,
    noticeNewActivity,
    getActionDataLoading,
    contentsCommentErrorText,
    contentsActionStatusDetail,
    contentsActionStatusList,
    commonCodeCategory,
    commonCodeState,
    commonCodeStateFilter,
    commonCodeWorkType,
    commonCodeUpdateFieldName,
  } = useAppSelector(state => state.recordActivitySlice)
  const { isDemoLicense, frequentlyUsedCommonCode, licenseInfo, userInfo, timeZone, userSelectGroup, shareCodeData } =
    useAppSelector(state => state.authSlice)

  const createActionComment = usePostActionCommentCreate()
  const deleteActionComment = useDeleteActionComment()
  const editActionComment = usePutActionComment()
  const deleteActivity = useDeleteAction()
  const editActionById = usePutActionUpdate()
  const editMailingControlById = usePutmailingControlUpdate()
  const deleteReleaseData = useDeleteRelease()
  const apiLock = useLockRelease()
  const deleteNwReleaseData = useDeleteNwRelease()
  const apiNwLock = useLockNwRelease()
  const mailingTypeCancel = usePutEmailPressReleaseCancel()
  const apiMailtemplateListAdd = useMailtemplateListAdd()

  const activityOpenRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const workListOpenRef = useRef<HTMLDivElement>(null)

  const initSearchActivityAction = useCallback(() => dispatch(initAction()), [])
  const setOwnerPopupAction = useCallback((param: ownerPopupProps) => dispatch(ownerPopupAction(param)), [ownerPopup])
  const inputTemplatePopupAction = useCallback(() => {
    const param = {
      isOpen: false,
      value: '',
      valueErr: '',
      content: '',
    }
    dispatch(templatePopupAction(param))
  }, [templatePopup])

  const templatePopupInputChange = useCallback(
    (e: string, prop: templatePopupProps) => {
      const param = {
        ...prop,
        value: e,
        valueErr: '',
      }
      dispatch(templatePopupAction(param))
    },
    [templatePopup.value]
  )

  const getActivityOwnerLayer = useCallback(async () => {
    let list: UserDtoForGroup[] = []
    const { status, data, message } = await apiGetActiveGroupInfo(userSelectGroup)
    if (status === 'S') {
      const res = data as GroupDto
      list = res.users && res.users?.length > 0 ? res.users : ([] as UserDtoForGroup[])
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(getActivityOwnerLayerAction(list))
  }, [activityOwnerLayer])

  const setActivityOwnerLayerAction = useCallback(
    (param: boolean) => dispatch(activityOwnerLayerAction(param)),
    [activityOwnerLayer]
  )

  const setContentsCommentTextAction = useCallback(
    (e: string, origin: string) => {
      let param = {
        content: e,
        err: '',
      }
      if (e && e.length >= 5000) {
        param = {
          content: origin,
          err: '댓글은 5000자를 넘을 수 없습니다.',
        }
      }
      dispatch(contentsCommentTextAction(param))
    },
    [contentsCommentText]
  )
  const setActionDelete = useCallback(
    (isOpen: boolean, target: string, key: number) => dispatch(actionDeleteAction({ isOpen, target, key })),
    [actionDelete]
  )
  const setUserProfilePopupAction = useCallback(
    () =>
      dispatch(
        userPopupAction({
          isOpen: false,
          email: '',
          keyValue: 0,
          displayName: '',
          phone: '',
          mobile: '',
          role: '',
        })
      ),
    [userPopup]
  )
  const setCommentPopupAction = useCallback(
    (param: { isOpen: boolean; key: number }) => dispatch(commentPopupAction(param)),
    [commentPopup]
  )

  const setIsWorkListOpenAction = useCallback(
    (param: boolean) => dispatch(isWorkListOpenAction(param)),
    [isWorkListOpen]
  )
  const setCreateCommentAction = useCallback((param: boolean) => dispatch(createCommentAction(param)), [createComment])

  const setEditCommentAction = useCallback(
    (param: number, content: string) =>
      dispatch(
        editCommentAction({
          param,
          content,
        })
      ),
    [eidtComment]
  )

  const commentEdit = async (idKey: number, comment: string, actionId: number) => {
    let contentsCommentList: ActionCommentDto[] = []
    const { status, data, message } = await editActionComment.mutateAsync({
      id: idKey,
      info: { comment },
    })
    if (status === 'S') {
      contentsCommentList = await actionCommentList(actionId)
      await dataOnChangeAction(
        { contentsCommentList: 'change' },
        { contentsCommentList: contentsCommentList, commentCount: contentsCommentList.length }
      )
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const commentDelete = async (idKey: number, actionId: number, origin: getActionDataProps | null) => {
    let contentsCommentList: ActionCommentDto[] = []
    const { status, data, message } = await deleteActionComment.mutateAsync(idKey)
    if (status === 'S') {
      contentsCommentList = await actionCommentList(actionId)
      await dataOnChangeAction(
        { contentsCommentList: 'change', commentCount: 'change' },
        { contentsCommentList: contentsCommentList, commentCount: contentsCommentList.length },
        origin
      )
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const actionCommentList = async (idKey: number) => {
    let res: ActionCommentDto[] = []
    const { status, data, message } = await apiGetActionCommentList({
      actionId: idKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const apiData = data as PageActionCommentDto
      res = apiData.content as ActionCommentDto[]
    }

    return res
  }

  const actionLogList = async (
    idKey: number,
    tempCommonCodeWorkType: CommonCode[],
    tempCommonCodeUpdateFieldName: CommonCode[]
  ) => {
    let res: contentsActionLogListProps[] = []
    const { status, data, message } = await apiGetActionLogs({
      actionId: idKey,
      groupId: userSelectGroup,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const apiData = data as PageActionCommentDto
      const content = apiData.content as ActionLogDto[]
      if (content.length > 0 && tempCommonCodeWorkType.length > 0) {
        for await (const actionLogDto of content) {
          const temp = {
            ...actionLogDto,
            workTypeNm: '',
            workFieldNm: '',
          }
          const findState = tempCommonCodeWorkType.find(e => e.code === actionLogDto.workType)
          if (findState) {
            temp.workTypeNm = findState.name
          }
          if (actionLogDto.field && actionLogDto.field !== '') {
            const findField = tempCommonCodeUpdateFieldName.find(e => e.code === actionLogDto.field)
            if (findField) {
              temp.workFieldNm = findField.name
            }
          }
          res = [...res, temp]
        }
      }
    }

    return res
  }

  const actionStatusList = async (idKey: number) => {
    const { status, data, message } = await apiGetActionMailReceiver({
      mailingId: idKey,
      page: 1,
      size: 1000,
    })
    if (status === 'S') {
      const res = data as PageActionCommentDto
      dispatch(actionStatusListAction(res.content as UseGetActionMailReceiverParams[]))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const actionStatusDetailList = async (idKey: number) => {
    const { status, data, message } = await apiGetActionMailReceiverDetail({
      mailingId: idKey,
    })
    if (status === 'S') {
      const res = data as contentsActionStatusDetailProps
      dispatch(actionStatusDetailListAction(res as contentsActionStatusDetailProps))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const haveComment = async (actionId: number, comment: string, origin: getActionDataProps | null) => {
    let contentsCommentList: ActionCommentDto[] = []
    const { status, data, message } = await createActionComment.mutateAsync({
      actionId,
      comment,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      contentsCommentList = await actionCommentList(actionId)
      await dataOnChangeAction(
        { contentsCommentList: 'change', commentCount: 'change' },
        { contentsCommentList: contentsCommentList, commentCount: contentsCommentList.length },
        origin
      )
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const ownerChangeAction = async (
    idKey: ownerPopupProps,
    origin: getActionDataProps | null,
    actionId: number,
    tempCommonCodeWorkType: CommonCode[],
    tempCommonCodeUpdateFieldName: CommonCode[]
  ) => {
    let contentsActionLogList: contentsActionLogListProps[] = []
    let tempOwner = {
      userId: idKey.key,
      name: idKey.userData ? idKey.userData.name : '',
      nickname: idKey.userData ? idKey.userData.nickname : '',
      displayName: idKey.userData ? idKey.userData.displayName : '',
      stateCode: idKey.userData ? idKey.userData.stateCode : '',
    }
    let res = {
      message: '',
      status: '',
    }
    if (
      origin?.category !== 'MAILING' &&
      origin?.category !== 'PRESS_RELEASE' &&
      origin?.category !== 'NEWSWIRE_RELEASE'
    ) {
      const { status, data, message } = await editActionById.mutateAsync({
        id: idKey.activityId,
        request: { groupId: userSelectGroup, ownerId: idKey.key },
      })
      res = {
        message: message?.message || '',
        status: status as string,
      }
    } else {
      const { status, data, message } = await editMailingControlById.mutateAsync({
        id: idKey.activityId,
        modify_share_code_owner_dto: {
          groupId: userSelectGroup,
          ownerId: idKey.key,
        },
      })
      res = {
        message: message?.message || '',
        status: status as string,
      }
    }
    if (res.status === 'S') {
      dispatch(ownerPopupAction({ isOpen: false, key: 0, name: '', activityId: 0 }))
      contentsActionLogList = await actionLogList(actionId, tempCommonCodeWorkType, tempCommonCodeUpdateFieldName)
      await dataOnChangeAction(
        { contentsActionLogList: 'change', owner: 'change' },
        { contentsActionLogList: contentsActionLogList, owner: tempOwner },
        origin
      )
      openToast(res.message, 'success')
    } else {
      openToast(res.message, 'error')
    }
  }

  const dataOnChangeAction = async (
    type: dataOnChangeActionTypeProps,
    props: dataOnChangeActionProps,
    origin?: getActionDataProps | null
  ) => {
    let actionData: getActionDataProps | null = origin ? { ...origin } : null

    if (actionData) {
      if (type.commentCount === 'change') {
        actionData.commentCount = props.commentCount ? props.commentCount : 0
        dispatch(getActionDataJustOnChangeAction(actionData))
      }
      if (type.owner === 'change' && props.owner) {
        actionData.owner = props.owner
        dispatch(getActionDataJustOnChangeAction(actionData))
      }
    }

    if (type.contentsCommentList === 'change' && props.contentsCommentList) {
      dispatch(commmentListJustOnChangeAction(props.contentsCommentList))
    }
    if (type.contentsActionLogList === 'change' && props.contentsActionLogList) {
      dispatch(actionLogListJustOnChangeAction(props.contentsActionLogList))
    }
  }

  const getActionOriginData = async (
    code: number,
    tempCommonCodeCategory: CommonCode[],
    tempCommonCodeState: CommonCode[],
    tempCommonCodeStateFilter: CommonCode[]
  ) => {
    let res = null
    let list: SelectListOptionItem[] = []

    dispatch(getActionDataLoadingAction(true))
    try {
      const { status, data, message } = await apiGetOneAction({ id: code, groupId: userSelectGroup })
      if (status === 'S') {
        const apiData = data as ActionDto
        res = {
          ...apiData,
          categoryName: '',
          stateName: '',
          shareCodeNm: '',
          commentCount: 0,
        }
        const findShareScopeList = extendedShareScopeList.find(e => e.id === apiData.shareCode)
        if (findShareScopeList) {
          res.shareCodeNm = findShareScopeList.name
        }
        const findCategory = tempCommonCodeCategory.find(e => e.code === apiData.category)
        if (findCategory) {
          res.categoryName = findCategory.name
        }
        if (apiData.category !== 'MAILING' && apiData.category !== 'PRESS_RELEASE') {
          const findStateFilter = tempCommonCodeStateFilter.find(e => e.code === apiData.stateFilter)
          if (findStateFilter) {
            res.stateName = findStateFilter.name
          }
        } else {
          const findState = tempCommonCodeState.find(e => e.code === apiData.state)
          if (findState) {
            res.stateName = findState.name
          }
        }
        //@ts-ignore
        if (apiData.commentCount) {
          //@ts-ignore
          res.commentCount = apiData.commentCount
        }
        //@ts-ignore
        if (apiData.mailingForAction) {
          //@ts-ignore
          res.mailingForAction = apiData.mailingForAction
        }
        if (
          apiData.category !== 'PRESS_RELEASE' &&
          apiData.category !== 'MAILING' &&
          apiData.category !== 'NEWSWIRE_RELEASE'
        ) {
          if (apiData.shareCode === 'WRITABLE') {
            list = defaultActivityRecordWorkList
          } else if (apiData.owner?.userId === userInfo.userId) {
            list = defaultActivityRecordWorkList
          } else if (apiData.shareCode === 'READABLE' && userInfo.role === 'ADMIN') {
            list = [
              {
                id: 'delete',
                name: '삭제하기',
              },
            ]
          }
        } else {
          if (apiData.category === 'NEWSWIRE_RELEASE') {
            if (apiData.shareCode === 'WRITABLE') {
              if (apiData.state === 'DRA_DRAFT') {
                list = [
                  ...defaultNewswireActivityRecordWorkList,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              } else {
                list = [
                  ...defaultNotEditableReleaseActivityRecordWorkList,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              }
            } else if (apiData.owner?.userId === userInfo.userId) {
              if (apiData.state === 'DRA_DRAFT') {
                list = [
                  ...defaultNewswireActivityRecordWorkList,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              } else {
                list = [
                  ...defaultNotEditableReleaseActivityRecordWorkList,
                  {
                    id: 'find',
                    name: '유사 뉴스 찾기',
                  },
                ]
              }
            } else if (apiData.shareCode === 'READABLE' && apiData.state === 'DRA_DRAFT' && userInfo.role === 'ADMIN') {
              list = [
                {
                  id: 'delete',
                  name: '삭제하기',
                },
              ]
            }
          } else {
            if (apiData.shareCode === 'WRITABLE') {
              if (apiData.state === 'FIN_COMPLETE_SENDING') {
                list =
                  apiData.category === 'MAILING'
                    ? defaultReleaseActivityRecordWorkListOptions
                    : [
                        ...defaultReleaseActivityRecordWorkListOptions,
                        {
                          id: 'find',
                          name: '유사 뉴스 찾기',
                        },
                      ]
              } else if (apiData.state === 'RES_RESERVED') {
                list =
                  apiData.category === 'MAILING'
                    ? defaultReleaseActivityRecordWorkListFull
                    : [
                        ...defaultReleaseActivityRecordWorkListFull,
                        {
                          id: 'find',
                          name: '유사 뉴스 찾기',
                        },
                      ]
              } else {
                list =
                  apiData.category === 'MAILING'
                    ? defaultReleaseActivityRecordWorkList
                    : [
                        ...defaultReleaseActivityRecordWorkList,
                        {
                          id: 'find',
                          name: '유사 뉴스 찾기',
                        },
                      ]
              }
            } else if (apiData.owner?.userId === userInfo.userId) {
              if (apiData.state === 'FIN_COMPLETE_SENDING') {
                list =
                  apiData.category === 'MAILING'
                    ? defaultReleaseActivityRecordWorkListOptions
                    : [
                        ...defaultReleaseActivityRecordWorkListOptions,
                        {
                          id: 'find',
                          name: '유사 뉴스 찾기',
                        },
                      ]
              } else if (apiData.state === 'RES_RESERVED') {
                list =
                  apiData.category === 'MAILING'
                    ? defaultReleaseActivityRecordWorkListFull
                    : [
                        ...defaultReleaseActivityRecordWorkListFull,
                        {
                          id: 'find',
                          name: '유사 뉴스 찾기',
                        },
                      ]
              } else {
                list =
                  apiData.category === 'MAILING'
                    ? defaultReleaseActivityRecordWorkList
                    : [
                        ...defaultReleaseActivityRecordWorkList,
                        {
                          id: 'find',
                          name: '유사 뉴스 찾기',
                        },
                      ]
              }
            } else if (apiData.shareCode === 'READABLE' && apiData.state === 'DRA_DRAFT' && userInfo.role === 'ADMIN') {
              list = [
                {
                  id: 'delete',
                  name: '삭제하기',
                },
              ]
            }
          }
        }
      }
      dispatch(
        getActionDataAction({
          category: res && res.category ? res?.category : '',
          buttonList: list,
          params: res ? res : null,
          state: res && res.state ? res?.state : '',
        })
      )
    } catch (e) {
      console.log('getActionDataLoadingAction', e)
    }
    dispatch(getActionDataLoadingAction(false))
  }

  const getCommonCode = async (code: string, exParams?: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const getOwnerInformation = async (e: number) => {
    let res: UserDto | null = null
    const { status, data, message } = await apiGetOneUser(e)
    if (status === 'S') {
      res = data as UserDto
    } else {
      openToast(message?.message, 'error')
    }
    return res
  }

  const ownerFunction = async (param: UserDtoForGroup) => {
    dispatch(
      userInformationPopupAction({
        isOpen: true,
        idKey: Number(param.userId),
        userId: 0,
        name: '',
        email: '',
        mobile: '',
        phone: '',
        nickname: '',
        displayName: '',
        stateCode: '',
        role: '',
        department: '',
        position: '',
        timezone: '',
        landingPage: '',
        selectedGroupId: 0,
        receiveLetter: true,
        regisAt: '',
        lastLoginAt: '',
        passwdChangeAt: '',
        company: {
          companyId: 0,
          name: '',
          totalMembers: '',
          wsite: '',
        },
        groups: [],
      })
    )
  }

  const init = async () => {
    let preloadCommonCode: CommonCode[] = []
    let tempCommonCodeCategory: CommonCode[] = []
    let tempCommonCodeState: CommonCode[] = []
    let tempCommonCodeStateFilter: CommonCode[] = []
    let queryId = 0
    try {
      if (
        window.location &&
        window.location.pathname &&
        window.location.pathname.split('/') &&
        window.location.pathname.split('/').length > 0
      ) {
        const keyId = window.location.pathname.split('/')[3]
        if (keyId) {
          queryId = Number(keyId)
          dispatch(initRecordActivity(Number(queryId)))
          for await (const keyIdElement of extendedCommonCodeTargetList) {
            const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === keyIdElement.id)
            if (find) {
              //@ts-ignore
              preloadCommonCode = find.commonCodeList
            } else {
              preloadCommonCode = await getCommonCode(keyIdElement.id)
            }
            if (keyIdElement.id === 'ACTION_CATEGORY_ALL') {
              tempCommonCodeCategory = preloadCommonCode
              dispatch(commonCodeCategoryAction(preloadCommonCode as CommonCode[]))
            } else if (keyIdElement.id === 'ACTION_STATE') {
              tempCommonCodeState = preloadCommonCode
              dispatch(commonCodeStateAction(preloadCommonCode as CommonCode[]))
            } else if (keyIdElement.id === 'ACTION_LOG_WORKTYPE') {
              dispatch(commonCodeWorkTypeAction(preloadCommonCode as CommonCode[]))
            } else if (keyIdElement.id === 'UPDATE_FIELD_NAME') {
              dispatch(commonCodeUpdateFieldNameAction(preloadCommonCode as CommonCode[]))
            } else {
              tempCommonCodeStateFilter = preloadCommonCode
              dispatch(commonCodeStateFilterAction(preloadCommonCode as CommonCode[]))
            }
          }
          await getActionOriginData(
            Number(keyId),
            tempCommonCodeCategory,
            tempCommonCodeState,
            tempCommonCodeStateFilter
          )
        } else {
          await router.replace('/404')
        }
      } else {
        await router.replace('/404')
      }
    } catch (e) {
      await router.replace('/404')
    }
  }

  const actionDeleteFunction = async (props: getActionDataProps) => {
    if (props.category !== 'PRESS_RELEASE' && props.category !== 'MAILING' && props.category !== 'NEWSWIRE_RELEASE') {
      const { status, message } = await deleteActivity.mutateAsync({
        id: getActionDataKey,
        info: {
          groupId: userSelectGroup,
        },
      })
      if (status === 'S') {
        openToast(message?.message, 'success')
        dispatch(initAction())
        await router.replace('/activity/search')
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      if (props.mailingId) {
        const { status, message } = await deleteReleaseData.mutateAsync({
          id: props.mailingId,
          group: userSelectGroup,
        })
        if (status === 'S') {
          openToast(message?.message, 'success')
          dispatch(initAction())
          await router.replace('/activity/search')
        } else {
          openToast(message?.message, 'error')
        }
      } else if (props.nwReleaseId) {
        const { status, message } = await deleteNwReleaseData.mutateAsync({
          id: props.nwReleaseId || 0,
          group: userSelectGroup,
        })
        if (status === 'S') {
          openToast(message?.message, 'success')
          dispatch(initAction())
          await router.replace('/activity/search')
        } else {
          openToast(message?.message, 'error')
        }
      }
    }
  }

  const activityTypeEdit = async () => {
    if (getActionData?.actionId) {
      let typeValue = { id: '', name: '' }
      let typeList: SelectListOptionItem[] = []
      for await (const eElement of commonCodeCategory) {
        if (eElement.code !== 'NEWSWIRE_RELEASE' && eElement.code !== 'PRESS_RELEASE' && eElement.code !== 'MAILING') {
          if (getActionData?.categoryName === eElement.name) {
            typeValue = {
              id: eElement.code,
              name: eElement.name,
            }
          }
          typeList = [
            ...typeList,
            {
              id: eElement.code,
              name: eElement.name,
            },
          ]
        }
      }
      dispatch(
        initActivityPopupAction({
          keyValue: getActionData?.actionId,
          isOpen: true,
          loading: true,
          type: typeList,
          state: [],
          typeValue,
          scrop: shareCodeData.action,
        })
      )
    }
  }

  const mailingTypeEdit = async (props: getActionDataProps) => {
    if (props.mailingId) {
      const { status, data, message } = await apiLock.mutateAsync({
        id: props.mailingId,
        group: userSelectGroup,
      })
      if (status !== 'S') {
        //openToast(message?.message, 'error')
        openToast('다른회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
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
    }
  }

  const newswireReleaseEdit = async (props: getActionDataProps) => {
    if (props.nwReleaseId) {
      const { status, data, message } = await apiNwLock.mutateAsync({
        id: props.nwReleaseId,
        group: userSelectGroup,
      })
      if (status !== 'S') {
        //openToast(message?.message, 'error')
        openToast('다른회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
      } else {
        await router.push({
          pathname: '/newswire',
          query: {
            nwReleaseId: props.nwReleaseId,
          },
        })
      }
    }
  }

  const mailingTypeCancelAction = async (
    props: getActionDataProps,
    tempCommonCodeCategory: CommonCode[],
    tempCommonCodeState: CommonCode[],
    tempCommonCodeStateFilter: CommonCode[]
  ) => {
    if (props.mailingId) {
      const { status, data, message } = await mailingTypeCancel.mutateAsync({
        id: props.mailingId,
        info: { groupId: userSelectGroup },
      })
      if (status === 'S') {
        openToast(message?.message, 'success')
        await getActionOriginData(
          Number(props.actionId),
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const recordWorkAction = async (
    param: string,
    props: getActionDataProps,
    tempCommonCodeCategory: CommonCode[],
    tempCommonCodeState: CommonCode[],
    tempCommonCodeStateFilter: CommonCode[]
  ) => {
    if (props?.actionId) {
      if (param === 'delete') {
        if (props.state === 'RES_RESERVED' || props.state === 'PRO_WAITING_FOR_SENDING') {
          openToast('초안, 발송 완료 상태에서만 삭제할 수 있습니다.', 'error')
        } else {
          dispatch(
            actionDeleteAction({ isOpen: true, target: props?.title || '', key: props?.actionId || getActionDataKey })
          )
        }
      } else if (param === 'find') {
        const newsParam = {
          keyword: {
            and: props.title,
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
      } else if (param === 'cancel') {
        await mailingTypeCancelAction(props, tempCommonCodeCategory, tempCommonCodeState, tempCommonCodeStateFilter)
      } else if (param === 'template') {
        dispatch(templatePopupAction({ isOpen: true, value: '', valueErr: '', content: props?.content || '' }))
      } else if (param === 'edit') {
        if (
          props.category !== 'PRESS_RELEASE' &&
          props.category !== 'MAILING' &&
          props.category !== 'NEWSWIRE_RELEASE'
        ) {
          await activityTypeEdit()
        } else {
          if (props.state === 'DRA_DRAFT') {
            props.category === 'NEWSWIRE_RELEASE' ? await newswireReleaseEdit(props) : await mailingTypeEdit(props)
          } else {
            openToast(' 초안 상태에서만 수정할 수 있습니다.', 'error')
          }
        }
      } else {
        dispatch(
          sharedKeyAction({
            key: props.actionId,
            title: '활동 공유 - ' + props?.title || '',
            editor: props?.title || '',
            type: await calculateTypeDefine(props?.category || ''),
            sharedUrl:
              process.env.MY_ENV_VAR === 'production'
                ? SVC_DOMAIN_URL.PROD
                : SVC_DOMAIN_URL.DEV + `/activity/record/${props?.actionId ?? 0}`,
          })
        )
      }
    }
  }

  const calculateTypeDefine = async (data: string) => {
    let res = ''
    if (data === 'MAILING') {
      res = 'MAILING'
    } else if (data === 'PRESS_RELEASE') {
      res = 'PRESS_RELEASE'
    } else if (data === 'NEWSWIRE_RELEASE') {
      res = 'NEWSWIRE_RELEASE'
    } else if (data === 'NOTE') {
      res = 'NOTE'
    } else if (data === 'PHONE') {
      res = 'PHONE'
    } else if (data === 'PROMISE') {
      res = 'PROMISE'
    } else if (data === 'INQUIRY') {
      res = 'INQUIRY'
    }
    return res
  }

  const setTagFilterSearch = async (data: string) => {
    const filter = setObjectToBase64({
      tagIdList: [data],
      activityId: 0,
    })
    await router.push(`/activity/search?filter=${filter}`)
  }

  const setContentsTabListAction = async (
    param: string,
    actionId: number,
    mailingId: number,
    tempCommonCodeWorkType: CommonCode[],
    tempCommonCodeUpdateFieldName: CommonCode[]
  ) => {
    dispatch(contentsTabListAction(param))
    if (param === 'comment') {
      const commentList = await actionCommentList(actionId)
      dispatch(commmentListAction(commentList))
    } else if (param === 'log') {
      const logList = await actionLogList(actionId, tempCommonCodeWorkType, tempCommonCodeUpdateFieldName)
      dispatch(actionLogListAction(logList))
    } else if (param === 'status') {
      await actionStatusList(mailingId)
      await actionStatusDetailList(mailingId)
    }
  }

  const templateValidation = async (data: templatePopupProps) => {
    let templateErr = ''
    if (data.value === '') {
      templateErr = '템플릿명을 입력하세요.'
    } else if (data.value.length > 100) {
      templateErr = '템플릿명은 100자를 넘을 수 없습니다.'
    }
    dispatch(
      templatePopupAction({
        ...data,
        valueErr: templateErr,
      })
    )

    return templateErr
  }

  const templatePopupConfirmAction = async (data: templatePopupProps) => {
    const param = {
      title: data.value,
      content: data.content,
      groupId: userSelectGroup,
      isDefault: false,
    }
    const { status, message } = await apiMailtemplateListAdd.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      const param = {
        isOpen: false,
        value: '',
        valueErr: '',
        content: '',
      }
      dispatch(templatePopupAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const initActionStatusContent = async (data: ActionLogDto[]) => {
    let res: contentsActionLogListProps[] = []
    if (data.length > 0 && commonCodeWorkType.length > 0) {
      for await (const actionLogDto of data) {
        const temp = {
          ...actionLogDto,
          workTypeNm: '',
          workFieldNm: '',
        }
        const findState = commonCodeWorkType.find(e => e.code === actionLogDto.workType)
        if (findState) {
          temp.workTypeNm = findState.name
        }
        if (actionLogDto.field && actionLogDto.field !== '') {
          const findField = defaultWorkTypeData.find(e => e.id === actionLogDto.field)
          if (findField) {
            temp.workFieldNm = findField.title
          }
        }
        res = [...res, temp]
      }
    }
    console.log('res', res)
    dispatch(actionLogListAction(res))
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    workListOpenRef,
    contentsTabList,
    contentsTab,
    contentsCommentList,
    createComment,
    getActionDataLoading,
    getActionData,
    userPopup,
    contentsCommentText,
    commentPopup,
    eidtComment,
    contentsActionLogList,
    getActionDataKey,
    isWorkListOpen,
    actionDelete,
    activityOpenRef,
    searchInputRef,
    activityOwnerGroup,
    activityOwnerLayer,
    ownerPopup,
    activityRecordWorkList,
    noticeNewActivity,
    templatePopup,
    contentsActionStatusList,
    contentsCommentErrorText,
    timeZone,
    contentsActionStatusDetail,
    commonCodeCategory,
    commonCodeState,
    commonCodeStateFilter,
    commonCodeWorkType,
    commonCodeUpdateFieldName,

    init,
    ownerFunction,
    haveComment,
    commentDelete,
    commentEdit,
    recordWorkAction,
    actionDeleteFunction,
    ownerChangeAction,
    templatePopupConfirmAction,
    setTagFilterSearch,
    templateValidation,
    setContentsTabListAction,

    inputTemplatePopupAction,
    templatePopupInputChange,
    setOwnerPopupAction,
    getActivityOwnerLayer,
    setActivityOwnerLayerAction,
    setActionDelete,
    setIsWorkListOpenAction,
    setEditCommentAction,
    setContentsCommentTextAction,
    setUserProfilePopupAction,
    initSearchActivityAction,
    setCreateCommentAction,
    setCommentPopupAction,
  }
}
