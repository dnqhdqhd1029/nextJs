import { useDispatch } from 'react-redux'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import {
  setNewsAlertsPopupAction,
  setNewsAlertsSuspendPopupAction,
} from '~/stores/modules/contents/newsAlert/newsAlert'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

type Props = {
  handleSaveSetting: Function
  handleSaveReceive: Function
}
const CreateNewsAlertsSuspendPopup = ({ handleSaveSetting, handleSaveReceive }: Props) => {
  const dispatch = useDispatch()
  const { newsAlertsSuspendPopup, newsAlertsStep } = useAppSelector(state => state.newsAlertSlice)

  return (
    <Popup
      isOpen={newsAlertsSuspendPopup.isOpen}
      onClose={() => {
        dispatch(setNewsAlertsSuspendPopupAction({ isOpen: false }))
      }}
      hasCloseButton
      title={'알리미 설정 취소'}
      width={500}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            // isLoading={isLoading}
            onClick={() => dispatch(setNewsAlertsSuspendPopupAction({ isOpen: false }))}
          />
          <Button
            label={'저장 안 함'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            // isLoading={isLoading}
            onClick={() => {
              dispatch(setNewsAlertsSuspendPopupAction({ isOpen: false }))
              dispatch(setNewsAlertsPopupAction({ isOpen: false }))
            }}
          />
          <Button
            label={'저장'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            // isLoading={isLoading}
            onClick={() => {
              if (newsAlertsStep.id === 'setting') {
                handleSaveSetting()
              } else if (newsAlertsStep.id === 'receive') {
                handleSaveReceive()
              }
            }}
          />
        </div>
      }
    >
      <div>
        <p className="font-body__regular">수정된 내용이 있습니다. 저장하겠습니까?</p>
      </div>
    </Popup>
  )
}

export default CreateNewsAlertsSuspendPopup
