import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Popup from '~/components/common/ui/Popup'
import { defaultSteps } from '~/components/contents/monitoring/Management/defaultData'
import CreateNewsAlertsCancelPopup from '~/components/contents/monitoring/Management/Popup/CreateNewsAlertsCancelPopup'
import CreateNewsAlertsReceiveStep from '~/components/contents/monitoring/Management/Popup/CreateNewsAlertsReceiveStep'
import CreateNewsAlertsSettingStep from '~/components/contents/monitoring/Management/Popup/CreateNewsAlertsSettingStep'
import CreateNewsAlertsSuspendPopup from '~/components/contents/monitoring/Management/Popup/CreateNewsAlertsSuspendPopup'
import {
  receivePageDataType,
  setNewsAlertsCancelPopupAction,
  setNewsAlertsPopupAction,
  setNewsAlertsSuspendPopupAction,
} from '~/stores/modules/contents/newsAlert/newsAlert'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useMonitoringManagement } from '~/utils/hooks/contents/monitoring/useManagement'
import { useNewsAlerts } from '~/utils/hooks/contents/setting/useNewsAlerts'
import { useNewsAlertsList } from '~/utils/hooks/contents/setting/useNewsAlertsList'

const CreateNewsAlertsPopup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { newsAlertsPopup, newsAlertsStep, isEdit } = useAppSelector(state => state.newsAlertSlice)
  const { managementListParams } = useAppSelector(state => state.monitoringManagementSlice)

  const {
    currentNewsAlert,
    currentNewsSrchId,
    newsAlertsSettingData,
    newsAlertsReceiveData,
    settingStepValidate,
    receiveStepValidate,
    createNewsAlertsIdAndOut,
    editNewsAlertsIdAndOut,
    createNewsAlertsSchedulesIdAndOut,
    editNewsAlertsSchedulesIdAndOut,
    fromSettingToReceive,
    getNewsAlertSchedulesData,
    settingPageDataTitleOnChange,
    settingPageDataContentOnChange,
    settingPageDataSortOptionOnChange,
    receivePageDataEmailReceiveDaysOnChange,
    receivePageDataEmailReceiveTimeOnChange,
    receivePageDataHasExpireAtOnChange,
    receivePageDataExpireAtOnChange,
    addSchedule,
    removeSchedule,
    stepChangeAction,
    dataRefetch,
    init,
  } = useNewsAlerts()
  const { listRefetch } = useNewsAlertsList()
  const { getMonitoringTypeList } = useMonitoringManagement()

  const settingActionAndNext = async () => {
    setIsLoading(() => true)
    if (currentNewsAlert.alertId && currentNewsAlert.alertId > 0) {
      const check = await settingStepValidate(newsAlertsSettingData)
      if (check) {
        const res = await editNewsAlertsIdAndOut(newsAlertsSettingData)
        if (res === 'S') await fromSettingToReceive(currentNewsAlert.alertId)
      }
    } else {
      const check = await settingStepValidate(newsAlertsSettingData)
      if (check) {
        const res = await createNewsAlertsIdAndOut(newsAlertsSettingData)
        if (res === 'S') {
          dataRefetch()
          getMonitoringTypeList(managementListParams)
          await fromSettingToReceive(currentNewsSrchId)
        }
      } else {
        openToast('필수값을 입력해주세요', 'error')
      }
    }
    setIsLoading(() => false)
  }

  const settingActionAndOut = async () => {
    if (currentNewsAlert.alertId && currentNewsAlert.alertId > 0) {
      const check = await settingStepValidate(newsAlertsSettingData)
      if (check) {
        const res = await editNewsAlertsIdAndOut(newsAlertsSettingData)
        if (res === 'S') {
          dispatch(setNewsAlertsSuspendPopupAction({ isOpen: false }))
          dispatch(setNewsAlertsPopupAction({ isOpen: false }))
          listRefetch()
        }
      }
    } else {
      const check = await settingStepValidate(newsAlertsSettingData)
      if (check) {
        const res = await createNewsAlertsIdAndOut(newsAlertsSettingData)
        if (res === 'S') {
          dispatch(setNewsAlertsSuspendPopupAction({ isOpen: false }))
          dispatch(setNewsAlertsPopupAction({ isOpen: false }))
          listRefetch()
        }
      } else {
        openToast('필수값을 입력해주세요', 'error')
      }
    }
  }

  const saveNewsAlertsSchedules = async () => {
    setIsLoading(() => true)
    if (currentNewsAlert.alertId && currentNewsAlert.alertId > 0) {
      const check = await receiveStepValidate(newsAlertsReceiveData)
      if (check) {
        const newsAlertsSchedulesData = await getNewsAlertSchedulesData(currentNewsAlert.alertId)
        if (newsAlertsSchedulesData !== null) {
          const res = await editNewsAlertsSchedulesIdAndOut(newsAlertsReceiveData as receivePageDataType)
          if (res === 'S') {
            openToast('뉴스 알리미를 업데이트 했습니다.', 'success')
            dispatch(setNewsAlertsPopupAction({ isOpen: false }))
            dispatch(setNewsAlertsSuspendPopupAction({ isOpen: false }))
            listRefetch()
          }
        } else {
          const res = await createNewsAlertsSchedulesIdAndOut(newsAlertsReceiveData)
          if (res === 'S') {
            openToast('뉴스 알리미가 설정되었습니다.', 'success')
            dispatch(setNewsAlertsPopupAction({ isOpen: false }))
            dispatch(setNewsAlertsSuspendPopupAction({ isOpen: false }))
            listRefetch()
          }
        }
      } else {
        openToast('필수값을 입력해주세요', 'error')
      }
    }
    setIsLoading(() => false)
  }

  useEffect(() => {
    init()
  }, [currentNewsSrchId])

  return (
    <>
      <Popup
        isOpen={newsAlertsPopup.isOpen}
        onClose={() => {
          if (isEdit) {
            dispatch(setNewsAlertsSuspendPopupAction({ isOpen: true }))
          } else {
            dispatch(setNewsAlertsCancelPopupAction({ isOpen: true }))
          }
        }}
        hasCloseButton
        title={'알리미 설정'}
        titleChildren={
          <>
            <h2 className="popup-header__title">알리미 설정</h2>
            <div className="popup-header__steps mr-30">
              <div className="steps__group">
                <ul className="steps__list">
                  {defaultSteps.map((item, index) => (
                    <li
                      key={item.id}
                      className={cn({ 'is-active': newsAlertsStep.id === item.id })}
                    >
                      <p className="steps__text">{item.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        }
        width={800}
        // height={600}
        buttons={
          <div className="popup-footer__section">
            <ul className="footer-button__list type-left">
              {newsAlertsStep.id === 'receive' && (
                <li>
                  <Button
                    label={'이전'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'white'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronThickLeft}
                    onClick={() => stepChangeAction({ id: 'setting', title: '설정' })}
                  />
                </li>
              )}
              <li>
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'white'}
                  onClick={() => {
                    if (isEdit) {
                      dispatch(setNewsAlertsSuspendPopupAction({ isOpen: true }))
                    } else {
                      dispatch(setNewsAlertsCancelPopupAction({ isOpen: true }))
                    }
                  }}
                />
              </li>
            </ul>
            <ul className="footer-button__list type-right">
              {newsAlertsStep.id === 'receive' ? (
                <li>
                  <Button
                    label={'저장'}
                    size={'m'}
                    color={'primary'}
                    onClick={() => saveNewsAlertsSchedules()}
                  />
                </li>
              ) : (
                <li>
                  <Button
                    label={'다음'}
                    size={'m'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.chevronRight}
                    onClick={() => settingActionAndNext()}
                  />
                </li>
              )}
            </ul>
          </div>
        }
      >
        <div>
          {newsAlertsStep.id === 'setting' && (
            <CreateNewsAlertsSettingStep
              newsAlertsSettingData={newsAlertsSettingData}
              settingPageDataTitleOnChange={settingPageDataTitleOnChange}
              settingPageDataContentOnChange={settingPageDataContentOnChange}
              settingPageDataSortOptionOnChange={settingPageDataSortOptionOnChange}
            />
          )}
          {newsAlertsStep.id === 'receive' && (
            <CreateNewsAlertsReceiveStep
              newsAlertsReceiveData={newsAlertsReceiveData}
              receivePageDataEmailReceiveDaysOnChange={receivePageDataEmailReceiveDaysOnChange}
              receivePageDataEmailReceiveTimeOnChange={receivePageDataEmailReceiveTimeOnChange}
              receivePageDataHasExpireAtOnChange={receivePageDataHasExpireAtOnChange}
              receivePageDataExpireAtOnChange={receivePageDataExpireAtOnChange}
              addSchedule={addSchedule}
              removeSchedule={removeSchedule}
            />
          )}
        </div>
      </Popup>
      <CreateNewsAlertsCancelPopup />
      <CreateNewsAlertsSuspendPopup
        handleSaveSetting={settingActionAndOut}
        handleSaveReceive={saveNewsAlertsSchedules}
      />
    </>
  )
}

export default CreateNewsAlertsPopup
