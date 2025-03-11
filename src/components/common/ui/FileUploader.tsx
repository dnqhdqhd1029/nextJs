/**
 * @file FileUploader.tsx
 * @description 파일 업로더 컴포넌트
 */

import { useEffect, useState } from 'react'
import { ValidateFileResponse } from '@files-ui/core'
import { ExtFile, FileCard, FileInputButton } from '@files-ui/react'

interface Props {
  maxFileNumber?: number
  maxFileSize?: number
  onFileChange?: (files: ExtFile[]) => void
  title?: string
}

const FileUploader = ({ title: receivedTitle, maxFileNumber = 1, maxFileSize = 5, onFileChange }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [files, setFiles] = useState<ExtFile[]>([])
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles)
  }
  const removeFile = (id: number | string | undefined) => {
    console.log('removeFile', id)
    setFiles(files.filter(x => x.id !== id))
  }

  const handleValidateFile = (file: File): ValidateFileResponse => {
    if (file.size > maxFileSize * 1024 * 1024) {
      alert('파일 크기가 너무 큽니다. 5MB 이하의 파일만 업로드 가능합니다.')
      return {
        valid: false,
        errors: ['파일 크기가 너무 큽니다. 5MB 이하의 파일만 업로드 가능합니다.'],
      }
    }
    return {
      valid: true,
    }
  }

  useEffect(() => {
    onFileChange && onFileChange(files)
  }, [files])

  useEffect(() => {
    if (receivedTitle === undefined) {
      setTitle('첨부')
      return
    }

    setTitle(receivedTitle)
  }, [receivedTitle])

  return (
    <div className="file-uploader__section file-type1">
      {title !== '' && <h2 className="file-uploader__title">{title}</h2>}
      <FileInputButton
        onChange={updateFiles}
        value={files}
        // accept={'image/*'}
        maxFileSize={maxFileSize * 1024 * 1024}
        maxFiles={maxFileNumber}
        validator={handleValidateFile}
        autoClean
        label={'파일 찾기'}
      />
      <p className="file-uploader__desc">5MB 이하 이미지와 문서 첨부 가능</p>

      {files.length > 0 && (
        <div className="file-uploader__list-container">
          <ul className="file-uploader__list">
            {files.map((file: ExtFile) => (
              <li
                className="file-uploader__list-item"
                key={file.id}
              >
                <span className="file-uploader__list-item-title">{file.name}</span>
                <button
                  type="button"
                  className="file-uploader__list-item-delete"
                  onClick={() => removeFile(file.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FileUploader
