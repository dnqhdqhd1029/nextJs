import * as React from 'react'
import { ValidateFileResponse } from '@files-ui/core'
import { ExtFile, FileCard, FileInputButton } from '@files-ui/react'

export default function FileUploader2() {
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
    <div className="file-uploader__section file-type1">
      <h2 className="file-uploader__title">첨부</h2>
      <FileInputButton
        onChange={updateFiles}
        value={files}
        accept={'image/*'}
        maxFileSize={2 * 1024 * 1024}
        maxFiles={10}
        validator={handleValidateFile}
        autoClean
        label={'파일 찾기'}
      />
      <p className="file-uploader__desc">5MB 이하 이미지와 문서 첨부 가능</p>

      {files.length > 0 && (
        <div className="file-uploader__group">
          <ul className="file-uploader__list">
            {files.map((file: ExtFile) => (
              <li key={file.id}>
                <FileCard
                  {...file}
                  onDelete={removeFile}
                  preview
                  imageUrl={'https://cdn.wallpapersafari.com/0/95/1zms6H.jpg'}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
