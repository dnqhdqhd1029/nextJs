import { ChangeEvent, RefObject, useCallback, useEffect } from 'react'
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
  extendedSearchCommonCodeTargetList,
  extendedShareScopeTargetList,
  mediaInitParams,
  pressInitParams,
  subJournalFilterListList,
  subJournalFilterOptionsList,
  subMediaFilterListList,
  subMediaFilterOptionsList,
} from '~/components/contents/pressMedia/SavedSearch/defaultData'
import { SavedSearchEditContext } from '~/components/contents/pressMedia/SavedSearch/Popup/AutoRegisterContext'
import { disclosureScopeFilterOptionList } from '~/components/contents/pressMedia/SearchResult/defaultData'
import { EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION, URL_REGEXP, URL_REGEXP_DESCRIPTION } from '~/constants/common'
import { initActivityPopupAction } from '~/stores/modules/contents/activity/activityPopup'
import { setUserSelectGroupAction } from '~/stores/modules/contents/auth/auth'
import { tagetListOpenEmailPopupAction } from '~/stores/modules/contents/email/email'
import {
  mediaDuplicationIdListSaga,
  pressDuplicationIdListSaga,
  pressReleaseDataExtraAction,
  userAutoSaveDataProps,
  userMediaListAutoSaveDataAction,
  userPressListAutoSaveDataAction,
} from '~/stores/modules/contents/extraData/extra'
import { selectDefaultUserGroupAction } from '~/stores/modules/contents/header/header'
import { duplicationMediaPopupProps, isMediaUserBlockProps } from '~/stores/modules/contents/pressMedia/mediaProfile'
import {
  initPressMediaListBookPopupAction,
  initSearchRegisterListPopupAction,
  searchRegisterListProps,
} from '~/stores/modules/contents/pressMedia/pressMediaListBookPopup'
import {
  additionalParamProps,
  keywordParamProps,
  mediaAdditionalParamProps,
  mediaFieldPopupProps,
  mediaKeywordParamProps,
  mediaLocationPopupProps,
  mediaTypePopupProps,
} from '~/stores/modules/contents/pressMedia/pressMediaSearch'
import {
  addPersonalContactProps,
  blockedEmailSenderPopupProps,
  filterSubParamActionsProps,
  mediaSearchOptionProps,
  mediaSubTypeListProps,
  pressMediaErrPopupProps,
  pressMediaUnBlockPopupProps,
  pressSearchOptionProps,
  registerMediaPhotoPopupProps,
  searchContentListProps,
  searchRegisterPopupProps,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { duplicationJournalPopupPropsProps } from '~/stores/modules/contents/pressMedia/pressProfile'
import { basicLocationPopupProps, fieldListProps } from '~/stores/modules/contents/pressMedia/pressSearch'
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
  basicFieldListAction,
  basicFieldPopupAction,
  basicLocationListAction,
  basicLocationPopupAction,
  blockedEmailSenderPopupAction,
  checkSavedSearchUserMediaAction,
  checkSavedSearchUserPressAction,
  contentDeletePopupAction,
  contentDeletePopupProps,
  contentListImageIdAction,
  countLoadingAction,
  dataOnChangeActionProps,
  dataOnChangeActionTypeProps,
  duplicationMediaPopupAction,
  duplicationPressPopupAction,
  filterDataListAction,
  filterInformationAction,
  filterMediaInfoTypeAction,
  filterMediaTypeAction,
  filterPortalCodeAction,
  filterPubCycleAction,
  IJournalistSearchFilter,
  initSearchAction,
  isFilterSubParamAction,
  isJournalUserBlockAction,
  isLimitFilterAction,
  isMediaFilterSubParamAction,
  isMediaUserBlockAction,
  isPressFilterSubParamAction,
  isSearchedNewsOpenAction,
  isSelectedAllNewsIdAction,
  journalContactInfoAction,
  journalDecodeListProps,
  journalEmailBlockingAction,
  journalistBlockYNListAction,
  journalistInfoTypeListAction,
  journalistOccupationListAction,
  journalistSocialFilterListAction,
  journalLoadingAction,
  languageListAction,
  mediaAdditionalParamAction,
  mediaBlockYNListAction,
  mediaContactInfoAction,
  mediaCountListAction,
  mediaEditPageOpenAction,
  mediaEmailBlockingAction,
  mediaFieldListAction,
  mediaFieldListProps,
  mediaFieldPopupAction,
  mediaFieldPopupListAction,
  mediaIdParamsAction,
  mediaLoadingAction,
  mediaLocationListAction,
  mediaLocationListProps,
  mediaLocationPopupAction,
  mediaLocationPopupListAction,
  mediaNameRevealedYNListAction,
  mediaParamKeywordAction,
  mediaParamKeywordButtonAction,
  mediaParamsExpandButtonAction,
  mediaSearchOptionAction,
  mediaSubTypeListAction,
  mediaTypePopupAction,
  mediaTypePopupListAction,
  newsListByJournalIdAction,
  newsListByMediaIdAction,
  newsLoadingAction,
  pressAdditionalParamAction,
  pressEditPageOpenAction,
  pressIdParamsAction,
  pressMediaErrPopupAction,
  pressMediaUnBlockPopupAction,
  pressNewsData,
  pressNewsListAction,
  pressParamKeywordAction,
  pressParamKeywordButtonAction,
  pressParamsExpandButtonAction,
  pressSearchOptionAction,
  profileByJournalIdAction,
  profileByMediaIdAction,
  profileImageIdAction,
  publisherTypeAction,
  registerJournalPhotoPopupAction,
  registerJournalPhotoPopupProps,
  registerMediaPhotoPopupAction,
  resetSavedJournalListKeywordAction,
  resetSavedMediaListKeywordAction,
  resetSearchOption,
  savedJournalListKeywordAction,
  savedJournalListLoadingAction,
  savedMediaListKeywordAction,
  savedMediaListLoadingAction,
  savedSearchPopupAction,
  savedSearchPopupProps,
  searchContentKeyMediaListAction,
  searchContentKeyPressListAction,
  searchLimitAlarmAction,
  searchRegisterPopupAction,
  setChangeMediaSavedSearchTargetIdAction,
  setChangePressSavedSearchTargetIdAction,
  setFilterJournalSubParamActions,
  setFilterMediaDataActionByKeyword,
  setFilterMediaSubParamActions,
  setFilterPressDataActionByKeyword,
  setFilterPressMediaDataAction,
  setinitMediaListAction,
  setinitPressListAction,
  setOnChangeMediaAction,
  setOnChangeMediaFilterSearchOptionAction,
  setOnChangeMediaSearchOptionAction,
  setOnChangePressAction,
  setOnChangePressFilterSearchOptionAction,
  setOnChangePressSearchOptionAction,
  setProfileImageIdAction,
  setResetMediaSavedSearchListAction,
  setResetPressSavedSearchListAction,
  userPopupAction,
} from '~/stores/modules/contents/pressMedia/savedSearch'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  ContactUserAddedDto,
  ElasticSearchReturnDtoJournalistDocumentDto,
  ElasticSearchReturnDtoMediaDocumentDto,
  type ElasticSearchReturnDtoNewsDocumentDto,
  type ESearchJournalistCondDto,
  ESearchMediaCondDto,
  GroupDto,
  GroupDtoForUser,
  JournalistAutoCompleteDto,
  JournalistSrchDto,
  MediaAutoCompleteDto,
  MediaSrchDto,
  PageActionDtoForList,
  type UserDto,
  UserDtoForGroup,
} from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import {
  ESearchJournalistDocumentDto,
  ESearchMediaDocumentDto,
  type PressMediaCustomSearchListItem,
} from '~/types/contents/PressMedia'
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
import { apiGetMediaContact, useGetMediaContact } from '~/utils/api/contact/media/useGetMediaContact'
import { usePostMediaContactCreateUpdate } from '~/utils/api/contact/media/usePostMediaContactCreateUpdate'
import { useDeleteContactInfo } from '~/utils/api/contact/useDeleteContactInfo'
import { useDeleteJournalistCustomSearch } from '~/utils/api/customSearch/journalist/useDeleteJournalistCustomSearch'
import {
  apiGetJournalistCustomSearchList,
  UseGetJournalistCustomSearchListParams,
} from '~/utils/api/customSearch/journalist/useGetJournalistCustomSearchList'
import { usePostJournalistCustomSearchCreate } from '~/utils/api/customSearch/journalist/usePostJournalistCustomSearchCreate'
import { usePostJournalistCustomSearchNameCheck } from '~/utils/api/customSearch/journalist/usePostJournalistCustomSearchNameCheck'
import { usePutJournalistCustomSearch } from '~/utils/api/customSearch/journalist/usePutJournalistCustomSearch'
import { useDeleteMediaCustomSearch } from '~/utils/api/customSearch/media/useDeleteMediaCustomSearch'
import { apiGetMediaCustomSearchList } from '~/utils/api/customSearch/media/useGetMediaCustomSearchList'
import { usePostMediaCustomSearchCreate } from '~/utils/api/customSearch/media/usePostMediaCustomSearchCreate'
import { usePostMediaCustomSearchNameCheck } from '~/utils/api/customSearch/media/usePostMediaCustomSearchNameCheck'
import { usePutMediaCustomSearch } from '~/utils/api/customSearch/media/usePutMediaCustomSearch'
import { useDeleteJournalistExcluded } from '~/utils/api/email/journalist/useDeleteJournalistExcluded'
import { apiGetJournalistExcluded } from '~/utils/api/email/journalist/useGetJournalistExcluded'
import { usePostJournalistExcluded } from '~/utils/api/email/journalist/usePostJournalistExcluded'
import { useDeleteMediaExcluded } from '~/utils/api/email/media/useDeleteMediaExcluded'
import { apiGetMediaExcluded, useGetMediaExcluded } from '~/utils/api/email/media/useGetMediaExcluded'
import { usePostMediaExcluded } from '~/utils/api/email/media/usePostMediaExcluded'
import { apiPostMediapassDecode } from '~/utils/api/encrypt/usePostMediapassDecode'
import { apiGetActiveGroupInfo } from '~/utils/api/group/useGetGroupSearch'
import {
  usePostJournalistGroupAddJournalId,
  usePostJournalistGroupAddJournalIdAuto,
} from '~/utils/api/groupList/journalist/usePostJournalistGroupAddJournalist'
import {
  usePostMediaGroupAddMedia,
  usePostMediaGroupAddMediaAuto,
} from '~/utils/api/groupList/media/usePostMediaGroupAddMedia'
import { apiGetJournalistFieldSubData } from '~/utils/api/journalist/useGetJournalistFieldSubData'
import { apiGetJournalistLocationSubData } from '~/utils/api/journalist/useGetJournalistLocation'
import { apiGetJournalistNameAutoComplete } from '~/utils/api/journalist/useGetJournalistNameAutoComplete'
import { apiGetJournalistSearchFilter } from '~/utils/api/journalist/useGetJournalistSearchFilter'
import { usePostJournalistNewsSearch, usePostJournalistSearch } from '~/utils/api/journalist/usePostJournalistSearch'
import { apiGetMediaFieldSubData } from '~/utils/api/media/useGetMediaFieldSubData'
import { apiGetMediaFieldType } from '~/utils/api/media/useGetMediaFieldType'
import { apiGetMediaLocationSubData } from '~/utils/api/media/useGetMediaLocation'
import { apiGetMediaNameAutoComplete } from '~/utils/api/media/useGetMediaNameAutoComplete'
import { usePostMediaSearch } from '~/utils/api/media/usePostMediaSearch'
import { usePostNewsSearch } from '~/utils/api/news/usePostNewsSearch'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { usePutUserSelectGroup } from '~/utils/api/user/usePutUserSelectGroup'
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

