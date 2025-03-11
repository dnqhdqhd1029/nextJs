import { useDispatch } from 'react-redux'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { setNewsAlertsCancelPopupAction, setNewsAlertsPopupAction } from '~/stores/modules/contents/newsAlert/newsAlert'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

const CreateNewsAlertsCancelPopup = () => {
  const dispatch = useDispatch()
  const { newsAlertsCancelPopup } = useAppSelector(state => state.newsAlertSlice)

  return (
    <Popup
      isOpen={newsAlertsCancelPopup.isOpen}
      onClose={() => {
        dispatch(setNewsAlertsCancelPopupAction({ isOpen: false }))
      }}
      hasCloseButton
      title={'알리미 만들기 취소'}
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
              dispatch(setNewsAlertsCancelPopupAction({ isOpen: false }))
              dispatch(setNewsAlertsPopupAction({ isOpen: false }))
            }}
          />
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            // isLoading={isLoading}
            onClick={() => dispatch(setNewsAlertsCancelPopupAction({ isOpen: false }))}
          />
        </div>
      }
    >
      <div>
        <p className="font-body__regular">알리미 만들기를 취소하겠습니까?</p>
      </div>
    </Popup>
  )
}

export default CreateNewsAlertsCancelPopup
