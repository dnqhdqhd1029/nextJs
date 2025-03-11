import { useCallback } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { ClipbookAutoRegisterContext } from '~/components/contents/common/forms/ClipbookListPopup/ClipbookAutoRegisterContext'
import {
  defaultEditOptionsByData,
  defaultNonUrlUserNewsEditOptionsByData,
  defaultUserNewsEditOptionsByData,
  extendedCommonCodeTargetList,
} from '~/components/contents/monitoring/News/defaultData'
import { MoveToNewsContext } from '~/components/contents/monitoring/News/popup/MoveToNewsContext'
import { defaultAPiParams } from '~/components/contents/monitoring/SearchResult/defaultData'
import { ALLOWED_ORIGINS, SVC_DOMAIN_URL, URL_REGEXP, URL_REGEXP_DESCRIPTION } from '~/constants/common'
import {
  newsDuplicationIdListSaga,
  userAutoSaveDataProps,
  userClipbookListAutoSaveDataAction,
} from '~/stores/modules/contents/extraData/extra'
import {
  initClipbookPopupAction,
  initStateClipbookListPopup,
} from '~/stores/modules/contents/monitoring/clipbookListPopup'
import {
  deletePopupAction,
  initNewsErrPopupPropsAction,
  initNewsLinkAction,
  mediaSubTypeListAction,
  newsApiParamsProps,
  newsDetailCheckDuplicateParamAction,
  newsEditPopupAction,
  newsEditPopupProps,
  newsErrPopupProps,
  newsErrPopupPropsAction,
  newsIdParamsAction,
  newsIdParamsProps,
  newsLinkAction,
  newsLinkLoadingAction,
  newsLoadingAction,
  personalLinkParamsAction,
  setNewsDetailAction,
  toneListAction,
  userPopupAction,
} from '~/stores/modules/contents/monitoring/newsDetail'
import { sharedKeyAction } from '~/stores/modules/contents/shared/shared'
import { userInformationPopupAction } from '~/stores/modules/contents/user/user'
import {
  type AddDelNewsAndPrDto,
  type ElasticSearchReturnDtoNewsDocumentDto,
  ESearchNewsCondDto,
  type ESearchNewsOwner,
  type RequestNewsUserDocDto,
  TagDto,
  type UserDto,
} from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { usePostInquiry, UsePostInquiryParams } from '~/utils/api/additionalServices/useGetLicenseInfo'
import { usePostUpdateClipbookToNewsPr } from '~/utils/api/clipbook/usePostUpdateClipbookToNewsPr'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { useDeleteCustomNews } from '~/utils/api/news/useDeleteCustomNews'
import { usePostNewsSearch, usePostNewsSearchByUrl } from '~/utils/api/news/usePostNewsSearch'
import { usePutCustomNewsUpdate } from '~/utils/api/news/usePutCustomNewsUpdate'
import { useDeleteTagging } from '~/utils/api/tagging/useDeleteTagging'
import { TaggingProps } from '~/utils/api/tagging/usePostTaggingAdd'
import { usePostTaggingExcept } from '~/utils/api/tagging/usePostTaggingExcept'
import { usePostTaggingReset } from '~/utils/api/tagging/usePostTaggingReset'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useMonitoringSearchDetail = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    newsIdParams,
    newsLoading,
    newsApiParams,
    toneList,
    mediaSubTypeList,
    deletePopup,
    isOwner,
    newsErrPopup,
    newsEditPopup,
    newsLinkLoading,
    userPopup,
    newsCheckDuplicateParam,
  } = useAppSelector(state => state.newsDetailSlice)
  const { isDemoLicense, licenseInfo, userInfo, userSelectGroup, timeZoneData, shareCodeData, timeZone } =
    useAppSelector(state => state.authSlice)
  const { newsDuplicationIdList, userClipbookListAutoSaveData } = useAppSelector(state => state.extraSlice)

  const userNewsDelete = useDeleteCustomNews()
  const getNewsSearchResult = usePostNewsSearch()
  const getNewsSearchResultByUrl = usePostNewsSearchByUrl()
  const newsToClipbookAction = usePostUpdateClipbookToNewsPr()
  const actionTaggingReset = usePostTaggingReset()
  const actionTaggingDelete = useDeleteTagging()
  const actionTaggingAllDelete = usePostTaggingExcept()
  const apiInquiryAction = usePostInquiry()
  const apiUserNewsEdit = usePutCustomNewsUpdate()

  const setAllResetNewsEditPopupTagListAction = useCallback(
    (props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          tagList: [],
        })
      )
    },
    [newsEditPopup.tagList]
  )

  const setResetNewsEditPopupTagListAction = useCallback(
    (item: MbTagSearchTagItem, props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          tagList: _.cloneDeep(props.tagList).filter(tag => tag.id !== item.id),
        })
      )
    },
    [newsEditPopup.tagList]
  )

  const setAllResetNewsEditPopupCreateSuccess = useCallback(
    (item: TagDto, props: newsEditPopupProps) => {
      let newTags = _.cloneDeep(props.tagList)
      const isExist = newTags.find(tag => tag.id === item.tagId?.toString())
      if (!isExist) {
        newTags.push({
          id: item.tagId?.toString() ?? '',
          label: item.name ?? '',
        })
      }
      dispatch(
        newsEditPopupAction({
          ...props,
          tagList: newTags,
        })
      )
    },
    [newsEditPopup.tagList]
  )

  const setAllResetNewsEditPopupTagStatusChange = useCallback(
    (e: MbTagSearchTagItem[], props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          tagList: e,
        })
      )
    },
    [newsEditPopup.tagList]
  )

  const setResetNewsEditPopupClipBookAction = useCallback(
    (item: MbTagSearchTagItem, props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          clipbookList: _.cloneDeep(props.clipbookList).filter(tag => tag.id !== item.id),
        })
      )
    },
    [newsEditPopup.clipbookList]
  )

  const setAllResetNewsEditPopupClipBookAction = useCallback(
    (props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          clipbookList: [],
        })
      )
    },
    [newsEditPopup.clipbookList]
  )

  const setonTagListChangeTargetAuthorAction = useCallback(
    (i: MbTagSearchTagItem[], props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          targetAuthor: i,
          targetAuthorErr: '',
        })
      )
    },
    [newsEditPopup.targetAuthor]
  )
  const setonTagListChangeTargetMediaAction = useCallback(
    (e: MbTagSearchTagItem[], props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          targetMedia: e,
          targetMediaErr: '',
        })
      )
    },
    [newsEditPopup.targetMedia]
  )

  const setNewsEditPopupWebsiteErrAction = useCallback(
    (e: string, props: newsEditPopupProps) => {
      const param = {
        ...props,
        website: e,
        websiteErr: '',
      }
      dispatch(newsEditPopupAction(param))
    },
    [newsEditPopup.website]
  )

  const setNewsEditPopupCalendarAction = useCallback(
    (date: Date, props: newsEditPopupProps) => {
      const param = {
        ...props,
        selectedDate: date,
        dateErrorMessage: '',
      }
      dispatch(newsEditPopupAction(param))
    },
    [newsEditPopup.selectedDate]
  )

  const setNewsEditPopupTitleAction = useCallback(
    (e: string, props: newsEditPopupProps) => {
      const param = {
        ...props,
        title: e,
        titleErr: '',
      }
      dispatch(newsEditPopupAction(param))
    },
    [newsEditPopup.title]
  )

  const setNoticeClose = useCallback(
    (id: number) => {
      dispatch(newsDuplicationIdListSaga([...newsDuplicationIdList, id]))
    },
    [newsCheckDuplicateParam]
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

  const setDeleteLinkAction = useCallback(
    async (props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          link: '',
          linkList: [],
          linkErr: '',
          isRenew: true,
        })
      )
    },
    [newsEditPopup.link, newsEditPopup.linkList, newsEditPopup.linkErr, newsEditPopup.isRenew]
  )

  const setNewsEditPopupSelectedTimeAction = useCallback(
    (hours: number, minutes: number, props: newsEditPopupProps) => {
      const param = {
        ...props,
        selectedTime: { hours, minutes },
      }
      dispatch(newsEditPopupAction(param))
    },
    [newsEditPopup.selectedTime]
  )

  const setNewsEditPopupLinkAction = useCallback(
    (e: string) => {
      dispatch(personalLinkParamsAction(e))
    },
    [newsEditPopup.link]
  )

  const setDeleteTagListChangeTargetMediaAction = useCallback(
    (props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          targetMedia: [],
        })
      )
    },
    [newsEditPopup.targetMedia]
  )

  const setDeleteTagListChangeTargetAuthorAction = useCallback(
    (item: MbTagSearchTagItem, props: newsEditPopupProps) => {
      let params = {
        ...props,
      }
      if (item.id && item.id.toString() !== '') {
        params = {
          ...props,
          targetAuthor: [...props.targetAuthor].filter(tag => tag.id !== item.id),
        }
      } else {
        params = {
          ...props,
          targetAuthor: [...props.targetAuthor].filter(tag => tag.label !== item.label),
        }
      }
      dispatch(newsEditPopupAction(params))
    },
    [newsEditPopup.targetAuthor]
  )

  const setAllDeleteTagListChangeTargetAuthorAction = useCallback(
    (props: newsEditPopupProps) => {
      dispatch(
        newsEditPopupAction({
          ...props,
          targetAuthor: [],
        })
      )
    },
    [newsEditPopup.targetAuthor]
  )

  const tagCreateSuccessOnChange = useCallback(
    (item: TagDto, hook: newsIdParamsProps, dto: ESearchNewsCondDto) => {
      let newTags = _.cloneDeep(hook.tagList)
      const isExist = newTags.find(tag => tag.id === item.tagId?.toString())
      if (!isExist) {
        newTags.push({
          id: item.tagId?.toString() ?? '',
          label: item.name ?? '',
        })
      }
      const param = {
        ...hook,
        tagList: newTags,
      }
      dispatch(newsIdParamsAction(param))
      editTaggingAction(param, dto)
    },
    [newsIdParams?.tagList]
  )

  const tagStatusOnChange = useCallback(
    (item: MbTagSearchTagItem[], hook: newsIdParamsProps, dto: ESearchNewsCondDto) => {
      const param = {
        ...hook,
        tagList: item,
      }
      dispatch(newsIdParamsAction(param))
      editTaggingAction(param, dto)
    },
    [newsIdParams?.tagList]
  )

  const setSelectedDeleteData = useCallback(
    async (e: number, i: string, isOpen: boolean) =>
      dispatch(
        deletePopupAction({
          key: e,
          title: i,
          isOpen,
        })
      ),
    [deletePopup]
  )

  const initNewsEditPopupData = useCallback(async () => dispatch(initNewsLinkAction()), [newsEditPopup])
  const initNewsErrPopupData = useCallback(async () => dispatch(initNewsErrPopupPropsAction()), [newsErrPopup])

  const setNewsErrPopupTitleAction = useCallback(
    async (e: string, props: newsErrPopupProps) => {
      const param = {
        ...props,
        title: e,
        titleErr: '',
      }
      dispatch(newsErrPopupPropsAction(param))
    },
    [newsErrPopup.title]
  )

  const setNewsErrPopupContentAction = useCallback(
    async (e: string, props: newsErrPopupProps) => {
      const param = {
        ...props,
        contents: e,
        contentErr: '',
      }
      dispatch(newsErrPopupPropsAction(param))
    },
    [newsErrPopup.contents]
  )

  const tagCloseOnChange = (
    item: MbTagSearchTagItem,
    hook: newsIdParamsProps,
    dto: ESearchNewsCondDto,
    newsParam: newsIdParamsProps
  ) => {
    if (hook && hook?.taggingList && hook?.taggingList.length > 0) {
      const taggingId = hook?.taggingList.find(e => e?.tagId?.toString() === item?.id.toString())
      deleteTaggingAction(Number(taggingId?.taggingId), dto, newsParam)
    }
  }

  const addAutoClipbookNews = async (idKey: number[], newsIdList: number[], newsIndexItem: string[]) => {
    let res = ''
    let newsToClipbookparams: AddDelNewsAndPrDto = {
      // @ts-ignore
      clipBookId: idKey[0],
      newsId: newsIdList[0],
      newsIndex: newsIndexItem[0],
    }
    const { status, message } = await newsToClipbookAction.mutateAsync({
      type: 'addone',
      info: newsToClipbookparams,
    })
    if (status) {
      res = status
    }
    return res
  }

  const addClipbookNews = async (idKey: number[], newsIdList: number[], newsIndexItem: string[]) => {
    let newsToClipbookparams: AddDelNewsAndPrDto = {
      // @ts-ignore
      clipBookIdList: idKey,
      newsIdList: newsIdList,
      newsIndexList: newsIndexItem,
    }
    const { status, message } = await newsToClipbookAction.mutateAsync({
      type: 'add',
      info: newsToClipbookparams,
    })
    if (status !== 'S') {
      openToast(message?.message, 'error')
    }
    return status
  }

  const personalEditAction = async (props: newsEditPopupProps, idKey: newsIdParamsProps) => {
    let tagList: number[] = []
    let autherList: { id: number; name: string }[] = []
    let clipbookList: number[] = []
    let returnValue = ''
    try {
      let params: RequestNewsUserDocDto = {
        // @ts-ignore
        is_linked: false,
        link_summary: '',
        link_title: '',
        link_id: '',
        title: props.title ?? '',
        link: props.link,
        year: moment(props.selectedDate).format('YYYY'),
        month: moment(props.selectedDate).format('MM'),
        day: moment(props.selectedDate).format('DD'),
        // @ts-ignore
        hour: props.selectedTime.hours.toString(),
        // @ts-ignore
        min: props.selectedTime.minutes.toString(),
        timezone: timeZone,
        journalists: [],
      }
      if (props.isRenew) {
        if (props.linkList.length > 0) {
          // @ts-ignore
          params.is_linked = true
          // @ts-ignore
          params.link_summary = `${props.linkList[0]?.mname},${props.linkList[0].authors}` ?? ''
          // @ts-ignore
          params.link_title = props.linkList[0]?.title
          // @ts-ignore
          params.link_id = props.linkList[0]?.newsid
        }
      } else {
        // @ts-ignore
        params.is_linked = idKey.owner.is_linked
        // @ts-ignore
        params.link_summary = idKey.owner.link_summary
        // @ts-ignore
        params.link_title = idKey.owner.link_title
        // @ts-ignore
        params.link_id = idKey.owner.link_id
      }
      if (props.targetMedia.length > 0) {
        params.mediaId = props.targetMedia[0].id === '' ? 0 : Number(props.targetMedia[0].id)
        params.mediaName = props.targetMedia[0].label === '' ? '' : props.targetMedia[0].label
      }
      if (props.targetAuthor.length > 0) {
        for await (const e of props.targetAuthor) {
          autherList = [
            ...autherList,
            {
              name: e.label,
              id: Number(e.id),
            },
          ]
        }
        params.journalists = autherList
      }
      if (props.tagList.length > 0) {
        for await (const e of props.tagList) {
          if (e.id) {
            tagList = [...tagList, Number(e.id)]
          }
        }
        params.tagIdList = tagList
      }
      if (props.clipbookList) {
        for await (const e of props.clipbookList) {
          if (e.id) {
            clipbookList = [...clipbookList, Number(e.id)]
          }
        }
        params.clipbookIdList = clipbookList
      }
      const { status, message, data } = await apiUserNewsEdit.mutateAsync({
        id: Number(idKey.newsid),
        info: params,
      })
      if (status === 'S') {
        openToast(message?.message, 'success')
        returnValue = status
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    return returnValue
  }

  const optionActions = async (idKey: string, props: newsIdParamsProps) => {
    if (idKey === 'copy') {
      await navigator.clipboard.writeText(props?.link || '')
      openToast('뉴스 원본 URL이 복사되었습니다.', 'success')
    } else if (idKey === 'find') {
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
    } else if (idKey === 'delete') {
      dispatch(
        deletePopupAction({
          key: props?.newsid || 0,
          title: props?.title || '알수없음',
          isOpen: true,
        })
      )
    } else if (idKey === 'report') {
      dispatch(
        newsErrPopupPropsAction({
          isOpen: true,
          newsTitle: props?.title || '알수없음',
          newsId: props?.newsid || 0,
          key: 0,
          title: '',
          titleErr: '',
          contents: '',
          contentErr: '',
        })
      )
    } else if (idKey === 'share') {
      dispatch(
        sharedKeyAction({
          key: props?.newsid || 0,
          title: '뉴스 공유 - ' + props?.title || '',
          editor: props?.title || '',
          type: 'NEWS',
          sharedUrl:
            process.env.MY_ENV_VAR === 'production'
              ? SVC_DOMAIN_URL.PROD
              : SVC_DOMAIN_URL.DEV + '/news/record/' + props.newsid?.toString(),
        })
      )
    } else {
      let tempCount = 0
      let targetMedia: MbTagSearchTagItem[] = []
      let targetAuthor: MbTagSearchTagItem[] = []
      if (props.mapped) {
        if (props.mapped.jname && props.mapped.jname.length > 0 && props.mapped.pid && props.mapped.pid.length) {
          for (const jele of props.mapped.jname) {
            targetAuthor = [
              ...targetAuthor,
              {
                id: props.mapped.pid[tempCount].toString(),
                label: jele.toString(),
              },
            ]
            tempCount += 1
          }
        }

        if (props.mapped.mid && props.mapped.mname) {
          targetMedia = [
            {
              id: props.mapped.mid.toString(),
              label: props.mapped.mname.toString(),
            },
          ]
        }
      }
      if (props.unmapped && props.unmapped.length > 0) {
        for (const jele of props.unmapped) {
          targetAuthor = [
            ...targetAuthor,
            {
              id: '',
              label: jele.toString(),
            },
          ]
        }
      }
      dispatch(
        newsEditPopupAction({
          isOpen: true,
          link: props.link && props.link !== '' ? props.link : '',
          linkErr: '',
          website: props.link && props.link !== '' ? props.link : '',
          websiteErr: '',
          isRenew: false,
          // @ts-ignore
          linkList: props.owner && props.owner.is_linked ? [props] : [],
          title: props?.title || '',
          titleErr: '',
          selectedDate: props?.inserted ? new Date(props.inserted) : new Date(),
          selectedTime: props.inserted
            ? {
                hours: Number(moment(props.inserted).format('HH')),
                minutes: Number(moment(props.inserted).format('mm')),
              }
            : { hours: 0, minutes: 0 },
          dateErrorMessage: '',
          targetMedia: targetMedia,
          targetAuthor: targetAuthor,
          targetMediaErr: '',
          targetAuthorErr: '',
          clipbookList: props.clipbookData,
          tagList: props.tagList,
        })
      )
    }
  }

  const newsErrReportPopupAction = async (
    props: newsErrPopupProps,
    dto: ESearchNewsCondDto,
    newsParam: newsIdParamsProps
  ) => {
    let titleErr = ''
    let contentErr = ''
    let params: UsePostInquiryParams = {
      request: {
        whyCode: 'NEWS_ERROR_REPORT',
        title: props.title,
        content: props.contents,
        //@ts-ignore
        newsId: props.newsId,
        //@ts-ignore
        targetTitle: props.newsTitle,
      },
      fileList: [],
    }
    try {
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
          await afterClipbookAction(dto, newsParam)
        } else {
          openToast(message?.message, 'error')
        }
      } else {
        const param = {
          ...props,
          titleErr,
          contentErr,
        }
        dispatch(newsErrPopupPropsAction(param))
      }
    } catch (e) {}
  }

  const selectedDeleteAction = async (e: number) => {
    let returnValue = ''
    const { status, message } = await userNewsDelete.mutateAsync(e)
    if (status === 'S') {
      openToast(message?.message, 'success')
      returnValue = status
    } else {
      openToast(message?.message, 'error')
    }
    return returnValue
  }

  const autoRegisterClipbookAction = (
    userClipbookList: userAutoSaveDataProps[],
    autoClipbookId: { key: string; name: string },
    type: string,
    apiDataList?: MonitoringSearchNewsDocumentDto[]
  ) => {
    let autoCompleteData = [...userClipbookList]
    if (autoCompleteData && autoCompleteData.length > 0) {
      const findIndex = autoCompleteData.findIndex(e => e.groupId.toString() === userSelectGroup.toString())
      if (findIndex !== undefined && findIndex !== null && findIndex > -1) {
        autoCompleteData[findIndex] = {
          groupId: userSelectGroup || 0,
          keyValue: Number(autoClipbookId.key),
          keyName: autoClipbookId.name,
        }
      } else {
        autoCompleteData = [
          ...autoCompleteData,
          {
            groupId: userSelectGroup || 0,
            keyValue: Number(autoClipbookId.key),
            keyName: autoClipbookId.name,
          },
        ]
      }
    } else {
      autoCompleteData = [
        ...autoCompleteData,
        {
          groupId: userSelectGroup || 0,
          keyValue: Number(autoClipbookId.key),
          keyName: autoClipbookId.name,
        },
      ]
    }
    dispatch(userClipbookListAutoSaveDataAction(autoCompleteData))
    if (type !== '') {
      openToast(
        ClipbookAutoRegisterContext({
          valueName: autoClipbookId.name,
          onChangeAction: () => {
            setOneClipbookPopupAction(true, apiDataList ? apiDataList[0] : null, autoClipbookId.key)
          },
        }),
        'success'
      )
    }
  }

  const insertNewsToClipbookId = async (
    clipbookIdKey: number[],
    newsid: number[],
    insertedDate: string[],
    autoClipbookId: { key: string; name: string },
    userClipbookList: userAutoSaveDataProps[],
    type: string,
    apiDataList?: MonitoringSearchNewsDocumentDto[]
  ) => {
    let res: any = ''
    if (autoClipbookId && autoClipbookId.key !== '' && autoClipbookId.name !== '' && userInfo?.userId) {
      res = await addAutoClipbookNews(
        autoClipbookId && autoClipbookId.key !== '' ? [Number(autoClipbookId.key)] : clipbookIdKey,
        newsid,
        insertedDate
      )
      if (res === 'S') {
        autoRegisterClipbookAction(userClipbookList, autoClipbookId, type, apiDataList)
      }
    } else {
      res = await addClipbookNews(
        autoClipbookId && autoClipbookId.key !== '' ? [Number(autoClipbookId.key)] : clipbookIdKey,
        newsid,
        insertedDate
      )
      if (res && res === 'S') {
        openToast('클립북에 담았습니다. ', 'success')
        // todo
      }
    }

    return res as string
  }

  const checkAutoRegisterClipbook = async (
    e: boolean,
    idList: newsIdParamsProps,
    userClipbookList: userAutoSaveDataProps[]
  ) => {
    let autoKey: userAutoSaveDataProps = {
      groupId: 0,
      keyValue: 0,
      keyName: '',
    }
    let isProcess = false
    if (userClipbookList && userClipbookList.length > 0) {
      const find = userClipbookList.find(i => i.groupId.toString() === userSelectGroup.toString())
      if (find) {
        autoKey = {
          groupId: userSelectGroup,
          keyValue: find.keyValue,
          keyName: find.keyName,
        }
        if (idList && idList.clipbookData && idList.clipbookData.length > 0) {
          const isAutoClipbookid = idList.clipbookData.find(k => Number(k.id) === Number(find.keyValue))
          if (isAutoClipbookid) {
            isProcess = true
          } else {
            const autoProcess = await insertNewsToClipbookId(
              [],
              [Number(idList.newsid)],
              [moment(idList.inserted).format('YYYYMM')],
              { key: find.keyValue.toString(), name: find.keyName },
              userClipbookList,
              'any',
              [idList]
            )
            if (autoProcess !== 'S') {
              isProcess = true
            }
          }
        } else {
          const autoProcess = await insertNewsToClipbookId(
            [],
            [Number(idList.newsid)],
            [moment(idList.inserted).format('YYYYMM')],
            { key: find.keyValue.toString(), name: find.keyName },
            userClipbookList,
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
      await setOneClipbookPopupAction(e, idList)
    } else {
      await afterClipbookAdd(idList, autoKey)
    }
  }

  const afterClipbookAdd = async (originParam: newsIdParamsProps, keyId: userAutoSaveDataProps) => {
    let newsParam = originParam
    newsParam = {
      ...newsParam,
      // @ts-ignore
      clipbookData:
        newsParam && newsParam?.clipbookData && newsParam?.clipbookData.length > 0
          ? [
              // @ts-ignore
              ...newsParam.clipbookData,
              {
                id: Number(keyId.keyValue),
                label: keyId?.keyName,
              },
            ]
          : [
              {
                id: Number(keyId.keyValue),
                label: keyId.keyName,
              },
            ],
    }
    dispatch(initStateClipbookListPopup())
    dispatch(newsIdParamsAction(newsParam))
  }

  const setOneClipbookPopupAction = async (
    e: boolean,
    idList: MonitoringSearchNewsDocumentDto | null,
    valueKey?: string
  ) => {
    let list: number[] = []
    // @ts-ignore
    if (idList && idList.clipbookData && idList.clipbookData.length > 0) {
      // @ts-ignore
      for await (const clipbookIdListProp of idList.clipbookData) {
        list = [...list, Number(clipbookIdListProp.id)]
      }
    }
    if (valueKey) {
      const find = list.find(k => k.toString() === valueKey)
      if (!find) {
        list = [...list, Number(valueKey)]
      }
    }
    dispatch(
      initClipbookPopupAction({
        isOpen: e,
        type: 'any',
        origin: list,
        list: list,
        except: [],
        idList: idList ? [idList] : [],
      })
    )
  }

  const deleteAllTaggingAction = async (
    props: newsIdParamsProps,
    dto: ESearchNewsCondDto,
    newsParam: newsIdParamsProps
  ) => {
    let param: TaggingProps = {
      category: 'NEWS',
      tagIdList: [],
      // @ts-ignore
      targetIdList: [Number(props.newsid)],
    }
    if (props.tagList.length > 0) {
      for (const tagIdListElement of props.tagList) {
        param.tagIdList = [...param.tagIdList, Number(tagIdListElement.id)]
      }
    }
    const { status, data, message } = await actionTaggingAllDelete.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await afterClipbookAction(dto, newsParam)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const deleteTaggingAction = async (props: number, dto: ESearchNewsCondDto, newsParam: newsIdParamsProps) => {
    const { status, data, message } = await actionTaggingDelete.mutateAsync(props)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await afterClipbookAction(dto, newsParam)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const editTaggingAction = async (props: newsIdParamsProps, dto: ESearchNewsCondDto) => {
    let param: TaggingProps = {
      category: 'NEWS',
      tagIdList: [],
      targetList: [
        {
          targetId: Number(props.newsid),
          newsIndexName: moment(props.inserted).format('YYYYMM'),
        },
      ],
    }
    console.log('1', param)
    if (props.tagList.length > 0) {
      for (const tagIdListElement of props.tagList) {
        param.tagIdList = [...param.tagIdList, Number(tagIdListElement.id)]
      }
    }
    console.log('2', param)
    const { status, data, message } = await actionTaggingReset.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await afterClipbookAction(dto, props)
    } else {
      openToast(message?.message, 'error')
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
      if (code === 'TONE') {
        dispatch(toneListAction(list))
      } else if (code === 'MEDIA_SUB_TYPE') {
        dispatch(mediaSubTypeListAction(list))
      }
      res = list
    }

    return res
  }

  const afterClipbookAction = async (dto: ESearchNewsCondDto, newsParam: newsIdParamsProps) => {
    let param: newsIdParamsProps = { ...newsParam }
    //dispatch(newsLoadingAction(true))
    try {
      const res = await getNewsSearchByMonitoring(dto)
      if (res) {
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        if (newsData.length > 0) {
          const res = newsData[0]
          param = {
            ...res,
            toneValue: newsParam.toneValue,
            mediaSubType: newsParam.mediaSubType,
            optionList: newsParam.optionList,
            tagList: newsParam.tagList,
            clipbookData:
              //@ts-ignore
              res.clipBookIdTitleList && res.clipBookIdTitleList.length > 0
                ? //@ts-ignore
                  res.clipBookIdTitleList.map(e => {
                    return { id: (e.id ?? '').toString(), label: (e.title ?? '').toString() }
                  })
                : [],
          }
          console.log('res.clipBookIdTitleList', res.clipBookIdTitleList)
        }
        console.log('param', param)
      }
    } catch (e) {
      console.log('e', e)
    }
    //dispatch(newsLoadingAction(false))
    dispatch(newsIdParamsAction(param))
    dispatch(initStateClipbookListPopup())
  }

  const init = async () => {
    let dto: newsApiParamsProps = defaultAPiParams
    let tempToneList: SelectListOptionItem[] = []
    let tempMediaSubTypeList: SelectListOptionItem[] = []
    dispatch(newsLoadingAction(true))
    console.log("window.location.search.substring(1).split('?')", window.location.pathname.split('/')[3])
    if (
      window.location &&
      window.location.pathname &&
      window.location.pathname.split('/') &&
      window.location.pathname.split('/').length > 0
    ) {
      const queryId = window.location.pathname.split('/')[3]
      dto = {
        newsIdList: [Number(queryId)],
        timezone: timeZone,
        groupId: userSelectGroup,
        periodStartYear: moment().subtract(2, 'year').format('YYYY'),
        periodStartMonth: moment().subtract(2, 'year').format('MM'),
        periodStartDay: moment().subtract(2, 'year').format('DD'),
        periodEndYear: moment().format('YYYY'),
        periodEndMonth: moment().format('MM'),
        periodEndDay: moment().format('DD'),
        page: 1,
        size: 10,
        sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
      }
      for await (const ereElement of extendedCommonCodeTargetList) {
        if (ereElement.id === 'TONE') {
          tempToneList = await getCommonCode(ereElement.id)
        } else if (ereElement.id === 'MEDIA_SUB_TYPE') {
          tempMediaSubTypeList = await getCommonCode(ereElement.id)
        }
      }
      const res = await getNewsSearchByMonitoring(dto)
      if (res) {
        const newsData = res.name as unknown as MonitoringSearchNewsDocumentDto[]
        if (newsData.length > 0) {
          const res = newsData[0]
          const find = tempToneList.find(e => e.id === res?.tone)
          const findMediaSubtype = tempMediaSubTypeList.find(e => e.id === res?.media_subtype)
          const isOwner = res.owner?.uid === userInfo.userId
          const getOptionList = () => {
            if (isOwner) {
              if (res.link && res.link !== '') {
                return defaultUserNewsEditOptionsByData
              } else {
                return defaultNonUrlUserNewsEditOptionsByData
              }
            } else {
              if (userInfo.role === 'ADMIN') {
                return [
                  {
                    id: 'delete',
                    name: '삭제하기',
                  },
                  ...defaultEditOptionsByData,
                ]
              } else {
                return defaultEditOptionsByData
              }
            }
          }
          const param: newsIdParamsProps = {
            ...res,
            toneValue: find ? find.name : '',
            mediaSubType: findMediaSubtype ? findMediaSubtype.name : '',
            optionList: getOptionList(),
            clipbookData:
              //@ts-ignore
              res.clipBookIdTitleList && res.clipBookIdTitleList.length > 0
                ? //@ts-ignore
                  res.clipBookIdTitleList.map(e => {
                    return { id: (e.id ?? '').toString(), label: (e.title ?? '').toString() }
                  })
                : [],
            tagList:
              res.taggingList && res.taggingList.length > 0
                ? res.taggingList.map(e => {
                    return { id: e.tagId?.toString() || '', label: e.tagName?.toString() || '' }
                  })
                : [],
          }
          dispatch(setNewsDetailAction({ param, dto, isOwner }))
          //@ts-ignore
          if (param.owner && param.owner?.uid && param.owner?.uid === userInfo.userId && param.owner.is_linked) {
            const find = newsDuplicationIdList.find(k => k === param.newsid)
            if (find) {
              dispatch(newsDetailCheckDuplicateParamAction(null))
            } else {
              if (
                //@ts-ignore
                param.owner.link_summary &&
                //@ts-ignore
                param.owner.link_summary !== '' &&
                //@ts-ignore
                param.owner.link_title &&
                //@ts-ignore
                param.owner.link_title !== '' &&
                //@ts-ignore
                param.owner.link_id &&
                //@ts-ignore
                param.owner.link_id !== ''
              ) {
                //@ts-ignore
                dispatch(
                  newsDetailCheckDuplicateParamAction([
                    //@ts-ignore
                    param.owner.link_id.toString(),
                    //@ts-ignore
                    param.owner.link_title.toString(),
                    //@ts-ignore
                    param.owner.link_summary.toString(),
                  ])
                )
              } else {
                dispatch(newsDetailCheckDuplicateParamAction(null))
              }
            }
          } else {
            dispatch(newsDetailCheckDuplicateParamAction(null))
          }
        } else {
          await router.replace('/404')
        }
      }
      dispatch(initStateClipbookListPopup())
      dispatch(newsLoadingAction(false))
    } else {
      await router.replace('/404')
    }
  }

  const getNewsSearchByMonitoring = async (params: ESearchNewsCondDto) => {
    let newsData: ElasticSearchReturnDtoNewsDocumentDto | null = null
    try {
      const { status, message, data } = await getNewsSearchResult.mutateAsync({ ...params, groupId: userSelectGroup })
      if (status === 'S') {
        newsData = data as ElasticSearchReturnDtoNewsDocumentDto
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}

    return newsData
  }

  const personalStepValidate = async (props: newsEditPopupProps) => {
    let setTitleErr = ''
    let setLinkErr = ''
    let isProcess = false
    if (props.title === '') {
      setTitleErr = '제목을 입력하세요'
    }
    if (props.link === '') {
      setLinkErr = '웹페이지 URL을 입력해주세요'
    } else if (!URL_REGEXP.test(props.link)) {
      setLinkErr = URL_REGEXP_DESCRIPTION
    }
    if (setLinkErr === '' && setTitleErr === '') {
      isProcess = true
    }
    dispatch(
      newsEditPopupAction({
        ...props,
        linkErr: setLinkErr,
        websiteErr: '',
        titleErr: setTitleErr,
      })
    )
    return isProcess
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

  const ownerFunction = async (param: ESearchNewsOwner) => {
    dispatch(
      userInformationPopupAction({
        isOpen: true,
        idKey: Number(param.uid),
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

  const getNewsSearchLink = async (dateParam: Date, linkParam: string) => {
    let err: string = ''
    let list: MonitoringSearchNewsDocumentDto[] = []
    const periodStartDate = moment(dateParam).subtract(1, 'month')
    const periodEndDate = moment(dateParam).add(1, 'month')
    const param = {
      timezone: timeZone,
      periodStartYear: periodStartDate.format('YYYY'),
      periodStartMonth: periodStartDate.format('MM'),
      periodStartDay: periodStartDate.format('DD'),
      periodEndYear: periodEndDate.format('YYYY'),
      periodEndMonth: periodEndDate.format('MM'),
      periodEndDay: periodEndDate.format('DD'),
      page: 1,
      size: 10,
      sort: ['_score!desc'],
      sourceType: 'SYSTEM',
      linkUrl: linkParam,
      groupId: userSelectGroup,
    }
    console.log('>> param', param)
    const { status, message, data } = await getNewsSearchResult.mutateAsync(param)
    if (status === 'S') {
      const { name } = data as ElasticSearchReturnDtoNewsDocumentDto
      const newsData = name as unknown as MonitoringSearchNewsDocumentDto[]
      console.log('>> newsData', newsData)
      if (newsData.length < 1) {
        err = '입력한 링크에서 뉴스 정보를 가져올 수 없습니다.'
      }
      list = newsData
    } else {
      err = '뉴스 검색에 실패했습니다.'
      openToast(message?.message ?? '뉴스 검색에 실패했습니다.', 'error')
    }

    return {
      err,
      list,
    }
  }

  const moveToSearch = async (props: MbTagSearchTagItem) => {
    if (props.id) {
      const query = {
        and: '',
        clipbook: { id: '', name: '선택' },
        clipbookValue: [],
        coverage: { id: '', name: '선택' },
        endPeriod: new Date(),
        informationType: { id: '', name: '선택' },
        journalistTagList: [],
        mediaBookList: [],
        mediaTagList: [],
        mediaType: [],
        existMultimedia: [],
        mediaValue: { id: '', name: '선택' },
        news_id: 0,
        not: '',
        or: '',
        period: { id: '', name: '선택' },
        periodTag: [],
        publishingPeriod: [],
        startPeriod: new Date(),
        tag: [{ id: props.id, label: props.label }],
        tone: [],
        url: '',
      }
      const res = setObjectToBase64({ ...query })
      await router.push(`/news/search-result?filter=${res}`)
    }
  }

  const getNewsSearch = async (props: newsEditPopupProps) => {
    let originLink = ''
    let website = ''
    let httpLink = ''
    let mediaBeeDB = false
    let err: string = ''
    let list: MonitoringSearchNewsDocumentDto[] = []
    let crawlingData: {
      media: string
      mediaId: string
      title: string
      reporter: string
      date: string
    } = {
      media: '',
      mediaId: '',
      title: '',
      reporter: '',
      date: new Date(props.selectedDate).toString(),
    }
    try {
      dispatch(newsLinkLoadingAction(true))
      if (!URL_REGEXP.test(props.link)) {
        err = URL_REGEXP_DESCRIPTION
      } else {
        if (props.link !== '') {
          const splitLink = props.link.split('://')
          originLink = props.link
          httpLink = splitLink && splitLink.length > 1 ? 'http://' + splitLink[1] : ''
        }
        const originRes = await getNewsSearchLink(props.selectedDate, originLink)
        if (originRes.err === '') {
          originRes.list &&
            originRes.list.length > 0 &&
            originRes.list[0].newsid &&
            openToast(MoveToNewsContext(originRes.list[0].newsid), 'success')
          list = originRes.list
          website = originLink
          mediaBeeDB = true
        } else {
          const httpRes = await getNewsSearchLink(props.selectedDate, httpLink)
          if (httpRes.err === '') {
            httpRes.list &&
              httpRes.list.length > 0 &&
              httpRes.list[0].newsid &&
              openToast(MoveToNewsContext(httpRes.list[0].newsid), 'success')
            list = httpRes.list
            website = httpLink
            mediaBeeDB = true
          } else {
            const otherRes = await getNewsSearchLinkByUrl(props.link)
            if (otherRes.err === '') {
              let crawlingDate = new Date(props.selectedDate).toString()
              if (otherRes.list?.date && otherRes.list?.date !== '' && otherRes.list?.date.length === 14) {
                const year = Number(otherRes.list?.date.substring(0, 4))
                const month = Number(otherRes.list?.date.substring(4, 6)) - 1
                const day = Number(otherRes.list?.date.substring(6, 8))
                const hour = Number(otherRes.list?.date.substring(9, 11))
                const minute = Number(otherRes.list?.date.substring(12, 14))
                crawlingDate = new Date(year, month, day, hour, minute).toString()
              }
              crawlingData = {
                ...otherRes.list,
                date: crawlingDate ? crawlingDate : new Date(props.selectedDate).toString(),
              }
              website = props.link
            } else {
              openToast('정보를 가져올 수 없는 URL입니다 제목과 날짜를 직접 입력하세요', 'warning')
              website = ''
            }
          }
        }
      }
      dispatch(
        newsLinkAction({
          ...props,
          selectedDate: mediaBeeDB
            ? list.length > 0
              ? new Date(list[0]?.inserted || props.selectedDate)
              : props.selectedDate
            : new Date(crawlingData?.date || props.selectedDate),
          selectedTime: mediaBeeDB
            ? list.length > 0
              ? {
                  hours: Number(moment(list[0]?.inserted).format('HH')),
                  minutes: Number(moment(list[0]?.inserted).format('mm')),
                }
              : props.selectedTime
            : {
                hours: Number(moment(crawlingData?.date).format('HH')),
                minutes: Number(moment(crawlingData?.date).format('mm')),
              },
          title: mediaBeeDB ? (list.length > 0 ? list[0]?.title || '' : '') : crawlingData.title,
          website: website,
          titleErr: '',
          websiteErr: '',
          linkErr: err,
          linkList: mediaBeeDB ? list : [],
          isRenew: true,
        })
      )
    } catch (e) {
      console.log('getNewsSearch', e)
    }
  }

  const getNewsSearchLinkByUrl = async (link: string) => {
    let err: string = ''
    let list: {
      media: string
      mediaId: string
      title: string
      reporter: string
      date: string
    } = {
      media: '',
      mediaId: '',
      title: '',
      reporter: '',
      date: moment().format(),
    }
    const { status, message, data } = await getNewsSearchResultByUrl.mutateAsync(link)
    if (status === 'S') {
      const apiData = data as {
        media: string
        mediaId: string
        title: string
        reporter: string
        date: string
      }
      console.log('>> apiData', apiData)
      if (apiData.title === '') {
        err = '입력한 링크에서 뉴스 정보를 가져올 수 없습니다.'
      }
      list = apiData
    } else {
      err = '뉴스 검색에 실패했습니다.'
    }

    return {
      err,
      list,
    }
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    newsIdParams,
    toneList,
    mediaSubTypeList,
    newsLoading,
    newsApiParams,
    deletePopup,
    isOwner,
    newsErrPopup,
    newsEditPopup,
    newsLinkLoading,
    userPopup,
    newsCheckDuplicateParam,
    timeZoneData,
    userClipbookListAutoSaveData,
    timeZone,
    isDemoLicense,

    editTaggingAction,
    init,
    optionActions,
    selectedDeleteAction,
    newsErrReportPopupAction,
    personalStepValidate,
    personalEditAction,
    getNewsSearch,
    ownerFunction,
    tagCloseOnChange,
    deleteAllTaggingAction,
    setOneClipbookPopupAction,
    checkAutoRegisterClipbook,
    moveToSearch,
    afterClipbookAdd,
    afterClipbookAction,

    setSelectedDeleteData,
    tagCreateSuccessOnChange,
    tagStatusOnChange,
    initNewsErrPopupData,
    setNewsErrPopupTitleAction,
    setNewsErrPopupContentAction,
    initNewsEditPopupData,
    setAllResetNewsEditPopupTagListAction,
    setResetNewsEditPopupTagListAction,
    setAllResetNewsEditPopupCreateSuccess,
    setAllResetNewsEditPopupTagStatusChange,
    setResetNewsEditPopupClipBookAction,
    setAllResetNewsEditPopupClipBookAction,
    setonTagListChangeTargetAuthorAction,
    setonTagListChangeTargetMediaAction,
    setNewsEditPopupCalendarAction,
    setNewsEditPopupWebsiteErrAction,
    setNewsEditPopupTitleAction,
    setNewsEditPopupLinkAction,
    setDeleteTagListChangeTargetMediaAction,
    setDeleteTagListChangeTargetAuthorAction,
    setAllDeleteTagListChangeTargetAuthorAction,
    setNewsEditPopupSelectedTimeAction,
    setDeleteLinkAction,
    setUserProfilePopupAction,
    setNoticeClose,
  }
}
