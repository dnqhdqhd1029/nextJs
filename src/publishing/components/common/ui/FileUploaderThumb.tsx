import * as React from 'react'
import { ValidateFileResponse } from '@files-ui/core'
import { ExtFile, FileCard, FileInputButton } from '@files-ui/react'

export default function FileUploaderThumb() {
  const [files, setFiles] = React.useState<ExtFile[]>([])
  const updateFiles = (incommingFiles: ExtFile[]) => {
    //do something with the files
    setFiles(incommingFiles)
    //even your own upload implementation
  }
  const removeFile = (id: number | string | undefined) => {
    setFiles(files.filter(x => x.id !== id))
  }

  const handleValidateFile = (file: File): ValidateFileResponse => {
    console.log('file', file)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size is too large')
      return {
        valid: false,
        errors: ['File size is too large'],
      }
    }
    return {
      valid: true,
    }
  }

  return (
    // 사진 등록 전후에 따른 문구 등 개발 필요.
    <div className="file-uploader-thumb__section">
      <div className="file-uploader-thumb__area">
        <div className="file-uploader-thumb__group">
          {files.map((file: ExtFile) => (
            <FileCard
              {...file}
              key={file.id}
              onDelete={removeFile}
              preview
            />
          ))}
        </div>
        <FileInputButton
          onChange={updateFiles}
          value={files}
          accept={'image/*'}
          maxFileSize={2 * 1024 * 1024}
          maxFiles={1}
          validator={handleValidateFile}
          autoClean
          label={'파일 선택'} // 파일 등록 시 label 네임 변경해야 함
        />
      </div>

      <p className="font-body__regular">사진은 jpg, png, gif 파일로 최대 3MB 이내</p>
    </div>
  )
}
