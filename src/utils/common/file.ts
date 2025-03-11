import { AttachedDto, FileAttachDto } from '~/types/api/service'
import { apiGetCompanyFileDownload } from '~/utils/api/file/apiGetCompanyFileDownload'
import { apiGetFileDownload } from '~/utils/api/file/apiGetFileDownload'

export const downloadFileFromFileAttachDto = async (file: FileAttachDto, groupId: number) => {
  const resultFile = await apiGetFileDownload(file.fileId ?? 0, groupId)

  if (!resultFile) {
    return
  }

  makeFileToDownload<FileAttachDto>(resultFile, file)
}

export const downloadCompanyFile = async (file: AttachedDto, groupId: number) => {
  const resultFile = await apiGetCompanyFileDownload(file.attachedId ?? 0, groupId)

  if (!resultFile) {
    return
  }

  makeFileToDownload<AttachedDto>(resultFile, file)
}

const makeFileToDownload = <T>(resultFile: Blob, file: T) => {
  // @ts-ignore
  const blob = new Blob([resultFile], { type: file.mimeType ?? 'application/octet-stream' })

  const downloadUrl = window.URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = downloadUrl
  // @ts-ignore
  link.download = file.name ?? 'downloaded_file'

  document.body.appendChild(link)
  link.click()

  window.URL.revokeObjectURL(downloadUrl)
  document.body.removeChild(link)
}
