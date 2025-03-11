/**
 * @file useFileUpload.ts
 * @description 파일 업로드 커스텀 훅
 */

import { ChangeEvent, DragEvent, useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

import { FileSizeUnit } from '~/types/common'
import { apiPostImageUpload } from '~/utils/api/image/apiPostImageUpload'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

const apiPath = 'https://docs.d.mediabee.kr'
// const apiPath = 'http://localhost:3189'

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

export interface UploadFileProps {
  fileSizeUnit?: FileSizeUnit
  fileSizeLimit?: number
  fileLengthLimit?: number
  onlyOneFile?: boolean
  accept?: string
}

export const useFileUpload = ({
  fileSizeUnit = 'mb',
  fileSizeLimit = 5,
  fileLengthLimit = 5,
  onlyOneFile = false,
  accept,
}: UploadFileProps) => {
  const locale = useAppSelector(state => state.authSlice.defaultLocale) as 'ko' | 'en'
  const [currentFiles, setCurrentFiles] = useState<FileType[] | null>([])
  const [errorStatus, setErrorStatus] = useState<ErrorStatus | undefined>()
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const getFakeImageForCalculationSize = (imageSrc: string): Promise<HTMLImageElement> => {
    return new Promise(resolve => {
      const image = document.createElement('img')

      image.src = imageSrc
      image.style.position = 'fixed'
      image.style.visibility = 'hidden'
      image.style.left = '-10000px'
      image.style.top = '-10000px'
      image.style.width = 'auto'
      image.style.height = 'auto'
      image.style.zIndex = '-1'
      image.style.opacity = '0'

      document.body.appendChild(image)

      resolve(image)
    })
  }

  const onFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isUploading) return
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files)
    }
  }

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isUploading) return
    if (e.target?.files && e.target?.files.length > 0) {
      setIsUploading(true)
      const result: FileType[] = await uploadFile(e.target?.files)
      setCurrentFiles(result)
      e.target.value = ''

      setTimeout(() => {
        setIsUploading(false)
      }, 500)
    }
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

  const uploadFile = async (files: FileList): Promise<FileType[]> => {
    const filesArr = Array.from(files)

    const totalFileLength = currentFiles ? currentFiles.length + filesArr.length : filesArr.length
    if (fileLengthLimit > 1 && totalFileLength > fileLengthLimit) {
      // 업로드 가능한 파일 수 초과
      return [
        {
          errorCode: 101,
          message: messages[locale].code101,
        },
      ]
    }

    const uploadPromises = filesArr.map(file => {
      // 파일 크기 체크
      const fileSize = getSize(file.size, fileSizeUnit ? fileSizeUnit.toLocaleLowerCase() : 'kb')
      if (fileSizeLimit && fileSize > fileSizeLimit) {
        // 파일 크기 초과
        return Promise.resolve({
          errorCode: 100,
          message: messages[locale].code100,
        })
      } else {
        // 이미지 파일 체크
        return processUpload(file)
      }
    })

    return await Promise.all(uploadPromises)
  }

  const processUpload = (file: File): Promise<FileType> => {
    return new Promise((resolve, reject) => {
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

            resolve({
              width,
              height,
              isImage,
              file,
              fileSrc,
              id: uuid(),
              size: getSize(file.size, fileSizeUnit ? fileSizeUnit.toLocaleLowerCase() : 'kb'),
              mimeType,
            })
          }

          image.onerror = function () {
            reject(new Error('Image loading error'))
          }

          //@ts-ignore
          image.src = event.target.result
          fileSrc = event.target?.result as string
        }

        reader.onerror = function () {
          reject(new Error('File reading error'))
        }

        reader.readAsDataURL(file)
      } else {
        resolve({
          width,
          height,
          isImage,
          file,
          fileSrc,
          id: uuid(),
          size: getSize(file.size, fileSizeUnit ? fileSizeUnit.toLocaleLowerCase() : 'kb'),
          mimeType,
        })
      }
    })
  }

  const onDeleteUserFile = (item: FileType) => {
    if (currentFiles && currentFiles.length > 0) {
      const files = currentFiles.filter(file => file.id !== item.id)
      setCurrentFiles(files)
    }
  }

  return {
    currentFiles,
    setCurrentFiles,
    uploadFile,
    onFileChange,
    onDeleteUserFile,
    errorStatus,
    isUploading,
    setIsUploading,
    onFileDrop,
  }
}
