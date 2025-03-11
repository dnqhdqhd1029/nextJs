import { ChangeEvent, useCallback, useEffect } from 'react'
import { Address } from 'react-daum-postcode'
import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { PressAddRegisterContext } from '~/components/contents/common/forms/PressMediaListBookPopup/PressMediaAutoRegisterContext'
import {
  defaultPressUserBlockData,
  extendedCommonCodeTargetList,
} from '~/components/contents/pressMedia/PressProfile/defaultData'
import { PressAutoRegisterContext } from '~/components/contents/pressMedia/PressProfile/Popup/AutoRegisterContext'
import { disclosureScopeFilterOptionList } from '~/components/contents/pressMedia/SearchResult/defaultData'
import { ALLOWED_ORIGINS, EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION, SVC_DOMAIN_URL } from '~/constants/common'
import { initActivityPopupAction } from '~/stores/modules/contents/activity/activityPopup'
import { tagetListOpenEmailPopupAction } from '~/stores/modules/contents/email/email'
import {
  pressDuplicationIdListSaga,
  pressReleaseDataExtraAction,
  userAutoSaveDataProps,
  userPressListAutoSaveDataAction,
} from '~/stores/modules/contents/extraData/extra'
import { additionalParamProps, keywordsProps } from '~/stores/modules/contents/monitoring/newsSearch'
import { isMediaUserBlockProps } from '~/stores/modules/contents/pressMedia/mediaProfile'
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
import {
  actionCategoryListAction,
  actionStateFilterAction,
  activityLoadingAction,
  activityParamKeywordAction,
  addPersonalContactAction,
  addressPopupAction,
  blockedEmailSenderPopupAction,
  commonCodeStateAction,
  dataOnChangeActionProps,
  dataOnChangeActionTypeProps,
  duplicationJournalPopupPropsProps,
  filterPortalCodeAction,
  initAction,
  initPressPersonalParamsActionAction,
  isJournalUserBlockAction,
  isMediaUserBlockAction,
  isUserBlockProps,
  journalCheckDuplicateParamAction,
  journalContactInfoAction,
  journalDecodeListProps,
  journalEmailBlockingAction,
  journalGroupMediaParamAction,
  journalIdKeyParamAction,
  journalistTagTypeListAction,
  journalNewsCountPaginationInfoProps,
  jrnlstSocialUserAddListAction,
  newsListByPressMediaIdAction,
  newsListParamKeywordAction,
  newsLoadingAction,
  openDuplicationJournalAction,
  PaginationInfoProps,
  pressMediaErrPopupAction,
  pressMediaUnBlockPopupAction,
  pressPersonalParamsAction,
  pressPersonalParamsProps,
  pressSocialListAction,
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
  setResultInitDataAction,
  userPopupAction,
  wordCloudTagTypeAction,
  wordCloudTagTypeListAction,
  wordCloudTagTypeListProps,
} from '~/stores/modules/contents/pressMedia/pressProfile'
import { pressSocialListProps } from '~/stores/modules/contents/pressMedia/registerPressMedia'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import {
  BaseResponseCommonObject,
  ContactUserAddedDto,
  ElasticSearchReturnDtoJournalistDocumentDto,
  ElasticSearchReturnDtoMediaDocumentDto,
  type ElasticSearchReturnDtoNewsDocumentDto,
  type ESearchJournalistCondDto,
  ESearchNewsCondDto,
  JournalistAutoCompleteDto,
  PageActionDtoForList,
  type SocialDto,
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
import { apiGetJournalistContact } from '~/utils/api/contact/journalist/useGetJournalistContact'
import { usePostJournalistContactCreateUpdate } from '~/utils/api/contact/journalist/usePostJournalistContactCreateUpdate'
import { usePostMediaContactCreateUpdate } from '~/utils/api/contact/media/usePostMediaContactCreateUpdate'
import { useDeleteContactInfo } from '~/utils/api/contact/useDeleteContactInfo'
import { useDeleteJournalistExcluded } from '~/utils/api/email/journalist/useDeleteJournalistExcluded'
import { apiGetJournalistExcluded } from '~/utils/api/email/journalist/useGetJournalistExcluded'
import { usePostJournalistExcluded } from '~/utils/api/email/journalist/usePostJournalistExcluded'
import { usePostMediaExcluded } from '~/utils/api/email/media/usePostMediaExcluded'
import { apiPostMediapassDecode } from '~/utils/api/encrypt/usePostMediapassDecode'
import { useGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import {
  usePostJournalistGroupAddJournalId,
  usePostJournalistGroupAddJournalIdAuto,
} from '~/utils/api/groupList/journalist/usePostJournalistGroupAddJournalist'
import { usePostJournalistCreate } from '~/utils/api/groupList/journalist/usePostJournalistGroupCreate'
import { usePostJournalistGroupDeleteJournal } from '~/utils/api/groupList/journalist/usePostJournalistGroupDeleteJournalist'
import { useGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { usePostMediaGroupAddMedia } from '~/utils/api/groupList/media/usePostMediaGroupAddMedia'
import { usePostMediaGroupDeleteMedia } from '~/utils/api/groupList/media/usePostMediaGroupDeleteMedia'
import { apiGetJournalistNameAutoComplete } from '~/utils/api/journalist/useGetJournalistNameAutoComplete'
import { apiGetJournalistTagTypeList } from '~/utils/api/journalist/useGetJournalistTagTypeList'
import { usePostJournalistSearch } from '~/utils/api/journalist/usePostJournalistSearch'
import { useGetMediaElastickSearchQuery } from '~/utils/api/media/usePostMediaSearch'
import { usePostNewsSearch } from '~/utils/api/news/usePostNewsSearch'
import { useGetOneUserOption } from '~/utils/api/user/useGetOneUser'
import { useDeleteJournalist } from '~/utils/api/userCustom/journalist/useDeleteJournalist'
import { usePutJournalist, UsePutJournalistParams } from '~/utils/api/userCustom/journalist/usePutJournalist'
import { usePutJournalistPhoto } from '~/utils/api/userCustom/journalist/usePutJournalistImage'
import { usePutJournalistImageDelete } from '~/utils/api/userCustom/journalist/usePutJournalistImageDelete'
import { usePutMediaLogoDelete } from '~/utils/api/userCustom/media/usePutMediaLogoDelete'
import { setObjectToBase64 } from '~/utils/common/object'
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

export const usePressProfile = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    profileImageId,
    journalIdKey,
    journalIdKeyParam,
    journalContactInfo,
    journalEmailBlocking,
    journalDecodeList,
    journalNewsCountPage,
    isJournalUserBlock,
    activityParamKeyword,
    newsListParamKeyword,
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
    newsListByJournalId,
    journalNewsCountPaginationInfo,
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
    registerMediaPhotoPopup,
    journalGroupMediaKey,
    journalGroupMediaParam,
    activityTabList,
    activityTab,
    activityDataList,
    commonCodeState,
    activityLoading,
    activityDataListPaginationInfo,
    journalistTagTypeList,
    wordCloudTagTypeList,
    wordCloudTagType,
    journalCheckDuplicateParam,
    duplicationJournalPopup,
    pressPersonalParamsPopup,
    pressSocialList,
    jrnlstSocialUserAddList,
    addressPopup,
    journalContactBlockedInfo,
    userPopup,
    publisherTypeList,
  } = useAppSelector(state => state.pressProfileSlice)
  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone } = useAppSelector(
    state => state.authSlice
  )
  const { pressDuplicationIdList, userPressListAutoSaveData } = useAppSelector(state => state.extraSlice)

  const getNewsSearchResult = usePostNewsSearch()
  const journalistSearch = usePostJournalistSearch()
  const saveJournalistPhoto = usePutJournalistPhoto()
  const deleteJournalistPhoto = usePutJournalistImageDelete()
  const deleteMediaPhoto = usePutMediaLogoDelete()
  const editUserJournalist = usePutJournalist()
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
  const journalistGroupAddJournalistAuto = usePostJournalistGroupAddJournalIdAuto()
  const journalistGroupDeleteJournalist = usePostJournalistGroupDeleteJournal()
  const mediaGroupAddMedia = usePostMediaGroupAddMedia()
  const mediaGroupDeleteMedia = usePostMediaGroupDeleteMedia()
  const apiDeleteMediaExcluded = usePostMediaExcluded()
  const deleteJournalist = useDeleteJournalist()
  const createJournalistGroup = usePostJournalistCreate()

  const { data: apiGetOneUser } = useGetOneUserOption(userPopup.keyValue > 0 ? userPopup.keyValue : 0)

  const { data: mediaElastickSearchData } = useGetMediaElastickSearchQuery(
    {
      page: 1,
      size: 20,
      sort: ['values.combined!desc'],
      mediaIdList: [journalGroupMediaKey],
      groupId: userSelectGroup,
    },
    {
      enabled:
        journalIdKeyParam && journalIdKeyParam.isSysInfo
          ? journalGroupMediaKey > 0 &&
            journalGroupMediaParam === null &&
            router.pathname.startsWith('/contacts/record')
          : false,
    }
  )

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
        router.pathname.startsWith('/contacts/record'),
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
        router.pathname.startsWith('/contacts/record'),
    }
  )

  const createPersonalContact = async (props: addPersonalContactProps, idKey: number) => {
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

  const dataOnChangeAction = async (type: dataOnChangeActionTypeProps, props: dataOnChangeActionProps) => {
    if (type.personalContacts === 'change' && props.personalContacts) {
      await journalistPersonalContactInfo(props.personalContacts)
    }
    if (type.emailBlock === 'change' && props.emailBlock) {
      await journalistExcluded(props.emailBlock)
    }
    if (type.isJournalUserBlock === 'change' && props.isJournalUserBlock) {
      await getBlockUserInfoData(props.isJournalUserBlock)
    }
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
    } else if (type === 'corverage') {
      await getActicityNewsList('set', idKey, type, paging, keywords)
    } else if (type === 'clipbook') {
      await getActicityNewsList('set', idKey, type, paging, keywords)
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
    } else if (type === 'corverage') {
      await getActicityNewsList('set', idKey, type, paging)
    } else if (type === 'clipbook') {
      await getActicityNewsList('set', idKey, type, paging)
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
    dispatch(journalCheckDuplicateParamAction(duplicationData))
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

  const pressPersonalAddressNmAction = async (e: Address, props: pressPersonalParamsProps) => {
    const { userSelectedType, address, roadAddress, jibunAddress } = e
    const params = {
      ...props,
      address: userSelectedType === 'R' ? roadAddress : userSelectedType === 'J' ? jibunAddress : address,
    }
    dispatch(pressPersonalParamsAction(params))
  }

  const pressSocialListDeleteAction = async (key: pressSocialListProps, props: pressSocialListProps[]) => {
    let res = [...props]
    res = res.filter(e => e.keyId !== key.keyId)
    dispatch(pressSocialListAction(res))
  }

  const pressPersonalEdit = async (props: pressPersonalParamsProps, list: pressSocialListProps[]) => {
    let returnValue = ''
    let param: UsePutJournalistParams = {
      id: props.key,
      info: {
        name: props.name,
        mediaName: props.mediaName,
        email: props.email,
        department: props.department,
        position: props.position,
        landline: props.landline,
        mobile: props.mobile,
        fields: props.fields,
        address: props.address + props.subAddressNm,
        career: props.career,
        education: props.education,
        writings: props.writings,
        awards: props.awards,
        socials: [],
      },
    }
    if (list.length > 0) {
      let tempList: SocialDto[] = []
      for await (const i of list) {
        tempList = [
          ...tempList,
          {
            socialTypeId: i.socialTypeId,
            link: i.link,
          },
        ]
      }
      param.info.socials = tempList
    }
    const { status, data, message } = await editUserJournalist.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      returnValue = status
    } else {
      openToast(message?.message, 'error')
    }
    return returnValue
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

  const createRegisterPressListAction = async (origins: searchRegisterListPopupProps) => {
    const { status, data, message } = await createJournalistGroup.mutateAsync({
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
      await refetchJournalistCustomSearch()
    } else {
      openToast(message?.message, 'error')
    }
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
    dispatch(userPressListAutoSaveDataAction(autoCompleteData))
    if (type !== '') {
      openToast(
        PressAutoRegisterContext({
          valueName: autoPressRegistId.name,
          onChangeAction: () => {
            setOnePressSearchRegistPopupAction(
              true,
              eSearchJournalist ? eSearchJournalist[0] : null,
              autoPressRegistId.key
            )
          },
        }),
        'success'
      )
    }
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

  const checkAutoRegisterPressRegist = async (
    e: boolean,
    idList: ESearchJournalistDocumentDto,
    userPressRegistList: userAutoSaveDataProps[]
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
      await afterPressRegistAdd(idList, autoKey)
    }
  }

  const afterPressRegistAdd = async (originParam: ESearchJournalistDocumentDto, keyId: userAutoSaveDataProps) => {
    let pressParam = originParam
    pressParam = {
      ...pressParam,
      // @ts-ignore
      journalistGroupList:
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
    dispatch(journalIdKeyParamAction(pressParam))
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

  const userContactValidation = async (props: addPersonalContactProps) => {
    let isProcess = false
    let emailErr = ''
    let websiteErr = ''

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

  const pressPersonalValidate = async (props: pressPersonalParamsProps, list: pressSocialListProps[]) => {
    let nameErr = ''
    let mediaNameErr = ''
    let emailErr = ''
    let isProcess = false
    if (props.name === '') {
      nameErr = '이름을 입력하세요.'
    } else if (props.mediaName === '') {
      mediaNameErr = '매체명을 입력하세요.'
    } else if (props.email === '') {
      emailErr = '이메일을 입력하세요.'
    } else if (!EMAIL_PATTERN.test(props.email)) {
      emailErr = EMAIL_PATTERN_DESCRIPTION
    } else {
      if (list.length > 0) {
        let count = 0
        let listParam: pressSocialListProps[] = []
        for await (const emailErrElement of list) {
          let linkErr = ''
          let socialErr = ''
          if (emailErrElement.link === '') {
            linkErr = '내용을 입력하세요.'
            count += 1
          }
          if (emailErrElement.socialTypeId === 0) {
            socialErr = '종류를 선택하세요.'
            count += 1
          }
          listParam = [
            ...listParam,
            {
              ...emailErrElement,
              linkErr,
              socialErr,
            },
          ]
        }
        if (count > 0) {
          dispatch(pressSocialListAction(listParam))
        } else {
          isProcess = true
        }
      } else {
        isProcess = true
      }
    }

    if (!isProcess) {
      const param = {
        ...props,
        nameErr,
        mediaNameErr,
        emailErr,
      }
      dispatch(pressPersonalParamsAction(param))
    }

    return isProcess
  }

  const deleteDuplicationJournal = async (props: duplicationJournalPopupPropsProps) => {
    const { status, message } = await deleteJournalist.mutateAsync(props.key)
    if (status === 'S') {
      openToast('개인 추가 언론인을 삭제했습니다.', 'success')
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
    } else if (type.id === 'corverage') {
      await getActicityNewsList('set', idKey, type.id, paging)
    } else if (type.id === 'clipbook') {
      await getActicityNewsList('set', idKey, type.id, paging)
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

  const setActicityList = async (
    e: string,
    pagination: PaginationInfoProps,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[],
    isSystem?: boolean
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
    if (isSystem) {
      const corverageCount = await getActicityNewsList('', Number(e), 'corverage', pagination)
      const clipbookCount = await getActicityNewsList('', Number(e), 'clipbook', pagination)
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
        {
          id: 'corverage',
          name: '커버리지',
          extra: corverageCount.toString(),
        },
        {
          id: 'clipbook',
          name: '클립북',
          extra: clipbookCount.toString(),
        },
      ]
    }
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
    pagination: PaginationInfoProps,
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
        journalistIdList: [e],
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
    pagination: PaginationInfoProps,
    tempCommonCodeCategory: SelectListOptionItem[],
    tempCommonCodeState: SelectListOptionItem[],
    tempCommonCodeStateFilter: SelectListOptionItem[],
    keywords?: string
  ) => {
    let searchContentList: searchContentListProps[] = []
    let totalCount = 0
    let totalPageCount = 0
    try {
      const param: UseGetActionListParams = {
        title: keywords ? keywords : '',
        groupId: userSelectGroup,
        journalistIdList: [e],
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

  const getActicityNewsList = async (
    type: string,
    e: number,
    filter: string,
    pagination: PaginationInfoProps,
    keywords?: string
  ) => {
    let searchContentList: MonitoringSearchNewsDocumentDto[] = []
    let totalCount = 0
    let totalPageCount = 0
    let dto: ESearchNewsCondDto = {
      filter: keywords ? keywords : '',
      timezone: timeZone,
      periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
      periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
      periodStartDay: moment().subtract({ year: 2 }).format('DD'),
      periodEndYear: moment().format('YYYY'),
      periodEndMonth: moment().format('MM'),
      periodEndDay: moment().format('DD'),
      page: pagination.page,
      size: 8,
      sort: ['_score!desc'],
      groupId: userSelectGroup,
      journalistIdList: [e],
    }
    try {
      if (filter === 'clipbook') {
        dto.clipbook = 'Y'
      } else {
        dto.coverageYn = 'Y'
      }
      dispatch(activityLoadingAction(true))
      const { status, message, data } = await getNewsSearchResult.mutateAsync({ ...dto, groupId: userSelectGroup })
      if (status === 'S') {
        const res = data as ElasticSearchReturnDtoNewsDocumentDto
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / 8)
        totalCount = newsData.length > 0 ? totalSize ?? 0 : 0
        totalPageCount = newsData.length > 0 ? totalPage ?? 0 : 0
        searchContentList = newsData
      } else {
        openToast(message?.message, 'error')
      }
      dispatch(activityLoadingAction(false))
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

  const pressHandleKeywordChange = async (
    keyword: string,
    props: journalNewsCountPaginationInfoProps,
    keyId: number
  ) => {
    const dto = {
      filter: keyword ? keyword : '',
      timezone: timeZone,
      periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
      periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
      periodStartDay: moment().subtract({ year: 2 }).format('DD'),
      periodEndYear: moment().format('YYYY'),
      periodEndMonth: moment().format('MM'),
      periodEndDay: moment().format('DD'),
      page: 1,
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
            page: 1,
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
        journalistId: props.key,
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

  const deletePersonalContact = async (idKey: string) => {
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
  }

  const pressMediaUnBlockAction = async (
    props: pressMediaUnBlockPopupProps,
    tempJournalDecodeList: journalDecodeListProps
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
        await dataOnChangeAction(
          { isJournalUserBlock: 'change' },
          { isJournalUserBlock: tempJournalDecodeList.beemail }
        )
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

  const journalistPhotoPopupAdjust = async (props: registerJournalPhotoPopupProps, target: number) => {
    if (props.filesList.length > 0) {
      const { status, message } = await saveJournalistPhoto.mutateAsync({
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

  const journalistPhotoDeleteAdjust = async (target: number) => {
    const { status, message } = await deleteJournalistPhoto.mutateAsync(target)
    if (status === 'S') {
      openToast('사진이 삭제되었습니다.', 'success')
      dispatch(profileImageIdAction(target))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const journalistBlockedAction = async (props: blockedEmailSenderPopupProps, idKey: number) => {
    const { status, message } = await apiDeleteJournalistIncluded.mutateAsync({
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
  const journalistUnBlockedAction = async (props: blockedEmailSenderPopupProps, idKey: number) => {
    const { status, message } = await apiDeleteJournalistExcluded.mutateAsync({
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

  const getBlockUserInfoData = async (email: string) => {
    let res: isUserBlockProps = {
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
          res = data as isUserBlockProps
        }
      }
    } catch (e) {
      console.log('>> getDecodedData error', e)
    }
    dispatch(isJournalUserBlockAction(res))
    dispatch(isMediaUserBlockAction(0))
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
              isBlocked = blockedData && blockedData.blockedUserId > 0 ? blockedData.blockedUserId : 0
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
      } else if (code === 'JRNLST_SOCIAL_USER_ADD') {
        list = [{ id: '', name: '선택' }, ...list]
        dispatch(jrnlstSocialUserAddListAction(list))
      }
    } else {
      openToast(message?.message, 'error')
      return res
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

  const setWordCloudTagType = async (hooks: SelectListOptionItem, idKey: number) => {
    const wordCloud = await getWordCloud(hooks.id, idKey)
    if (wordCloud && wordCloud.length > 0) {
      dispatch(wordCloudTagTypeListAction(wordCloud))
    }
    dispatch(wordCloudTagTypeAction(hooks))
  }

  const getWordCloud = async (code: string, idKey: number) => {
    let res: wordCloudTagTypeListProps[] = []
    const { status, data, message } = await apiGetJournalistTagTypeList({
      tagType: code,
      journalistId: idKey,
    })
    if (status === 'S') {
      const apiData = data as wordCloudTagTypeListProps[]
      if (apiData && apiData.length > 0) {
        res = apiData.sort((a, b) => b.name.localeCompare(a.name))
      }
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

  const moveMediaDetail = async (idKey: number) => {
    await router.push(`/media/record/${idKey}`)
  }

  const moveToTotalNewsList = async (
    props: ESearchJournalistDocumentDto,
    keywords: keywordsProps,
    additionalParam: additionalParamProps
  ) => {
    const param = {
      ...additionalParam,
      journalistTagList: [
        {
          id: props.jrnlst_id?.toString() ?? uuid(),
          label: props.name || '',
          className: 'journalistIdList',
        },
      ],
    }
    console.log('param', { ...param })
    console.log('{ ...param, ...additionalParam, news_id: 0 }', { ...keywords, ...param, news_id: 0 })
    const res = setObjectToBase64({ ...keywords, ...param, news_id: 0 })
    await router.push(`/news/search-result?filter=${res}`)
  }

  const pressFilterOptionAction = async (keyOption: string, props: ESearchJournalistDocumentDto, beemail: string) => {
    let temp: MbTagSearchTagItem[] = [
      {
        id: props.jrnlst_id?.toString() ?? uuid(),
        label: props.media?.main?.name ? `${props.name} - ${props.media?.main?.name || ''}` : props?.name || '',
        className: 'journalistId',
      },
    ]
    if (props.jrnlst_id) {
      if (keyOption === 'PRESS_RELEASE') {
        dispatch(
          pressReleaseDataExtraAction({
            journalistId: props.isSysInfo ? temp : [],
            mediaId: [],
            jrnlstListId: [],
            mediaListId: [],
            targetRelease: props.isSysInfo
              ? []
              : beemail && beemail !== ''
              ? [
                  {
                    id: uuid(),
                    label: beemail,
                  },
                ]
              : [],
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
            tagPressList: props.isSysInfo ? temp : [],
            targetEmail: props.isSysInfo
              ? []
              : beemail && beemail !== ''
              ? [
                  {
                    id: uuid(),
                    label: beemail,
                  },
                ]
              : [],
            receiverGroup: 'press',
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

        const titleEx =
          typeList.length > 0 ? typeList.find(e => e.id === keyOption)?.name || typeList[0].name : typeList[0].name
        dispatch(
          initActivityPopupAction({
            keyValue: 0,
            isOpen: true,
            loading: false,
            title: `${props.media?.main?.name || ''} ${props.name} ${titleEx}`,
            type: typeList,
            state: stateList,
            typeValue: typeList.length > 0 ? typeList.find(e => e.id === keyOption) || typeList[0] : typeList[0],
            scrop: shareCodeData.action,
            targetDataList: props.isSysInfo ? temp : [],
            receiverGroup: 'press',
          })
        )
      }
    }
  }

  const afterPressRegistAddReLoad = async (
    dto: number,
    originParam: ESearchJournalistDocumentDto,
    resultSearchRegisterListProps?: searchRegisterListProps[]
  ) => {
    let tempJournalIdParams = originParam
    try {
      const res = await getJournalist({
        page: 1,
        size: 20,
        sort: ['media.main.price!desc'],
        journalistIdList: [dto],
        groupId: userSelectGroup,
      })
      if (res) {
        const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
        if (journalData && journalData.length > 0) {
          tempJournalIdParams = journalData[0] ? journalData[0] : tempJournalIdParams
        }
      }
      dispatch(journalIdKeyParamAction(tempJournalIdParams))
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
    } catch (e) {}
    dispatch(initPressMediaListBookPopupAction())
  }

  const init = async () => {
    let keyId = ''
    let journalistId = 0
    let journalGroupMediaKey = 0
    let tempCommonCodeCategory: SelectListOptionItem[] = []
    let tempCommonCodeState: SelectListOptionItem[] = []
    let tempCommonCodetagType: SelectListOptionItem[] = []
    let tempCommontagType: SelectListOptionItem[] = []
    let tempCommonCodeStateFilter: SelectListOptionItem[] = []
    let tempMediaIdParams: ESearchMediaDocumentDto | null = null
    let tempJournalIdParams: ESearchJournalistDocumentDto | null = null
    let tempJournalDecodeList = {
      beemail: '',
      mobile: '',
      landline: '',
      landlineShared: '',
      fax: '',
    }
    let tempNewsDto: ESearchNewsCondDto = newsDto
    let pressDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      sort: ['media.main.price!desc'],
      journalistIdList: [],
      groupId: userSelectGroup,
    }
    dispatch(initAction())
    try {
      if (
        window.location &&
        window.location.pathname &&
        window.location.pathname.split('/') &&
        window.location.pathname.split('/').length > 0
      ) {
        const queryId = window.location.pathname.split('/')[3]
        keyId = 'press'
        journalistId = Number(queryId)
        for await (const re of extendedCommonCodeTargetList) {
          if (re.id === 'ACTION_CATEGORY_ALL') {
            tempCommonCodeCategory = await getCommonCode(re.id)
          } else if (re.id === 'ACTION_STATE_FILTER') {
            tempCommonCodeStateFilter = await getCommonCode(re.id)
          } else if (re.id === 'PORTAL_CODE') {
            await getCommonCode(re.id)
          } else if (re.id === 'ACTION_STATE') {
            tempCommonCodeState = await getCommonCode(re.id)
          } else if (re.id === 'JOURNALIST_TAG_TYPE') {
            tempCommonCodetagType = await getCommonCode(re.id)
          } else if (re.id === 'PUBLISHER_TYPE') {
            await getCommonCode(re.id)
          } else if (re.id === 'JRNLST_SOCIAL_USER_ADD') {
            await getCommonCode(re.id)
          }
        }
        pressDto.journalistIdList = [journalistId]
        const res = await getJournalist(pressDto)
        if (res) {
          const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
          if (journalData.length > 0) {
            journalGroupMediaKey = journalData[0] ? Number(journalData[0].media?.main?.id) || 0 : 0
            tempJournalIdParams = journalData[0] ? journalData[0] : null
            tempNewsDto = {
              timezone: timeZone,
              periodStartYear: moment().subtract({ year: 2 }).format('YYYY'),
              periodStartMonth: moment().subtract({ year: 2 }).format('MM'),
              periodStartDay: moment().subtract({ year: 2 }).format('DD'),
              periodEndYear: moment().format('YYYY'),
              periodEndMonth: moment().format('MM'),
              periodEndDay: moment().format('DD'),
              page: 1,
              size: 8,
              sort: [`inserted!desc`, `newsid!desc`],
              groupId: userSelectGroup,
              journalistIdList: [journalistId],
            }
            if (journalData && journalData.length > 0 && journalData[0].jrnlst_id) {
              await journalistPersonalContactInfo(journalData[0].jrnlst_id)
              await journalistExcluded(journalData[0].jrnlst_id)
            }
            if (journalData[0].isSysInfo) {
              if (journalData[0].email && journalData[0].email?.beemail) {
                const beemail = await getDecodedData(journalData[0].email.beemail, 'ELASTIC_SEARCH')
                if (beemail) {
                  tempJournalDecodeList.beemail = beemail
                  await getBlockUserInfoData(beemail)
                } else {
                  dispatch(isJournalUserBlockAction(defaultPressUserBlockData))
                  dispatch(isMediaUserBlockAction(0))
                }
              }
              if (journalData[0].mobile && journalData[0].mobile.length > 0) {
                const mobile = await getDecodedData(journalData[0].mobile[0], 'ELASTIC_SEARCH')
                if (mobile) {
                  //@ts-ignore
                  tempJournalDecodeList.mobile = mobile
                }
              }

              // 일반전화 복호화
              if (journalData[0].landline && journalData[0].landline.length > 0) {
                const landline = await getDecodedData(journalData[0].landline[0], 'ELASTIC_SEARCH')
                if (landline) {
                  //@ts-ignore
                  tempJournalDecodeList.landline = landline
                }
              }

              // 일반전화 대체 복호화
              if (journalData[0].landline_shared && journalData[0].landline_shared.length > 0) {
                const landlineShared = await getDecodedData(journalData[0].landline_shared[0], 'ELASTIC_SEARCH')
                if (landlineShared) {
                  //@ts-ignore
                  tempJournalDecodeList.landlineShared = landlineShared
                }
              }

              // 팩스 복호화
              if (journalData[0].fax && journalData[0].fax.length > 0) {
                const fax = await getDecodedData(journalData[0].fax[0], 'ELASTIC_SEARCH')
                if (fax) {
                  //@ts-ignore
                  tempJournalDecodeList.fax = fax
                }
              }
            } else {
              //@ts-ignore
              if (journalData[0].journalistUserDto) {
                //@ts-ignore
                const beemail = await getDecodedData(journalData[0].journalistUserDto.email, 'ELASTIC_SEARCH')
                //@ts-ignore
                if (beemail) {
                  tempJournalDecodeList.beemail = beemail
                  //@ts-ignore
                  await getBlockUserInfoData(beemail)
                }

                // 전화 복호화
                //@ts-ignore
                if (journalData[0].journalistUserDto.landline) {
                  //@ts-ignore
                  const landline = await getDecodedData(journalData[0].journalistUserDto.landline, 'ELASTIC_SEARCH')
                  if (landline) {
                    //@ts-ignore
                    tempJournalDecodeList.landline = landline
                  }
                }
                // 일반전화 복호화
                //@ts-ignore
                if (journalData[0].journalistUserDto.mobile) {
                  //@ts-ignore
                  const landline = await getDecodedData(journalData[0].journalistUserDto.mobile, 'ELASTIC_SEARCH')
                  if (landline) {
                    //@ts-ignore
                    tempJournalDecodeList.mobile = landline
                  }
                }
              }
              // @ts-ignore
              if (journalData[0].owner?.uid && journalData[0].owner?.uid === userInfo.userId && journalData[0]) {
                await pressNameList(journalData[0], tempJournalDecodeList.beemail)
              }
            }
          } else {
            await router.replace('/404')
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
        journalistId,
        tempMediaIdParams,
        tempJournalIdParams,
        tempJournalDecodeList,
        dto: tempNewsDto,
        journalGroupMediaKey,
      })
    )
    await setActicityList(
      journalistId.toString(),
      activityDataListPaginationInfo,
      tempCommonCodeCategory,
      tempCommonCodeState,
      tempCommonCodeStateFilter,
      tempJournalIdParams?.isSysInfo
    )
    if (tempJournalIdParams?.isSysInfo) {
      if (tempCommonCodetagType && tempCommonCodetagType.length > 0) {
        for await (const pressDtoElement of tempCommonCodetagType) {
          const wordCloud = await getWordCloud(pressDtoElement.id, journalistId)
          if (wordCloud && wordCloud.length > 0) {
            if (tempCommontagType.length < 1) {
              dispatch(wordCloudTagTypeListAction(wordCloud))
            }
            tempCommontagType = [...tempCommontagType, pressDtoElement]
          }
        }
        dispatch(journalistTagTypeListAction(tempCommontagType))
      }
      await pressHandlePaginationChange(1, journalNewsCountPaginationInfo, journalistId)
    }
  }

  const getJournalist = async (params: ESearchJournalistCondDto) => {
    let res: ElasticSearchReturnDtoJournalistDocumentDto | null = null
    try {
      const { status, message, data } = await journalistSearch.mutateAsync({
        ...params,
        // @ts-ignore
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        res = data as ElasticSearchReturnDtoJournalistDocumentDto
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}

    return res
  }

  const pressProfileAction = async (
    type: string,
    params: ESearchJournalistDocumentDto,
    decode: journalDecodeListProps
  ) => {
    if (type === 'share') {
      dispatch(
        sharedKeyAction({
          key: params.jrnlst_id || 0,
          title: '언론인 공유 - ' + params?.name || '',
          editor: params?.name || '',
          type: 'JOURNALIST',
          sharedUrl:
            process.env.MY_ENV_VAR === 'production'
              ? SVC_DOMAIN_URL.PROD
              : SVC_DOMAIN_URL.DEV + `/contacts/record/${params.jrnlst_id}`,
        })
      )
    } else if (type === 'delete') {
      dispatch(
        openDuplicationJournalAction({
          isOpen: true,
          key: journalIdKeyParam?.jrnlst_id || 0,
          targetName: journalIdKeyParam?.name || '',
        })
      )
      //@ts-ignore*/
    } else if (type === 'eidt' && params?.journalistUserDto) {
      let props: pressPersonalParamsProps = {
        isOpen: true,
        //@ts-ignore*/
        key: params?.journalistUserDto.journalistId,
        //@ts-ignore*/
        name: params?.journalistUserDto.name,
        nameErr: '',
        //@ts-ignore*/
        mediaName: params?.journalistUserDto.mediaName,
        mediaNameErr: '',
        //@ts-ignore*/
        department:
          //@ts-ignore*/
          params?.journalistUserDto.department && params?.journalistUserDto.department !== ''
            ? //@ts-ignore*/
              params?.journalistUserDto.department
            : '',
        //@ts-ignore*/
        position:
          //@ts-ignore*/
          params?.journalistUserDto.position && params?.journalistUserDto.position !== ''
            ? //@ts-ignore*/
              params?.journalistUserDto.position
            : '',
        //@ts-ignore*/
        email: decode.beemail,
        emailErr: '',
        //@ts-ignore*/
        landline: decode.landline,
        //@ts-ignore*/
        mobile: decode.mobile,
        //@ts-ignore*/
        fields:
          //@ts-ignore*/
          params?.journalistUserDto.fieldsByUser && params?.journalistUserDto.fieldsByUser !== ''
            ? //@ts-ignore*/
              params?.journalistUserDto.fieldsByUser.toString()
            : '',
        //@ts-ignore*/
        address:
          //@ts-ignore*/
          params?.journalistUserDto.address && params?.journalistUserDto.address !== ''
            ? //@ts-ignore*/
              params?.journalistUserDto.address
            : '',
        subAddressNm: '',
        //@ts-ignore*/
        career:
          //@ts-ignore*/
          params?.journalistUserDto.career && params?.journalistUserDto.career !== ''
            ? //@ts-ignore*/
              params?.journalistUserDto.career
            : '',
        //@ts-ignore*/
        education:
          //@ts-ignore*/
          params?.journalistUserDto.education && params?.journalistUserDto.education !== ''
            ? //@ts-ignore*/
              params?.journalistUserDto.education
            : '',
        //@ts-ignore*/
        writings:
          //@ts-ignore*/
          params?.journalistUserDto.writings && params?.journalistUserDto.writings !== ''
            ? //@ts-ignore*/
              params?.journalistUserDto.writings
            : '',
        //@ts-ignore*/
        awards:
          //@ts-ignore*/
          params?.journalistUserDto.awards && params?.journalistUserDto.awards !== ''
            ? //@ts-ignore*/
              params?.journalistUserDto.awards
            : '',
        jrnlstLists: [],
      }
      let socialList: pressSocialListProps[] = []
      //@ts-ignore*/
      if (params?.journalistUserDto.socialDtos && params?.journalistUserDto.socialDtos.length > 0) {
        //@ts-ignore*/
        console.log('params?.journalistUserDto.socialDtos', params?.journalistUserDto.socialDtos)
        //@ts-ignore*/
        for await (const prop of params.journalistUserDto.socialDtos) {
          console.log('prop', prop)
          console.log('jrnlstSocialUserAddList', jrnlstSocialUserAddList)
          let find = jrnlstSocialUserAddList.find(k => k.id.toString() === prop.socialTypeId.toString())
          if (find) {
            console.log('find', find)
            socialList = [
              ...socialList,
              {
                keyId: Math.random(),
                typeName: find,
                socialTypeId: prop.socialTypeId,
                link: prop.link,
                linkErr: '',
                socialErr: '',
              },
            ]
          }
        }
      }
      console.log('socialList', socialList)
      dispatch(initPressPersonalParamsActionAction({ param: props, list: socialList }))
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

  const setProfileImageIdActionAction = useCallback(
    () => dispatch(profileImageIdAction(0)),
    [profileImageId, registerJournalPhotoPopup]
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
      let param = { ...props }
      param.searchRegistIdList = e
        ? [...param.searchRegistIdList, Number(item.mediaListId)]
        : param.searchRegistIdList.filter(e => e !== Number(item.mediaListId))
      dispatch(searchRegisterListPopupAction(param))
    },
    [searchRegisterListPopup.searchRegistIdList]
  )

  const pressSearchRegisterListCheckStatusChange = useCallback(
    async (e: boolean, item: mediaContentListProps, props: searchRegisterListPopupProps) => {
      const res = e
        ? [...props.searchRegistIdList, Number(item.jrnlstListId)]
        : props.searchRegistIdList.filter(e => e !== Number(item.jrnlstListId))
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

  const setAddPersonalContactAction = useCallback(
    (hooks: addPersonalContactProps) => dispatch(addPersonalContactAction(hooks)),
    [addPersonalContactPopup]
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

  const setOneMediaSearchRegistPopupAction = useCallback(
    async (e: boolean, idList: ESearchMediaDocumentDto) => {
      let list: number[] = []
      if (idList && idList.mediaListList && idList.mediaListList.length > 0) {
        for await (const mediaListListProp of idList.mediaListList) {
          list = [...list, Number(mediaListListProp.id)]
        }
      }
      console.log('')
      dispatch(
        initSearchRegisterListPopupAction({
          isOpen: e,
          kind: 'media',
          type: 'any',
          origin: list,
          list: list,
          except: [],
          mediaIdList: [idList],
          journalIdList: [],
        })
      )
    },
    [searchRegisterListPopup]
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
  const setDuplicationJournalPopupAction = useCallback(
    (props: duplicationJournalPopupPropsProps) => {
      dispatch(openDuplicationJournalAction(props))
    },
    [duplicationJournalPopup]
  )

  const addressPopupHandle = useCallback((param: boolean) => dispatch(addressPopupAction(param)), [addressPopup])

  const setNewsListParamKeywordActionAction = useCallback(
    (e: string) => dispatch(newsListParamKeywordAction(e)),
    [newsListParamKeyword]
  )

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

  const pressPersonalNameAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        name: e,
        nameErr: '',
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.name]
  )

  const pressPersonalMediaNameAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        mediaName: e,
        mediaNameErr: '',
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.mediaName]
  )

  const pressPersonalDepartmentAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        department: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.department]
  )

  const pressPersonalPositionAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        position: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.position]
  )

  const pressPersonalEmailAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        email: e,
        emailErr: '',
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.email]
  )

  const pressPersonalLandlineAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        landline: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.landline]
  )

  const pressPersonalMobileAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        mobile: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.mobile]
  )

  const pressPersonalFieldsAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        fields: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.fields]
  )

  const pressPersonalSubAddressNmAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        subAddressNm: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.subAddressNm]
  )

  const pressPersonalCareerNmAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        career: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.career]
  )
  const pressPersonalEducationAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        education: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.education]
  )

  const pressPersonalWritingsAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        writings: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.writings]
  )

  const pressPersonalAwardsAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        awards: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParamsPopup.awards]
  )

  const pressPersonalSocialAction = useCallback(
    (props: pressSocialListProps[]) => {
      let temp = [...props]
      temp = [
        ...temp,
        {
          keyId: Math.random(),
          typeName: { id: '', name: '선택' },
          socialTypeId: 0,
          link: '',
          linkErr: '',
          socialErr: '',
        },
      ]
      dispatch(pressSocialListAction(temp))
    },
    [pressSocialList]
  )

  const pressSocialListTypeAction = useCallback(
    (key: pressSocialListProps, e: SelectListOptionItem, props: pressSocialListProps[]) => {
      let res = [...props]
      const findIndex = res.findIndex(i => i.keyId === key.keyId)
      res[findIndex] = {
        ...key,
        typeName: e,
        socialTypeId: Number(e.id),
        socialErr: '',
      }
      dispatch(pressSocialListAction(res))
    },
    [pressSocialList.length]
  )

  const pressSocialListLinkAction = useCallback(
    (key: pressSocialListProps, i: string, props: pressSocialListProps[]) => {
      let res = [...props]
      const findIndex = res.findIndex(e => e.keyId === key.keyId)
      res[findIndex] = {
        ...key,
        link: i,
        linkErr: '',
      }
      dispatch(pressSocialListAction(res))
    },
    [pressSocialList.length]
  )

  const closePressPersonalParamsAction = useCallback(() => {
    dispatch(
      pressPersonalParamsAction({
        isOpen: false,
        key: 0,
        name: '',
        nameErr: '',
        mediaName: '',
        mediaNameErr: '',
        department: '',
        position: '',
        email: '',
        emailErr: '',
        landline: '',
        mobile: '',
        fields: '',
        address: '',
        subAddressNm: '',
        career: '',
        education: '',
        writings: '',
        awards: '',
        jrnlstLists: [],
      })
    )
  }, [pressPersonalParamsPopup])

  const setPressPersonalParamsAction = useCallback(
    (props: pressPersonalParamsProps) => {
      dispatch(pressPersonalParamsAction(props))
    },
    [pressPersonalParamsPopup]
  )

  const setNoticeClose = useCallback(
    (id: number) => {
      dispatch(pressDuplicationIdListSaga([...pressDuplicationIdList, id]))
    },
    [journalCheckDuplicateParam]
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
    if (!mediaElastickSearchData) return
    const { status, data, message } = mediaElastickSearchData as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as ElasticSearchReturnDtoMediaDocumentDto
      if (res) {
        const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
        if (mediaData.length > 0) {
          dispatch(journalGroupMediaParamAction(mediaData[0] ? mediaData[0] : null))
        }
      }
    } else {
      openToast(message?.message, 'error')
    }
  }, [mediaElastickSearchData])

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
    journalIdKey,
    journalIdKeyParam,
    journalContactInfo,
    journalEmailBlocking,
    journalDecodeList,
    journalNewsCountPage,
    isJournalUserBlock,
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
    newsListByJournalId,
    journalNewsCountPaginationInfo,
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
    journalGroupMediaKey,
    journalGroupMediaParam,
    activityTabList,
    activityTab,
    activityDataList,
    commonCodeState,
    activityLoading,
    activityDataListPaginationInfo,
    actionStateFilterList,
    journalistTagTypeList,
    wordCloudTagTypeList,
    wordCloudTagType,
    journalCheckDuplicateParam,
    duplicationJournalPopup,
    pressPersonalParamsPopup,
    pressSocialList,
    jrnlstSocialUserAddList,
    addressPopup,
    userPopup,
    userPressListAutoSaveData,
    publisherTypeList,
    timeZone,
    activityParamKeyword,
    newsListParamKeyword,
    isDemoLicense,
    journalContactBlockedInfo,
    profileImageId,

    init,
    pressProfileAction,
    journalistUnBlockedAction,
    journalistBlockedAction,
    journalistPhotoDeleteAdjust,
    journalistPhotoPopupAdjust,
    pressProfileOptionAction,
    pressMediaUnBlockAction,
    createPersonalContact,
    deletePersonalContact,
    pressMediaErrAction,
    pressHandlePaginationChange,
    mediaHandlePaginationChange,
    pressFilterOptionAction,
    moveToTotalNewsList,
    moveToTotalJournalList,
    moveMediaDetail,
    activityHandlePaginationChange,
    activityHandleKeywordChange,
    activityChangeTab,
    deleteDuplicationJournal,
    pressPersonalValidate,
    pressPersonalEdit,
    pressSocialListDeleteAction,
    pressPersonalAddressNmAction,
    ownerFunction,
    userContactValidation,
    setOnePressSearchRegistPopupAction,
    checkAutoRegisterPressRegist,
    createRegisterPressListAction,
    pressHandleKeywordChange,
    getWordCloud,
    setWordCloudTagType,
    onChangeJournalPhotoFiles,
    afterPressRegistAddReLoad,

    setNewsListParamKeywordActionAction,
    setBlockedEmailSenderPopupAction,
    setRegisterJournalPhotoPopupAction,
    setProfileImageIdActionAction,
    pressSearchRegisterListCheckStatusChange,
    mediaSearchRegisterListCheckStatusChange,
    setMediaSearchRegistPopupAction,
    setSearchRegisterPopupNameAction,
    setPressMediaUnBlockPopupAction,
    setPressMediaUnBlockTitleAction,
    setPressMediaUnBlockContentAction,
    setAddPersonalContactAction,
    setaddPersonalContactEmail,
    setaddPersonalContactPhone,
    setaddPersonalContactTelephone,
    setaddPersonalContactAddress,
    setPressMediaErrPopupAction,
    setPressMediaErrTitleAction,
    setPressMediaErrContentAction,
    setRegisterMediaPhotoPopupAction,
    setOneMediaSearchRegistPopupAction,
    setNoticeClose,
    setDuplicationJournalPopupAction,
    setPressPersonalParamsAction,
    closePressPersonalParamsAction,
    pressSocialListLinkAction,
    pressSocialListTypeAction,
    pressPersonalSocialAction,
    pressPersonalAwardsAction,
    pressPersonalWritingsAction,
    pressPersonalEducationAction,
    pressPersonalCareerNmAction,
    pressPersonalSubAddressNmAction,
    pressPersonalFieldsAction,
    pressPersonalMobileAction,
    pressPersonalLandlineAction,
    pressPersonalEmailAction,
    pressPersonalPositionAction,
    pressPersonalDepartmentAction,
    pressPersonalMediaNameAction,
    pressPersonalNameAction,
    addressPopupHandle,
    setActivityParamKeywordAction,
    setUserProfilePopupAction,
  }
}
