import { FC, useState } from 'react'
import { ExtFile, ValidateFileResponse } from '@files-ui/core'
//@ts-ignore
import { Dropzone, FileCard, FileMosaic, FullScreen, ImagePreview, VideoPreview } from '@files-ui/react'

const BASE_URL = 'https://www.myserver.com'

interface AdvancedDropzoneDemoProps {
  option?: string
}

const AdvancedDropzoneDemo: FC<AdvancedDropzoneDemoProps> = () => {
  const [extFiles, setExtFiles] = useState<ExtFile[]>([])
  const [imageSrc, setImageSrc] = useState<File | string | undefined>(undefined)
  const [videoSrc, setVideoSrc] = useState<File | string | undefined>(undefined)

  const updateFiles = (incommingFiles: ExtFile[]) => {
    console.log('incomming files', incommingFiles)
    setExtFiles(incommingFiles)
  }
  const onDelete = (id: number | string | undefined) => {
    setExtFiles(extFiles.filter(x => x.id !== id))
  }
  const handleSee = (imageSource: string | undefined) => {
    setImageSrc(imageSource)
  }
  const handleWatch = (videoSource: File | string | undefined) => {
    setVideoSrc(videoSource)
  }
  const handleStart = (filesToUpload: ExtFile[]) => {
    console.log('advanced demo start upload', filesToUpload)
  }
  const handleFinish = (uploadedFiles: ExtFile[]) => {
    console.log('advanced demo finish upload', uploadedFiles)
  }
  const handleAbort = (id: number | string | undefined) => {
    setExtFiles(
      extFiles.map(ef => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: 'aborted' }
        } else return { ...ef }
      })
    )
  }
  const handleCancel = (id: number | string | undefined) => {
    setExtFiles(
      extFiles.map(ef => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined }
        } else return { ...ef }
      })
    )
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
    <div className="file-uploader__section file-type2">
      <h2 className="file-uploader__title">내용</h2>
      <Dropzone
        onChange={updateFiles}
        value={extFiles}
        accept=".jpg,.png"
        maxFiles={3}
        maxFileSize={2 * 1024 * 1024}
        label="업로드할 파일을 이 영역으로 클릭하거나 드래그합니다."
        uploadConfig={{
          // autoUpload: true
          url: BASE_URL + '/file',
          cleanOnUpload: true,
        }}
        // onUploadStart={handleStart}
        // onUploadFinish={handleFinish}
        // autoClean
        fakeUpload
        // actionButtons={{
        //   position: 'after',
        //   abortButton: {},
        //   deleteButton: {},
        //   uploadButton: {},
        // }}
        validator={handleValidateFile}
      >
        {/* {extFiles.map((file) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            onWatch={handleWatch}
            onAbort={handleAbort}
            onCancel={handleCancel}
            resultOnTooltip
            alwaysActive
            preview
            info
          />
        ))} */}
      </Dropzone>
      {extFiles.length > 0 && (
        <div className="file-uploader__group">
          <ul className="file-uploader__list">
            {extFiles.map(file => (
              <li key={file.id}>
                <FileCard
                  {...file}
                  onDelete={onDelete}
                  onSee={handleSee}
                  onWatch={handleWatch}
                  onAbort={handleAbort}
                  onCancel={handleCancel}
                  resultOnTooltip
                  alwaysActive
                  preview
                  info
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>
      <FullScreen
        open={videoSrc !== undefined}
        onClose={() => setVideoSrc(undefined)}
      >
        <VideoPreview
          src={videoSrc}
          autoPlay
          controls
        />
      </FullScreen>
    </div>
  )
}

export default AdvancedDropzoneDemo
