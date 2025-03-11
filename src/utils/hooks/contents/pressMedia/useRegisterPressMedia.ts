import { ChangeEvent, useCallback, useEffect } from 'react'
import { Address } from 'react-daum-postcode'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'
import * as xlsx from 'xlsx'

import {
  defaultMediaSearchOption,
  defaultPressSearchOption,
  disclosureScopeFilterOptionList,
} from '~/components/contents/pressMedia/RegisterPressMedia/defaultData'
import {
  API_LIST_TYPE_MAX_COUNT,
  EMAIL_PATTERN,
  EMAIL_PATTERN_DESCRIPTION,
  MEDIA_VALUE_MAX_POINT,
  URL_REGEXP,
  URL_REGEXP_DESCRIPTION,
} from '~/constants/common'
import {
  addressPopupAction,
  categoryDataManagementAction,
  categoryListProps,
  initAction,
  initCategoryDataManagementAction,
  initMediaListPopupPageAction,
  initPressListPopupPageAction,
  initSearchRegisterListPopupAction,
  jrnlstSocialUserAddListAction,
  mediaAddExcelAction,
  mediaAddPersonalAction,
  mediaContentListProps,
  mediaExcelDataLoadingAction,
  mediaExcelListProps,
  mediaExcelParamsAction,
  mediaExcelParamsProps,
  mediaIdListProps,
  mediaListContentListAction,
  mediaListContentListProps,
  mediaListPopupPageAction,
  mediaListPopupPageDataAction,
  mediaListPopupPageProps,
  mediaPersonalParamsAction,
  mediaPersonalParamsProps,
  pressAddExcelAction,
  pressAddPersonalAction,
  pressExcelDataLoadingAction,
  pressExcelListProps,
  pressExcelParamsAction,
  pressExcelParamsProps,
  pressIdListProps,
  pressListContentListAction,
  pressListContentListProps,
  pressListPopupPageAction,
  pressListPopupPageDataAction,
  pressListPopupPageProps,
  pressPersonalParamsAction,
  pressPersonalParamsProps,
  pressSocialListAction,
  pressSocialListProps,
  searchRegisterListPopupAction,
} from '~/stores/modules/contents/pressMedia/registerPressMedia'
import {
  BaseResponseCommonObject,
  type CreateJournalistDto,
  type CreateMediaDto,
  type SocialDto,
} from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import type { PageableDataDto } from '~/types/contents/api'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import type { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { apiGetJournalistGroup, useGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { usePostJournalistCreate } from '~/utils/api/groupList/journalist/usePostJournalistGroupCreate'
import { apiGetMediaGroup, useGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { usePostMediaCreate } from '~/utils/api/groupList/media/usePostMediaGroupCreate'
import {
  CreateJournalistDtoList,
  usePostJournalistCreateArray,
  usePostJournalistCreateId,
} from '~/utils/api/userCustom/journalist/usePostJournalistCreate'
import { usePostMediaCreateId } from '~/utils/api/userCustom/media/usePostMediaCreate'
import { setObjectToBase64 } from '~/utils/common/object'
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

export const useRegisterPressMedia = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const createMediaGroup = usePostMediaCreate()
  const createJournalistGroup = usePostJournalistCreate()
  const createJournalist = usePostJournalistCreateId()
  const createJournalistArray = usePostJournalistCreateArray()
  const createMedia = usePostMediaCreateId()

  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const { userSelectGroup, userInfo, licenseInfo, shareCodeData, timeZone } = useAppSelector(state => state.authSlice)
  const {
    journalistKey,

    categoryList,
    addressPopup,
    categoryData,

    pressListContentList,
    pressListPopupPage,
    pressPersonalParams,
    jrnlstSocialUserAddList,
    pressExcelDataLoading,
    pressExcelParams,
    pressSocialList,

    mediaPersonalParams,
    mediaListPopupPage,
    mediaListContentList,
    mediaExcelDataLoading,
    mediaExcelParams,
    medialistKey,

    searchRegisterListPopup,
  } = useAppSelector(state => state.registerPressMediaSlice)

  const categoryDataHandle = useCallback(
    (param: categoryListProps) => {
      router.replace(param.id !== 'press' ? `/media/add` : `/contacts/add`, undefined, { shallow: true })
      dispatch(categoryDataManagementAction(param))
    },
    [categoryData]
  )

  const addressPopupHandle = useCallback((param: boolean) => dispatch(addressPopupAction(param)), [addressPopup])

  const categoryDataInformationHandle = useCallback(
    (e: string, param: categoryListProps) => {
      const params = {
        ...param,
        main: 'information',
        nextStep: '',
        addStep: '',
      }
      dispatch(categoryDataManagementAction(params))
    },
    [categoryData.main]
  )

  const categoryDataNextStepHandle = useCallback(
    (e: string, param: categoryListProps) => {
      const params = {
        ...param,
        main: 'next',
        nextStep: e,
        addStep: 'add',
      }
      dispatch(initCategoryDataManagementAction(params))
    },
    [categoryData.main]
  )

  const categoryDataAddStepHandle = useCallback(
    (e: string, param: categoryListProps) => {
      const params = {
        ...param,
        addStep: e,
      }
      dispatch(categoryDataManagementAction(params))
    },
    [categoryData.addStep]
  )

  const resetCategoryPressHandle = useCallback(
    (e: string, param: categoryListProps) => {
      const params = {
        ...param,
        main: 'next',
        nextStep: e,
        addStep: 'add',
      }
      dispatch(categoryDataManagementAction(params))
    },
    [categoryData]
  )

  const mediaPersonalNameAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        website: e,
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParams.website]
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
    [mediaPersonalParams.mediaName]
  )

  const mediaPersonalFieldsAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        fields: e,
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParams.fields]
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
    [mediaPersonalParams.email]
  )

  const mediaPersonalMobileAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        mobile: e,
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParams.mobile]
  )

  const mediaPersonalLandlineAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        landline: e,
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParams.landline]
  )

  const mediaPersonalSubAddressNmAction = useCallback(
    (e: string, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        //subAddressNm: e,
        address: e,
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParams.address]
  )

  const mediaPersonalDeleteJrnlstListsAction = useCallback(
    (item: MbTagSearchTagItem, props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        mediaBookLists: _.cloneDeep(props.mediaBookLists).filter(tag => tag.id !== item.id),
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParams.mediaBookLists]
  )

  const mediaPersonalAllDeleteJrnlstListsAction = useCallback(
    (props: mediaPersonalParamsProps) => {
      const params = {
        ...props,
        mediaBookLists: [],
      }
      dispatch(mediaPersonalParamsAction(params))
    },
    [mediaPersonalParams.mediaBookLists]
  )

  const setMediaListPopupNameAction = useCallback(
    async (e: string, props: mediaListPopupPageProps) => {
      let param = {
        ...props,
        name: e,
        nameErr: '',
      }
      if (e && e.length >= 100) {
        param = {
          ...props,
          nameErr: '목록명은 100자를 넘을 수 없습니다.',
        }
      }
      if (e === '') {
        await mediaCustomSearchListData('')
      }
      dispatch(mediaListPopupPageAction(param))
    },
    [mediaListPopupPage.name, mediaListPopupPage.nameErr]
  )

  const setMediaListData = useCallback(
    async (
      items: mediaIdListProps[],
      category: categoryListProps,
      personalProps: mediaPersonalParamsProps,
      excelProps: mediaExcelParamsProps
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
        mediaListPopupPageDataAction({
          personal: category.nextStep === 'personal' ? tempProps : personalProps.mediaBookLists,
          excel: category.nextStep !== 'personal' ? tempProps : excelProps.mediaBookLists,
        })
      )
    },
    [mediaListPopupPage]
  )

  const mediaListPopupPageCheckStatusChange = useCallback(
    (e: boolean, item: mediaListContentListProps, props: mediaListPopupPageProps) => {
      dispatch(
        mediaListPopupPageAction({
          ...props,
          isActive: true,
          mediaIdList: e
            ? [...props.mediaIdList, { id: Number(item.mediaListId), title: item?.title || '' }]
            : props.mediaIdList.filter(e => Number(e.id) !== Number(item.mediaListId)),
        })
      )
    },
    [mediaListPopupPage.mediaIdList]
  )

  const mediaFilesCheckedExcelParamsOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string, props: mediaExcelParamsProps) => {
      let dataList = props.execelIdList
      dataList = e.target.checked ? [...dataList, id] : dataList.filter(i => i !== id)
      dispatch(
        mediaExcelParamsAction({
          ...props,
          execelIdList: dataList,
        })
      )
    },
    [mediaExcelParams.execelIdList]
  )

  const mediaFilesDeleteExcelParamsOnChange = useCallback(
    (props: mediaExcelParamsProps) => {
      let temp: mediaExcelListProps[] = []
      for (const string of props.excelList) {
        const find = props.execelIdList.find(e => e === string.id)
        if (!find) {
          temp = [...temp, string]
        }
      }
      dispatch(
        mediaExcelParamsAction({
          ...props,
          excelList: temp,
          execelIdList: [],
        })
      )
    },
    [mediaExcelParams.excelList, mediaExcelParams.execelIdList]
  )

  const mediaFilesAllCheckedExcelParamsOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, props: mediaExcelParamsProps) => {
      dispatch(
        mediaExcelParamsAction({
          ...props,
          execelIdList: e.target.checked ? props.excelList.map(e => e.id) : [],
        })
      )
    },
    [mediaExcelParams.execelIdList]
  )

  const mediaExcelAllDeleteJrnlstListsAction = useCallback(
    (props: mediaExcelParamsProps) => {
      const params = {
        ...props,
        mediaBookLists: [],
      }
      dispatch(mediaExcelParamsAction(params))
    },
    [mediaExcelParams.mediaBookLists]
  )

  const mediaExcelDeleteJrnlstListsAction = useCallback(
    (item: MbTagSearchTagItem, props: mediaExcelParamsProps) => {
      const params = {
        ...props,
        mediaBookLists: _.cloneDeep(props.mediaBookLists).filter(tag => tag.id !== item.id),
      }
      dispatch(mediaExcelParamsAction(params))
    },
    [mediaExcelParams.mediaBookLists]
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
    [pressPersonalParams.name]
  )

  const pressPersonalPositionAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        position: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.position]
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
    [pressPersonalParams.mediaName]
  )

  const pressPersonalDepartmentAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        department: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.department]
  )

  const pressPersonalFieldsAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        fields: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.fields]
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
    [pressPersonalParams.email]
  )

  const pressPersonalMobileAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        mobile: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.mobile]
  )

  const pressPersonalLandlineAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        landline: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.landline]
  )

  const pressPersonalSubAddressNmAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        subAddressNm: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.subAddressNm]
  )

  const pressPersonalDeleteJrnlstListsAction = useCallback(
    (item: MbTagSearchTagItem, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        jrnlstLists: _.cloneDeep(props.jrnlstLists).filter(tag => tag.id !== item.id),
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.jrnlstLists]
  )

  const pressPersonalAllDeleteJrnlstListsAction = useCallback(
    (props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        jrnlstLists: [],
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.jrnlstLists]
  )

  const pressPersonalCareerNmAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        career: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.career]
  )
  const pressPersonalEducationAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        education: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.education]
  )

  const pressPersonalWritingsAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        writings: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.writings]
  )

  const pressPersonalAwardsAction = useCallback(
    (e: string, props: pressPersonalParamsProps) => {
      const params = {
        ...props,
        awards: e,
      }
      dispatch(pressPersonalParamsAction(params))
    },
    [pressPersonalParams.awards]
  )

  const setPressListPopupAction = useCallback(
    async (e: boolean, i: MbTagSearchTagItem[]) => {
      let temp: pressIdListProps[] = []
      if (i.length > 0) {
        temp = i.map(e => {
          return {
            id: Number(e.id),
            title: e.label,
          }
        })
      }
      if (e) {
        await journalistCustomSearchListData('')
      }
      dispatch(initPressListPopupPageAction({ isOpen: e, list: temp }))
    },
    [pressListPopupPage]
  )

  const setResetTagPressListAction = useCallback(
    (param: MbTagSearchTagItem, hook: pressExcelParamsProps) => {
      const res = hook.excelFileList.filter(item => item.id !== param.id)
      dispatch(pressExcelParamsAction({ ...hook, excelFileList: res, excelList: [] }))
    },
    [pressExcelParams.excelFileList, pressExcelParams.excelList]
  )
  const setAllResetTagPressListAction = useCallback(
    (hook: pressExcelParamsProps) => {
      dispatch(pressExcelParamsAction({ ...hook, excelFileList: [], excelList: [] }))
    },
    [pressExcelParams.excelFileList, pressExcelParams.excelList]
  )

  const setResetTagMediaListAction = useCallback(
    (param: MbTagSearchTagItem, hook: mediaExcelParamsProps) => {
      const res = hook.excelFileList.filter(item => item.id !== param.id)
      dispatch(mediaExcelParamsAction({ ...hook, excelFileList: res, excelList: [] }))
    },
    [mediaExcelParams.excelFileList, mediaExcelParams.excelList]
  )
  const setAllResetTagMediaListAction = useCallback(
    (hook: mediaExcelParamsProps) => {
      dispatch(mediaExcelParamsAction({ ...hook, excelFileList: [], excelList: [] }))
    },
    [mediaExcelParams.excelFileList, mediaExcelParams.excelList]
  )

  const setMediaListPopupAction = useCallback(
    async (e: boolean, i: MbTagSearchTagItem[]) => {
      let temp: pressIdListProps[] = []
      if (i.length > 0) {
        temp = i.map(e => {
          return {
            id: Number(e.id),
            title: e.label,
          }
        })
      }
      if (e) {
        await mediaCustomSearchListData('')
      }
      dispatch(initMediaListPopupPageAction({ isOpen: e, list: temp }))
    },
    [mediaListPopupPage]
  )

  const setPressListPopupNameAction = useCallback(
    async (e: string, props: pressListPopupPageProps) => {
      let param = {
        ...props,
        name: e,
        nameErr: '',
      }
      if (e && e.length >= 100) {
        param = {
          ...props,
          nameErr: '목록명은 100자를 넘을 수 없습니다.',
        }
      }
      if (e === '') {
        await journalistCustomSearchListData('')
      }
      dispatch(pressListPopupPageAction(param))
    },
    [pressListPopupPage.name, pressListPopupPage.nameErr]
  )

  const setPressListData = useCallback(
    async (
      items: pressIdListProps[],
      category: categoryListProps,
      personalProps: pressPersonalParamsProps,
      excelProps: pressExcelParamsProps
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
        pressListPopupPageDataAction({
          personal: category.nextStep === 'personal' ? tempProps : personalProps.jrnlstLists,
          excel: category.nextStep !== 'personal' ? tempProps : excelProps.jrnlstLists,
        })
      )
    },
    [pressListPopupPage]
  )

  const pressListPopupPageCheckStatusChange = useCallback(
    (e: boolean, item: pressListContentListProps, props: pressListPopupPageProps) => {
      dispatch(
        pressListPopupPageAction({
          ...props,
          isActive: true,
          pressIdList: e
            ? [...props.pressIdList, { id: Number(item.jrnlstListId), title: item?.title || '' }]
            : props.pressIdList.filter(e => Number(e.id) !== Number(item.jrnlstListId)),
        })
      )
    },
    [pressListPopupPage.pressIdList]
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

  const pressFilesCheckedExcelParamsOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string, props: pressExcelParamsProps) => {
      let dataList = props.execelIdList
      dataList = e.target.checked ? [...dataList, id] : dataList.filter(i => i !== id)
      dispatch(
        pressExcelParamsAction({
          ...props,
          execelIdList: dataList,
        })
      )
    },
    [pressExcelParams.execelIdList]
  )

  const pressFilesDeleteExcelParamsOnChange = useCallback(
    (props: pressExcelParamsProps) => {
      let temp: pressExcelListProps[] = []
      for (const string of props.excelList) {
        const find = props.execelIdList.find(e => e === string.id)
        if (!find) {
          temp = [...temp, string]
        }
      }
      dispatch(
        pressExcelParamsAction({
          ...props,
          excelList: temp,
          execelIdList: [],
        })
      )
    },
    [pressExcelParams.excelList, pressExcelParams.execelIdList]
  )

  const pressFilesAllCheckedExcelParamsOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, props: pressExcelParamsProps) => {
      dispatch(
        pressExcelParamsAction({
          ...props,
          execelIdList: e.target.checked ? props.excelList.map(e => e.id) : [],
        })
      )
    },
    [pressExcelParams.execelIdList]
  )

  const pressExcelAllDeleteJrnlstListsAction = useCallback(
    (props: pressExcelParamsProps) => {
      const params = {
        ...props,
        jrnlstLists: [],
      }
      dispatch(pressExcelParamsAction(params))
    },
    [pressExcelParams.jrnlstLists]
  )

  const pressExcelDeleteJrnlstListsAction = useCallback(
    (item: MbTagSearchTagItem, props: pressExcelParamsProps) => {
      const params = {
        ...props,
        jrnlstLists: _.cloneDeep(props.jrnlstLists).filter(tag => tag.id !== item.id),
      }
      dispatch(pressExcelParamsAction(params))
    },
    [pressExcelParams.jrnlstLists]
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

  const getValidateExcelPress = async (files: FileType[]) => {
    return new Promise<pressExcelListProps[] | false>(resolve => {
      let returnList: pressExcelListProps[] = []
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
                    name: '',
                    mediaName: '',
                    email: '',
                    department: '',
                    position: '',
                    landline: '',
                    mobile: '',
                    fields: '',
                    address: '',
                  }
                  if (jsonElement) {
                    const defineObject = Object.getOwnPropertyNames(jsonElement)
                    if (defineObject.length > 0) {
                      const findName = defineObject.findIndex(e => e.trim() === '이름')
                      if (findName) {
                        // @ts-ignore
                        temp.name = jsonElement[defineObject[findName]] ? jsonElement[defineObject[findName]] : ''
                      }
                      const findMediaName = defineObject.findIndex(e => e.trim() === '매체')
                      if (findMediaName) {
                        // @ts-ignore
                        temp.mediaName = jsonElement[defineObject[findMediaName]]
                          ? // @ts-ignore
                            jsonElement[defineObject[findMediaName]]
                          : ''
                      }
                      const findEmail = defineObject.findIndex(e => e.trim() === '이메일')
                      if (findEmail) {
                        // @ts-ignore
                        temp.email = jsonElement[defineObject[findEmail]] ? jsonElement[defineObject[findEmail]] : ''
                      }
                      const findDepartment = defineObject.findIndex(e => e.trim() === '부서')
                      if (findDepartment) {
                        // @ts-ignore
                        temp.department = jsonElement[defineObject[findDepartment]]
                          ? // @ts-ignore
                            jsonElement[defineObject[findDepartment]]
                          : ''
                      }
                      const findPosition = defineObject.findIndex(e => e.trim() === '직책')
                      if (findPosition) {
                        // @ts-ignore
                        temp.position = jsonElement[defineObject[findPosition]]
                          ? // @ts-ignore
                            jsonElement[defineObject[findPosition]]
                          : ''
                      }
                      const findLandline = defineObject.findIndex(e => e.trim() === '전화')
                      if (findLandline) {
                        // @ts-ignore
                        if (jsonElement[defineObject[findLandline]]) {
                          // @ts-ignore
                          const stringData = jsonElement[defineObject[findLandline]].toString()
                          // @ts-ignore
                          temp.landline = stringData ? stringData.replaceAll('-', '') : ''
                        }
                      }
                      const findMobile = defineObject.findIndex(e => e.trim() === '휴대폰')
                      if (findMobile) {
                        // @ts-ignore
                        if (jsonElement[defineObject[findMobile]]) {
                          // @ts-ignore
                          const stringData = jsonElement[defineObject[findMobile]].toString()
                          // @ts-ignore
                          temp.mobile = stringData ? stringData.replaceAll('-', '') : ''
                        }
                      }
                      const findFields = defineObject.findIndex(e => e.trim() === '분야')
                      if (findFields) {
                        // @ts-ignore
                        temp.fields = jsonElement[defineObject[findFields]] ? jsonElement[defineObject[findFields]] : ''
                      }
                      const findAddress = defineObject.findIndex(e => e.trim() === '주소')
                      if (findAddress) {
                        // @ts-ignore
                        temp.address = jsonElement[defineObject[findAddress]]
                          ? // @ts-ignore
                            jsonElement[defineObject[findAddress]]
                          : ''
                      }
                    }
                    if (
                      temp.name !== '' &&
                      temp.mediaName !== '' &&
                      temp.email !== '' &&
                      EMAIL_PATTERN.test(temp.email)
                    ) {
                      returnList = [...returnList, temp]
                    }
                  }
                }
                if (returnList.length > 0) {
                  const newReviews = returnList.reduce((acc, curr) => {
                    if (
                      acc.findIndex(
                        ({ name, mediaName, email }) =>
                          name === curr.name && mediaName === curr.mediaName && email === curr.email
                      ) === -1
                    ) {
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

  const getValidateExcelMedia = async (files: FileType[]) => {
    return new Promise<mediaExcelListProps[] | false>(resolve => {
      let returnList: mediaExcelListProps[] = []
      let isErr = false
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
              console.log('json', json)
              if (json.length < 2000) {
                for await (const jsonElement of json) {
                  let temp = {
                    id: Math.random().toString(),
                    mediaName: '',
                    website: '',
                    email: '',
                    landline: '',
                    mobile: '',
                    fields: '',
                    address: '',
                  }
                  if (jsonElement) {
                    const defineObject = Object.getOwnPropertyNames(jsonElement)
                    if (defineObject.length > 0) {
                      const findMediaName = defineObject.findIndex(e => e.trim() === '매체명')
                      if (findMediaName) {
                        // @ts-ignore
                        temp.mediaName = jsonElement[defineObject[findMediaName]]
                          ? // @ts-ignore
                            jsonElement[defineObject[findMediaName]]
                          : ''
                      }
                      const findWebsite = defineObject.findIndex(e => e.trim() === '웹사이트')
                      if (findWebsite) {
                        // @ts-ignore
                        temp.website = jsonElement[defineObject[findWebsite]]
                          ? // @ts-ignore
                            jsonElement[defineObject[findWebsite]]
                          : ''
                      }
                      const findEmail = defineObject.findIndex(e => e.trim() === '이메일')
                      if (findEmail) {
                        // @ts-ignore
                        temp.email = jsonElement[defineObject[findEmail]] ? jsonElement[defineObject[findEmail]] : ''
                      }
                      const findLandline = defineObject.findIndex(e => e.trim() === '전화')
                      if (findLandline) {
                        // @ts-ignore
                        if (jsonElement[defineObject[findLandline]]) {
                          // @ts-ignore
                          const stringData = jsonElement[defineObject[findLandline]].toString()
                          // @ts-ignore
                          temp.landline = stringData ? stringData.replaceAll('-', '') : ''
                        }
                      }
                      const findMobile = defineObject.findIndex(e => e.trim() === '팩스')
                      if (findMobile) {
                        // @ts-ignore
                        if (jsonElement[defineObject[findMobile]]) {
                          // @ts-ignore
                          const stringData = jsonElement[defineObject[findMobile]].toString()
                          // @ts-ignore
                          temp.mobile = stringData ? stringData.replaceAll('-', '') : ''
                        }
                      }
                      const findFields = defineObject.findIndex(e => e.trim() === '분야')
                      if (findFields) {
                        // @ts-ignore
                        temp.fields = jsonElement[defineObject[findFields]] ? jsonElement[defineObject[findFields]] : ''
                      }
                      const findAddress = defineObject.findIndex(e => e.trim() === '주소')
                      if (findAddress) {
                        // @ts-ignore
                        temp.address = jsonElement[defineObject[findAddress]]
                          ? // @ts-ignore
                            jsonElement[defineObject[findAddress]]
                          : ''
                      }
                    }
                    if (temp.mediaName !== '') {
                      if (temp.email !== '' && temp.website !== '') {
                        if (EMAIL_PATTERN.test(temp.email) && URL_REGEXP.test(temp.website)) {
                          console.log('1', temp)
                          returnList = [...returnList, temp]
                        }
                      } else if (temp.email !== '') {
                        if (EMAIL_PATTERN.test(temp.email)) {
                          console.log('2', temp)
                          returnList = [...returnList, temp]
                        }
                      } else if (temp.website !== '') {
                        if (URL_REGEXP.test(temp.website)) {
                          console.log('3', temp)
                          returnList = [...returnList, temp]
                        }
                      } else {
                        returnList = [...returnList, temp]
                      }
                    }
                  }
                }
                if (returnList.length > 0) {
                  const newReviews = returnList.reduce((acc, curr) => {
                    if (acc.findIndex(({ mediaName, email }) => mediaName === curr.mediaName) === -1) {
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

  const mediaOnChangeFiles = async (e: ChangeEvent<HTMLInputElement> | any, props: mediaExcelParamsProps) => {
    e.preventDefault()
    e.stopPropagation()

    console.log('e', e)
    let param = { ...props }
    if (e.target?.files && e.target?.files.length > 0) {
      dispatch(mediaExcelDataLoadingAction(true))
      const result = await uploadFile(e.target?.files, fileSizeUnit)
      if (result.length > 0) {
        const res = await getValidateExcelMedia(result)
        if (res && res.length > 0) {
          param.excelList = res
          param.excelFileList = [{ id: result[0].file?.name || '', label: result[0].file?.name || '' }]
        } else {
          param.excelList = []
        }
      } else {
        param.excelList = []
      }
      dispatch(mediaExcelParamsAction(param))
    }
    e.target.value = null
  }

  const pressOnChangeFiles = async (e: ChangeEvent<HTMLInputElement> | any, props: pressExcelParamsProps) => {
    e.preventDefault()
    e.stopPropagation()

    let param = { ...props }
    if (e.target?.files && e.target?.files.length > 0) {
      dispatch(pressExcelDataLoadingAction(true))
      const result = await uploadFile(e.target?.files, fileSizeUnit)
      if (result.length > 0) {
        const res = await getValidateExcelPress(result)
        if (res && res.length > 0) {
          param.excelList = res
          param.excelFileList = [{ id: result[0].file?.name || '', label: result[0].file?.name || '' }]
        } else {
          param.excelList = []
        }
      } else {
        param.excelList = []
      }
      dispatch(pressExcelParamsAction(param))
    }
    e.target.value = null
  }

  const pressSocialListDeleteAction = (key: pressSocialListProps, props: pressSocialListProps[]) => {
    let res = [...props]
    res = res.filter(e => e.keyId !== key.keyId)
    dispatch(pressSocialListAction(res))
  }

  const pressPersonalAddressNmAction = (
    e: Address,
    param: categoryListProps,
    press: pressPersonalParamsProps,
    media: mediaPersonalParamsProps
  ) => {
    const { userSelectedType, address, roadAddress, jibunAddress } = e
    if (param.id === 'press') {
      const params = {
        ...press,
        address: userSelectedType === 'R' ? roadAddress : userSelectedType === 'J' ? jibunAddress : address,
      }
      dispatch(pressPersonalParamsAction(params))
    } else {
      const params = {
        ...media,
        address: userSelectedType === 'R' ? roadAddress : userSelectedType === 'J' ? jibunAddress : address,
      }
      dispatch(mediaPersonalParamsAction(params))
    }
  }

  const init = async () => {
    dispatch(initAction(router.pathname === '/media/add' ? 'media' : 'press'))
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

  const pressPersonalValidate = async (props: pressPersonalParamsProps, list: pressSocialListProps[]) => {
    let nameErr = ''
    let mediaNameErr = ''
    let emailErr = ''
    let isProcess = false
    if (props.name === '') {
      nameErr = '이름을 입력하세요.'
      isProcess = true
    }
    if (props.mediaName === '') {
      mediaNameErr = '매체명을 입력하세요.'
      isProcess = true
    }
    if (props.email === '') {
      emailErr = '이메일을 입력하세요.'
      isProcess = true
    }
    if (!EMAIL_PATTERN.test(props.email)) {
      emailErr = EMAIL_PATTERN_DESCRIPTION
      isProcess = true
    }
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
        isProcess = true
        dispatch(pressSocialListAction(listParam))
      }
    }

    if (isProcess) {
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

  const mediaExcelValidate = async (props: mediaExcelParamsProps) => {
    let isProcess = false
    if (props.excelList.length > 0) {
      isProcess = true
    } else {
      openToast('업로드할 엑셀 파일이 존재하지 않습니다.', 'success')
    }

    return isProcess
  }

  const pressExcelValidate = async (props: pressExcelParamsProps) => {
    let isProcess = false
    if (props.excelList.length > 0) {
      isProcess = true
    } else {
      openToast('업로드할 엑셀 파일이 존재하지 않습니다.', 'success')
    }

    return isProcess
  }

  const mediaExcelAddAction = async (props: mediaExcelParamsProps) => {
    try {
      let isProcess = true
      if (props.excelList.length > 0) {
        for await (const paramElement of props.excelList) {
          if (isProcess) {
            const param: CreateMediaDto = {
              name: paramElement.mediaName,
              wsite: paramElement.website,
              email: paramElement.email,
              landline: paramElement.landline,
              fax: paramElement.mobile,
              address: paramElement.address,
              mediaList: props.mediaBookLists.map(id => Number(id.id)),
            }
            const { status, data, message } = await createMedia.mutateAsync(param)
            if (status !== 'S') {
              isProcess = false
              openToast(message?.message, 'error')
            }
          }
        }
        if (isProcess) {
          openToast('엑셀로 미디어 추가작업을 완료하였습니다.', 'success')
          dispatch(mediaAddExcelAction())
        }
      }
    } catch (e) {}
  }
  const pressExcelAddAction = async (props: pressExcelParamsProps) => {
    try {
      let param: CreateJournalistDtoList = {
        createJournalistDtoList: [],
      }
      if (props.excelList.length > 0) {
        for await (const paramElement of props.excelList) {
          if (
            paramElement.name &&
            paramElement.name !== '' &&
            paramElement.mediaName &&
            paramElement.mediaName !== '' &&
            paramElement.email &&
            paramElement.email !== ''
          ) {
            param.createJournalistDtoList = [
              ...param.createJournalistDtoList,
              {
                name: paramElement.name,
                mediaName: paramElement.mediaName,
                email: paramElement.email,
                department: paramElement.department,
                position: paramElement.position,
                landline: paramElement.landline,
                mobile: paramElement.mobile,
                fields: paramElement.fields,
                address: paramElement.address,
                jrnlstLists: props.jrnlstLists.map(id => Number(id.id)),
              },
            ]
          }
        }
        if (param.createJournalistDtoList.length > 0) {
          const { status, data, message } = await createJournalistArray.mutateAsync(param)
          if (status === 'S') {
            openToast('엑셀로 연락처 추가작업을 완료하였습니다.', 'success')
            dispatch(pressAddExcelAction())
          } else {
            openToast(message?.message, 'error')
          }
        }
      }
    } catch (e) {}
  }

  const mediaPersonalAddAction = async (props: mediaPersonalParamsProps) => {
    const param: CreateMediaDto = {
      name: props.mediaName,
      wsite: props.website,
      email: props.email,
      landline: props.landline,
      fax: props.mobile,
      fieldsByUser: props.fields.split(','),
      address: props.address + props.subAddressNm,
      mediaList: props.mediaBookLists.map(id => Number(id.id)),
    }
    const { status, data, message } = await createMedia.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      const targetId = data as unknown as number
      dispatch(
        mediaAddPersonalAction({
          id: targetId.toString(),
          name: props.mediaName,
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const pressPersonalAddAction = async (props: pressPersonalParamsProps, list: pressSocialListProps[]) => {
    let param: CreateJournalistDto = {
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
      jrnlstLists: props.jrnlstLists.map(id => Number(id.id)),
      socials: [],
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
      param.socials = tempList
    }
    const { status, data, message } = await createJournalist.mutateAsync(param)
    if (status === 'S') {
      openToast(message?.message, 'success')
      const targetId = data as unknown as number
      dispatch(
        pressAddPersonalAction({
          id: targetId.toString(),
          name: props.name,
        })
      )
    } else {
      openToast(message?.message, 'error')
    }
  }

  const moveMediaSearchResult = async () => {
    const res = setObjectToBase64({
      ...defaultMediaSearchOption.keywordParam,
      ...defaultMediaSearchOption.additionalParam,
      system: { id: 'USERADD', name: '개인 추가 미디어', extra: '3' },
      media_id: 0,
      key_id: 'media',
    })
    await router.push(`/media/search-result?filter=${res}`)
  }

  const movePressSearchResult = async () => {
    const res = setObjectToBase64({
      ...defaultPressSearchOption.keywordParam,
      ...defaultPressSearchOption.additionalParam,
      system: { id: 'USERADD', name: '개인 추가 언론인', extra: '32' },
      journalist_id: 0,
      key_id: 'press',
    })
    await router.push(`/contacts/search-result?filter=${res}`)
  }

  const handleCreateMediabook = async (props: mediaListPopupPageProps) => {
    const { status, data, message } = await createMediaGroup.mutateAsync({
      title: props.name,
      groupId: userSelectGroup,
      shareCode: shareCodeData.list.id,
    })
    if (status === 'S') {
      dispatch(
        mediaListPopupPageAction({
          ...props,
          isActive: true,
          mediaIdList: [...props.mediaIdList, { id: Number(data), title: props.name || '' }],
        })
      )
      await mediaCustomSearchListData('')
    } else {
      openToast(message?.message, 'error')
    }
    return
  }

  const handleCreateNewList = async (props: pressListPopupPageProps) => {
    const { status, data, message } = await createJournalistGroup.mutateAsync({
      title: props.name,
      groupId: userSelectGroup,
      shareCode: shareCodeData.list.id,
    })
    if (status === 'S') {
      dispatch(
        pressListPopupPageAction({
          ...props,
          isActive: true,
          pressIdList: [...props.pressIdList, { id: Number(data), title: props.name || '' }],
        })
      )
      await journalistCustomSearchListData('')
    } else {
      openToast(message?.message, 'error')
    }
  }

  const journalistCustomSearchListData = async (e: string) => {
    const { status, data, message } = await apiGetJournalistGroup({
      page: 1,
      size: MEDIA_VALUE_MAX_POINT,
      sort: ['updateAt!desc'],
      title: e,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const { content } = data as PageableDataDto<JournalistMediaGroupItem>
      let param: pressListContentListProps[] = []
      if (content && content.length > 0) {
        for await (const re of content) {
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === re.shareCode)
          let temp: pressListContentListProps = {
            ...re,
            isEdit: userInfo.userId === re.owner?.userId ? true : re.shareCode === 'WRITABLE',
            isOwner: userInfo.userId === re.owner?.userId,
            shareCodeNm: findShareScopeList?.name || '',
          }
          param = [...param, temp]
        }
      }
      dispatch(pressListContentListAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const mediaCustomSearchListData = async (e: string) => {
    const { status, data, message } = await apiGetMediaGroup({
      page: 1,
      size: MEDIA_VALUE_MAX_POINT,
      sort: ['updateAt!desc'],
      title: e,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const { content } = data as PageableDataDto<JournalistMediaGroupItem>
      let param: mediaListContentListProps[] = []
      if (content && content.length > 0) {
        for await (const re of content) {
          const findShareScopeList = disclosureScopeFilterOptionList.find(e => e.id === re.shareCode)
          let temp: mediaListContentListProps = {
            ...re,
            isEdit: userInfo.userId === re.owner?.userId ? true : re.shareCode === 'WRITABLE',
            isOwner: userInfo.userId === re.owner?.userId,
            shareCodeNm: findShareScopeList?.name || '',
          }
          param = [...param, temp]
        }
      }
      dispatch(mediaListContentListAction(param))
    } else {
      openToast(message?.message, 'error')
    }
  }

  const getCommonCode = async (code: string) => {
    let res: CommonCode[] = []
    const { status, data, message } = await apiGetCommonCode({
      parentCode: code,
    })
    if (status === 'S') {
      res = data as CommonCode[]
    }
    return res
  }

  const initPressUser = async () => {
    const list = await getCommonCode('JRNLST_SOCIAL_USER_ADD')
    dispatch(
      jrnlstSocialUserAddListAction([
        { id: '', name: '선택' },
        ...list.map(e => {
          return { id: e.code, name: e.name }
        }),
      ])
    )
  }

  const handleDataInputSearchRegisterListPopup = async (e: string, type: string) => {
    if (type === 'press') {
      await journalistCustomSearchListData(e)
    } else {
      await mediaCustomSearchListData(e)
    }
  }

  return {
    categoryList,
    categoryData,
    pressPersonalParams,
    addressPopup,
    pressListPopupPage,
    pressListContentList,
    userInfo,
    licenseInfo,
    jrnlstSocialUserAddList,
    pressSocialList,
    pressExcelDataLoading,
    pressExcelParams,
    mediaPersonalParams,
    mediaListPopupPage,
    mediaListContentList,
    mediaExcelDataLoading,
    mediaExcelParams,
    medialistKey,
    journalistKey,
    searchRegisterListPopup,
    settingsRefinedValue,

    init,
    pressPersonalValidate,
    pressPersonalAddAction,
    pressPersonalAddressNmAction,
    handleCreateNewList,
    pressSocialListDeleteAction,
    pressOnChangeFiles,
    pressExcelValidate,
    pressExcelAddAction,
    handleCreateMediabook,
    mediaPersonalAddAction,
    mediaPersonalValidate,
    mediaOnChangeFiles,
    mediaExcelValidate,
    mediaExcelAddAction,
    movePressSearchResult,
    moveMediaSearchResult,
    initPressUser,
    handleDataInputSearchRegisterListPopup,

    categoryDataHandle,
    categoryDataNextStepHandle,
    categoryDataInformationHandle,
    resetCategoryPressHandle,
    categoryDataAddStepHandle,
    addressPopupHandle,

    pressFilesCheckedExcelParamsOnChange,
    pressSocialListTypeAction,
    pressSocialListLinkAction,
    pressPersonalNameAction,
    pressPersonalPositionAction,
    pressPersonalDepartmentAction,
    pressPersonalMediaNameAction,
    pressPersonalFieldsAction,
    pressPersonalEmailAction,
    pressPersonalLandlineAction,
    pressPersonalMobileAction,
    pressPersonalSubAddressNmAction,
    pressPersonalDeleteJrnlstListsAction,
    pressPersonalAllDeleteJrnlstListsAction,
    pressPersonalCareerNmAction,
    pressPersonalEducationAction,
    pressPersonalWritingsAction,
    pressPersonalAwardsAction,
    setPressListPopupAction,
    setPressListPopupNameAction,
    setPressListData,
    pressListPopupPageCheckStatusChange,
    pressPersonalSocialAction,
    pressFilesDeleteExcelParamsOnChange,
    pressFilesAllCheckedExcelParamsOnChange,
    pressExcelDeleteJrnlstListsAction,
    pressExcelAllDeleteJrnlstListsAction,

    mediaFilesCheckedExcelParamsOnChange,
    mediaPersonalNameAction,
    mediaPersonalMediaNameAction,
    mediaPersonalFieldsAction,
    mediaPersonalEmailAction,
    mediaPersonalLandlineAction,
    mediaPersonalMobileAction,
    mediaPersonalSubAddressNmAction,
    mediaPersonalDeleteJrnlstListsAction,
    mediaPersonalAllDeleteJrnlstListsAction,
    setMediaListPopupNameAction,
    setMediaListData,
    mediaListPopupPageCheckStatusChange,
    mediaFilesDeleteExcelParamsOnChange,
    mediaFilesAllCheckedExcelParamsOnChange,
    mediaExcelDeleteJrnlstListsAction,
    mediaExcelAllDeleteJrnlstListsAction,
    setMediaListPopupAction,
    setResetTagPressListAction,
    setAllResetTagPressListAction,
    setResetTagMediaListAction,
    setAllResetTagMediaListAction,
  }
}
