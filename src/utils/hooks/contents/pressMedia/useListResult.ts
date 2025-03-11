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
  extendedCommonCodeTargetList,
  subJournalFilterListList,
  subJournalFilterOptionsList,
  subMediaFilterListList,
  subMediaFilterOptionsList,
} from '~/components/contents/pressMedia/List/Result/defaultData'
import { defaultPressUserBlockData } from '~/components/contents/pressMedia/PressProfile/defaultData'
import { defaultUserBlockData } from '~/components/contents/pressMedia/SearchResult/defaultData'
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
  checkMediaListUserMediaAction,
  checkPressListUserPressAction,
  contentDeletePopupAction,
  contentListImageIdAction,
  dataOnChangeActionProps,
  dataOnChangeActionTypeProps,
  duplicationMediaPopupAction,
  duplicationPressPopupAction,
  filterInformationAction,
  filterMediaInfoTypeAction,
  filterMediaTypeAction,
  filterPortalCodeAction,
  filterPubCycleAction,
  initSearchAction,
  isFilterSubParamAction,
  isJournalUserBlockAction,
  isLimitFilterAction,
  isMediaFilterSubParamAction,
  isMediaUserBlockAction,
  isPressFilterSubParamAction,
  journalContactInfoAction,
  journalDecodeListProps,
  journalEmailBlockingAction,
  journalistBlockYNListAction,
  journalistInfoTypeListAction,
  journalistOccupationListAction,
  journalistSocialFilterListAction,
  journalLoadingAction,
  languageListAction,
  mediaBlockYNListAction,
  mediaContactInfoAction,
  mediaCountListAction,
  mediaEmailBlockingAction,
  mediaIdParamsAction,
  mediaLoadingAction,
  mediaNameRevealedYNListAction,
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
  pressParamKeywordAction,
  pressParamKeywordButtonAction,
  pressParamsExpandButtonAction,
  profileByJournalIdAction,
  profileByMediaIdAction,
  profileImageIdAction,
  publisherTypeAction,
  registerJournalPhotoPopupAction,
  registerJournalPhotoPopupProps,
  registerMediaPhotoPopupAction,
  resetSavedJournalListKeywordAction,
  resetSavedMediaListKeywordAction,
  savedJournalListKeywordAction,
  savedJournalListLoadingAction,
  savedMediaListKeywordAction,
  savedMediaListLoadingAction,
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
  setOnChangePressFilterSearchOptionAction,
  setOnChangePressOptionIdAction,
  setOnChangePressSearchOptionAction,
  setProfileImageIdAction,
  setResetMediaSavedSearchListAction,
  setResetPressSavedSearchListAction,
  userPopupAction,
} from '~/stores/modules/contents/pressMedia/listResult'
import { duplicationMediaPopupProps, isMediaUserBlockProps } from '~/stores/modules/contents/pressMedia/mediaProfile'
import { pressContentListProps } from '~/stores/modules/contents/pressMedia/pressListManagement'
import {
  initPressMediaListBookPopupAction,
  initSearchRegisterListPopupAction,
  searchRegisterListProps,
} from '~/stores/modules/contents/pressMedia/pressMediaListBookPopup'
import {
  addPersonalContactProps,
  blockedEmailSenderPopupProps,
  checkSearchResultUserMediaAction,
  filterSubParamActionsProps,
  mediaSubTypeListProps,
  pressMediaErrPopupProps,
  pressMediaUnBlockPopupProps,
  registerMediaPhotoPopupProps,
  searchContentListProps,
  searchRegisterPopupProps,
} from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { duplicationJournalPopupPropsProps, isUserBlockProps } from '~/stores/modules/contents/pressMedia/pressProfile'
import { contentDeletePopupProps } from '~/stores/modules/contents/pressMedia/savedSearch'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  ContactUserAddedDto,
  ElasticSearchReturnDtoJournalistDocumentDto,
  ElasticSearchReturnDtoMediaDocumentDto,
  type ElasticSearchReturnDtoNewsDocumentDto,
  type ESearchJournalistCondDto,
  ESearchMediaCondDto,
  ESearchNewsCondDto,
  JournalistAutoCompleteDto,
  MediaAutoCompleteDto,
  PageActionDtoForList,
  type UserDto,
} from '~/types/api/service'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'
import { PageableDataDto } from '~/types/contents/api'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import {
  ESearchJournalistDocumentDto,
  ESearchMediaDocumentDto,
  JournalistMediaGroupItem,
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
import { apiGetMediaContact } from '~/utils/api/contact/media/useGetMediaContact'
import { usePostMediaContactCreateUpdate } from '~/utils/api/contact/media/usePostMediaContactCreateUpdate'
import { useDeleteContactInfo } from '~/utils/api/contact/useDeleteContactInfo'
import { UseGetJournalistCustomSearchListParams } from '~/utils/api/customSearch/journalist/useGetJournalistCustomSearchList'
import { useDeleteJournalistExcluded } from '~/utils/api/email/journalist/useDeleteJournalistExcluded'
import { apiGetJournalistExcluded } from '~/utils/api/email/journalist/useGetJournalistExcluded'
import { usePostJournalistExcluded } from '~/utils/api/email/journalist/usePostJournalistExcluded'
import { useDeleteMediaExcluded } from '~/utils/api/email/media/useDeleteMediaExcluded'
import { apiGetMediaExcluded } from '~/utils/api/email/media/useGetMediaExcluded'
import { usePostMediaExcluded } from '~/utils/api/email/media/usePostMediaExcluded'
import { apiPostMediapassDecode } from '~/utils/api/encrypt/usePostMediapassDecode'
import { useDeleteJournalistGroup } from '~/utils/api/groupList/journalist/useDeleteJournalistGroup'
import {
  apiGetJournalistGroup,
  UseGetJournalistGroupParams,
} from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import {
  usePostJournalistGroupAddJournalId,
  usePostJournalistGroupAddJournalIdAuto,
} from '~/utils/api/groupList/journalist/usePostJournalistGroupAddJournalist'
import { usePostJournalistGroupDeleteJournal } from '~/utils/api/groupList/journalist/usePostJournalistGroupDeleteJournalist'
import { useDeleteMediaGroup } from '~/utils/api/groupList/media/useDeleteMediaGroup'
import { apiGetMediaGroup, UseGetMediaGroupParams } from '~/utils/api/groupList/media/useGetMediaGroup'
import {
  usePostMediaGroupAddMedia,
  usePostMediaGroupAddMediaAuto,
} from '~/utils/api/groupList/media/usePostMediaGroupAddMedia'
import { usePostMediaGroupDeleteMedia } from '~/utils/api/groupList/media/usePostMediaGroupDeleteMedia'
import { apiGetJournalistNameAutoComplete } from '~/utils/api/journalist/useGetJournalistNameAutoComplete'
import { useGetJournalistExcel } from '~/utils/api/journalist/useJournalistExcel'
import { usePostJournalistSearch } from '~/utils/api/journalist/usePostJournalistSearch'
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

export const usePressMediaListResult = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    contentListImageId,
    profileImageId,
    editPageOpen,
    isFilterSubParam,
    arrayMediaList,
    arrayJournalList,
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
    mediaLoading,
    journalLoading,
    journalArrayId,
    mediaArrayId,
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
    originArrayJournalList,
    originArrayMediaList,
    searchContentKeyList,
    isTagButton,
    isSelectedAllNewsId,
    searchContentListButton,
    mediaParamsExpandButton,
    pressParamsExpandButton,
    arrayJournalAuth,
    arrayMediaAuth,
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
    duplicationMediaPopup,
    duplicationPressPopup,
    pressCheckDuplicateParam,
    mediaCheckDuplicateParam,
    userPopup,
    publisherTypeList,
    contentDeletePopup,
    journalContactBlockedInfo,
    searchLimitAlarm,
  } = useAppSelector(state => state.pressMediaListResultSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, shareCodeData, timeZone, frequentlyUsedCommonCode } =
    useAppSelector(state => state.authSlice)
  const { mediaDuplicationIdList, pressDuplicationIdList, userPressListAutoSaveData, userMediaListAutoSaveData } =
    useAppSelector(state => state.extraSlice)
  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)

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
  const saveMediaPhoto = usePutMediaLogo()
  const journalistGroupDeleteJournalist = usePostJournalistGroupDeleteJournal()
  const journalistGroupAddJournalist = usePostJournalistGroupAddJournalId()
  const journalistGroupAddJournalistAuto = usePostJournalistGroupAddJournalIdAuto()
  const mediaGroupDeleteMedia = usePostMediaGroupDeleteMedia()
  const mediaGroupAddMedia = usePostMediaGroupAddMedia()
  const mediaGroupAddMediaAuto = usePostMediaGroupAddMediaAuto()
  const saveJournalistPhoto = usePutJournalistPhoto()
  const apiInquiryAction = usePostInquiry()
  const deleteMediaPhoto = usePutMediaLogoDelete()
  const apiDeleteJournalistIncluded = usePostJournalistExcluded()
  const apiDeleteMediaIncluded = usePostMediaExcluded()
  const apiJournalExcel = useGetJournalistExcel()
  const apiMediaExcel = useGetMediaExcel()
  const deleteMedia = useDeleteMedia()
  const deleteJournalist = useDeleteJournalist()
  const deleteMedialistGroup = useDeleteMediaGroup()
  const deleteJournalistGroup = useDeleteJournalistGroup()

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

  const setOpenfilterMediaSubParamActions = useCallback(
    async (e: filterSubParamActionsProps[]) => {
      dispatch(setFilterMediaSubParamActions(e))
    },
    [filterMediaSubParamActions]
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

  const setProfileImageId = useCallback(() => dispatch(profileImageIdAction(0)), [profileImageId])

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
      idKey: number,
      dto: ESearchJournalistCondDto,
      tempOwnerKey: boolean,
      tempEditPageOpen: boolean
    ) => {
      const filter = setObjectToBase64({
        ...dto,
        journalist_id: Number(e.jrnlst_id),
        media_id: 0,
        mediaArrayId: 0,
        journalArrayId: Number(idKey),
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
      await router.replace(`/contacts/list-result?filter=${filter}`, undefined, { shallow: true })
    },
    [journalIdKeyParam, journalIdKey]
  )

  const setDuplicationPressPopupAction = useCallback(
    (props: duplicationMediaPopupProps) => {
      dispatch(duplicationPressPopupAction(props))
    },
    [duplicationPressPopup]
  )

  const setDuplicationMediaPopupAction = useCallback(
    (props: duplicationMediaPopupProps) => {
      dispatch(duplicationMediaPopupAction(props))
    },
    [duplicationMediaPopup]
  )

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

  const setOpenfilterJournalSubParamActions = useCallback(
    async (e: filterSubParamActionsProps[]) => {
      dispatch(setFilterJournalSubParamActions(e))
    },
    [filterJournalSubParamActions]
  )

  const setContentListImageId = useCallback(() => dispatch(contentListImageIdAction(0)), [contentListImageId])

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
    async (mainId: number, subId: number, pressApi: ESearchJournalistCondDto, tempOwnerKey: boolean) => {
      const filter = setObjectToBase64({
        ...pressApi,
        journalist_id: subId,
        media_id: 0,
        mediaArrayId: 0,
        journalArrayId: mainId,
        editPageOpen: true,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/contacts/list-result?filter=${filter}`, undefined, { shallow: true })
      dispatch(isFilterSubParamAction(true))
    },
    [isFilterSubParam]
  )

  const setIsMediaFilterSubParamAction = useCallback(
    async (mainId: number, subId: number, mediaApi: ESearchMediaCondDto, tempOwnerKey: boolean) => {
      const filter = setObjectToBase64({
        ...mediaApi,
        journalist_id: 0,
        media_id: subId,
        mediaArrayId: mainId,
        journalArrayId: 0,
        editPageOpen: true,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/media/list-result?filter=${filter}`, undefined, { shallow: true })
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
          if (newItemsListElement.owner && newItemsListElement.owner?.uid !== userInfo.userId) {
            isTagChecked = false
          }
        }
      }
      if (isCheck) {
        for await (const dataListElement of origin) {
          if (dataListElement.jrnlst_id) {
            if (isTagChecked) {
              if (dataListElement.owner && dataListElement.owner?.uid !== userInfo.userId) {
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
    async (e: string, list: JournalistMediaGroupItem[]) => {
      if (e === '') {
        dispatch(resetSavedJournalListKeywordAction(list))
      } else {
        dispatch(savedJournalListKeywordAction(e))
      }
    },
    [savedJournalListKeyword]
  )

  const setSavedMediaListKeywordAction = useCallback(
    async (e: string, list: JournalistMediaGroupItem[]) => {
      if (e === '') {
        dispatch(resetSavedMediaListKeywordAction(list))
      } else {
        dispatch(savedMediaListKeywordAction(e))
      }
    },
    [savedMediaListKeyword]
  )

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
    let isType = router.pathname === '/media/list-result' ? 'media' : 'press'
    let tempIsFilter = false
    let tempArrayJournalAuth = false
    let tempArrayMediaAuth = false
    let isDtoFilter = false
    let tempOwnerKey = 0
    let media_id = 0
    let journal_id = 0
    let journalArrayId = 0
    let mediaArrayId = 0
    let tempSearchKeywordOption = ''
    let tempMediaSubTypeList: mediaSubTypeListProps[] = []
    let tempMediaValueList: SelectListOptionItem[] = []
    let tempMediaInfoTypeList: SelectListOptionItem[] = []
    let tempMediaPubCycleList: SelectListOptionItem[] = []
    let tempMediaPortalCodeList: SelectListOptionItem[] = []
    let tempMediaTypeList: SelectListOptionItem[] = []
    let tempJournalistOccupationList: SelectListOptionItem[] = []
    let tempJournalistSocialFilterList: SelectListOptionItem[] = []
    let tempArrayMediaList: JournalistMediaGroupItem[] = []
    let tempArrayJournalList: JournalistMediaGroupItem[] = []
    let tempJournalList: ESearchJournalistDocumentDto[] = []
    let tempJournalIdParams: ESearchJournalistDocumentDto | null = null
    let tempMediaIdParams: ESearchMediaDocumentDto | null = null
    let tempMediaList: ESearchMediaDocumentDto[] = []
    let preloadCommonCode: CommonCode[] = []
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
      sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
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
        console.log('querys', querys)
        if (querys && querys.param === 'filter') {
          const dto = await conditionConvert(querys.data)
          console.log('dto', dto)
          if (dto) {
            tempIsFilter = dto.tempIsFilter
            journalArrayId = dto.journalArrayId
            mediaArrayId = dto.mediaArrayId
            journal_id = dto.journalist_id
            media_id = dto.media_id
            pressDto = dto.pressDto
            mediaDto = dto.mediaDto
            isDtoFilter = dto.isDtoFilter
            mediaFilterSubActions = dto.mediaFilterSubActions
            pressFilterSubActions = dto.pressFilterSubActions
            tempSearchKeywordOption = dto.tempSearchKeywordOption
            if (dto.tempOwnerKey > 0 && userInfo.userId) {
              tempOwnerKey = userInfo.userId
              filterParam.ownerId = userInfo.userId
            }
            if (dto.journalArrayId > 0) {
              isType = 'press'
            } else if (dto.mediaArrayId > 0) {
              isType = 'media'
            }
          }
        } else if (querys && querys.param === 'jrnlstList_id' && querys.data !== '') {
          journalArrayId = Number(querys.data)
          console.log('journalArrayId', journalArrayId)
        } else if (querys && querys.param === 'mediaList_id' && querys.data !== '') {
          mediaArrayId = Number(querys.data)
          console.log('mediaArrayId', mediaArrayId)
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
          dispatch(filterInformationAction([{ id: '', name: '선택' }, ...tempMediaValueList]))
        } else if (re.id === 'MEDIA_INFO_TYPE') {
          tempMediaInfoTypeList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(filterMediaInfoTypeAction([{ id: '', name: '선택' }, ...tempMediaInfoTypeList]))
        } else if (re.id === 'PUB_CYCLE') {
          tempMediaPubCycleList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(filterPubCycleAction(tempMediaPubCycleList))
        } else if (re.id === 'PORTAL_CODE') {
          tempMediaPortalCodeList = preloadCommonCode.map(e => {
            return { id: e.code, name: e.name }
          })
          dispatch(filterPortalCodeAction([{ id: '', name: '선택' }, ...tempMediaPortalCodeList]))
        } else if (re.id === 'ACTION_STATE_FILTER') {
          dispatch(
            actionStateFilterAction(
              preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              })
            )
          )
        } else if (re.id === 'PUBLISHER_TYPE') {
          dispatch(
            publisherTypeAction(
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
          dispatch(journalistSocialFilterListAction([{ id: '', name: '선택' }, ...tempJournalistSocialFilterList]))
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
        } else if (re.id === 'JOURNALIST_INFO_TYPE') {
          dispatch(
            journalistInfoTypeListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (re.id === 'LANGUAGE') {
          dispatch(
            languageListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (re.id === 'MEDIA_COUNT') {
          dispatch(
            mediaCountListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (re.id === 'JOURNALIST_BLOCK_YN') {
          dispatch(
            journalistBlockYNListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (re.id === 'MEDIA_JRNLIST_NAME_REVEALED_YN') {
          dispatch(
            mediaNameRevealedYNListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        } else if (re.id === 'MEDIA_BLOCK_YN') {
          dispatch(
            mediaBlockYNListAction([
              { id: '', name: '선택' },
              ...preloadCommonCode.map(e => {
                return { id: e.code, name: e.name }
              }),
            ])
          )
        }
      }
      const savedJournalData = await getPressRegisterList(filterParam, journalArrayId, isType)
      if (journalArrayId < 1) {
        pressDto = savedJournalData.apiDto
        journalArrayId = savedJournalData.id
      }
      pressDto.journalistIdList = savedJournalData.journalistIdList
      tempArrayJournalAuth = savedJournalData.isAuth
      tempArrayJournalList = savedJournalData.list
      const savedMediaData = await getMediaRegisterList(filterParam, mediaArrayId, isType)
      if (mediaArrayId < 1) {
        mediaDto = savedMediaData.apiDto
        mediaArrayId = savedMediaData.id
      }
      mediaDto.mediaIdList = savedMediaData.mediaIdList
      tempArrayMediaAuth = savedMediaData.isAuth
      tempArrayMediaList = savedMediaData.list
      dispatch(
        setFilterPressMediaDataAction({
          pressDto,
          tempArrayJournalList,
          journalArrayId,
          mediaDto,
          tempArrayMediaList,
          mediaArrayId,
          arrayJournalAuth: tempArrayJournalAuth,
          arrayMediaAuth: tempArrayMediaAuth,
          tempIsFilter,
          tempOwnerKey,
        })
      )
      if (isType === 'press') {
        if (journalArrayId > 0 && pressDto.journalistIdList && pressDto.journalistIdList.length > 0) {
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
                page: 1,
                size: 20,
                sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
                journalistIdList: pressDto.journalistIdList,
                groupId: userSelectGroup,
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
        dispatch(
          setinitPressListAction({
            listDefine: isType,

            journalistId: journal_id,
            journalFilterSub: journalFilterSub,
            tempJournalIdParams: tempJournalIdParams,
            pageCount: tempPageCount,
            pressFilterSubActions: pressFilterSubActions,
            tempJournalList: tempJournalList,
            tempSearchKeywordOption,
            journalDecodeList: tempJournalDecodeList,
          })
        )
      } else {
        if (mediaDto && mediaDto.mediaIdList && mediaDto.mediaIdList.length > 0) {
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
                page: 1,
                size: 20,
                sort: ['name!asc'],
                mediaIdList: mediaDto.mediaIdList,
                groupId: userSelectGroup,
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
              await mediaPersonalContactInfo(tempMediaIdParams?.mid || 0)
              await mediaExcluded(tempMediaIdParams?.mid || 0)
              await checkMediaUserInvalid(tempMediaIdParams)
            }
          }
          dispatch(
            setinitMediaListAction({
              listDefine: isType,

              mediaId: media_id,
              mediaFilterSub: mediaFilterSub,
              tempMediaIdParams: tempMediaIdParams,
              pageCount: tempPageCount,
              mediaFilterSubActions: mediaFilterSubActions,
              tempMediaList: tempMediaList,
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
    dispatch(checkPressListUserPressAction(duplicationData))
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
    dispatch(checkMediaListUserMediaAction(duplicationData))
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
        dispatch(checkMediaListUserMediaAction(null))
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
    if (tempJournalIdParams) {
      if (tempJournalIdParams && tempJournalIdParams.jrnlst_id) {
        await journalistPersonalContactInfo(tempJournalIdParams.jrnlst_id)
        await journalistExcluded(tempJournalIdParams.jrnlst_id)
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
          dispatch(checkPressListUserPressAction(null))
        }
      }
    }
    return tempJournalDecodeList
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

  const getPressRegisterList = async (code: UseGetJournalistGroupParams, keyId: number, isType: string) => {
    let pressDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
      journalistIdList: [],
      groupId: userSelectGroup,
    }
    let isAuth = false
    let param: JournalistMediaGroupItem[] = []
    let categoryId = keyId
    let conditions: JournalistMediaGroupItem | null = null
    dispatch(savedJournalListLoadingAction(true))
    try {
      const { status, data, message } = await apiGetJournalistGroup(code)
      if (status === 'S') {
        const res = data as PageableDataDto<JournalistMediaGroupItem>
        if (res.content && res.content.length > 0) {
          param = res.content as pressContentListProps[]
          if (isType === 'press') {
            if (categoryId > 0) {
              const getParam = param.find(e => e.jrnlstListId === categoryId)
              if (getParam) {
                conditions = getParam
              } else {
                openToast('해당하는 목록이 존재하지 않습니다', 'error')
                conditions = null
              }
              conditions = getParam ? getParam : null
            } else {
              categoryId = param.length > 0 ? (param[0].jrnlstListId ? param[0].jrnlstListId : 0) : 0
              conditions = param.length > 0 ? param[0] : null
            }
          }
          if (conditions) {
            console.log('conditions?.journalist', conditions?.journalist)
            isAuth = userInfo.userId === conditions.owner?.userId ? true : conditions.shareCode === 'WRITABLE'
            pressDto.journalistIdList = conditions?.journalist || []
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
      apiParams: conditions,
      journalistIdList: pressDto.journalistIdList,
      isAuth,
    }
  }

  const getMediaRegisterList = async (code: UseGetMediaGroupParams, keyId: number, isType: string) => {
    let mediaDto: ESearchMediaCondDto = {
      page: 1,
      size: 20,
      sort: ['name!asc'],
      mediaIdList: [],
      groupId: userSelectGroup,
    }
    let isAuth = false
    let param: JournalistMediaGroupItem[] = []
    let categoryId = keyId
    let conditions: JournalistMediaGroupItem | null = null
    dispatch(savedMediaListLoadingAction(true))
    try {
      const { status, data, message } = await apiGetMediaGroup(code)
      if (status === 'S') {
        const res = data as PageableDataDto<JournalistMediaGroupItem>
        if (res.content && res.content.length > 0) {
          param = res.content as JournalistMediaGroupItem[]
          if (isType === 'media') {
            if (categoryId > 0) {
              const getParam = param.find(e => e.mediaListId === categoryId)
              if (getParam) {
                conditions = getParam
              } else {
                openToast('해당하는 목록이 존재하지 않습니다', 'error')
                conditions = null
              }
            } else {
              categoryId = param.length > 0 ? (param[0].mediaListId ? param[0].mediaListId : 0) : 0
              conditions = param.length > 0 ? param[0] : null
            }
          }
          if (conditions) {
            isAuth = userInfo.userId === conditions.owner?.userId ? true : conditions.shareCode === 'WRITABLE'
            mediaDto.mediaIdList = conditions?.media || []
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
      apiParams: conditions,
      mediaIdList: mediaDto.mediaIdList,
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

  const getJournalist = async (params: ESearchJournalistCondDto) => {
    let res: ElasticSearchReturnDtoJournalistDocumentDto | null = null
    try {
      const { status, message, data } = await journalistSearch.mutateAsync({
        ...params, // @ts-ignore
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

  const conditionConvert = async (confitions: string, type?: string) => {
    let res = null
    let isDtoFilter = false
    let tempSearchKeywordOption = ''
    let pressDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
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
    let journalArrayId = 0
    let mediaArrayId = 0
    let conditions = getObjectFromBase64(confitions)
    if (conditions && conditions !== '') {
      tempIsFilter = conditions.editPageOpen ? conditions.editPageOpen : false
      media_id = conditions.media_id ? conditions.media_id : 0
      journalist_id = conditions.journalist_id ? conditions.journalist_id : 0
      journalArrayId = conditions.journalArrayId ? conditions.journalArrayId : 0
      mediaArrayId = conditions.mediaArrayId ? conditions.mediaArrayId : 0
      if (!type) {
        if (journalArrayId > 0) {
          isType = 'press'
        } else if (mediaArrayId > 0) {
          isType = 'media'
        }
      }
      if (isType === 'media') {
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
        if (conditions.mediaIdList && conditions.mediaIdList.length > 0) {
          mediaDto.mediaIdList = conditions.mediaIdList
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
      } else {
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
        if (conditions.journalistIdList && conditions.journalistIdList.length > 0) {
          pressDto.journalistIdList = conditions.journalistIdList
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
      }
      res = {
        mediaDto: mediaDto,
        pressDto: pressDto,
        media_id,
        journalist_id,
        journalArrayId,
        mediaArrayId,
        pressFilterSubActions,
        mediaFilterSubActions,
        tempIsFilter,
        tempSearchKeywordOption,
        tempOwnerKey,
        isDtoFilter,
      }
    }

    console.log('res', res)
    return res
  }

  const getCommonCode = async (code: string, exParams?: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({ parentCode: code })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const getJournalistByKeyword = async (param: string, tempIsOwner: boolean, idKey: number) => {
    let filterParam: UseGetJournalistGroupParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
      title: param,
    }
    if (tempIsOwner) filterParam.ownerId = userInfo.userId
    const { status, data, message } = await apiGetJournalistGroup(filterParam)
    if (status === 'S') {
      const res = data as PageableDataDto<JournalistMediaGroupItem>
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
    let filterParam: UseGetMediaGroupParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
      title: param,
    }
    if (tempIsOwner) filterParam.ownerId = userInfo.userId
    const { status, data, message } = await apiGetMediaGroup(filterParam)
    if (status === 'S') {
      const res = data as PageableDataDto<JournalistMediaGroupItem>
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
    if (id > 0) {
      try {
        const { status, data, message } = await apiGetMediaContact(id)
        if (status === 'S') {
          const res = data as ContactUserAddedDto
          dispatch(mediaContactInfoAction(res))
        } else {
          openToast(message?.message, 'error')
        }
      } catch (e) {
        console.log('>> getDecodedData error', e)
      }
    } else {
      dispatch(mediaContactInfoAction(null))
    }
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

  const setPressChangeCategoryId = async (
    param: JournalistMediaGroupItem,
    tempEditPage: boolean,
    tempOwnerKey: boolean
  ) => {
    let isAuth = false
    let journalFilterSub: NavigationLinkItem[] = []
    let tempJournalDecodeList = {
      beemail: '',
      mobile: '',
      landline: '',
      landlineShared: '',
      fax: '',
    }
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    let tempJournalData: ESearchJournalistDocumentDto[] = []
    let pressDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
      groupId: userSelectGroup,
    }
    if (param) {
      isAuth = userInfo.userId === param.owner?.userId ? true : param?.shareCode === 'WRITABLE'
      pressDto.journalistIdList = param?.journalist || []
    }
    dispatch(
      setChangePressSavedSearchTargetIdAction({
        pressDto,
        journalArrayId: Number(param.jrnlstListId),
        arrayJournalAuth: isAuth,
      })
    )

    dispatch(journalLoadingAction(true))
    const res = await getJournalist(pressDto)
    if (res) {
      const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / pressDto.size)
      const filter = setObjectToBase64({
        ...pressDto,
        journalist_id: journalData.length > 0 ? (journalData[0].jrnlst_id ? journalData[0].jrnlst_id : 0) : 0,
        media_id: 0,
        mediaArrayId: 0,
        journalArrayId: Number(param.jrnlstListId),
        editPageOpen: tempEditPage,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/contacts/list-result?filter=${filter}`, undefined, { shallow: true })
      journalFilterSub = await getPressFilterOptionControlData(
        res,
        pressDto,
        filterInformation,
        journalistSocialFilterList,
        journalistOccupationList,
        filterMediaInfoType,
        filterPubCycle,
        filterPortalCode,
        filterMediaType,
        mediaSubTypeList
      )
      tempJournalData = journalData && journalData.length > 0 ? journalData : []
      tempPageCount = {
        totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
        totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
      }
      if (journalData && journalData.length > 0) {
        tempJournalDecodeList = await checkPressUserInvalid(journalData[0])
      }
    }
    dispatch(
      setOnChangePressOptionIdAction({
        journalData: tempJournalData,
        pageCount: tempPageCount,
        journalFilterSub,
        filterJournalSubParamActions: subJournalFilterOptionsList,
        journalDecodeList: tempJournalDecodeList,
      })
    )
    dispatch(journalLoadingAction(false))
  }
  const setMediaChangeCategoryId = async (
    param: JournalistMediaGroupItem,
    tempEditPage: boolean,
    tempOwnerKey: boolean
  ) => {
    let isAuth = false
    let tempNewsData: ESearchMediaDocumentDto[] = []
    let mediaFilterSub = subMediaFilterListList
    let mediaDto: ESearchMediaCondDto = {
      page: 1,
      size: 20,
      sort: ['name!asc'],
      groupId: userSelectGroup,
    }
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    if (param) {
      isAuth = userInfo.userId === param.owner?.userId ? true : param?.shareCode === 'WRITABLE'
      mediaDto.mediaIdList = param?.media || []
    }
    dispatch(
      setChangeMediaSavedSearchTargetIdAction({
        mediaDto,
        mediaArrayId: Number(param.mediaListId),
        arrayMediaAuth: isAuth,
      })
    )
    dispatch(mediaLoadingAction(true))
    const res = await getMediaList(mediaDto)
    if (res) {
      const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / mediaDto.size)
      const filter = setObjectToBase64({
        ...mediaDto,
        journalist_id: 0,
        media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
        mediaArrayId: Number(param.mediaListId),
        journalArrayId: 0,
        editPageOpen: tempEditPage,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await router.replace(`/media/list-result?filter=${filter}`, undefined, { shallow: true })
      mediaFilterSub = await getMediaFilterOptionControlData(
        res,
        mediaDto,
        filterInformation,
        filterMediaInfoType,
        filterPubCycle,
        filterPortalCode,
        filterMediaType,
        mediaSubTypeList
      )
      tempNewsData = mediaData && mediaData.length > 0 ? mediaData : []
      tempPageCount = {
        totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
        totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
      }
      if (mediaData && mediaData.length > 0) {
        await mediaPersonalContactInfo(mediaData[0]?.mid || 0)
        await mediaExcluded(mediaData[0]?.mid || 0)
        await checkMediaUserInvalid(mediaData[0])
      }
    }
    dispatch(
      setOnChangeMediaAction({
        mediaData: tempNewsData,
        pageCount: tempPageCount,
        mediaFilterSub,
        mediaFilterSubActions: subMediaFilterOptionsList,
      })
    )
    dispatch(mediaLoadingAction(false))
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
      dispatch(blockedEmailSenderPopupAction({ isOpen: false, type: '', status: '', idKey: '' }))
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
      dispatch(blockedEmailSenderPopupAction({ isOpen: false, type: '', status: '', idKey: '' }))
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

  const pressFilterOptionAction = async (
    keyOption: string,
    props: ESearchJournalistDocumentDto[],
    filterDto: ESearchJournalistCondDto,
    pressKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
    originData: ESearchJournalistDocumentDto[],
    originParam: ESearchJournalistDocumentDto
  ) => {
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
        } else if (keyOption === 'excel') {
          const param = {
            journalistIdList: props.map(e => {
              return Number(e.jrnlst_id)
            }),
          }
          const res = await apiJournalExcel.mutateAsync(param)
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
            openToast('내보내기에 성공하였습니다', 'success')
          } else {
            openToast('내보내기에 실패하였습니다', 'error')
          }
        } else if (keyOption === 'delete') {
          const filter = setObjectToBase64({
            ...filterDto,
            page: 1,
            journalist_id: 0,
            media_id: 0,
            mediaArrayId: 0,
            journalArrayId: Number(pressKey),
            editPageOpen: editPageOpen,
          })
          await router.replace(`/contacts/list-result?filter=${filter}`, undefined, { shallow: true })
          const { status, message } = await journalistGroupDeleteJournalist.mutateAsync({
            jrnlstListIdList: [Number(pressKey)],
            // @ts-ignore
            journalistIdList: props.map(e => {
              return Number(e.jrnlst_id)
            }),
          })
          if (status === 'S') {
            await afterForcePressPopupReLoad(
              pressKey,
              tempOwnerKey,
              tempEditPageOpen,
              filterDto,
              originData,
              originParam
            )
          } else {
            openToast(message?.message, 'error')
          }
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

  const setPressDeleteGroupExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchJournalistCondDto,
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
        await filterPressApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setPressAddAllExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchJournalistCondDto,
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
        await filterPressApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setPressAddExtraFilterSearch = async (
    e: ChangeEvent<HTMLInputElement>,
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchJournalistCondDto,
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
        await filterPressApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const handleMediaChangeSort = async (
    e: SelectListOptionItem,
    i: SelectListOptionItem,
    sortValue: string,
    params: ESearchMediaCondDto,
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
      'sort',
      idKey,
      tempOwnerKey,
      tempEditPageOpen
    )
  }

  const handleMediaChangeSize = async (
    e: number,
    params: ESearchMediaCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...params,
      page: 1,
      size: e,
    }
    await getMediaBySearchOption(apiParam, 'size', idKey, tempOwnerKey, tempEditPageOpen)
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
      dispatch(blockedEmailSenderPopupAction({ isOpen: false, type: '', status: '', idKey: '' }))
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

  const resetMediaListSearchList = async (ownerKey: boolean, idKey: number) => {
    let filterParam: UseGetJournalistCustomSearchListParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
    }
    if (ownerKey) filterParam.ownerId = userInfo.userId
    const savedMediaData = await getMediaRegisterList(filterParam, idKey, 'media')
    dispatch(
      setResetMediaSavedSearchListAction({
        tempSavedMediaList: savedMediaData.list,
      })
    )
  }

  const resetPressListSearchList = async (ownerKey: boolean, idKey: number) => {
    let filterParam: UseGetJournalistCustomSearchListParams = {
      page: 1,
      groupId: userSelectGroup,
      size: 100000,
      sort: ['updateAt!desc'],
    }
    if (ownerKey) filterParam.ownerId = userInfo.userId
    const savedJournalData = await getPressRegisterList(filterParam, idKey, 'press')
    dispatch(
      setResetPressSavedSearchListAction({
        tempSavedJournalList: savedJournalData.list,
      })
    )
  }

  const selectedPressDeleteAction = async (param: contentDeletePopupProps, idKey: number, ownerKey: boolean) => {
    const { status, data, message } = await deleteJournalistGroup.mutateAsync({ id: Number(param.key) })
    if (status === 'S') {
      openToast(message?.message, 'success')
      if (idKey.toString() === param.key.toString()) {
        await router.replace('/contacts/list-result')
        router.reload()
      } else {
        await resetPressListSearchList(ownerKey, idKey)
        dispatch(contentDeletePopupAction({ isOpen: false, key: 0, title: '', type: '' }))
      }
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setIsClosePressFilterSubParamAction = async (
    mainId: number,
    pressApi: ESearchJournalistCondDto,
    tempOwnerKey: boolean
  ) => {
    let tempJournalDecodeList = {
      beemail: '',
      mobile: '',
      landline: '',
      landlineShared: '',
      fax: '',
    }
    try {
      const pressAPiDto = {
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
      const res = await getJournalist(pressAPiDto)
      if (res) {
        const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / pressDto.size)
        const filter = setObjectToBase64({
          ...pressAPiDto,
          journalist_id: journalData.length > 0 ? (journalData[0].jrnlst_id ? journalData[0].jrnlst_id : 0) : 0,
          media_id: 0,
          mediaArrayId: 0,
          journalArrayId: mainId,
          editPageOpen: false,
          ownerKey: tempOwnerKey ? userInfo.userId : 0,
        })
        if (journalData && journalData.length > 0) {
          tempJournalDecodeList = await checkPressUserInvalid(journalData[0])
        }
        dispatch(
          isPressFilterSubParamAction({
            dto: pressAPiDto,
            journalData,
            pageCount: {
              totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
              totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
            },
            filterJournalSubParamActions: subJournalFilterOptionsList,
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
            journalDecodeList: tempJournalDecodeList,
          })
        )
        await router.replace(`/contacts/list-result?filter=${filter}`, undefined, { shallow: true })
      }
      dispatch(journalLoadingAction(false))
    } catch (e) {}
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
            type === 'checked'
              ? setPressSearchRegistPopupAction(true, eSearchJournalist ? eSearchJournalist : [], autoPressRegistId.key)
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

  const afterMediaPopupReLoadAction = async (
    mediaKeyId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
    dto: ESearchMediaCondDto,
    originData: ESearchMediaDocumentDto[],
    originParam: ESearchMediaDocumentDto,
    deleteItem: number[],
    resultSearchRegisterListProps?: searchRegisterListProps[]
  ) => {
    if (deleteItem && deleteItem.length > 0) {
      const find = deleteItem.find(k => k.toString() === mediaKeyId?.toString())
      if (find) {
        await afterForceMediaPopupReLoad(mediaKeyId, tempOwnerKey, tempEditPageOpen, dto, originData, originParam)
      } else {
        await afterMediaRegistAddReLoad(dto, originData, originParam)
      }
    } else {
      await afterMediaRegistAddReLoad(dto, originData, originParam)
    }
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
  }

  const afterPressPopupReLoadAction = async (
    journalArrayId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
    dto: ESearchJournalistCondDto,
    originData: ESearchJournalistDocumentDto[],
    originParam: ESearchJournalistDocumentDto,
    deleteItem: number[],
    resultSearchRegisterListProps?: searchRegisterListProps[]
  ) => {
    if (deleteItem && deleteItem.length > 0) {
      const find = deleteItem.find(k => k.toString() === journalArrayId?.toString())
      if (find) {
        await afterForcePressPopupReLoad(journalArrayId, tempOwnerKey, tempEditPageOpen, dto, originData, originParam)
      } else {
        await afterPressRegistAddReLoad(dto, originData, originParam)
      }
    } else {
      await afterPressRegistAddReLoad(dto, originData, originParam)
    }
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
  }

  const afterForcePressPopupReLoad = async (
    journalArrayId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
    dto: ESearchJournalistCondDto,
    originData: ESearchJournalistDocumentDto[],
    originParam: ESearchJournalistDocumentDto
  ) => {
    let pressParam = originParam
    let pressList = [...originData]
    let tempMediaSubTypeList: mediaSubTypeListProps[] = []
    let tempJournalistOccupationList: SelectListOptionItem[] = []
    let tempJournalistSocialFilterList: SelectListOptionItem[] = []
    let tempMediaValueList: SelectListOptionItem[] = []
    let tempMediaInfoTypeList: SelectListOptionItem[] = []
    let tempMediaPubCycleList: SelectListOptionItem[] = []
    let tempMediaPortalCodeList: SelectListOptionItem[] = []
    let tempMediaTypeList: SelectListOptionItem[] = []
    let preloadCommonCode: CommonCode[] = []
    let journalFilterSub = subJournalFilterListList
    let pressFilterSubActions = subJournalFilterOptionsList
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
    let apiDto: ESearchJournalistCondDto = {
      page: 1,
      size: 20,
      sort: ['media.main.price!desc', 'news.recent_3m_count!desc'],
      journalistIdList: dto.journalistIdList,
      groupId: userSelectGroup,
    }
    //dispatch(journalLoadingAction(true))
    try {
      const res = await getJournalist(apiDto)
      if (res) {
        const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / apiDto.size)
        if (journalData && journalData.length > 0) {
          const find = journalData.find(k => k.jrnlst_id === originParam?.jrnlst_id)
          if (find) {
            pressParam = find
          } else {
            pressParam = journalData[0]
          }
          pressList = journalData
        }
        const filter = setObjectToBase64({
          ...pressDto,
          journalist_id: pressParam.jrnlst_id,
          media_id: 0,
          mediaArrayId: 0,
          journalArrayId: Number(journalArrayId),
          editPageOpen: tempEditPageOpen,
          ownerKey: tempOwnerKey ? userInfo.userId : 0,
        })
        await router.replace(`/contacts/list-result?filter=${filter}`, undefined, { shallow: true })
        tempPageCount = {
          totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
          totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
        }
        tempJournalDecodeList = await checkPressUserInvalid(pressParam)
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
          } else if (re.id === 'MEDIA_INFO_TYPE') {
            tempMediaInfoTypeList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
          } else if (re.id === 'PUB_CYCLE') {
            tempMediaPubCycleList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
          } else if (re.id === 'PORTAL_CODE') {
            tempMediaPortalCodeList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
          } else if (re.id === 'JRNLST_SOCIAL_FILTER_ID') {
            tempJournalistSocialFilterList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
            dispatch(journalistSocialFilterListAction([{ id: '', name: '선택' }, ...tempJournalistSocialFilterList]))
          } else if (re.id === 'JOURNALIST_OCCUPATION') {
            tempJournalistOccupationList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
            dispatch(journalistOccupationListAction(tempJournalistOccupationList))
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
          }
        }
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
      dispatch(
        afterPressRegistAddPressListAction({
          list: pressList,
          pressParam: pressParam,
          tempPageCount,
          filterSub: journalFilterSub,
          filterSubActions: pressFilterSubActions,
          apiDto,
          journalDecodeList: tempJournalDecodeList,
          isReset: true,
        })
      )
    } catch (e) {}
    //dispatch(journalLoadingAction(false))
    dispatch(initPressMediaListBookPopupAction())
  }

  const afterForceMediaPopupReLoad = async (
    mediaKeyId: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
    dto: ESearchMediaCondDto,
    originData: ESearchMediaDocumentDto[],
    originParam: ESearchMediaDocumentDto
  ) => {
    let mediaParam = originParam
    let mediaList = [...originData]
    let tempMediaSubTypeList: mediaSubTypeListProps[] = []
    let tempMediaValueList: SelectListOptionItem[] = []
    let tempMediaInfoTypeList: SelectListOptionItem[] = []
    let tempMediaPubCycleList: SelectListOptionItem[] = []
    let tempMediaPortalCodeList: SelectListOptionItem[] = []
    let tempMediaTypeList: SelectListOptionItem[] = []
    let preloadCommonCode: CommonCode[] = []
    let mediaFilterSub = subMediaFilterListList
    let mediaFilterSubActions = subMediaFilterOptionsList
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 1,
    }
    let apiDto: ESearchMediaCondDto = {
      page: 1,
      size: 20,
      sort: ['name!asc'],
      mediaIdList: dto.mediaIdList,
      groupId: userSelectGroup,
    }
    try {
      const res = await getMediaList(apiDto)
      if (res) {
        const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
        const totalSize = res.totalElements as number
        const totalPage = Math.ceil(totalSize / apiDto.size)
        if (mediaData && mediaData.length > 0) {
          const find = mediaData.find(k => k.mid === originParam?.mid)
          if (find) {
            mediaParam = find
          } else {
            mediaParam = mediaData[0]
          }
          mediaList = mediaData
        }
        const filter = setObjectToBase64({
          ...pressDto,
          journalist_id: 0,
          media_id: mediaParam.mid,
          mediaArrayId: Number(mediaKeyId),
          journalArrayId: 0,
          editPageOpen: tempEditPageOpen,
          ownerKey: tempOwnerKey ? userInfo.userId : 0,
        })
        await router.replace(`/media/list-result?filter=${filter}`, undefined, { shallow: true })
        tempPageCount = {
          totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
          totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
        }
        if (mediaParam) {
          await mediaPersonalContactInfo(mediaParam?.mid || 0)
          await mediaExcluded(mediaParam?.mid || 0)
          await checkMediaUserInvalid(mediaParam)
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
          } else if (re.id === 'MEDIA_INFO_TYPE') {
            tempMediaInfoTypeList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
          } else if (re.id === 'PUB_CYCLE') {
            tempMediaPubCycleList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
          } else if (re.id === 'PORTAL_CODE') {
            tempMediaPortalCodeList = preloadCommonCode.map(e => {
              return { id: e.code, name: e.name }
            })
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
          }
          mediaFilterSub = await getMediaFilterOptionControlData(
            res,
            apiDto,
            tempMediaValueList,
            tempMediaInfoTypeList,
            tempMediaPubCycleList,
            tempMediaPortalCodeList,
            tempMediaTypeList,
            tempMediaSubTypeList
          )
        }
      }
      dispatch(
        afterMediaRegistAddMediaListAction({
          list: mediaList,
          mediaParam: mediaParam,
          tempPageCount,
          filterSub: mediaFilterSub,
          filterSubActions: mediaFilterSubActions,
          apiDto,
          isReset: true,
        })
      )
    } catch (e) {}
    //dispatch(mediaLoadingAction(false))
    dispatch(initPressMediaListBookPopupAction())
  }

  const afterMediaRegistAddReLoad = async (
    dto: ESearchMediaCondDto,
    originData: ESearchMediaDocumentDto[],
    originParam: ESearchMediaDocumentDto
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
          mediaParam = find ? find : mediaData[0]
          mediaList = mediaData
        }
      }
      dispatch(
        afterMediaRegistAddMediaListAction({
          list: mediaList,
          mediaParam: mediaParam,
        })
      )
    } catch (e) {}
    //dispatch(mediaLoadingAction(false))
    dispatch(initPressMediaListBookPopupAction())
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
    originParam: ESearchJournalistDocumentDto
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
      dispatch(
        afterPressRegistAddPressListAction({
          list: pressList,
          pressParam: pressParam,
        })
      )
    } catch (e) {}
    //dispatch(journalLoadingAction(false))
    dispatch(initPressMediaListBookPopupAction())
  }

  const setIsCloseMediaFilterSubParamAction = async (
    mainId: number,
    mediaApi: ESearchMediaCondDto,
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
    const res = await getMediaList(mediaApiDto)
    if (res) {
      const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / mediaApiDto.size)
      const filter = setObjectToBase64({
        ...mediaApiDto,
        journalist_id: 0,
        media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
        mediaArrayId: mainId,
        journalArrayId: 0,
        editPageOpen: false,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      if (mediaData && mediaData.length > 0) {
        await mediaPersonalContactInfo(mediaData[0]?.mid || 0)
        await mediaExcluded(mediaData[0]?.mid || 0)
        await checkMediaUserInvalid(mediaData[0])
      }
      dispatch(
        isMediaFilterSubParamAction({
          dto: mediaApiDto,
          mediaData,
          pageCount: {
            totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
          },
          mediaFilterSubActions: subMediaFilterOptionsList,
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
        })
      )
      await router.replace(`/media/list-result?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(mediaLoadingAction(false))
  }

  const setOwnerKey = async (type: string, tempOwnerKey: boolean, tempEditPage: boolean) => {
    const filter = setObjectToBase64({
      editPageOpen: tempEditPage,
      ownerKey: tempOwnerKey ? userInfo.userId : 0,
    })
    if (type === 'press') {
      await router.replace(`/contacts/list-result?filter=${filter}`, undefined, { shallow: true })
    } else {
      await router.replace(`/media/list-result?filter=${filter}`, undefined, { shallow: true })
    }
    await init()
  }

  const selectedMediaDeleteAction = async (param: contentDeletePopupProps, idKey: number, ownerKey: boolean) => {
    const { status, data, message } = await deleteMedialistGroup.mutateAsync({ id: param.key })
    if (status === 'S') {
      openToast(message?.message, 'success')
      if (idKey.toString() === param.key.toString()) {
        await router.replace('/media/list-result')
        router.reload()
      } else {
        await resetMediaListSearchList(ownerKey, idKey)
        dispatch(contentDeletePopupAction({ isOpen: false, key: 0, title: '', type: '' }))
      }
    } else {
      openToast(message?.message, 'error')
    }
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
      dispatch(blockedEmailSenderPopupAction({ isOpen: false, type: '', status: '', idKey: '' }))
    } else {
      openToast(message?.message, 'error')
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

  const handleMediaPaginationChange = async (
    e: number,
    params: ESearchMediaCondDto,
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
        'page',
        idKey,
        tempOwnerKey,
        tempEditPageOpen
      )
    }
  }
  const getMediaBySearchOption = async (
    params: ESearchMediaCondDto,
    type: string,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    dispatch(mediaLoadingAction(true))
    const res = await getMediaList(params)
    if (res) {
      const mediaData = res.name as unknown as ESearchMediaDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / params.size)
      const filter = setObjectToBase64({
        ...params,
        journalist_id: 0,
        media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
        mediaArrayId: Number(idKey),
        journalArrayId: 0,
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      if (mediaData && mediaData.length > 0) {
        await mediaPersonalContactInfo(mediaData[0]?.mid || 0)
        await mediaExcluded(mediaData[0]?.mid || 0)
        await checkMediaUserInvalid(mediaData[0])
      }
      dispatch(
        setOnChangeMediaSearchOptionAction({
          dto: params,
          mediaData,
          isResetSelectedNews: type === 'size',
          pageCount: {
            totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
          },
        })
      )
      await router.replace(`/media/list-result?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(mediaLoadingAction(false))
  }

  const handlePressChangeSort = async (
    e: SelectListOptionItem,
    i: SelectListOptionItem,
    sortValue: string,
    params: ESearchJournalistCondDto,
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
      'sort',
      idKey,
      tempOwnerKey,
      tempEditPageOpen
    )
  }

  const getPressBySearchOption = async (
    params: ESearchJournalistCondDto,
    type: string,
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
    const res = await getJournalist(params)
    if (res) {
      const journalData = res.name as unknown as ESearchJournalistDocumentDto[]
      const totalSize = res.totalElements as number
      const totalPage = Math.ceil(totalSize / params.size)
      const filter = setObjectToBase64({
        ...params,
        journalist_id: journalData.length > 0 ? (journalData[0].jrnlst_id ? journalData[0].jrnlst_id : 0) : 0,
        media_id: 0,
        mediaArrayId: 0,
        journalArrayId: Number(idKey),
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      if (journalData && journalData.length > 0) {
        tempJournalDecodeList = await checkPressUserInvalid(journalData[0])
      }
      dispatch(
        setOnChangePressSearchOptionAction({
          dto: params,
          journalData,
          isResetSelectedNews: type === 'size',
          pageCount: {
            totalCount: journalData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: journalData.length > 0 ? totalPage ?? 0 : 0,
          },
          journalDecodeList: tempJournalDecodeList,
        })
      )
      await router.replace(`/contacts/list-result?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(journalLoadingAction(false))
  }

  const filterPressApiAction = async (
    filterDto: ESearchJournalistCondDto,
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
        journalist_id: journalData.length > 0 ? (journalData[0].jrnlst_id ? journalData[0].jrnlst_id : 0) : 0,
        media_id: 0,
        mediaArrayId: 0,
        journalArrayId: Number(idKey),
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      if (journalData && journalData.length > 0) {
        tempJournalDecodeList = await checkPressUserInvalid(journalData[0])
      }
      dispatch(
        setOnChangePressFilterSearchOptionAction({
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
      await router.replace(`/contacts/list-result?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(journalLoadingAction(false))
  }

  const filterMediaApiAction = async (
    filterDto: ESearchMediaCondDto,
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
        journalist_id: 0,
        media_id: mediaData.length > 0 ? (mediaData[0].mid ? mediaData[0].mid : 0) : 0,
        mediaArrayId: Number(idKey),
        journalArrayId: 0,
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      if (mediaData && mediaData.length > 0) {
        await mediaPersonalContactInfo(mediaData[0]?.mid || 0)
        await mediaExcluded(mediaData[0]?.mid || 0)
        await checkMediaUserInvalid(mediaData[0])
      }
      dispatch(
        setOnChangeMediaFilterSearchOptionAction({
          dto: filterDto,
          tempFilterSubParam: tempFilterSubParam,
          mediaData,
          pageCount: {
            totalCount: mediaData.length > 0 ? totalSize ?? 0 : 0,
            totalPageCount: mediaData.length > 0 ? totalPage ?? 0 : 0,
          },
        })
      )
      await router.replace(`/media/list-result?filter=${filter}`, undefined, { shallow: true })
    }
    dispatch(mediaLoadingAction(false))
  }

  const setMediaExtractExtraFilterSearch = async (
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchMediaCondDto,
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
      await filterMediaApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
    }
  }

  const setPressExtractExtraFilterSearch = async (
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchJournalistCondDto,
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
      await filterPressApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
    }
  }

  const setMediaAddAllExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchMediaCondDto,
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
        await filterMediaApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setMediaDeleteGroupExtraFilterSearch = async (
    key: NavigationLinkItem[],
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchMediaCondDto,
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
        await filterMediaApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setMediaAddExtraFilterSearch = async (
    e: ChangeEvent<HTMLInputElement>,
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    hook: ESearchMediaCondDto,
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
        await filterMediaApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
      }
    } catch (e) {}
  }

  const setInitPressFilterSubParamActionsAction = async (
    apiParam: ESearchJournalistCondDto,
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
    await filterPressApiAction(filterDto, subJournalFilterOptionsList, idKey, tempOwnerKey, tempEditPageOpen)
  }
  const setInitMediaFilterSubParamActionsAction = async (
    apiParam: ESearchMediaCondDto,
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
    await filterMediaApiAction(filterDto, subMediaFilterOptionsList, idKey, tempOwnerKey, tempEditPageOpen)
  }

  const setMediaAddExtraSelectedFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchMediaCondDto,
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
      await filterMediaApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
    }
  }

  const setPressAddExtraSelectedFilterSearch = async (
    key: NavigationLinkItem,
    item: filterSubParamActionsProps[],
    keyValue: number,
    apiParam: ESearchJournalistCondDto,
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
      await filterPressApiAction(filterDto, tempFilterSubParam, idKey, tempOwnerKey, tempEditPageOpen)
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

  const createMediaPersonalContact = async (props: addPersonalContactProps, idKey: number, tabType: string) => {
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
          })
        )
      }
    } catch (e) {}
    dispatch(activityLoadingAction(false))
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
      await mediaPersonalContactInfo(props.mid || 0)
      await mediaExcluded(props.mid || 0)
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

  const pressKeywordSearch = async (
    e: string,
    params: ESearchJournalistCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...params,
      filter: e,
      page: 1,
    }
    await getPressBySearchOption(apiParam, 'filter', idKey, tempOwnerKey, tempEditPageOpen)
  }

  const handlePressChangeSize = async (
    e: number,
    params: ESearchJournalistCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...params,
      page: 1,
      size: e,
    }
    await getPressBySearchOption(apiParam, 'size', idKey, tempOwnerKey, tempEditPageOpen)
  }

  const handlePressPaginationChange = async (
    e: number,
    params: ESearchJournalistCondDto,
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
      idKey: number,
      dto: ESearchMediaCondDto,
      tempOwnerKey: boolean,
      tempEditPageOpen: boolean
    ) => {
      const filter = setObjectToBase64({
        ...dto,
        journalist_id: 0,
        media_id: Number(e.mid),
        mediaArrayId: Number(idKey),
        journalArrayId: 0,
        editPageOpen: tempEditPageOpen,
        ownerKey: tempOwnerKey ? userInfo.userId : 0,
      })
      await mediaPersonalContactInfo(Number(e?.mid) || 0)
      await mediaExcluded(Number(e?.mid) || 0)
      await checkMediaUserInvalid(e)
      dispatch(mediaIdParamsAction(e))
      await router.replace(`/media/list-result?filter=${filter}`, undefined, { shallow: true })
    },
    [mediaIdKeyParam, mediaIdKey]
  )

  const mediaKeywordSearch = async (
    e: string,
    params: ESearchMediaCondDto,
    idKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean
  ) => {
    const apiParam = {
      ...params,
      filter: e,
      page: 1,
    }
    await getMediaBySearchOption(apiParam, 'filter', idKey, tempOwnerKey, tempEditPageOpen)
  }

  const mediaFilterOptionAction = async (
    keyOption: string,
    props: ESearchMediaDocumentDto[],
    filterDto: ESearchMediaCondDto,
    mediaKey: number,
    tempOwnerKey: boolean,
    tempEditPageOpen: boolean,
    originData: ESearchMediaDocumentDto[],
    originParam: ESearchMediaDocumentDto
  ) => {
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
        } else if (keyOption === 'excel') {
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
            openToast('내보내기에 성공하였습니다', 'success')
          } else {
            openToast('내보내기에 실패하였습니다', 'error')
          }
        } else if (keyOption === 'delete') {
          const filter = setObjectToBase64({
            ...filterDto,
            page: 1,
            journalist_id: 0,
            media_id: 0,
            mediaArrayId: Number(mediaKey),
            journalArrayId: 0,
            editPageOpen: editPageOpen,
          })
          await router.replace(`/media/list-result?filter=${filter}`, undefined, { shallow: true })
          const { status, message } = await mediaGroupDeleteMedia.mutateAsync({
            // @ts-ignore
            mediaListIdList: [Number(mediaKey)],
            // @ts-ignore
            mediaIdList: props.map(e => {
              return Number(e.mid)
            }),
          })
          if (status === 'S') {
            await afterForceMediaPopupReLoad(
              mediaKey,
              tempOwnerKey,
              tempEditPageOpen,
              filterDto,
              originData,
              originParam
            )
          } else {
            openToast(message?.message, 'error')
          }
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
    arrayMediaList,
    arrayJournalList,
    savedJournalListKeyword,
    savedMediaListKeyword,
    mediaApiList,
    journalApiList,
    journalIdKey,
    mediaIdKey,
    mediaLoading,
    journalLoading,
    journalArrayId,
    mediaArrayId,
    filterJournalSubParam,
    filterMediaSubParam,
    filterMediaSubParamActions,
    filterJournalSubParamActions,
    mediaTypePopup,
    originArrayJournalList,
    originArrayMediaList,
    searchContentKeyList,
    isTagButton,
    isSelectedAllNewsId,
    searchContentListButton,
    mediaParamsExpandButton,
    pressParamsExpandButton,
    arrayJournalAuth,
    arrayMediaAuth,
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
    pressCheckDuplicateParam,
    duplicationMediaPopup,
    duplicationPressPopup,
    userPopup,
    contentDeletePopup,
    userPressListAutoSaveData,
    userMediaListAutoSaveData,
    publisherTypeList,
    timeZone,
    searchLimitAlarm,
    journalContactBlockedInfo,
    profileImageId,
    contentListImageId,
    isDemoLicense,

    init,
    getJournalistByKeyword,
    getMediaListByKeyword,
    setMediaChangeCategoryId,
    setPressChangeCategoryId,
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
    medialistPhotoPopupAdjust,
    journalistPhotoPopupAdjust,
    pressMediaErrAction,
    pressFilterOptionAction,
    filterAddCount,
    setPressAddExtraSelectedFilterSearch,
    setPressExtractExtraFilterSearch,
    setPressAddExtraFilterSearch,
    setPressAddAllExtraFilterSearch,
    setPressDeleteGroupExtraFilterSearch,
    setInitPressFilterSubParamActionsAction,
    setInitMediaFilterSubParamActionsAction,
    setMediaExtractExtraFilterSearch,
    setMediaAddExtraFilterSearch,
    setMediaDeleteGroupExtraFilterSearch,
    setMediaAddAllExtraFilterSearch,
    setMediaAddExtraSelectedFilterSearch,
    mediaFilterOptionAction,
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
    checkAutoRegisterSelectedPressRegist,
    checkAutoRegisterSelectedMediaRegist,
    checkAutoRegisterPressRegist,
    checkAutoRegisterMediaRegist,
    onChangeMediaPhotoFiles,
    onChangeJournalPhotoFiles,
    afterMediaRegistAddReLoad,
    afterPressRegistAddReLoad,
    afterMediaPopupReLoadAction,
    afterPressPopupReLoadAction,

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
    setProfileImageId,
    setPressMediaErrTitleAction,
    setPressMediaErrContentAction,
    setOpenfilterMediaSubParamActions,
    setMediaAllSearchContentKeyList,
    setMediaParamsExpandButtonAction,
    setMediaParamKeywordAction,
    setMediaSearchContentKeyList,
    setContentListImageId,
    setOpenfilterJournalSubParamActions,
    setMediaNoticeClose,
    setDuplicationMediaPopupAction,
    setDuplicationPressPopupAction,
    setPressNoticeClose,
    setUserProfilePopupAction,
    setSelectedDeleteContent,
  }
}
