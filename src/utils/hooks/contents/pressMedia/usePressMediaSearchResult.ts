import { ChangeEvent, RefObject, useCallback, useEffect, useRef } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import {
  MediaAddRegisterContext,
  MediaAutoRegisterContext,
  PressAddRegisterContext,
  PressAutoRegisterContext,
} from '~/components/contents/common/forms/PressMediaListBookPopup/PressMediaAutoRegisterContext'
import {
  defaultUserBlockData,
  extendedCommonCodeTargetList,
  mediaInitParams,
  pressInitParams,
  subJournalFilterListList,
  subJournalFilterOptionsList,
  subMediaFilterListList,
  subMediaFilterOptionsList,
} from '~/components/contents/pressMedia/SearchResult/defaultData'
import { EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION, URL_REGEXP, URL_REGEXP_DESCRIPTION } from '~/constants/common'
import { initActivityPopupAction } from '~/stores/modules/contents/activity/activityPopup'
import { tagetListOpenEmailPopupAction } from '~/stores/modules/contents/email/email'
import {
  mediaDuplicationIdListSaga,
  pressDuplicationIdListSaga,
  pressReleaseDataExtraAction,
  userAutoSaveDataProps,
  userMediaListAutoSaveDataAction,
  userPressListAutoSaveDataAction,
} from '~/stores/modules/contents/extraData/extra'
import { duplicationMediaPopupProps, isMediaUserBlockProps } from '~/stores/modules/contents/pressMedia/mediaProfile'
import {
  initPressMediaListBookPopupAction,
  initSearchRegisterListPopupAction,
  searchRegisterListProps,
} from '~/stores/modules/contents/pressMedia/pressMediaListBookPopup'
import {
  addPersonalContactProps,
  blockedEmailSenderPopupProps,
  dataOnChangeActionProps,
  dataOnChangeActionTypeProps,
  filterSubParamActionsProps,
  journalDecodeListProps,
  mediaSearchOptionProps,
  mediaSubTypeListProps,
  pressMediaErrPopupProps,
  pressMediaUnBlockPopupProps,
  pressNewsData,
  pressSearchOptionProps,
  registerJournalPhotoPopupProps,
  registerMediaPhotoPopupProps,
  searchContentListProps,
  searchRegisterPopupProps,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import {
  actionCategoryListAction,
  actionStateFilterAction,
  actionStateListAction,
  activityListByJournalIdAction,
  activityListByMediaIdAction,
  activityLoadingAction,
  addPersonalContactAction,
  afterMediaRegistAddMediaListAction,
  afterMediaRegistAddMediaParamAction,
  afterPressRegistAddPressListAction,
  afterPressRegistAddPressParamAction,
  blockedEmailSenderPopupAction,
  checkSearchResultUserMediaAction,
  checkSearchResultUserPressAction,
  contentListImageIdAction,
  countLoadingAction,
  duplicationMediaPopupAction,
  duplicationPressPopupAction,
  fileDownloadPopupAction,
  filterInformationAction,
  filterMediaInfoTypeAction,
  filterMediaTypeAction,
  filterPortalCodeAction,
  filterPubCycleAction,
  initAction,
  isJournalUserBlockAction,
  isLimitFilterAction,
  isMediaUserBlockAction,
  isSearchedNewsOpenAction,
  journalContactInfoAction,
  journalEmailBlockingAction,
  journalistOccupationListAction,
  journalistSocialFilterListAction,
  journalLoadingAction,
  mediaContactInfoAction,
  mediaEmailBlockingAction,
  mediaIdParamsAction,
  mediaLoadingAction,
  mediaParamKeywordAction,
  mediaParamKeywordButtonAction,
  mediaParamsExpandButtonAction,
  mediaSubTypeListAction,
  newsListByJournalIdAction,
  newsListByMediaIdAction,
  newsLoadingAction,
  pressIdParamsAction,
  pressMediaErrPopupAction,
  pressMediaUnBlockPopupAction,
  pressNewsListAction,
  pressParamKeywordAction,
  pressParamKeywordButtonAction,
  pressParamsExpandButtonAction,
  profileByJournalIdAction,
  profileByMediaIdAction,
  profileImageIdAction,
  publisherTypeAction,
  registerJournalPhotoPopupAction,
  registerMediaPhotoPopupAction,
  searchContentKeyMediaListAction,
  searchContentKeyPressListAction,
  searchLimitAlarmAction,
  searchRegisterPopupAction,
  setFilterJournalSubParamActions,
  setFilterMediaSubParamActions,
  setOnChangeMediaFilterSearchOptionAction,
  setOnChangeMediaSearchOptionAction,
  setOnChangePressFilterSearchOptionAction,
  setOnChangePressSearchOptionAction,
  setProfileImageIdAction,
  setResultListInitDataAction,
  setSearchContentKeyListAction,
  userPopupAction,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { duplicationJournalPopupPropsProps } from '~/stores/modules/contents/pressMedia/pressProfile'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  ContactUserAddedDto,
  ElasticSearchReturnDtoJournalistDocumentDto,
  ElasticSearchReturnDtoMediaDocumentDto,
  type ElasticSearchReturnDtoNewsDocumentDto,
  type ESearchJournalistCondDto,
  ESearchMediaCondDto,
  JournalistAutoCompleteDto,
  MediaAutoCompleteDto,
  PageActionDtoForList,
  type UserDto,
} from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { ESearchJournalistDocumentDto, ESearchMediaDocumentDto } from '~/types/contents/PressMedia'
import { apiGetActionListByConfition } from '~/utils/api/action/useGetActionList'
import { usePostInquiry, UsePostInquiryParams } from '~/utils/api/additionalServices/useGetLicenseInfo'
import {
  UnBlockedUserParams,
  useBlockUserCheckAction,
  useUnBlockedUserCheckAction,
} from '~/utils/api/block/useBlockUserAction'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetJournalistContact } from '~/utils/api/contact/journalist/useGetJournalistContact'
import { usePostJournalistContactCreateUpdate } from '~/utils/api/contact/journalist/usePostJournalistContactCreateUpdate'
import { apiGetMediaContact } from '~/utils/api/contact/media/useGetMediaContact'
import { usePostMediaContactCreateUpdate } from '~/utils/api/contact/media/usePostMediaContactCreateUpdate'
import { useDeleteContactInfo } from '~/utils/api/contact/useDeleteContactInfo'
import { usePostJournalistCustomSearchCreate } from '~/utils/api/customSearch/journalist/usePostJournalistCustomSearchCreate'
import { usePostJournalistCustomSearchNameCheck } from '~/utils/api/customSearch/journalist/usePostJournalistCustomSearchNameCheck'
import { usePostMediaCustomSearchCreate } from '~/utils/api/customSearch/media/usePostMediaCustomSearchCreate'
import { usePostMediaCustomSearchNameCheck } from '~/utils/api/customSearch/media/usePostMediaCustomSearchNameCheck'
import { useDeleteJournalistExcluded } from '~/utils/api/email/journalist/useDeleteJournalistExcluded'
import { apiGetJournalistExcluded } from '~/utils/api/email/journalist/useGetJournalistExcluded'
import { usePostJournalistExcluded } from '~/utils/api/email/journalist/usePostJournalistExcluded'
import { useDeleteMediaExcluded } from '~/utils/api/email/media/useDeleteMediaExcluded'
import { apiGetMediaExcluded } from '~/utils/api/email/media/useGetMediaExcluded'
import { usePostMediaExcluded } from '~/utils/api/email/media/usePostMediaExcluded'
import { apiPostMediapassDecode } from '~/utils/api/encrypt/usePostMediapassDecode'
import {
  usePostJournalistGroupAddJournalId,
  usePostJournalistGroupAddJournalIdAuto,
} from '~/utils/api/groupList/journalist/usePostJournalistGroupAddJournalist'
import {
  usePostMediaGroupAddMedia,
  usePostMediaGroupAddMediaAuto,
} from '~/utils/api/groupList/media/usePostMediaGroupAddMedia'
import { apiGetJournalistNameAutoComplete } from '~/utils/api/journalist/useGetJournalistNameAutoComplete'
import { useGetJournalistExcel } from '~/utils/api/journalist/useJournalistExcel'
import { usePostJournalistNewsSearch, usePostJournalistSearch } from '~/utils/api/journalist/usePostJournalistSearch'
import { useGetMediaExcel } from '~/utils/api/media/useGetMediaExcel'
import { apiGetMediaNameAutoComplete } from '~/utils/api/media/useGetMediaNameAutoComplete'
import { usePostMediaSearch } from '~/utils/api/media/usePostMediaSearch'
import { usePostNewsSearch } from '~/utils/api/news/usePostNewsSearch'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { useDeleteJournalist } from '~/utils/api/userCustom/journalist/useDeleteJournalist'
import { usePutJournalistPhoto } from '~/utils/api/userCustom/journalist/usePutJournalistImage'
import { usePutJournalistImageDelete } from '~/utils/api/userCustom/journalist/usePutJournalistImageDelete'
import { useDeleteMedia } from '~/utils/api/userCustom/media/useDeleteMedia'
import { usePutMediaLogo } from '~/utils/api/userCustom/media/usePutMediaLogo'
import { usePutMediaLogoDelete } from '~/utils/api/userCustom/media/usePutMediaLogoDelete'
import { getObjectFromBase64, setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

const fileSizeUnit = 'MB'
const fileSizeLimit = 5
const fileLengthLimit = 5
const messages = {
  ko: {
    code100: '사진 용량이 큽니다. 작은 크기 파일로 다시 등록해 보세요. ',
    code101: '파일 갯수가 초과되었습니다.',
    code200: '파일 업로드에 실패하였습니다.',
    code201: '파일 삭제에 실패하였습니다.',
  },
  en: {
    code100: 'File size exceeded.',
    code101: 'The number of files has been exceeded.',
    code200: 'Failed to upload file.',
    code201: 'Failed to delete file.',
  },
}

export const usePressMediaSearchResult = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    profileImageId,
    contentListImageId,
    pressNewsList,
    listDefine,
    isTagButton,
    isSelectedAllNewsId,
    searchContentListButton,
    searchContentKeyList,
    isOwner,
    pressListParams,
    mediaListParams,
    journalApiList,
    mediaApiList,
    journalIdKey,
    mediaIdKey,
    journalIdKeyParam,
    mediaIdKeyParam,
    pressDto,
    mediaDto,
    pageCount,
    journalLoading,
    mediaLoading,
    filterMediaSubParamActions,
    filterJournalSubParamActions,
    filterMediaSubParam,
    filterJournalSubParam,
    mediaParamsExpandButton,
    pressParamsExpandButton,
    mediaParamKeyword,
    pressParamKeyword,
    mediaParamKeywordButton,
    pressParamKeywordButton,
    searchRegisterPopup,
    isLimitFilter,
    actionCategoryList,
    actionStateFilterList,
    journalContactInfo,
    journalEmailBlocking,
    journalDecodeList,
    journalTab,
    journalNewsCountPage,
    newsListByJournalId,
    newsLoading,
    registerJournalPhotoPopup,
    journalActivityCountPage,
    activityListByJournalId,
    activityLoading,
    actionStateList,
    addPersonalContactPopup,
    pressMediaErrPopup,
    isJournalUserBlock,
    pressMediaUnBlockPopup,
    blockedEmailSenderPopup,
    filterInformation,
    journalistSocialFilterList,
    journalistOccupationList,
    filterMediaInfoType,
    filterPubCycle,
    filterPortalCode,
    filterMediaType,
    mediaSubTypeList,
    mediaTab,
    registerMediaPhotoPopup,
    mediaActivityCountPage,
    mediaNewsCountPage,
    activityListByMediaId,
    newsListByMediaId,
    mediaEmailBlocking,
    mediaContactInfo,
    mediaDecodeList,
    isMediaUserBlock,
    isSearchedNewsOpen,
    duplicationMediaPopup,
    mediaCheckDuplicateParam,
    pressCheckDuplicateParam,
    duplicationPressPopup,
    userPopup,
    fileDownloadPopup,
    publisherTypeList,
    journalContactBlockedInfo,
    searchLimitAlarm,
    activityListTotalCount,
    newsListTotalCount,
  } = useAppSelector(state => state.pressMediaSearchResultSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone, frequentlyUsedCommonCode } =
    useAppSelector(state => state.authSlice)
  const { mediaDuplicationIdList, pressDuplicationIdList, userPressListAutoSaveData, userMediaListAutoSaveData } =
    useAppSelector(state => state.extraSlice)
  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)

  const getNewsSearchResult = usePostNewsSearch()
  const journalistSearch = usePostJournalistSearch()
  const mediaSearch = usePostMediaSearch()
  const pressRegisterCheck = usePostJournalistCustomSearchNameCheck()
  const mediaRegisterCheck = usePostMediaCustomSearchNameCheck()
  const pressRegister = usePostJournalistCustomSearchCreate()
  const mediaRegister = usePostMediaCustomSearchCreate()
  const saveJournalistPhoto = usePutJournalistPhoto()
  const deleteJournalistPhoto = usePutJournalistImageDelete()
  const saveMediaPhoto = usePutMediaLogo()
  const deleteMediaPhoto = usePutMediaLogoDelete()
  const createUpdateJournalistContact = usePostJournalistContactCreateUpdate()
  const createUpdateMediaContact = usePostMediaContactCreateUpdate()
  const deleteContactInfo = useDeleteContactInfo()
  const apiInquiryAction = usePostInquiry()
  const apiBlockUserCheckAction = useBlockUserCheckAction()
  const apiUnBlockedUserCheckAction = useUnBlockedUserCheckAction()
  const apiDeleteJournalistExcluded = useDeleteJournalistExcluded()
  const journalistGroupAddJournalistAuto = usePostJournalistGroupAddJournalIdAuto()
  const mediaGroupAddMediaAuto = usePostMediaGroupAddMediaAuto()
  const apiDeleteMediaExcluded = useDeleteMediaExcluded()
  const apiDeleteMediaIncluded = usePostMediaExcluded()
  const apiDeleteJournalistIncluded = usePostJournalistExcluded()
  const apiJournalExcel = useGetJournalistExcel()
  const apiMediaExcel = useGetMediaExcel()
  const deleteMedia = useDeleteMedia()
  const deleteJournalist = useDeleteJournalist()
  const JournalistNewsData = usePostJournalistNewsSearch()

  const changeMediaTab = async (e: string, idKey: number, props: ESearchMediaDocumentDto) => {
    if (e === 'news') {
      await getNewsSearchByMediaId(10, e, idKey)
    } else if (e === 'activity') {
      await getActivitySearchByMediaId(10, e, idKey)
    } else {
      await mediaExcluded(props?.mid || 0)
      await mediaPersonalContactInfo(props?.mid || 0)
      await checkMediaUserInvalid(props)
      dispatch(
        profileByMediaIdAction({
          mediaTab: e,
        })
      )
    }
  }

  const changeJournalTab = async (e: string, idKey: number, props: ESearchJournalistDocumentDto) => {
    if (e === 'news') {
      await getNewsSearchByJournalId(10, e, idKey)
    } else if (e === 'activity') {
      await getActivitySearchByJournalId(10, e, idKey)
    } else {
      const tempJournalDecodeList = await checkPressUserInvalid(props)
      dispatch(
        profileByJournalIdAction({
          list: tempJournalDecodeList,
          journalTab: e,
        })
      )
    }
  }

  const createPersonalContact = async (props: addPersonalContactProps, idKey: number, tabType: string) => {
    try {
      const { status, message } = await createUpdateJournalistContact.mutateAsync({
        objectId: idKey,
        email: props.email,
        phone: props.phone,
        mobile: props.telephone,
        address: props.address,
      })
      if (status === 'S') {
        openToast('개인적 연락처를 추가했습니다.', 'success')
        await dataOnChangeAction({ personalContacts: 'change' }, { personalContacts: Number(idKey) }, tabType)
        dispatch(
          addPersonalContactAction({
            isOpen: false,
            type: '',
            email: '',
            emailErr: '',
            phone: '',
            website: '',
            websiteErr: '',
            fax: '',
            telephone: '',
            address: '',
          })
        )
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
  }

  const createMediaPersonalContact = async (props: addPersonalContactProps, idKey: number, tabType: string) => {
    const { status, message } = await createUpdateMediaContact.mutateAsync({
      objectId: idKey,
      email: props.email,
      wsite: props.website,
      phone: props.phone,
      fax: props.fax,
      address: props.address,
    })
    if (status === 'S') {
      openToast('개인적 연락처를 추가했습니다.', 'success')
      await dataOnChangeAction({ personalContacts: 'change' }, { personalContacts: Number(idKey) }, tabType)
      dispatch(
        addPersonalContactAction({
          isOpen: false,
          type: '',
          email: '',
          emailErr: '',
          phone: '',
          website: '',
          websiteErr: '',
          fax: '',
          telephone: '',
          address: '',
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const pressMediaUnBlockAction = async (
    props: pressMediaUnBlockPopupProps,
    tempJournalDecodeList: journalDecodeListProps,
    origin: ESearchMediaDocumentDto | null,
    tabType: string
  ) => {
    let isProcess = false
    let titleErr = ''
    let contentErr = ''
    let params: UnBlockedUserParams = {
      blockedUserId: props.key,
      title: props.title,
      content: props.contents,
    }
    if (props.title === '') {
      titleErr = '제목을 입력하세요'
    } else if (props.contents === '') {
      contentErr = '내용을 입력하세요'
    } else {
      isProcess = true
    }
    if (isProcess) {
      const { status, data, message } = await apiUnBlockedUserCheckAction.mutateAsync(params)
      if (status === 'S') {
        openToast(message?.message, 'success')
        if (tabType !== 'press' && origin) {
          const beeEmail = origin?.isSysInfo ? origin.contacts?.all?.beemail || '' : origin?.email?.toString() || ''
          await dataOnChangeAction({ isMediaUserBlock: 'change' }, { isMediaUserBlock: beeEmail }, tabType)
        } else {
          await dataOnChangeAction(
            { isJournalUserBlock: 'change' },
            { isJournalUserBlock: tempJournalDecodeList.beemail },
            tabType
          )
        }
        dispatch(
          pressMediaUnBlockPopupAction({
            isOpen: false,
            type: '',
            key: 0,
            title: '',
            titleErr: '',
            contents: '',
            contentErr: '',
          })
        )
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      const param = {
        ...props,
        titleErr,
        contentErr,
      }
      dispatch(pressMediaUnBlockPopupAction(param))
    }
  }

  const pressMediaErrAction = async (props: pressMediaErrPopupProps) => {
    let titleErr = ''
    let contentErr = ''
    let params: UsePostInquiryParams = {
      request: {
        whyCode: 'INFO_UPDATE',
        title: props.title,
        content: props.contents,
        //@ts-ignore
        targetTitle: props.newsTitle,
      },
      fileList: [],
    }
    if (props.type === 'media') {
      //@ts-ignore
      params.request.mediaId = props.key
    } else {
      //@ts-ignore
      params.request.journalistId = props.key
    }
    if (props.title === '') {
      titleErr = '제목을 입력하세요'
    }
    if (props.contents === '') {
      contentErr = '내용을 입력하세요'
    }
    if (props.contents !== '' && props.title !== '') {
      const { status, data, message } = await apiInquiryAction.mutateAsync(params)
      if (status === 'S') {
        openToast(message?.message, 'success')
        dispatch(
          pressMediaErrPopupAction({
            isOpen: false,
            newsTitle: '',
            type: '',
            key: 0,
            title: '',
            titleErr: '',
            contents: '',
            contentErr: '',
          })
        )
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      const param = {
        ...props,
        titleErr,
        contentErr,
      }
      dispatch(pressMediaErrPopupAction(param))
    }
  }

  const dataOnChangeAction = async (
    type: dataOnChangeActionTypeProps,
    props: dataOnChangeActionProps,
    page: string
  ) => {
    if (type.personalContacts === 'change' && props.personalContacts) {
      page === 'press' && (await journalistPersonalContactInfo(props.personalContacts))
      page !== 'press' && (await mediaPersonalContactInfo(props.personalContacts))
    }
    if (type.emailBlock === 'change' && props.emailBlock) {
      page === 'press' && (await journalistExcluded(props.emailBlock))
      page !== 'press' && (await mediaExcluded(props.emailBlock))
    }
    if (type.isJournalUserBlock === 'change' && props.isJournalUserBlock) {
      await getBlockUserInfoData(props.isJournalUserBlock)
    }
  }

  const journalistUnBlockedAction = async (props: blockedEmailSenderPopupProps, idKey: number, tabType: string) => {
    const { status, message } = await apiDeleteJournalistExcluded.mutateAsync({
      id: Number(props.idKey),
      info: {
        groupId: userSelectGroup,
      },
    })
    if (status === 'S') {
      openToast('이메일 발송 차단을 해제했습니다.', 'success')
      await dataOnChangeAction({ emailBlock: 'change' }, { emailBlock: Number(idKey) }, tabType)
      dispatch(
        blockedEmailSenderPopupAction({
          isOpen: false,
          type: '',
          status: '',
          idKey: '',
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const journalistBlockedAction = async (props: blockedEmailSenderPopupProps, idKey: number, tabType: string) => {
    const { status, message } = await apiDeleteJournalistIncluded.mutateAsync({
      objectId: Number(props.idKey),
      email: props.email,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      openToast('이메일 발송을 차단했습니다.', 'success')
      await dataOnChangeAction({ emailBlock: 'change' }, { emailBlock: Number(idKey) }, tabType)
      dispatch(
        blockedEmailSenderPopupAction({
          isOpen: false,
          type: '',
          status: '',
          idKey: '',
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
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

  const ownerFunction = async (keyword: number) => {
    dispatch(
      userInformationPopupAction({
        isOpen: true,
        idKey: Number(keyword),
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

  const deleteDuplicationJournal = async (props: duplicationJournalPopupPropsProps) => {
    const { status, message } = await deleteJournalist.mutateAsync(props.key)
    if (status === 'S') {
      openToast('개인 추가 언론인을 삭제했습니다.', 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const deleteDuplicationMedia = async (props: duplicationMediaPopupProps) => {
    const { status, message } = await deleteMedia.mutateAsync(props.key)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const mediaBlockedAction = async (props: blockedEmailSenderPopupProps, idKey: number, tabType: string) => {
    const { status, message } = await apiDeleteMediaIncluded.mutateAsync({
      objectId: Number(props.idKey),
      email: props.email,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      openToast('이메일 발송을 차단했습니다.', 'success')
      await dataOnChangeAction({ emailBlock: 'change' }, { emailBlock: Number(idKey) }, tabType)
      dispatch(
        blockedEmailSenderPopupAction({
          isOpen: false,
          type: '',
          status: '',
          idKey: '',
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const moveMediaDetail = async (props: number) => {
    await router.push(`/media/record/${props}`)
  }
  const moveJournalDetail = async (props: number) => {
    await router.push(`/contacts/record/${props}`)
  }

  const mediaUnBlockedAction = async (props: blockedEmailSenderPopupProps, idKey: number, tabType: string) => {
    const { status, message } = await apiDeleteMediaExcluded.mutateAsync({
      id: Number(props.idKey),
      info: {
        groupId: userSelectGroup,
      },
    })
    if (status === 'S') {
      openToast('이메일 발송 차단을 해제했습니다.', 'success')
      await dataOnChangeAction({ emailBlock: 'change' }, { emailBlock: Number(idKey) }, tabType)
      dispatch(
        blockedEmailSenderPopupAction({
          isOpen: false,
          type: '',
          status: '',
          idKey: '',
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const deletePersonalContact = async (idKey: string, tabType: string) => {
    const { status, message } = await deleteContactInfo.mutateAsync(Number(idKey))
    if (status === 'S') {
      openToast(message?.message, 'success')
      await dataOnChangeAction({ personalContacts: 'change' }, { personalContacts: Number(idKey) }, tabType)
      dispatch(
        addPersonalContactAction({
          isOpen: false,
          type: '',
          email: '',
          emailErr: '',
          phone: '',
          website: '',
          websiteErr: '',
          fax: '',
          telephone: '',
          address: '',
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const getActivitySearchByJournalId = async (size: number, e: string, idKey: number) => {
    //dispatch(activityLoadingAction(true))
    let searchContentList: searchContentListProps[] = []
    try {
      const { status, data, message } = await apiGetActionListByConfition({
        groupId: userSelectGroup,
        journalistIdList: [idKey.toString()],
        page: 1,
        size,
        sort: ['updateAt!desc'],
      })
      if (status === 'S') {
        const res = data as PageActionDtoForList
        if (res.content && res.content.length > 0) {
          for await (const paramElement of res.content) {
            const temp = {
              ...paramElement,
              categoryName: '',
              stateName: '',
            }
            const findCategory = actionCategoryList.find(e => e.id === paramElement.category)
            if (findCategory) {
              temp.categoryName = findCategory.name
            }
            if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
              const findStateFilter = actionStateFilterList.find(e => e.id === paramElement.state_filter)
              if (findStateFilter) {
                temp.stateName = findStateFilter.name
              }
            } else {
              const findState = actionStateList.find(e => e.id === paramElement.state)
              if (findState) {
                temp.stateName = findState.name
              }
            }
            searchContentList = [...searchContentList, temp]
          }
        }
        dispatch(
          activityListByJournalIdAction({
            list: searchContentList,
            page: size,
            journalTab: e,
            totalCount: res.totalElements ?? 0,
          })
        )
      }
    } catch (e) {}
    dispatch(activityLoadingAction(false))
  }

  const getActivitySearchByMediaId = async (size: number, e: string, idKey: number) => {
    //dispatch(activityLoadingAction(true))
    let searchContentList: searchContentListProps[] = []
    try {
      const { status, data, message } = await apiGetActionListByConfition({
        groupId: userSelectGroup,
        mediaIdList: [idKey.toString()],
        page: 1,
        size,
        sort: ['updateAt!desc'],
      })
      if (status === 'S') {
        const res = data as PageActionDtoForList
        if (res.content && res.content.length > 0) {
          for await (const paramElement of res.content) {
            const temp = {
              ...paramElement,
              categoryName: '',
              stateName: '',
            }
            const findCategory = actionCategoryList.find(e => e.id === paramElement.category)
            if (findCategory) {
              temp.categoryName = findCategory.name
            }
            if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
              const findStateFilter = actionStateFilterList.find(e => e.id === paramElement.state_filter)
              if (findStateFilter) {
                temp.stateName = findStateFilter.name
              }
            } else {
              const findState = actionStateList.find(e => e.id === paramElement.state)
              if (findState) {
                temp.stateName = findState.name
              }
            }
            searchContentList = [...searchContentList, temp]
          }
        }
        dispatch(
          activityListByMediaIdAction({
            list: searchContentList,
            page: size,
            mediaTab: e,
            totalCount: res.totalElements ?? 0,
          })
        )
      }
    } catch (e) {}
    dispatch(activityLoadingAction(false))
  }

  const getNewsSearchByJournalId = async (size: number, e: string, idKey: number) => {
    //dispatch(newsLoadingAction(true))
    try {
      const { status, message, data } = await getNewsSearchResult.mutateAsync({
        timezone: timeZone,
        periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
        periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
        periodStartDay: moment().subtract({ year: 2 }).format('DD'),
        periodEndYear: moment().format('YYYY'),
        periodEndMonth: moment().format('MM'),
        periodEndDay: moment().format('DD'),
        page: 1,
        size,
        sort: [`inserted!desc`, `newsid!desc`],
        groupId: userSelectGroup,
        journalistIdList: [idKey],
      })
      if (status === 'S') {
        const newsData = data as ElasticSearchReturnDtoNewsDocumentDto
        dispatch(
          newsListByJournalIdAction({
            list: newsData.name as unknown as MonitoringSearchNewsDocumentDto[],
            page: size,
            journalTab: e,
            totalCount: newsData.totalElements ?? 0,
          })
        )
      }
    } catch (e) {}
    dispatch(newsLoadingAction(false))
  }

  const getNewsSearchByMediaId = async (size: number, e: string, idKey: number) => {
    //dispatch(newsLoadingAction(true))
    try {
      const { status, message, data } = await getNewsSearchResult.mutateAsync({
        timezone: timeZone,
        periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
        periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
        periodStartDay: moment().subtract({ year: 2 }).format('DD'),
        periodEndYear: moment().format('YYYY'),
        periodEndMonth: moment().format('MM'),
        periodEndDay: moment().format('DD'),
        page: 1,
        size,
        sort: [`inserted!desc`, `newsid!desc`],
        groupId: userSelectGroup,
        mediaIdList: [idKey],
      })
      if (status === 'S') {
        const newsData = data as ElasticSearchReturnDtoNewsDocumentDto
        dispatch(
          newsListByMediaIdAction({
            list: newsData.name as unknown as MonitoringSearchNewsDocumentDto[],
            page: size,
            mediaTab: e,
            totalCount: newsData.totalElements ?? 0,
          })
        )
      }
    } catch (e) {}
    //dispatch(newsLoadingAction(false))
  }

  const getPressNews = async (press: number[], newsKey: string) => {
    let res: pressNewsData[] = []
    try {
      const { status, message, data } = await JournalistNewsData.mutateAsync({
        journalistIdList: press,
        news: newsKey,
      })
      if (status === 'S') {
        res = data as pressNewsData[]
        dispatch(pressNewsListAction(res))
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
  }

  const getJournalist = async (params: ESearchJournalistCondDto) => {
    let res: ElasticSearchReturnDtoJournalistDocumentDto | null = null
    try {
      const { status, message, data } = await journalistSearch.mutateAsync({
        ...params, // @ts-ignore
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        res = data as ElasticSearchReturnDtoJournalistDocumentDto
        if (res.name && res.name.length > 0 && params?.news && params?.news !== '') {
          const pressIdKeyList = res.name?.map(e => Number(e.jrnlst_id))
          getPressNews(pressIdKeyList, params?.news)
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}

    return res
  }

  const getSize = (size: number, unit: string = 'kb') => {
    let calcuratedSize = 0
    if (unit === 'kb') {
      calcuratedSize = size / 1024
    } else if (unit === 'mb') {
      calcuratedSize = size / 1024 / 1024
    }
    return Number(calcuratedSize.toFixed(2))
  }

  const processUpload = (file: File, fileUnit: string): Promise<{ code: string; data: FileType }> => {
    return new Promise((resolve, reject) => {
      const res = {
        code: '',
        data: {},
      }
      try {
        let fileSrc = ''
        let width = 0
        let height = 0
        const mimeType = file.type
        const isImage = mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/gif'
        if (isImage) {
          const reader = new FileReader()

          reader.onload = function (event) {
            const image = new Image()

            image.onload = function () {
              width = image.width
              height = image.height

              res.code = ''
              res.data = {
                width,
                height,
                isImage,
                file,
                fileSrc,
                id: uuid(),
                size: getSize(file.size, fileUnit ? fileUnit.toLocaleLowerCase() : 'kb'),
                mimeType,
              }
              resolve(res)
            }

            image.onerror = function () {
              res.code = '잘못된 이미지 입니다'
              resolve(res)
            }

            //@ts-ignore
            image.src = event.target.result
            fileSrc = event.target?.result as string
          }

          reader.onerror = function () {
            res.code = '파일이 손상되었습니다'
            resolve(res)
          }

          reader.readAsDataURL(file)
        }
      } catch (e) {
        res.code = '파일 업로드에 실패하였습니다.'
        resolve(res)
      }
    })
  }

  const setMediaDeleteGroupExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchMediaCondDto,
    params: mediaSearchOptionProps
  ) => {
    try {
      let filterCount = 0
      let filterDto = { ...hook, page: 1 }
      let tempFilterSubParam = [...item]
      let getIdParams = key.map(e => e.id)
      let difference = tempFilterSubParam[keyValue].values.filter(item => !getIdParams.includes(item))
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: difference,
      }

      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategory') {
          filterDto.filterFieldList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterLocation') {
          filterDto.filterLocationList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterType') {
          // @ts-ignore
          filterDto.filterCategoryList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp.values[0]
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
          filterDto.filterPubCycleList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPortal') {
          filterDto.filterPortalList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        }
      }
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterMediaApiAction(filterDto, params, tempFilterSubParam)
      }
    } catch (e) {}
  }

  const setMediaAddAllExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchMediaCondDto,
    params: mediaSearchOptionProps
  ) => {
    try {
      let filterCount = 0
      let filterDto = { ...hook, page: 1 }
      let tempFilterSubParam = [...item]
      let getIdParams = key.map(e => e.id)
      let difference = tempFilterSubParam[keyValue].values.filter(item => !getIdParams.includes(item))
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: difference.concat(getIdParams),
      }

      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategory') {
          filterDto.filterFieldList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterLocation') {
          filterDto.filterLocationList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterType') {
          // @ts-ignore
          filterDto.filterCategoryList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp.values[0]
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
          filterDto.filterPubCycleList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPortal') {
          filterDto.filterPortalList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        }
      }
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterMediaApiAction(filterDto, params, tempFilterSubParam)
      }
    } catch (e) {}
  }

  const setMediaAddExtraFilterSearch = async (
    e: ChangeEvent<HTMLInputElement>,
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchMediaCondDto,
    params: mediaSearchOptionProps
  ) => {
    try {
      let filterCount = 0
      let filterDto = { ...hook, page: 1 }
      let tempFilterSubParam = [...item]
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: e.target.checked
          ? [...tempFilterSubParam[keyValue].values, key.id]
          : tempFilterSubParam[keyValue].values.filter(e => e !== key.id),
      }

      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategory') {
          filterDto.filterFieldList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterLocation') {
          filterDto.filterLocationList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterType') {
          // @ts-ignore
          filterDto.filterCategoryList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp.values[0]
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
          filterDto.filterPubCycleList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPortal') {
          filterDto.filterPortalList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        }
      }
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterMediaApiAction(filterDto, params, tempFilterSubParam)
      }
    } catch (e) {}
  }

  const setPressAddAllExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchJournalistCondDto,
    params: pressSearchOptionProps
  ) => {
    try {
      let filterCount = 0
      let filterDto = { ...hook, page: 1 }
      let tempFilterSubParam = [...item]
      let getIdParams = key.map(e => e.id)
      let difference = tempFilterSubParam[keyValue].values.filter(item => !getIdParams.includes(item))
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: difference.concat(getIdParams),
      }

      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategory') {
          filterDto.filterFieldList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterLocation') {
          filterDto.filterLocationList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterOccupation') {
          filterDto.filterOccupationList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterType') {
          // @ts-ignore
          filterDto.filterCategoryList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp.values[0]
        } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
          filterDto.filterPubCycleList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPortal') {
          filterDto.filterPortalList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterSocial') {
          filterDto.filterSocialList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        }
      }
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterPressApiAction(filterDto, params, tempFilterSubParam)
      }
    } catch (e) {}
  }

  const setPressDeleteGroupExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchJournalistCondDto,
    params: pressSearchOptionProps
  ) => {
    try {
      let filterCount = 0
      let filterDto = { ...hook, page: 1 }
      let tempFilterSubParam = [...item]
      let getIdParams = key.map(e => e.id)
      let difference = tempFilterSubParam[keyValue].values.filter(item => !getIdParams.includes(item))
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: difference,
      }

      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategory') {
          filterDto.filterFieldList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterLocation') {
          filterDto.filterLocationList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterOccupation') {
          filterDto.filterOccupationList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterType') {
          // @ts-ignore
          filterDto.filterCategoryList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp.values[0]
        } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
          filterDto.filterPubCycleList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPortal') {
          filterDto.filterPortalList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterSocial') {
          filterDto.filterSocialList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        }
      }
      console.log('filterCount', filterCount)
      console.log('filterDto', filterDto)
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterPressApiAction(filterDto, params, tempFilterSubParam)
      }
    } catch (e) {}
  }

  const setPressAddExtraFilterSearch = async (
    e: ChangeEvent<HTMLInputElement>,
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchJournalistCondDto,
    params: pressSearchOptionProps
  ) => {
    try {
      let filterCount = 0
      let filterDto = { ...hook, page: 1 }
      let tempFilterSubParam = [...item]
      tempFilterSubParam[keyValue] = {
        ...tempFilterSubParam[keyValue],
        values: e.target.checked
          ? [...tempFilterSubParam[keyValue].values, key.id]
          : tempFilterSubParam[keyValue].values.filter(e => e !== key.id),
      }

      for await (const filterSubParamActionsProp of tempFilterSubParam) {
        if (filterSubParamActionsProp.id === 'filterCategory') {
          filterDto.filterFieldList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterLocation') {
          filterDto.filterLocationList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterOccupation') {
          filterDto.filterOccupationList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterType') {
          // @ts-ignore
          filterDto.filterCategoryList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterInformation') {
          filterDto.filterValue = filterSubParamActionsProp.values[0]
        } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
          filterDto.filterPubCycleList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterPortal') {
          filterDto.filterPortalList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterSourceType') {
          filterDto.filterSourceType = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        } else if (filterSubParamActionsProp.id === 'filterSocial') {
          filterDto.filterSocialList = filterSubParamActionsProp.values
          filterCount += filterSubParamActionsProp.values.length
        }
      }
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterPressApiAction(filterDto, params, tempFilterSubParam)
      }
    } catch (e) {}
  }

  const filterMediaApiAction = async (
    filterDto: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    tempFilterSubParam: filterSubParamActionsProps[]
  ) => {
    dispatch(mediaLoadingAction(true))
    const res = await getMediaList(filterDto)
    if (res) {
      const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / filterDto.size)
      const filter = setObjectToBase64({
        ...filterDto,
        ...props.keywordParam,
        ...props.additionalParam,
        media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
        key_id: 'media',
      })
      if (mediaData && mediaData.length > 0) {
        await mediaExcluded(mediaData[0].mid ? mediaData[0]?.mid : 0)
        await mediaPersonalContactInfo(mediaData[0].mid ? mediaData[0].mid : 0)
        await checkMediaUserInvalid(mediaData[0])
      }
      dispatch(
        setOnChangeMediaFilterSearchOptionAction({
          props,
          dto: filterDto,
          tempFilterSubParam: tempFilterSubParam,
          mediaData,
          pageCount: {
            totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
          },
        })
      )
      await router.replace(`/media/search-result?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(mediaLoadingAction(false))
  }

  const filterPressApiAction = async (
    filterDto: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    tempFilterSubParam: filterSubParamActionsProps[]
  ) => {
    let tempJournalDecodeList = {
      beemail: '',
      mobile: '',
      landline: '',
      landlineShared: '',
      fax: '',
    }
    dispatch(journalLoadingAction(true))
    const res = await getJournalist(filterDto)
    if (res) {
      const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / filterDto.size)
      const filter = setObjectToBase64({
        ...filterDto,
        ...props.keywordParam,
        ...props.additionalParam,
        journalist_id: journalData.length > 0 ? (journalData[0].jrnlst_id ? journalData[0].jrnlst_id : 0) : 0,
        key_id: 'press',
      })
      if (journalData && journalData.length > 0) {
        tempJournalDecodeList = await checkPressUserInvalid(journalData[0])
      }
      dispatch(
        setOnChangePressFilterSearchOptionAction({
          props,
          dto: filterDto,
          tempFilterSubParam: tempFilterSubParam,
          journalData,
          pageCount: {
            totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
          },
          journalDecodeList: tempJournalDecodeList,
        })
      )
      await router.replace(`/contacts/search-result?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(journalLoadingAction(false))
  }

  const handlePressChangeSize = async (e: number, params: ESearchJournalistCondDto, props: pressSearchOptionProps) => {
    const apiParam = {
      ...params,
      page: 1,
      size: e,
    }
    await getPressBySearchOption(apiParam, props, 'size')
  }

  const handlePressPaginationChange = async (
    e: number,
    params: ESearchJournalistCondDto,
    props: pressSearchOptionProps
  ) => {
    if (Number(e) * Number(params.size) >= 20000) {
      dispatch(searchLimitAlarmAction(true))
    } else {
      await getPressBySearchOption(
        {
          ...params,
          page: e,
          size: params.size,
        },
        props,
        'page'
      )
    }
  }

  const handleMediaChangeSize = async (e: number, params: ESearchMediaCondDto, props: mediaSearchOptionProps) => {
    const apiParam = {
      ...params,
      page: 1,
      size: e,
    }
    await getMediaBySearchOption(apiParam, props, 'size')
  }

  const handleMediaPaginationChange = async (e: number, params: ESearchMediaCondDto, props: mediaSearchOptionProps) => {
    if (Number(e) * Number(params.size) >= 20000) {
      dispatch(searchLimitAlarmAction(true))
    } else {
      await getMediaBySearchOption(
        {
          ...params,
          page: e,
          size: params.size,
        },
        props,
        'page'
      )
    }
  }

  const mediaKeywordSearch = async (e: string, params: ESearchMediaCondDto, props: mediaSearchOptionProps) => {
    const apiParam = {
      ...params,
      filter: e,
      page: 1,
    }
    await getMediaBySearchOption(apiParam, props, 'filter')
  }

  const handleMediaChangeSort = async (
    e: SelectListOptionItem,
    i: SelectListOptionItem,
    sortValue: string,
    params: ESearchMediaCondDto,
    props: mediaSearchOptionProps
  ) => {
    let sort = [`${e.id}!${i.id}`]
    if (sortValue !== 'order') {
      if (e.id === '_score') {
        sort = [`_score!${'desc'}`]
      } else if (e.id === 'values.combined_new') {
        sort = [`values.combined_new!${'desc'}`]
      } else if (e.id === 'name') {
        sort = [`name!${'asc'}`]
      }
    }
    await getMediaBySearchOption(
      {
        ...params,
        sort,
        page: 1,
      },
      props,
      'sort'
    )
  }

  const pressKeywordSearch = async (e: string, params: ESearchJournalistCondDto, props: pressSearchOptionProps) => {
    const apiParam = {
      ...params,
      filter: e,
      page: 1,
    }
    await getPressBySearchOption(apiParam, props, 'filter')
  }

  const handlePressChangeSort = async (
    e: SelectListOptionItem,
    i: SelectListOptionItem,
    sortValue: string,
    params: ESearchJournalistCondDto,
    props: pressSearchOptionProps
  ) => {
    let sort = [`${e.id}!${i.id}`]
    if (sortValue !== 'order') {
      if (e.id === 'media.main.price') {
        sort = [`media.main.price!${'desc'}`, 'news.recent_3m_count!desc']
      } else if (e.id === 'name') {
        sort = [`name!${'asc'}`]
      } else if (e.id === 'media.main.name') {
        sort = [`media.main.name!${'asc'}`]
      } else if (e.id === '_score') {
        sort = [`_score!${'desc'}`]
      } else if (e.id === 'char_len') {
        sort = [`char_len!${'desc'}`]
      }
    }

    await getPressBySearchOption(
      {
        ...params,
        page: 1,
        sort,
      },
      props,
      'sort'
    )
  }

  const setInitMediaFilterSubParamActions = async (apiParam: ESearchMediaCondDto, props: mediaSearchOptionProps) => {
    const param = {
      ...apiParam,
      filterFieldList: [],
      filterLocationList: [],
      filterCategoryList: [],
      filterValue: '',
      filterPubCycleList: [],
      filterPortalList: [],
      filterSourceType: [],
      page: 1,
    }
    dispatch(isLimitFilterAction(0))
    await filterMediaApiAction(param, props, subMediaFilterOptionsList)
  }

  const setInitPressFilterSubParamActions = async (
    apiParam: ESearchJournalistCondDto,
    props: pressSearchOptionProps
  ) => {
    const param = {
      ...apiParam,
      filterFieldList: [],
      filterLocationList: [],
      filterOccupationList: [],
      filterCategoryList: [],
      filterValue: '',
      filterPubCycleList: [],
      filterPortalList: [],
      filterSourceType: [],
      filterSocialList: [],
      page: 1,
    }
    dispatch(isLimitFilterAction(0))
    await filterPressApiAction(param, props, subJournalFilterOptionsList)
  }

  const pressFilterOptionAction = async (keyOption: string, props: ESearchJournalistDocumentDto[]) => {
    let temp: MbTagSearchTagItem[] = []
    let typeList: SelectListOptionItem[] = []
    if (props && props.length > 0) {
      for await (const shareCodeElement of props) {
        if (shareCodeElement.jrnlst_id) {
          temp = [
            ...temp,
            {
              id: shareCodeElement.jrnlst_id?.toString() ?? uuid(),
              label: shareCodeElement.media?.main?.name
                ? `${shareCodeElement.name} - ${shareCodeElement.media?.main?.name || ''}`
                : shareCodeElement?.name || '',
              className: 'journalistId',
            },
          ]
        }
      }
      if (temp && temp.length > 0) {
        if (keyOption === 'release') {
          dispatch(
            pressReleaseDataExtraAction({
              journalistId: temp,
              mediaId: [],
              jrnlstListId: [],
              mediaListId: [],
              targetRelease: [],
            })
          )
          await router.push({
            pathname: '/press-release',
            query: {
              targetList: true,
            },
          })
        } else if (keyOption === 'excel') {
          let journalistIdList: number[] = []
          for await (const paramElement of props) {
            if (!paramElement.isSysInfo) {
              journalistIdList = [...journalistIdList, Number(paramElement.jrnlst_id)]
            }
          }
          const res = await apiJournalExcel.mutateAsync({
            journalistIdList,
          })
          if (res) {
            const excel = res as Blob
            const blob = new Blob([excel], { type: 'ms-vnd/excel' })

            const downloadUrl = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = downloadUrl
            // @ts-ignore
            link.download = '언론인 목록 내보내기(downloaded_file).xlsx'
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(downloadUrl)
            document.body.removeChild(link)
            dispatch(setSearchContentKeyListAction([]))
          } else {
            openToast('내보내기에 실패하였습니다', 'error')
          }
        } else if (keyOption === 'email') {
          dispatch(
            tagetListOpenEmailPopupAction({
              name: userInfo.name,
              scrop: shareCodeData.distribute,
              tagPressList: temp,
              receiverGroup: 'press',
            })
          )
        } else {
          const actionCategoryList = await getCommonCode('ACTION_CATEGORY_ALL')
          const actionStateFilterList = await getCommonCode('ACTION_STATE_FILTER')
          if (actionCategoryList && actionCategoryList.length > 0) {
            for await (const eElement of actionCategoryList) {
              if (
                eElement.code !== 'NEWSWIRE_RELEASE' &&
                eElement.code !== 'PRESS_RELEASE' &&
                eElement.code !== 'MAILING'
              ) {
                typeList = [
                  ...typeList,
                  {
                    id: eElement.code,
                    name: eElement.name,
                  },
                ]
              }
            }
          }
          dispatch(
            initActivityPopupAction({
              keyValue: 0,
              isOpen: true,
              loading: false,
              title: '',
              type: [{ id: '', name: '선택' }, ...typeList],
              state:
                actionStateFilterList && actionStateFilterList.length > 0
                  ? actionStateFilterList.map(e => {
                      return { id: e.code, name: e.name }
                    })
                  : [],
              typeValue: { id: '', name: '선택' },
              scrop: shareCodeData.action,
              targetDataList: temp,
              receiverGroup: 'press',
            })
          )
        }
      }
    }
  }

  const pressProfileOptionAction = async (
    keyOption: string,
    props: ESearchJournalistDocumentDto,
    targetEmail: string
  ) => {
    let temp: MbTagSearchTagItem[] = []
    if (props) {
      if (keyOption === 'release' || keyOption === 'email') {
        temp = [
          {
            id: props.jrnlst_id?.toString() ?? uuid(),
            label: `${props.name} - ${props.media?.main?.name}` ?? '',
            className: 'journalistId',
          },
        ]
      } else {
        temp = [
          {
            id: targetEmail,
            label: targetEmail,
          },
        ]
      }
    }
    if (keyOption === 'release') {
      dispatch(
        pressReleaseDataExtraAction({
          journalistId: temp,
          mediaId: [],
          jrnlstListId: [],
          mediaListId: [],
          targetRelease: [],
        })
      )
      await router.push({
        pathname: '/press-release',
        query: {
          targetList: true,
        },
      })
    } else if (keyOption === 'email') {
      dispatch(
        tagetListOpenEmailPopupAction({ name: userInfo.name, scrop: shareCodeData.distribute, tagPressList: temp })
      )
    } else if (keyOption === 'targetEmail') {
      dispatch(
        tagetListOpenEmailPopupAction({
          name: userInfo.name,
          scrop: shareCodeData.distribute,
          targetEmail: temp,
          tagPressList: [],
        })
      )
    } else if (keyOption === 'targetRelease') {
      dispatch(
        pressReleaseDataExtraAction({
          journalistId: [],
          mediaId: [],
          jrnlstListId: [],
          mediaListId: [],
          targetRelease: temp,
        })
      )
      await router.push({
        pathname: '/press-release',
        query: {
          targetList: true,
        },
      })
    }
  }

  const mediaProfileOptionAction = async (keyOption: string, props: ESearchMediaDocumentDto, targetEmail: string) => {
    let temp: MbTagSearchTagItem[] = []
    if (props) {
      if (keyOption === 'release' || keyOption === 'email') {
        temp = [
          {
            id: props.mid?.toString() ?? uuid(),
            label: `${props.name} - ${props.subtype}` ?? '',
            className: 'mediaId',
          },
        ]
      } else {
        temp = [
          {
            id: targetEmail,
            label: targetEmail,
          },
        ]
      }
    }
    if (keyOption === 'release') {
      dispatch(
        pressReleaseDataExtraAction({
          journalistId: [],
          mediaId: temp,
          jrnlstListId: [],
          mediaListId: [],
          targetRelease: [],
        })
      )
      await router.push({
        pathname: '/press-release',
        query: {
          targetList: true,
        },
      })
    } else if (keyOption === 'email') {
      dispatch(
        tagetListOpenEmailPopupAction({ name: userInfo.name, scrop: shareCodeData.distribute, tagPressList: temp })
      )
    } else if (keyOption === 'targetEmail') {
      dispatch(
        tagetListOpenEmailPopupAction({
          name: userInfo.name,
          scrop: shareCodeData.distribute,
          targetEmail: temp,
          tagPressList: [],
        })
      )
    } else if (keyOption === 'targetRelease') {
      dispatch(
        pressReleaseDataExtraAction({
          journalistId: [],
          mediaId: [],
          jrnlstListId: [],
          mediaListId: [],
          targetRelease: temp,
        })
      )
      await router.push({
        pathname: '/press-release',
        query: {
          targetList: true,
        },
      })
    }
  }

  const setPressSearchRegistPopupAction = async (
    e: boolean,
    idList: ESearchJournalistDocumentDto[],
    valueKey?: string
  ) => {
    let pressRegistListNull = false
    let userpressRegistList: number[] = []
    if (idList && idList.length > 0) {
      for await (const idListProp of idList) {
        if (!pressRegistListNull) {
          // @ts-ignore
          if (idListProp.journalistGroupList && idListProp.journalistGroupList.length > 0) {
            const currentPressRegistId = idListProp.journalistGroupList.map(i => Number(i.id))
            if (userpressRegistList.length > 0) {
              userpressRegistList = userpressRegistList.filter(item => currentPressRegistId.includes(item))
            } else {
              userpressRegistList = currentPressRegistId
            }
          } else {
            pressRegistListNull = true
          }
        }
      }
    }
    if (valueKey) {
      const find = userpressRegistList.find(k => k.toString() === valueKey)
      if (!find) {
        userpressRegistList = [...userpressRegistList, Number(valueKey)]
        pressRegistListNull = false
      }
    }

    dispatch(
      initSearchRegisterListPopupAction({
        isOpen: e,
        kind: 'press',
        type: 'add',
        list: [],
        origin: [],
        except: pressRegistListNull ? [] : userpressRegistList,
        mediaIdList: [],
        journalIdList: idList,
      })
    )
  }

  const checkAutoRegisterSelectedPressRegist = async (
    e: boolean,
    idList: ESearchJournalistDocumentDto[],
    userPressRegistList: userAutoSaveDataProps[],
    originIdList: ESearchJournalistDocumentDto[],
    originId: ESearchJournalistDocumentDto,
    dto: ESearchJournalistCondDto
  ) => {
    let isProcess = false
    if (userPressRegistList && userPressRegistList.length > 0) {
      const find = userPressRegistList.find(i => i.groupId.toString() === userSelectGroup.toString())
      if (find) {
        if (idList && idList.length === 1 && idList[0].journalistGroupList) {
          const findAutoClipbook = idList[0].journalistGroupList.find(
            i => i?.id?.toString() === find.keyValue.toString()
          )
          if (findAutoClipbook) {
            isProcess = true
          } else {
            const autoProcess = await insertPressToPressRegistId(
              [],
              idList.map(e => Number(e.jrnlst_id)),
              { key: find.keyValue.toString(), name: find.keyName },
              userPressRegistList,
              'checked',
              idList
            )
            if (autoProcess !== 'S') {
              isProcess = true
            }
          }
        } else {
          isProcess = true
        }
      } else {
        isProcess = true
      }
    } else {
      isProcess = true
    }

    if (isProcess) {
      await setPressSearchRegistPopupAction(e, idList)
    } else {
      await afterPressRegistAddReLoad(dto, originIdList, originId)
    }
  }

  const afterPressRegistAddReLoad = async (
    dto: ESearchJournalistCondDto,
    originData: ESearchJournalistDocumentDto[],
    originParam: ESearchJournalistDocumentDto,
    resultSearchRegisterListProps?: searchRegisterListProps[]
  ) => {
    let pressParam = originParam
    let pressList = [...originData]
    //dispatch(journalLoadingAction(true))
    try {
      const res = await getJournalist(dto)
      if (res) {
        const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
        if (journalData && journalData.length > 0) {
          const find = journalData.find(k => k.jrnlst_id === originParam?.jrnlst_id)
          pressParam = find ? find : originParam
          pressList = journalData
        }
      }
      let timer: NodeJS.Timeout | undefined
      if (timer) {
        clearTimeout(timer)
      }
      dispatch(countLoadingAction(true))
      timer = setTimeout(async () => {
        dispatch(countLoadingAction(false))
        dispatch(
          afterPressRegistAddPressListAction({
            list: pressList,
            pressParam: pressParam,
          })
        )
        if (resultSearchRegisterListProps && resultSearchRegisterListProps.length > 0) {
          openToast(
            PressAddRegisterContext({
              valueName: resultSearchRegisterListProps,
              onChangeAction: async k => {
                await router.replace(`/contacts/list-result?jrnlstList_id=${k}`, undefined, {
                  shallow: true,
                })
                router.reload()
              },
              onChangeTotalAction: async () => {
                await router.replace(`/contacts/list`, undefined, {
                  shallow: true,
                })
                router.reload()
              },
            }),
            'success'
          )
        }
      }, 2000)
    } catch (e) {}
    //dispatch(journalLoadingAction(false))
    dispatch(initPressMediaListBookPopupAction())
  }

  const autoRegisterPressRegistIdAction = (
    userPressRegistList: userAutoSaveDataProps[],
    autoPressRegistId: { key: string; name: string },
    type: string,
    eSearchJournalist?: ESearchJournalistDocumentDto[]
  ) => {
    let autoCompleteData = [...userPressRegistList]
    if (autoCompleteData && autoCompleteData.length > 0) {
      const findIndex = autoCompleteData.findIndex(e => e.groupId.toString() === userSelectGroup.toString())
      if (findIndex !== undefined && findIndex !== null && findIndex > -1) {
        autoCompleteData[findIndex] = {
          groupId: userSelectGroup || 0,
          keyValue: Number(autoPressRegistId.key),
          keyName: autoPressRegistId.name,
        }
      } else {
        autoCompleteData = [
          ...autoCompleteData,
          {
            groupId: userSelectGroup || 0,
            keyValue: Number(autoPressRegistId.key),
            keyName: autoPressRegistId.name,
          },
        ]
      }
    } else {
      autoCompleteData = [
        ...autoCompleteData,
        {
          groupId: userSelectGroup || 0,
          keyValue: Number(autoPressRegistId.key),
          keyName: autoPressRegistId.name,
        },
      ]
    }
    let timer: NodeJS.Timeout | undefined
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(countLoadingAction(true))
    timer = setTimeout(async () => {
      dispatch(countLoadingAction(false))
      dispatch(userPressListAutoSaveDataAction(autoCompleteData))
      if (type !== '') {
        openToast(
          PressAutoRegisterContext({
            valueName: autoPressRegistId.name,
            onChangeAction: () => {
              type === 'checked'
                ? setPressSearchRegistPopupAction(
                    true,
                    eSearchJournalist ? eSearchJournalist : [],
                    autoPressRegistId.key
                  )
                : setOnePressSearchRegistPopupAction(
                    true,
                    eSearchJournalist ? eSearchJournalist[0] : null,
                    autoPressRegistId.key
                  )
            },
          }),
          'success'
        )
      }
    }, 2000)
  }

  const setOnePressSearchRegistPopupAction = async (
    e: boolean,
    idList: ESearchJournalistDocumentDto | null,
    valueKey?: string
  ) => {
    let list: number[] = []
    if (idList && idList.journalistGroupList && idList.journalistGroupList.length > 0) {
      for await (const journalistGroupListProp of idList.journalistGroupList) {
        list = [...list, Number(journalistGroupListProp.id)]
      }
    }
    if (valueKey) {
      const find = list.find(k => k.toString() === valueKey)
      if (!find) {
        list = [...list, Number(valueKey)]
      }
    }

    dispatch(
      initSearchRegisterListPopupAction({
        isOpen: e,
        kind: 'press',
        type: 'any',
        origin: list,
        list: list,
        except: [],
        mediaIdList: [],
        journalIdList: idList ? [idList] : [],
      })
    )
  }

  const addPressRegistPressAuto = async (autoPressRegistId: number, journalIdItem: number[]) => {
    let res = ''
    let journalistGroupAdd = {
      jrnlstListId: autoPressRegistId,
      journalistId: journalIdItem[0],
    }
    const { status, message } = await journalistGroupAddJournalistAuto.mutateAsync(journalistGroupAdd)
    if (status) {
      res = status
    }
    return res
  }

  const insertPressToPressRegistId = async (
    searchRegistIdList: number[],
    journalIdItem: number[],
    autoPressRegistId: { key: string; name: string },
    userPressRegistList: userAutoSaveDataProps[],
    type: string,
    eSearchJournalist?: ESearchJournalistDocumentDto[]
  ) => {
    let res: any = ''
    if (autoPressRegistId && autoPressRegistId.key !== '' && autoPressRegistId.name !== '' && userSelectGroup) {
      res = await addPressRegistPressAuto(Number(autoPressRegistId.key), journalIdItem)
      if (res === 'S') {
        autoRegisterPressRegistIdAction(userPressRegistList, autoPressRegistId, type, eSearchJournalist)
      }
    }

    return res as string
  }

  const autoRegisterMediaRegistIdAction = (
    userMediaRegistList: userAutoSaveDataProps[],
    autoMediaRegistId: { key: string; name: string },
    type: string,
    eSearchMedia?: ESearchMediaDocumentDto[]
  ) => {
    let autoCompleteData = [...userMediaRegistList]
    if (autoCompleteData && autoCompleteData.length > 0) {
      const findIndex = autoCompleteData.findIndex(e => e.groupId.toString() === userSelectGroup.toString())
      if (findIndex !== undefined && findIndex !== null && findIndex > -1) {
        autoCompleteData[findIndex] = {
          groupId: userSelectGroup || 0,
          keyValue: Number(autoMediaRegistId.key),
          keyName: autoMediaRegistId.name,
        }
      } else {
        autoCompleteData = [
          ...autoCompleteData,
          {
            groupId: userSelectGroup || 0,
            keyValue: Number(autoMediaRegistId.key),
            keyName: autoMediaRegistId.name,
          },
        ]
      }
    } else {
      autoCompleteData = [
        ...autoCompleteData,
        {
          groupId: userSelectGroup || 0,
          keyValue: Number(autoMediaRegistId.key),
          keyName: autoMediaRegistId.name,
        },
      ]
    }
    let timer: NodeJS.Timeout | undefined
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(countLoadingAction(true))
    timer = setTimeout(async () => {
      dispatch(countLoadingAction(false))
      dispatch(userMediaListAutoSaveDataAction(autoCompleteData))
      if (type !== '') {
        openToast(
          MediaAutoRegisterContext({
            valueName: autoMediaRegistId.name,
            onChangeAction: () => {
              type === 'checked'
                ? setMediaSearchRegistPopupAction(true, eSearchMedia ? eSearchMedia : [], autoMediaRegistId.key)
                : setOneMediaSearchRegistPopupAction(true, eSearchMedia ? eSearchMedia[0] : null, autoMediaRegistId.key)
            },
          }),
          'success'
        )
      }
    }, 2000)
  }

  const uploadFile = async (files: FileList, fileUnit: string) => {
    let res: FileType[] = []
    const filesArr = Array.from(files)
    const max_size_per_file = parseInt(settingsRefinedValue['max_size_per_file'])
    const max_files_per_attach = parseInt(settingsRefinedValue['max_files_per_attach'])
    if (max_size_per_file) {
      for await (const totalFileLengthElement of filesArr) {
        const fileSize = getSize(totalFileLengthElement.size, fileUnit ? fileUnit.toLocaleLowerCase() : 'kb')
        if (fileSize > max_size_per_file) {
          openToast(messages['ko'].code100, 'error')
        } else {
          const temp = await processUpload(totalFileLengthElement, fileUnit)
          temp.code === '' ? (res = [...res, temp.data]) : openToast(temp.code, 'error')
        }
      }
    }

    return res
  }

  const onChangeMediaPhotoFiles = async (
    e: ChangeEvent<HTMLInputElement> | any,
    items: registerMediaPhotoPopupProps
  ): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()

    if (e.target?.files && e.target?.files.length > 0) {
      const result = await uploadFile(e.target?.files, fileSizeUnit)
      if (result.length > 0) {
        const params = {
          ...items,
          filesList: [result[0]],
          imageUrl: result[0]?.fileSrc ? result[0]?.fileSrc : items.imageUrl,
        }
        dispatch(registerMediaPhotoPopupAction(params))
      }
    }
    e.target.value = null
  }

  const onChangeJournalPhotoFiles = async (
    e: ChangeEvent<HTMLInputElement> | any,
    items: registerJournalPhotoPopupProps
  ): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()

    if (e.target?.files && e.target?.files.length > 0) {
      const result = await uploadFile(e.target?.files, fileSizeUnit)
      if (result.length > 0) {
        const params = {
          ...items,
          filesList: [result[0]],
          imageUrl: result[0]?.fileSrc ? result[0]?.fileSrc : items.imageUrl,
        }
        dispatch(registerJournalPhotoPopupAction(params))
      }
    }
    e.target.value = null
  }

  const checkAutoRegisterSelectedMediaRegist = async (
    e: boolean,
    idList: ESearchMediaDocumentDto[],
    userMediaRegistList: userAutoSaveDataProps[],
    originIdList: ESearchMediaDocumentDto[],
    originId: ESearchMediaDocumentDto,
    dto: ESearchMediaCondDto
  ) => {
    let isProcess = false
    if (userMediaRegistList && userMediaRegistList.length > 0) {
      const find = userMediaRegistList.find(i => i.groupId.toString() === userSelectGroup.toString())
      if (find) {
        if (idList && idList.length === 1 && idList[0].mediaListList) {
          const findAutoClipbook = idList[0].mediaListList.find(i => i?.id?.toString() === find.keyValue.toString())
          if (findAutoClipbook) {
            isProcess = true
          } else {
            const autoProcess = await insertMediaToMediaRegistId(
              [],
              idList.map(e => Number(e.mid)),
              { key: find.keyValue.toString(), name: find.keyName },
              userMediaRegistList,
              'checked',
              idList
            )
            if (autoProcess !== 'S') {
              isProcess = true
            }
          }
        } else {
          isProcess = true
        }
      } else {
        isProcess = true
      }
    } else {
      isProcess = true
    }

    if (isProcess) {
      await setMediaSearchRegistPopupAction(e, idList)
    } else {
      await afterMediaRegistAddReLoad(dto, originIdList, originId)
    }
  }

  const afterMediaRegistAddReLoad = async (
    dto: ESearchMediaCondDto,
    originData: ESearchMediaDocumentDto[],
    originParam: ESearchMediaDocumentDto,
    resultSearchRegisterListProps?: searchRegisterListProps[]
  ) => {
    let mediaParam = originParam
    let mediaList = [...originData]
    //dispatch(mediaLoadingAction(true))

    try {
      const res = await getMediaList(dto)
      if (res) {
        const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
        if (mediaData && mediaData.length > 0) {
          const find = mediaData.find(k => k.mid === originParam?.mid)
          mediaParam = find ? find : originParam
          mediaList = mediaData
        }
      }
      let timer: NodeJS.Timeout | undefined
      if (timer) {
        clearTimeout(timer)
      }
      dispatch(countLoadingAction(true))
      timer = setTimeout(async () => {
        dispatch(countLoadingAction(false))
        dispatch(
          afterMediaRegistAddMediaListAction({
            list: mediaList,
            mediaParam: mediaParam,
          })
        )
        if (resultSearchRegisterListProps && resultSearchRegisterListProps.length > 0) {
          openToast(
            MediaAddRegisterContext({
              valueName: resultSearchRegisterListProps,
              onChangeAction: async k => {
                await router.replace(`/media/list-result?mediaList_id=${k}`, undefined, { shallow: true })
                router.reload()
              },
              onChangeTotalAction: async () => {
                await router.replace(`/media/list`, undefined, { shallow: true })
                router.reload()
              },
            }),
            'success'
          )
        }
      }, 2000)
    } catch (e) {}
    //dispatch(mediaLoadingAction(false))
    dispatch(initPressMediaListBookPopupAction())
  }

  const setMediaSearchRegistPopupAction = async (e: boolean, idList: ESearchMediaDocumentDto[], valueKey?: string) => {
    let mediaRegistListNull = false
    let userMediaRegistList: number[] = []
    if (idList && idList.length > 0) {
      for await (const idListProp of idList) {
        if (!mediaRegistListNull) {
          if (idListProp.mediaListList && idListProp.mediaListList.length > 0) {
            const currentPressRegistId = idListProp.mediaListList.map(i => Number(i.id))
            if (userMediaRegistList.length > 0) {
              userMediaRegistList = userMediaRegistList.filter(item => currentPressRegistId.includes(item))
            } else {
              userMediaRegistList = currentPressRegistId
            }
          } else {
            mediaRegistListNull = true
          }
        }
      }
    }
    if (valueKey) {
      const find = userMediaRegistList.find(k => k.toString() === valueKey)
      if (!find) {
        userMediaRegistList = [...userMediaRegistList, Number(valueKey)]
        mediaRegistListNull = false
      }
    }
    dispatch(
      initSearchRegisterListPopupAction({
        isOpen: e,
        kind: 'media',
        type: 'add',
        list: [],
        origin: [],
        except: mediaRegistListNull ? [] : userMediaRegistList,
        mediaIdList: idList,
        journalIdList: [],
      })
    )
  }

  const addMediaRegistMediaAuto = async (autoMediaRegistId: number, mediaIdItem: number[]) => {
    let res = ''
    const { status, message } = await mediaGroupAddMediaAuto.mutateAsync({
      // @ts-ignore
      mediaListId: autoMediaRegistId,
      mediaId: mediaIdItem[0],
    })
    if (status) {
      res = status
    }
    return res
  }

  const insertMediaToMediaRegistId = async (
    searchRegistIdList: number[],
    mediaIdItem: number[],
    autoMediaRegistId: { key: string; name: string },
    userMediaRegistList: userAutoSaveDataProps[],
    type: string,
    eSearchMedia?: ESearchMediaDocumentDto[]
  ) => {
    let res: any = ''
    if (autoMediaRegistId && autoMediaRegistId.key !== '' && autoMediaRegistId.name !== '' && userSelectGroup) {
      res = await addMediaRegistMediaAuto(Number(autoMediaRegistId.key), mediaIdItem)
      if (res === 'S') {
        autoRegisterMediaRegistIdAction(userMediaRegistList, autoMediaRegistId, type, eSearchMedia)
      }
    }

    return res as string
  }

  const checkAutoRegisterMediaRegist = async (
    e: boolean,
    idList: ESearchMediaDocumentDto,
    userMediaRegistList: userAutoSaveDataProps[],
    originIdList: ESearchMediaDocumentDto[]
  ) => {
    let autoKey: userAutoSaveDataProps = {
      groupId: 0,
      keyValue: 0,
      keyName: '',
    }
    let isProcess = false
    if (userMediaRegistList && userMediaRegistList.length > 0) {
      const find = userMediaRegistList.find(i => i.groupId.toString() === userSelectGroup.toString())
      if (find) {
        autoKey = {
          groupId: userSelectGroup,
          keyValue: find.keyValue,
          keyName: find.keyName,
        }
        if (idList && idList.mediaListList && idList.mediaListList.length > 0) {
          const isAutoClipbookid = idList.mediaListList.find(k => Number(k.id) === Number(find.keyValue))
          if (isAutoClipbookid) {
            isProcess = true
          } else {
            const autoProcess = await insertMediaToMediaRegistId(
              [],
              [Number(idList.mid)],
              { key: find.keyValue.toString(), name: find.keyName },
              userMediaRegistList,
              'any',
              [idList]
            )
            if (autoProcess !== 'S') {
              isProcess = true
            }
          }
        } else {
          const autoProcess = await insertMediaToMediaRegistId(
            [],
            [Number(idList.mid)],
            { key: find.keyValue.toString(), name: find.keyName },
            userMediaRegistList,
            'any',
            [idList]
          )
          if (autoProcess !== 'S') {
            isProcess = true
          }
        }
      } else {
        isProcess = true
      }
    } else {
      isProcess = true
    }

    if (isProcess) {
      await setOneMediaSearchRegistPopupAction(e, idList)
    } else {
      await afterMediaRegistAdd(originIdList, idList, autoKey)
    }
  }

  const afterMediaRegistAdd = async (
    originData: ESearchMediaDocumentDto[],
    originParam: ESearchMediaDocumentDto,
    keyId: userAutoSaveDataProps
  ) => {
    let mediaParam = originParam
    let mediaList = [...originData]
    if (mediaList && mediaList.length > 0) {
      const find = mediaList.findIndex(e => (e?.mid || '').toString() === (mediaParam?.mid || '').toString())
      if (find !== -1) {
        mediaList[find] = {
          ...mediaList[find],
          // @ts-ignore
          mediaListList:
            // @ts-ignore
            mediaList[find] && mediaList[find]?.mediaListList && mediaList[find]?.mediaListList.length > 0
              ? [
                  // @ts-ignore
                  ...mediaList[find].mediaListList,
                  {
                    id: Number(keyId.keyValue),
                    title: keyId.keyName,
                    actionId: null,
                  },
                ]
              : [
                  {
                    id: Number(keyId.keyValue),
                    title: keyId.keyName,
                    actionId: null,
                  },
                ],
        }
      }
    }
    mediaParam = {
      ...mediaParam,
      // @ts-ignore
      mediaListList:
        // @ts-ignore
        mediaParam && mediaParam?.mediaListList && mediaParam?.mediaListList.length > 0
          ? [
              // @ts-ignore
              ...mediaParam.mediaListList,
              {
                id: Number(keyId.keyValue),
                title: keyId.keyName,
                actionId: null,
              },
            ]
          : [
              {
                id: Number(keyId.keyValue),
                title: keyId.keyName,
                actionId: null,
              },
            ],
    }
    let timer: NodeJS.Timeout | undefined
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(countLoadingAction(true))
    timer = setTimeout(async () => {
      dispatch(countLoadingAction(false))
      dispatch(
        afterMediaRegistAddMediaParamAction({
          list: mediaList,
          mediaParam: mediaParam,
        })
      )
    }, 2000)
  }

  const setOneMediaSearchRegistPopupAction = async (
    e: boolean,
    idList: ESearchMediaDocumentDto | null,
    valueKey?: string
  ) => {
    let list: number[] = []
    if (idList && idList.mediaListList && idList.mediaListList.length > 0) {
      for await (const mediaListListProp of idList.mediaListList) {
        list = [...list, Number(mediaListListProp.id)]
      }
    }
    if (valueKey) {
      const find = list.find(k => k.toString() === valueKey)
      if (!find) {
        list = [...list, Number(valueKey)]
      }
    }

    dispatch(
      initSearchRegisterListPopupAction({
        isOpen: e,
        kind: 'media',
        type: 'any',
        origin: list,
        list: list,
        except: [],
        mediaIdList: idList ? [idList] : [],
        journalIdList: [],
      })
    )
  }

  const checkAutoRegisterPressRegist = async (
    e: boolean,
    idList: ESearchJournalistDocumentDto,
    userPressRegistList: userAutoSaveDataProps[],
    originIdList: ESearchJournalistDocumentDto[]
  ) => {
    let autoKey: userAutoSaveDataProps = {
      groupId: 0,
      keyValue: 0,
      keyName: '',
    }
    let isProcess = false
    if (userPressRegistList && userPressRegistList.length > 0) {
      const find = userPressRegistList.find(i => i.groupId.toString() === userSelectGroup.toString())
      if (find) {
        autoKey = {
          groupId: userSelectGroup,
          keyValue: find.keyValue,
          keyName: find.keyName,
        }
        if (idList && idList.journalistGroupList && idList.journalistGroupList.length > 0) {
          const isAutoClipbookid = idList.journalistGroupList.find(k => Number(k.id) === Number(find.keyValue))
          if (isAutoClipbookid) {
            isProcess = true
          } else {
            const autoProcess = await insertPressToPressRegistId(
              [],
              [Number(idList.jrnlst_id)],
              { key: find.keyValue.toString(), name: find.keyName },
              userPressRegistList,
              'any',
              [idList]
            )
            if (autoProcess !== 'S') {
              isProcess = true
            }
          }
        } else {
          const autoProcess = await insertPressToPressRegistId(
            [],
            [Number(idList.jrnlst_id)],
            { key: find.keyValue.toString(), name: find.keyName },
            userPressRegistList,
            'any',
            [idList]
          )
          if (autoProcess !== 'S') {
            isProcess = true
          }
        }
      } else {
        isProcess = true
      }
    } else {
      isProcess = true
    }

    if (isProcess) {
      await setOnePressSearchRegistPopupAction(e, idList)
    } else {
      await afterPressRegistAdd(originIdList, idList, autoKey)
    }
  }

  const afterPressRegistAdd = async (
    originData: ESearchJournalistDocumentDto[],
    originParam: ESearchJournalistDocumentDto,
    keyId: userAutoSaveDataProps
  ) => {
    let pressParam = originParam
    let pressList = [...originData]
    if (pressList && pressList.length > 0) {
      const find = pressList.findIndex(
        e => (e?.jrnlst_id || '').toString() === (pressParam?.jrnlst_id || '').toString()
      )
      if (find !== -1) {
        pressList[find] = {
          ...pressList[find],
          // @ts-ignore
          journalistGroupList:
            // @ts-ignore
            pressList[find] && pressList[find]?.journalistGroupList && pressList[find]?.journalistGroupList.length > 0
              ? [
                  // @ts-ignore
                  ...pressList[find].journalistGroupList,
                  {
                    id: Number(keyId.keyValue),
                    title: keyId.keyName,
                    actionId: null,
                  },
                ]
              : [
                  {
                    id: Number(keyId.keyValue),
                    title: keyId.keyName,
                    actionId: null,
                  },
                ],
        }
      }
    }
    pressParam = {
      ...pressParam,
      // @ts-ignore
      journalistGroupList:
        // @ts-ignore
        pressParam && pressParam?.journalistGroupList && pressParam?.journalistGroupList.length > 0
          ? [
              // @ts-ignore
              ...pressParam.journalistGroupList,
              {
                id: Number(keyId.keyValue),
                title: keyId.keyName,
                actionId: null,
              },
            ]
          : [
              {
                id: Number(keyId.keyValue),
                title: keyId.keyName,
                actionId: null,
              },
            ],
    }
    let timer: NodeJS.Timeout | undefined
    if (timer) {
      clearTimeout(timer)
    }
    dispatch(countLoadingAction(true))
    timer = setTimeout(async () => {
      dispatch(countLoadingAction(false))
      dispatch(
        afterPressRegistAddPressParamAction({
          list: pressList,
          pressParam: pressParam,
        })
      )
    }, 2000)
  }

  const exportToPressExcel = async (props: ESearchJournalistDocumentDto[]) => {
    let journalistIdList: number[] = []
    for await (const paramElement of props) {
      if (!paramElement.isSysInfo) {
        journalistIdList = [...journalistIdList, Number(paramElement.jrnlst_id)]
      }
    }
    const res = await apiJournalExcel.mutateAsync({
      journalistIdList,
    })
    if (res) {
      const excel = res as Blob
      const blob = new Blob([excel], { type: 'ms-vnd/excel' })

      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      // @ts-ignore
      link.download = '언론인 목록 내보내기(downloaded_file).xlsx'
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(downloadUrl)
      document.body.removeChild(link)
      dispatch(setSearchContentKeyListAction([]))
    } else {
      openToast('내보내기에 실패하였습니다', 'error')
    }
  }
  const exportToMediaExcel = async (props: ESearchMediaDocumentDto[]) => {
    const param = {
      mediaIdList: props.map(e => {
        return Number(e.mid)
      }),
    }
    const res = await apiMediaExcel.mutateAsync(param)
    if (res) {
      const excel = res as Blob
      const blob = new Blob([excel], { type: 'ms-vnd/excel' })

      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      // @ts-ignore
      link.download = '미디어 목록 내보내기(downloaded_file).xlsx'
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(downloadUrl)
      document.body.removeChild(link)
      dispatch(setSearchContentKeyListAction([]))
    } else {
      openToast('내보내기에 실패하였습니다', 'error')
    }
  }

  const mediaFilterOptionAction = async (keyOption: string, props: ESearchMediaDocumentDto[]) => {
    let temp: MbTagSearchTagItem[] = []
    let typeList: SelectListOptionItem[] = []
    if (props && props.length > 0) {
      for await (const shareCodeElement of props) {
        let isPass = false
        if (shareCodeElement.mid) {
          if (keyOption !== 'release' && keyOption !== 'email') {
            isPass = true
          } else {
            // @ts-ignore
            if (!shareCodeElement?.isSysInfo && shareCodeElement?.email && shareCodeElement?.email !== '') {
              isPass = true
            } else if (
              shareCodeElement?.isSysInfo &&
              shareCodeElement?.contacts?.all?.beemail &&
              shareCodeElement?.contacts?.all?.beemail !== ''
            ) {
              isPass = true
            }
          }
          if (isPass) {
            temp = [
              ...temp,
              {
                id: shareCodeElement.mid?.toString() ?? uuid(),
                label: shareCodeElement.subtype
                  ? `${shareCodeElement.name} - ${shareCodeElement.subtype}`
                  : shareCodeElement?.name || '',
                className: 'mediaId',
              },
            ]
          }
        }
      }
      if (temp && temp.length > 0) {
        if (keyOption === 'release') {
          dispatch(
            pressReleaseDataExtraAction({
              journalistId: [],
              mediaId: temp,
              jrnlstListId: [],
              mediaListId: [],
              targetRelease: [],
            })
          )
          await router.push({
            pathname: '/press-release',
            query: {
              targetList: true,
            },
          })
        } else if (keyOption === 'excel') {
        } else if (keyOption === 'email') {
          dispatch(
            tagetListOpenEmailPopupAction({
              name: userInfo.name,
              scrop: shareCodeData.distribute,
              tagPressList: temp,
              receiverGroup: 'media',
            })
          )
        } else {
          const actionCategoryList = await getCommonCode('ACTION_CATEGORY_ALL')
          const actionStateFilterList = await getCommonCode('ACTION_STATE_FILTER')
          if (actionCategoryList && actionCategoryList.length > 0) {
            for await (const eElement of actionCategoryList) {
              if (
                eElement.code !== 'NEWSWIRE_RELEASE' &&
                eElement.code !== 'PRESS_RELEASE' &&
                eElement.code !== 'MAILING'
              ) {
                typeList = [
                  ...typeList,
                  {
                    id: eElement.code,
                    name: eElement.name,
                  },
                ]
              }
            }
          }
          dispatch(
            initActivityPopupAction({
              keyValue: 0,
              isOpen: true,
              loading: false,
              title: '',
              type: [{ id: '', name: '선택' }, ...typeList],
              state:
                actionStateFilterList && actionStateFilterList.length > 0
                  ? actionStateFilterList.map(e => {
                      return { id: e.code, name: e.name }
                    })
                  : [],
              typeValue: { id: '', name: '선택' },
              scrop: shareCodeData.action,
              targetDataList: temp,
              receiverGroup: 'media',
            })
          )
        }
      }
    }
  }

  const setMediaAddExtraSelectedFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchMediaCondDto,
    props: mediaSearchOptionProps
  ) => {
    let filterCount = 0
    let filterDto = { ...apiParam, page: 1 }
    let tempFilterSubParam = [...item]
    tempFilterSubParam[keyValue] = {
      ...tempFilterSubParam[keyValue],
      values: [key.id],
    }
    for await (const filterSubParamActionsProp of tempFilterSubParam) {
      if (filterSubParamActionsProp.id === 'filterCategory') {
        filterDto.filterFieldList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterLocation') {
        filterDto.filterLocationList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterType') {
        // @ts-ignore
        filterDto.filterCategoryList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterInformation') {
        filterDto.filterValue = filterSubParamActionsProp.values[0]
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
        filterDto.filterPubCycleList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterPortal') {
        filterDto.filterPortalList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterSourceType') {
        filterDto.filterSourceType = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      }
    }
    if (filterCount > 30) {
      openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    } else {
      dispatch(isLimitFilterAction(filterCount))
      await filterMediaApiAction(filterDto, props, tempFilterSubParam)
    }
  }

  const setPressAddExtraSelectedFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchJournalistCondDto,
    props: pressSearchOptionProps
  ) => {
    let filterCount = 0
    let filterDto = { ...apiParam, page: 1 }
    let tempFilterSubParam = [...item]
    tempFilterSubParam[keyValue] = {
      ...tempFilterSubParam[keyValue],
      values: [key.id],
    }
    for await (const filterSubParamActionsProp of tempFilterSubParam) {
      if (filterSubParamActionsProp.id === 'filterCategory') {
        filterDto.filterFieldList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterLocation') {
        filterDto.filterLocationList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterOccupation') {
        filterDto.filterOccupationList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterType') {
        // @ts-ignore
        filterDto.filterCategoryList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterInformation') {
        filterDto.filterValue = filterSubParamActionsProp.values[0]
      } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
        filterDto.filterPubCycleList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterPortal') {
        filterDto.filterPortalList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterSourceType') {
        filterDto.filterSourceType = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterSocial') {
        filterDto.filterSocialList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      }
    }
    if (filterCount > 30) {
      openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    } else {
      dispatch(isLimitFilterAction(filterCount))
      await filterPressApiAction(filterDto, props, tempFilterSubParam)
    }
  }

  const setMediaExtractExtraFilterSearch = async (
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchMediaCondDto,
    props: mediaSearchOptionProps
  ) => {
    let filterCount = 0
    let filterDto = { ...apiParam, page: 1 }
    let tempFilterSubParam = [...item]
    tempFilterSubParam[keyValue] = {
      ...tempFilterSubParam[keyValue],
      values: [],
    }
    for await (const filterSubParamActionsProp of tempFilterSubParam) {
      if (filterSubParamActionsProp.id === 'filterCategory') {
        filterDto.filterFieldList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterLocation') {
        filterDto.filterLocationList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterType') {
        // @ts-ignore
        filterDto.filterCategoryList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterInformation') {
        filterDto.filterValue = filterSubParamActionsProp.values[0]
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
        filterDto.filterPubCycleList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterPortal') {
        filterDto.filterPortalList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterSourceType') {
        filterDto.filterSourceType = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      }
    }
    if (filterCount > 30) {
      openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    } else {
      dispatch(isLimitFilterAction(filterCount))
      await filterMediaApiAction(filterDto, props, tempFilterSubParam)
    }
  }

  const setPressExtractExtraFilterSearch = async (
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchJournalistCondDto,
    props: pressSearchOptionProps
  ) => {
    let filterCount = 0
    let filterDto = { ...apiParam, page: 1 }
    let tempFilterSubParam = [...item]
    tempFilterSubParam[keyValue] = {
      ...tempFilterSubParam[keyValue],
      values: [],
    }
    for await (const filterSubParamActionsProp of tempFilterSubParam) {
      if (filterSubParamActionsProp.id === 'filterCategory') {
        filterDto.filterFieldList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterLocation') {
        filterDto.filterLocationList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterOccupation') {
        filterDto.filterOccupationList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterType') {
        // @ts-ignore
        filterDto.filterCategoryList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterInformation') {
        filterDto.filterValue = filterSubParamActionsProp.values[0]
      } else if (filterSubParamActionsProp.id === 'filterPubCycle') {
        filterDto.filterPubCycleList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterPortal') {
        filterDto.filterPortalList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterSourceType') {
        filterDto.filterSourceType = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      } else if (filterSubParamActionsProp.id === 'filterSocial') {
        filterDto.filterSocialList = filterSubParamActionsProp.values
        filterCount += filterSubParamActionsProp.values.length
      }
    }
    if (filterCount > 30) {
      openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    } else {
      dispatch(isLimitFilterAction(filterCount))
      await filterPressApiAction(filterDto, props, tempFilterSubParam)
    }
  }

  const setMediaTagControlSearch = async (
    props: mediaSearchOptionProps,
    type: string,
    apiParam: ESearchMediaCondDto
  ) => {
    let tempKeywordParam = {
      ...props.keywordParam,
    }
    let tempAdditionalParam = {
      ...props.additionalParam,
    }
    if (type === 'keywordValue') {
      tempKeywordParam.keywordValue = ''
    } else if (type === 'informationType') {
      tempKeywordParam.informationType = { id: '', name: '선택' }
    } else if (type === 'languageParam') {
      tempAdditionalParam.languageParam = { id: '', name: '선택' }
    } else if (type === 'isJournalist') {
      tempAdditionalParam.isJournalist = { id: '', name: '선택' }
    } else if (type === 'system') {
      tempAdditionalParam.system = { id: '', name: '선택' }
    } else if (type === 'limit') {
      tempAdditionalParam.limit = { id: '', name: '선택' }
    }
    const dto = await changeSearchDto(apiParam, {
      keywordParam: tempKeywordParam,
      additionalParam: tempAdditionalParam,
    })
    if (dto.isProcess) {
      let actionDto = {
        ...dto.mediaDto,
        sort: [`values.combined_new!desc`],
        filterFieldList: [],
        filterLocationList: [],
        filterCategoryList: [],
        filterValue: '',
        filterPubCycleList: [],
        filterPortalList: [],
        filterSourceType: [],
        page: 1,
      }
      if (tempKeywordParam.keyword && tempKeywordParam.keyword.length > 0) {
        actionDto.sort = [`_score!desc`]
      }
      await getMediaBySearchOption(
        actionDto,
        {
          keywordParam: tempKeywordParam,
          additionalParam: tempAdditionalParam,
        },
        'dto'
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const setPressTagControlSearch = async (
    props: pressSearchOptionProps,
    type: string,
    apiParam: ESearchJournalistCondDto
  ) => {
    let tempKeywordParam = {
      ...props.keywordParam,
    }
    let tempAdditionalParam = {
      ...props.additionalParam,
    }
    if (type === 'newsKeywordValue') {
      tempKeywordParam.newsKeywordValue = ''
    } else if (type === 'informationType') {
      tempKeywordParam.informationType = { id: '', name: '선택' }
    } else if (type === 'languageParam') {
      tempAdditionalParam.languageParam = { id: '', name: '선택' }
    } else if (type === 'count') {
      tempAdditionalParam.count = { id: '', name: '선택' }
    } else if (type === 'system') {
      tempAdditionalParam.system = { id: '', name: '선택' }
    } else if (type === 'limit') {
      tempAdditionalParam.limit = { id: '', name: '선택' }
    }
    const dto = await changePressSearchDto(apiParam, {
      keywordParam: tempKeywordParam,
      additionalParam: tempAdditionalParam,
    })
    if (dto.isProcess) {
      let actionDto = {
        ...dto.pressDto,
        sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
        page: 1,
        filterFieldList: [],
        filterLocationList: [],
        filterOccupationList: [],
        filterCategoryList: [],
        filterValue: '',
        filterPubCycleList: [],
        filterPortalList: [],
        filterSourceType: [],
        filterSocialList: [],
      }
      if (tempKeywordParam.keyword && tempKeywordParam.keyword.length > 0) {
        actionDto.sort = [`_score!desc`]
      } else if (tempKeywordParam.newsKeywordValue && tempKeywordParam.newsKeywordValue !== '') {
        actionDto.sort = [`_score!desc`]
      }
      await getPressBySearchOption(
        actionDto,
        {
          keywordParam: tempKeywordParam,
          additionalParam: tempAdditionalParam,
        },
        'dto'
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const mediaPhotoDeleteAdjust = async (target: number) => {
    const { status, message } = await deleteMediaPhoto.mutateAsync(target)
    if (status === 'S') {
      openToast('사진이 삭제되었습니다.', 'success')
      dispatch(setProfileImageIdAction(target))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const journalistPhotoDeleteAdjust = async (target: number) => {
    const { status, message } = await deleteJournalistPhoto.mutateAsync(target)
    if (status === 'S') {
      openToast('사진이 삭제되었습니다.', 'success')
      dispatch(setProfileImageIdAction(target))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const userContactValidation = async (props: addPersonalContactProps, type: string) => {
    let isProcess = false
    let emailErr = ''
    let websiteErr = ''

    if (type === 'press') {
      if (props.email === '' && props.phone === '' && props.telephone === '' && props.address === '') {
        isProcess = false
        openToast('개인적으로 사용하는 연락처를 입력해주세요', 'error')
      } else {
        if (props.email !== '') {
          if (!EMAIL_PATTERN.test(props.email)) {
            isProcess = false
            emailErr = EMAIL_PATTERN_DESCRIPTION
          } else {
            isProcess = true
          }
        } else {
          isProcess = true
        }
      }
    } else {
      if (
        props.email === '' &&
        props.phone === '' &&
        props.fax === '' &&
        props.address === '' &&
        props.website === ''
      ) {
        isProcess = false
        openToast('개인적으로 사용하는 연락처를 입력해주세요', 'error')
      } else {
        if (props.email !== '' || props.website !== '') {
          if (props.email !== '') {
            if (!EMAIL_PATTERN.test(props.email)) {
              isProcess = false
              emailErr = EMAIL_PATTERN_DESCRIPTION
            } else {
              isProcess = true
            }
          }
          if (props.website !== '') {
            if (!URL_REGEXP.test(props.website)) {
              isProcess = false
              websiteErr = URL_REGEXP_DESCRIPTION
            } else {
              isProcess = true
            }
          }
        } else {
          isProcess = true
        }
      }
    }

    if (!isProcess) {
      const param = {
        ...props,
        emailErr,
        websiteErr,
      }
      dispatch(addPersonalContactAction(param))
    }

    return isProcess
  }

  const journalistPhotoPopupAdjust = async (props: registerJournalPhotoPopupProps, target: number) => {
    if (props.filesList.length > 0) {
      const { status, message } = await saveJournalistPhoto.mutateAsync({
        id: target,
        file: props.filesList[0].file as File,
      })
      if (status === 'S') {
        openToast('사진이 등록되었습니다.', 'success')
        dispatch(setProfileImageIdAction(target))
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('등록할 사진을 선택해 주세요.', 'error')
      return
    }
  }

  const medialistPhotoPopupAdjust = async (props: registerMediaPhotoPopupProps, target: number) => {
    if (props.filesList.length > 0) {
      const { status, message } = await saveMediaPhoto.mutateAsync({
        id: target,
        file: props.filesList[0].file as File,
      })
      if (status === 'S') {
        openToast('사진이 등록되었습니다.', 'success')
        dispatch(setProfileImageIdAction(target))
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('등록할 사진을 선택해 주세요.', 'error')
      return
    }
  }

  const setMediaTagDeleteControlSearch = async (
    e: MbTagSearchTagItem,
    props: mediaSearchOptionProps,
    type: string,
    apiParam: ESearchMediaCondDto
  ) => {
    let keywordParams = { ...props.keywordParam }
    let additionalParams = { ...props.additionalParam }
    if (type === 'mediaTagList') {
      keywordParams.mediaTagList = keywordParams.mediaTagList.filter(item => item.id !== e.id)
    } else if (type === 'mediaType') {
      keywordParams.mediaType = keywordParams.mediaType.filter(item => item.id !== e.id)
    } else if (type === 'mediaField') {
      keywordParams.mediaField = keywordParams.mediaField.filter(item => item.id !== e.id)
    } else if (type === 'mediaArea') {
      keywordParams.mediaArea = keywordParams.mediaArea.filter(item => item.id !== e.id)
    } else if (type === 'mediaGroupList') {
      keywordParams.mediaGroupList = keywordParams.mediaGroupList.filter(item => item.id !== e.id)
    } else if (type === 'publishingPeriod') {
      keywordParams.publishingPeriod = keywordParams.publishingPeriod.filter(item => item.id !== e.id)
    } else if (type === 'keyword') {
      keywordParams.keyword = keywordParams.keyword.filter(item => item.id !== e.id)
    } else if (type === 'journalistTargetList') {
      additionalParams.journalistTargetList = additionalParams.journalistTargetList.filter(item => item.id !== e.id)
    } else if (type === 'portal') {
      additionalParams.portal = additionalParams.portal.filter(item => item.id !== e.id)
    }
    const dto = await changeSearchDto(apiParam, {
      keywordParam: { ...keywordParams },
      additionalParam: { ...additionalParams },
    })
    if (dto.isProcess) {
      let actionDto = {
        ...dto.mediaDto,
        sort: [`values.combined_new!desc`],
        filterFieldList: [],
        filterLocationList: [],
        filterCategoryList: [],
        filterValue: '',
        filterPubCycleList: [],
        filterPortalList: [],
        filterSourceType: [],
        page: 1,
      }
      if (keywordParams.keyword && keywordParams.keyword.length > 0) {
        actionDto.sort = [`_score!desc`]
      }
      await getMediaBySearchOption(
        actionDto,
        {
          keywordParam: { ...keywordParams },
          additionalParam: { ...additionalParams },
        },
        'dto'
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const setPressTagDeleteControlSearch = async (
    e: MbTagSearchTagItem,
    props: pressSearchOptionProps,
    type: string,
    apiParam: ESearchJournalistCondDto
  ) => {
    let keywordParams = { ...props.keywordParam }
    let additionalParams = { ...props.additionalParam }
    if (type === 'journalistTagList') {
      keywordParams.journalistTagList = keywordParams.journalistTagList.filter(item => item.id !== e.id)
    } else if (type === 'field') {
      keywordParams.field = keywordParams.field.filter(item => item.id !== e.id)
    } else if (type === 'area') {
      keywordParams.area = keywordParams.area.filter(item => item.id !== e.id)
    } else if (type === 'mediaTagList') {
      keywordParams.mediaTagList = keywordParams.mediaTagList.filter(item => item.id !== e.id)
    } else if (type === 'mediaType') {
      keywordParams.mediaType = keywordParams.mediaType.filter(item => item.id !== e.id)
    } else if (type === 'occupation') {
      keywordParams.occupation = keywordParams.occupation.filter(item => item.id !== e.id)
    } else if (type === 'position') {
      keywordParams.position = keywordParams.position.filter(item => item.id !== e.id)
    } else if (type === 'keyword') {
      keywordParams.keyword = keywordParams.keyword.filter(item => item.id !== e.id)
    } else if (type === 'department') {
      keywordParams.department = keywordParams.department.filter(item => item.id !== e.id)
    } else if (type === 'publishingPeriod') {
      keywordParams.publishingPeriod = keywordParams.publishingPeriod.filter(item => item.id !== e.id)
    } else if (type === 'mediaTargetList') {
      additionalParams.mediaTargetList = additionalParams.mediaTargetList.filter(item => item.id !== e.id)
    } else if (type === 'mediaField') {
      additionalParams.mediaField = additionalParams.mediaField.filter(item => item.id !== e.id)
    } else if (type === 'mediaArea') {
      additionalParams.mediaArea = additionalParams.mediaArea.filter(item => item.id !== e.id)
    } else if (type === 'mediaGroupList') {
      additionalParams.mediaGroupList = additionalParams.mediaGroupList.filter(item => item.id !== e.id)
    } else if (type === 'portal') {
      additionalParams.portal = additionalParams.portal.filter(item => item.id !== e.id)
    } else if (type === 'social') {
      additionalParams.social = additionalParams.social.filter(item => item.id !== e.id)
    }
    const dto = await changePressSearchDto(apiParam, {
      keywordParam: { ...keywordParams },
      additionalParam: { ...additionalParams },
    })
    if (dto.isProcess) {
      let actionDto = {
        ...dto.pressDto,
        sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
        page: 1,
        filterFieldList: [],
        filterLocationList: [],
        filterOccupationList: [],
        filterCategoryList: [],
        filterValue: '',
        filterPubCycleList: [],
        filterPortalList: [],
        filterSourceType: [],
        filterSocialList: [],
      }
      if (keywordParams.keyword && keywordParams.keyword.length > 0) {
        actionDto.sort = [`_score!desc`]
      } else if (keywordParams.newsKeywordValue && keywordParams.newsKeywordValue !== '') {
        actionDto.sort = [`_score!desc`]
      }
      await getPressBySearchOption(
        actionDto,
        {
          keywordParam: { ...keywordParams },
          additionalParam: { ...additionalParams },
        },
        'dto'
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const changeSearchDto = async (apiParam: ESearchMediaCondDto, params: mediaSearchOptionProps) => {
    let isProcess = false
    let mediaDto: ESearchMediaCondDto = {
      page: apiParam.page,
      size: apiParam.size,
      sort: apiParam.sort,
      groupId: userSelectGroup,
    }
    if (params.keywordParam.mediaTagList && params.keywordParam.mediaTagList.length > 0) {
      mediaDto.mediaIdList = params.keywordParam.mediaTagList.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.keywordParam.mediaType && params.keywordParam.mediaType.length > 0) {
      mediaDto.categoryList = params.keywordParam.mediaType.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.mediaField && params.keywordParam.mediaField.length > 0) {
      mediaDto.fieldList = params.keywordParam.mediaField.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.mediaArea && params.keywordParam.mediaArea.length > 0) {
      mediaDto.locationList = params.keywordParam.mediaArea.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.keyword && params.keywordParam.keyword.length > 0) {
      mediaDto.keywords = params.keywordParam.keyword.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.mediaGroupList && params.keywordParam.mediaGroupList.length > 0) {
      mediaDto.groupList = params.keywordParam.mediaGroupList.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.informationType && params.keywordParam.informationType.id !== '') {
      mediaDto.value = params.keywordParam.informationType.id.toString()
      isProcess = true
    }
    if (params.keywordParam.publishingPeriod && params.keywordParam.publishingPeriod.length > 0) {
      mediaDto.pubCycleList = params.keywordParam.publishingPeriod.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.additionalParam.journalistTargetList && params.additionalParam.journalistTargetList.length > 0) {
      mediaDto.jrnlstListId = params.additionalParam.journalistTargetList.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.additionalParam.portal && params.additionalParam.portal.length > 0) {
      mediaDto.portalList = params.additionalParam.portal.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.additionalParam.languageParam && params.additionalParam.languageParam.id !== '') {
      mediaDto.language = [params.additionalParam.languageParam.id.toString()]
      isProcess = true
    }
    if (params.additionalParam.system && params.additionalParam.system.id !== '') {
      mediaDto.sourceType = params.additionalParam.system.id.toString()
      isProcess = true
    }
    if (params.additionalParam.isJournalist && params.additionalParam.isJournalist.id !== '') {
      mediaDto.revealedYN = params.additionalParam.isJournalist.id.toString()
      isProcess = true
    }
    if (params.additionalParam.limit && params.additionalParam.limit.id !== '') {
      mediaDto.blockYN = params.additionalParam.limit.id.toString()
      isProcess = true
    }

    return { mediaDto, isProcess }
  }

  const changePressSearchDto = async (apiParam: ESearchJournalistCondDto, params: pressSearchOptionProps) => {
    let isProcess = false
    let pressDto: ESearchJournalistCondDto = {
      page: apiParam.page,
      size: apiParam.size,
      sort: apiParam.sort,
      groupId: userSelectGroup,
    }
    if (params.keywordParam.journalistTagList && params.keywordParam.journalistTagList.length > 0) {
      pressDto.journalistIdList = params.keywordParam.journalistTagList.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.keywordParam.newsKeywordValue && params.keywordParam.newsKeywordValue !== '') {
      pressDto.news = params.keywordParam.newsKeywordValue
    }
    if (params.keywordParam.field && params.keywordParam.field.length > 0) {
      pressDto.fieldList = params.keywordParam.field.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.area && params.keywordParam.area.length > 0) {
      pressDto.locationList = params.keywordParam.area.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.mediaTagList && params.keywordParam.mediaTagList.length > 0) {
      pressDto.mediaIdList = params.keywordParam.mediaTagList.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.keywordParam.mediaType && params.keywordParam.mediaType.length > 0) {
      pressDto.categoryList = params.keywordParam.mediaType.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.occupation && params.keywordParam.occupation.length > 0) {
      pressDto.occupationList = params.keywordParam.occupation.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.position && params.keywordParam.position.length > 0) {
      pressDto.roleList = params.keywordParam.position.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.keyword && params.keywordParam.keyword.length > 0) {
      pressDto.keywords = params.keywordParam.keyword.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.department && params.keywordParam.department.length > 0) {
      pressDto.departmentList = params.keywordParam.department.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.keywordParam.informationType && params.keywordParam.informationType.id !== '') {
      pressDto.value = params.keywordParam.informationType.id.toString()
      isProcess = true
    }
    if (params.keywordParam.publishingPeriod && params.keywordParam.publishingPeriod.length > 0) {
      pressDto.pubCycleList = params.keywordParam.publishingPeriod.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.additionalParam.mediaTargetList && params.additionalParam.mediaTargetList.length > 0) {
      pressDto.mediaListId = params.additionalParam.mediaTargetList.map(e => {
        return Number(e.id)
      })
      isProcess = true
    }
    if (params.additionalParam.mediaField && params.additionalParam.mediaField.length > 0) {
      pressDto.mediaFieldList = params.additionalParam.mediaField.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.additionalParam.mediaArea && params.additionalParam.mediaArea.length > 0) {
      pressDto.mediaLocationList = params.additionalParam.mediaArea.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.additionalParam.mediaGroupList && params.additionalParam.mediaGroupList.length > 0) {
      pressDto.groupList = params.additionalParam.mediaGroupList.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.additionalParam.portal && params.additionalParam.portal.length > 0) {
      pressDto.portalList = params.additionalParam.portal.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.additionalParam.social && params.additionalParam.social.length > 0) {
      pressDto.socialList = params.additionalParam.social.map(e => {
        return e.id
      })
      isProcess = true
    }
    if (params.additionalParam.languageParam && params.additionalParam.languageParam.id !== '') {
      pressDto.language = [params.additionalParam.languageParam.id.toString()]
      isProcess = true
    }
    if (params.additionalParam.count && params.additionalParam.count.id !== '') {
      pressDto.numBelong = params.additionalParam.count.id.toString()
      isProcess = true
    }
    if (params.additionalParam.system && params.additionalParam.system.id !== '') {
      pressDto.sourceType = params.additionalParam.system.id.toString()
      isProcess = true
    }
    if (params.additionalParam.limit && params.additionalParam.limit.id !== '') {
      pressDto.blockYN = params.additionalParam.limit.id.toString()
      isProcess = true
    }

    return { pressDto, isProcess }
  }

  const getMediaBySearchOption = async (params: ESearchMediaCondDto, props: mediaSearchOptionProps, type: string) => {
    let mediaFilterSub: NavigationLinkItem[] = []
    dispatch(mediaLoadingAction(true))
    const res = await getMediaList(params)
    if (res) {
      const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / params.size)
      const filter = setObjectToBase64({
        ...params,
        ...props.keywordParam,
        ...props.additionalParam,
        media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
        key_id: 'media',
      })
      if (type === 'dto') {
        mediaFilterSub = await getMediaFilterOptionControlData(
          res,
          params,
          filterInformation,
          filterMediaInfoType,
          filterPubCycle,
          filterPortalCode,
          filterMediaType,
          mediaSubTypeList
        )
      }
      if (mediaData && mediaData.length > 0) {
        await mediaExcluded(mediaData[0].mid ? mediaData[0].mid : 0)
        await mediaPersonalContactInfo(mediaData[0].mid ? mediaData[0].mid : 0)
        await checkMediaUserInvalid(mediaData[0])
      }
      dispatch(
        setOnChangeMediaSearchOptionAction({
          props,
          dto: params,
          mediaData,
          pageCount: {
            totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
          },
          isResetSelectedNews: type === 'size' ? true : type === 'dto',
          mediaFilterSub,
        })
      )
      await router.replace(`/media/search-result?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(mediaLoadingAction(false))
  }

  const getPressBySearchOption = async (
    params: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    type: string
  ) => {
    let journalFilterSub: NavigationLinkItem[] = []
    let tempJournalDecodeList = {
      beemail: '',
      mobile: '',
      landline: '',
      landlineShared: '',
      fax: '',
    }
    dispatch(journalLoadingAction(true))
    const res = await getJournalist(params)
    if (res) {
      const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / params.size)
      const filter = setObjectToBase64({
        ...params,
        ...props.keywordParam,
        ...props.additionalParam,
        journalist_id: journalData.length > 0 ? (journalData[0] ? journalData[0].jrnlst_id : 0) : 0,
        key_id: 'press',
      })
      if (type === 'dto') {
        journalFilterSub = await getPressFilterOptionControlData(
          res,
          params,
          filterInformation,
          journalistSocialFilterList,
          journalistOccupationList,
          filterMediaInfoType,
          filterPubCycle,
          filterPortalCode,
          filterMediaType,
          mediaSubTypeList
        )
      }
      if (journalData && journalData.length > 0) {
        tempJournalDecodeList = await checkPressUserInvalid(journalData[0])
      }
      dispatch(
        setOnChangePressSearchOptionAction({
          props,
          dto: params,
          journalData,
          pageCount: {
            totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
          },
          isResetSelectedNews: type === 'size' ? true : type === 'dto',
          journalFilterSub,
          journalDecodeList: tempJournalDecodeList,
        })
      )
      await router.replace(`/contacts/search-result?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(journalLoadingAction(false))
  }

  const moveToMediaResearch = async (props: mediaSearchOptionProps) => {
    const res = setObjectToBase64({ ...props.keywordParam, ...props.additionalParam, media_id: 0, key_id: 'media' })
    await router.push(`/media/search?filter=${res}`)
  }

  const moveToPressResearch = async (props: pressSearchOptionProps) => {
    const res = setObjectToBase64({
      ...props.keywordParam,
      ...props.additionalParam,
      journalist_id: 0,
      key_id: 'press',
    })
    await router.push(`/contacts/search?filter=${res}`)
  }

  const getMediaList = async (params: ESearchMediaCondDto) => {
    let res: ElasticSearchReturnDtoMediaDocumentDto | null = null
    try {
      const { status, message, data } = await mediaSearch.mutateAsync({
        ...params, // @ts-ignore
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        res = data as ElasticSearchReturnDtoMediaDocumentDto
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}

    return res
  }

  const conditionConvert = async (filter: string) => {
    let res = null
    let isFilter = false
    let tempSearchKeywordOption = ''
    let pressFilterSubActions = [
      {
        id: 'filterCategory',
        isOpen: false,
        values: [],
        subMenu: [],
      },
      {
        id: 'filterLocation',
        isOpen: false,
        values: [],
        subMenu: [],
      },
      {
        id: 'filterOccupation',
        isOpen: false,
        values: [],
        subMenu: [],
      },
      {
        id: 'filterType',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterInformation',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterPubCycle',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterPortal',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterSocial',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterSourceType',
        isOpen: false,
        values: [],
      },
    ]
    let mediaFilterSubActions = [
      {
        id: 'filterCategory',
        isOpen: false,
        values: [],
        subMenu: [],
      },
      {
        id: 'filterLocation',
        isOpen: false,
        values: [],
        subMenu: [],
      },
      {
        id: 'filterType',
        isOpen: false,
        values: [],
        subMenu: [],
      },
      {
        id: 'filterInformation',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterPubCycle',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterPortal',
        isOpen: false,
        values: [],
      },
      {
        id: 'filterSourceType',
        isOpen: false,
        values: [],
      },
    ]
    let pressParam: pressSearchOptionProps = pressInitParams
    let mediaParam: mediaSearchOptionProps = mediaInitParams
    let pressDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
      groupId: userSelectGroup,
    }
    let mediaDto: ESearchMediaCondDto = {
      page: 1,
      size: 20,
      sort: ['values.combined_new!desc'],
      groupId: userSelectGroup,
    }
    let conditions = getObjectFromBase64(filter)
    if (conditions && conditions !== '' && conditions.key_id && conditions.key_id !== '') {
      if (conditions.key_id === 'media') {
        mediaParam = {
          keywordParam: {
            mediaTagList: conditions.mediaTagList,
            mediaType: conditions.mediaType,
            mediaField: conditions.mediaField,
            mediaArea: conditions.mediaArea,
            keyword: conditions.keyword,
            keywordValue: conditions.keywordValue,
            mediaGroupList: conditions.mediaGroupList,
            informationType: conditions.informationType,
            publishingPeriod: conditions.publishingPeriod,
          },
          additionalParam: {
            journalistTargetList: conditions.journalistTargetList,
            portal: conditions.portal,
            languageParam: conditions.languageParam,
            isJournalist: conditions.isJournalist,
            system: conditions.system,
            limit: conditions.limit,
          },
        }
        if (conditions.page && conditions.page !== 0) {
          mediaDto.page = Number(conditions.page)
        }
        if (conditions.size && conditions.size !== 0) {
          mediaDto.size = Number(conditions.size)
        }
        if (conditions.sort && conditions.sort.length > 0) {
          mediaDto.sort = conditions.sort
        }
        if (conditions.filter && conditions.filter !== '') {
          mediaDto.filter = conditions.filter
          tempSearchKeywordOption = conditions.filter
          isFilter = true
        }
        if (conditions.filterFieldList && conditions.filterFieldList.length > 0) {
          mediaDto.filterFieldList = conditions.filterFieldList
          isFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterCategory')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterFieldList
          }
        }
        if (conditions.filterLocationList && conditions.filterLocationList.length > 0) {
          mediaDto.filterLocationList = conditions.filterLocationList
          isFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterLocation')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterLocationList
          }
        }
        if (conditions.filterCategoryList && conditions.filterCategoryList.length > 0) {
          mediaDto.filterCategoryList = conditions.filterCategoryList
          isFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterType')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterCategoryList
          }
        }
        if (conditions.filterValue && conditions.filterValue !== '') {
          mediaDto.filterValue = conditions.filterValue
          isFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterInformation')
          if (!isNaN(find)) {
            // @ts-ignore
            mediaFilterSubActions[find].values = [conditions.filterValue]
          }
        }
        if (conditions.filterPubCycleList && conditions.filterPubCycleList.length > 0) {
          mediaDto.filterPubCycleList = conditions.filterPubCycleList
          isFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterPubCycle')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterPubCycleList
          }
        }
        if (conditions.filterPortalList && conditions.filterPortalList.length > 0) {
          mediaDto.filterPortalList = conditions.filterPortalList
          isFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterPortal')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterPortalList
          }
        }
        if (conditions.filterSourceType && conditions.filterSourceType.length > 0) {
          mediaDto.filterSourceType = conditions.filterSourceType
          isFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterSourceType')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterSourceType
          }
        }
        if (mediaParam.keywordParam.mediaTagList && mediaParam.keywordParam.mediaTagList.length > 0) {
          mediaDto.mediaIdList = mediaParam.keywordParam.mediaTagList.map(e => {
            return Number(e.id)
          })
        }
        if (mediaParam.keywordParam.mediaType && mediaParam.keywordParam.mediaType.length > 0) {
          mediaDto.categoryList = mediaParam.keywordParam.mediaType.map(e => {
            return e.id
          })
        }
        if (mediaParam.keywordParam.mediaField && mediaParam.keywordParam.mediaField.length > 0) {
          mediaDto.fieldList = mediaParam.keywordParam.mediaField.map(e => {
            return e.id
          })
        }
        if (mediaParam.keywordParam.mediaArea && mediaParam.keywordParam.mediaArea.length > 0) {
          mediaDto.locationList = mediaParam.keywordParam.mediaArea.map(e => {
            return e.id
          })
        }
        if (mediaParam.keywordParam.keyword && mediaParam.keywordParam.keyword.length > 0) {
          mediaDto.keywords = mediaParam.keywordParam.keyword.map(e => {
            return e.id
          })
        }
        if (mediaParam.keywordParam.mediaGroupList && mediaParam.keywordParam.mediaGroupList.length > 0) {
          mediaDto.groupList = mediaParam.keywordParam.mediaGroupList.map(e => {
            return e.id
          })
        }
        if (mediaParam.keywordParam.informationType && mediaParam.keywordParam.informationType.id !== '') {
          mediaDto.value = mediaParam.keywordParam.informationType.id.toString()
        }
        if (mediaParam.keywordParam.publishingPeriod && mediaParam.keywordParam.publishingPeriod.length > 0) {
          mediaDto.pubCycleList = mediaParam.keywordParam.publishingPeriod.map(e => {
            return e.id
          })
        }
        if (
          mediaParam.additionalParam.journalistTargetList &&
          mediaParam.additionalParam.journalistTargetList.length > 0
        ) {
          mediaDto.jrnlstListId = mediaParam.additionalParam.journalistTargetList.map(e => {
            return Number(e.id)
          })
        }
        if (mediaParam.additionalParam.portal && mediaParam.additionalParam.portal.length > 0) {
          mediaDto.portalList = mediaParam.additionalParam.portal.map(e => {
            return e.id
          })
        }
        if (mediaParam.additionalParam.languageParam && mediaParam.additionalParam.languageParam.id !== '') {
          mediaDto.language = [mediaParam.additionalParam.languageParam.id.toString()]
        }
        if (mediaParam.additionalParam.system && mediaParam.additionalParam.system.id !== '') {
          mediaDto.sourceType = mediaParam.additionalParam.system.id.toString()
        }
        if (mediaParam.additionalParam.isJournalist && mediaParam.additionalParam.isJournalist.id !== '') {
          mediaDto.revealedYN = mediaParam.additionalParam.isJournalist.id.toString()
        }
        if (mediaParam.additionalParam.limit && mediaParam.additionalParam.limit.id !== '') {
          mediaDto.blockYN = mediaParam.additionalParam.limit.id.toString()
          mediaDto.blockGroupId = userSelectGroup
        }
      } else {
        pressParam = {
          keywordParam: {
            journalistTagList: conditions.journalistTagList,
            newsKeyword: conditions.newsKeyword,
            newsKeywordValue: conditions.newsKeywordValue,
            field: conditions.field,
            area: conditions.area,
            mediaTagList: conditions.mediaTagList,
            mediaType: conditions.mediaType,
            occupation: conditions.occupation,
            position: conditions.position,
            positionValue: conditions.positionValue,
            keyword: conditions.keyword,
            keywordValue: conditions.keywordValue,
            department: conditions.department,
            departmentValue: conditions.departmentValue,
            informationType: conditions.informationType,
            publishingPeriod: conditions.publishingPeriod,
          },
          additionalParam: {
            mediaTargetList: conditions.mediaTargetList,
            mediaField: conditions.mediaField,
            mediaArea: conditions.mediaArea,
            mediaGroupList: conditions.mediaGroupList,
            portal: conditions.portal,
            social: conditions.social,
            languageParam: conditions.languageParam,
            count: conditions.count,
            system: conditions.system,
            limit: conditions.limit,
          },
        }
        if (conditions.page && conditions.page !== 0) {
          pressDto.page = Number(conditions.page)
        }
        if (conditions.size && conditions.size !== 0) {
          pressDto.size = Number(conditions.size)
        }
        if (conditions.sort && conditions.sort.length > 0) {
          pressDto.sort = conditions.sort
        }
        if (conditions.filter && conditions.filter !== '') {
          pressDto.filter = conditions.filter
          tempSearchKeywordOption = conditions.filter
          isFilter = true
        }
        if (conditions.filterFieldList && conditions.filterFieldList.length > 0) {
          pressDto.filterFieldList = conditions.filterFieldList
          isFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterCategory')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterFieldList
          }
        }
        if (conditions.filterLocationList && conditions.filterLocationList.length > 0) {
          pressDto.filterLocationList = conditions.filterLocationList
          isFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterLocation')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterLocationList
          }
        }
        if (conditions.filterOccupationList && conditions.filterOccupationList.length > 0) {
          pressDto.filterOccupationList = conditions.filterOccupationList
          isFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterOccupation')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterOccupationList
          }
        }
        if (conditions.filterCategoryList && conditions.filterCategoryList.length > 0) {
          pressDto.filterCategoryList = conditions.filterCategoryList
          isFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterType')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterCategoryList
          }
        }
        if (conditions.filterValue && conditions.filterValue !== '') {
          pressDto.filterValue = conditions.filterValue
          isFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterInformation')
          if (!isNaN(find)) {
            // @ts-ignore
            pressFilterSubActions[find].values = [conditions.filterValue]
          }
        }
        if (conditions.filterPubCycleList && conditions.filterPubCycleList.length > 0) {
          pressDto.filterPubCycleList = conditions.filterPubCycleList
          isFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterPubCycle')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterPubCycleList
          }
        }
        if (conditions.filterPortalList && conditions.filterPortalList.length > 0) {
          pressDto.filterPortalList = conditions.filterPortalList
          isFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterPortal')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterPortalList
          }
        }
        if (conditions.filterSourceType && conditions.filterSourceType.length > 0) {
          pressDto.filterSourceType = conditions.filterSourceType
          isFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterSourceType')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterSourceType
          }
        }
        if (conditions.filterSocialList && conditions.filterSocialList.length > 0) {
          pressDto.filterSocialList = conditions.filterSocialList
          isFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterSocial')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterSocialList
          }
        }
        if (pressParam.keywordParam.journalistTagList && pressParam.keywordParam.journalistTagList.length > 0) {
          pressDto.journalistIdList = pressParam.keywordParam.journalistTagList.map(e => {
            return Number(e.id)
          })
        }
        if (pressParam.keywordParam.newsKeywordValue && pressParam.keywordParam.newsKeywordValue !== '') {
          pressDto.news = pressParam.keywordParam.newsKeywordValue
        }
        if (pressParam.keywordParam.field && pressParam.keywordParam.field.length > 0) {
          pressDto.fieldList = pressParam.keywordParam.field.map(e => {
            return e.id
          })
        }
        if (pressParam.keywordParam.area && pressParam.keywordParam.area.length > 0) {
          pressDto.locationList = pressParam.keywordParam.area.map(e => {
            return e.id
          })
        }
        if (pressParam.keywordParam.mediaTagList && pressParam.keywordParam.mediaTagList.length > 0) {
          pressDto.mediaIdList = pressParam.keywordParam.mediaTagList.map(e => {
            return Number(e.id)
          })
        }
        if (pressParam.keywordParam.mediaType && pressParam.keywordParam.mediaType.length > 0) {
          pressDto.categoryList = pressParam.keywordParam.mediaType.map(e => {
            return e.id
          })
        }
        if (pressParam.keywordParam.occupation && pressParam.keywordParam.occupation.length > 0) {
          pressDto.occupationList = pressParam.keywordParam.occupation.map(e => {
            return e.id
          })
        }
        if (pressParam.keywordParam.position && pressParam.keywordParam.position.length > 0) {
          pressDto.roleList = pressParam.keywordParam.position.map(e => {
            return e.id
          })
        }
        if (pressParam.keywordParam.keyword && pressParam.keywordParam.keyword.length > 0) {
          pressDto.keywords = pressParam.keywordParam.keyword.map(e => {
            return e.id
          })
        }
        if (pressParam.keywordParam.department && pressParam.keywordParam.department.length > 0) {
          pressDto.departmentList = pressParam.keywordParam.department.map(e => {
            return e.id
          })
        }
        if (pressParam.keywordParam.informationType && pressParam.keywordParam.informationType.id !== '') {
          pressDto.value = pressParam.keywordParam.informationType.id.toString()
        }
        if (pressParam.keywordParam.publishingPeriod && pressParam.keywordParam.publishingPeriod.length > 0) {
          pressDto.pubCycleList = pressParam.keywordParam.publishingPeriod.map(e => {
            return e.id
          })
        }
        if (pressParam.additionalParam.mediaTargetList && pressParam.additionalParam.mediaTargetList.length > 0) {
          pressDto.mediaListId = pressParam.additionalParam.mediaTargetList.map(e => {
            return Number(e.id)
          })
        }
        if (pressParam.additionalParam.mediaField && pressParam.additionalParam.mediaField.length > 0) {
          pressDto.mediaFieldList = pressParam.additionalParam.mediaField.map(e => {
            return e.id
          })
        }
        if (pressParam.additionalParam.mediaArea && pressParam.additionalParam.mediaArea.length > 0) {
          pressDto.mediaLocationList = pressParam.additionalParam.mediaArea.map(e => {
            return e.id
          })
        }
        if (pressParam.additionalParam.mediaGroupList && pressParam.additionalParam.mediaGroupList.length > 0) {
          pressDto.groupList = pressParam.additionalParam.mediaGroupList.map(e => {
            return e.id
          })
        }
        if (pressParam.additionalParam.portal && pressParam.additionalParam.portal.length > 0) {
          pressDto.portalList = pressParam.additionalParam.portal.map(e => {
            return e.id
          })
        }
        if (pressParam.additionalParam.social && pressParam.additionalParam.social.length > 0) {
          pressDto.socialList = pressParam.additionalParam.social.map(e => {
            return e.id
          })
        }
        if (pressParam.additionalParam.languageParam && pressParam.additionalParam.languageParam.id !== '') {
          pressDto.language = [pressParam.additionalParam.languageParam.id.toString()]
        }
        if (pressParam.additionalParam.count && pressParam.additionalParam.count.id !== '') {
          pressDto.numBelong = pressParam.additionalParam.count.id.toString()
        }
        if (pressParam.additionalParam.system && pressParam.additionalParam.system.id !== '') {
          pressDto.sourceType = pressParam.additionalParam.system.id.toString()
        }
        if (pressParam.additionalParam.limit && pressParam.additionalParam.limit.id !== '') {
          pressDto.blockYN = pressParam.additionalParam.limit.id.toString()
          pressDto.blockGroupId = userSelectGroup
        }
      }

      res = {
        key_id: conditions?.key_id || '',
        journalist_id: conditions?.journalist_id || 0,
        media_id: conditions?.media_id || 0,
        mediaParam,
        mediaDto,
        pressParam,
        pressDto,
        mediaFilterSubActions,
        pressFilterSubActions,
        tempSearchKeywordOption,
        isFilter,
      }
    }
    return res
  }

  const setQueryParam = async (list: string[]) => {
    let res = ''
    if (list.length > 0) {
      for await (const re of list) {
        const query = re.split('=')
        if (query.length > 0) {
          switch (query[0]) {
            case 'filter':
              res = query[1]
              break
            default:
          }
        }
      }
    }
    return res
  }

  const pressRegisterAction = async (title: string, props: pressSearchOptionProps) => {
    const param = {
      title,
      groupId: userSelectGroup,
      shareCode: shareCodeData.jrnlstMediaSrch.id,
      shareTargetCode: 'GROUP',
      conditions: setObjectToBase64({ ...props.keywordParam, ...props.additionalParam }),
    }
    const { status, data, message } = await pressRegister.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const mediaRegisterAction = async (title: string, props: mediaSearchOptionProps) => {
    const param = {
      title,
      groupId: userSelectGroup,
      shareCode: shareCodeData.jrnlstMediaSrch.id,
      shareTargetCode: 'GROUP',
      conditions: setObjectToBase64({ ...props.keywordParam, ...props.additionalParam }),
    }
    const { status, data, message } = await mediaRegister.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const searchPressRegisterAction = async (hook: searchRegisterPopupProps, props: pressSearchOptionProps) => {
    let isOpen = true
    let titleErr = ''
    if (hook.title === '') {
      titleErr = '제목을 입력해주세요'
    } else if (hook.title.length > 100) {
      titleErr = '제목은 100자를 넘을 수 없습니다.'
    } else {
      const { status, data, message } = await pressRegisterCheck.mutateAsync({
        oldName: '',
        newName: hook.title,
      })
      if (status === 'S') {
        isOpen = false
        await pressRegisterAction(hook.title, props)
      } else {
        titleErr = message?.message ?? '같은 제목의 검색이 이미 있습니다.'
        openToast(message?.message ?? '같은 제목의 검색이 이미 있습니다.', 'error')
      }
    }
    dispatch(
      searchRegisterPopupAction({
        ...hook,
        isOpen,
        titleErr,
      })
    )
  }

  const searchMediaRegisterAction = async (hook: searchRegisterPopupProps, props: mediaSearchOptionProps) => {
    let isOpen = true
    let titleErr = ''
    if (hook.title === '') {
      titleErr = '제목을 입력해주세요'
    } else if (hook.title.length > 100) {
      titleErr = '제목은 100자를 넘을 수 없습니다.'
    } else {
      const { status, data, message } = await mediaRegisterCheck.mutateAsync({
        oldName: '',
        newName: hook.title,
      })
      if (status === 'S') {
        isOpen = false
        await mediaRegisterAction(hook.title, props)
      } else {
        titleErr = message?.message ?? '같은 제목의 검색이 이미 있습니다.'
        openToast(message?.message ?? '같은 제목의 검색이 이미 있습니다.', 'error')
      }
    }
    dispatch(
      searchRegisterPopupAction({
        ...hook,
        isOpen,
        titleErr,
      })
    )
  }

  const pressNameList = async (e: ESearchJournalistDocumentDto, decodingEmail: string) => {
    let duplicationData: JournalistAutoCompleteDto | null = null
    const find = pressDuplicationIdList.find(k => k === e.jrnlst_id)
    if (find) {
      duplicationData = null
    } else {
      if (decodingEmail !== '' && e && !e.isSysInfo) {
        const { status, data, message } = await apiGetJournalistNameAutoComplete({
          name: e ? (e?.name ? e?.name : '') : '',
          page: 1,
          size: 9999,
          sort: 'name!asc',
        })
        if (status === 'S') {
          const res = data as JournalistAutoCompleteDto[]
          if (res && res.length > 0) {
            const findItem = res?.find(item => item.name === e.name && item.email === decodingEmail)
            if (findItem) {
              duplicationData = findItem
            }
          }
        } else {
          openToast(message?.message, 'error')
        }
      } else {
        duplicationData = null
      }
    }
    dispatch(checkSearchResultUserPressAction(duplicationData))
  }

  const mediaNameList = async (props: ESearchMediaDocumentDto) => {
    let duplicationData: MediaAutoCompleteDto | null = null
    const find = mediaDuplicationIdList.find(k => k === props.mid)
    if (find) {
      duplicationData = null
    } else {
      const { status, data, message } = await apiGetMediaNameAutoComplete({
        name: props ? (props?.name ? props?.name : '') : '',
        page: 1,
        size: 1,
        sort: 'name!asc',
      })
      if (status === 'S') {
        const res = data as MediaAutoCompleteDto[]
        if (res && res.length > 0 && props) {
          duplicationData = res[0]
        }
      } else {
        openToast(message?.message, 'error')
      }
    }
    dispatch(checkSearchResultUserMediaAction(duplicationData))
  }

  const checkMediaUserInvalid = async (e: ESearchMediaDocumentDto) => {
    if (e.isSysInfo) {
      if (e.contacts?.all?.beemail && e.contacts?.all?.beemail) {
        await getBlockUserInfoData(e.contacts?.all?.beemail)
      } else {
        dispatch(isJournalUserBlockAction(defaultUserBlockData))
        dispatch(isMediaUserBlockAction(defaultUserBlockData))
      }
      dispatch(checkSearchResultUserMediaAction(null))
    } else {
      if (e?.email) {
        await getBlockUserInfoData(e?.email.toString())
      } else {
        dispatch(isJournalUserBlockAction(defaultUserBlockData))
        dispatch(isMediaUserBlockAction(defaultUserBlockData))
      }
      if (
        e &&
        // @ts-ignore
        e.owner?.uid &&
        /*@ts-ignore*/
        e.owner?.uid === userInfo.userId &&
        e
      ) {
        await mediaNameList(e)
      } else {
        dispatch(checkSearchResultUserMediaAction(null))
      }
    }
  }

  const checkPressUserInvalid = async (tempJournalIdParams: ESearchJournalistDocumentDto | null) => {
    let tempJournalDecodeList = {
      beemail: '',
      mobile: '',
      landline: '',
      landlineShared: '',
      fax: '',
    }
    if (tempJournalIdParams !== null) {
      if (tempJournalIdParams && tempJournalIdParams.jrnlst_id) {
        await journalistExcluded(tempJournalIdParams.jrnlst_id)
        await journalistPersonalContactInfo(tempJournalIdParams.jrnlst_id)
      }
      if (tempJournalIdParams.isSysInfo) {
        if (tempJournalIdParams.email && tempJournalIdParams.email?.beemail) {
          const beemail = await getDecodedData(tempJournalIdParams.email.beemail, 'ELASTIC_SEARCH')
          if (beemail) {
            tempJournalDecodeList.beemail = beemail
            await getBlockUserInfoData(beemail)
          } else {
            dispatch(isJournalUserBlockAction(defaultUserBlockData))
            dispatch(isMediaUserBlockAction(defaultUserBlockData))
          }
        }
        if (tempJournalIdParams.mobile && tempJournalIdParams.mobile.length > 0) {
          const mobile = await getDecodedData(tempJournalIdParams.mobile[0], 'ELASTIC_SEARCH')
          if (mobile) {
            //@ts-ignore
            tempJournalDecodeList.mobile = mobile
          }
        }

        // 일반전화 복호화
        if (tempJournalIdParams.landline && tempJournalIdParams.landline.length > 0) {
          const landline = await getDecodedData(tempJournalIdParams.landline[0], 'ELASTIC_SEARCH')
          if (landline) {
            //@ts-ignore
            tempJournalDecodeList.landline = landline
          }
        }

        // 일반전화 대체 복호화
        if (tempJournalIdParams.landline_shared && tempJournalIdParams.landline_shared.length > 0) {
          const landlineShared = await getDecodedData(tempJournalIdParams.landline_shared[0], 'ELASTIC_SEARCH')
          if (landlineShared) {
            //@ts-ignore
            tempJournalDecodeList.landlineShared = landlineShared
          }
        }

        // 팩스 복호화
        if (tempJournalIdParams.fax && tempJournalIdParams.fax.length > 0) {
          const fax = await getDecodedData(tempJournalIdParams.fax[0], 'ELASTIC_SEARCH')
          if (fax) {
            //@ts-ignore
            tempJournalDecodeList.fax = fax
          }
        }
      } else {
        //@ts-ignore
        if (tempJournalIdParams.journalistUserDto) {
          //@ts-ignore
          const beemail = await getDecodedData(tempJournalIdParams.journalistUserDto.email, 'ELASTIC_SEARCH')
          //@ts-ignore
          if (beemail) {
            tempJournalDecodeList.beemail = beemail
            //@ts-ignore
            await getBlockUserInfoData(beemail)
          }

          // 전화 복호화
          //@ts-ignore
          if (tempJournalIdParams.journalistUserDto.landline) {
            //@ts-ignore
            const landline = await getDecodedData(tempJournalIdParams.journalistUserDto.landline, 'ELASTIC_SEARCH')
            if (landline) {
              //@ts-ignore
              tempJournalDecodeList.landline = landline
            }
          }
          // 일반전화 복호화
          //@ts-ignore
          if (tempJournalIdParams.journalistUserDto.mobile) {
            //@ts-ignore
            const landline = await getDecodedData(tempJournalIdParams.journalistUserDto.mobile, 'ELASTIC_SEARCH')
            if (landline) {
              //@ts-ignore
              tempJournalDecodeList.mobile = landline
            }
          }
        }
        if (
          tempJournalIdParams &&
          // @ts-ignore
          tempJournalIdParams.owner?.uid &&
          /*@ts-ignore*/
          tempJournalIdParams.owner?.uid === userInfo.userId &&
          tempJournalIdParams
        ) {
          await pressNameList(tempJournalIdParams, tempJournalDecodeList.beemail)
        } else {
          dispatch(checkSearchResultUserPressAction(null))
        }
      }
    }

    return tempJournalDecodeList
  }

  const init = async () => {
    let keyId = router.pathname === '/media/search-result' ? 'media' : 'press'
    let journalistId = 0
    let mediaId = 0
    let tempSearchKeywordOption = ''
    let tempMediaSubTypeList: mediaSubTypeListProps[] = []
    let tempMediaValueList: SelectListOptionItem[] = []
    let tempMediaInfoTypeList: SelectListOptionItem[] = []
    let tempMediaPubCycleList: SelectListOptionItem[] = []
    let tempMediaPortalCodeList: SelectListOptionItem[] = []
    let tempMediaTypeList: SelectListOptionItem[] = []
    let tempJournalistOccupationList: SelectListOptionItem[] = []
    let tempJournalistSocialFilterList: SelectListOptionItem[] = []
    let mediaFilterSubActions = subMediaFilterOptionsList
    let pressFilterSubActions = subJournalFilterOptionsList
    let pressParam: pressSearchOptionProps = pressInitParams
    let mediaParam: mediaSearchOptionProps = mediaInitParams
    let isFilter = false
    let tempMediaIdParams: ESearchMediaDocumentDto | null = null
    let tempMediaList: ESearchMediaDocumentDto[] = []
    let preloadCommonCode: CommonCode[] = []
    let tempJournalIdParams: ESearchJournalistDocumentDto | null = null
    let tempJournalList: ESearchJournalistDocumentDto[] = []
    let mediaFilterSub = subMediaFilterListList
    let journalFilterSub = subJournalFilterListList
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    let tempJournalDecodeList = {
      beemail: '',
      mobile: '',
      landline: '',
      landlineShared: '',
      fax: '',
    }

    let pressDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      // @ts-ignore
      groupId: userSelectGroup,
      sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
    }
    let mediaDto: ESearchMediaCondDto = {
      page: 1,
      size: 20,
      // @ts-ignore
      groupId: userSelectGroup,
      sort: ['values.combined_new!desc'],
    }
    dispatch(initAction())
    dispatch(initPressMediaListBookPopupAction())
    try {
      if (window.location.search && window.location.search.substring(1).split('?').length > 0) {
        const subParams = window.location.search.substring(1).split('?')
        const querys = await setQueryParam(subParams)
        if (querys && querys !== '') {
          const dto = await conditionConvert(querys)
          console.log('dto', dto)
          if (dto) {
            pressDto = dto.pressDto
            mediaDto = dto.mediaDto
            tempSearchKeywordOption = dto.tempSearchKeywordOption
            pressParam = dto.pressParam
            mediaParam = dto.mediaParam
            keyId = dto.key_id
            journalistId = dto.journalist_id
            mediaId = dto.media_id
            mediaFilterSubActions = dto.mediaFilterSubActions
            pressFilterSubActions = dto.pressFilterSubActions
            isFilter = dto.isFilter
          }
        }
        for await (const re of extendedCommonCodeTargetList) {
          const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
          if (find) {
            //@ts-ignore
            preloadCommonCode = find.commonCodeList
          } else {
            preloadCommonCode = await getCommonCode(re.id)
          }
          if (re.id === 'MEDIA_VALUE') {
            tempMediaValueList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
            dispatch(filterInformationAction(tempMediaValueList))
          } else if (re.id === 'MEDIA_INFO_TYPE') {
            tempMediaInfoTypeList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
            dispatch(filterMediaInfoTypeAction(tempMediaInfoTypeList))
          } else if (re.id === 'PUB_CYCLE') {
            tempMediaPubCycleList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
            dispatch(filterPubCycleAction(tempMediaPubCycleList))
          } else if (re.id === 'PORTAL_CODE') {
            tempMediaPortalCodeList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
            dispatch(filterPortalCodeAction(tempMediaPortalCodeList))
          } else if (re.id === 'PUBLISHER_TYPE') {
            console.log('preloadCommonCode', preloadCommonCode)
            dispatch(
              publisherTypeAction(
                preloadCommonCode.map(e => {
                  return { id: e.code, name: e.name }
                })
              )
            )
          } else if (re.id === 'ACTION_STATE_FILTER') {
            dispatch(
              actionStateFilterAction(
                preloadCommonCode.map(e => {
                  return { id: e.code, name: e.name }
                })
              )
            )
          } else if (re.id === 'ACTION_CATEGORY_ALL') {
            dispatch(
              actionCategoryListAction(
                preloadCommonCode.map(e => {
                  return { id: e.code, name: e.name }
                })
              )
            )
          } else if (re.id === 'JRNLST_SOCIAL_FILTER_ID') {
            tempJournalistSocialFilterList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
            dispatch(journalistSocialFilterListAction(tempJournalistSocialFilterList))
          } else if (re.id === 'JOURNALIST_OCCUPATION') {
            tempJournalistOccupationList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
            dispatch(journalistOccupationListAction(tempJournalistOccupationList))
          } else if (re.id === 'ACTION_STATE') {
            dispatch(
              actionStateListAction(
                preloadCommonCode.map(e => {
                  return { id: e.code, name: e.name }
                })
              )
            )
          } else if (re.id === 'MEDIA_TYPE') {
            tempMediaTypeList = preloadCommonCode.map(e => {
              return { id: e.commonCodeId.toString(), name: e.name, extra: e.code }
            })
            for await (const reElement of tempMediaTypeList) {
              //@ts-ignore
              const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCommonCodeId === Number(reElement.id))
              //@ts-ignore
              if (find && find.commonCodeList && find.commonCodeList.length > 0) {
                tempMediaSubTypeList = [
                  ...tempMediaSubTypeList,
                  {
                    extra: reElement.extra ? reElement.extra : '',
                    id: reElement.id,
                    name: reElement.name,
                    //@ts-ignore
                    data: find.commonCodeList as CommonCode[],
                  },
                ]
              }
            }
            dispatch(mediaSubTypeListAction(tempMediaSubTypeList))
            dispatch(filterMediaTypeAction(tempMediaTypeList))
          }
        }
        if (keyId === 'media') {
          const res = await getMediaList(mediaDto)
          if (res) {
            const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
            const totalSize = res.totalElements as number
            const totalPage = Math.ceil(totalSize / mediaDto.size)
            const find = mediaData.find(k => k.mid === mediaId)
            mediaId = find ? mediaId : mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0
            tempMediaIdParams = find ? find : mediaData.length > 0 ? (mediaData[0] ? mediaData[0] : null) : null
            tempMediaList = mediaData
            tempPageCount = {
              totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
              totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
            }
            if (isFilter) {
              const getFilterData = await getMediaList({
                ...mediaDto,
                filterFieldList: [],
                filterLocationList: [],
                filterCategoryList: [],
                filterValue: '',
                filterPubCycleList: [],
                filterPortalList: [],
                filterSourceType: [],
              })
              if (getFilterData) {
                mediaFilterSub = await getMediaFilterOptionControlData(
                  getFilterData,
                  mediaDto,
                  tempMediaValueList,
                  tempMediaInfoTypeList,
                  tempMediaPubCycleList,
                  tempMediaPortalCodeList,
                  tempMediaTypeList,
                  tempMediaSubTypeList
                )
              }
            } else {
              mediaFilterSub = await getMediaFilterOptionControlData(
                res,
                mediaDto,
                tempMediaValueList,
                tempMediaInfoTypeList,
                tempMediaPubCycleList,
                tempMediaPortalCodeList,
                tempMediaTypeList,
                tempMediaSubTypeList
              )
            }
            if (tempMediaIdParams) {
              await mediaExcluded(tempMediaIdParams?.mid || 0)
              await mediaPersonalContactInfo(tempMediaIdParams?.mid || 0)
              await checkMediaUserInvalid(tempMediaIdParams)
            }
          }
        } else {
          const res = await getJournalist(pressDto)
          if (res) {
            const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
            const totalSize = res.totalElements as number
            const totalPage = Math.ceil(totalSize / pressDto.size)
            const find = journalData.find(k => k.jrnlst_id === journalistId)
            journalistId = find
              ? journalistId
              : journalData.length > 0
              ? journalData[0].jrnlst_id
                ? journalData[0].jrnlst_id
                : 0
              : 0
            tempJournalIdParams = find ? find : journalData.length > 0 ? (journalData[0] ? journalData[0] : null) : null
            tempJournalList = journalData
            tempPageCount = {
              totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
              totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
            }
            if (isFilter) {
              const getFilterData = await getJournalist({
                ...pressDto,
                filterFieldList: [],
                filterLocationList: [],
                filterOccupationList: [],
                filterCategoryList: [],
                filterValue: '',
                filterPubCycleList: [],
                filterPortalList: [],
                filterSourceType: [],
                filterSocialList: [],
              })
              if (getFilterData) {
                //@ts-ignore
                journalFilterSub = await getPressFilterOptionControlData(
                  getFilterData,
                  pressDto,
                  tempMediaValueList,
                  tempJournalistSocialFilterList,
                  tempJournalistOccupationList,
                  tempMediaInfoTypeList,
                  tempMediaPubCycleList,
                  tempMediaPortalCodeList,
                  tempMediaTypeList,
                  tempMediaSubTypeList
                )
              }
            } else {
              //@ts-ignore
              journalFilterSub = await getPressFilterOptionControlData(
                res,
                pressDto,
                tempMediaValueList,
                tempJournalistSocialFilterList,
                tempJournalistOccupationList,
                tempMediaInfoTypeList,
                tempMediaPubCycleList,
                tempMediaPortalCodeList,
                tempMediaTypeList,
                tempMediaSubTypeList
              )
            }
            tempJournalDecodeList = await checkPressUserInvalid(tempJournalIdParams)
          }
        }
      } else {
        openToast('잘못된 접근입니다', 'error')
      }
    } catch (err) {
      openToast('잘못된 접근입니다', 'error')
    }
    dispatch(
      setResultListInitDataAction({
        listDefine: keyId,
        journalistId,
        journalFilterSub,
        pressParam,
        tempJournalIdParams,
        pressDto,
        tempJournalList,
        pressFilterSubActions,
        journalDecodeList: tempJournalDecodeList,

        mediaId,
        mediaFilterSub,
        mediaParam,
        tempMediaIdParams,
        mediaDto,
        tempMediaList,
        mediaFilterSubActions,

        pageCount: tempPageCount,
        tempSearchKeywordOption,
      })
    )
  }

  const filterMediaTypeInfo = async (list: any[], originData: SelectListOptionItem[]) => {
    let res: NavigationLinkItem[] = []
    for await (const paramElement of list) {
      let temp: NavigationLinkItem = {
        id: '',
        title: '',
        subMenus: [],
      }
      const find = originData.find(e => e.id === Object.keys(paramElement)[0])
      const count = Object.values(paramElement)[0] as string
      if (find && Number(count) > 0) {
        temp.id = find.id
        temp.title = find.name
        // @ts-ignore
        temp.subMenus = count && Number(count) > 0 ? Array.from({ length: Number(count) }, (v, i) => i) : []
        res = [...res, temp]
      }
    }
    // @ts-ignore
    res = res.sort((a, b) => {
      if (b && a) {
        if (a.id > b.id) return -1
        if (a.id < b.id) return 1
        return 0
      }
    })
    return res
  }

  const filterMediaValue = async (tempMediaValueList: SelectListOptionItem[], props: ESearchMediaCondDto) => {
    let res: NavigationLinkItem[] = []
    for await (const paramElement of tempMediaValueList) {
      let temp: NavigationLinkItem = {
        id: paramElement.id,
        title: paramElement.name,
        // @ts-ignore
        subMenus: [{ id: '', title: '' }],
      }
      if (props.value && props.value !== '' && Number(paramElement.id) >= Number(props.value)) {
        temp.subMenus = []
      }
      res = [...res, temp]
    }
    return res
  }

  const filterPressMediaValue = async (tempMediaValueList: SelectListOptionItem[], props: ESearchJournalistCondDto) => {
    let res: NavigationLinkItem[] = []
    for await (const paramElement of tempMediaValueList) {
      let temp: NavigationLinkItem = {
        id: paramElement.id,
        title: paramElement.name,
        // @ts-ignore
        subMenus: [{ id: '', title: '' }],
      }
      if (props.value && props.value !== '' && Number(paramElement.id) >= Number(props.value)) {
        temp.subMenus = []
      }
      res = [...res, temp]
    }
    return res
  }

  const filterMediaLocationAdjust = async (originList: object[]) => {
    let mainList: NavigationLinkItem[] = []
    let subList: NavigationLinkItem[] = []
    let res: NavigationLinkItem[] = []
    for await (const paramElement of originList) {
      if (Object.keys(paramElement)[0]) {
        const mainText = Object.keys(paramElement)[0] as string
        const mainCount = Object.values(paramElement)[0] as number
        const main = mainText.split('::::')
        if (main && main.length > 0) {
          const mainLoc = main[0]
          const subLoc = main[1]
          const check = mainList.find(e => e.id === mainLoc)
          if (!check) {
            mainList = [
              ...mainList,
              {
                id: mainLoc,
                title: mainLoc,
                subMenus: [],
              },
            ]
          }
          subList = [
            // @ts-ignore
            ...subList,
            {
              id: mainLoc,
              title: subLoc,
              // @ts-ignore
              subMenus:
                mainCount && Number(mainCount) > 0 ? Array.from({ length: Number(mainCount) }, (v, i) => i) : [],
            },
          ]
        }
      }
    }

    if (mainList.length > 0) {
      for await (const subRe of mainList) {
        let temp = { ...subRe }
        temp.subMenus = await getSubListData(subRe.id, subList)
        res = [...res, temp]
      }
    }
    return res
  }

  const getSubListData = async (key: string, origin: NavigationLinkItem[]) => {
    let res: NavigationLinkItem[] = []
    for await (const re of origin) {
      if (re.id === key) {
        res = [
          ...res,
          {
            id: re?.title || '',
            title: re?.title || '',
            subMenus: re?.subMenus || [],
          },
        ]
      }
    }
    return res
  }

  const filterMediaTypeAdjust = async (
    originList: object[],
    originKeyList: object[],
    idList: SelectListOptionItem[],
    tempMediaSubTypeList: mediaSubTypeListProps[]
  ) => {
    let res: NavigationLinkItem[] = []
    for await (const paramElement of originList) {
      const find = idList.find(e => e.extra === (Object.keys(paramElement)[0] as string).toString())
      const subTypeList = tempMediaSubTypeList.find(
        e => e.extra === (Object.keys(paramElement)[0] as string).toString()
      )
      if (find && subTypeList) {
        if (subTypeList.data.length > 0) {
          res = [
            ...res,
            {
              id: find.id,
              title: find.name,
              subMenus: await filterMediaTypeSubAdjust(subTypeList.data, originKeyList),
            },
          ]
        }
      }
    }

    return res
  }

  const filterMediaTypeSubAdjust = async (codeData: CommonCode[], originKeyList: object[]) => {
    let res: NavigationLinkItem[] = []
    for await (const codeDatum of originKeyList) {
      const codeDataFind = codeData.find(e => e.code === (Object.keys(codeDatum)[0] as string).toString())
      if (codeDataFind) {
        const count = Object.values(codeDatum)[0] as string
        if (Number(count) > 0) {
          res = [
            // @ts-ignore
            ...res,
            {
              id: codeDataFind.code.toString(),
              title: codeDataFind.name,
              // @ts-ignore
              subMenus: count && Number(count) > 0 ? Array.from({ length: Number(count) }, (v, i) => i) : [],
            },
          ]
        }
      }
    }

    return res
  }

  const getMediaFilterOptionControlData = async (
    origin: ElasticSearchReturnDtoMediaDocumentDto,
    props: ESearchMediaCondDto,
    tempMediaValueList: SelectListOptionItem[],
    tempMediaInfoTypeList: SelectListOptionItem[],
    tempMediaPubCycleList: SelectListOptionItem[],
    tempMediaPortalCodeList: SelectListOptionItem[],
    tempMediaTypeList: SelectListOptionItem[],
    tempMediaSubTypeList: mediaSubTypeListProps[]
  ) => {
    let filterSub: NavigationLinkItem[] = [
      {
        id: 'filterCategory',
        title: '매체 분야',
        subMenus: [],
      },
      {
        id: 'filterLocation',
        title: '매체 지역',
        subMenus: [],
      },
      {
        id: 'filterType',
        title: '매체 유형',
        subMenus: [],
      },
      {
        id: 'filterInformation',
        title: '매체 지수',
        subMenus: [],
      },
      {
        id: 'filterPubCycle',
        title: '발행 주기',
        subMenus: [],
      },
      {
        id: 'filterPortal',
        title: '포털 제휴',
        subMenus: [],
      },
      {
        id: 'filterSourceType',
        title: '정보 유형',
        subMenus: [],
      },
    ]

    if (tempMediaValueList.length > 0) {
      filterSub[3].subMenus = await filterMediaValue(tempMediaValueList, props)
    }
    if (tempMediaInfoTypeList.length > 0 && origin.filterSourceType && origin.filterSourceType.length > 0) {
      filterSub[6].subMenus = await filterMediaTypeInfo(origin.filterSourceType, tempMediaInfoTypeList)
    }
    if (tempMediaPortalCodeList.length > 0 && origin.filterPortal && origin.filterPortal.length > 0) {
      filterSub[5].subMenus = await filterMediaTypeInfo(origin.filterPortal, tempMediaPortalCodeList)
    }
    if (tempMediaPubCycleList.length > 0 && origin.filterPubCycle && origin.filterPubCycle.length > 0) {
      filterSub[4].subMenus = await filterMediaTypeInfo(origin.filterPubCycle, tempMediaPubCycleList)
    }
    if (origin.filterType && origin.filterType.length > 0 && origin.filterSubtype && origin.filterSubtype.length > 0) {
      filterSub[2].subMenus = await filterMediaTypeAdjust(
        origin.filterType,
        origin.filterSubtype,
        tempMediaTypeList,
        tempMediaSubTypeList
      )
    }
    if (origin.filterMediaLocationFull && origin.filterMediaLocationFull.length > 0) {
      filterSub[1].subMenus = await filterMediaLocationAdjust(origin.filterMediaLocationFull)
    }
    if (origin.filterMediaCategoryFull && origin.filterMediaCategoryFull.length > 0) {
      filterSub[0].subMenus = await filterMediaLocationAdjust(origin.filterMediaCategoryFull)
    }
    return filterSub
  }

  const getPressFilterOptionControlData = async (
    origin: ElasticSearchReturnDtoJournalistDocumentDto,
    props: ESearchJournalistCondDto,
    tempMediaValueList: SelectListOptionItem[],
    tempJournalistSocialFilterList: SelectListOptionItem[],
    tempJournalistOccupationList: SelectListOptionItem[],
    tempMediaInfoTypeList: SelectListOptionItem[],
    tempMediaPubCycleList: SelectListOptionItem[],
    tempMediaPortalCodeList: SelectListOptionItem[],
    tempMediaTypeList: SelectListOptionItem[],
    tempMediaSubTypeList: mediaSubTypeListProps[]
  ) => {
    let filterSub: NavigationLinkItem[] = [
      {
        id: 'filterCategory',
        title: '분야',
        subMenus: [],
      },
      {
        id: 'filterLocation',
        title: '지역',
        subMenus: [],
      },
      {
        id: 'filterOccupation',
        title: '직종',
        subMenus: [],
      },
      {
        id: 'filterType',
        title: '매체 유형',
        subMenus: [],
      },
      {
        id: 'filterInformation',
        title: '매체 지수',
        subMenus: [],
      },
      {
        id: 'filterPubCycle',
        title: '발행 주기',
        subMenus: [],
      },
      {
        id: 'filterPortal',
        title: '포털 제휴',
        subMenus: [],
      },
      {
        id: 'filterSocial',
        title: '소셜 미디어',
        subMenus: [],
      },
      {
        id: 'filterSourceType',
        title: '정보 유형',
        subMenus: [],
      },
    ]
    if (tempMediaValueList.length > 0) {
      filterSub[4].subMenus = await filterPressMediaValue(tempMediaValueList, props)
    }
    if (tempJournalistOccupationList.length > 0 && origin.filterOccupation && origin.filterOccupation.length > 0) {
      filterSub[2].subMenus = await filterMediaTypeInfo(origin.filterOccupation, tempJournalistOccupationList)
    }
    if (tempJournalistSocialFilterList.length > 0 && origin.filterSocial && origin.filterSocial.length > 0) {
      filterSub[7].subMenus = await filterMediaTypeInfo(origin.filterSocial, tempJournalistSocialFilterList)
    }
    if (tempMediaInfoTypeList.length > 0 && origin.filterSourceType && origin.filterSourceType.length > 0) {
      filterSub[8].subMenus = await filterMediaTypeInfo(origin.filterSourceType, tempMediaInfoTypeList)
    }
    if (tempMediaPortalCodeList.length > 0 && origin.filterPortal && origin.filterPortal.length > 0) {
      filterSub[6].subMenus = await filterMediaTypeInfo(origin.filterPortal, tempMediaPortalCodeList)
    }
    if (tempMediaPubCycleList.length > 0 && origin.filterPubCycle && origin.filterPubCycle.length > 0) {
      filterSub[5].subMenus = await filterMediaTypeInfo(origin.filterPubCycle, tempMediaPubCycleList)
    }
    if (origin.filterType && origin.filterType.length > 0 && origin.filterSubtype && origin.filterSubtype.length > 0) {
      filterSub[3].subMenus = await filterMediaTypeAdjust(
        origin.filterType,
        origin.filterSubtype,
        tempMediaTypeList,
        tempMediaSubTypeList
      )
    }
    if (origin.filterLocationFull && origin.filterLocationFull.length > 0) {
      filterSub[1].subMenus = await filterMediaLocationAdjust(origin.filterLocationFull)
    }
    if (origin.filterCategoryFull && origin.filterCategoryFull.length > 0) {
      filterSub[0].subMenus = await filterMediaLocationAdjust(origin.filterCategoryFull)
    }

    return filterSub
  }

  const setMediaIdParamsAction = useCallback(
    async (e: ESearchMediaDocumentDto, param: mediaSearchOptionProps, dto: ESearchMediaCondDto) => {
      const filter = setObjectToBase64({
        ...dto,
        ...param.additionalParam,
        ...param.keywordParam,
        media_id: Number(e.mid),
        key_id: 'media',
      })
      await mediaPersonalContactInfo(e?.mid ? Number(e?.mid) : 0)
      await mediaExcluded(e?.mid ? Number(e?.mid) : 0)
      await checkMediaUserInvalid(e)
      dispatch(mediaIdParamsAction(e))
      await router.replace(`/media/search-result?filter=${filter}`, undefined, { shallow: true })
    },
    [mediaIdKeyParam, mediaIdKey]
  )

  const setPressIdParamsAction = useCallback(
    async (e: ESearchJournalistDocumentDto, param: pressSearchOptionProps, dto: ESearchJournalistCondDto) => {
      const filter = setObjectToBase64({
        ...dto,
        ...param.additionalParam,
        ...param.keywordParam,
        journalist_id: Number(e.jrnlst_id),
        key_id: 'press',
      })
      const res = await checkPressUserInvalid(e)
      dispatch(
        pressIdParamsAction({
          param: e,
          ...res,
        })
      )
      await router.replace(`/contacts/search-result?filter=${filter}`, undefined, { shallow: true })
    },
    [journalIdKeyParam, journalIdKey]
  )

  const getDecodedData = async (message: string, type: string) => {
    let res = ''
    try {
      const { status, data } = await apiPostMediapassDecode({
        type,
        info: {
          message,
        },
      })
      if (status === 'S') {
        res = data as unknown as string
      }
    } catch (e) {
      console.log('>> getDecodedData error', e)
    }

    return res
  }

  const getBlockUserInfoData = async (email: string) => {
    let res: isMediaUserBlockProps = {
      blockedUserId: 0,
      companyId: 0,
      licenseId: 0,
      blockedAt: '',
      unblockRequestBy: null,
      unblockRequestCnt: 0,
    }
    try {
      if (EMAIL_PATTERN.test(email)) {
        const { status, data } = await apiBlockUserCheckAction.mutateAsync(email)
        if (status === 'S' && data !== undefined && data !== null) {
          res = data as isMediaUserBlockProps
        }
      }
    } catch (e) {
      console.log('>> getDecodedData error', e)
    }
    dispatch(isJournalUserBlockAction(res))
    dispatch(isMediaUserBlockAction(res))
  }

  const journalistPersonalContactInfo = async (id: number) => {
    let isBlocked = 0
    let res: ContactUserAddedDto | null = null
    try {
      const { status, data, message } = await apiGetJournalistContact(id)
      if (status === 'S') {
        res = data as ContactUserAddedDto
        if (res.contactUserAddedId && res.email) {
          if (EMAIL_PATTERN.test(res.email)) {
            const { status, data } = await apiBlockUserCheckAction.mutateAsync(res.email)
            if (status === 'S' && data !== undefined && data !== null) {
              const blockedData = data as isMediaUserBlockProps
              isBlocked = blockedData && blockedData.blockedUserId ? blockedData.blockedUserId : 0
            }
          }
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.log('>> getDecodedData error', e)
    }
    dispatch(journalContactInfoAction({ journalContactInfo: res, isBlocked: isBlocked }))
  }

  const mediaPersonalContactInfo = async (id: number) => {
    let res: ContactUserAddedDto | null = null
    if (id > 0) {
      try {
        const { status, data, message } = await apiGetMediaContact(id)
        if (status === 'S') {
          res = data as ContactUserAddedDto
        } else {
          openToast(message?.message, 'error')
        }
      } catch (e) {
        console.log('>> getDecodedData error', e)
      }
    }
    dispatch(mediaContactInfoAction(res))
  }

  const journalistExcluded = async (id: number) => {
    let res = false
    try {
      const { status, data, message } = await apiGetJournalistExcluded({
        id: id,
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        res = !!data
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.log('>> getDecodedData error', e)
    }
    dispatch(journalEmailBlockingAction(res))
  }

  const mediaExcluded = async (id: number) => {
    let res = false
    if (id > 0) {
      try {
        const { status, data, message } = await apiGetMediaExcluded({
          id: id,
          groupId: userSelectGroup,
        })
        if (status === 'S') {
          res = !!data
        } else {
          openToast(message?.message, 'error')
        }
      } catch (e) {
        console.log('>> getDecodedData error', e)
      }
    }
    dispatch(mediaEmailBlockingAction(res))
  }

  const getCommonCode = async (code: string, exParams?: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const setMediaAllSearchContentKeyList = useCallback(
    async (isCheck: boolean, origin: ESearchMediaDocumentDto[], newItems: ESearchMediaDocumentDto[]) => {
      let newItemsList = [...newItems]
      let dataList: ESearchMediaDocumentDto[] = newItemsList.filter(
        item1 => !origin.some(item2 => item1.mid === item2.mid)
      )

      if (isCheck) {
        for await (const dataListElement of origin) {
          if (dataListElement.mid) {
            dataList = [...dataList, dataListElement]
          }
        }
      }
      dispatch(searchContentKeyMediaListAction({ param: dataList, isTag: false }))
    },
    [searchContentKeyList]
  )

  const setPressAllSearchContentKeyList = useCallback(
    async (isCheck: boolean, origin: ESearchJournalistDocumentDto[], newItems: ESearchJournalistDocumentDto[]) => {
      let newItemsList = [...newItems]
      let dataList: ESearchJournalistDocumentDto[] = newItemsList.filter(
        item1 => !origin.some(item2 => item1.jrnlst_id === item2.jrnlst_id)
      )
      if (isCheck) {
        for await (const dataListElement of origin) {
          if (dataListElement.jrnlst_id) {
            dataList = [...dataList, dataListElement]
          }
        }
      }
      dispatch(searchContentKeyPressListAction({ param: dataList, isTag: false }))
    },
    [searchContentKeyList]
  )

  const setMediaParamsExpandButtonAction = useCallback(
    (e: boolean) => {
      dispatch(mediaParamsExpandButtonAction(e))
    },
    [mediaParamsExpandButton]
  )

  const setPressParamsExpandButtonAction = useCallback(
    (e: boolean) => {
      dispatch(pressParamsExpandButtonAction(e))
    },
    [pressParamsExpandButton]
  )

  const setPressParamKeywordButtonAction = useCallback(
    (e: boolean) => {
      dispatch(pressParamKeywordButtonAction(e))
    },
    [pressParamKeywordButton]
  )
  const setMediaParamKeywordButtonAction = useCallback(
    (e: boolean) => {
      dispatch(mediaParamKeywordButtonAction(e))
    },
    [mediaParamKeywordButton]
  )

  const setMediaParamKeywordAction = useCallback(
    (e: string) => {
      dispatch(mediaParamKeywordAction(e))
    },
    [mediaParamKeyword]
  )

  const setPressParamKeywordAction = useCallback(
    (e: string) => {
      dispatch(pressParamKeywordAction(e))
    },
    [pressParamKeyword]
  )

  const setMediaSearchContentKeyList = useCallback(
    async (e: boolean, actionKey: ESearchMediaDocumentDto, hook: ESearchMediaDocumentDto[]) => {
      let dataList: ESearchMediaDocumentDto[] = [...hook]
      if (e) {
        dataList = [...dataList, actionKey]
      } else {
        dataList = dataList.filter(i => i?.mid !== actionKey?.mid)
      }
      dispatch(searchContentKeyMediaListAction({ param: dataList, isTag: false }))
    },
    [searchContentKeyList]
  )

  const setContentListImageId = useCallback(() => dispatch(contentListImageIdAction(0)), [contentListImageId])

  const setPressSearchContentKeyList = useCallback(
    async (e: boolean, actionKey: ESearchJournalistDocumentDto, hook: ESearchJournalistDocumentDto[]) => {
      let dataList: ESearchJournalistDocumentDto[] = [...hook]
      if (e) {
        dataList = [...dataList, actionKey]
      } else {
        dataList = dataList.filter(i => i?.jrnlst_id !== actionKey?.jrnlst_id)
      }
      dispatch(searchContentKeyMediaListAction({ param: dataList, isTag: false }))
    },
    [searchContentKeyList]
  )

  const setOpenSearchRegisterPopup = useCallback(
    async (type: string) => {
      dispatch(
        searchRegisterPopupAction({
          isOpen: true,
          type,
          title: '',
          titleErr: '',
        })
      )
    },
    [searchRegisterPopup]
  )

  const setInitSearchRegisterPopup = useCallback(async () => {
    dispatch(
      searchRegisterPopupAction({
        isOpen: false,
        type: '',
        title: '',
        titleErr: '',
      })
    )
  }, [searchRegisterPopup])

  const setSearchRegisterPopupOnChange = useCallback(
    async (e: string, props: searchRegisterPopupProps) => {
      dispatch(
        searchRegisterPopupAction({
          ...props,
          title: e,
          titleErr: '',
        })
      )
    },
    [searchRegisterPopup.title]
  )

  const setOpenfilterMediaSubParamActions = useCallback(
    async (e: filterSubParamActionsProps[]) => {
      dispatch(setFilterMediaSubParamActions(e))
    },
    [filterMediaSubParamActions]
  )

  const setOpenfilterJournalSubParamActions = useCallback(
    async (e: filterSubParamActionsProps[]) => {
      dispatch(setFilterJournalSubParamActions(e))
    },
    [filterJournalSubParamActions]
  )

  const setRegisterJournalPhotoPopupAction = useCallback(
    (hooks: registerJournalPhotoPopupProps) => dispatch(registerJournalPhotoPopupAction(hooks)),
    [registerJournalPhotoPopup]
  )

  const setRegisterMediaPhotoPopupAction = useCallback(
    (hooks: registerMediaPhotoPopupProps) => dispatch(registerMediaPhotoPopupAction(hooks)),
    [registerMediaPhotoPopup]
  )

  const setProfileImageId = useCallback(() => dispatch(profileImageIdAction(0)), [profileImageId])

  const setSearchedNewsOpenActionAction = useCallback(
    (hooks: boolean) => dispatch(isSearchedNewsOpenAction(hooks)),
    [isSearchedNewsOpen]
  )

  const setMediaNoticeClose = useCallback(
    (id: number) => {
      dispatch(mediaDuplicationIdListSaga([...mediaDuplicationIdList, id]))
    },
    [mediaCheckDuplicateParam]
  )

  const setPressNoticeClose = useCallback(
    (id: number) => {
      dispatch(pressDuplicationIdListSaga([...pressDuplicationIdList, id]))
    },
    [pressCheckDuplicateParam]
  )

  const setDuplicationMediaPopupAction = useCallback(
    (props: duplicationMediaPopupProps) => {
      dispatch(duplicationMediaPopupAction(props))
    },
    [duplicationMediaPopup]
  )

  const setSelectedExcelFileData = useCallback(
    async (e: number, i: string, isOpen: boolean) =>
      dispatch(
        fileDownloadPopupAction({
          key: e,
          title: i,
          isOpen,
        })
      ),
    [fileDownloadPopup]
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

  const setDuplicationPressPopupAction = useCallback(
    (props: duplicationMediaPopupProps) => {
      dispatch(duplicationPressPopupAction(props))
    },
    [duplicationPressPopup]
  )

  const setAddPersonalContactAction = useCallback(
    (hooks: addPersonalContactProps) => dispatch(addPersonalContactAction(hooks)),
    [addPersonalContactPopup]
  )

  const setaddPersonalContactWebsite = useCallback(
    (e: string, props: addPersonalContactProps) => {
      const param = {
        ...props,
        website: e,
        websiteErr: '',
      }
      dispatch(addPersonalContactAction(param))
    },
    [addPersonalContactPopup.website]
  )

  const setaddPersonalContactPhone = useCallback(
    (e: string, props: addPersonalContactProps) => {
      const param = {
        ...props,
        phone: e,
      }
      dispatch(addPersonalContactAction(param))
    },
    [addPersonalContactPopup.phone]
  )

  const setaddPersonalContactFax = useCallback(
    (e: string, props: addPersonalContactProps) => {
      const param = {
        ...props,
        fax: e,
      }
      dispatch(addPersonalContactAction(param))
    },
    [addPersonalContactPopup.fax]
  )

  const setaddPersonalContactTelephone = useCallback(
    (e: string, props: addPersonalContactProps) => {
      const param = {
        ...props,
        telephone: e,
      }
      dispatch(addPersonalContactAction(param))
    },
    [addPersonalContactPopup.telephone]
  )

  const setaddPersonalContactAddress = useCallback(
    (e: string, props: addPersonalContactProps) => {
      const param = {
        ...props,
        address: e,
      }
      dispatch(addPersonalContactAction(param))
    },
    [addPersonalContactPopup.address]
  )

  const setaddPersonalContactEmail = useCallback(
    (e: string, props: addPersonalContactProps) => {
      const param = {
        ...props,
        email: e,
        emailErr: '',
      }
      dispatch(addPersonalContactAction(param))
    },
    [addPersonalContactPopup.email, addPersonalContactPopup.emailErr]
  )

  const setPressMediaErrPopupAction = useCallback(
    (props: pressMediaErrPopupProps) => {
      dispatch(pressMediaErrPopupAction(props))
    },
    [pressMediaErrPopup]
  )

  const setPressMediaErrTitleAction = useCallback(
    (e: string, props: pressMediaErrPopupProps) => {
      const param = {
        ...props,
        title: e,
        titleErr: '',
      }
      dispatch(pressMediaErrPopupAction(param))
    },
    [pressMediaErrPopup.title]
  )

  const setPressMediaErrContentAction = useCallback(
    (e: string, props: pressMediaErrPopupProps) => {
      const param = {
        ...props,
        contents: e,
        contentErr: '',
      }
      dispatch(pressMediaErrPopupAction(param))
    },
    [pressMediaErrPopup.contents]
  )

  const setBlockedEmailSenderPopupAction = useCallback(
    (props: blockedEmailSenderPopupProps) => {
      dispatch(blockedEmailSenderPopupAction(props))
    },
    [blockedEmailSenderPopup]
  )

  const setPressMediaUnBlockPopupAction = useCallback(
    (props: pressMediaUnBlockPopupProps) => {
      dispatch(pressMediaUnBlockPopupAction(props))
    },
    [pressMediaUnBlockPopup]
  )

  const setPressMediaUnBlockTitleAction = useCallback(
    (e: string, props: pressMediaUnBlockPopupProps) => {
      const param = {
        ...props,
        title: e,
        titleErr: '',
      }
      dispatch(pressMediaUnBlockPopupAction(param))
    },
    [pressMediaUnBlockPopup.title]
  )

  const setPressMediaUnBlockContentAction = useCallback(
    (e: string, props: pressMediaUnBlockPopupProps) => {
      const param = {
        ...props,
        contents: e,
        contentErr: '',
      }
      dispatch(pressMediaUnBlockPopupAction(param))
    },
    [pressMediaUnBlockPopup.contents]
  )

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    shareCodeData,
    listDefine,
    isTagButton,
    isSelectedAllNewsId,
    searchContentListButton,
    searchContentKeyList,
    isOwner,
    pressListParams,
    mediaListParams,
    journalApiList,
    mediaApiList,
    journalIdKey,
    mediaIdKey,
    journalIdKeyParam,
    mediaIdKeyParam,
    pressDto,
    mediaDto,
    pageCount,
    journalLoading,
    mediaLoading,
    filterMediaSubParamActions,
    filterJournalSubParamActions,
    filterMediaSubParam,
    filterJournalSubParam,
    mediaParamsExpandButton,
    pressParamsExpandButton,
    mediaParamKeyword,
    pressParamKeyword,
    mediaParamKeywordButton,
    pressParamKeywordButton,
    searchRegisterPopup,
    isLimitFilter,
    actionCategoryList,
    actionStateFilterList,
    journalContactInfo,
    journalEmailBlocking,
    journalDecodeList,
    journalTab,
    journalNewsCountPage,
    newsListByJournalId,
    newsLoading,
    registerJournalPhotoPopup,
    journalActivityCountPage,
    activityListByJournalId,
    activityLoading,
    addPersonalContactPopup,
    pressMediaErrPopup,
    isJournalUserBlock,
    pressMediaUnBlockPopup,
    blockedEmailSenderPopup,
    mediaTab,
    registerMediaPhotoPopup,
    mediaActivityCountPage,
    mediaNewsCountPage,
    activityListByMediaId,
    newsListByMediaId,
    filterPortalCode,
    mediaEmailBlocking,
    mediaContactInfo,
    mediaDecodeList,
    isMediaUserBlock,
    isSearchedNewsOpen,
    mediaCheckDuplicateParam,
    duplicationMediaPopup,
    pressCheckDuplicateParam,
    duplicationPressPopup,
    userPopup,
    fileDownloadPopup,
    userPressListAutoSaveData,
    userMediaListAutoSaveData,
    publisherTypeList,
    timeZone,
    pressNewsList,
    settingsRefinedValue,
    searchLimitAlarm,
    journalContactBlockedInfo,
    profileImageId,
    contentListImageId,
    isDemoLicense,
    activityListTotalCount,
    newsListTotalCount,

    init,
    moveToMediaResearch,
    searchPressRegisterAction,
    searchMediaRegisterAction,
    setMediaAddExtraFilterSearch,
    setMediaAddAllExtraFilterSearch,
    setMediaDeleteGroupExtraFilterSearch,
    handleMediaChangeSize,
    handleMediaPaginationChange,
    handleMediaChangeSort,
    setMediaTagDeleteControlSearch,
    setMediaTagControlSearch,
    setInitMediaFilterSubParamActions,
    setMediaExtractExtraFilterSearch,
    setMediaAddExtraSelectedFilterSearch,
    mediaFilterOptionAction,
    pressFilterOptionAction,
    handlePressChangeSize,
    handlePressPaginationChange,
    handlePressChangeSort,
    moveToPressResearch,
    setPressTagControlSearch,
    setPressTagDeleteControlSearch,
    setInitPressFilterSubParamActions,
    setPressExtractExtraFilterSearch,
    setPressAddExtraFilterSearch,
    setPressAddAllExtraFilterSearch,
    setPressDeleteGroupExtraFilterSearch,
    setPressAddExtraSelectedFilterSearch,
    mediaKeywordSearch,
    pressKeywordSearch,
    getNewsSearchByJournalId,
    getNewsSearchByMediaId,
    changeJournalTab,
    journalistPhotoPopupAdjust,
    getActivitySearchByJournalId,
    getActivitySearchByMediaId,
    createPersonalContact,
    deletePersonalContact,
    pressMediaErrAction,
    pressMediaUnBlockAction,
    pressProfileOptionAction,
    journalistUnBlockedAction,
    journalistPhotoDeleteAdjust,
    changeMediaTab,
    mediaPhotoDeleteAdjust,
    medialistPhotoPopupAdjust,
    mediaProfileOptionAction,
    createMediaPersonalContact,
    mediaUnBlockedAction,
    moveJournalDetail,
    moveMediaDetail,
    journalistBlockedAction,
    mediaBlockedAction,
    deleteDuplicationMedia,
    deleteDuplicationJournal,
    ownerFunction,
    userContactValidation,
    exportToMediaExcel,
    exportToPressExcel,
    checkAutoRegisterPressRegist,
    checkAutoRegisterSelectedPressRegist,
    checkAutoRegisterMediaRegist,
    checkAutoRegisterSelectedMediaRegist,
    onChangeJournalPhotoFiles,
    onChangeMediaPhotoFiles,
    afterPressRegistAddReLoad,
    afterMediaRegistAddReLoad,

    setMediaAllSearchContentKeyList,
    setMediaParamsExpandButtonAction,
    setMediaParamKeywordButtonAction,
    setPressParamKeywordButtonAction,
    setMediaParamKeywordAction,
    setMediaSearchContentKeyList,
    setMediaIdParamsAction,
    setOpenSearchRegisterPopup,
    setInitSearchRegisterPopup,
    setSearchRegisterPopupOnChange,
    setOpenfilterMediaSubParamActions,
    setPressIdParamsAction,
    setPressSearchContentKeyList,
    setContentListImageId,
    setPressParamKeywordAction,
    setPressAllSearchContentKeyList,
    setPressParamsExpandButtonAction,
    setOpenfilterJournalSubParamActions,
    setRegisterJournalPhotoPopupAction,
    setAddPersonalContactAction,
    setaddPersonalContactEmail,
    setaddPersonalContactPhone,
    setaddPersonalContactWebsite,
    setaddPersonalContactTelephone,
    setaddPersonalContactFax,
    setaddPersonalContactAddress,
    setPressMediaErrPopupAction,
    setPressMediaErrTitleAction,
    setPressMediaErrContentAction,
    setPressMediaUnBlockTitleAction,
    setPressMediaUnBlockContentAction,
    setPressMediaUnBlockPopupAction,
    setBlockedEmailSenderPopupAction,
    setRegisterMediaPhotoPopupAction,
    setProfileImageId,
    setSearchedNewsOpenActionAction,
    setDuplicationMediaPopupAction,
    setMediaNoticeClose,
    setPressNoticeClose,
    setDuplicationPressPopupAction,
    setUserProfilePopupAction,
    setSelectedExcelFileData,
  }
}
