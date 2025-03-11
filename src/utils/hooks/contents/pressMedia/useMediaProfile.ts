import { ChangeEvent, useCallback, useEffect } from 'react'
import { Address } from 'react-daum-postcode'
import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { MediaAddRegisterContext } from '~/components/contents/common/forms/PressMediaListBookPopup/PressMediaAutoRegisterContext'
import {
  defaultMediaUserBlockData,
  extendedCommonCodeTargetList,
} from '~/components/contents/pressMedia/MediaProfile/defaultData'
import { MediaAutoRegisterContext } from '~/components/contents/pressMedia/MediaProfile/Popup/AutoRegisterContext'
import { disclosureScopeFilterOptionList } from '~/components/contents/pressMedia/SearchResult/defaultData'
import {
  ALLOWED_ORIGINS,
  EMAIL_PATTERN,
  EMAIL_PATTERN_DESCRIPTION,
  SVC_DOMAIN_URL,
  URL_REGEXP,
  URL_REGEXP_DESCRIPTION,
} from '~/constants/common'
import { initActivityPopupAction } from '~/stores/modules/contents/activity/activityPopup'
import { tagetListOpenEmailPopupAction } from '~/stores/modules/contents/email/email'
import {
  mediaDuplicationIdListSaga,
  pressReleaseDataExtraAction,
  userAutoSaveDataProps,
  userMediaListAutoSaveDataAction,
} from '~/stores/modules/contents/extraData/extra'
import { additionalParamProps, keywordsProps } from '~/stores/modules/contents/monitoring/newsSearch'
import {
  actionCategoryListAction,
  actionStateFilterAction,
  activityLoadingAction,
  activityParamKeywordAction,
  addPersonalContactAction,
  addressPopupAction,
  blockedEmailSenderPopupAction,
  commonCodeStateAction,
  CountPageProps,
  dataOnChangeActionProps,
  dataOnChangeActionTypeProps,
  duplicationMediaPopupAction,
  duplicationMediaPopupProps,
  filterPortalCodeAction,
  initAction,
  isMediaUserBlockAction,
  isMediaUserBlockProps,
  journalNewsCountPaginationInfoProps,
  mediaCheckDuplicateParamAction,
  mediaContactInfoAction,
  mediaEmailBlockingAction,
  mediaGroupJournalistAction,
  mediaGroupSubMediaListAction,
  mediaGroupTabAction,
  mediaIdKeyParamAction,
  mediaPersonalParamsAction,
  mediaPersonalParamsProps,
  newsListByPressMediaIdAction,
  newsLoadingAction,
  pressMediaErrPopupAction,
  pressMediaUnBlockPopupAction,
  profileImageIdAction,
  publisherTypeAction,
  registerJournalPhotoPopupAction,
  registerMediaPhotoPopupAction,
  searchContentListProps,
  searchRegisterListAction,
  searchRegisterListPopupAction,
  setActivityDataListAction,
  setActivityTabAction,
  setChangeActivityTabAction,
  setMediaActivityDataListAction,
  setMediaActivityTabAction,
  setMediaChangeActivityTabAction,
  setResultInitDataAction,
  userPopupAction,
} from '~/stores/modules/contents/pressMedia/mediaProfile'
import {
  initPressMediaListBookPopupAction,
  initSearchRegisterListPopupAction,
  searchRegisterListProps,
} from '~/stores/modules/contents/pressMedia/pressMediaListBookPopup'
import { pressSearchOptionProps } from '~/stores/modules/contents/pressMedia/pressMediaSearch'
import {
  addPersonalContactProps,
  blockedEmailSenderPopupProps,
  mediaContentListProps,
  pressMediaErrPopupProps,
  pressMediaUnBlockPopupProps,
  registerJournalPhotoPopupProps,
  registerMediaPhotoPopupProps,
  searchRegisterListPopupProps,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import {
  BaseResponseCommonObject,
  ContactUserAddedDto,
  ElasticSearchReturnDtoJournalistDocumentDto,
  ElasticSearchReturnDtoMediaDocumentDto,
  type ElasticSearchReturnDtoNewsDocumentDto,
  type ESearchJournalistCondDto,
  ESearchMediaCondDto,
  ESearchNewsCondDto,
  MediaAutoCompleteDto,
  PageActionDtoForList,
  type UserDto,
} from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import {
  ESearchJournalistDocumentDto,
  ESearchMediaDocumentDto,
  type JournalistMediaGroupItem,
} from '~/types/contents/PressMedia'
import { apiGetActionListByConfition, UseGetActionListParams } from '~/utils/api/action/useGetActionList'
import { usePostInquiry, UsePostInquiryParams } from '~/utils/api/additionalServices/useGetLicenseInfo'
import {
  UnBlockedUserParams,
  useBlockUserCheckAction,
  useUnBlockedUserCheckAction,
} from '~/utils/api/block/useBlockUserAction'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { usePostJournalistContactCreateUpdate } from '~/utils/api/contact/journalist/usePostJournalistContactCreateUpdate'
import { apiGetMediaContact } from '~/utils/api/contact/media/useGetMediaContact'
import { usePostMediaContactCreateUpdate } from '~/utils/api/contact/media/usePostMediaContactCreateUpdate'
import { useDeleteContactInfo } from '~/utils/api/contact/useDeleteContactInfo'
import { useDeleteJournalistExcluded } from '~/utils/api/email/journalist/useDeleteJournalistExcluded'
import { usePostJournalistExcluded } from '~/utils/api/email/journalist/usePostJournalistExcluded'
import { useDeleteMediaExcluded } from '~/utils/api/email/media/useDeleteMediaExcluded'
import { apiGetMediaExcluded } from '~/utils/api/email/media/useGetMediaExcluded'
import { usePostMediaExcluded } from '~/utils/api/email/media/usePostMediaExcluded'
import { apiPostMediapassDecode } from '~/utils/api/encrypt/usePostMediapassDecode'
import { useGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { usePostJournalistGroupAddJournalId } from '~/utils/api/groupList/journalist/usePostJournalistGroupAddJournalist'
import { usePostJournalistGroupDeleteJournal } from '~/utils/api/groupList/journalist/usePostJournalistGroupDeleteJournalist'
import { useGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import {
  usePostMediaGroupAddMedia,
  usePostMediaGroupAddMediaAuto,
} from '~/utils/api/groupList/media/usePostMediaGroupAddMedia'
import { usePostMediaCreate } from '~/utils/api/groupList/media/usePostMediaGroupCreate'
import { usePostMediaGroupDeleteMedia } from '~/utils/api/groupList/media/usePostMediaGroupDeleteMedia'
import { usePostJournalistSearch } from '~/utils/api/journalist/usePostJournalistSearch'
import { apiGetMediaNameAutoComplete } from '~/utils/api/media/useGetMediaNameAutoComplete'
import { usePostMediaSearch } from '~/utils/api/media/usePostMediaSearch'
import { usePostNewsSearch } from '~/utils/api/news/usePostNewsSearch'
import { useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { usePutJournalistPhoto } from '~/utils/api/userCustom/journalist/usePutJournalistImage'
import { usePutJournalistImageDelete } from '~/utils/api/userCustom/journalist/usePutJournalistImageDelete'
import { useDeleteMedia } from '~/utils/api/userCustom/media/useDeleteMedia'
import { usePutMedia, UsePutMediaParams } from '~/utils/api/userCustom/media/usePutMedia'
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

export const useMediaProfile = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    listDefine,
    mediaIdKey,
    mediaIdKeyParam,
    blockedEmailSenderPopup,
    registerJournalPhotoPopup,
    searchRegisterListPopup,
    searchRegisterList,
    pressMediaUnBlockPopup,
    addPersonalContactPopup,
    pressMediaErrPopup,
    newsLoading,
    newsDto,
    actionCategoryList,
    actionStateFilterList,
    mediaNewsCountPage,
    mediaNewsCountPaginationInfo,
    newsListByMediaId,
    mediaEmailBlocking,
    mediaContactInfo,
    isMediaUserBlock,
    filterPortalCode,
    mediaGroupMediaKey,
    registerMediaPhotoPopup,
    mediaGroupJournalist,
    mediaGroupSubMediaList,
    mediaGroupTab,
    mediaGroupSubMediaListCountPage,
    mediaGroupJournalistCountPage,
    activityDataListPaginationInfo,
    activityLoading,
    activityTabList,
    activityTab,
    activityDataList,
    commonCodeState,
    duplicationMediaPopup,
    mediaCheckDuplicateParam,
    mediaPersonalParamsPopup,
    addressPopup,
    userPopup,
    activityParamKeyword,
    profileImageId,
    publisherTypeList,
  } = useAppSelector(state => state.mediaProfileSlice)
  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone } = useAppSelector(
    state => state.authSlice
  )
  const { mediaDuplicationIdList, userMediaListAutoSaveData } = useAppSelector(state => state.extraSlice)

  const getNewsSearchResult = usePostNewsSearch()
  const journalistSearch = usePostJournalistSearch()
  const mediaSearch = usePostMediaSearch()
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
  const apiDeleteJournalistIncluded = usePostJournalistExcluded()
  const apiDeleteMediaIncluded = usePostMediaExcluded()
  const journalistGroupAddJournalist = usePostJournalistGroupAddJournalId()
  const journalistGroupDeleteJournalist = usePostJournalistGroupDeleteJournal()
  const mediaGroupAddMedia = usePostMediaGroupAddMedia()
  const mediaGroupAddMediaAuto = usePostMediaGroupAddMediaAuto()
  const mediaGroupDeleteMedia = usePostMediaGroupDeleteMedia()
  const apiDeleteMediaExcluded = useDeleteMediaExcluded()
  const deleteMedia = useDeleteMedia()
  const editUserMedia = usePutMedia()
  const createMediaGroup = usePostMediaCreate()

  const { data: apiGetOneUser } = useGetOneUserOption(userPopup.keyValue > 0 ? userPopup.keyValue : 0)

  const { data: mediaCustomSearchListData, refetch: refetchMedialistCustomSearch } = useGetMediaGroup(
    {
      page: 1,
      size: 100000,
      sort: ['updateAt!desc'],
      title: searchRegisterListPopup.name,
      groupId: userSelectGroup,
    },
    {
      enabled:
        searchRegisterListPopup.isOpen &&
        searchRegisterListPopup.kind === 'media' &&
        router.pathname.startsWith('/media/record'),
    }
  )
  const { data: journalistCustomSearchListData, refetch: refetchJournalistCustomSearch } = useGetJournalistGroup(
    {
      page: 1,
      size: 100000,
      sort: ['updateAt!desc'],
      title: searchRegisterListPopup.name,
      groupId: userSelectGroup,
    },
    {
      enabled:
        searchRegisterListPopup.isOpen &&
        searchRegisterListPopup.kind === 'press' &&
        router.pathname.startsWith('/media/record'),
    }
  )

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
    dispatch(mediaCheckDuplicateParamAction(duplicationData))
  }

  const createPersonalContact = async (props: addPersonalContactProps, idKey: number) => {
    let isProcess = false
    let emailErr = ''
    if (!EMAIL_PATTERN.test(props.email)) {
      emailErr = EMAIL_PATTERN_DESCRIPTION
    } else {
      isProcess = true
    }

    if (isProcess) {
      const { status, message } = await createUpdateJournalistContact.mutateAsync({
        objectId: idKey,
        email: props.email,
        phone: props.phone,
        mobile: props.telephone,
        address: props.address,
      })
      if (status === 'S') {
        openToast('개인적 연락처를 추가했습니다.', 'success')
        await init()
      } else {
        openToast(message?.message, 'error')
      }
    }
    dispatch(addPersonalContactAction({ ...props, emailErr }))
  }

  const getNewsSearchByMonitoring = async (params: ESearchNewsCondDto) => {
    let newsData: ElasticSearchReturnDtoNewsDocumentDto | null = null
    dispatch(newsLoadingAction(true))
    try {
      const { status, message, data } = await getNewsSearchResult.mutateAsync({ ...params, groupId: userSelectGroup })
      if (status === 'S') {
        newsData = data as ElasticSearchReturnDtoNewsDocumentDto
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    dispatch(newsLoadingAction(false))

    return newsData
  }

  const mediaHandlePaginationChange = async (e: number, props: journalNewsCountPaginationInfoProps, keyId: number) => {
    const dto = {
      timezone: timeZone,
      periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
      periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
      periodStartDay: moment().subtract({ year: 2 }).format('DD'),
      periodEndYear: moment().format('YYYY'),
      periodEndMonth: moment().format('MM'),
      periodEndDay: moment().format('DD'),
      page: e,
      size: props.size,
      sort: [`inserted!desc`, `newsid!desc`],
      groupId: userSelectGroup,
      mediaIdList: [keyId],
    }
    const res = await getNewsSearchByMonitoring(dto)
    if (res) {
      const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / dto.size)
      dispatch(
        newsListByPressMediaIdAction({
          list: newsData,
          page: {
            totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
          },
          size: {
            page: e,
            size: props.size,
          },
        })
      )
    }
  }
  const pressHandlePaginationChange = async (e: number, props: journalNewsCountPaginationInfoProps, keyId: number) => {
    const dto = {
      timezone: timeZone,
      periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
      periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
      periodStartDay: moment().subtract({ year: 2 }).format('DD'),
      periodEndYear: moment().format('YYYY'),
      periodEndMonth: moment().format('MM'),
      periodEndDay: moment().format('DD'),
      page: e,
      size: props.size,
      sort: [`inserted!desc`, `newsid!desc`],
      groupId: userSelectGroup,
      journalistIdList: [keyId],
    }
    const res = await getNewsSearchByMonitoring(dto)
    if (res) {
      const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / dto.size)
      dispatch(
        newsListByPressMediaIdAction({
          list: newsData,
          page: {
            totalCount: newsData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: newsData.length > 0 ? totalPage ?? 0 : 0,
          },
          size: {
            page: e,
            size: props.size,
          },
        })
      )
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
        mediaId: props.key,
        targetTitle: props.newsTitle,
      },
      fileList: [],
    }
    if (props.title === '') {
      titleErr = '제목을 입력하세요'
    }
    if (props.contents === '') {
      contentErr = '내용을 입력하세요'
    }
    if (props.title !== '' && props.contents !== '') {
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

  const dataOnChangeAction = async (type: dataOnChangeActionTypeProps, props: dataOnChangeActionProps) => {
    if (type.personalContacts === 'change' && props.personalContacts) {
      await mediaPersonalContactInfo(props.personalContacts)
    }
    if (type.emailBlock === 'change' && props.emailBlock) {
      await mediaExcluded(props.emailBlock)
    }
    if (type.isMediaUserBlock === 'change' && props.isMediaUserBlock && props.isMediaUserBlock !== '') {
      await getBlockUserInfoData(props.isMediaUserBlock)
    }
  }

  const createMediaPersonalContact = async (props: addPersonalContactProps, idKey: number) => {
    try {
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
        await dataOnChangeAction({ personalContacts: 'change' }, { personalContacts: Number(idKey) })
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

  const deletePersonalContact = async (idKey: string) => {
    try {
      const { status, message } = await deleteContactInfo.mutateAsync(Number(idKey))
      if (status === 'S') {
        openToast(message?.message, 'success')
        await dataOnChangeAction({ personalContacts: 'change' }, { personalContacts: Number(idKey) })
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

  const pressMediaUnBlockAction = async (
    props: pressMediaUnBlockPopupProps,
    origin: ESearchMediaDocumentDto | null
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
        if (origin) {
          const beeEmail = origin?.isSysInfo ? origin.contacts?.all?.beemail || '' : origin?.email?.toString() || ''
          await dataOnChangeAction({ isMediaUserBlock: 'change' }, { isMediaUserBlock: beeEmail })
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

  const journalistPhotoPopupAdjust = async (props: registerJournalPhotoPopupProps, target: number) => {
    if (props.filesList.length > 0) {
      const { status, message } = await saveJournalistPhoto.mutateAsync({
        id: target,
        file: props.filesList[0].file as File,
      })
      if (status === 'S') {
        openToast(message?.message, 'success')
        await init()
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('등록할 사진을 선택해 주세요.', 'error')
      return
    }
  }

  const journalistPhotoDeleteAdjust = async (target: number) => {
    const { status, message } = await deleteJournalistPhoto.mutateAsync(target)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const mediaBlockedAction = async (props: blockedEmailSenderPopupProps, idKey: number) => {
    const { status, message } = await apiDeleteMediaIncluded.mutateAsync({
      objectId: Number(props.idKey),
      email: props.email,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      openToast('이메일 발송을 차단했습니다.', 'success')
      await dataOnChangeAction({ emailBlock: 'change' }, { emailBlock: Number(idKey) })
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
  const mediaUnBlockedAction = async (props: blockedEmailSenderPopupProps, idKey: number) => {
    const { status, message } = await apiDeleteMediaExcluded.mutateAsync({
      id: Number(props.idKey),
      info: {
        groupId: userSelectGroup,
      },
    })
    if (status === 'S') {
      openToast('이메일 발송 차단을 해제했습니다.', 'success')
      await dataOnChangeAction({ emailBlock: 'change' }, { emailBlock: Number(idKey) })
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

  const journalistBlockedAction = async (props: blockedEmailSenderPopupProps) => {
    const { status, message } = await apiDeleteJournalistIncluded.mutateAsync({
      objectId: Number(props.idKey),
      email: props.email,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      openToast('이메일 발송을 차단했습니다.', 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
    }
  }
  const journalistUnBlockedAction = async (props: blockedEmailSenderPopupProps) => {
    const { status, message } = await apiDeleteJournalistExcluded.mutateAsync({
      id: Number(props.idKey),
      info: {
        groupId: userSelectGroup,
      },
    })
    if (status === 'S') {
      openToast('이메일 발송 차단을 해제했습니다.', 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
    }
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
    dispatch(isMediaUserBlockAction(res))
  }

  const mediaPersonalContactInfo = async (id: number) => {
    let res: ContactUserAddedDto | null = null
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
    dispatch(mediaContactInfoAction(res))
  }

  const mediaExcluded = async (id: number) => {
    try {
      const { status, data, message } = await apiGetMediaExcluded({
        id: id,
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        dispatch(mediaEmailBlockingAction(!!data))
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {
      console.log('>> getDecodedData error', e)
    }
  }

  const getCommonCode = async (code: string) => {
    let res: SelectListOptionItem[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      const codeData = data as CommonCode[]
      let list = codeData.map(e => {
        return { id: e.code, name: e.name }
      })
      res = list as SelectListOptionItem[]
      if (code === 'ACTION_STATE_FILTER') {
        dispatch(actionStateFilterAction(list))
      } else if (code === 'ACTION_CATEGORY_ALL') {
        dispatch(actionCategoryListAction(list))
      } else if (code === 'PORTAL_CODE') {
        dispatch(filterPortalCodeAction(list))
      } else if (code === 'ACTION_STATE') {
        dispatch(commonCodeStateAction(list))
      } else if (code === 'PUBLISHER_TYPE') {
        dispatch(publisherTypeAction(list))
      }
    } else {
      openToast(message?.message, 'error')
      return res
    }
    return res
  }

  const initMediaRegistList = async (prop: PageableDataDto<JournalistMediaGroupItem>) => {
    let param: mediaContentListProps[] = []
    if (prop.content && prop.content.length > 0) {
      for await (const content of prop.content) {
        const find = searchRegisterListPopup.except.find(o => o === Number(content.mediaListId))
        if (!find) {
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
          let temp: mediaContentListProps = {
            ...content,
            isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
            isOwner: userInfo.userId === content.owner?.userId,
            settingList: [],
            shareCodeNm: findShareScopeList?.name || '',
          }
          param = [...param, temp]
        }
      }
    }
    dispatch(searchRegisterListAction(param))
  }

  const initPressRegistList = async (prop: PageableDataDto<JournalistMediaGroupItem>) => {
    let param: mediaContentListProps[] = []
    if (prop.content && prop.content.length > 0) {
      for await (const content of prop.content) {
        const find = searchRegisterListPopup.except.find(o => o === Number(content.jrnlstListId))
        if (!find) {
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
          let temp: mediaContentListProps = {
            ...content,
            isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
            isOwner: userInfo.userId === content.owner?.userId,
            settingList: [],
            shareCodeNm: findShareScopeList?.name || '',
          }
          param = [...param, temp]
        }
      }
    }
    dispatch(searchRegisterListAction(param))
  }

  const mediaPhotoDeleteAdjust = async (target: number) => {
    const { status, message } = await deleteMediaPhoto.mutateAsync(target)
    if (status === 'S') {
      openToast('사진이 삭제되었습니다.', 'success')
      await init()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const moveToTotalJournalList = async (dtoData: ESearchMediaDocumentDto, props: pressSearchOptionProps) => {
    const param = {
      ...props.keywordParam,
      mediaTagList: [
        {
          id: dtoData.mid?.toString() ?? uuid(),
          label: `${dtoData.name} - ${dtoData.subtype}` ?? '',
          className: 'mediaIdList',
        },
      ],
    }
    const res = setObjectToBase64({
      ...param,
      ...props.additionalParam,
      journalist_id: 0,
      key_id: 'press',
    })
    await router.push(`/contacts/search-result?filter=${res}`)
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
    dispatch(userMediaListAutoSaveDataAction(autoCompleteData))
    if (type !== '') {
      openToast(
        MediaAutoRegisterContext({
          valueName: autoMediaRegistId.name,
          onChangeAction: () => {
            setOneMediaSearchRegistPopupAction(true, eSearchMedia ? eSearchMedia[0] : null, autoMediaRegistId.key)
          },
        }),
        'success'
      )
    }
  }

  const addMediaRegistMediaAuto = async (autoMediaRegistId: number, mediaIdItem: number[]) => {
    let res = ''
    let mediaGroupAdd = {
      // @ts-ignore
      mediaListId: autoMediaRegistId,
      mediaId: mediaIdItem[0],
    }
    const { status, message } = await mediaGroupAddMediaAuto.mutateAsync(mediaGroupAdd)
    if (status) {
      res = status
    }
    return status
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

  const mediaGroupJournalistPaginationChange = async (e: number, props: CountPageProps, idKey: number) => {
    const apiParam = {
      sort: ['name!asc'],
      mediaIdList: [idKey],
      page: e,
      size: props.size,
      groupId: userSelectGroup,
    }
    const res = await getJournalist(apiParam)
    if (res) {
      const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / props.size)
      dispatch(
        mediaGroupJournalistAction({
          journalData,
          pageCount: {
            totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
            page: e,
            size: props.size,
          },
        })
      )
    }
  }

  const calculateChangeValueCheck = (newValue: number[], origin: number[]) => {
    let res = false
    if (newValue.length === 0 && origin.length === 0) {
      res = false
    } else if (newValue.length === 0 && origin.length > 0) {
      res = true
    } else if (newValue.length > 0 && origin.length === 0) {
      res = true
    } else {
      if (origin.length > 0) {
        const newValueBigger = newValue.filter(item => !origin.includes(item))
        const originBigger = origin.filter(item => !newValue.includes(item))
        const changeValue = [...newValueBigger, ...originBigger]
        if (changeValue && changeValue.length > 0) {
          res = true
        }
      } else {
        res = true
      }
    }

    return res
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

  const afterMediaRegistAddReLoad = async (
    dto: number,
    originParam: ESearchMediaDocumentDto,
    resultSearchRegisterListProps?: searchRegisterListProps[]
  ) => {
    let mediaParam = originParam
    try {
      const res = await getMediaList({
        page: 1,
        size: 20,
        sort: ['values.combined!desc'],
        mediaIdList: [dto],
        groupId: userSelectGroup,
      })
      if (res) {
        const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
        if (mediaData && mediaData.length > 0) {
          mediaParam = mediaData[0] ? mediaData[0] : mediaParam
        }
      }
      dispatch(mediaIdKeyParamAction(mediaParam))
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
    } catch (e) {}
    dispatch(initPressMediaListBookPopupAction())
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

  const createRegisterMediaListAction = async (origins: searchRegisterListPopupProps) => {
    const { status, data, message } = await createMediaGroup.mutateAsync({
      title: origins.name,
      groupId: userSelectGroup,
      shareCode: shareCodeData.list.id,
    })
    if (status === 'S' && data) {
      dispatch(
        searchRegisterListPopupAction({
          ...origins,
          isActive: true,
          searchRegistIdList: [...origins.searchRegistIdList, Number(data)],
        })
      )
      await refetchMedialistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const checkAutoRegisterMediaRegist = async (
    e: boolean,
    idList: ESearchMediaDocumentDto,
    userMediaRegistList: userAutoSaveDataProps[]
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
      await afterMediaRegistAdd(idList, autoKey)
    }
  }

  const afterMediaRegistAdd = async (originParam: ESearchMediaDocumentDto, keyId: userAutoSaveDataProps) => {
    let mediaParam = originParam
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
    dispatch(mediaIdKeyParamAction(mediaParam))
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

  const userContactValidation = async (props: addPersonalContactProps) => {
    let isProcess = false
    let emailErr = ''
    let websiteErr = ''

    if (props.email === '' && props.phone === '' && props.fax === '' && props.address === '' && props.website === '') {
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
  const ownerFunction = async (keyword: number) => {
    dispatch(
      userPopupAction({
        isOpen: false,
        email: '',
        displayName: '',
        phone: '',
        mobile: '',
        role: '',
        keyValue: keyword,
      })
    )
  }
  const pressPersonalAddressNmAction = async (e: Address, props: mediaPersonalParamsProps) => {
    const { userSelectedType, address, roadAddress, jibunAddress } = e
    const params = {
      ...props,
      address: userSelectedType === 'R' ? roadAddress : userSelectedType === 'J' ? jibunAddress : address,
    }
    dispatch(mediaPersonalParamsAction(params))
  }

  const mediaPersonalEdit = async (props: mediaPersonalParamsProps) => {
    let returnValue = ''
    const param: UsePutMediaParams = {
      id: props.key,
      info: {
        name: props.mediaName,
        wsite: props.website,
        email: props.email,
        landline: props.landline,
        fax: props.mobile,
        fieldsByUser: props.fields.split(','),
        address: props.address + props.subAddressNm,
      },
    }
    const { status, data, message } = await editUserMedia.mutateAsync(param)
    if (status === 'S') {
      openToast('개인 추가 미디어 정보를 수정했습니다.', 'success')
      returnValue = status
    } else {
      openToast(message?.message, 'error')
    }
    return returnValue
  }

  const mediaPersonalValidate = async (props: mediaPersonalParamsProps) => {
    let mediaNameErr = ''
    let emailErr = ''
    let websiteErr = ''
    let isProcess = true
    if (props.mediaName === '') {
      mediaNameErr = '매체명을 입력하세요.'
      isProcess = false
    } else {
      if (props.email !== '') {
        if (!EMAIL_PATTERN.test(props.email)) {
          emailErr = EMAIL_PATTERN_DESCRIPTION
          isProcess = false
        }
      }
      if (props.website !== '') {
        if (!URL_REGEXP.test(props.website)) {
          websiteErr = URL_REGEXP_DESCRIPTION
          isProcess = false
        }
      }
    }

    if (!isProcess) {
      const param = {
        ...props,
        mediaNameErr,
        emailErr,
        websiteErr,
      }
      dispatch(mediaPersonalParamsAction(param))
    }

    return isProcess
  }

  const deleteDuplicationMedia = async (props: duplicationMediaPopupProps) => {
    const { status, message } = await deleteMedia.mutateAsync(props.key)
    if (status === 'S') {
      openToast(message?.message, 'success')
      router.back()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const activityChangeTab = async (
    type: SelectListOptionItem,
    idKey: number,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[]
  ) => {
    dispatch(setMediaChangeActivityTabAction(type))
    dispatch(setChangeActivityTabAction(type))
    const paging = {
      page: 1,
      size: 8,
      totalCount: 0,
      totalPageCount: 0,
    }
    if (type.id === 'total') {
      await getTotalActicityList(
        'set',
        idKey.toString(),
        paging,
        tempCommonCodeCategory,
        tempCommonCodeState,
        tempCommonCodeStateFilter
      )
    } else {
      await getActicityList(
        'set',
        idKey.toString(),
        type.id,
        paging,
        tempCommonCodeCategory,
        tempCommonCodeState,
        tempCommonCodeStateFilter
      )
    }
  }

  const activityHandleKeywordChange = async (
    type: string,
    keywords: string,
    idKey: number,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[]
  ) => {
    const paging = {
      page: 1,
      size: 8,
      totalCount: 0,
      totalPageCount: 0,
    }
    if (type === 'total') {
      await getTotalActicityList(
        'set',
        idKey.toString(),
        paging,
        tempCommonCodeCategory,
        tempCommonCodeState,
        tempCommonCodeStateFilter,
        keywords
      )
    } else {
      await getActicityList(
        'set',
        idKey.toString(),
        type,
        paging,
        tempCommonCodeCategory,
        tempCommonCodeState,
        tempCommonCodeStateFilter,
        keywords
      )
    }
  }

  const activityHandlePaginationChange = async (
    type: string,
    e: number,
    idKey: number,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[]
  ) => {
    const paging = {
      page: e,
      size: 8,
      totalCount: 0,
      totalPageCount: 0,
    }
    if (type === 'total') {
      await getTotalActicityList(
        'set',
        idKey.toString(),
        paging,
        tempCommonCodeCategory,
        tempCommonCodeState,
        tempCommonCodeStateFilter
      )
    } else {
      await getActicityList(
        'set',
        idKey.toString(),
        type,
        paging,
        tempCommonCodeCategory,
        tempCommonCodeState,
        tempCommonCodeStateFilter
      )
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
        dispatch(profileImageIdAction(target))
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('등록할 사진을 선택해 주세요.', 'error')
      return
    }
  }

  const mediaGroupSubMediaPaginationChange = async (e: number, props: CountPageProps, idKey: string) => {
    const apiParam = {
      sort: ['name!asc'],
      groupList: [idKey],
      page: e,
      size: props.size,
      groupId: userSelectGroup,
    }
    const res = await getMediaList(apiParam)
    console.log('mediaGroupSubMediaPaginationChange')
    if (res) {
      const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / props.size)
      dispatch(
        mediaGroupSubMediaListAction({
          mediaData,
          pageCount: {
            totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
            page: e,
            size: props.size,
          },
        })
      )
    }
  }

  const moveMediaDetail = async (idKey: number) => {
    const res = setObjectToBase64({ key_id: 'media', media_id: idKey, journalist_id: 0 })
    await router.push(`/media/record?filter=${res}`)
  }

  const moveToTotalNewsList = async (
    props: ESearchMediaDocumentDto,
    keywords: keywordsProps,
    additionalParam: additionalParamProps
  ) => {
    const param = {
      ...additionalParam,
      mediaTagList: [
        {
          id: props.mid?.toString() ?? uuid(),
          label: `${props.name} - ${props.subtype}` ?? '',
          className: 'mediaIdList',
        },
      ],
    }
    console.log('param', { ...param })
    console.log('{ ...param, ...additionalParam, news_id: 0 }', { ...keywords, ...param, news_id: 0 })
    const res = setObjectToBase64({ ...keywords, ...param, news_id: 0 })
    await router.push(`/news/search-result?filter=${res}`)
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

  const mediaFilterOptionAction = async (keyOption: string, props: ESearchMediaDocumentDto) => {
    let isPass = false
    let temp: MbTagSearchTagItem[] = [
      {
        id: props.mid?.toString() ?? uuid(),
        label: props.subtype ? `${props.name} - ${props.subtype}` : props?.name || '',
        className: 'mediaId',
      },
    ]
    try {
      if (keyOption !== 'PRESS_RELEASE' && keyOption !== 'MAILING') {
        isPass = true
      } else {
        // @ts-ignore
        if (!props?.isSysInfo && props?.email && props?.email !== '') {
          isPass = true
        } else if (props?.isSysInfo && props?.contacts?.all?.beemail && props?.contacts?.all?.beemail !== '') {
          isPass = true
        }
      }
      if (isPass) {
        if (keyOption === 'PRESS_RELEASE') {
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
        } else if (keyOption === 'MAILING') {
          dispatch(
            tagetListOpenEmailPopupAction({
              name: userInfo.name,
              scrop: shareCodeData.distribute,
              tagPressList: temp,
              receiverGroup: 'media',
            })
          )
        } else if (keyOption === 'NEWSWIRE_RELEASE') {
          await router.push({
            pathname: '/newswire',
          })
        } else {
          let typeList: SelectListOptionItem[] = []
          for await (const eElement of actionCategoryList) {
            if (eElement.id !== 'NEWSWIRE_RELEASE' && eElement.id !== 'PRESS_RELEASE' && eElement.id !== 'MAILING') {
              typeList = [
                ...typeList,
                {
                  id: eElement.id,
                  name: eElement.name,
                },
              ]
            }
          }
          const stateList = actionStateFilterList.map(e => {
            return { id: e.id, name: e.name }
          })
          dispatch(
            initActivityPopupAction({
              keyValue: 0,
              isOpen: true,
              loading: false,
              type: typeList,
              state: stateList,
              typeValue: typeList.length > 0 ? typeList.find(e => e.id === keyOption) || typeList[0] : typeList[0],
              scrop: shareCodeData.action,
              targetDataList: temp,
              receiverGroup: 'media',
            })
          )
        }
      }
    } catch (e) {}
  }

  const init = async () => {
    let keyId = ''
    let tempMediaGroupMediaKey = ''
    let mediaId = 0
    let tempCommonCodeCategory: SelectListOptionItem[] = []
    let tempCommonCodeState: SelectListOptionItem[] = []
    let tempCommonCodeStateFilter: SelectListOptionItem[] = []
    let tempMediaIdParams: ESearchMediaDocumentDto | null = null
    let tempNewsDto: ESearchNewsCondDto = newsDto
    let mediaDto: ESearchMediaCondDto = {
      page: 1,
      size: 20,
      sort: ['values.combined!desc'],
      mediaIdList: [],
      groupId: userSelectGroup,
    }
    dispatch(initAction())
    try {
      console.log('router.query', router.query)
      if (
        window.location &&
        window.location.pathname &&
        window.location.pathname.split('/') &&
        window.location.pathname.split('/').length > 0
      ) {
        const queryId = window.location.pathname.split('/')[3]
        keyId = 'media'
        mediaId = Number(queryId)
        for await (const re of extendedCommonCodeTargetList) {
          if (re.id === 'ACTION_CATEGORY_ALL') {
            tempCommonCodeCategory = await getCommonCode(re.id)
          } else if (re.id === 'ACTION_STATE_FILTER') {
            tempCommonCodeStateFilter = await getCommonCode(re.id)
          } else if (re.id === 'PORTAL_CODE') {
            await getCommonCode(re.id)
          } else if (re.id === 'PUBLISHER_TYPE') {
            await getCommonCode(re.id)
          } else if (re.id === 'ACTION_STATE') {
            tempCommonCodeState = await getCommonCode(re.id)
          }
        }
        if (keyId === 'media') {
          mediaDto.mediaIdList = [mediaId]
          const res = await getMediaList(mediaDto)
          if (res) {
            const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
            if (mediaData.length > 0) {
              tempMediaIdParams = mediaData[0] ? mediaData[0] : null
              tempMediaGroupMediaKey = mediaData[0].group && mediaData[0].group !== '' ? mediaData[0].group : ''
              tempNewsDto = {
                timezone: timeZone,
                periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
                periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
                periodStartDay: moment().subtract({ year: 2 }).format('DD'),
                periodEndYear: moment().format('YYYY'),
                periodEndMonth: moment().format('MM'),
                periodEndDay: moment().format('DD'),
                page: 1,
                size: 15,
                sort: [`inserted!desc`, `newsid!desc`],
                groupId: userSelectGroup,
                mediaIdList: [mediaId],
              }
              if (mediaData && mediaData.length > 0 && mediaData[0].mid) {
                await mediaPersonalContactInfo(mediaData[0].mid)
                await mediaExcluded(mediaData[0].mid)
              }
              if (mediaData[0].isSysInfo) {
                if (mediaData[0].contacts?.all?.beemail && mediaData[0].contacts?.all?.beemail) {
                  await getBlockUserInfoData(mediaData[0].contacts?.all?.beemail)
                } else {
                  dispatch(isMediaUserBlockAction(defaultMediaUserBlockData))
                }
              } else {
                if (mediaData[0].email) {
                  await getBlockUserInfoData(mediaData[0].email.toString())
                } else {
                  dispatch(isMediaUserBlockAction(defaultMediaUserBlockData))
                }
                // @ts-ignore
                if (mediaData[0].owner?.uid && mediaData[0].owner?.uid === userInfo.userId && mediaData[0]) {
                  await mediaNameList(mediaData[0])
                }
              }
            } else {
              await router.replace('/404')
            }
          }
        }
      } else {
        await router.replace('/404')
      }
    } catch (e) {
      await router.replace('/404')
    }
    dispatch(
      setResultInitDataAction({
        listDefine: keyId,
        mediaId,
        tempMediaIdParams,
        dto: tempNewsDto,
        tempMediaGroupMediaKey,
      })
    )
    setActicityList(
      mediaId.toString(),
      activityDataListPaginationInfo,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter,
      tempMediaIdParams
    )
    if (tempMediaIdParams?.isSysInfo) {
      mediaHandlePaginationChange(1, mediaNewsCountPaginationInfo, mediaId)
      mediaGroupJournalistPaginationChange(1, mediaGroupJournalistCountPage, mediaId)
      mediaGroupSubMediaPaginationChange(1, mediaGroupSubMediaListCountPage, tempMediaGroupMediaKey)
    }
  }

  const setActicityList = async (
    e: string,
    pagination: CountPageProps,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[],
    idKeyParam: ESearchMediaDocumentDto | null
  ) => {
    const totalCount = await getTotalActicityList(
      'set',
      e,
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    const inquiryCount = await getActicityList(
      '',
      e,
      'INQUIRY',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    const phoneCallCount = await getActicityList(
      '',
      e,
      'PHONE_CALL',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    const noteCount = await getActicityList(
      '',
      e,
      'NOTE',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )

    const promiseCount = await getActicityList(
      '',
      e,
      'PROMISE',
      pagination,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter
    )
    let res: SelectListOptionItem[] = [
      {
        id: 'total',
        name: '전체',
        extra: totalCount.toString(),
      },
      {
        id: 'NOTE',
        name: '노트',
        extra: noteCount.toString(),
      },
      {
        id: 'PROMISE',
        name: '약속',
        extra: promiseCount.toString(),
      },
      {
        id: 'PHONE_CALL',
        name: '전화',
        extra: phoneCallCount.toString(),
      },
      {
        id: 'INQUIRY',
        name: '문의',
        extra: inquiryCount.toString(),
      },
    ]
    let totalList = false
    if (idKeyParam !== null) {
      // @ts-ignore
      if (!idKeyParam.isSysInfo && idKeyParam.email && idKeyParam?.email !== '') {
        totalList = true
      }
      if (idKeyParam.isSysInfo && idKeyParam.contacts?.all?.beemail && idKeyParam.contacts?.all?.beemail !== '') {
        totalList = true
      }

      if (totalList) {
        const releaseCount = await getActicityList(
          '',
          e,
          'PRESS_RELEASE',
          pagination,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
        const mailingCount = await getActicityList(
          '',
          e,
          'MAILING',
          pagination,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
        res = [
          {
            id: 'total',
            name: '전체',
            extra: totalCount.toString(),
          },
          {
            id: 'PRESS_RELEASE',
            name: '보도자료',
            extra: releaseCount.toString(),
          },
          {
            id: 'MAILING',
            name: '이메일',
            extra: mailingCount.toString(),
          },
          {
            id: 'NOTE',
            name: '노트',
            extra: noteCount.toString(),
          },
          {
            id: 'PROMISE',
            name: '약속',
            extra: promiseCount.toString(),
          },
          {
            id: 'PHONE_CALL',
            name: '전화',
            extra: phoneCallCount.toString(),
          },
          {
            id: 'INQUIRY',
            name: '문의',
            extra: inquiryCount.toString(),
          },
        ]
      }
    }
    dispatch(
      setMediaActivityTabAction({
        list: res,
        tab: res[0],
      })
    )
    dispatch(
      setActivityTabAction({
        list: res,
        tab: res[0],
      })
    )
  }

  const getTotalActicityList = async (
    type: string,
    e: string,
    pagination: CountPageProps,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[],
    keyword?: string
  ) => {
    let searchContentList: searchContentListProps[] = []
    let totalCount = 0
    let totalPageCount = 0
    try {
      const param: UseGetActionListParams = {
        title: keyword ? keyword : '',
        groupId: userSelectGroup,
        mediaIdList: [e],
        page: pagination.page,
        size: 8,
        sort: ['updateAt!desc'],
      }
      const res = await getActionList(param)
      if (res) {
        totalCount = res.totalElements ?? 0
        totalPageCount = res.totalPages ?? 0
        searchContentList = await initSearchContentList(
          res,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      }
    } catch (e) {}

    if (type === 'set') {
      dispatch(
        setActivityDataListAction({
          list: searchContentList,
          pagination: {
            totalCount,
            totalPageCount,
            page: pagination.page,
            size: 8,
          },
        })
      )
    }
    return totalCount
  }

  const getActicityList = async (
    type: string,
    e: string,
    filter: string,
    pagination: CountPageProps,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[],
    keyword?: string
  ) => {
    let searchContentList: searchContentListProps[] = []
    let totalCount = 0
    let totalPageCount = 0
    try {
      const param: UseGetActionListParams = {
        title: keyword ? keyword : '',
        groupId: userSelectGroup,
        mediaIdList: [e],
        categoryList: [filter],
        page: pagination.page,
        size: 8,
        sort: ['updateAt!desc'],
      }
      const res = await getActionList(param)
      if (res) {
        totalCount = res.totalElements ?? 0
        totalPageCount = res.totalPages ?? 0
        searchContentList = await initSearchContentList(
          res,
          tempCommonCodeCategory,
          tempCommonCodeState,
          tempCommonCodeStateFilter
        )
      }
    } catch (e) {}

    if (type === 'set') {
      dispatch(
        setActivityDataListAction({
          list: searchContentList,
          pagination: {
            totalCount,
            totalPageCount,
            page: pagination.page,
            size: 8,
          },
        })
      )
    }
    return totalCount
  }

  const getActionList = async (params: UseGetActionListParams) => {
    let res: PageActionDtoForList | null = null
    dispatch(activityLoadingAction(true))
    try {
      const { status, data, message } = await apiGetActionListByConfition(params)
      if (status === 'S') {
        res = data as PageActionDtoForList
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    dispatch(activityLoadingAction(false))

    return res
  }

  const initSearchContentList = async (
    res: PageActionDtoForList,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[]
  ) => {
    let searchContentList: searchContentListProps[] = []
    if (res.content && res.content.length > 0) {
      for await (const paramElement of res.content) {
        const temp = {
          ...paramElement,
          categoryName: '',
          stateName: '',
        }
        const findCategory = tempCommonCodeCategory.find(e => e.id === paramElement.category)
        if (findCategory) {
          temp.categoryName = findCategory.name
        }
        if (paramElement.category !== 'MAILING' && paramElement.category !== 'PRESS_RELEASE') {
          const findStateFilter = tempCommonCodeStateFilter.find(e => e.id === paramElement.state_filter)
          if (findStateFilter) {
            temp.stateName = findStateFilter.name
          }
        } else {
          const findState = tempCommonCodeState.find(e => e.id === paramElement.state)
          if (findState) {
            temp.stateName = findState.name
          }
        }
        searchContentList = [...searchContentList, temp]
      }
    }
    return searchContentList
  }

  const getMediaList = async (params: ESearchMediaCondDto) => {
    let res: ElasticSearchReturnDtoMediaDocumentDto | null = null
    try {
      const { status, message, data } = await mediaSearch.mutateAsync({
        ...params,
        // @ts-ignore
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

  const getJournalist = async (params: ESearchJournalistCondDto) => {
    let res: ElasticSearchReturnDtoJournalistDocumentDto | null = null
    try {
      const { status, message, data } = await journalistSearch.mutateAsync(params)
      if (status === 'S') {
        res = data as ElasticSearchReturnDtoJournalistDocumentDto
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}

    return res
  }

  const mediaProfileAction = async (type: string, params: ESearchMediaDocumentDto) => {
    if (type === 'share') {
      dispatch(
        sharedKeyAction({
          key: params.mid || 0,
          title: '미디어 공유 - ' + params?.name || '',
          editor: params?.name || '',
          type: 'MEDIA',
          sharedUrl:
            process.env.MY_ENV_VAR === 'production'
              ? SVC_DOMAIN_URL.PROD
              : SVC_DOMAIN_URL.DEV + '/media/record/' + params.mid?.toString(),
        })
      )
    } else if (type === 'delete') {
      dispatch(
        duplicationMediaPopupAction({
          isOpen: true,
          key: params?.mid || 0,
          targetName: params?.name || '',
        })
      )
    } else if (type === 'eidt') {
      console.log('params', params)
      const props = {
        isOpen: true,
        key: params?.mid || 0,
        mediaName: params?.name || '',
        mediaNameErr: '',
        email: params?.email || '',
        emailErr: '',
        website: params?.website?.url || '',
        websiteErr: '',
        landline: params?.contacts?.main?.phone?.[0] || '',
        mobile: params?.contacts?.main?.fax?.toString() || '',
        fields: params?.coverage?.category?.toString() || '',
        address: params?.contacts?.main?.address || '',
        subAddressNm: '',
        mediaBookLists: [],
      }
      // @ts-ignore
      dispatch(mediaPersonalParamsAction(props))
    }
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
                size: getSize(file.size, 'mb'),
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

  const getSize = (size: number, unit: string = 'kb') => {
    let calcuratedSize = 0
    if (unit === 'kb') {
      calcuratedSize = size / 1024
    } else if (unit === 'mb') {
      calcuratedSize = size / 1024 / 1024
    }
    return Number(calcuratedSize.toFixed(2))
  }

  const setBlockedEmailSenderPopupAction = useCallback(
    (props: blockedEmailSenderPopupProps) => {
      dispatch(blockedEmailSenderPopupAction(props))
    },
    [blockedEmailSenderPopup]
  )

  const setRegisterJournalPhotoPopupAction = useCallback(
    (hooks: registerJournalPhotoPopupProps) => dispatch(registerJournalPhotoPopupAction(hooks)),
    [registerJournalPhotoPopup]
  )

  const setSearchRegisterPopupNameAction = useCallback(
    async (e: string, props: searchRegisterListPopupProps) => {
      const param = {
        ...props,
        name: e,
        nameErr: '',
      }
      dispatch(searchRegisterListPopupAction(param))
    },
    [searchRegisterListPopup.name]
  )

  const mediaSearchRegisterListCheckStatusChange = useCallback(
    async (e: boolean, item: mediaContentListProps, props: searchRegisterListPopupProps) => {
      const res = e
        ? [...props.searchRegistIdList, Number(item.mediaListId)]
        : props.searchRegistIdList.filter(e => e !== Number(item.mediaListId))
      dispatch(
        searchRegisterListPopupAction({
          ...props,
          isActive: calculateChangeValueCheck(res, props.origin),
          searchRegistIdList: res,
        })
      )
    },
    [searchRegisterListPopup.searchRegistIdList]
  )

  const pressSearchRegisterListCheckStatusChange = useCallback(
    async (e: boolean, item: mediaContentListProps, props: searchRegisterListPopupProps) => {
      let param = { ...props }
      param.searchRegistIdList = e
        ? [...param.searchRegistIdList, Number(item.jrnlstListId)]
        : param.searchRegistIdList.filter(e => e !== Number(item.jrnlstListId))
      dispatch(searchRegisterListPopupAction(param))
    },
    [searchRegisterListPopup.searchRegistIdList]
  )

  const setMediaSearchRegistPopupAction = useCallback(
    async (e: boolean, idList: ESearchMediaDocumentDto[]) => {
      let list: number[] = []
      if (idList && idList.length > 0) {
        for await (const idListProp of idList) {
          // @ts-ignore
          if (idListProp.mediaListList && idListProp.mediaListList.length > 0) {
            // @ts-ignore
            for await (const mediaListListProp of idListProp.mediaListList) {
              list = [...list, Number(mediaListListProp.id)]
            }
          }
        }
      }
      dispatch(
        initSearchRegisterListPopupAction({
          isOpen: e,
          kind: 'media',
          type: 'add',
          list: [],
          origin: [],
          except: list,
          mediaIdList: idList,
          journalIdList: [],
        })
      )
    },
    [searchRegisterListPopup]
  )

  const setPressListData = useCallback(
    async (items: searchRegisterListPopupProps) => {
      let journalIdItem: number[] = []
      let deleteItem: number[] = []
      if (items.journalIdList.length > 0) {
        for await (const e of items.journalIdList) {
          console.log('e.jrnlst_id', e)
          if (e.jrnlst_id) {
            journalIdItem = [...journalIdItem, Number(e.jrnlst_id)]
          }
        }
        console.log('e.journalIdItem', journalIdItem)
        if (items.type === 'any') {
          if (items.origin.length > 0) {
            for await (const number of items.origin) {
              const find = items.searchRegistIdList.find(e => e.toString() === number.toString())
              if (!find) {
                deleteItem = [...deleteItem, Number(number)]
              }
            }
            if (deleteItem.length > 0) {
              const { status, message } = await journalistGroupDeleteJournalist.mutateAsync({
                jrnlstListIdList: deleteItem,
                // @ts-ignore
                journalistIdList: journalIdItem,
              })
              if (status === 'S') {
                if (items.searchRegistIdList.length > 0) {
                  const { status: res, message } = await journalistGroupAddJournalist.mutateAsync({
                    jrnlstListIdList: items.searchRegistIdList,
                    journalistIdList: journalIdItem,
                  })
                  if (res === 'S') {
                    openToast('언론인 목록에 추가 및 삭제 되었습니다.', 'success')
                    await init()
                  }
                } else {
                  openToast('언론인 목록에서 삭제 되었습니다.', 'success')
                  await init()
                }
              }
            } else {
              if (items.searchRegistIdList.length > 0) {
                const { status, message } = await journalistGroupAddJournalist.mutateAsync({
                  jrnlstListIdList: items.searchRegistIdList,
                  journalistIdList: journalIdItem,
                })
                if (status === 'S') {
                  openToast('언론인 목록에 추가 되었습니다.', 'success')
                  await init()
                }
              } else {
                dispatch(
                  initSearchRegisterListPopupAction({
                    isOpen: false,
                    kind: 'media',
                    type: 'add',
                    list: [],
                    origin: [],
                    except: [],
                    mediaIdList: [],
                    journalIdList: [],
                  })
                )
              }
            }
          } else {
            if (items.searchRegistIdList.length > 0) {
              const { status, message } = await journalistGroupAddJournalist.mutateAsync({
                jrnlstListIdList: items.searchRegistIdList,
                journalistIdList: journalIdItem,
              })
              if (status === 'S') {
                openToast('언론인 목록에 추가 되었습니다.', 'success')
                await init()
              }
            } else {
              openToast('추가할 언론인 목록을 선택해주세요', 'error')
            }
          }
        } else {
          if (items.searchRegistIdList.length > 0) {
            console.log(
              '{\n' +
                '              jrnlstListIdList: items.searchRegistIdList,\n' +
                '              journalistIdList: journalIdItem,\n' +
                '            }',
              {
                jrnlstListIdList: items.searchRegistIdList,
                journalistIdList: journalIdItem,
              }
            )
            const { status, message } = await journalistGroupAddJournalist.mutateAsync({
              jrnlstListIdList: items.searchRegistIdList,
              journalistIdList: journalIdItem,
            })
            if (status === 'S') {
              openToast('언론인 목록에 담았습니다.', 'success')
              await init()
            }
          } else {
            openToast('추가할 언론인 목록을 선택해주세요', 'error')
          }
        }
      } else {
        openToast('잘못된 접근입니다.', 'error')
      }
    },
    [searchRegisterListPopup]
  )

  const setAddPersonalContactAction = useCallback(
    (hooks: addPersonalContactProps) => dispatch(addPersonalContactAction(hooks)),
    [addPersonalContactPopup]
  )

  const setProfileImageIdActionAction = useCallback(
    () => dispatch(profileImageIdAction(0)),
    [registerMediaPhotoPopup, profileImageId]
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

  const setMediaGroupTabActionAction = useCallback(
    (e: string) => {
      dispatch(mediaGroupTabAction(e))
    },
    [mediaGroupTab]
  )

  const setRegisterMediaPhotoPopupAction = useCallback(
    (hooks: registerMediaPhotoPopupProps) => dispatch(registerMediaPhotoPopupAction(hooks)),
    [registerMediaPhotoPopup]
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

  const setPressMediaErrPopupAction = useCallback(
    (props: pressMediaErrPopupProps) => {
      dispatch(pressMediaErrPopupAction(props))
    },
    [pressMediaErrPopup]
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

  const setPressMediaUnBlockPopupAction = useCallback(
    (props: pressMediaUnBlockPopupProps) => {
      dispatch(pressMediaUnBlockPopupAction(props))
    },
    [pressMediaUnBlockPopup]
  )

  const setDuplicationMediaPopupAction = useCallback(
    (props: duplicationMediaPopupProps) => {
      dispatch(duplicationMediaPopupAction(props))
    },
    [duplicationMediaPopup]
  )
  const addressPopupHandle = useCallback((param: boolean) => dispatch(addressPopupAction(param)), [addressPopup])

  const setActivityParamKeywordAction = useCallback(
    (e: string) => dispatch(activityParamKeywordAction(e)),
    [activityParamKeyword]
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

  const closeMediaPersonalPopupAction = useCallback(() => {
    const params = {
      isOpen: false,
      key: 0,
      mediaName: '',
      mediaNameErr: '',
      email: '',
      emailErr: '',
      websiteErr: '',
      website: '',
      landline: '',
      mobile: '',
      fields: '',
      address: '',
      subAddressNm: '',
      mediaBookLists: [],
    }
    dispatch(mediaPersonalParamsAction(params))
  }, [mediaPersonalParamsPopup])

  const mediaPersonalSubAddressNmAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        //subAddressNm: e,
        address: e,
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParamsPopup.address]
  )

  const mediaPersonalFieldsAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        fields: e,
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParamsPopup.fields]
  )

  const mediaPersonalMobileAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        mobile: e,
      }
      console.log('e', e)
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParamsPopup.mobile]
  )

  const mediaPersonalLandlineAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        landline: e,
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParamsPopup.landline]
  )

  const mediaPersonalEmailAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        email: e,
        emailErr: '',
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParamsPopup.email]
  )

  const mediaPersonalNameAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        website: e,
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParamsPopup.website]
  )

  const mediaPersonalMediaNameAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        mediaName: e,
        mediaNameErr: '',
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParamsPopup.mediaName]
  )

  const setNoticeClose = useCallback(
    (id: number) => {
      dispatch(mediaDuplicationIdListSaga([...mediaDuplicationIdList, id]))
    },
    [mediaCheckDuplicateParam]
  )

  const setOnePressSearchRegistPopupAction = useCallback(
    async (e: boolean, idList: ESearchJournalistDocumentDto) => {
      let list: number[] = []
      if (idList && idList.journalistGroupList && idList.journalistGroupList.length > 0) {
        for await (const journalistGroupListProp of idList.journalistGroupList) {
          list = [...list, Number(journalistGroupListProp.id)]
        }
      }
      console.log('')
      dispatch(
        initSearchRegisterListPopupAction({
          isOpen: e,
          kind: 'press',
          type: 'any',
          origin: list,
          list: list,
          except: [],
          mediaIdList: [],
          journalIdList: [idList],
        })
      )
    },
    [searchRegisterListPopup]
  )

  useEffect(() => {
    if (!mediaCustomSearchListData) return
    const { status, data, message } = mediaCustomSearchListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageableDataDto<JournalistMediaGroupItem>
      initMediaRegistList(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [mediaCustomSearchListData])

  useEffect(() => {
    if (!journalistCustomSearchListData) return
    const { status, data, message } = journalistCustomSearchListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as PageableDataDto<JournalistMediaGroupItem>
      initPressRegistList(res)
    } else {
      openToast(message?.message, 'error')
    }
  }, [journalistCustomSearchListData])

  useEffect(() => {
    if (!apiGetOneUser) return
    const { status, data: apiData, message } = apiGetOneUser as BaseResponseCommonObject
    if (status === 'S') {
      const res = apiData as UserDto
      dispatch(
        userPopupAction({
          isOpen: true,
          email: res?.email || '',
          displayName: res?.displayName || '-',
          phone: res?.phone || '',
          mobile: res?.mobile || '',
          role: res?.role === 'ADMIN' ? '관리자' : '사용자',
          keyValue: Number(res.userId),
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }, [apiGetOneUser])

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    shareCodeData,
    blockedEmailSenderPopup,
    registerJournalPhotoPopup,
    searchRegisterListPopup,
    searchRegisterList,
    pressMediaUnBlockPopup,
    addPersonalContactPopup,
    listDefine,
    mediaIdKey,
    pressMediaErrPopup,
    newsLoading,
    actionCategoryList,
    mediaIdKeyParam,
    mediaNewsCountPage,
    mediaNewsCountPaginationInfo,
    newsListByMediaId,
    mediaEmailBlocking,
    mediaContactInfo,
    isMediaUserBlock,
    filterPortalCode,
    registerMediaPhotoPopup,
    mediaGroupMediaKey,
    mediaGroupJournalist,
    mediaGroupSubMediaList,
    mediaGroupTab,
    mediaGroupSubMediaListCountPage,
    mediaGroupJournalistCountPage,
    activityDataListPaginationInfo,
    activityLoading,
    activityTabList,
    activityTab,
    activityDataList,
    commonCodeState,
    actionStateFilterList,
    duplicationMediaPopup,
    mediaCheckDuplicateParam,
    mediaPersonalParamsPopup,
    addressPopup,
    userPopup,
    userMediaListAutoSaveData,
    publisherTypeList,
    timeZone,
    activityParamKeyword,
    isDemoLicense,
    profileImageId,

    init,
    mediaProfileAction,
    journalistUnBlockedAction,
    mediaUnBlockedAction,
    journalistBlockedAction,
    mediaBlockedAction,
    journalistPhotoDeleteAdjust,
    journalistPhotoPopupAdjust,
    pressMediaUnBlockAction,
    createPersonalContact,
    deletePersonalContact,
    createMediaPersonalContact,
    pressMediaErrAction,
    pressHandlePaginationChange,
    mediaHandlePaginationChange,
    mediaFilterOptionAction,
    mediaPhotoDeleteAdjust,
    mediaProfileOptionAction,
    moveToTotalNewsList,
    moveToTotalJournalList,
    moveMediaDetail,
    mediaGroupJournalistPaginationChange,
    mediaGroupSubMediaPaginationChange,
    medialistPhotoPopupAdjust,
    activityHandlePaginationChange,
    activityHandleKeywordChange,
    activityChangeTab,
    deleteDuplicationMedia,
    mediaPersonalValidate,
    mediaPersonalEdit,
    pressPersonalAddressNmAction,
    ownerFunction,
    userContactValidation,
    setOneMediaSearchRegistPopupAction,
    checkAutoRegisterMediaRegist,
    createRegisterMediaListAction,
    onChangeMediaPhotoFiles,
    afterMediaRegistAddReLoad,

    setBlockedEmailSenderPopupAction,
    setRegisterJournalPhotoPopupAction,
    setOnePressSearchRegistPopupAction,
    pressSearchRegisterListCheckStatusChange,
    mediaSearchRegisterListCheckStatusChange,
    setMediaSearchRegistPopupAction,
    setSearchRegisterPopupNameAction,
    setPressListData,
    setPressMediaUnBlockPopupAction,
    setPressMediaUnBlockTitleAction,
    setPressMediaUnBlockContentAction,
    setAddPersonalContactAction,
    setProfileImageIdActionAction,
    setaddPersonalContactEmail,
    setaddPersonalContactPhone,
    setaddPersonalContactTelephone,
    setaddPersonalContactAddress,
    setPressMediaErrPopupAction,
    setaddPersonalContactWebsite,
    setaddPersonalContactFax,
    setPressMediaErrTitleAction,
    setPressMediaErrContentAction,
    setRegisterMediaPhotoPopupAction,
    setMediaGroupTabActionAction,
    setDuplicationMediaPopupAction,
    setNoticeClose,
    mediaPersonalMediaNameAction,
    mediaPersonalNameAction,
    mediaPersonalEmailAction,
    mediaPersonalLandlineAction,
    mediaPersonalMobileAction,
    mediaPersonalFieldsAction,
    mediaPersonalSubAddressNmAction,
    addressPopupHandle,
    closeMediaPersonalPopupAction,
    setUserProfilePopupAction,
    setActivityParamKeywordAction,
  }
}
