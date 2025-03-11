import { MouseEvent, useEffect, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const ExcelFileDownloadPopup = () => {
  const { fileDownloadPopup, pageCount, monitoringListParams, setSelectedExcelFileData, exportToExcel } =
    useClipbookDetail()
  const [isLoading, setIsLoading] = useState(false)

  const activityAction = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    await exportToExcel(monitoringListParams, pageCount.totalCount)
    await setSelectedExcelFileData(0, '', false)
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        isOpen={fileDownloadPopup.isOpen}
        onClose={() => setSelectedExcelFileData(0, '', false)}
        hasCloseButton
        title={'Excel 파일 다운로드'}
        width={500}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'다운로드'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={e => activityAction(e)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => setSelectedExcelFileData(0, '', false)}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            선택한 뉴스를 Excel 파일로 다운로드하겠습니까?
            <br />
            파일을 다운로드하는 데 시간이 걸릴 수 있습니다.
          </p>
        </div>
      </Popup>
    </>
  )
}

export default ExcelFileDownloadPopup
