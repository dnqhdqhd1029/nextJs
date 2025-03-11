/**
 * @file useFileUpload.ts
 * @description 파일 업로드 커스텀 훅
 */

import { ChangeEvent, DragEvent, useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

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

export interface ImageUpload {
  width: number
  height: number
  path: string
  mimeType?: string
  isImage?: boolean
}

export interface FileType {
  fileSrc?: string
  isImage?: boolean
  id?: string
  width?: number
  height?: number
  file?: File
  size?: number
  errorCode?: number
  message?: string
  mimeType?: string
  fieldname?: string
  originalname?: string
  encoding?: string
  mimetype?: string
  destination?: string
  filename?: string
  path?: string
  description?: string
}

export interface ErrorStatus {
  errorCode: 100 | 101 | 200 | 201 // 100: 파일 사이즈 초과, 101: 파일 갯수 초과, 200: 파일 업로드 에러, 201: 파일 삭제 에러
  message: string
  data?: File | FileType
}

export const useFileDragAndDrop = (
  fileSizeUnit: string,
  fileSizeLimit: number,
  fileLengthLimit: number,
  originFiles?: FileType[],
  originPath?: string
) => {
  const locale = useAppSelector(state => state.authSlice.defaultLocale) as 'ko' | 'en'
  const [errorStatus, setErrorStatus] = useState<ErrorStatus | undefined>()

  const [fileList, setFileList] = useState<FileType[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const processUpload = (file: File): Promise<{ code: string; data: FileType }> => {
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
                size: getSize(file.size, fileSizeUnit ? fileSizeUnit.toLocaleLowerCase() : 'kb'),
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
        } else {
          res.code = ''
          res.data = {
            width,
            height,
            isImage,
            file,
            fileSrc,
            id: uuid(),
            size: getSize(file.size, fileSizeUnit ? fileSizeUnit.toLocaleLowerCase() : 'kb'),
            mimeType,
          }
          resolve(res)
        }
      } catch (e) {
        res.code = messages[locale].code200
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

  const uploadFile = async (files: FileList) => {
    let isProcess = false
    let res = fileList
    const filesArr = Array.from(files)
    console.log('filesArr', filesArr)
    const totalFileLength = fileList ? fileList.length + filesArr.length : filesArr.length
    console.log('totalFileLength', totalFileLength)
    console.log('fileLengthLimit', fileLengthLimit)
    fileLengthLimit > 1 && totalFileLength > fileLengthLimit
      ? openToast(messages[locale].code101, 'error')
      : (isProcess = true)

    if (isProcess) {
      for await (const totalFileLengthElement of filesArr) {
        const fileSize = getSize(totalFileLengthElement.size, fileSizeUnit ? fileSizeUnit.toLocaleLowerCase() : 'kb')
        console.log('fileSize', fileSize)
        if (fileSizeLimit && fileSize > fileSizeLimit) {
          openToast(messages[locale].code100, 'error')
        } else {
          const temp = await processUpload(totalFileLengthElement)
          console.log('temp', temp)
          temp.code === '' ? (res = [...res, temp.data]) : openToast(temp.code, 'error')
        }
      }
    }

    return res
  }

  const onChangeFiles = useCallback(
    async (e: ChangeEvent<HTMLInputElement> | any): Promise<void> => {
      if (isUploading) return

      let selectFiles = []
      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files
        console.log('drop', selectFiles)
      } else {
        selectFiles = e.target.files
        console.log('non drop', selectFiles)
      }
      if (selectFiles && selectFiles.length > 0) {
        console.log('selectFiles', selectFiles)
        const result = await uploadFile(selectFiles)
        console.log('result', result)
        setFileList(() => result)
        setIsEdit(() => true)
        // setTimeout(() => {
        //   setIsUploading(false)
        // }, 500)
      }
      setIsUploading(() => false)
    },
    [fileList]
  )

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    setIsUploading(() => false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer!.files) setIsUploading(() => true)
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault()
      e.stopPropagation()
      console.log('handleDrop', e)
      onChangeFiles(e)
    },
    [onChangeFiles]
  )

  const onDeleteUserFile = useCallback(
    (item: FileType) => {
      if (fileList && fileList.length > 0) {
        const files = fileList.filter(file => file.id !== item.id)
        setFileList(() => files)
      }
    },
    [fileList]
  )

  useEffect(() => {
    originFiles && setFileList(() => originFiles)
  }, [originPath])

  return {
    errorStatus,
    handleDrop,
    handleDragOver,
    handleDragOut,
    handleDragIn,
    fileList,
    isUploading,
    isEdit,
    onChangeFiles,
    onDeleteUserFile,
  }
}