export const useSavedSearch = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    pressNewsList,
    editPageOpen,
    isFilterSubParam,
    savedMediaList,
    savedJournalList,
    savedJournalListLoading,
    savedMediaListLoading,
    pressDto,
    mediaDto,
    pageCount,
    listDefine,
    isOwner,
    savedJournalListKeyword,
    savedMediaListKeyword,
    mediaApiList,
    journalApiList,
    journalIdKey,
    mediaIdKey,
    pressListParams,
    mediaListParams,
    mediaLoading,
    journalLoading,
    savedJournalKey,
    savedMediaKey,
    filterJournalSubParam,
    filterMediaSubParam,
    filterMediaSubParamActions,
    filterJournalSubParamActions,
    mediaTypePopup,
    mediaLocationPopup,
    mediaFieldPopup,
    filterDataList,
    mediaLocationPopupList,
    mediaFieldPopupList,
    originSavedJournalList,
    originSavedMediaList,
    searchContentKeyList,
    isTagButton,
    isSelectedAllNewsId,
    searchContentListButton,
    mediaParamsExpandButton,
    pressParamsExpandButton,
    savedJournalAuth,
    savedMediaAuth,
    searchActivate,
    pressParamKeyword,
    mediaParamKeyword,
    mediaParamKeywordButton,
    pressParamKeywordButton,
    journalTab,
    mediaTab,
    journalIdKeyParam,
    isJournalUserBlock,
    journalDecodeList,
    journalEmailBlocking,
    journalContactInfo,
    newsLoading,
    journalNewsCountPage,
    newsListByJournalId,
    activityLoading,
    journalActivityCountPage,
    activityListByJournalId,
    actionCategoryList,
    actionStateFilterList,
    actionStateList,
    registerJournalPhotoPopup,
    pressMediaUnBlockPopup,
    addPersonalContactPopup,
    pressMediaErrPopup,
    blockedEmailSenderPopup,
    searchRegisterPopup,
    registerMediaPhotoPopup,
    filterInformation,
    filterMediaType,
    journalistOccupationList,
    filterPubCycle,
    journalistInfoTypeList,
    journalistBlockYNList,
    mediaCountList,
    languageList,
    filterPortalCode,
    journalistSocialFilterList,
    isLimitFilter,
    mediaFieldList,
    mediaLocationList,
    mediaTypePopupList,
    filterMediaInfoType,
    mediaSubTypeList,
    mediaBlockYNList,
    mediaNameRevealedYNList,
    mediaIdKeyParam,
    mediaNewsCountPage,
    newsListByMediaId,
    mediaActivityCountPage,
    activityListByMediaId,
    isMediaUserBlock,
    mediaContactInfo,
    mediaEmailBlocking,
    mediaCheckDuplicateParam,
    duplicationMediaPopup,
    isSearchedNewsOpen,
    pressCheckDuplicateParam,
    duplicationPressPopup,
    userPopup,
    contentDeletePopup,
    publisherTypeList,
    savedSearchPopup,
    basicFieldPopup,
    basicFieldList,
    basicLocationList,
    basicLocationPopup,
    searchLimitAlarm,
    pressSearchOptionParams,
    mediaSearchOptionParams,
    searchDropBoxActivate,
    journalContactBlockedInfo,
    profileImageId,
    contentListImageId,
    activityListTotalCount,
    newsListTotalCount,
  } = useAppSelector(state => state.savedSearchSlice)
  const {
    isDemoLicense,
    licenseInfo,
    userInfo,
    userSelectGroup,
    shareCodeData,
    frequentlyUsedCommonCode,
    generalProduct,
    timeZone,
  } = useAppSelector(state => state.authSlice)
  const { mediaDuplicationIdList, pressDuplicationIdList, userPressListAutoSaveData, userMediaListAutoSaveData } =
    useAppSelector(state => state.extraSlice)
  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)

  const JournalistNewsData = usePostJournalistNewsSearch()
  const getNewsSearchResult = usePostNewsSearch()
  const journalistSearch = usePostJournalistSearch()
  const mediaSearch = usePostMediaSearch()
  const apiBlockUserCheckAction = useBlockUserCheckAction()
  const deleteJournalistPhoto = usePutJournalistImageDelete()
  const createUpdateJournalistContact = usePostJournalistContactCreateUpdate()
  const deleteContactInfo = useDeleteContactInfo()
  const createUpdateMediaContact = usePostMediaContactCreateUpdate()
  const apiDeleteJournalistExcluded = useDeleteJournalistExcluded()
  const apiDeleteMediaExcluded = useDeleteMediaExcluded()
  const apiUnBlockedUserCheckAction = useUnBlockedUserCheckAction()
  const pressRegisterCheck = usePostJournalistCustomSearchNameCheck()
  const pressRegister = usePostJournalistCustomSearchCreate()
  const mediaRegisterCheck = usePostMediaCustomSearchNameCheck()
  const mediaRegister = usePostMediaCustomSearchCreate()
  const saveMediaPhoto = usePutMediaLogo()
  const journalistGroupAddJournalist = usePostJournalistGroupAddJournalId()
  const journalistGroupAddJournalistAuto = usePostJournalistGroupAddJournalIdAuto()
  const mediaGroupAddMedia = usePostMediaGroupAddMedia()
  const mediaGroupAddMediaAuto = usePostMediaGroupAddMediaAuto()
  const saveJournalistPhoto = usePutJournalistPhoto()
  const apiInquiryAction = usePostInquiry()
  const updateJournalistCustomSearch = usePutJournalistCustomSearch()
  const updateMediaCustomSearch = usePutMediaCustomSearch()
  const deleteMediaPhoto = usePutMediaLogoDelete()
  const apiDeleteJournalistIncluded = usePostJournalistExcluded()
  const apiDeleteMediaIncluded = usePostMediaExcluded()
  const deleteMedia = useDeleteMedia()
  const deleteJournalist = useDeleteJournalist()
  const deleteJournalistCustomSearch = useDeleteJournalistCustomSearch()
  const deleteMediaCustomSearch = useDeleteMediaCustomSearch()
  const updateUserSelectGroup = usePutUserSelectGroup()

  const setPressParamKeywordButtonAction = useCallback(
    (e: boolean) => {
      dispatch(pressParamKeywordButtonAction(e))
    },
    [pressParamKeywordButton]
  )

  const setPressMediaErrPopupAction = useCallback(
    (props: pressMediaErrPopupProps) => {
      dispatch(pressMediaErrPopupAction(props))
    },
    [pressMediaErrPopup]
  )

  const setBlockedEmailSenderPopupAction = useCallback(
    (props: blockedEmailSenderPopupProps) => {
      dispatch(blockedEmailSenderPopupAction(props))
    },
    [blockedEmailSenderPopup]
  )

  const setMediaKeywordField = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          mediaField: e,
        })
      )
    },
    [mediaSearchOptionParams.keywordParam.mediaField]
  )

  const setMediaAdditionMediaTargetList = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaAdditionalParamProps) => {
      dispatch(
        mediaAdditionalParamAction({
          ...props,
          journalistTargetList: e,
        })
      )
    },
    [mediaSearchOptionParams.additionalParam.journalistTargetList]
  )

  const setMediaPortal = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaAdditionalParamProps) => {
      dispatch(
        mediaAdditionalParamAction({
          ...props,
          portal: e,
        })
      )
    },
    [mediaSearchOptionParams.additionalParam.portal]
  )

  const setMediaAdditionTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: mediaAdditionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'journalistTargetList') {
        params.journalistTargetList = props.journalistTargetList.filter(item => item.id !== e.id)
      } else if (type === 'portal') {
        params.portal = props.portal.filter(item => item.id !== e.id)
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOptionParams.additionalParam]
  )

  const setMediaTagAdditionDeleteControl = useCallback(
    async (props: mediaAdditionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'journalistTargetList') {
        params.journalistTargetList = []
      } else if (type === 'portal') {
        params.portal = []
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOptionParams.additionalParam]
  )

  const setMediaLanguageType = useCallback(
    async (e: SelectListOptionItem, props: mediaAdditionalParamProps) => {
      const params = {
        ...props,
        languageParam: e,
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOptionParams.additionalParam.languageParam]
  )

  const setMediaIsJournalistType = useCallback(
    async (e: SelectListOptionItem, props: mediaAdditionalParamProps) => {
      const params = {
        ...props,
        isJournalist: e,
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOptionParams.additionalParam.isJournalist]
  )

  const setMediaSystemType = useCallback(
    async (e: SelectListOptionItem, props: mediaAdditionalParamProps) => {
      const params = {
        ...props,
        system: e,
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOptionParams.additionalParam.system]
  )

  const setMediaLimitType = useCallback(
    async (e: SelectListOptionItem, props: mediaAdditionalParamProps) => {
      const params = {
        ...props,
        limit: e,
      }
      dispatch(mediaAdditionalParamAction(params))
    },
    [mediaSearchOptionParams.additionalParam.limit]
  )

  const setMediaPublishingPeriod = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          publishingPeriod: e,
        })
      )
    },
    [mediaSearchOptionParams.keywordParam.publishingPeriod]
  )

  const setMediaKeywordAction = useCallback(
    (refs: RefObject<HTMLInputElement>, items: mediaKeywordParamProps) => {
      let param = {
        ...items,
        keyword: items.keyword,
      }
      if (items.keyword.length <= 2) {
        if (refs.current?.value.trim()) {
          param = {
            ...items,
            keyword: [...items.keyword, { id: refs.current?.value.trim(), label: refs.current?.value.trim() }],
          }
        }
      } else {
        openToast('키워드는 최대 3개까지 입력가능합니다.', 'warning')
      }

      dispatch(mediaSearchOptionAction(param))
    },
    [mediaSearchOptionParams.keywordParam.keyword]
  )

  const setMediaInformationType = useCallback(
    async (e: SelectListOptionItem, props: mediaKeywordParamProps) => {
      const params = {
        ...props,
        informationType: e,
      }
      dispatch(mediaSearchOptionAction(params))
    },
    [mediaSearchOptionParams.keywordParam.informationType]
  )

  const setMediaAdditionMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      const params = {
        ...props,
        mediaGroupList: e,
      }
      dispatch(mediaSearchOptionAction(params))
    },
    [mediaSearchOptionParams.keywordParam.mediaGroupList]
  )

  const setMediaTagDeleteControl = useCallback(
    async (props: mediaKeywordParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaTagList') {
        params.mediaTagList = []
      } else if (type === 'mediaType') {
        params.mediaType = []
      } else if (type === 'mediaField') {
        params.mediaField = []
      } else if (type === 'mediaArea') {
        params.mediaArea = []
      } else if (type === 'keyword') {
        params.keyword = []
      } else if (type === 'mediaGroupList') {
        params.mediaGroupList = []
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = []
      }
      dispatch(mediaSearchOptionAction(params))
    },
    [mediaSearchOptionParams.keywordParam]
  )

  const setMediaTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: mediaKeywordParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaTagList') {
        params.mediaTagList = props.mediaTagList.filter(item => item.id !== e.id)
      } else if (type === 'mediaType') {
        params.mediaType = props.mediaType.filter(item => item.id !== e.id)
      } else if (type === 'mediaField') {
        params.mediaField = props.mediaField.filter(item => item.id !== e.id)
      } else if (type === 'mediaArea') {
        params.mediaArea = props.mediaArea.filter(item => item.id !== e.id)
      } else if (type === 'keyword') {
        params.keyword = props.keyword.filter(item => item.id !== e.id)
      } else if (type === 'mediaGroupList') {
        params.mediaGroupList = props.mediaGroupList.filter(item => item.id !== e.id)
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = props.publishingPeriod.filter(item => item.id !== e.id)
      }
      dispatch(mediaSearchOptionAction(params))
    },
    [mediaSearchOptionParams.keywordParam]
  )

  const setPressTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: keywordParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'journalistTagList') {
        params.journalistTagList = props.journalistTagList.filter(item => item.id !== e.id)
      } else if (type === 'field') {
        params.field = props.field.filter(item => item.id !== e.id)
      } else if (type === 'area') {
        params.area = props.area.filter(item => item.id !== e.id)
      } else if (type === 'mediaTagList') {
        params.mediaTagList = props.mediaTagList.filter(item => item.id !== e.id)
      } else if (type === 'mediaType') {
        params.mediaType = props.mediaType.filter(item => item.id !== e.id)
      } else if (type === 'occupation') {
        params.occupation = props.occupation.filter(item => item.id !== e.id)
      } else if (type === 'position') {
        params.position = props.position.filter(item => item.id !== e.id)
      } else if (type === 'keyword') {
        params.keyword = props.keyword.filter(item => item.id !== e.id)
      } else if (type === 'department') {
        params.department = props.department.filter(item => item.id !== e.id)
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = props.publishingPeriod.filter(item => item.id !== e.id)
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOptionParams.keywordParam]
  )

  const setSelectedTypeMediaTypePopup = useCallback(
    async (e: MbTagSearchTagItem, props: mediaTypePopupProps) => {
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [mediaTypePopup.selectedType]
  )

  const setDeleteSelectedTypeMediaTypePopup = useCallback(
    async (props: mediaTypePopupProps) => {
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [mediaTypePopup.selectedType]
  )

  const setMediaTypePopupSelectedValue = useCallback(
    async (e: string, props: mediaTypePopupProps) => {
      if (e && e !== '') {
        await getParentCommonCodeId(Number(e))
      }
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [mediaTypePopup.selectedValue]
  )

  const setMediaTypePopupDeleteTotalSelect = useCallback(
    async (commonList: CommonCode[], props: mediaTypePopupProps) => {
      let resultList: MbTagSearchTagItem[] = []
      let selectedIdParams = props.selectedType.map(e => e.label)
      let getIdParams = commonList.map(e => e.name)
      let difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      if (difference.length > 0) {
        for await (const commonEle of difference) {
          const find = props.selectedType.find(k => k.label?.toString() === commonEle?.toString())
          if (find) {
            resultList = [...resultList, find]
          }
        }
      }
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: resultList,
        })
      )
    },
    [mediaTypePopup.selectedType]
  )

  const setMediaTypePopupSelectedItem = useCallback(
    async (i: boolean, e: CommonCode, props: mediaTypePopupProps) => {
      let dataList = [...props.selectedType]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.code?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.code.toString())
      }
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [mediaTypePopup.selectedType]
  )

  const setMediaLocationPopupActionByMediaTab = useCallback(
    async (e: boolean, value: string, origin: mediaSearchOptionProps, type: string) => {
      const params = {
        isOpen: e,
        type,
        selectedValue: value,
        selectedType: origin.keywordParam.mediaArea,
      }
      dispatch(mediaLocationPopupAction(params))
    },
    [mediaLocationPopup]
  )

  const setDeleteSelectedTypeMediaLocationPopup = useCallback(
    async (props: mediaLocationPopupProps) => {
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [mediaLocationPopup.selectedType]
  )

  const setSelectedTypeMediaLocationPopup = useCallback(
    async (e: MbTagSearchTagItem, props: mediaLocationPopupProps) => {
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [mediaLocationPopup.selectedType]
  )

  const setMediaLocationPopupSelectedValue = useCallback(
    async (e: string, props: mediaLocationPopupProps) => {
      if (e && e !== '') {
        await mediaLocationAction(e)
      }
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [mediaLocationPopup.selectedValue]
  )

  const setMediaLocationPopupDeleteTotalSelect = useCallback(
    async (commonList: mediaLocationListProps[], props: mediaLocationPopupProps) => {
      const selectedIdParams = props.selectedType.map(e => e.label)
      const getIdParams = commonList.map(e => e.name)
      const difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: difference.map(e => {
            return {
              id: e?.toString() ?? '',
              label: e ?? '',
            }
          }),
        })
      )
    },
    [mediaLocationPopup.selectedType]
  )

  const setMediaLocationPopupSelectedItem = useCallback(
    async (i: boolean, e: mediaLocationListProps, props: mediaLocationPopupProps) => {
      let dataList = [...props.selectedType]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.name?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.name.toString())
      }
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [mediaLocationPopup.selectedType]
  )

  const setMediaTypePopupActionByMediaTab = useCallback(
    async (e: boolean, value: string, origin: mediaKeywordParamProps) => {
      const params = {
        isOpen: e,
        selectedValue: value,
        selectedType: origin.mediaType,
      }
      dispatch(mediaTypePopupAction(params))
    },
    [mediaTypePopup]
  )

  const setPressMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      const params = {
        ...props,
        mediaTagList: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOptionParams.keywordParam.mediaTagList]
  )

  const setPressInformationType = useCallback(
    async (e: SelectListOptionItem, props: keywordParamProps) => {
      const params = {
        ...props,
        informationType: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOptionParams.keywordParam.informationType]
  )

  const setMediaFieldPopupActionByMediaTab = useCallback(
    async (e: boolean, value: string, origin: mediaSearchOptionProps, type: string) => {
      const params = {
        isOpen: e,
        type,
        selectedValue: value,
        selectedType: origin.keywordParam.mediaField,
      }
      dispatch(mediaFieldPopupAction(params))
    },
    [mediaFieldPopup]
  )

  const setBasicFieldPopupDeleteTotalSelect = useCallback(
    async (commonList: mediaFieldListProps[], props: mediaFieldPopupProps) => {
      const selectedIdParams = props.selectedType.map(e => e.label)
      const getIdParams = commonList.map(e => e.name)
      const difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      dispatch(
        basicFieldPopupAction({
          ...props,
          selectedType: difference.map(e => {
            return {
              id: e?.toString() ?? '',
              label: e ?? '',
            }
          }),
        })
      )
    },
    [basicFieldPopup.selectedType]
  )

  const setMediaFieldPopupDeleteTotalSelect = useCallback(
    async (commonList: mediaFieldListProps[], props: mediaFieldPopupProps) => {
      const selectedIdParams = props.selectedType.map(e => e.label)
      const getIdParams = commonList.map(e => e.name)
      const difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: difference.map(e => {
            return {
              id: e?.toString() ?? '',
              label: e ?? '',
            }
          }),
        })
      )
    },
    [mediaFieldPopup.selectedType]
  )

  const setBasicFieldPopupSelectedItem = useCallback(
    async (i: boolean, e: mediaFieldListProps, props: mediaFieldPopupProps) => {
      let dataList = [...props.selectedType]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.name?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.name.toString())
      }
      dispatch(
        basicFieldPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [basicFieldPopup.selectedType]
  )

  const setMediaFieldPopupSelectedItem = useCallback(
    async (i: boolean, e: mediaFieldListProps, props: mediaFieldPopupProps) => {
      let dataList = [...props.selectedType]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.name?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.name.toString())
      }
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [mediaFieldPopup.selectedType]
  )

  const setDeleteSelectedTypeBasicFieldPopup = useCallback(
    async (props: mediaFieldPopupProps) => {
      dispatch(
        basicFieldPopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [basicFieldPopup.selectedType]
  )

  const setDeleteSelectedTypeMediaFieldPopup = useCallback(
    async (props: mediaFieldPopupProps) => {
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [mediaFieldPopup.selectedType]
  )

  const setSelectedTypeBasicFieldPopup = useCallback(
    async (e: MbTagSearchTagItem, props: mediaFieldPopupProps) => {
      dispatch(
        basicFieldPopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [basicFieldPopup.selectedType]
  )

  const setSelectedTypeMediaFieldPopup = useCallback(
    async (e: MbTagSearchTagItem, props: mediaFieldPopupProps) => {
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [mediaFieldPopup.selectedType]
  )

  const setMediaFieldPopupSelectedValue = useCallback(
    async (e: string, props: mediaFieldPopupProps) => {
      if (e && e !== '') {
        await mediaFieldAction(e)
      }
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [mediaFieldPopup.selectedValue]
  )

  const setBasicFieldPopupSelectedValue = useCallback(
    async (e: string, props: mediaFieldPopupProps) => {
      if (e && e !== '') {
        await basicFieldAction(e)
      }
      dispatch(
        basicFieldPopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [basicFieldPopup.selectedValue]
  )

  const setPressSystemType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        system: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOptionParams.additionalParam.system]
  )

  const setBasicLocationPopupSelectedItem = useCallback(
    async (i: boolean, e: fieldListProps, props: basicLocationPopupProps) => {
      let dataList = [...props.selectedType]
      if (!i) {
        dataList = [
          ...dataList,
          {
            id: e.name?.toString() ?? '',
            label: e.name ?? '',
          },
        ]
      } else {
        dataList = dataList.filter(k => k.id !== e.name.toString())
      }
      dispatch(
        basicLocationPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    },
    [basicLocationPopup.selectedType]
  )

  const setDeleteSelectedTypeBasicLocationPopup = useCallback(
    async (props: basicLocationPopupProps) => {
      dispatch(
        basicLocationPopupAction({
          ...props,
          selectedType: [],
        })
      )
    },
    [basicLocationPopup.selectedType]
  )

  const mediaLocationPopupAdjustMediaSearch = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          mediaArea: e,
        })
      )
    },
    [mediaSearchOptionParams.keywordParam.mediaArea]
  )

  const mediaLocationPopupAdjustAdditionalParam = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        pressAdditionalParamAction({
          ...props,
          mediaArea: e,
        })
      )
    },
    [pressSearchOptionParams.additionalParam.mediaArea]
  )

  const mediaFieldPopupAdjustMediaSearch = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      dispatch(
        mediaSearchOptionAction({
          ...props,
          mediaField: e,
        })
      )
    },
    [mediaSearchOptionParams.keywordParam.mediaField]
  )

  const mediaFieldPopupAdjustAdditionalParam = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        pressAdditionalParamAction({
          ...props,
          mediaField: e,
        })
      )
    },
    [pressSearchOptionParams.additionalParam.mediaField]
  )

  const setBasicLocationPopupSelectedValue = useCallback(
    async (e: string, props: basicLocationPopupProps) => {
      if (e && e !== '') {
        await basicLocationAction(e)
      }
      dispatch(
        basicLocationPopupAction({
          ...props,
          selectedValue: e,
        })
      )
    },
    [basicLocationPopup.selectedValue]
  )

  const setSelectedTypeBasicLocationPopup = useCallback(
    async (e: MbTagSearchTagItem, props: basicLocationPopupProps) => {
      dispatch(
        basicLocationPopupAction({
          ...props,
          selectedType: props.selectedType.filter(item => item.id !== e.id),
        })
      )
    },
    [basicLocationPopup.selectedType]
  )

  const setBasicLocationPopupDeleteTotalSelect = useCallback(
    async (commonList: fieldListProps[], props: basicLocationPopupProps) => {
      const selectedIdParams = props.selectedType.map(e => e.label)
      const getIdParams = commonList.map(e => e.name)
      const difference = selectedIdParams.filter(item => !getIdParams.includes(item))
      dispatch(
        basicLocationPopupAction({
          ...props,
          selectedType: difference.map(e => {
            return {
              id: e?.toString() ?? '',
              label: e ?? '',
            }
          }),
        })
      )
    },
    [basicLocationPopup.selectedType]
  )

  const setPressAreaAction = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      dispatch(
        pressSearchOptionAction({
          ...props,
          area: e,
        })
      )
    },
    [pressSearchOptionParams.keywordParam.area]
  )

  const setOpenfilterJournalSubParamActions = useCallback(
    async (e: filterSubParamActionsProps[]) => {
      dispatch(setFilterJournalSubParamActions(e))
    },
    [filterJournalSubParamActions]
  )

  const setMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: mediaKeywordParamProps) => {
      const params = {
        ...props,
        mediaTagList: e,
      }
      dispatch(mediaSearchOptionAction(params))
    },
    [mediaSearchOptionParams.keywordParam.mediaTagList]
  )

  const setOpenfilterMediaSubParamActions = useCallback(
    async (e: filterSubParamActionsProps[]) => {
      dispatch(setFilterMediaSubParamActions(e))
    },
    [filterMediaSubParamActions]
  )

  const setPressSocialMedia = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        pressAdditionalParamAction({
          ...props,
          social: e,
        })
      )
    },
    [pressSearchOptionParams.additionalParam.social]
  )

  const setPressPortal = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        pressAdditionalParamAction({
          ...props,
          portal: e,
        })
      )
    },
    [pressSearchOptionParams.additionalParam.portal]
  )

  const setPressAdditionalField = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      dispatch(
        pressAdditionalParamAction({
          ...props,
          mediaField: e,
        })
      )
    },
    [pressSearchOptionParams.additionalParam.mediaField]
  )

  const setPressAdditionMediaTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        mediaGroupList: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOptionParams.additionalParam.mediaGroupList]
  )

  const setPressAdditionMediaTargetList = useCallback(
    async (e: MbTagSearchTagItem[], props: additionalParamProps) => {
      const params = {
        ...props,
        mediaTargetList: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOptionParams.additionalParam.mediaTargetList]
  )

  const setPressTagAdditionDeleteControl = useCallback(
    async (props: additionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaTargetList') {
        params.mediaTargetList = []
      } else if (type === 'mediaField') {
        params.mediaField = []
      } else if (type === 'mediaArea') {
        params.mediaArea = []
      } else if (type === 'mediaGroupList') {
        params.mediaGroupList = []
      } else if (type === 'portal') {
        params.portal = []
      } else if (type === 'social') {
        params.social = []
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOptionParams.additionalParam]
  )

  const setPressAdditionTagControl = useCallback(
    async (e: MbTagSearchTagItem, props: additionalParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'mediaTargetList') {
        params.mediaTargetList = props.mediaTargetList.filter(item => item.id !== e.id)
      } else if (type === 'mediaField') {
        params.mediaField = props.mediaField.filter(item => item.id !== e.id)
      } else if (type === 'mediaArea') {
        params.mediaArea = props.mediaArea.filter(item => item.id !== e.id)
      } else if (type === 'mediaGroupList') {
        params.mediaGroupList = props.mediaGroupList.filter(item => item.id !== e.id)
      } else if (type === 'portal') {
        params.portal = props.portal.filter(item => item.id !== e.id)
      } else if (type === 'social') {
        params.social = props.social.filter(item => item.id !== e.id)
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOptionParams.additionalParam]
  )

  const setPressLanguageType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        languageParam: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOptionParams.additionalParam.languageParam]
  )

  const setPressCountType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        count: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOptionParams.additionalParam.count]
  )

  const setPressLimitType = useCallback(
    async (e: SelectListOptionItem, props: additionalParamProps) => {
      const params = {
        ...props,
        limit: e,
      }
      dispatch(pressAdditionalParamAction(params))
    },
    [pressSearchOptionParams.additionalParam.limit]
  )

  const setResetSearchOption = useCallback(async () => {
    dispatch(resetSearchOption())
  }, [pressSearchOptionParams, mediaSearchOptionParams, searchActivate])

  const setPressPublishingPeriod = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      dispatch(
        pressSearchOptionAction({
          ...props,
          publishingPeriod: e,
        })
      )
    },
    [pressSearchOptionParams.keywordParam.publishingPeriod]
  )

  const setPressOccupation = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      dispatch(
        pressSearchOptionAction({
          ...props,
          occupation: e,
        })
      )
    },
    [pressSearchOptionParams.keywordParam.occupation]
  )

  const setPressKeywordField = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      dispatch(
        pressSearchOptionAction({
          ...props,
          field: e,
        })
      )
    },
    [pressSearchOptionParams.keywordParam.field]
  )

  const setNewsKeywordValueAction = useCallback(
    async (e: string, props: keywordParamProps) => {
      const params = {
        ...props,
        newsKeywordValue: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOptionParams.keywordParam.newsKeywordValue]
  )

  const setPressTagDeleteControl = useCallback(
    async (props: keywordParamProps, type: string) => {
      let params = {
        ...props,
      }
      if (type === 'journalistTagList') {
        params.journalistTagList = []
      } else if (type === 'field') {
        params.field = []
      } else if (type === 'area') {
        params.area = []
      } else if (type === 'mediaTagList') {
        params.mediaTagList = []
      } else if (type === 'mediaType') {
        params.mediaType = []
      } else if (type === 'occupation') {
        params.occupation = []
      } else if (type === 'position') {
        params.position = []
      } else if (type === 'keyword') {
        params.keyword = []
      } else if (type === 'department') {
        params.department = []
      } else if (type === 'publishingPeriod') {
        params.publishingPeriod = []
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOptionParams.keywordParam]
  )

  const setPressJournalistTagList = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      const params = {
        ...props,
        journalistTagList: e,
      }
      dispatch(pressSearchOptionAction(params))
    },
    [pressSearchOptionParams.keywordParam.journalistTagList]
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

  const setRegisterMediaPhotoPopupAction = useCallback(
    (hooks: registerMediaPhotoPopupProps) => dispatch(registerMediaPhotoPopupAction(hooks)),
    [registerMediaPhotoPopup]
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

  const setaddPersonalContactWebsite = useCallback(
    (e: string, props: addPersonalContactProps) => {
      const param = {
        ...props,
        website: e,
        websiteErr: '',
      }
      dispatch(addPersonalContactAction(param))
    },
    [addPersonalContactPopup.website, addPersonalContactPopup.websiteErr]
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

  const setAddPersonalContactAction = useCallback(
    (hooks: addPersonalContactProps) => dispatch(addPersonalContactAction(hooks)),
    [addPersonalContactPopup]
  )

  const setPressMediaUnBlockPopupAction = useCallback(
    (props: pressMediaUnBlockPopupProps) => {
      dispatch(pressMediaUnBlockPopupAction(props))
    },
    [pressMediaUnBlockPopup]
  )

  const setProfileImageId = useCallback(() => dispatch(profileImageIdAction(0)), [profileImageId])

  const setContentListImageId = useCallback(() => dispatch(contentListImageIdAction(0)), [contentListImageId])

  const setRegisterJournalPhotoPopupAction = useCallback(
    (hooks: registerJournalPhotoPopupProps) => dispatch(registerJournalPhotoPopupAction(hooks)),
    [registerJournalPhotoPopup]
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

  const setPressIdParamsAction = useCallback(
    async (
      e: ESearchJournalistDocumentDto,
      param: pressSearchOptionProps,
      idKey: number,
      dto: ESearchJournalistCondDto,
      tempOwnerKey: boolean,
      tempEditPageOpen: boolean
    ) => {
      const filter = setObjectToBase64({
        ...dto,
        ...param.additionalParam,
        ...param.keywordParam,
        journalist_id: Number(e.jrnlst_id),
        media_id: 0,
        media_saved_search: 0,
        journal_saved_search: Number(idKey),
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      const res = await checkPressUserInvalid(e)
      dispatch(
        pressIdParamsAction({
          param: e,
          ...res,
        })
      )
      await router.replace(`/contacts/saved-search?filter=${filter}`, undefined, { shallow: true })
    },
    [journalIdKeyParam, journalIdKey]
  )

  const setPressNoticeClose = useCallback(
    (id: number) => {
      dispatch(pressDuplicationIdListSaga([...pressDuplicationIdList, id]))
    },
    [pressCheckDuplicateParam]
  )

  const setMediaNoticeClose = useCallback(
    (id: number) => {
      dispatch(mediaDuplicationIdListSaga([...mediaDuplicationIdList, id]))
    },
    [mediaCheckDuplicateParam]
  )

  const setFieldKeywordValueAction = useCallback(
    async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
      dispatch(
        pressSearchOptionAction({
          ...props,
          field: e,
        })
      )
    },
    [pressSearchOptionParams.keywordParam.field]
  )
  //
  // const mediaFieldPopupAdjust = async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
  //   const param = {
  //     ...props,
  //     field: e,
  //   }
  //   dispatch(pressSearchOptionAction(param))
  // }

  const setSelectedDeleteContent = useCallback(
    (param: contentDeletePopupProps) => dispatch(contentDeletePopupAction(param)),
    [contentDeletePopup]
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

  const setSearchedNewsOpenActionAction = useCallback(
    (hooks: boolean) => dispatch(isSearchedNewsOpenAction(hooks)),
    [isSearchedNewsOpen]
  )

  const setDuplicationMediaPopupAction = useCallback(
    (props: duplicationMediaPopupProps) => {
      dispatch(duplicationMediaPopupAction(props))
    },
    [duplicationMediaPopup]
  )

  const setMediaSearchContentKeyList = useCallback(
    async (e: boolean, actionKey: ESearchMediaDocumentDto, hook: ESearchMediaDocumentDto[]) => {
      let dataList: ESearchMediaDocumentDto[] = [...hook]
      if (e) {
        dataList = [...dataList, actionKey]
      } else {
        dataList = dataList.filter(i => i?.mid !== actionKey?.mid)
      }
      const isOption = await mediaCalculateButtonOption(dataList)
      dispatch(searchContentKeyMediaListAction({ param: dataList, isTag: isOption }))
    },
    [searchContentKeyList]
  )

  const setPressSearchContentKeyList = useCallback(
    async (e: boolean, actionKey: ESearchJournalistDocumentDto, hook: ESearchJournalistDocumentDto[]) => {
      let dataList: ESearchJournalistDocumentDto[] = [...hook]
      if (e) {
        dataList = [...dataList, actionKey]
      } else {
        dataList = dataList.filter(i => i?.jrnlst_id !== actionKey?.jrnlst_id)
      }
      const isOption = await mediaCalculateButtonOption(dataList)
      dispatch(searchContentKeyMediaListAction({ param: dataList, isTag: isOption }))
    },
    [searchContentKeyList]
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

  const setMediaParamKeywordButtonAction = useCallback(
    (e: boolean) => {
      dispatch(mediaParamKeywordButtonAction(e))
    },
    [mediaParamKeywordButton]
  )

  const setIsPressFilterSubParamAction = useCallback(
    async (
      mainId: number,
      subId: number,
      pressApi: ESearchJournalistCondDto,
      pressData: pressSearchOptionProps,
      tempOwnerKey: boolean
    ) => {
      const filter = setObjectToBase64({
        ...pressApi,
        ...pressData.keywordParam,
        ...pressData.additionalParam,
        journalist_id: mainId,
        media_id: 0,
        media_saved_search: 0,
        journal_saved_search: subId,
        editPageOpen: true,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/contacts/saved-search?filter=${filter}`, undefined, { shallow: true })
      dispatch(isFilterSubParamAction(true))
    },
    [isFilterSubParam]
  )

  const setIsMediaFilterSubParamAction = useCallback(
    async (
      mainId: number,
      subId: number,
      mediaApi: ESearchMediaCondDto,
      mediaParamData: mediaSearchOptionProps,
      tempOwnerKey: boolean
    ) => {
      const filter = setObjectToBase64({
        ...mediaApi,
        ...mediaParamData.keywordParam,
        ...mediaParamData.additionalParam,
        journalist_id: 0,
        media_id: mainId,
        media_saved_search: subId,
        journal_saved_search: 0,
        editPageOpen: true,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/media/saved-search?filter=${filter}`, undefined, { shallow: true })
      dispatch(isFilterSubParamAction(true))
    },
    [isFilterSubParam]
  )

  const setPressParamsExpandButtonAction = useCallback(
    (e: boolean) => {
      dispatch(pressParamsExpandButtonAction(e))
    },
    [pressParamsExpandButton]
  )

  const setPressAllSearchContentKeyList = useCallback(
    async (isCheck: boolean, origin: ESearchJournalistDocumentDto[], newItems: ESearchJournalistDocumentDto[]) => {
      let isTagChecked = true
      let newItemsList = [...newItems]
      let dataList: ESearchJournalistDocumentDto[] = newItemsList.filter(
        item1 => !origin.some(item2 => item1.jrnlst_id === item2.jrnlst_id)
      )
      for await (const newItemsListElement of dataList) {
        if (isTagChecked) {
          if (newItemsListElement.owner && newItemsListElement.owner?.gid !== userInfo.userId) {
            isTagChecked = false
          }
        }
      }
      if (isCheck) {
        for await (const dataListElement of origin) {
          if (dataListElement.jrnlst_id) {
            if (isTagChecked) {
              if (dataListElement.owner && dataListElement.owner?.gid !== userInfo.userId) {
                isTagChecked = false
              }
            }
            dataList = [...dataList, dataListElement]
          }
        }
      }
      dispatch(searchContentKeyPressListAction({ param: dataList, isTag: isTagChecked }))
    },
    [searchContentKeyList]
  )

  const setMediaParamsExpandButtonAction = useCallback(
    (e: boolean) => {
      dispatch(mediaParamsExpandButtonAction(e))
    },
    [mediaParamsExpandButton]
  )

  const setMediaAllSearchContentKeyList = useCallback(
    async (isCheck: boolean, origin: ESearchMediaDocumentDto[], newItems: ESearchMediaDocumentDto[]) => {
      let isTagChecked = true
      let newItemsList = [...newItems]
      let dataList: ESearchMediaDocumentDto[] = newItemsList.filter(
        item1 => !origin.some(item2 => item1.mid === item2.mid)
      )
      for await (const newItemsListElement of dataList) {
        if (isTagChecked) {
          if (newItemsListElement.owner && newItemsListElement.owner?.gid !== userInfo.userId) {
            isTagChecked = false
          }
        }
      }
      if (isCheck) {
        for await (const dataListElement of origin) {
          if (dataListElement.mid) {
            if (isTagChecked) {
              if (dataListElement.owner && dataListElement.owner?.gid !== userInfo.userId) {
                isTagChecked = false
              }
            }
            dataList = [...dataList, dataListElement]
          }
        }
      }
      dispatch(searchContentKeyMediaListAction({ param: dataList, isTag: isTagChecked }))
    },
    [searchContentKeyList]
  )

  const setSavedJournalListKeywordAction = useCallback(
    async (e: string, list: JournalistSrchDto[]) => {
      if (e === '') {
        dispatch(resetSavedJournalListKeywordAction(list))
      } else {
        dispatch(savedJournalListKeywordAction(e))
      }
    },
    [savedJournalListKeyword]
  )

  const setSavedSearchPopupTitleOnChange = useCallback(
    async (param: string, origin: savedSearchPopupProps) => {
      const params = {
        ...origin,
        name: param,
        nameErr: '',
      }
      dispatch(savedSearchPopupAction(params))
    },
    [savedSearchPopup.name]
  )

  const setSavedSearchPopupSelectedUserChange = useCallback(
    async (param: SelectListOptionItem, origin: savedSearchPopupProps) => {
      const params = {
        ...origin,
        selectedUser: param,
      }
      dispatch(savedSearchPopupAction(params))
    },
    [savedSearchPopup.selectedUser]
  )

  const setSavedSearchPopupTargetShareSettingOnChange = useCallback(
    async (param: SelectListOptionItem, origin: savedSearchPopupProps) => {
      const params = {
        ...origin,
        scropTarget: param,
      }
      dispatch(savedSearchPopupAction(params))
    },
    [savedSearchPopup.scropTarget]
  )

  const setSavedSearchPopupShareSettingOnChange = useCallback(
    async (param: SelectListOptionItem, origin: savedSearchPopupProps) => {
      const params = {
        ...origin,
        scrop: param,
      }
      dispatch(savedSearchPopupAction(params))
    },
    [savedSearchPopup.scrop]
  )

  const setInitSavedSearchPopupAction = useCallback(async () => {
    dispatch(
      savedSearchPopupAction({
        isOpen: false,
        isOwner: false,
        key: 0,
        name: '',
        type: '',
        nameErr: '',
        originName: '',
        scrop: { id: '', name: '' },
        scropTarget: { id: '', name: '' },
        userList: [],
        selectedUser: { id: '', name: '' },
      })
    )
  }, [savedSearchPopup])

  const setSavedMediaListKeywordAction = useCallback(
    async (e: string, list: MediaSrchDto[]) => {
      if (e === '') {
        dispatch(resetSavedMediaListKeywordAction(list))
      } else {
        dispatch(savedMediaListKeywordAction(e))
      }
    },
    [savedMediaListKeyword]
  )

  const changeGroupId = async (params: any) => {
    let conditions = getObjectFromBase64(params)
    let temp = conditions.currents as GroupDtoForUser
    if (conditions.group && conditions.group.groupId) {
      const { status, message } = await updateUserSelectGroup.mutateAsync({ id: conditions.group.groupId as number })
      if (status === 'S') {
        temp = conditions.group as GroupDtoForUser
        dispatch(setUserSelectGroupAction(conditions.group.groupId))
      } else {
        openToast(message?.message, 'error')
      }
      dispatch(selectDefaultUserGroupAction({ currentGroup: temp, groupBar: status !== 'S', isLoading: false }))
    }
  }

  const setQueryParam = async (list: string[]) => {
    let res = {
      param: '',
      data: '',
    }
    if (list.length > 0) {
      for await (const re of list) {
        const query = re.split('=')
        if (query.length > 0) {
          res = {
            param: query[0],
            data: query[1],
          }
        }
      }
    }
    return res
  }

  const init = async () => {
    let isType = router.pathname === '/media/saved-search' ? 'media' : 'press'
    let tempIsFilter = false
    let tempSavedJournalAuth = false
    let tempSavedMediaAuth = false
    let isDtoFilter = false
    let tempOwnerKey = 0
    let media_id = 0
    let journal_id = 0
    let journal_saved_search = 0
    let media_saved_search = 0
    let tempSearchKeywordOption = ''
    let querysParam = ''
    let preloadCommonCode: CommonCode[] = []
    let tempMediaSubTypeList: mediaSubTypeListProps[] = []
    let tempMediaValueList: SelectListOptionItem[] = []
    let tempMediaInfoTypeList: SelectListOptionItem[] = []
    let tempMediaPubCycleList: SelectListOptionItem[] = []
    let tempMediaPortalCodeList: SelectListOptionItem[] = []
    let tempMediaTypeList: SelectListOptionItem[] = []
    let tempJournalistOccupationList: SelectListOptionItem[] = []
    let tempJournalistSocialFilterList: SelectListOptionItem[] = []
    let tempSavedMediaList: MediaSrchDto[] = []
    let tempSavedJournalList: JournalistSrchDto[] = []
    let tempJournalList: ESearchJournalistDocumentDto[] = []
    let tempJournalIdParams: ESearchJournalistDocumentDto | null = null
    let tempMediaIdParams: ESearchMediaDocumentDto | null = null
    let tempMediaList: ESearchMediaDocumentDto[] = []
    let pressParam: pressSearchOptionProps = pressInitParams
    let mediaParam: mediaSearchOptionProps = mediaInitParams
    let journalFilterSub = subJournalFilterListList
    let pressFilterSubActions = subJournalFilterOptionsList
    let mediaFilterSub = subMediaFilterListList
    let mediaFilterSubActions = subMediaFilterOptionsList
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    let filterParam: UseGetJournalistCustomSearchListParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
    }
    let pressDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      sort: ['name!asc', 'news.recent_3m_count!desc'],
      groupId: userSelectGroup,
    }
    let mediaDto: ESearchMediaCondDto = {
      page: 1,
      size: 20,
      sort: ['name!asc'],
      groupId: userSelectGroup,
    }
    let tempJournalDecodeList = {
      beemail: '',
      mobile: '',
      landline: '',
      landlineShared: '',
      fax: '',
    }
    dispatch(initSearchAction())
    dispatch(initPressMediaListBookPopupAction())
    try {
      if (window.location.search && window.location.search.substring(1).split('&').length > 0) {
        const subParams = window.location.search.substring(1).split('&')
        const querys = await setQueryParam(subParams)
        if (querys && querys.param === 'filter') {
          const dto = await conditionConvert(querys.data)
          if (dto) {
            tempIsFilter = dto.tempIsFilter
            journal_saved_search = dto.journal_saved_search
            media_saved_search = dto.media_saved_search
            journal_id = dto.journalist_id
            media_id = dto.media_id
            pressDto = dto.pressDto
            mediaDto = dto.mediaDto
            mediaParam = dto.mediaParam
            pressParam = dto.pressParam
            isDtoFilter = dto.isDtoFilter
            mediaFilterSubActions = dto.mediaFilterSubActions
            pressFilterSubActions = dto.pressFilterSubActions
            tempSearchKeywordOption = dto.tempSearchKeywordOption
            if (dto.tempOwnerKey > 0 && userInfo.userId) {
              tempOwnerKey = userInfo.userId
              filterParam.ownerId = userInfo.userId
            }
            if (dto.journal_saved_search > 0) {
              isType = 'press'
            } else if (dto.media_saved_search > 0) {
              isType = 'media'
            }
            console.log('pressParam 1', pressParam)
          }
        } else if (querys && querys.param === 'journal_contact_id' && querys.data !== '') {
          journal_saved_search = Number(querys.data)
          querysParam = querys.param
          console.log('journal_saved_search', journal_saved_search)
        } else if (querys && querys.param === 'media_contact_id' && querys.data !== '') {
          media_saved_search = Number(querys.data)
          querysParam = querys.param
          console.log('media_saved_search', media_saved_search)
        } else if (querys && querys.param === 'group_change' && querys.data !== '') {
          //media_saved_search = Number(querys.data)
          //querysParam = querys.param
          console.log('group_change', querys.data)
          await changeGroupId(querys.data)
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
            return { id: e.code, name: e.name, extra: e.count?.toString() }
          })
          dispatch(filterInformationAction([{ id: '', name: '선택', extra: '' }, ...tempMediaValueList]))
        } else if (re.id === 'MEDIA_INFO_TYPE') {
          tempMediaInfoTypeList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
            //return { id: e.code, name: e.name, extra: e.count?.toString() }
          })
          dispatch(filterMediaInfoTypeAction([{ id: '', name: '선택', extra: '' }, ...tempMediaInfoTypeList]))
        } else if (re.id === 'PUB_CYCLE') {
          tempMediaPubCycleList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name, extra: e.count?.toString() }
          })
          dispatch(filterPubCycleAction(tempMediaPubCycleList))
        } else if (re.id === 'PORTAL_CODE') {
          tempMediaPortalCodeList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name, extra: e.count?.toString() }
          })
          dispatch(filterPortalCodeAction([{ id: '', name: '선택', extra: '' }, ...tempMediaPortalCodeList]))
        } else if (re.id === 'ACTION_STATE_FILTER') {
          dispatch(
            actionStateFilterAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name, extra: e.count?.toString() }
              })
            )
          )
        } else if (re.id === 'ACTION_CATEGORY_ALL') {
          dispatch(
            actionCategoryListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name, extra: e.count?.toString() }
              })
            )
          )
        } else if (re.id === 'PUBLISHER_TYPE') {
          dispatch(
            publisherTypeAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name, extra: e.count?.toString() }
              })
            )
          )
        } else if (re.id === 'JRNLST_SOCIAL_FILTER_ID') {
          tempJournalistSocialFilterList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name, extra: e.count?.toString() }
          })
          dispatch(journalistSocialFilterListAction(tempJournalistSocialFilterList))
        } else if (re.id === 'JOURNALIST_OCCUPATION') {
          tempJournalistOccupationList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name, extra: e.count?.toString() }
          })
          dispatch(journalistOccupationListAction(tempJournalistOccupationList))
        } else if (re.id === 'ACTION_STATE') {
          dispatch(
            actionStateListAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name, extra: e.count?.toString() }
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
          dispatch(filterMediaTypeAction(tempMediaTypeList))
          dispatch(mediaSubTypeListAction(tempMediaSubTypeList))
        } else if (re.id === 'JOURNALIST_INFO_TYPE') {
          dispatch(
            journalistInfoTypeListAction([
              { id: '', name: '선택', extra: '' },
              ...preloadCommonCode.map(e => {
                //return { id: e.code, name: e.name, extra: e.count?.toString() }
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (re.id === 'LANGUAGE') {
          dispatch(
            languageListAction([
              { id: '', name: '선택', extra: '' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name, extra: e.count?.toString() }
              }),
            ])
          )
        } else if (re.id === 'MEDIA_COUNT') {
          dispatch(
            mediaCountListAction([
              { id: '', name: '선택', extra: '' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name, extra: e.count?.toString() }
              }),
            ])
          )
        } else if (re.id === 'JOURNALIST_BLOCK_YN') {
          dispatch(
            journalistBlockYNListAction([
              { id: '', name: '선택', extra: '' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name, extra: e.count?.toString() }
              }),
            ])
          )
        } else if (re.id === 'MEDIA_JRNLIST_NAME_REVEALED_YN') {
          dispatch(
            mediaNameRevealedYNListAction([
              { id: '', name: '선택', extra: '' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name, extra: e.count?.toString() }
              }),
            ])
          )
        } else if (re.id === 'MEDIA_BLOCK_YN') {
          dispatch(
            mediaBlockYNListAction([
              { id: '', name: '선택', extra: '' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name, extra: e.count?.toString() }
              }),
            ])
          )
        }
      }
      const savedJournalData = await getPressSavedSearchList(filterParam, journal_saved_search, isType)
      if (journal_saved_search < 1) {
        pressDto = savedJournalData.apiDto
        journal_saved_search = savedJournalData.id
        pressParam = savedJournalData.apiParams
      } else if (querysParam === 'journal_contact_id') {
        pressDto = savedJournalData.apiDto
        pressParam = savedJournalData.apiParams
      }
      tempSavedJournalAuth = savedJournalData.isAuth
      tempSavedJournalList = savedJournalData.list
      const savedMediaData = await getMediaSavedSearchList(filterParam, media_saved_search, isType)
      if (media_saved_search < 1) {
        mediaDto = savedMediaData.apiDto
        media_saved_search = savedMediaData.id
        mediaParam = savedMediaData.apiParams
      } else if (querysParam === 'media_contact_id') {
        mediaDto = savedMediaData.apiDto
        mediaParam = savedMediaData.apiParams
      }
      tempSavedMediaList = savedMediaData.list
      tempSavedMediaAuth = savedMediaData.isAuth
      dispatch(
        setFilterPressMediaDataAction({
          pressDto,
          pressParam,
          tempSavedJournalList,
          journal_saved_search,
          mediaDto,
          mediaParam,
          tempSavedMediaList,
          media_saved_search,
          savedJournalAuth: tempSavedJournalAuth,
          savedMediaAuth: tempSavedMediaAuth,
          tempOwnerKey,
          tempIsFilter,
        })
      )
      if (isType === 'press') {
        if (journal_saved_search > 0) {
          const res = await getJournalist(pressDto)
          if (res) {
            const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
            const totalSize = res.totalElements as number
            const totalPage = Math.ceil(totalSize / pressDto.size)
            const find = journalData.find(k => k.jrnlst_id === journal_id)
            journal_id = find
              ? journal_id
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
            if (isDtoFilter) {
              const getFilterData = await getJournalist({
                ...savedJournalData.apiDto,
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
          dispatch(
            setinitPressListAction({
              listDefine: isType,
              journalistId: journal_id,
              journalFilterSub: journalFilterSub,
              tempJournalIdParams: tempJournalIdParams,
              pageCount: tempPageCount,
              tempJournalList: tempJournalList,
              pressFilterSubActions: pressFilterSubActions,
              tempSearchKeywordOption,
              journalDecodeList: tempJournalDecodeList,
            })
          )
        }
      } else {
        const res = await getMediaList(mediaDto)
        if (res) {
          const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
          const totalSize = res.totalElements as number
          const totalPage = Math.ceil(totalSize / mediaDto.size)
          const find = mediaData.find(k => k.mid === media_id)
          media_id = find ? media_id : mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0
          tempMediaIdParams = find ? find : mediaData.length > 0 ? (mediaData[0] ? mediaData[0] : null) : null
          tempMediaList = mediaData
          tempPageCount = {
            totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
          }
          if (isDtoFilter) {
            const getFilterData = await getMediaList({
              ...savedMediaData.apiDto,
              filterFieldList: [],
              filterLocationList: [],
              filterCategoryList: [],
              filterValue: '',
              filterPubCycleList: [],
              filterPortalList: [],
              filterSourceType: [],
              page: 1,
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
            await mediaPersonalContactInfo(tempMediaIdParams.mid ? tempMediaIdParams.mid : 0)
            await mediaExcluded(tempMediaIdParams.mid ? tempMediaIdParams.mid : 0)
            await checkMediaUserInvalid(tempMediaIdParams)
          }
          dispatch(
            setinitMediaListAction({
              listDefine: isType,
              mediaId: media_id,
              mediaFilterSub: mediaFilterSub,
              tempMediaIdParams: tempMediaIdParams,
              pageCount: tempPageCount,
              tempMediaList: tempMediaList,
              mediaFilterSubActions: mediaFilterSubActions,
              tempSearchKeywordOption,
            })
          )
        }
      }
    } catch (e) {}

    dispatch(journalLoadingAction(false))
    dispatch(mediaLoadingAction(false))
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
    dispatch(checkSavedSearchUserPressAction(duplicationData))
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
          dispatch(checkSavedSearchUserPressAction(null))
        }
      }
    }

    return tempJournalDecodeList
  }

  const checkMediaUserInvalid = async (e: ESearchMediaDocumentDto) => {
    if (e.isSysInfo) {
      if (e.contacts?.all?.beemail && e.contacts?.all?.beemail) {
        await getBlockUserInfoData(e.contacts?.all?.beemail)
      } else {
        dispatch(isJournalUserBlockAction(defaultUserBlockData))
        dispatch(isMediaUserBlockAction(defaultUserBlockData))
      }
      dispatch(checkSavedSearchUserMediaAction(null))
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
        dispatch(checkSavedSearchUserMediaAction(null))
      }
    }
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

  const getPressSavedSearchList = async (
    code: UseGetJournalistCustomSearchListParams,
    keyId: number,
    isType: string
  ) => {
    let pressDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      sort: ['name!asc', 'news.recent_3m_count!desc'],
      groupId: userSelectGroup,
    }
    let isAuth = false
    let param: JournalistSrchDto[] = []
    let categoryId = keyId
    let conditions: JournalistSrchDto | null = null
    let pressParam: pressSearchOptionProps = pressInitParams
    dispatch(savedJournalListLoadingAction(true))
    try {
      const { status, data, message } = await apiGetJournalistCustomSearchList(code)
      if (status === 'S') {
        const res = data as PageableDataDto<PressMediaCustomSearchListItem>
        if (res.content && res.content.length > 0) {
          param = res.content as JournalistSrchDto[]
          if (isType === 'press') {
            if (categoryId > 0) {
              const getParam = param.find(e => e.jrnlstSrchId === categoryId)
              conditions = getParam ? getParam : param.length > 0 ? param[0] : null
            } else {
              categoryId = param.length > 0 ? (param[0].jrnlstSrchId ? param[0].jrnlstSrchId : 0) : 0
              conditions = param.length > 0 ? param[0] : null
            }
          }
          if (conditions && conditions.conditions) {
            const res = await conditionConvert(conditions.conditions, 'press')
            if (res) {
              isAuth = userInfo.userId === conditions.owner?.userId ? true : conditions?.shareCode === 'WRITABLE'
              pressParam = res.pressParam
              pressDto = res.pressDto
              if (pressParam.keywordParam.keyword && pressParam.keywordParam.keyword.length > 0) {
                pressDto.sort = [`_score!desc`]
              } else if (pressParam.keywordParam.newsKeywordValue && pressParam.keywordParam.newsKeywordValue !== '') {
                pressDto.sort = [`_score!desc`]
              }
            }
          }
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    dispatch(savedJournalListLoadingAction(false))
    return {
      list: param,
      id: categoryId,
      apiDto: pressDto,
      apiParams: pressParam,
      isAuth,
    }
  }

  const getMediaSavedSearchList = async (
    code: UseGetJournalistCustomSearchListParams,
    keyId: number,
    isType: string
  ) => {
    let mediaDto: ESearchMediaCondDto = {
      page: 1,
      size: 20,
      sort: ['name!asc'],
      groupId: userSelectGroup,
    }
    let isAuth = false
    let param: MediaSrchDto[] = []
    let categoryId = keyId
    let conditions: MediaSrchDto | null = null
    let mediaParam: mediaSearchOptionProps = mediaInitParams
    dispatch(savedMediaListLoadingAction(true))
    try {
      const { status, data, message } = await apiGetMediaCustomSearchList(code)
      if (status === 'S') {
        const res = data as PageableDataDto<PressMediaCustomSearchListItem>
        if (res.content && res.content.length > 0) {
          param = res.content as MediaSrchDto[]
          if (isType === 'media') {
            if (categoryId > 0) {
              const getParam = param.find(e => e.mediaSrchId === categoryId)
              conditions = getParam ? getParam : param.length > 0 ? param[0] : null
            } else {
              categoryId = param.length > 0 ? (param[0].mediaSrchId ? param[0].mediaSrchId : 0) : 0
              conditions = param.length > 0 ? param[0] : null
            }
          }
          if (conditions && conditions.conditions) {
            const res = await conditionConvert(conditions.conditions, 'media')
            if (res) {
              isAuth = userInfo.userId === conditions.owner?.userId ? true : conditions?.shareCode === 'WRITABLE'
              mediaParam = res.mediaParam
              mediaDto = res.mediaDto
              if (mediaParam.keywordParam.keyword.length > 0) {
                mediaDto.sort = [`_score!desc`]
              }
            }
          }
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    dispatch(savedMediaListLoadingAction(false))
    return {
      list: param,
      id: categoryId,
      apiDto: mediaDto,
      apiParams: mediaParam,
      isAuth,
    }
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

  const conditionConvert = async (confitions: string, type?: string) => {
    let res = null
    let isDtoFilter = false
    let tempSearchKeywordOption = ''
    let pressDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      sort: ['name!asc', 'news.recent_3m_count!desc'],
      groupId: userSelectGroup,
    }
    let mediaDto: ESearchMediaCondDto = {
      page: 1,
      size: 20,
      sort: ['name!asc'],
      groupId: userSelectGroup,
    }
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
    let tempIsFilter = false
    let tempOwnerKey = 0
    let isType = type ? type : 'press'
    let media_id = 0
    let journalist_id = 0
    let journal_saved_search = 0
    let media_saved_search = 0
    let pressParam: pressSearchOptionProps = pressInitParams
    let mediaParam: mediaSearchOptionProps = mediaInitParams
    let conditions = getObjectFromBase64(confitions)
    if (conditions && conditions !== '') {
      tempIsFilter = conditions.editPageOpen ? conditions.editPageOpen : false
      console.log('tempIsFilter', tempIsFilter)
      media_id = conditions.media_id ? conditions.media_id : 0
      journalist_id = conditions.journalist_id ? conditions.journalist_id : 0
      journal_saved_search = conditions.journal_saved_search ? conditions.journal_saved_search : 0
      media_saved_search = conditions.media_saved_search ? conditions.media_saved_search : 0
      if (!type) {
        if (journal_saved_search > 0) {
          isType = 'press'
        } else if (media_saved_search > 0) {
          isType = 'media'
        }
      }
      if (isType === 'media') {
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
        console.log('mediaParam 0', mediaParam)
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
          isDtoFilter = true
        }
        if (conditions.ownerKey && conditions.ownerKey !== '') {
          tempOwnerKey = conditions.ownerKey
        }
        if (conditions.filterFieldList && conditions.filterFieldList.length > 0) {
          mediaDto.filterFieldList = conditions.filterFieldList
          isDtoFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterCategory')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterFieldList
          }
        }
        if (conditions.filterLocationList && conditions.filterLocationList.length > 0) {
          mediaDto.filterLocationList = conditions.filterLocationList
          isDtoFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterLocation')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterLocationList
          }
        }
        if (conditions.filterCategoryList && conditions.filterCategoryList.length > 0) {
          mediaDto.filterCategoryList = conditions.filterCategoryList
          isDtoFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterType')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterCategoryList
          }
        }
        if (conditions.filterValue && conditions.filterValue !== '') {
          mediaDto.filterValue = conditions.filterValue
          isDtoFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterInformation')
          if (!isNaN(find)) {
            // @ts-ignore
            mediaFilterSubActions[find].values = [conditions.filterValue]
          }
        }
        if (conditions.filterPubCycleList && conditions.filterPubCycleList.length > 0) {
          mediaDto.filterPubCycleList = conditions.filterPubCycleList
          isDtoFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterPubCycle')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterPubCycleList
          }
        }
        if (conditions.filterPortalList && conditions.filterPortalList.length > 0) {
          mediaDto.filterPortalList = conditions.filterPortalList
          isDtoFilter = true
          const find = mediaFilterSubActions.findIndex(e => e.id === 'filterPortal')
          if (!isNaN(find)) {
            mediaFilterSubActions[find].values = conditions.filterPortalList
          }
        }
        if (conditions.filterSourceType && conditions.filterSourceType.length > 0) {
          mediaDto.filterSourceType = conditions.filterSourceType
          isDtoFilter = true
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
        console.log('pressParam 0', pressParam)
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
          isDtoFilter = true
        }
        if (conditions.ownerKey && conditions.ownerKey !== '') {
          tempOwnerKey = conditions.ownerKey
        }
        if (conditions.filterFieldList && conditions.filterFieldList.length > 0) {
          pressDto.filterFieldList = conditions.filterFieldList
          isDtoFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterCategory')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterFieldList
          }
        }
        if (conditions.filterLocationList && conditions.filterLocationList.length > 0) {
          pressDto.filterLocationList = conditions.filterLocationList
          isDtoFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterLocation')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterLocationList
          }
        }
        if (conditions.filterOccupationList && conditions.filterOccupationList.length > 0) {
          pressDto.filterOccupationList = conditions.filterOccupationList
          isDtoFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterOccupation')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterOccupationList
          }
        }
        if (conditions.filterCategoryList && conditions.filterCategoryList.length > 0) {
          pressDto.filterCategoryList = conditions.filterCategoryList
          isDtoFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterType')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterCategoryList
          }
        }
        if (conditions.filterValue && conditions.filterValue !== '') {
          pressDto.filterValue = conditions.filterValue
          isDtoFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterInformation')
          if (!isNaN(find)) {
            // @ts-ignore
            pressFilterSubActions[find].values = [conditions.filterValue]
          }
        }
        if (conditions.filterPubCycleList && conditions.filterPubCycleList.length > 0) {
          pressDto.filterPubCycleList = conditions.filterPubCycleList
          isDtoFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterPubCycle')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterPubCycleList
          }
        }
        if (conditions.filterPortalList && conditions.filterPortalList.length > 0) {
          pressDto.filterPortalList = conditions.filterPortalList
          isDtoFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterPortal')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterPortalList
          }
        }
        if (conditions.filterSourceType && conditions.filterSourceType.length > 0) {
          pressDto.filterSourceType = conditions.filterSourceType
          isDtoFilter = true
          const find = pressFilterSubActions.findIndex(e => e.id === 'filterSourceType')
          if (!isNaN(find)) {
            pressFilterSubActions[find].values = conditions.filterSourceType
          }
        }
        if (conditions.filterSocialList && conditions.filterSocialList.length > 0) {
          pressDto.filterSocialList = conditions.filterSocialList
          isDtoFilter = true
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
        mediaParam: mediaParam,
        mediaDto: mediaDto,
        pressParam: pressParam,
        pressDto: pressDto,
        media_id,
        journalist_id,
        journal_saved_search,
        media_saved_search,
        pressFilterSubActions,
        mediaFilterSubActions,
        tempIsFilter,
        tempSearchKeywordOption,
        tempOwnerKey,
        isDtoFilter,
      }
    }
    return res
  }

  const getCommonCode = async (code: string) => {
    let res: CommonCode[] = []
    let tempParam = {
      parentCode: code,
    }
    if (code === 'JOURNALIST_BLOCK_YN') {
      tempParam = {
        parentCode: code,
        // @ts-ignore
        groupId: userSelectGroup,
      }
    } else if (code === 'MEDIA_BLOCK_YN') {
      tempParam = {
        parentCode: code,
        // @ts-ignore
        groupId: userSelectGroup,
      }
    }
    const { status, data, message } = await apiGetCommonCode(tempParam)
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const openPressEditPage = async (e: boolean, params: pressSearchOptionProps) => {
    if (e) {
      await setSearchOptionEssentialList()
    }
    dispatch(pressEditPageOpenAction({ editPageOpen: e, pressListParams: params }))
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

  const openMediaEditPage = async (e: boolean, params: mediaSearchOptionProps) => {
    if (e) {
      await setSearchOptionEssentialList()
    }
    dispatch(mediaEditPageOpenAction({ editPageOpen: e, mediaListParams: params }))
  }

  const getJournalistByKeyword = async (param: string, tempIsOwner: boolean, idKey: number) => {
    let filterParam: UseGetJournalistCustomSearchListParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
      title: param,
    }
    if (tempIsOwner) filterParam.ownerId = userInfo.userId
    const { status, data, message } = await apiGetJournalistCustomSearchList(filterParam)
    if (status === 'S') {
      const res = data as PageableDataDto<PressMediaCustomSearchListItem>
      if (res.content && res.content.length > 0) {
        dispatch(
          setFilterPressDataActionByKeyword({
            tempSavedJournalList: res.content,
          })
        )
      }
    }
  }

  const getMediaListByKeyword = async (param: string, tempIsOwner: boolean, idKey: number) => {
    let filterParam: UseGetJournalistCustomSearchListParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
      title: param,
    }
    if (tempIsOwner) filterParam.ownerId = userInfo.userId
    const { status, data, message } = await apiGetMediaCustomSearchList(filterParam)
    if (status === 'S') {
      const res = data as PageableDataDto<PressMediaCustomSearchListItem>
      if (res.content && res.content.length > 0) {
        dispatch(
          setFilterMediaDataActionByKeyword({
            tempSavedMediaList: res.content,
          })
        )
      }
    }
  }

  const mediaCalculateButtonOption = async (props: ESearchMediaDocumentDto[]) => {
    let isTag = true
    if (props.length > 0) {
      for await (const mbTagSearchTagItem of props) {
        let tempIsTag =
          !mbTagSearchTagItem.isSysInfo && mbTagSearchTagItem.owner
            ? mbTagSearchTagItem.owner?.uid === userInfo.userId
            : true
        if (isTag) {
          isTag = tempIsTag
        }
      }
    }

    return isTag
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

  const setIsCloseMediaFilterSubParamAction = async (
    mainId: number,
    mediaApi: ESearchMediaCondDto,
    mediaParamData: mediaSearchOptionProps,
    tempOwnerKey: boolean
  ) => {
    const mediaApiDto = {
      ...mediaApi,
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
    dispatch(mediaLoadingAction(true))
    try {
      const res = await getMediaList(mediaApiDto)
      if (res) {
        const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / mediaApiDto.size)
        const filter = setObjectToBase64({
          ...mediaApiDto,
          ...mediaParamData.keywordParam,
          ...mediaParamData.additionalParam,
          journalist_id: 0,
          media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
          media_saved_search: mainId,
          journal_saved_search: 0,
          editPageOpen: false,
          ownerKey: tempOwnerKey ? userInfo.userId : 0,
        })
        await router.replace(`/media/saved-search?filter=${filter}`, undefined, { shallow: true })
        if (mediaData && mediaData.length > 0) {
          await mediaPersonalContactInfo(mediaData[0].mid ? mediaData[0].mid : 0)
          await mediaExcluded(mediaData[0].mid ? mediaData[0].mid : 0)
          await checkMediaUserInvalid(mediaData[0])
        }
        dispatch(
          isMediaFilterSubParamAction({
            dto: mediaApiDto,
            isFilterSubParam: false,
            mediaData,
            pageCount: {
              totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
              totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
            },
            mediaFilterSub: await getMediaFilterOptionControlData(
              res,
              mediaApiDto,
              filterInformation,
              filterMediaInfoType,
              filterPubCycle,
              filterPortalCode,
              filterMediaType,
              mediaSubTypeList
            ),
            mediaFilterSubActions: subMediaFilterOptionsList,
          })
        )
      }
    } catch (e) {}
    dispatch(mediaLoadingAction(false))
  }

  const setIsClosePressFilterSubParamAction = async (
    mainId: number,
    pressApi: ESearchJournalistCondDto,
    pressData: pressSearchOptionProps,
    tempOwnerKey: boolean
  ) => {
    let tempJournalDecodeList = {
      beemail: '',
      mobile: '',
      landline: '',
      landlineShared: '',
      fax: '',
    }
    let pressAPiDto: ESearchJournalistCondDto = {
      ...pressApi,
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
    dispatch(journalLoadingAction(true))
    try {
      const res = await getJournalist(pressAPiDto)
      if (res) {
        const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / pressAPiDto.size)
        const filter = setObjectToBase64({
          ...pressAPiDto,
          ...pressData.keywordParam,
          ...pressData.additionalParam,
          journalist_id: journalData.length > 0 ? (journalData[0].jrnlst_id ? journalData[0].jrnlst_id : 0) : 0,
          media_id: 0,
          media_saved_search: 0,
          journal_saved_search: mainId,
          editPageOpen: false,
          ownerKey: tempOwnerKey ? userInfo.userId : 0,
        })
        await router.replace(`/contacts/saved-search?filter=${filter}`, undefined, { shallow: true })
        if (journalData && journalData.length > 0) {
          tempJournalDecodeList = await checkPressUserInvalid(journalData[0])
        }
        dispatch(
          isPressFilterSubParamAction({
            dto: pressAPiDto,
            isFilterSubParam: false,
            journalData,
            pageCount: {
              totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
              totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
            },
            journalDecodeList: tempJournalDecodeList,
            journalFilterSub: await getPressFilterOptionControlData(
              res,
              pressAPiDto,
              filterInformation,
              journalistSocialFilterList,
              journalistOccupationList,
              filterMediaInfoType,
              filterPubCycle,
              filterPortalCode,
              filterMediaType,
              mediaSubTypeList
            ),
            filterJournalSubParamActions: subJournalFilterOptionsList,
          })
        )
      }
    } catch (e) {}
    dispatch(journalLoadingAction(false))
  }

  const updateMediaSavedSearch = async (props: savedSearchPopupProps) => {
    const param = {
      id: props.key,
      mediaInfo: {
        groupId: userSelectGroup,
        title: props.name,
        shareCode: props.scrop.id,
        shareTargetCode: props.scropTarget.id,
        ownerId: Number(props.selectedUser.id),
      },
    }
    const { status, data, message } = await updateMediaCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('맞춤 검색을 수정했습니다', 'success')
      //await router.replace(`/media/saved-search?media_contact_id=${props.key}`, undefined, { shallow: true })
      await init()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const checkUpdateMediaSavedSearchValidation = async (props: savedSearchPopupProps) => {
    let setTitleErr = ''
    let isProcess = false
    if (props.name === '') {
      setTitleErr = '검색명을 입력하세요'
    } else if (props.name.length > 100) {
      setTitleErr = '검색명은 100자를 넘을 수 없습니다.'
    } else {
      if (props.originName === props.name) {
        isProcess = true
      } else {
        const { status, message } = await mediaRegisterCheck.mutateAsync({
          oldName: '',
          newName: props.name,
        })
        if (status === 'S') {
          isProcess = true
        } else {
          setTitleErr = '같은 이름의 검색명이 이미 있습니다'
        }
      }
    }
    dispatch(
      savedSearchPopupAction({
        ...props,
        nameErr: setTitleErr,
      })
    )
    return isProcess
  }

  const checkUpdatePressSavedSearchValidation = async (props: savedSearchPopupProps) => {
    let setTitleErr = ''
    let isProcess = false
    if (props.name === '') {
      setTitleErr = '검색명을 입력하세요'
    } else if (props.name.length > 100) {
      setTitleErr = '검색명은 100자를 넘을 수 없습니다.'
    } else {
      if (props.originName === props.name) {
        isProcess = true
      } else {
        const { status, message } = await pressRegisterCheck.mutateAsync({
          oldName: '',
          newName: props.name,
        })
        if (status === 'S') {
          isProcess = true
        } else {
          setTitleErr = '같은 이름의 검색명이 이미 있습니다'
        }
      }
    }
    dispatch(
      savedSearchPopupAction({
        ...props,
        nameErr: setTitleErr,
      })
    )
    return isProcess
  }

  const updatePressSavedSearch = async (props: savedSearchPopupProps) => {
    const param = {
      id: props.key,
      journalistInfo: {
        groupId: userSelectGroup,
        title: props.name,
        shareCode: props.scrop.id,
        shareTargetCode: props.scropTarget.id,
        ownerId: Number(props.selectedUser.id),
      },
    }
    const { status, data, message } = await updateJournalistCustomSearch.mutateAsync(param)
    if (status === 'S') {
      openToast('맞춤 검색을 수정했습니다', 'success')
      //await router.replace(`/contacts/saved-search?journal_contact_id=${props.key}`, undefined, { shallow: true })
      await init()
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setOwnerKey = async (type: string, tempOwnerKey: boolean, tempEditPage: boolean) => {
    const filter = setObjectToBase64({
      editPageOpen: tempEditPage,
      ownerKey: tempOwnerKey ? userInfo.userId : 0,
    })
    if (type === 'press') {
      await router.replace(`/contacts/saved-search?filter=${filter}`, undefined, { shallow: true })
    } else {
      await router.replace(`/media/saved-search?filter=${filter}`, undefined, { shallow: true })
    }
    await init()
  }

  const getPressList = async (
    id: JournalistSrchDto,
    props: pressSearchOptionProps,
    dto: ESearchJournalistCondDto,
    tempEditPage: boolean,
    tempOwnerKey: boolean
  ) => {
    let journalFilterSub: NavigationLinkItem[] = []
    let tempJournalData: ESearchJournalistDocumentDto[] = []
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
    dispatch(journalLoadingAction(true))
    try {
      const res = await getJournalist(dto)
      if (res) {
        const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / dto.size)
        const filter = setObjectToBase64({
          ...dto,
          ...props.keywordParam,
          ...props.additionalParam,
          journalist_id: journalData.length > 0 ? (journalData[0].jrnlst_id ? journalData[0].jrnlst_id : 0) : 0,
          media_id: 0,
          media_saved_search: 0,
          journal_saved_search: Number(id.jrnlstSrchId),
          editPageOpen: tempEditPage,
          ownerKey: tempOwnerKey ? userInfo.userId : 0,
        })
        await router.replace(`/contacts/saved-search?filter=${filter}`, undefined, { shallow: true })
        journalFilterSub = await getPressFilterOptionControlData(
          res,
          dto,
          filterInformation,
          journalistSocialFilterList,
          journalistOccupationList,
          filterMediaInfoType,
          filterPubCycle,
          filterPortalCode,
          filterMediaType,
          mediaSubTypeList
        )
        if (journalData && journalData.length > 0) {
          tempJournalDecodeList = await checkPressUserInvalid(journalData[0])
        }
        tempJournalData = journalData && journalData.length > 0 ? journalData : []
        tempPageCount = {
          totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
          totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
        }
      }
    } catch (e) {}
    dispatch(
      setOnChangePressAction({
        // @ts-ignore
        journalData: tempJournalData,
        pageCount: tempPageCount,
        journalDecodeList: tempJournalDecodeList,
        // @ts-ignore
        journalFilterSub,
      })
    )
    dispatch(journalLoadingAction(false))
  }

  const setPressPositionValueAction = (refs: RefObject<HTMLInputElement>, items: keywordParamProps) => {
    let param = {
      ...items,
      position: items.position,
    }
    if (items.position.length <= 2) {
      if (refs.current?.value.trim()) {
        param = {
          ...items,
          position: [...items.position, { id: refs.current?.value.trim(), label: refs.current?.value.trim() }],
        }
      }
    } else {
      openToast('직책은 최대 3개까지 입력가능합니다.', 'warning')
    }

    dispatch(pressSearchOptionAction(param))
  }

  const setPressChangeCategoryId = async (param: JournalistSrchDto, tempEditPage: boolean, tempOwnerKey: boolean) => {
    if (param && param.jrnlstSrchId && param.conditions) {
      const res = await conditionConvert(param.conditions, 'press')
      if (res) {
        const dtoParam: ESearchJournalistCondDto = {
          ...res.pressDto,
          page: 1,
          size: 20,
          sort: ['name!asc', 'news.recent_3m_count!desc'],
        }
        if (res.pressParam.keywordParam.keyword && res.pressParam.keywordParam.keyword.length > 0) {
          dtoParam.sort = [`_score!desc`]
        } else if (
          res.pressParam.keywordParam.newsKeywordValue &&
          res.pressParam.keywordParam.newsKeywordValue !== ''
        ) {
          dtoParam.sort = [`_score!desc`]
        }
        dispatch(
          setChangePressSavedSearchTargetIdAction({
            pressDto: dtoParam,
            pressParam: res.pressParam,
            journal_saved_search: Number(param.jrnlstSrchId),
            savedJournalAuth: userInfo.userId === param.owner?.userId ? true : param?.shareCode === 'WRITABLE',
          })
        )
        await getPressList(param, res.pressParam, dtoParam, tempEditPage, tempOwnerKey)
      }
    }
  }

  const getMassMediaList = async (
    id: MediaSrchDto,
    props: mediaSearchOptionProps,
    dto: ESearchMediaCondDto,
    tempEditPage: boolean,
    tempOwnerKey: boolean
  ) => {
    let mediaFilterSub: NavigationLinkItem[] = []
    let tempMediaData: ESearchMediaDocumentDto[] = []
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    dispatch(mediaLoadingAction(true))
    try {
      const res = await getMediaList(dto)
      if (res) {
        const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / dto.size)
        const filter = setObjectToBase64({
          ...dto,
          ...props.keywordParam,
          ...props.additionalParam,
          journalist_id: 0,
          media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
          media_saved_search: Number(id.mediaSrchId),
          journal_saved_search: 0,
          editPageOpen: tempEditPage,
          ownerKey: tempOwnerKey ? userInfo.userId : 0,
        })
        await router.replace(`/media/saved-search?filter=${filter}`, undefined, { shallow: true })
        mediaFilterSub = await getMediaFilterOptionControlData(
          res,
          dto,
          filterInformation,
          filterMediaInfoType,
          filterPubCycle,
          filterPortalCode,
          filterMediaType,
          mediaSubTypeList
        )
        tempMediaData = mediaData && mediaData.length > 0 ? mediaData : []
        tempPageCount = {
          totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
          totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
        }
        if (mediaData && mediaData.length > 0) {
          await mediaPersonalContactInfo(mediaData[0].mid ? mediaData[0].mid : 0)
          await mediaExcluded(mediaData[0].mid ? mediaData[0].mid : 0)
          await checkMediaUserInvalid(mediaData[0])
        }
      }
    } catch (e) {}
    dispatch(
      setOnChangeMediaAction({
        mediaData: tempMediaData,
        pageCount: tempPageCount,
        mediaFilterSub,
      })
    )
    dispatch(mediaLoadingAction(false))
  }

  const setMediaChangeCategoryId = async (param: MediaSrchDto, tempEditPage: boolean, tempOwnerKey: boolean) => {
    if (param && param.conditions && param.mediaSrchId) {
      const res = await conditionConvert(param.conditions, 'media')
      if (res) {
        const dtoParam: ESearchMediaCondDto = {
          ...res.mediaDto,
          page: 1,
          size: 20,
          sort: ['name!asc'],
        }
        if (res.mediaParam.keywordParam.keyword.length > 0) {
          dtoParam.sort = [`_score!desc`]
        }
        dispatch(
          setChangeMediaSavedSearchTargetIdAction({
            mediaDto: dtoParam,
            mediaParam: res.mediaParam,
            media_saved_search: Number(param.mediaSrchId),
            savedMediaAuth: userInfo.userId === param.owner?.userId ? true : param?.shareCode === 'WRITABLE',
          })
        )
        await getMassMediaList(param, res.mediaParam, dtoParam, tempEditPage, tempOwnerKey)
      }
    }
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
    dispatch(checkSavedSearchUserMediaAction(duplicationData))
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
        await dataOnChangeAction({ personalContacts: 'change' }, { personalContacts: Number(idKey) }, 'press')
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

  const deletePersonalContact = async (idKey: string, type: string) => {
    try {
      const { status, message } = await deleteContactInfo.mutateAsync(Number(idKey))
      if (status === 'S') {
        openToast(message?.message, 'success')
        await dataOnChangeAction({ personalContacts: 'change' }, { personalContacts: Number(idKey) }, type)
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

  const resetPressSavedSearchList = async (ownerKey: boolean, idKey: number) => {
    let filterParam: UseGetJournalistCustomSearchListParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
    }
    if (ownerKey) filterParam.ownerId = userInfo.userId
    const savedJournalData = await getPressSavedSearchList(filterParam, idKey, 'press')
    dispatch(
      setResetPressSavedSearchListAction({
        tempSavedJournalList: savedJournalData.list,
      })
    )
  }

  const resetMediaSavedSearchList = async (ownerKey: boolean, idKey: number) => {
    let filterParam: UseGetJournalistCustomSearchListParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
    }
    if (ownerKey) filterParam.ownerId = userInfo.userId
    const savedJournalData = await getMediaSavedSearchList(filterParam, idKey, 'media')
    dispatch(
      setResetMediaSavedSearchListAction({
        tempSavedMediaList: savedJournalData.list,
      })
    )
  }

  const getUserList = async () => {
    let list: UserDtoForGroup[] = []
    const { status, data, message } = await apiGetActiveGroupInfo(userSelectGroup)
    if (status === 'S') {
      const res = data as GroupDto
      list = res.users && res.users?.length > 0 ? res.users : ([] as UserDtoForGroup[])
    } else {
      openToast(message?.message, 'error')
    }

    return list
  }

  const pressRegisterEditAction = async (
    apiParam: ESearchJournalistCondDto,
    keyId: number,
    props: pressSearchOptionProps,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const keywordParams = { ...props.keywordParam }
    const additionalParams = { ...props.additionalParam }
    const dto = await changePressSearchDto(apiParam, {
      keywordParam: { ...keywordParams },
      additionalParam: { ...additionalParams },
    })
    if (dto.isProcess) {
      const { status, data, message } = await updateJournalistCustomSearch.mutateAsync({
        id: keyId,
        journalistInfo: {
          conditions: setObjectToBase64({ ...props.keywordParam, ...props.additionalParam }),
        },
      })
      if (status === 'S') {
        const find = savedJournalList.find(e => e.jrnlstSrchId === keyId)
        if (find && find.title) {
          let actionDto: ESearchJournalistCondDto = {
            ...dto.pressDto,
            sort: ['name!asc', 'news.recent_3m_count!desc'],
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
          const filter = setObjectToBase64({
            ...actionDto,
            ...props.keywordParam,
            ...props.additionalParam,
            journalist_id: 0,
            media_id: 0,
            media_saved_search: 0,
            journal_saved_search: Number(keyId),
            editPageOpen: tempEditPageOpen,
            ownerKey: tempOwnerKey ? userInfo.userId : 0,
          })
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === find.shareCode)
          const findGroup = extendedShareScopeTargetList.find(e => e.id === find.shareTargetCode)
          const users = await getUserList()
          const userList =
            users.length > 0
              ? users.map(i => {
                  return { id: i.userId?.toString(), name: i.name }
                })
              : []
          await router.replace(`/contacts/saved-search?filter=${filter}`, undefined, { shallow: true })
          openToast(
            SavedSearchEditContext({
              valueName: find.title,
              onChangeAction: () => {
                dispatch(
                  savedSearchPopupAction({
                    isOpen: true,
                    isOwner: userInfo.userId === find.owner?.userId,
                    type: 'press',
                    key: find.jrnlstSrchId ? find.jrnlstSrchId : 0,
                    name: find?.title || '',
                    originName: find?.title || '',
                    nameErr: '',
                    scrop: {
                      id: find?.shareCode ? find.shareCode.toString() : '',
                      name: findShareScopeList?.name || '',
                    },
                    scropTarget: findGroup ? findGroup : { id: 'GROUP', name: '이 그룹' },
                    // @ts-ignore
                    userList: userList,
                    selectedUser: {
                      id: find.owner?.userId ? find.owner?.userId.toString() : '',
                      name: find.owner?.name || '',
                    },
                  })
                )
              },
            }),
            'success'
          )
        }
        await init()
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const mediaRegisterEditAction = async (
    apiParam: ESearchMediaCondDto,
    keyId: number,
    props: mediaSearchOptionProps,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const keywordParams = { ...props.keywordParam }
    const additionalParams = { ...props.additionalParam }
    const dto = await changeMediaSearchDto(apiParam, {
      keywordParam: { ...keywordParams },
      additionalParam: { ...additionalParams },
    })
    if (dto.isProcess) {
      let actionDto: ESearchMediaCondDto = {
        ...dto.mediaDto,
        sort: [`name!asc`],
        page: 1,
        filterFieldList: [],
        filterLocationList: [],
        filterCategoryList: [],
        filterValue: '',
        filterPubCycleList: [],
        filterPortalList: [],
        filterSourceType: [],
      }
      if (keywordParams.keyword && keywordParams.keyword.length > 0) {
        actionDto.sort = [`_score!desc`]
      }
      const { status, data, message } = await updateMediaCustomSearch.mutateAsync({
        id: keyId,
        mediaInfo: {
          conditions: setObjectToBase64({ ...props.keywordParam, ...props.additionalParam }),
        },
      })
      if (status === 'S') {
        const find = savedMediaList.find(e => e.mediaSrchId === keyId)
        if (find && find.title) {
          const filter = setObjectToBase64({
            ...actionDto,
            ...props.keywordParam,
            ...props.additionalParam,
            journalist_id: 0,
            media_id: 0,
            media_saved_search: Number(keyId),
            journal_saved_search: 0,
            editPageOpen: tempEditPageOpen,
            ownerKey: tempOwnerKey ? userInfo.userId : 0,
          })
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === find.shareCode)
          const findGroup = extendedShareScopeTargetList.find(e => e.id === find.shareTargetCode)
          const users = await getUserList()
          const userList =
            users.length > 0
              ? users.map(i => {
                  return { id: i.userId?.toString(), name: i.name }
                })
              : []
          await router.replace(`/media/saved-search?filter=${filter}`, undefined, { shallow: true })
          openToast(
            SavedSearchEditContext({
              valueName: find.title,
              onChangeAction: () => {
                dispatch(
                  savedSearchPopupAction({
                    isOpen: true,
                    isOwner: userInfo.userId === find.owner?.userId,
                    type: 'media',
                    key: find.mediaSrchId ? find.mediaSrchId : 0,
                    name: find?.title || '',
                    originName: find?.title || '',
                    nameErr: '',
                    scrop: {
                      id: find?.shareCode ? find.shareCode.toString() : '',
                      name: findShareScopeList?.name || '',
                    },
                    scropTarget: findGroup ? findGroup : { id: 'GROUP', name: '이 그룹' },
                    // @ts-ignore
                    userList: userList,
                    selectedUser: {
                      id: find.owner?.userId ? find.owner?.userId.toString() : '',
                      name: find.owner?.name || '',
                    },
                  })
                )
              },
            }),
            'success'
          )
        }
        await init()
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
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

  const mediaTypePopupAdjust = async (
    type: string,
    e: MbTagSearchTagItem[],
    props: keywordParamProps,
    mediaProps: mediaKeywordParamProps
  ) => {
    if (type === 'press') {
      dispatch(
        pressSearchOptionAction({
          ...props,
          mediaType: e,
        })
      )
    } else {
      dispatch(
        mediaSearchOptionAction({
          ...mediaProps,
          mediaType: e,
        })
      )
    }
  }

  const mediaLocationPopupAdjust = async (e: MbTagSearchTagItem[], props: keywordParamProps) => {
    const param = {
      ...props,
      area: e,
    }
    dispatch(pressSearchOptionAction(param))
  }

  const setBasicFieldPopupTotalSelect = async (commonList: mediaFieldListProps[], props: mediaFieldPopupProps) => {
    let dataList = [...props.selectedType]
    if (dataList.length > 0) {
      for await (const commonEle of commonList) {
        const find = dataList.find(k => k.id?.toString() === commonEle.name?.toString())
        if (!find) {
          dataList = [
            ...dataList,
            {
              id: commonEle.name?.toString() ?? '',
              label: commonEle.name ?? '',
            },
          ]
        }
      }
    } else {
      dataList = commonList.map(k => {
        return {
          id: k.name?.toString() ?? '',
          label: k.name ?? '',
        }
      })
    }
    if (dataList.length <= 30) {
      dispatch(
        basicFieldPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    }
  }

  const setPressAddAllExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchJournalistCondDto,
    params: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        await filterPressApiAction(filterDto, params, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setPressDeleteGroupExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchJournalistCondDto,
    params: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
      if (filterCount > 30) {
        openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
      } else {
        dispatch(isLimitFilterAction(filterCount))
        await filterPressApiAction(filterDto, params, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setPressAddExtraFilterSearch = async (
    e: ChangeEvent<HTMLInputElement>,
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchJournalistCondDto,
    params: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        await filterPressApiAction(filterDto, params, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const handleMediaChangeSort = async (
    e: SelectListOptionItem,
    i: SelectListOptionItem,
    sortValue: string,
    params: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
      'sort',
      idKey,
      tempOwnerKey,
      tempEditPageOpen
    )
  }

  const handleMediaChangeSize = async (
    e: number,
    params: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...params,
      page: 1,
      size: e,
    }
    await getMediaBySearchOption(apiParam, props, 'size', idKey, tempOwnerKey, tempEditPageOpen)
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

  const moveMediaDetail = async (props: number) => {
    await router.push(`/media/record/${props}`)
  }
  const moveJournalDetail = async (props: number) => {
    await router.push(`/contacts/record/${props}`)
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

  const handleMediaPaginationChange = async (
    e: number,
    params: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
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
        'page',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    }
  }
  const getMediaBySearchOption = async (
    params: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    type: string,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
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
        journalist_id: 0,
        media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
        media_saved_search: Number(idKey),
        journal_saved_search: 0,
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/media/saved-search?filter=${filter}`, undefined, { shallow: true })
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
        await mediaPersonalContactInfo(mediaData[0].mid ? mediaData[0].mid : 0)
        await mediaExcluded(mediaData[0].mid ? mediaData[0].mid : 0)
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
          mediaFilterSub,
          isResetSelectedNews: type === 'size' ? true : type === 'dto',
          type,
        })
      )
    }
    dispatch(mediaLoadingAction(false))
  }

  const handlePressChangeSort = async (
    e: SelectListOptionItem,
    i: SelectListOptionItem,
    sortValue: string,
    params: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        sort,
        page: 1,
      },
      props,
      'sort',
      idKey,
      tempOwnerKey,
      tempEditPageOpen
    )
  }

  const getPressBySearchOption = async (
    params: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    type: string,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        journalist_id: journalData.length > 0 ? (journalData[0].jrnlst_id ? journalData[0].jrnlst_id : 0) : 0,
        media_id: 0,
        media_saved_search: 0,
        journal_saved_search: Number(idKey),
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
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
          journalDecodeList: tempJournalDecodeList,
          journalFilterSub,
          isResetSelectedNews: type === 'size' ? true : type === 'dto',
          type,
        })
      )
      await router.replace(`/contacts/saved-search?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(journalLoadingAction(false))
  }

  const filterPressApiAction = async (
    filterDto: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    tempFilterSubParam: filterSubParamActionsProps[],
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        media_id: 0,
        media_saved_search: 0,
        journal_saved_search: Number(idKey),
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/contacts/saved-search?filter=${filter}`, undefined, { shallow: true })
      if (journalData && journalData.length > 0) {
        tempJournalDecodeList = await checkPressUserInvalid(journalData[0])
      }
      dispatch(
        setOnChangePressFilterSearchOptionAction({
          props,
          dto: filterDto,
          journalData,
          tempFilterSubParam: tempFilterSubParam,
          pageCount: {
            totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
          },
          journalDecodeList: tempJournalDecodeList,
        })
      )
    }
    dispatch(journalLoadingAction(false))
  }

  const filterMediaApiAction = async (
    filterDto: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    tempFilterSubParam: filterSubParamActionsProps[],
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        journalist_id: 0,
        media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
        media_saved_search: Number(idKey),
        journal_saved_search: 0,
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/media/saved-search?filter=${filter}`, undefined, { shallow: true })
      if (mediaData && mediaData.length > 0) {
        await mediaPersonalContactInfo(mediaData[0].mid ? mediaData[0].mid : 0)
        await mediaExcluded(mediaData[0].mid ? mediaData[0].mid : 0)
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
    }
    dispatch(mediaLoadingAction(false))
  }

  const setMediaExtractExtraFilterSearch = async (
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
      await filterMediaApiAction(filterDto, props, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
    }
  }

  const setPressExtractExtraFilterSearch = async (
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
      await filterPressApiAction(filterDto, props, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
    }
  }

  const setMediaAddAllExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchMediaCondDto,
    params: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        await filterMediaApiAction(filterDto, params, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setMediaDeleteGroupExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchMediaCondDto,
    params: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        await filterMediaApiAction(filterDto, params, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setMediaAddExtraFilterSearch = async (
    e: ChangeEvent<HTMLInputElement>,
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchMediaCondDto,
    params: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        await filterMediaApiAction(filterDto, params, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setInitPressFilterSubParamActionsAction = async (
    apiParam: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    let filterDto = {
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
    await filterPressApiAction(filterDto, props, subJournalFilterOptionsList, idKey, tempOwnerKey, tempEditPageOpen)
  }
  const setInitMediaFilterSubParamActionsAction = async (
    apiParam: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    let filterDto = {
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
    await filterMediaApiAction(filterDto, props, subMediaFilterOptionsList, idKey, tempOwnerKey, tempEditPageOpen)
  }

  const setMediaAddExtraSelectedFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
      await filterMediaApiAction(filterDto, props, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
    }
  }

  const setPressAddExtraSelectedFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
      await filterPressApiAction(filterDto, props, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
    }
  }
  const filterAddCount = async (list: SelectListOptionItem[], filteredList: Object[]) => {
    let res: SelectListOptionItem[] = []
    if (filteredList && filteredList) {
      for await (const argument of list) {
        let extra = ''
        if (argument.id !== '') {
          for (const extraElement of filteredList) {
            const find = extraElement
            if (find) {
              for (const [key, value] of Object.entries(find)) {
                if (argument.id.toString() === key.toString()) {
                  extra = value.toString() as string
                }
              }
            }
          }
        }
        res = [
          ...res,
          {
            id: argument.id,
            name: argument.name,
            extra: extra,
          },
        ]
      }
    }

    return res
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

  const searchMediaRegisterAction = async (
    hook: searchRegisterPopupProps,
    props: mediaSearchOptionProps,
    tempIsOwner: boolean,
    idKey: boolean
  ) => {
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
        await mediaRegisterAction(hook.title, props, tempIsOwner, idKey)
      } else {
        titleErr = message?.message ?? '같은 제목의 검색이 이미 있습니다.'
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

  const mediaRegisterAction = async (
    title: string,
    props: mediaSearchOptionProps,
    tempIsOwner: boolean,
    idKey: boolean
  ) => {
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
      await setOwnerKey('media', tempIsOwner, idKey)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const searchPressRegisterAction = async (
    hook: searchRegisterPopupProps,
    props: pressSearchOptionProps,
    ownerKey: boolean,
    idKey: boolean
  ) => {
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
        await pressRegisterAction(hook.title, props, ownerKey, idKey)
      } else {
        titleErr = message?.message ?? '같은 제목의 검색이 이미 있습니다.'
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

  const pressRegisterAction = async (
    title: string,
    props: pressSearchOptionProps,
    ownerKey: boolean,
    idKey: boolean
  ) => {
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
      await setOwnerKey('press', ownerKey, idKey)
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
  const createMediaPersonalContact = async (props: addPersonalContactProps, idKey: number) => {
    try {
      const { status, message } = await createUpdateMediaContact.mutateAsync({
        objectId: idKey,
        email: props.email,
        phone: props.phone,
        mobile: props.telephone,
        address: props.address,
      })
      if (status === 'S') {
        openToast('개인적 연락처를 추가했습니다.', 'success')
        await dataOnChangeAction({ personalContacts: 'change' }, { personalContacts: Number(idKey) }, 'media')
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

  const setPressKeywordAction = (refs: RefObject<HTMLInputElement>, items: keywordParamProps) => {
    let param = {
      ...items,
      keyword: items.keyword,
    }
    if (items.keyword.length <= 2) {
      if (refs.current?.value.trim()) {
        param = {
          ...items,
          keyword: [...items.keyword, { id: refs.current?.value.trim(), label: refs.current?.value.trim() }],
        }
      }
    } else {
      openToast('키워드는 최대 3개까지 입력가능합니다.', 'warning')
    }

    dispatch(pressSearchOptionAction(param))
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

  const mediaPhotoDeleteAdjust = async (target: number) => {
    const { status, message } = await deleteMediaPhoto.mutateAsync(target)
    if (status === 'S') {
      openToast('사진이 삭제되었습니다.', 'success')
      dispatch(setProfileImageIdAction(target))
    } else {
      openToast(message?.message, 'error')
    }
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

  const fieldListData = async (type: 'INDUSTRY' | 'LOCATION') => {
    let res: string[] = []
    const { status, data, message } = await apiGetMediaFieldType({ type })
    if (status === 'S') {
      res = data as string[]
    } else {
      openToast(message?.message, 'error')
    }

    return res
  }

  const filterListData = async () => {
    let res: IJournalistSearchFilter | null = null
    const { status, data, message } = await apiGetJournalistSearchFilter()
    if (status === 'S') {
      res = data as IJournalistSearchFilter
    } else {
      openToast(message?.message, 'error')
    }

    return res
  }

  const setMediaTypePopupAction = async (
    essentialList: SelectListOptionItem[],
    e: boolean,
    props: MbTagSearchTagItem[]
  ) => {
    let tempKeyword = ''
    if (e) {
      if (essentialList.length < 1) {
        const tempMediaType = await getCommonCode('MEDIA_TYPE')
        const list = tempMediaType.map(e => {
          return { id: e.commonCodeId.toString(), name: e.name, extra: e.count?.toString() }
        })
        dispatch(filterMediaTypeAction(list))
        if (tempMediaType && tempMediaType.length > 0) {
          tempKeyword = list[0].id
        }
      } else {
        tempKeyword = essentialList[0].id
      }
      await getParentCommonCodeId(Number(tempKeyword))
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      selectedValue: tempKeyword,
      selectedType: props,
    }
    dispatch(mediaTypePopupAction(params))
  }

  const getParentCommonCodeId = async (code: number) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({
      parentCode: 'MEDIA_SUB_TYPE',
      parentCommonCodeId: Number(code),
    })
    if (status === 'S') {
      res = data as CommonCode[]
    } else {
      openToast(message?.message, 'error')
    }

    dispatch(mediaTypePopupListAction(res))

    return res
  }

  const setSearchOptionEssentialList = async () => {
    let preloadCommonCode: CommonCode[] = []
    for await (const re of extendedSearchCommonCodeTargetList) {
      if (re.id === 'JOURNALIST_OCCUPATION') {
        preloadCommonCode = await getCommonCode(re.id)
      } else if (re.id === 'JOURNALIST_BLOCK_YN') {
        preloadCommonCode = await getCommonCode(re.id)
      } else if (re.id === 'JOURNALIST_INFO_TYPE') {
        preloadCommonCode = await getCommonCode(re.id)
      } else if (re.id === 'JRNLST_SOCIAL_FILTER_ID') {
        preloadCommonCode = await getCommonCode(re.id)
      } else if (re.id === 'MEDIA_BLOCK_YN') {
        preloadCommonCode = await getCommonCode(re.id)
      } else if (re.id === 'MEDIA_INFO_TYPE') {
        preloadCommonCode = await getCommonCode(re.id)
      } else if (re.id === 'LOCATION') {
        const tempLocation = await fieldListData(re.id)
        dispatch(mediaLocationPopupListAction(tempLocation))
      } else if (re.id === 'INDUSTRY') {
        const tempIndustry = await fieldListData(re.id)
        dispatch(mediaFieldPopupListAction(tempIndustry))
      } else if (re.id === 'FILTER') {
        const tempFilter = await filterListData()
        dispatch(filterDataListAction(tempFilter))
      } else {
        const find = frequentlyUsedCommonCode.data.find(fre => fre.parentCode === re.id)
        //@ts-ignore
        if (find && find.commonCodeList && find.commonCodeList.length > 0) {
          //@ts-ignore
          preloadCommonCode = find.commonCodeList
        } else {
          preloadCommonCode = await getCommonCode(re.id)
        }
      }
      let list = preloadCommonCode.map(e => {
        return { id: e.code, name: e.name, extra: e.count?.toString() }
      })
      if (re.id === 'MEDIA_VALUE') {
        dispatch(filterInformationAction([{ id: '', name: '선택', extra: '' }, ...list]))
      } else if (re.id === 'MEDIA_INFO_TYPE') {
        //@ts-ignore
        list = preloadCommonCode.map(e => {
          return { id: e.code, name: e.name }
        })
        dispatch(filterMediaInfoTypeAction([{ id: '', name: '선택', extra: '' }, ...list]))
      } else if (re.id === 'PUB_CYCLE') {
        dispatch(filterPubCycleAction(list))
      } else if (re.id === 'PORTAL_CODE') {
        dispatch(filterPortalCodeAction([{ id: '', name: '선택', extra: '' }, ...list]))
      } else if (re.id === 'JRNLST_SOCIAL_FILTER_ID') {
        list = preloadCommonCode.map(e => {
          return { id: e.code, name: e.name, extra: e.weight?.toString() }
        })
        dispatch(journalistSocialFilterListAction(list))
      } else if (re.id === 'JOURNALIST_OCCUPATION') {
        dispatch(journalistOccupationListAction(list))
      } else if (re.id === 'MEDIA_TYPE') {
        list = preloadCommonCode.map(e => {
          return { id: e.commonCodeId.toString(), name: e.name, extra: e.count?.toString() }
        })
        dispatch(filterMediaTypeAction(list))
      } else if (re.id === 'JOURNALIST_INFO_TYPE') {
        dispatch(
          journalistInfoTypeListAction([
            { id: '', name: '선택', extra: '' },
            ...preloadCommonCode.map(e => {
              //return { id: e.code, name: e.name, extra: e.count?.toString() }
              return { id: e.code, name: e.name }
            }),
          ])
        )
      } else if (re.id === 'LANGUAGE') {
        dispatch(
          languageListAction([
            { id: '', name: '선택', extra: '' },
            ...preloadCommonCode.map(e => {
              return { id: e.code, name: e.name, extra: e.count?.toString() }
            }),
          ])
        )
      } else if (re.id === 'MEDIA_COUNT') {
        dispatch(
          mediaCountListAction([
            { id: '', name: '선택', extra: '' },
            ...preloadCommonCode.map(e => {
              return { id: e.code, name: e.name, extra: e.count?.toString() }
            }),
          ])
        )
      } else if (re.id === 'JOURNALIST_BLOCK_YN') {
        dispatch(
          journalistBlockYNListAction([
            { id: '', name: '선택', extra: '' },
            ...preloadCommonCode.map(e => {
              return { id: e.code, name: e.name, extra: e.count?.toString() }
            }),
          ])
        )
      } else if (re.id === 'MEDIA_JRNLIST_NAME_REVEALED_YN') {
        dispatch(
          mediaNameRevealedYNListAction([
            { id: '', name: '선택', extra: '' },
            ...preloadCommonCode.map(e => {
              return { id: e.code, name: e.name, extra: e.count?.toString() }
            }),
          ])
        )
      } else if (re.id === 'MEDIA_BLOCK_YN') {
        dispatch(
          mediaBlockYNListAction([
            { id: '', name: '선택', extra: '' },
            ...preloadCommonCode.map(e => {
              return { id: e.code, name: e.name, extra: e.count?.toString() }
            }),
          ])
        )
      }
    }
  }

  const basicFieldAction = async (title: string) => {
    const { status, data, message } = await apiGetJournalistFieldSubData({ name: title })
    if (status === 'S') {
      const res = data as mediaFieldListProps[]
      dispatch(basicFieldListAction(res))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setBasicFieldPopupAction = async (essentialList: string[], e: boolean, props: keywordParamProps) => {
    let tempKeyword = ''
    if (e) {
      if (essentialList.length < 1) {
        const tempIndustry = await fieldListData('INDUSTRY')
        if (tempIndustry && tempIndustry.length > 0) {
          tempKeyword = tempIndustry[0]
        }
      } else {
        tempKeyword = essentialList[0]
      }
      await basicFieldAction(tempKeyword)
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      type: '',
      selectedValue: tempKeyword,
      selectedType: props.field,
    }
    dispatch(basicFieldPopupAction(params))
  }

  const setPressDepartmentAction = (refs: RefObject<HTMLInputElement>, items: keywordParamProps) => {
    let param = {
      ...items,
      department: items.department,
    }
    if (items.department.length <= 2) {
      if (refs.current?.value.trim()) {
        param = {
          ...items,
          department: [...items.department, { id: refs.current?.value.trim(), label: refs.current?.value.trim() }],
        }
      }
    } else {
      openToast('부서는 최대 3개까지 입력가능합니다.', 'warning')
    }
    dispatch(pressSearchOptionAction(param))
  }

  const selectedPressDeleteAction = async (param: contentDeletePopupProps, idKey: number, ownerKey: boolean) => {
    const { status, data, message } = await deleteJournalistCustomSearch.mutateAsync(param.key)
    if (status === 'S') {
      openToast(message?.message, 'success')
      if (idKey.toString() === param.key.toString()) {
        await router.replace('/contacts/saved-search')
        router.reload()
      } else {
        await resetPressSavedSearchList(ownerKey, idKey)
        dispatch(contentDeletePopupAction({ isOpen: false, key: 0, title: '', type: '' }))
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const selectedMediaDeleteAction = async (param: contentDeletePopupProps, idKey: number, ownerKey: boolean) => {
    const { status, data, message } = await deleteMediaCustomSearch.mutateAsync(param.key)
    if (status === 'S') {
      openToast(message?.message, 'success')
      if (idKey.toString() === param.key.toString()) {
        await router.replace('/media/saved-search')
        router.reload()
      } else {
        await resetMediaSavedSearchList(ownerKey, idKey)
        dispatch(contentDeletePopupAction({ isOpen: false, key: 0, title: '', type: '' }))
      }
    } else {
      openToast(message?.message, 'error')
    }
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
    dispatch(newsLoadingAction(false))
  }

  const changeMediaTab = async (e: string, idKey: number, props: ESearchMediaDocumentDto) => {
    if (e === 'news') {
      await getNewsSearchByMediaId(10, e, idKey)
    } else if (e === 'activity') {
      await getActivitySearchByMediaId(10, e, idKey)
    } else {
      await mediaPersonalContactInfo(props.mid ? props.mid : 0)
      await mediaExcluded(props.mid ? props.mid : 0)
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

  const changeMediaSearchDto = async (apiParam: ESearchMediaCondDto, params: mediaSearchOptionProps) => {
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
      pressDto.news = params.keywordParam.newsKeywordValue.toString()
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

  const pressKeywordSearch = async (
    e: string,
    params: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...params,
      filter: e,
      page: 1,
    }
    await getPressBySearchOption(apiParam, props, 'filter', idKey, tempOwnerKey, tempEditPageOpen)
  }

  const handlePressChangeSize = async (
    e: number,
    params: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...params,
      page: 1,
      size: e,
    }
    await getPressBySearchOption(apiParam, props, 'size', idKey, tempOwnerKey, tempEditPageOpen)
  }

  const handlePressPaginationChange = async (
    e: number,
    params: ESearchJournalistCondDto,
    props: pressSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
        'page',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    }
  }

  const setMediaIdParamsAction = useCallback(
    async (
      e: ESearchMediaDocumentDto,
      param: mediaSearchOptionProps,
      idKey: number,
      dto: ESearchMediaCondDto,
      tempOwnerKey: boolean,
      tempEditPageOpen: boolean
    ) => {
      const filter = setObjectToBase64({
        ...dto,
        ...param.additionalParam,
        ...param.keywordParam,
        journalist_id: 0,
        media_id: Number(e.mid),
        media_saved_search: Number(idKey),
        journal_saved_search: 0,
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await mediaPersonalContactInfo(e.mid ? Number(e.mid) : 0)
      await mediaExcluded(e.mid ? Number(e.mid) : 0)
      await checkMediaUserInvalid(e)
      dispatch(mediaIdParamsAction(e))
      await router.replace(`/media/saved-search?filter=${filter}`, undefined, { shallow: true })
    },
    [mediaIdKeyParam, mediaIdKey]
  )

  const mediaKeywordSearch = async (
    e: string,
    params: ESearchMediaCondDto,
    props: mediaSearchOptionProps,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...params,
      filter: e,
      page: 1,
    }
    await getMediaBySearchOption(apiParam, props, 'filter', idKey, tempOwnerKey, tempEditPageOpen)
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

  const changeSearchOption = async (
    props: pressSearchOptionProps,
    apiParam: ESearchJournalistCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    let keywordParams = { ...props.keywordParam }
    let additionalParams = { ...props.additionalParam }
    const dto = await changePressSearchDto(apiParam, {
      keywordParam: { ...keywordParams },
      additionalParam: { ...additionalParams },
    })
    if (dto.isProcess) {
      let actionDto: ESearchJournalistCondDto = {
        ...dto.pressDto,
        sort: ['name!asc', 'news.recent_3m_count!desc'],
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
        'dto',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const changeMediaSearchOption = async (
    props: mediaSearchOptionProps,
    apiParam: ESearchMediaCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    let keywordParams = { ...props.keywordParam }
    let additionalParams = { ...props.additionalParam }
    const dto = await changeMediaSearchDto(apiParam, {
      keywordParam: { ...keywordParams },
      additionalParam: { ...additionalParams },
    })
    if (dto.isProcess) {
      let actionDto: ESearchMediaCondDto = {
        ...dto.mediaDto,
        sort: [`name!asc`],
        page: 1,
        filterFieldList: [],
        filterLocationList: [],
        filterCategoryList: [],
        filterValue: '',
        filterPubCycleList: [],
        filterPortalList: [],
        filterSourceType: [],
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
        'dto',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const setPressTagDeleteControlSearch = async (
    e: MbTagSearchTagItem,
    props: pressSearchOptionProps,
    type: string,
    apiParam: ESearchJournalistCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
      let actionDto: ESearchJournalistCondDto = {
        ...dto.pressDto,
        sort: ['name!asc', 'news.recent_3m_count!desc'],
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
        'dto',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const setMediaTagDeleteControlSearch = async (
    e: MbTagSearchTagItem,
    props: mediaSearchOptionProps,
    type: string,
    apiParam: ESearchMediaCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
    const dto = await changeMediaSearchDto(apiParam, {
      keywordParam: { ...keywordParams },
      additionalParam: { ...additionalParams },
    })
    if (dto.isProcess) {
      let actionDto: ESearchMediaCondDto = {
        ...dto.mediaDto,
        sort: [`name!asc`],
        page: 1,
        filterFieldList: [],
        filterLocationList: [],
        filterCategoryList: [],
        filterValue: '',
        filterPubCycleList: [],
        filterPortalList: [],
        filterSourceType: [],
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
        'dto',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const setMediaTagControlSearch = async (
    props: mediaSearchOptionProps,
    type: string,
    apiParam: ESearchMediaCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
    const dto = await changeMediaSearchDto(apiParam, {
      keywordParam: tempKeywordParam,
      additionalParam: tempAdditionalParam,
    })
    if (dto.isProcess) {
      let actionDto: ESearchMediaCondDto = {
        ...dto.mediaDto,
        sort: [`name!asc`],
        page: 1,
        filterFieldList: [],
        filterLocationList: [],
        filterCategoryList: [],
        filterValue: '',
        filterPubCycleList: [],
        filterPortalList: [],
        filterSourceType: [],
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
        'dto',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  const basicLocationAction = async (title: string) => {
    const { status, data, message } = await apiGetJournalistLocationSubData({ name: title })
    if (status === 'S') {
      const res = data as mediaFieldListProps[]
      dispatch(basicLocationListAction(res))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const mediaLocationAction = async (title: string) => {
    const { status, data, message } = await apiGetMediaLocationSubData({ name: title })
    if (status === 'S') {
      const apiData = data as { name: string; itmems: mediaFieldListProps[] }
      const res = apiData.itmems as mediaFieldListProps[]
      dispatch(mediaLocationListAction(res))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setMediaFieldPopupTotalSelect = async (commonList: mediaFieldListProps[], props: mediaFieldPopupProps) => {
    let dataList = [...props.selectedType]
    if (dataList.length > 0) {
      for await (const commonEle of commonList) {
        const find = dataList.find(k => k.id?.toString() === commonEle.name?.toString())
        if (!find) {
          dataList = [
            ...dataList,
            {
              id: commonEle.name?.toString() ?? '',
              label: commonEle.name ?? '',
            },
          ]
        }
      }
    } else {
      dataList = commonList.map(k => {
        return {
          id: k.name?.toString() ?? '',
          label: k.name ?? '',
        }
      })
    }
    if (dataList.length <= 30) {
      dispatch(
        mediaFieldPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
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
    dispatch(
      afterPressRegistAddPressParamAction({
        list: pressList,
        pressParam: pressParam,
      })
    )
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
    dispatch(
      afterMediaRegistAddMediaParamAction({
        list: mediaList,
        mediaParam: mediaParam,
      })
    )
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

  const setMediaTypePopupTotalSelect = async (commonList: CommonCode[], props: mediaTypePopupProps) => {
    let dataList = [...props.selectedType]
    if (dataList.length > 0) {
      for await (const commonEle of commonList) {
        const find = dataList.find(k => k.id?.toString() === commonEle.code?.toString())
        if (!find) {
          dataList = [
            ...dataList,
            {
              id: commonEle.code?.toString() ?? '',
              label: commonEle.name ?? '',
            },
          ]
        }
      }
    } else {
      dataList = commonList.map(k => {
        return {
          id: k.code?.toString() ?? '',
          label: k.name ?? '',
        }
      })
    }
    if (dataList.length <= 30) {
      dispatch(
        mediaTypePopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    }
  }

  const setMediaLocationPopupTotalSelect = async (
    commonList: mediaLocationListProps[],
    props: mediaLocationPopupProps
  ) => {
    let dataList = [...props.selectedType]
    if (dataList.length > 0) {
      for await (const commonEle of commonList) {
        const find = dataList.find(k => k.id?.toString() === commonEle.name?.toString())
        if (!find) {
          dataList = [
            ...dataList,
            {
              id: commonEle.name?.toString() ?? '',
              label: commonEle.name ?? '',
            },
          ]
        }
      }
    } else {
      dataList = commonList.map(k => {
        return {
          id: k.name?.toString() ?? '',
          label: k.name ?? '',
        }
      })
    }
    if (dataList.length <= 30) {
      dispatch(
        mediaLocationPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    }
  }

  const setMediaLocationPopupAction = async (essentialList: string[], e: boolean, props: MbTagSearchTagItem[]) => {
    let tempKeyword = ''
    if (e) {
      if (essentialList.length < 1) {
        const tempIndustry = await fieldListData('LOCATION')
        if (tempIndustry && tempIndustry.length > 0) {
          tempKeyword = tempIndustry[0]
        }
      } else {
        tempKeyword = essentialList[0]
      }
      await mediaLocationAction(tempKeyword)
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      type: '',
      selectedValue: tempKeyword,
      selectedType: props,
    }
    dispatch(mediaLocationPopupAction(params))
  }

  const setMediaFieldPopupAction = async (essentialList: string[], e: boolean, props: MbTagSearchTagItem[]) => {
    let tempKeyword = ''
    if (e) {
      if (essentialList.length < 1) {
        const tempIndustry = await fieldListData('INDUSTRY')
        if (tempIndustry && tempIndustry.length > 0) {
          tempKeyword = tempIndustry[0]
        }
      } else {
        tempKeyword = essentialList[0]
      }
      await mediaFieldAction(tempKeyword)
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      type: '',
      selectedValue: tempKeyword,
      selectedType: props,
    }
    dispatch(mediaFieldPopupAction(params))
  }

  const mediaFieldAction = async (title: string) => {
    const { status, data, message } = await apiGetMediaFieldSubData({ name: title })
    if (status === 'S') {
      const apiData = data as { name: string; itmems: mediaFieldListProps[] }
      const res = apiData.itmems as mediaFieldListProps[]
      dispatch(mediaFieldListAction(res))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setBasicLocationPopupTotalSelect = async (commonList: fieldListProps[], props: basicLocationPopupProps) => {
    let dataList = [...props.selectedType]
    if (dataList.length > 0) {
      for await (const commonEle of commonList) {
        const find = dataList.find(k => k.id?.toString() === commonEle.name?.toString())
        if (!find) {
          dataList = [
            ...dataList,
            {
              id: commonEle.name?.toString() ?? '',
              label: commonEle.name ?? '',
            },
          ]
        }
      }
    } else {
      dataList = commonList.map(k => {
        return {
          id: k.name?.toString() ?? '',
          label: k.name ?? '',
        }
      })
    }
    if (dataList.length <= 30) {
      dispatch(
        basicLocationPopupAction({
          ...props,
          selectedType: dataList,
        })
      )
    } else {
      openToast('최대 30개까지 선택할 수 있습니다. 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
    }
  }

  const setBasicLocationPopupAction = async (essentialList: string[], e: boolean, props: pressSearchOptionProps) => {
    let tempKeyword = ''
    if (e) {
      if (essentialList.length < 1) {
        const tempIndustry = await fieldListData('LOCATION')
        if (tempIndustry && tempIndustry.length > 0) {
          tempKeyword = tempIndustry[0]
        }
      } else {
        tempKeyword = essentialList[0]
      }
      await basicLocationAction(tempKeyword)
    }
    const params = {
      isOpen: tempKeyword === '' ? false : e,
      type: '',
      selectedValue: tempKeyword,
      selectedType: props.keywordParam.area,
    }
    dispatch(basicLocationPopupAction(params))
  }

  const setPressTagControlSearch = async (
    props: pressSearchOptionProps,
    type: string,
    apiParam: ESearchJournalistCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
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
      let actionDto: ESearchJournalistCondDto = {
        ...dto.pressDto,
        sort: ['name!asc', 'news.recent_3m_count!desc'],
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
        'dto',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    } else {
      openToast('적어도 한개의 검색 조건이 필요합니다.', 'warning')
    }
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    editPageOpen,
    pageCount,
    listDefine,
    isOwner,
    pressDto,
    mediaDto,
    isFilterSubParam,
    savedJournalListLoading,
    savedMediaListLoading,
    savedMediaList,
    savedJournalList,
    savedJournalListKeyword,
    savedMediaListKeyword,
    mediaApiList,
    journalApiList,
    journalIdKey,
    mediaIdKey,
    pressListParams,
    mediaListParams,
    mediaLoading,
    journalLoading,
    savedJournalKey,
    savedMediaKey,
    filterJournalSubParam,
    filterMediaSubParam,
    filterMediaSubParamActions,
    filterJournalSubParamActions,
    mediaTypePopup,
    originSavedJournalList,
    originSavedMediaList,
    searchContentKeyList,
    isTagButton,
    isSelectedAllNewsId,
    searchContentListButton,
    mediaParamsExpandButton,
    pressParamsExpandButton,
    savedJournalAuth,
    savedMediaAuth,
    searchActivate,
    pressParamKeyword,
    mediaParamKeyword,
    mediaParamKeywordButton,
    pressParamKeywordButton,
    journalTab,
    mediaTab,
    journalIdKeyParam,
    isJournalUserBlock,
    journalDecodeList,
    journalEmailBlocking,
    journalContactInfo,
    newsLoading,
    journalNewsCountPage,
    newsListByJournalId,
    activityLoading,
    journalActivityCountPage,
    activityListByJournalId,
    pressMediaUnBlockPopup,
    addPersonalContactPopup,
    registerJournalPhotoPopup,
    pressMediaErrPopup,
    blockedEmailSenderPopup,
    registerMediaPhotoPopup,
    searchRegisterPopup,
    mediaLocationPopupList,
    filterInformation,
    filterMediaType,
    mediaFieldPopupList,
    journalistOccupationList,
    filterPubCycle,
    journalistInfoTypeList,
    journalistBlockYNList,
    mediaCountList,
    languageList,
    filterDataList,
    filterPortalCode,
    journalistSocialFilterList,
    isLimitFilter,
    mediaFieldPopup,
    mediaFieldList,
    mediaLocationPopup,
    mediaLocationList,
    mediaTypePopupList,
    mediaBlockYNList,
    filterMediaInfoType,
    mediaNameRevealedYNList,
    mediaIdKeyParam,
    mediaNewsCountPage,
    newsListByMediaId,
    mediaActivityCountPage,
    activityListByMediaId,
    isMediaUserBlock,
    mediaContactInfo,
    mediaEmailBlocking,
    mediaCheckDuplicateParam,
    duplicationMediaPopup,
    isSearchedNewsOpen,
    pressCheckDuplicateParam,
    duplicationPressPopup,
    userPopup,
    contentDeletePopup,
    generalProduct,
    userPressListAutoSaveData,
    userMediaListAutoSaveData,
    savedSearchPopup,
    publisherTypeList,
    timeZone,
    pressNewsList,
    settingsRefinedValue,
    basicFieldPopup,
    basicFieldList,
    basicLocationPopup,
    basicLocationList,
    searchLimitAlarm,
    pressSearchOptionParams,
    mediaSearchOptionParams,
    searchDropBoxActivate,
    journalContactBlockedInfo,
    profileImageId,
    contentListImageId,
    isDemoLicense,
    activityListTotalCount,
    newsListTotalCount,

    init,
    getJournalistByKeyword,
    getMediaListByKeyword,
    setMediaChangeCategoryId,
    setPressChangeCategoryId,
    setPressTagControlSearch,
    setPressTagDeleteControlSearch,
    pressKeywordSearch,
    changeJournalTab,
    pressProfileOptionAction,
    mediaProfileOptionAction,
    getNewsSearchByJournalId,
    getActivitySearchByJournalId,
    journalistPhotoDeleteAdjust,
    createPersonalContact,
    deletePersonalContact,
    createMediaPersonalContact,
    userContactValidation,
    journalistUnBlockedAction,
    mediaUnBlockedAction,
    pressMediaUnBlockAction,
    searchPressRegisterAction,
    searchMediaRegisterAction,
    medialistPhotoPopupAdjust,
    journalistPhotoPopupAdjust,
    pressMediaErrAction,
    pressFilterOptionAction,
    pressRegisterEditAction,
    filterAddCount,
    setPressAddExtraSelectedFilterSearch,
    setPressExtractExtraFilterSearch,
    setPressAddExtraFilterSearch,
    setPressDeleteGroupExtraFilterSearch,
    setPressAddAllExtraFilterSearch,
    setBasicFieldPopupTotalSelect,
    mediaLocationPopupAdjust,
    mediaTypePopupAdjust,
    changeSearchOption,
    changeMediaSearchOption,
    setInitPressFilterSubParamActionsAction,
    setInitMediaFilterSubParamActionsAction,
    setMediaExtractExtraFilterSearch,
    setMediaAddExtraFilterSearch,
    setMediaDeleteGroupExtraFilterSearch,
    setMediaAddAllExtraFilterSearch,
    setMediaAddExtraSelectedFilterSearch,
    mediaRegisterEditAction,
    mediaFilterOptionAction,
    setMediaTagControlSearch,
    setMediaTagDeleteControlSearch,
    mediaKeywordSearch,
    changeMediaTab,
    getNewsSearchByMediaId,
    getActivitySearchByMediaId,
    mediaPhotoDeleteAdjust,
    handlePressChangeSort,
    handlePressPaginationChange,
    handlePressChangeSize,
    handleMediaChangeSort,
    handleMediaChangeSize,
    handleMediaPaginationChange,
    journalistBlockedAction,
    mediaBlockedAction,
    moveMediaDetail,
    moveJournalDetail,
    deleteDuplicationMedia,
    deleteDuplicationJournal,
    ownerFunction,
    selectedPressDeleteAction,
    selectedMediaDeleteAction,
    setOwnerKey,
    setIsClosePressFilterSubParamAction,
    setIsCloseMediaFilterSubParamAction,
    updatePressSavedSearch,
    checkUpdatePressSavedSearchValidation,
    checkUpdateMediaSavedSearchValidation,
    updateMediaSavedSearch,
    setPressPositionValueAction,
    setPressKeywordAction,
    setPressDepartmentAction,
    setBasicFieldPopupAction,
    setMediaTypePopupAction,
    setBasicLocationPopupAction,
    setBasicLocationPopupTotalSelect,
    setMediaFieldPopupAction,
    setMediaLocationPopupAction,
    setMediaLocationPopupTotalSelect,
    setMediaFieldPopupTotalSelect,
    setMediaTypePopupTotalSelect,
    checkAutoRegisterSelectedPressRegist,
    checkAutoRegisterSelectedMediaRegist,
    checkAutoRegisterPressRegist,
    checkAutoRegisterMediaRegist,
    openPressEditPage,
    openMediaEditPage,
    onChangeJournalPhotoFiles,
    onChangeMediaPhotoFiles,
    afterPressRegistAddReLoad,
    afterMediaRegistAddReLoad,

    mediaLocationPopupAdjustMediaSearch,
    mediaFieldPopupAdjustMediaSearch,
    mediaLocationPopupAdjustAdditionalParam,
    setSavedSearchPopupTitleOnChange,
    setSavedSearchPopupSelectedUserChange,
    setSavedSearchPopupTargetShareSettingOnChange,
    setSavedSearchPopupShareSettingOnChange,
    setInitSavedSearchPopupAction,
    setSavedMediaListKeywordAction,
    setSavedJournalListKeywordAction,
    setPressAllSearchContentKeyList,
    setIsPressFilterSubParamAction,
    setIsMediaFilterSubParamAction,
    setPressParamsExpandButtonAction,
    setPressParamKeywordButtonAction,
    setMediaParamKeywordButtonAction,
    setPressParamKeywordAction,
    setPressSearchContentKeyList,
    setPressIdParamsAction,
    setMediaIdParamsAction,
    setRegisterJournalPhotoPopupAction,
    setProfileImageId,
    setContentListImageId,
    setPressMediaUnBlockPopupAction,
    setAddPersonalContactAction,
    setaddPersonalContactWebsite,
    setaddPersonalContactFax,
    setPressMediaErrPopupAction,
    setBlockedEmailSenderPopupAction,
    setaddPersonalContactEmail,
    setaddPersonalContactPhone,
    setaddPersonalContactTelephone,
    setaddPersonalContactAddress,
    setPressMediaUnBlockTitleAction,
    setPressMediaUnBlockContentAction,
    setInitSearchRegisterPopup,
    setSearchRegisterPopupOnChange,
    setRegisterMediaPhotoPopupAction,
    setPressMediaErrTitleAction,
    setPressMediaErrContentAction,
    setOpenSearchRegisterPopup,
    setPressTagControl,
    setMediaTagControl,
    setMediaTagDeleteControl,
    setPressJournalistTagList,
    setPressTagDeleteControl,
    setPressMediaTagList,
    setMediaTypePopupActionByMediaTab,
    setPressInformationType,
    setNewsKeywordValueAction,
    setPressKeywordField,
    setPressOccupation,
    setPressPublishingPeriod,
    setResetSearchOption,
    setPressLimitType,
    setPressSystemType,
    setPressCountType,
    setPressLanguageType,
    setPressAdditionTagControl,
    setPressTagAdditionDeleteControl,
    setPressAdditionMediaTargetList,
    setPressAdditionMediaTagList,
    setPressAdditionalField,
    setPressPortal,
    setPressSocialMedia,
    setOpenfilterJournalSubParamActions,
    setMediaFieldPopupSelectedItem,
    setBasicFieldPopupSelectedItem,
    setMediaFieldPopupDeleteTotalSelect,
    setMediaFieldPopupSelectedValue,
    setDeleteSelectedTypeMediaFieldPopup,
    setSelectedTypeMediaFieldPopup,
    setMediaLocationPopupSelectedItem,
    setMediaLocationPopupDeleteTotalSelect,
    setMediaLocationPopupSelectedValue,
    setDeleteSelectedTypeMediaLocationPopup,
    setSelectedTypeMediaLocationPopup,
    setMediaTypePopupSelectedItem,
    setMediaTypePopupDeleteTotalSelect,
    setMediaTypePopupSelectedValue,
    setDeleteSelectedTypeMediaTypePopup,
    setSelectedTypeMediaTypePopup,
    setOpenfilterMediaSubParamActions,
    setMediaTagList,
    setMediaInformationType,
    setMediaAdditionMediaTagList,
    setMediaKeywordAction,
    setMediaLocationPopupActionByMediaTab,
    setMediaKeywordField,
    setMediaFieldPopupActionByMediaTab,
    setMediaPublishingPeriod,
    setMediaAdditionMediaTargetList,
    setMediaAdditionTagControl,
    setMediaTagAdditionDeleteControl,
    setMediaLanguageType,
    setMediaIsJournalistType,
    setMediaSystemType,
    setMediaLimitType,
    setMediaPortal,
    setMediaAllSearchContentKeyList,
    setMediaParamsExpandButtonAction,
    setMediaParamKeywordAction,
    setMediaSearchContentKeyList,
    setDuplicationMediaPopupAction,
    setMediaNoticeClose,
    setSearchedNewsOpenActionAction,
    setPressNoticeClose,
    setDuplicationPressPopupAction,
    setUserProfilePopupAction,
    setSelectedDeleteContent,
    setFieldKeywordValueAction,
    setSelectedTypeBasicFieldPopup,
    setDeleteSelectedTypeBasicFieldPopup,
    setBasicFieldPopupDeleteTotalSelect,
    setBasicFieldPopupSelectedValue,
    setPressAreaAction,
    setBasicLocationPopupSelectedItem,
    setBasicLocationPopupDeleteTotalSelect,
    setDeleteSelectedTypeBasicLocationPopup,
    setSelectedTypeBasicLocationPopup,
    setBasicLocationPopupSelectedValue,
    mediaFieldPopupAdjustAdditionalParam,
  }
}
