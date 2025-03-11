import { useDispatch } from 'react-redux'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { newsAlertsDeletePopupAction } from '~/stores/modules/contents/newsAlert/newsAlert'
import { BaseResponseCommonObject } from '~/types/api/service'
import { apiDeleteNewsAlerts } from '~/utils/api/newsAlert/useDeleteNewsAlerts'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useNewsAlertsList } from '~/utils/hooks/contents/setting/useNewsAlertsList'

const NewsAlertsDeletePopup = () => {
  const dispatch = useDispatch()
  const { listRefetch } = useNewsAlertsList()

  const { newsAlertsDeletePopup } = useAppSelector(state => state.newsAlertSlice)

  const deleteNewsAlerts = async () => {
    if (newsAlertsDeletePopup.alertId) {
      const { status, code, message } = (await apiDeleteNewsAlerts(
        newsAlertsDeletePopup.alertId
      )) as BaseResponseCommonObject
      if (status === 'S') {
        openToast(message?.message, 'success')
        dispatch(
          newsAlertsDeletePopupAction({
            isOpen: false,
            alertId: 0,
            newsSrchName: '',
          })
        )
        listRefetch()
      } else {
        openToast(message?.message, 'error')
      }
    } else {
      openToast('삭제할 정보를 확인할 수 없습니다.', 'error')
    }
  }

  return (
    <Popup
      isOpen={newsAlertsDeletePopup.isOpen}
      onClose={() => {
        dispatch(
          newsAlertsDeletePopupAction({
            isOpen: false,
            alertId: 0,
            newsSrchName: '',
          })
        )
      }}
      hasCloseButton
      title={'뉴스 알리미 삭제'}
      width={500}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'확인'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            // isLoading={isLoading}
            onClick={() => {
              deleteNewsAlerts()
            }}
          />
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            // isLoading={isLoading}
            onClick={() =>
              dispatch(
                newsAlertsDeletePopupAction({
                  isOpen: false,
                  alertId: 0,
                  newsSrchName: '',
                })
              )
            }
          />
        </div>
      }
    >
      <div>
        <p className="font-body__regular">이 모니터링의 뉴스 알리미를 삭제하겠습니까?</p>
        <p className="font-body__regular">{`삭제 대상: ${newsAlertsDeletePopup.newsSrchName}`}</p>
      </div>
    </Popup>
  )
}

export default NewsAlertsDeletePopup
