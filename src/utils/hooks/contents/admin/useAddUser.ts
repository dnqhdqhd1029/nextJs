import { ChangeEvent, RefObject, useCallback, useEffect } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'
import * as xlsx from 'xlsx'

import { EmailErr } from '~/components/contents/admin/AddUser/EmailErr'
import { EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION } from '~/constants/common'
import {
  authDataLoadingAction,
  authTypeAction,
  deleteEmailDataAction,
  emailDataAction,
  emailDataLoadingAction,
  emailDataProps,
  excelIdListAction,
  excelListProps,
  groupErrAction,
  groupListAction,
  initStepAction,
  startStepAction,
  stepAction,
} from '~/stores/modules/contents/admin/addUser'
import { CreateUserDtoRoleEnum, GroupDtoForUser } from '~/types/api/service'
import { type MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { usePostUserCheckEmail } from '~/utils/api/user/usePostUserCheckEmail'
import { usePostUserAddUser } from '~/utils/api/user/usePostUserCreate'
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

export const useAddUser = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    commonParentCode,
    step,
    emailData,
    emailDataLoading,
    emailDataChecked,
    authType,
    groupItemList,
    groupErr,
    registerType,
    authDataLoading,
    originGroupList,
    excelIdList,
  } = useAppSelector(state => state.addUserSlice)

  const settingsRefinedValue = useAppSelector(state => state.userSettingSlice.refinedValue)
  const { currentGroup } = useAppSelector(state => state.headerSlice)

  const checkUserEmail = usePostUserCheckEmail()
  const addNewUser = usePostUserAddUser()

  const handleStartPagestepAction = useCallback(
    (e: string, i: string, current: GroupDtoForUser) =>
      dispatch(startStepAction({ step: e, registerType: i, group: current })),
    [dispatch]
  )

  const handlePagestepAction = useCallback(
    (e: string, i: string, current: GroupDtoForUser) =>
      dispatch(stepAction({ step: e, registerType: i, group: current })),
    [dispatch]
  )

  const setAuthTypeAction = useCallback((e: string) => dispatch(authTypeAction(e)), [dispatch])

  const setGroupListAction = useCallback(
    (tagList: MbTagSearchTagItem[]) => dispatch(groupListAction(tagList)),
    [groupItemList]
  )

  const setGroupItemListControl = useCallback(
    (e: MbTagSearchTagItem, props: MbTagSearchTagItem[]) => {
      let res = props.filter(item => item.id !== e.id)
      if (res.length < 1) {
        openToast('회원은 최소 1개의 그룹에 가입해야 합니다.', 'error')
        res = [...props]
      }
      dispatch(groupListAction(res))
    },
    [groupItemList]
  )

  const setUserGroupItem = useCallback(
    (e: MbTagSearchTagItem[], props: MbTagSearchTagItem[]) => {
      let dataList = [...props]
      if (e.length > 0) {
        dataList = e
      }
      dispatch(groupListAction(dataList))
    },
    [groupItemList]
  )

  const setGroupItem = useCallback(
    (i: boolean, e: MbTagSearchTagItem, props: MbTagSearchTagItem[]) => {
      let dataList = [...props]
      if (!i) {
        dataList = [...dataList, e]
      } else {
        dataList = dataList.filter(k => k.id !== e.id)
      }
      if (dataList.length < 1) {
        openToast('회원은 최소 1개의 그룹에 가입해야 합니다.', 'error')
        dataList = [...props]
      }
      dispatch(groupListAction(dataList))
    },
    [groupItemList]
  )

  const setGroupItemListDeleteControl = useCallback(() => {
    dispatch(groupListAction([]))
  }, [groupItemList])

  const emailCheckedExcelOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string, props: emailDataProps) => {
      let dataList = props.execelIdList
      dataList = e.target.checked ? [...dataList, id] : dataList.filter(i => i !== id)
      dispatch(
        emailDataAction({
          ...props,
          execelIdList: dataList,
        })
      )
    },
    [emailData.execelIdList]
  )

  const emailAllCheckedExcelParamsOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, props: emailDataProps) => {
      dispatch(
        emailDataAction({
          ...props,
          execelIdList: e.target.checked ? props.excelList.map(e => e.id) : [],
        })
      )
    },
    [emailData.execelIdList]
  )

  const emailDeleteExcelParamsOnChange = useCallback(
    (props: emailDataProps) => {
      let temp: excelListProps[] = []
      for (const string of props.excelList) {
        const find = props.execelIdList.find(e => e === string.id)
        if (!find) {
          temp = [...temp, string]
        }
      }
      dispatch(
        deleteEmailDataAction({
          ...props,
          excelList: temp,
          execelIdList: [],
        })
      )
    },
    [emailData.excelList, emailData.execelIdList]
  )

  const addNewUserAction = async (emailTypes: emailDataProps, auth: string, groupItems: MbTagSearchTagItem[]) => {
    if (groupItems.length < 1) {
      dispatch(groupErrAction('회원은 최소 1개의 그룹에 가입해야 합니다.'))
    } else {
      dispatch(authDataLoadingAction(true))
      let tempEmails: string[] = []
      if (emailTypes.targetEmail.length > 0) {
        for (const emailType of emailTypes.targetEmail) {
          tempEmails = [...tempEmails, emailType.id]
        }
      }
      if (emailTypes.excelList.length > 0) {
        for (const emailType of emailTypes.excelList) {
          tempEmails = [...tempEmails, emailType.email]
        }
      }
      const params = {
        role: auth as CreateUserDtoRoleEnum,
        groups: groupItems.map(e => Number(e.id)),
        emails: tempEmails,
      }
      const { status, data, message } = await addNewUser.mutateAsync(params)
      if (status === 'S') {
        openToast('새 회원을 추가했습니다.', 'success')
        await router.push(`/admin/user`)
      } else {
        openToast(message?.message, 'error')
      }
      dispatch(authDataLoadingAction(false))
    }
  }

  const onChangeFiles = async (e: ChangeEvent<HTMLInputElement> | any, props: emailDataProps) => {
    e.preventDefault()
    e.stopPropagation()
    let param = { ...props }
    if (e.target?.files && e.target?.files.length > 0) {
      dispatch(emailDataLoadingAction(true))
      const result = await uploadFile(e.target?.files, fileSizeUnit)
      if (result.length > 0) {
        const res = await getValidateEmail(result)
        if (res && res.length > 0) {
          let tempEmails: string[] = res.map(e => e.email.toString())
          const { status, data, message } = await checkUserEmail.mutateAsync({ emails: tempEmails })
          if (status === 'S') {
            const list = data as string[]
            if (list.length > 0) {
              openToast(EmailErr(list), 'warning', false)
              param.excelList = []
              param.excelFileList = []
            } else {
              param.excelList = res
              param.excelFileList = [{ id: result[0].file?.name || '', label: result[0].file?.name || '' }]
            }
          } else {
            param.excelList = []
            param.excelFileList = []
            openToast(message?.message, 'error')
          }
        } else {
          param.excelList = []
          param.excelFileList = []
        }
      } else {
        param.excelList = []
        param.excelFileList = []
      }
      dispatch(emailDataAction(param))
    }
    e.target.value = null
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

  const getValidateEmail = async (files: FileType[]) => {
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

              if (json.length < 200) {
                for await (const jsonElement of json) {
                  let temp = {
                    id: Math.random().toString(),
                    email: '',
                    date: moment().format('YYYY-MM-DD'),
                  }
                  if (jsonElement) {
                    const defineObject = Object.getOwnPropertyNames(jsonElement)
                    if (defineObject.length > 0) {
                      const findEmail = defineObject.findIndex(e => e.trim() === '이메일')
                      if (findEmail) {
                        // @ts-ignore
                        temp.email = jsonElement[defineObject[findEmail]] ? jsonElement[defineObject[findEmail]] : ''
                      }
                    }
                    if (temp.email !== '' && EMAIL_PATTERN.test(temp.email)) {
                      returnList = [...returnList, temp]
                    }
                  }
                }
                if (returnList.length > 0) {
                  const newReviews = returnList.reduce((acc, curr) => {
                    if (acc.findIndex(({ email }) => email === curr.email) === -1) {
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

  const uploadFile = async (files: FileList, fileUnit: string) => {
    let res: FileType[] = []
    const filesArr = Array.from(files)
    const max_size_per_file = parseInt(settingsRefinedValue['max_size_per_file'])
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

  const setTagTargetEmailListAction = async (refs: RefObject<HTMLInputElement>, hook: emailDataProps) => {
    const param = { ...hook }

    const refValue = refs.current?.value.trim()
    if (!refValue) {
      param.emailErr = '등록하실 회원의 이메일을 입력해주세요'
    } else if (refValue === '') {
      param.emailErr = '등록하실 회원의 이메일을 입력해주세요'
    } else if (!EMAIL_PATTERN.test(refValue)) {
      param.emailErr = EMAIL_PATTERN_DESCRIPTION
    } else if (emailData.targetEmail?.some(emailInfo => emailInfo.id === refValue)) {
      param.emailErr = '이미 추가된 이메일입니다.'
    } else {
      let tempEmails: string[] = []
      tempEmails = [...tempEmails, refValue]
      const { status, data, message } = await checkUserEmail.mutateAsync({ emails: tempEmails })
      if (status === 'S') {
        const list = data as string[]
        if (list.length > 0) {
          openToast(EmailErr(list), 'warning', false)
        } else {
          param.email = ''
          param.emailErr = ''
          param.targetEmail = [...hook.targetEmail, { id: refValue, label: refValue }]
        }
      } else {
        openToast(message?.message, 'error')
      }
    }
    dispatch(emailDataAction(param))
  }

  const setResetTargetEmailListAction = async (param: MbTagSearchTagItem, hook: emailDataProps) => {
    const res = hook.targetEmail.filter(item => item.id !== param.id)
    dispatch(
      emailDataAction({
        ...hook,
        targetEmail: res,
      })
    )
  }

  const setAllResetTargetEmailListAction = async (hook: emailDataProps) => {
    dispatch(
      emailDataAction({
        ...hook,
        targetEmail: [],
      })
    )
  }

  const setResetTagPressListAction = async (param: MbTagSearchTagItem, props: emailDataProps) => {
    const res = props.excelFileList.filter(item => item.id !== param.id)
    dispatch(
      emailDataAction({
        ...props,
        excelFileList: res,
        excelList: [],
      })
    )
  }

  const setAllResetTagPressListAction = async (props: emailDataProps) => {
    dispatch(
      emailDataAction({
        ...props,
        excelFileList: [],
        excelList: [],
      })
    )
  }

  const init = async () => {
    dispatch(initStepAction())
  }

  return {
    commonParentCode,
    step,
    emailData,
    emailDataLoading,
    emailDataChecked,
    authType,
    groupErr,
    groupItemList,
    originGroupList,
    authDataLoading,
    excelIdList,
    currentGroup,
    registerType,

    init,
    addNewUserAction,
    setAllResetTargetEmailListAction,
    setResetTargetEmailListAction,
    setTagTargetEmailListAction,
    setResetTagPressListAction,
    setAllResetTagPressListAction,
    onChangeFiles,

    emailDeleteExcelParamsOnChange,
    emailAllCheckedExcelParamsOnChange,
    emailCheckedExcelOnChange,
    setGroupListAction,
    setAuthTypeAction,
    handlePagestepAction,
    setGroupItemListControl,
    setGroupItemListDeleteControl,
    setGroupItem,
    setUserGroupItem,
    handleStartPagestepAction,
  }
}
