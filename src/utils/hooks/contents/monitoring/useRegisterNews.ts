import { ChangeEvent, useCallback, useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'
import * as xlsx from 'xlsx'

import {
  defaultBasicMonitoringSetting,
  disclosureScopeFilterOptionList,
} from '~/components/contents/monitoring/Clipbook/Search/defaultData'
import { MoveToNewsContext } from '~/components/contents/monitoring/RegisterNews/OpenToastContext/OpenToastContext'
import { EMAIL_PATTERN, MEDIA_VALUE_MAX_POINT, URL_REGEXP, URL_REGEXP_DESCRIPTION } from '~/constants/common'
import { clipbookContentListProps, pressReleaseInfoProps } from '~/stores/modules/contents/monitoring/clipbook'
import {
  addNewsIdAction,
  addStepAction,
  clipbookContentListAction,
  clipbookDataAction,
  clipbookIdListProps,
  clipbookListPageProps,
  clipbookPopupAction,
  excelDataLoadingAction,
  excelListProps,
  excelParamsAction,
  excelParamsProps,
  initAction,
  initClipbookPopupAction,
  newsListAction,
  newsListLoadingAction,
  personalLinkParamsAction,
  personalParamsAction,
  personalParamsProps,
  stepAction,
} from '~/stores/modules/contents/monitoring/registerNews'
import {
  BaseResponseCommonObject,
  CreateClipBookDto,
  type ElasticSearchReturnDtoNewsDocumentDto,
  type PageClipBookDto,
  type RequestNewsUserDocDto,
  TagDto,
} from '~/types/api/service'
import { MbTagSearchTagItem, TagSearchCreateLayerItem } from '~/types/contents/Common'
import { type MbClipbookSimpleListItem, MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { apiGetClipbooks, useGetClipbooks } from '~/utils/api/clipbook/useGetClipbooks'
import { usePostClipbookCreate } from '~/utils/api/clipbook/usePostClipbookCreate'
import { usePostCustomNewsAdd, usePostCustomNewsAddList } from '~/utils/api/news/usePostCustomNewsAdd'
import { usePostNewsSearch, usePostNewsSearchByUrl } from '~/utils/api/news/usePostNewsSearch'
import { openToast } from '~/utils/common/toast'
import { FileType } from '~/utils/hooks/common/useFileDragAndDrop'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

const fileSizeUnit = 'MB'
const fileSizeLimit = 5
const fileLengthLimit = 5
const messages = {
  ko: {
    code100: '파일 사이즈가 초과되었습니다.',
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

export const useRegisterNews = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const getNewsSearchResult = usePostNewsSearch()
  const getNewsSearchResultByUrl = usePostNewsSearchByUrl()
  const saveCustomNews = usePostCustomNewsAdd()
  const saveCustomNewsAddList = usePostCustomNewsAddList()
  const createClipbook = usePostClipbookCreate()

  const {
    addStep,
    excelDataLoading,
    excelParams,
    step,
    personalParams,
    clipbookListPage,
    clipbookContentList,
    newsListLoading,
    newsId,
  } = useAppSelector(state => state.registerNews)
  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const { licenseInfo, userInfo, userSelectGroup, timeZone, shareCodeData, timeZoneData } = useAppSelector(
    state => state.authSlice
  )

  const clipbookListPageCheckStatusChange = useCallback(
    (e: boolean, item: clipbookContentListProps, props: clipbookListPageProps) => {
      let temp = props.clipbookIdList
      const param = {
        ...props,
        clipbookIdList: e
          ? [...temp, { id: Number(item.clipBookId), title: item?.title || '' }]
          : temp.filter(e => Number(e.id) !== Number(item.clipBookId)),
      }
      dispatch(clipbookPopupAction(param))
    },
    [clipbookListPage.clipbookIdList]
  )

  const setclipbookPopupNameAction = useCallback(
    async (e: string, props: clipbookListPageProps) => {
      let param = {
        ...props,
        name: e,
        nameErr: '',
      }
      if (e && e.length >= 100) {
        param = {
          ...props,
          nameErr: '클립북명은 100자를 넘을 수 없습니다.',
        }
      }
      if (e === '') {
        await autoClipbookListData('', [])
      }
      dispatch(clipbookPopupAction(param))
    },
    [clipbookListPage.name]
  )

  const setDeleteLinkAction = useCallback(
    (props: personalParamsProps) => {
      const param = {
        ...props,
        link: '',
        website: '',
        linkList: [],
        linkErr: '',
      }
      dispatch(personalParamsAction(param))
    },
    [personalParams.link, personalParams.linkList, personalParams.linkErr]
  )

  const setPersonalParamsLinkAction = useCallback(
    (e: string) => {
      dispatch(personalLinkParamsAction(e))
    },
    [personalParams.link]
  )

  const setClipbookData = useCallback(
    async (
      items: clipbookIdListProps[],
      stepProp: string,
      personalProps: personalParamsProps,
      excelprops: excelParamsProps
    ) => {
      let tempProps: MbTagSearchTagItem[] = []
      if (items.length > 0) {
        for await (const param of items) {
          const params = {
            id: param.id.toString(),
            label: param.title,
          }
          tempProps = [...tempProps, params]
        }
      }
      dispatch(
        clipbookDataAction({
          personal: stepProp === 'personal' ? tempProps : personalProps.clipbookList,
          excel: stepProp === 'personal' ? excelprops.clipbookList : tempProps,
        })
      )
    },
    [clipbookListPage]
  )

  const setPersonalParamsWebsiteAction = useCallback(
    (e: string, props: personalParamsProps) => {
      const param = {
        ...props,
        website: e,
        websiteErr: '',
      }
      dispatch(personalParamsAction(param))
    },
    [personalParams.website]
  )

  const setPersonalParamsTitleAction = useCallback(
    (e: string, props: personalParamsProps) => {
      const param = {
        ...props,
        title: e,
        titleErr: '',
      }
      dispatch(personalParamsAction(param))
    },
    [personalParams.title]
  )

  const setPersonalParamsCalendarAction = useCallback(
    (date: Date, props: personalParamsProps) => {
      const param = {
        ...props,
        selectedDate: date,
        dateErrorMessage: '',
      }
      dispatch(personalParamsAction(param))
    },
    [personalParams.selectedDate]
  )

  const setPersonalParamsSelectedTimeAction = useCallback(
    (hours: number, minutes: number, props: personalParamsProps) => {
      const param = {
        ...props,
        selectedTime: { hours, minutes },
      }
      dispatch(personalParamsAction(param))
    },
    [personalParams.selectedTime]
  )

  const setDeleteTagListChangeTargetMediaAction = useCallback(
    (props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          targetMedia: [],
        })
      )
    },
    [personalParams.targetMedia]
  )

  const setDeleteTagListChangeTargetAuthorAction = useCallback(
    (item: MbTagSearchTagItem, props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          targetAuthor: _.cloneDeep(props.targetAuthor).filter(tag => tag.id !== item.id),
        })
      )
    },
    [personalParams.targetAuthor]
  )

  const setAllDeleteTagListChangeTargetAuthorAction = useCallback(
    (props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          targetAuthor: [],
        })
      )
    },
    [personalParams.targetAuthor]
  )
  const setonTagListChangeTargetMediaAction = useCallback(
    (e: MbTagSearchTagItem[], props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          targetMedia: e,
          targetMediaErr: '',
        })
      )
    },
    [personalParams.targetMedia]
  )

  const setonTagListChangeTargetAuthorAction = useCallback(
    (i: MbTagSearchTagItem[], props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          targetAuthor: i,
          targetAuthorErr: '',
        })
      )
    },
    [personalParams.targetAuthor]
  )

  const setResetPersonalParamsClipBookAction = useCallback(
    (item: MbTagSearchTagItem, props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          clipbookList: _.cloneDeep(props.clipbookList).filter(tag => tag.id !== item.id),
        })
      )
    },
    [personalParams.clipbookList]
  )

  const setAllResetPersonalParamsClipBookAction = useCallback(
    (props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          clipbookList: [],
        })
      )
    },
    [personalParams.clipbookList]
  )

  const setResetExcelParamsClipBookAction = useCallback(
    (item: MbTagSearchTagItem, props: excelParamsProps) => {
      dispatch(
        excelParamsAction({
          ...props,
          clipbookList: _.cloneDeep(props.clipbookList).filter(tag => tag.id !== item.id),
        })
      )
    },
    [excelParams.clipbookList]
  )

  const setAllResetExcelParamsClipBookAction = useCallback(
    (props: excelParamsProps) => {
      dispatch(
        excelParamsAction({
          ...props,
          clipbookList: [],
        })
      )
    },
    [excelParams.clipbookList]
  )

  const filesAllCheckedExcelParamsOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, props: excelParamsProps) => {
      dispatch(
        excelParamsAction({
          ...props,
          execelIdList: e.target.checked ? props.excelList.map(e => e.id) : [],
        })
      )
    },
    [excelParams.execelIdList]
  )

  const setResetTagPressListAction = useCallback(
    (param: MbTagSearchTagItem, props: excelParamsProps) => {
      const res = props.excelFileList.filter(item => item.id !== param.id)
      dispatch(
        excelParamsAction({
          ...props,
          excelFileList: res,
          excelList: [],
        })
      )
    },
    [excelParams.excelFileList, excelParams.excelList]
  )

  const setAllResetTagPressListAction = useCallback(
    (props: excelParamsProps) => {
      dispatch(
        excelParamsAction({
          ...props,
          excelFileList: [],
          excelList: [],
        })
      )
    },
    [excelParams.excelFileList, excelParams.excelList]
  )

  const filesDeleteExcelParamsOnChange = useCallback(
    (props: excelParamsProps) => {
      let temp: excelListProps[] = []
      for (const string of props.excelList) {
        const find = props.execelIdList.find(e => e === string.id)
        if (!find) {
          temp = [...temp, string]
        }
      }
      dispatch(
        excelParamsAction({
          ...props,
          excelList: temp,
          execelIdList: [],
        })
      )
    },
    [excelParams.excelList, excelParams.execelIdList]
  )

  const filesCheckedExcelParamsOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string, props: excelParamsProps) => {
      let dataList = props.execelIdList
      dataList = e.target.checked ? [...dataList, id] : dataList.filter(i => i !== id)
      dispatch(
        excelParamsAction({
          ...props,
          execelIdList: dataList,
        })
      )
    },
    [excelParams.execelIdList]
  )

  const setAllResetPersonalParamsCreateSuccess = useCallback(
    (item: TagDto, props: personalParamsProps) => {
      let newTags = _.cloneDeep(props.tagList)
      const isExist = newTags.find(tag => tag.id === item.tagId?.toString())
      if (!isExist) {
        newTags.push({
          id: item.tagId?.toString() ?? '',
          label: item.name ?? '',
        })
      }
      dispatch(
        personalParamsAction({
          ...props,
          tagList: newTags,
        })
      )
    },
    [personalParams.tagList]
  )

  const setAllResetPersonalParamsTagStatusChange = useCallback(
    (item: MbTagSearchTagItem[], props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          tagList: item,
        })
      )
    },
    [personalParams.tagList]
  )

  const setResetPersonalParamsTagListAction = useCallback(
    (item: MbTagSearchTagItem, props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          tagList: _.cloneDeep(props.tagList).filter(tag => tag.id !== item.id),
        })
      )
    },
    [personalParams.tagList]
  )

  const setAllResetPersonalParamsTagListAction = useCallback(
    (props: personalParamsProps) => {
      dispatch(
        personalParamsAction({
          ...props,
          tagList: [],
        })
      )
    },
    [personalParams.tagList]
  )

  const getSize = (size: number, unit: string = 'kb') => {
    let calcuratedSize = 0
    if (unit === 'kb') {
      calcuratedSize = size / 1024
    } else if (unit === 'mb') {
      calcuratedSize = size / 1024 / 1024
    }
    return Number(calcuratedSize.toFixed(2))
  }

  const processUpload = (file: File, fileUnit: string, fileType: string): Promise<{ code: string; data: FileType }> => {
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
        const isImage =
          mimeType === 'image/jpeg' ||
          mimeType === 'image/png' ||
          mimeType === 'image/gif' ||
          mimeType === 'image/x-icon'

        if (isImage) {
          if (fileType !== '' && fileType !== 'image') {
            res.code = '파일만 업로드 가능합니다'
            resolve(res)
          } else {
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
                //reject(new Error('Image loading error'))
              }

              //@ts-ignore
              image.src = event.target.result
              fileSrc = event.target?.result as string
            }

            reader.onerror = function () {
              res.code = '파일이 손상되었습니다'
              resolve(res)
              //reject(new Error('File reading error'))
            }

            reader.readAsDataURL(file)
          }
        } else {
          if (fileType !== '' && fileType === 'image') {
            res.code = '이미지파일만 업로드 가능합니다'
            resolve(res)
          } else {
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
        }
      } catch (e) {
        res.code = messages['ko'].code200
        resolve(res)
      }
    })
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
          const temp = await processUpload(totalFileLengthElement, fileUnit, '')
          temp.code === '' ? (res = [...res, temp.data]) : openToast(temp.code, 'error')
        }
      }
    }

    return res
  }

  const getValidateExcel = async (files: FileType[]) => {
    return new Promise<excelListProps[] | false>(resolve => {
      let returnList: excelListProps[] = []
      const file = files[0]?.file
      if (file) {
        try {
          const reader = new FileReader()
          reader.onload = async (e: ProgressEvent<FileReader>) => {
            const data = e?.target?.result
            if (data) {
              const workbook = xlsx.read(data, { type: 'array' })
              const sheetName = workbook.SheetNames[0]
              const worksheet = workbook.Sheets[sheetName]
              const json = xlsx.utils.sheet_to_json(worksheet)

              if (json.length < 2000) {
                for await (const jsonElement of json) {
                  let temp = {
                    id: Math.random().toString(),
                    title: '',
                    date: moment().format('YYYY-MM-DD'),
                    link: '',
                    media: '',
                    author: '',
                  }
                  if (jsonElement) {
                    const defineObject = Object.getOwnPropertyNames(jsonElement)
                    if (defineObject.length > 0) {
                      const findTitle = defineObject.findIndex(e => e.trim() === '제목')
                      if (findTitle) {
                        // @ts-ignore
                        temp.title = jsonElement[defineObject[findTitle]] ? jsonElement[defineObject[findTitle]] : ''
                      }
                      const findDate = defineObject.findIndex(e => e.trim() === '날짜')
                      if (findDate) {
                        // @ts-ignore
                        if (moment(jsonElement[defineObject[findDate]]).isValid()) {
                          // @ts-ignore
                          const stringData = jsonElement[defineObject[findDate]]
                          temp.date = stringData
                            ? moment(stringData).format('YYYY-MM-DD')
                            : moment().format('YYYY-MM-DD')
                        }
                      }
                      const findLink = defineObject.findIndex(e => e.trim() === '링크')
                      if (findLink) {
                        // @ts-ignore
                        temp.link = jsonElement[defineObject[findLink]] ? jsonElement[defineObject[findLink]] : ''
                      }
                      const findMedia = defineObject.findIndex(e => e.trim() === '매체')
                      if (findMedia) {
                        // @ts-ignore
                        temp.media = jsonElement[defineObject[findMedia]] ? jsonElement[defineObject[findMedia]] : ''
                      }
                      const findAuthor = defineObject.findIndex(e => e.trim() === '저자')
                      if (findAuthor) {
                        // @ts-ignore
                        temp.author = jsonElement[defineObject[findAuthor]] ? jsonElement[defineObject[findAuthor]] : ''
                      }
                    }
                    if (temp.title !== '') {
                      returnList = [...returnList, temp]
                    }
                  }
                }
                if (returnList.length > 0) {
                  const newReviews = returnList.reduce((acc, curr) => {
                    if (acc.findIndex(({ title }) => title === curr.title) === -1) {
                      // @ts-ignore
                      acc.push(curr)
                    }
                    return acc
                  }, [])
                  resolve(newReviews)
                } else {
                  resolve([])
                }
              } else {
                openToast('한 번에 최대 2,000개까지 업로드할 수 있습니다. ', 'error')
                resolve(false)
              }
            }
          }
          reader.readAsArrayBuffer(file)
        } catch (e) {
          openToast('파일형식이 잘못되었습니다, XLS,XLSX,CSV 파일만 업로드할 수 있습니다', 'error')
          resolve(false)
        }
      } else {
        resolve(false)
      }
    })
  }

  const onChangeFiles = async (e: ChangeEvent<HTMLInputElement> | any, props: excelParamsProps) => {
    e.preventDefault()
    e.stopPropagation()

    let param = { ...props }
    if (e.target?.files && e.target?.files.length > 0) {
      dispatch(excelDataLoadingAction(true))
      const result = await uploadFile(e.target?.files, fileSizeUnit)
      if (result.length > 0) {
        const res = await getValidateExcel(result)
        if (res && res.length > 0) {
          param.excelList = res
          param.excelFileList = [{ id: result[0].file?.name || '', label: result[0].file?.name || '' }]
        } else {
          param.excelList = []
        }
      } else {
        param.excelList = []
      }
      dispatch(excelParamsAction(param))
    }
    e.target.value = null
  }

  const onChangeStep = (e: string) => {
    dispatch(stepAction(e))
  }

  const onChangeAddStep = (e: string) => {
    dispatch(addStepAction(e))
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

  const getNewsSearchLink = async (dateParam: Date, linkParam: string) => {
    let err: string = ''
    let list: MonitoringSearchNewsDocumentDto[] = []
    const param = {
      timezone: timeZone,
      periodStartYear: moment().subtract(2, 'year').format('YYYY'),
      periodStartMonth: moment().subtract(2, 'year').format('MM'),
      periodStartDay: moment().subtract(2, 'year').format('DD'),
      periodEndYear: moment().add(1, 'weeks').format('YYYY'),
      periodEndMonth: moment().add(1, 'weeks').format('MM'),
      periodEndDay: moment().add(1, 'weeks').format('DD'),
      page: 1,
      size: 10,
      sort: [`inserted!asc`, `_score!asc`, `char_len!asc`, `newsid!asc`],
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
    }

    return {
      err,
      list,
    }
  }

  const getNewsSearch = async (props: personalParamsProps) => {
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
      dispatch(newsListLoadingAction(true))
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
              console.log('crawlingData?.date', otherRes.list?.date.length)
              if (otherRes.list?.date && otherRes.list?.date !== '' && otherRes.list?.date.length === 14) {
                const year = Number(otherRes.list?.date.substring(0, 4))
                const month = Number(otherRes.list?.date.substring(4, 6)) - 1
                const day = Number(otherRes.list?.date.substring(6, 8))
                const hour = Number(otherRes.list?.date.substring(9, 11))
                const minute = Number(otherRes.list?.date.substring(12, 14))
                crawlingDate = new Date(year, month, day, hour, minute).toString()
              }
              console.log('crawlingDate', crawlingDate)
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
        newsListAction({
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
        })
      )
    } catch (e) {
      console.log('getNewsSearch', e)
    }
  }

  const excelAddAction = async (props: excelParamsProps) => {
    if (props.excelList.length > 0) {
      let clipbookIdList: number[] = []
      let newsUserExcelList: RequestNewsUserDocDto[] = []
      for await (const i of props.excelList) {
        let autherList: { id: number; name: string }[] = []
        let temp: RequestNewsUserDocDto = {
          title: i.title ?? '',
          link: i.link && i.link !== '' ? i.link : '',
          year: moment(i.date).format('YYYY'),
          month: moment(i.date).format('MM'),
          day: moment(i.date).format('DD'),
          timezone: timeZone,
          journalists: [],
        }
        if (i.media && i.media !== '') {
          temp.mediaName = i.media
        }
        if (i.author && i.author !== '') {
          const words = i.author.split(';')
          if (words.length > 0) {
            for await (const e of words) {
              autherList = [
                ...autherList,
                {
                  name: e,
                  id: 0,
                },
              ]
            }
            temp.journalists = autherList
          }
        }
        newsUserExcelList = [...newsUserExcelList, temp]
      }
      if (props.clipbookList.length > 0) {
        for await (const e of props.clipbookList) {
          if (e.id) {
            clipbookIdList = [...clipbookIdList, Number(e.id)]
          }
        }
      }
      const { status, message, data } = await saveCustomNewsAddList.mutateAsync({
        newsUserExcelList,
        clipbookIdList,
      })
      if (status === 'S') {
        const newsId = data as unknown as number
        openToast(message?.message, 'success')
        dispatch(addNewsIdAction(newsId))
      } else {
        openToast(message?.message ?? '뉴스 추가에 실패했습니다.', 'error')
      }
    }
  }

  const personalStepValidate = async (props: personalParamsProps) => {
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
      personalParamsAction({
        ...props,
        linkErr: setLinkErr,
        websiteErr: '',
        titleErr: setTitleErr,
      })
    )
    return isProcess
  }

  const personalAddAction = async (props: personalParamsProps) => {
    let tagList: number[] = []
    let autherList: { id: number; name: string }[] = []
    let clipbookList: number[] = []

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
    if (props.clipbookList.length > 0) {
      for await (const e of props.clipbookList) {
        if (e.id) {
          clipbookList = [...clipbookList, Number(e.id)]
        }
      }
      params.clipbookIdList = clipbookList
    }
    const { status, message, data } = await saveCustomNews.mutateAsync(params)
    if (status === 'S') {
      const newsId = data as unknown as number
      openToast(message?.message, 'success')
      dispatch(addNewsIdAction(newsId))
    } else {
      openToast(message?.message ?? '뉴스 추가에 실패했습니다.', 'error')
    }
  }

  const init = () => {
    dispatch(initAction())
  }

  const autoClipbookListData = async (e: string, except: number[]) => {
    const { status, data, message } = await apiGetClipbooks({
      page: 1,
      size: MEDIA_VALUE_MAX_POINT,
      sort: 'updateAt!asc',
      title: e,
      shareCode: '',
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const res = data as PageClipBookDto
      let param: clipbookContentListProps[] = []
      if (res.content && res.content.length > 0) {
        for await (const content of res.content) {
          let temp = false
          if (content.shareCode === 'WRITABLE') {
            temp = true
          } else if (userInfo.userId === content.owner?.userId) {
            temp = true
          }
          if (temp) {
            const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
            let temp: clipbookContentListProps = {
              ...content,
              isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
              isOwner: userInfo.userId === content.owner?.userId,
              categoryName: content.type === 'COVERAGE' ? '커버리지' : '',
              settingList: defaultBasicMonitoringSetting,
              shareCodeNm: findShareScopeList?.name || '',
              //@ts-ignore
              pressReleaseInfo: content.prlist as pressReleaseInfoProps[],
            }
            param = [...param, temp]
          }
        }
      }
      dispatch(clipbookContentListAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const setClipbookPopupAction = async (e: boolean, i: MbTagSearchTagItem[]) => {
    let temp: clipbookIdListProps[] = []
    if (i.length > 0) {
      temp = i.map(e => {
        return {
          id: Number(e.id),
          title: e.label,
        }
      })
    }
    if (e) {
      await autoClipbookListData('', [])
    }
    dispatch(initClipbookPopupAction({ isOpen: e, list: temp }))
  }

  const createClipbookAction = async (props: string) => {
    const newDate = moment()
    const year = newDate.format('YYYY')
    const month = newDate.format('M')
    const day = newDate.format('D')
    const params: CreateClipBookDto = {
      title: props,
      type: 'NORMAL',
      shareCode: shareCodeData.clipbook.id,
      chkDefault: false,
      groupId: userSelectGroup,
      // startYear: year,
      // startMonth: month,
      // startDay: day,
      // endYear: year,
      // endMonth: month,
      // endDay: day,
    }
    const { status, message } = await createClipbook.mutateAsync(params)
    if (status === 'S') {
      openToast(message?.message, 'success')
      await autoClipbookListData(props, [])
    } else {
      openToast(message?.message, 'error')
    }
  }

  const initClipbookList = async (prop: PageClipBookDto) => {
    let param: clipbookContentListProps[] = []
    if (prop.content && prop.content.length > 0) {
      for await (const content of prop.content) {
        let temp = false
        if (content.shareCode === 'WRITABLE') {
          temp = true
        } else if (userInfo.userId === content.owner?.userId) {
          temp = true
        }
        if (temp) {
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === content.shareCode)
          let temp: clipbookContentListProps = {
            ...content,
            isEdit: userInfo.userId === content.owner?.userId ? true : content.shareCode === 'WRITABLE',
            isOwner: userInfo.userId === content.owner?.userId,
            categoryName: content.type === 'COVERAGE' ? '커버리지' : '',
            settingList: defaultBasicMonitoringSetting,
            shareCodeNm: findShareScopeList?.name || '',
            //@ts-ignore
            pressReleaseInfo: content.prlist as pressReleaseInfoProps[],
          }
          param = [...param, temp]
        }
      }
    }
    dispatch(clipbookContentListAction(param))
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    step,
    personalParams,
    newsListLoading,
    addStep,
    excelParams,
    excelDataLoading,
    clipbookListPage,
    clipbookContentList,
    timeZone,
    timeZoneData,
    newsId,

    getNewsSearch,
    init,
    personalAddAction,
    personalStepValidate,
    onChangeStep,
    onChangeAddStep,
    onChangeFiles,
    excelAddAction,
    createClipbookAction,
    setClipbookPopupAction,
    autoClipbookListData,

    setclipbookPopupNameAction,
    setClipbookData,
    setAllResetPersonalParamsTagListAction,
    setResetPersonalParamsTagListAction,
    setAllResetPersonalParamsCreateSuccess,
    setAllResetPersonalParamsTagStatusChange,
    setResetPersonalParamsClipBookAction,
    setAllResetPersonalParamsClipBookAction,
    setResetExcelParamsClipBookAction,
    setAllResetExcelParamsClipBookAction,
    setonTagListChangeTargetAuthorAction,
    setonTagListChangeTargetMediaAction,
    setPersonalParamsSelectedTimeAction,
    setPersonalParamsCalendarAction,
    setPersonalParamsTitleAction,
    setPersonalParamsWebsiteAction,
    setPersonalParamsLinkAction,
    setDeleteTagListChangeTargetMediaAction,
    setDeleteTagListChangeTargetAuthorAction,
    setAllDeleteTagListChangeTargetAuthorAction,
    filesCheckedExcelParamsOnChange,
    filesAllCheckedExcelParamsOnChange,
    filesDeleteExcelParamsOnChange,
    clipbookListPageCheckStatusChange,
    setDeleteLinkAction,
    setResetTagPressListAction,
    setAllResetTagPressListAction,
  }
}
