import { Fragment, useState } from 'react'
import DOMPurify from 'dompurify'
import moment from 'moment'

import Button from '~/components/common/ui/Button'
import DatePicker from '~/components/common/ui/DatePicker'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import SelectTime from '~/components/common/ui/SelectTime'
import { createReceiverInfo } from '~/components/contents/activity/common/defaultData'
import ConfirmModal from '~/components/contents/distribution/Release/Press/ConfirmStep/ConfirmModal'
import { EmailErrorMsg } from '~/components/contents/distribution/Release/Press/ConfirmStep/Warning'
import { defaultSendEmailTypeList } from '~/components/contents/distribution/Release/Press/defaultData'
import { StepItem } from '~/types/common'
import { transformTimezoneText } from '~/utils/common/date'
import { getHtmlContentFromString } from '~/utils/common/string'
import { openToast } from '~/utils/common/toast'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const ConfirmStep = () => {
  const {
    userInfo,
    isDemoLicense,
    licenseInfo,
    editorData,
    templatePageData,
    settingPageData,
    contentPageData,
    confirmPageData,
    receiversData,
    tab,
    timeZoneData,
    mailingId,
    tabChangeAction,
    previewPopupOpen,
    confirmPageDataMailStateGroupAction,
    confirmPageDataDateAction,
    confirmPageDataTimeAction,
    initTestEmailSenderPopupAction,
    editStepMailingIdAndOut,
    releaseMailingId,
    updateLicenseInfo,
    setContentPageData,
  } = usePressRelese()
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false)

  const actionAndNext = async () => {
    if (isDemoLicense) {
      openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
    } else {
      await updateLicenseInfo()
      const selectedDate = moment(moment(confirmPageData.selectedDate).format('YYYY-MM-DD'))
        .hour(confirmPageData.selectedTime.hours)
        .minutes(confirmPageData.selectedTime.minutes)

      setIsLoading(() => true)
      if (selectedDate.toDate().getTime() < moment().toDate().getTime()) {
        openToast('예약시간은 현재시간보다 늦은 시간이어야 합니다.', 'error')
      } else if ((receiversData.totalCount ?? 0) > (licenseInfo.emailLeft ?? 0)) {
        openToast(
          <EmailErrorMsg
            emailReservedCount={receiversData.totalCount ?? 0}
            emailSendCount={licenseInfo.emailLeft ?? 0}
          />,
          'error'
        )
      } else {
        setIsConfirmModal(true)
      }
      setIsLoading(() => false)
    }
  }

  const handleConfirmModalClose = () => setIsConfirmModal(false)

  const handleConfirmModalAction = async () => {
    setIsLoading(() => true)
    handleConfirmModalClose()
    const res = await editStepMailingIdAndOut(
      settingPageData,
      templatePageData,
      contentPageData,
      confirmPageData,
      editorData,
      mailingId,
      tab.id
    )
    if (res === 'S') await releaseMailingId(mailingId)
    setIsLoading(() => false)
  }

  const actionAndPrev = async (type: StepItem) => {
    setIsLoading(() => true)
    const res = await editStepMailingIdAndOut(
      settingPageData,
      templatePageData,
      contentPageData,
      confirmPageData,
      editorData,
      mailingId,
      tab.id
    )
    if (res === 'S') {
      await setContentPageData(mailingId)
      await tabChangeAction(type)
    }
    setIsLoading(() => false)
  }

  const validateTime = (hours: number, minutes: number) => {
    const year = confirmPageData.selectedDate.getFullYear()
    const month = confirmPageData.selectedDate.getMonth()
    const day = confirmPageData.selectedDate.getDate()
    const date = new Date(year, month, day, hours, minutes)
    if (date < new Date()) {
      openToast('예약 시간은 현재 시간보다 늦은 시간이어야 합니다.', 'warning')
      return false
    } else {
      return true
    }
  }

  return (
    <>
      {tab.id === 'confitm' && (
        <Fragment>
          <div className="mb-contents-layout__contents">
            <div className="distribute-steps__section">
              <div className="distribute-steps__group">
                <div className="distribute-steps__title">
                  <h3 className="font-heading--h5">발송</h3>
                  <Button
                    label={'테스트 메일 발송'}
                    cate={'default'}
                    size={'s'}
                    color={'tertiary'}
                    onClick={() =>
                      initTestEmailSenderPopupAction({
                        isOpen: true,
                        key: mailingId,
                        content: '',
                        valueErr: '',
                        value: '',
                      })
                    }
                  />
                </div>
                <ul className="grid-col2 form-pb0">
                  <li>
                    <div className="ipt-btn__section">
                      <FormTitle
                        title={'발송 시간'}
                        required={true}
                      />
                      <ul className="ipt-btn__list--row">
                        {defaultSendEmailTypeList.map(e => (
                          <li key={'defaultSendEmailTypeList' + e.id.toString()}>
                            <FormBasicRadio
                              name={e.id}
                              id={e.id}
                              label={e.title}
                              onChange={() => confirmPageDataMailStateGroupAction(e.id, confirmPageData)}
                              checked={confirmPageData.mailStateGroup === e.id}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li>
                    {confirmPageData.mailStateGroup === 'reserved' && (
                      <Fragment>
                        <FormTitle
                          title={'예약시간 선택'}
                          required={true}
                        />
                        <div className="datepicker-time__section">
                          <div className="datepicker-time__group">
                            <DatePicker
                              forbiddenBefore={true}
                              onCalendarChange={(date: Date) => confirmPageDataDateAction(date, confirmPageData)}
                              selectedDate={confirmPageData.selectedDate}
                              errorMsg={confirmPageData.dateErrorMessage}
                            />
                            <SelectTime
                              placeholder={'시간 선택'}
                              changeWidth={'min(50%, 100px)'}
                              value={confirmPageData.selectedTime}
                              onSelect={(hour: number, minute: number) =>
                                confirmPageDataTimeAction(hour, minute, confirmPageData)
                              }
                              validateFunc={validateTime}
                            />
                            <div
                              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 150 }}
                            >
                              {transformTimezoneText(timeZoneData.name)}
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </li>
                </ul>
              </div>
              <div className="distribute-steps__group">
                <div className="distribute-steps__title">
                  <h3 className="font-heading--h5">기본정보</h3>
                  <Button
                    elem="a"
                    label={'수정하기'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    onClick={() => actionAndPrev({ id: 'setting', title: '설정' })}
                  />
                </div>
                <ul>
                  <li>
                    <dl className="dl-table-type1__section">
                      <dt>
                        <p className="dl-table-type1__text">배포명</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">{settingPageData.titleForManage}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">보낸 사람</p>
                      </dt>
                      <dd>
                        <p className="dl-table-type1__text">{userInfo.name}</p>
                      </dd>
                      <dt>
                        <p className="dl-table-type1__text">받는 사람</p>
                      </dt>
                      <dd>
                        <p className="font-body__regular">
                          {`총 수신자 : ${receiversData?.totalCount}명 ${
                            [
                              receiversData?.dupCount,
                              receiversData?.blockReceiveCount,
                              receiversData?.blockSendCount,
                              receiversData?.errorSendCount,
                            ].some(v => v && v > 0)
                              ? `(${createReceiverInfo(
                                  receiversData?.dupCount || 0,
                                  receiversData?.blockReceiveCount || 0,
                                  receiversData?.blockSendCount || 0,
                                  receiversData?.errorSendCount || 0
                                )} 제외)`
                              : ''
                          }`}
                        </p>
                        {confirmPageData.jrnstListIdListTarget.length > 0 && (
                          <p className="font-body__regular">언론인 목록: {confirmPageData.jrnstListIdListTarget}</p>
                        )}
                        {confirmPageData.journalistIdListTarget.length > 0 && (
                          <p className="font-body__regular">언론인: {confirmPageData.journalistIdListTarget}</p>
                        )}
                        {confirmPageData.mediaListIdListTarget.length > 0 && (
                          <p className="font-body__regular">미디어 목록: {confirmPageData.mediaListIdListTarget}</p>
                        )}
                        {confirmPageData.mediaIdListTarget.length > 0 && (
                          <p className="font-body__regular">미디어: {confirmPageData.mediaIdListTarget}</p>
                        )}
                        {settingPageData.targetEmail && settingPageData.targetEmail.length > 0 && (
                          <p className="font-body__regular">
                            메일 추가:{' '}
                            <>
                              {settingPageData.targetEmail.map((e, index) => (
                                <Fragment key={index.toString() + e.id}>
                                  <Button
                                    elem="a"
                                    url={`mailto:${e.label}`}
                                    label={e.label}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                  &nbsp;
                                </Fragment>
                              ))}
                            </>
                          </p>
                        )}
                        {settingPageData.isSendToMe && (
                          <div className="me-send-email__group">
                            <IcoSvg data={icoSvgData.checkLg} />
                            <p className="me-send-email__text">나에게도 보내기</p>
                          </div>
                        )}
                      </dd>
                      {settingPageData.tagList && settingPageData.tagList.length > 0 && (
                        <>
                          <dt>
                            <p className="dl-table-type1__text">태그</p>
                          </dt>
                          <dd>
                            <ul className="d-link__list">
                              {settingPageData.tagList.map((e, index) => (
                                <li key={index.toString() + e.id}>
                                  <Button
                                    elem="a"
                                    label={e.label}
                                    cate={'link-text'}
                                    size={'m'}
                                    color={'body-link'}
                                  />
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </>
                      )}
                    </dl>
                  </li>
                </ul>
              </div>
              <div className="distribute-steps__group">
                <div className="distribute-steps__title">
                  <h3 className="font-heading--h5">보도자료</h3>
                  <Button
                    elem="a"
                    label={'수정하기'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    onClick={() => actionAndPrev({ id: 'content', title: '내용' })}
                  />
                </div>
                <div className="distribute-steps__news">
                  <div className="distribute-steps-news__contents">
                    <br />
                    <p
                      className="dl-table-type1__text"
                      style={{ fontWeight: 'bold', paddingBottom: 10 }}
                    >
                      {contentPageData.title}
                    </p>
                    <br />
                    <div
                      className="mail-html-css"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(editorData?.replaceAll('ruby-text', 'block'), {
                          ADD_ATTR: ['target', 'rel'],
                        }),
                      }}
                    />
                  </div>
                  <div className="import-info__contents">
                    {contentPageData?.filesList && contentPageData?.filesList.length > 0 && (
                      <>
                        <br />
                        <p style={{ fontWeight: 'bold', paddingBottom: 10 }}>첨부파일</p>
                        <ul className="d-link__list">
                          {contentPageData?.filesList.map(e => (
                            <li key={'import-info__contents-link__list_files' + e.filename + e.fileSrc}>
                              <Button
                                elem="a"
                                label={!!e?.file ? e.file.name || '' : e?.filename || ''}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  <div className="distribute-steps-news__footer">
                    <p>귀하는 {userInfo.name}으로부터 미디어비 서비스를 이용해 이 메일을 받고 있습니다.</p>
                    <p>
                      수신을 원치 않으면{' '}
                      <Button
                        elem="a"
                        url={'#!'}
                        label={'수신거부'}
                        cate={'link-text'}
                        size={'m'}
                        color={'gray-600'}
                      />
                      를 클릭하여 주시기 바랍니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-contents-layout__footer">
            <div className="distribute-steps__footer">
              <div className="footer-button__group">
                <ul className="footer-button__list">
                  <li>
                    <Button
                      label={'이전'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'tertiary'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.chevronThickLeft}
                      isLoading={isLoading}
                      disabled={isLoading}
                      onClick={() => actionAndPrev({ id: 'content', title: '내용' })}
                    />
                  </li>
                </ul>
                <ul className="footer-button__list type-right">
                  <li>
                    <Button
                      label={'미리보기'}
                      cate={'default'}
                      size={'m'}
                      color={'tertiary'}
                      disabled={isLoading}
                      onClick={() => previewPopupOpen('', settingPageData)}
                    />
                  </li>
                  <li>
                    <Button
                      label={'배포하기'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      disabled={isLoading}
                      icoRightData={icoSvgData.chevronThickRight}
                      onClick={() => actionAndNext()}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {isConfirmModal && (
            <ConfirmModal
              onClose={handleConfirmModalClose}
              onConfirm={handleConfirmModalAction}
            />
          )}
        </Fragment>
      )}
    </>
  )
}

export default ConfirmStep
