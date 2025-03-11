import { ChangeEvent, Fragment, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import DatePicker from '~/components/common/ui/DatePicker'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Select from '~/components/common/ui/Select'
import SelectTime from '~/components/common/ui/SelectTime'
import TagList from '~/components/common/ui/TagList'
import Tooltips from '~/components/common/ui/Tooltips'
import CompanySearchCreateLayer from '~/components/contents/common/layer/CompanySearchCreateLayer/CompanySearchCreateLayer'
import MbTagSearchCreateLayer from '~/components/contents/common/layer/MbTagSearchCreateLayer/MbTagSearchCreateLayer'
import MbPostCodePopup from '~/components/contents/common/popup/MbPostCodePopup'
import {
  defaultPublishComTypeList,
  defaultPublishLanguageList,
  defaultPublishTypeList,
  extendedShareScopeList,
} from '~/components/contents/distribution/NewswireRelease/defaultData'
import PolicyPopup from '~/components/contents/distribution/NewswireRelease/Popup/PolicyPopup'
import TermsPopup from '~/components/contents/distribution/NewswireRelease/Popup/TermsPopup'
import CompanyConfirmModal from '~/components/contents/distribution/NewswireRelease/SettingStep/CompanyConfirmModal'
import { publishCompanyInfoType } from '~/stores/modules/contents/newswireRelease/newswireRelease'
import type { TagDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import { StepItem } from '~/types/common'
import { type TagSearchCreateLayerItem } from '~/types/contents/Common'
import { transformTimezoneText } from '~/utils/common/date'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

interface Props {
  offRouteChangeBlocking: any
}

const SettingStep = (props: Props) => {
  const router = useRouter()
  const {
    settingPageData,
    contentPageData,
    tab,
    nwReleaseId,
    tabChangeAction,
    contentPageDataFilesOnChange,
    settingPageDataWsiteOnChange,
    settingPageDataWsiteMyOnChange,
    settingPageDataPublishComTypeOnChange,
    settingPageDataPublisherOnChange,
    settingPageDataPublishWhereOnChange,
    settingPageDataLanguageOnChange,
    settingPageDataPublishNowOnChange,
    settingPageDataPublishDateOnChange,
    settingPageDataPublishTimeOnChange,
    settingPageDataRegionOnChange,
    settingPageDataAddressNmOnChange,
    settingPageDataSubAddressNmOnChange,
    settingPageDataAlarmMobileOnChange,
    settingPageDataAlarmEmailOnChange,
    settingPageDataMsgToNwireOnChange,
    settingPageDataTermsApprovedOnChange,
    settingPageDataTermsApproved2OnChange,
    settingPageDataShareOnChange,
    settingPageDataTagCreateSuccessOnChange,
    settingPageDataTagStatusOnChange,
    settingPageDataTagCloseOnChange,
    settingPageDataResetTagListOnChange,
    settingPageDataCompanyInfoOnChange,
    editorData,
    settingStepValidate,
    lockAction,
    unLockAction,
    editNewswireReleaseIdAndOut,
    fromDataToContents,
    fromSettingToConfirm,
    timeZoneData,
    setAddressPopupAction,
    addressPopup,
    setAddressAction,
    regionList,
    setAllTermsApprovedAction,
  } = useNewswireRelease()

  const [isLoadingId, setIsLoadingId] = useState<string>('')
  const [showTermsPopup, setShowTermsPopup] = useState(false)
  const [showPolicyPopup, setShowPolicyPopup] = useState(false)
  const [allTermsApproved, setAllTermsApproved] = useState(false)
  const [isCompanyConfirmModal, setIsCompanyConfirmModal] = useState(false)
  const { mainProductName } = useAppSelector(state => state.authSlice.licenseInfo)
  const { shareCodeData, userInfo } = useAppSelector(state => state.authSlice)

  const handleChangePublishComType = (event: ChangeEvent<HTMLInputElement>, e: SelectListOptionItem) => {
    if (event.target.id === 'other') {
      setIsCompanyConfirmModal(true)
    } else {
      settingPageDataPublishComTypeOnChange(e, settingPageData)
    }
  }

  const handleCompanyConfirmModalClose = () => {
    setIsCompanyConfirmModal(false)
  }

  const handleCompanyConfirmModalAction = () => {
    setIsCompanyConfirmModal(false)
    settingPageDataPublishComTypeOnChange(
      {
        id: 'other',
        name: '다른 회사',
      },
      settingPageData
    )
  }

  const actionAndOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoadingId('out')
    const check = await settingStepValidate(settingPageData)
    const lock = await lockAction(nwReleaseId)
    if (lock !== 'S') {
      openToast('다른 회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
      return
    }
    if (check) {
      const releaseData = await fromDataToContents(nwReleaseId, editorData)
      const res = await editNewswireReleaseIdAndOut(
        releaseData ? releaseData.content : contentPageData,
        settingPageData,
        releaseData ? releaseData.content.content : editorData,
        nwReleaseId,
        tab.id
      )
      if (res === 'S') {
        const unLock = await unLockAction(nwReleaseId)
        unLock === 'S' && props.offRouteChangeBlocking(() => router.push('/activity/search'))
      }
    } else {
      openToast('필수값을 입력해주세요', 'error')
    }
    setIsLoadingId('')
  }

  const actionAndNext = async () => {
    setIsLoadingId('next')
    const check = await settingStepValidate(settingPageData)
    const lock = await lockAction(nwReleaseId)
    if (lock !== 'S') {
      openToast('다른 회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
      return
    }
    if (check) {
      const releaseData = await fromDataToContents(nwReleaseId, editorData)
      const res = await editNewswireReleaseIdAndOut(
        releaseData ? releaseData.content : contentPageData,
        settingPageData,
        releaseData ? releaseData.content.content : editorData,
        nwReleaseId,
        tab.id
      )
      if (res === 'S') {
        releaseData?.content?.filesList &&
          contentPageDataFilesOnChange(releaseData?.content?.filesList, contentPageData)
        await fromSettingToConfirm(nwReleaseId)
      }
    }
    setIsLoadingId('')
  }

  const actionAndPrev = async (type: StepItem) => {
    setIsLoadingId('prev')
    const lock = await lockAction(nwReleaseId)
    if (lock !== 'S') {
      openToast('다른 회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
      return
    }
    const releaseData = await fromDataToContents(nwReleaseId, editorData)
    const res = await editNewswireReleaseIdAndOut(
      releaseData ? releaseData.content : contentPageData,
      settingPageData,
      releaseData ? releaseData.content.content : editorData,
      nwReleaseId,
      tab.id
    )
    if (res === 'S') {
      releaseData?.content?.filesList && contentPageDataFilesOnChange(releaseData?.content?.filesList, contentPageData)
      await tabChangeAction(type)
    }
    setIsLoadingId('')
  }

  const setOtherCompanyData = (pubCom: publishCompanyInfoType) => {
    settingPageDataCompanyInfoOnChange(pubCom, settingPageData)
  }

  const handleChangeCompanyName = (e: string) => {
    settingPageDataPublisherOnChange(e, settingPageData)
  }

  useEffect(() => {
    if (settingPageData.termsApproved && settingPageData.termsApproved2) {
      setAllTermsApproved(true)
    } else {
      setAllTermsApproved(false)
    }
  }, [settingPageData.termsApproved, settingPageData.termsApproved2])

  return (
    <>
      {tab.id === 'setting' && (
        <Fragment>
          <div className="mb-contents-layout__contents">
            <div className="distribute-steps__section">
              <div className="distribute-steps__group">
                <ul>
                  <li>
                    <ul>
                      <li>
                        <div
                          className="ipt-btn__section"
                          style={{ display: 'flex' }}
                        >
                          <FormTitle title="서비스: " />
                          <Button
                            label="베이직"
                            elem="a"
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                            style={{ paddingLeft: '6px', paddingBottom: '6px' }}
                            onClick={() => window.open('https://www.newswire.co.kr/?sd=20', '_blank')}
                          />
                        </div>
                      </li>
                    </ul>
                    <ul className="grid-col2">
                      <li>
                        <div className="ipt-btn__section">
                          <FormTitle
                            title={'발표 회사'}
                            tooltip={true}
                            required={true}
                          >
                            <Tooltips
                              tooltipId={'tt1-1'}
                              tooltipPlace={'top'}
                              tooltipHtml={`내 회사가 아닌 자회사나 홍보 대행을 맡은 고객사의 보도자료를 배포하는 경우 선택하세요.`}
                              tooltipComponent={<IcoTooltip />}
                            />
                          </FormTitle>
                          <ul className="ipt-btn__list--row">
                            {defaultPublishComTypeList.map(e => (
                              <li key={'defaultPublishComTypeList' + e.id.toString()}>
                                <FormBasicRadio
                                  name={e.id}
                                  id={e.id}
                                  label={e.name}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                    handleChangePublishComType(event, e)
                                  }
                                  checked={settingPageData?.publishComType?.id === e.id}
                                />
                                {e.id === 'other' && (
                                  <span style={{ paddingLeft: 5 }}>
                                    <Tooltips
                                      tooltipId={'tt-12'}
                                      tooltipPlace={'right'}
                                      tooltipHtml={
                                        '자회사나 홍보 대행을 하는 고객<br />회사의 보도자료를 배포하는 경우<br />선택하세요.'
                                      }
                                      isCusorDefault={true}
                                      tooltipComponent={<IcoTooltip />}
                                    />
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </li>
                  {settingPageData?.publishComType?.id === 'my' ? (
                    <>
                      <ul className="grid-col2">
                        <li>
                          <FormInputText
                            title={'발표 회사명'}
                            tooltip={true}
                            value={settingPageData.publisherMy}
                            readonly={true}
                            required={true}
                          />
                        </li>
                        <li>
                          <FormInputText
                            title={'발표 회사 웹사이트'}
                            placeholder={'http://'}
                            onChange={e => settingPageDataWsiteMyOnChange(e.target.value, settingPageData)}
                            value={settingPageData.wsiteMy}
                          />
                          <FormTitle title="웹사이트 정보가 없으면 회사 확인이 어려워 배포가 지연될 수 있습니다." />
                          <div style={{ color: '#dc3545', fontSize: '1.2rem', lineHeight: '1.5' }}>
                            {settingPageData.wsiteMyErr}
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <div className="form-address__section">
                            <FormTitle
                              title="발표 회사 주소"
                              required={true}
                            />
                            <ul className="form-address__detail">
                              <li>
                                <ul className="grid-col2">
                                  <li>
                                    <FormInputText
                                      value={settingPageData?.regionMy?.name || ''}
                                      readonly={true}
                                    />
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <FormInputText
                                  value={settingPageData.addressNmMy}
                                  readonly={true}
                                />
                              </li>
                              {settingPageData?.subAddressNmMy && (
                                <li>
                                  <FormInputText
                                    value={settingPageData.subAddressNmMy}
                                    readonly={true}
                                  />
                                </li>
                              )}
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <ul className="grid-col2">
                        <li>
                          <div className="select-form__section select-form-input">
                            <div className="select-form__group">
                              <FormTitle
                                title={'발표 회사명'}
                                required={true}
                              />
                              <CompanySearchCreateLayer
                                isOpen={true}
                                position={'down'}
                                parentTagItems={[]}
                                onClickListOption={setOtherCompanyData}
                                onChangeInputValue={handleChangeCompanyName}
                                defaultValue={settingPageData.publisher}
                                errorMessage={settingPageData.publisherErr}
                              />
                            </div>
                          </div>
                        </li>
                        <li>
                          <FormInputText
                            title={'발표 회사 웹사이트'}
                            onChange={e => settingPageDataWsiteOnChange(e.target.value, settingPageData)}
                            value={settingPageData.wsite}
                            failed={settingPageData.wsiteErr !== ''}
                            msg={settingPageData.wsiteErr}
                          />
                          <div style={{ transform: 'translateY(-10px)' }}>
                            웹사이트 정보가 없으면 회사 확인이 어려워 배포가 지연될 수 있습니다
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <div className="form-address__section">
                            <FormTitle
                              title="발표 회사 주소"
                              required={true}
                            />
                            <ul className="form-address__country">
                              <li className="select">
                                <div className="select-form__section select-form-btn">
                                  <Select
                                    listDirection={'down'}
                                    options={regionList && [{ id: '', name: '선택' }, ...regionList]}
                                    value={settingPageData?.region}
                                    onChange={e => settingPageDataRegionOnChange(e, settingPageData)}
                                    failed={settingPageData.regionErr !== ''}
                                    msg={settingPageData.regionErr}
                                  />
                                </div>
                              </li>
                            </ul>
                            <ul className="form-address__detail">
                              <li className="search">
                                <FormInputText
                                  onChange={e => settingPageDataAddressNmOnChange(e.target.value, settingPageData)}
                                  failed={settingPageData.addressNmErr !== ''}
                                  msg={settingPageData.addressNmErr}
                                  value={settingPageData.addressNm}
                                />
                                {settingPageData?.region?.id === 'KOR' && (
                                  <Button
                                    label={'주소 검색'}
                                    cate={'default'}
                                    size={'m'}
                                    color={'tertiary'}
                                    onClick={() => setAddressPopupAction(true)}
                                  />
                                )}
                              </li>
                              <li>
                                <FormInputText
                                  onChange={e => settingPageDataSubAddressNmOnChange(e.target.value, settingPageData)}
                                  value={settingPageData.subAddressNm}
                                />
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </>
                  )}
                  <ul className="grid-col2">
                    <li>
                      <div className="select-form__section select-form-btn">
                        <FormTitle
                          title={'언어'}
                          required={true}
                        />
                        <Select
                          listDirection={'down'}
                          options={defaultPublishLanguageList}
                          onChange={(option: SelectListOptionItem) =>
                            settingPageDataLanguageOnChange(option, settingPageData)
                          }
                          value={settingPageData.language}
                        />
                      </div>
                    </li>
                    <li>
                      <FormInputText
                        title={'뉴스 발표지'}
                        placeholder={'예: 서울'}
                        required={true}
                        onChange={e => settingPageDataPublishWhereOnChange(e.target.value, settingPageData)}
                        value={settingPageData.publishWhere}
                        failed={settingPageData.publishWhereErr !== ''}
                        msg={settingPageData.publishWhereErr}
                      />
                    </li>
                  </ul>
                  <div className="ipt-btn__section">
                    <ul className="grid-col2 form-pb0">
                      <li>
                        <div className="ipt-btn__section">
                          <FormTitle
                            title={'발송 시간'}
                            tooltip={true}
                            required={true}
                          >
                            <Tooltips
                              tooltipId={'tt1-2'}
                              tooltipPlace={'top'}
                              tooltipHtml={`예약 시 배포 희망시간은 지금부터 2시간 이후부터 설정할 수 있습니다. 배포 하루 전에 미리 보도자료를 등록하면 더 나은 서비스를 제공해 드릴 수 있습니다.`}
                              tooltipComponent={<IcoTooltip />}
                            />
                          </FormTitle>
                          <ul className="ipt-btn__list--row">
                            {defaultPublishTypeList.map(e => (
                              <li key={'defaultPublishTypeList' + e.id.toString()}>
                                <FormBasicRadio
                                  name={e.id}
                                  id={e.id}
                                  label={e.name}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                    settingPageDataPublishNowOnChange(e, settingPageData)
                                  }
                                  checked={settingPageData.publishNow?.id === e.id}
                                />
                                {e.id === 'reserved' && (
                                  <span style={{ paddingLeft: 5 }}>
                                    <Tooltips
                                      tooltipId={'tt-12'}
                                      tooltipPlace={'right'}
                                      tooltipHtml={
                                        '예약 시 배포 희망시간은 2시간 이후부터<br />설정할 수 있지만, 배포 하루 전에 미리<br />보도자료를 등록하면 더 나은 서비스를<br />제공해 드릴 수 있습니다.'
                                      }
                                      isCusorDefault={true}
                                      tooltipComponent={<IcoSvg data={icoSvgData.infoCircle} />}
                                    />
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                      <li>
                        {settingPageData?.publishNow?.id === 'reserved' && (
                          <Fragment>
                            <FormTitle
                              title={'희망시간 선택'}
                              required={true}
                            />
                            <div className="datepicker-time__section">
                              <div className="datepicker-time__group">
                                <DatePicker
                                  forbiddenBefore={true}
                                  onCalendarChange={(date: Date) =>
                                    settingPageDataPublishDateOnChange(date, settingPageData)
                                  }
                                  selectedDate={settingPageData.publishDate}
                                  errorMsg=""
                                />
                                <SelectTime
                                  placeholder={'시간 선택'}
                                  changeWidth={'min(50%, 100px)'}
                                  value={settingPageData.publishTime}
                                  onSelect={(hour: number, minute: number) =>
                                    settingPageDataPublishTimeOnChange(hour, minute, settingPageData)
                                  }
                                />
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 150,
                                  }}
                                >
                                  {transformTimezoneText(timeZoneData.name)}
                                </div>
                              </div>
                              <div
                                style={{ color: '#dc3545', fontSize: '1.2rem', lineHeight: '1.5', paddingTop: '4px' }}
                              >
                                {settingPageData.publishTimeErr}
                              </div>
                            </div>
                          </Fragment>
                        )}
                      </li>
                    </ul>
                  </div>
                  <ul>
                    <li>
                      <div className="mb-contents-pb16__group">
                        <h6 className="font-heading--h6 pb6">게재 알림 받기</h6>

                        <p className="font-body__regular">
                          뉴스와이어에 보도자료가 게재되면 알림이 나(
                          <Button
                            elem="a"
                            url={`mailto:${userInfo?.email}`}
                            label={userInfo?.email || ''}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                          )에게 발송됩니다. <br />
                          추가로 알림을 받아야 할 사람이 있다면 이메일 주소를 입력하세요. <br />
                          휴대전화 번호를 입력하면 문자로 알림을 받을 수 있습니다.
                        </p>
                      </div>
                    </li>
                    <ul className="grid-col2">
                      <li>
                        <FormInputText
                          title={'휴대전화'}
                          extraInputType={'phone'}
                          required={true}
                          value={settingPageData.alarmMobile}
                          onChangeExtra={e => settingPageDataAlarmMobileOnChange(e, settingPageData)}
                          failed={settingPageData.alarmMobileErr !== ''}
                          msg={settingPageData.alarmMobileErr}
                        />
                      </li>
                      <li>
                        <FormInputText
                          title={'이메일'}
                          value={settingPageData.alarmEmail}
                          onChange={e => settingPageDataAlarmEmailOnChange(e.target.value, settingPageData)}
                          failed={settingPageData.alarmEmailErr !== ''}
                          msg={settingPageData.alarmEmailErr}
                        />
                      </li>
                    </ul>
                    <li>
                      <div className="textarea__area">
                        <FormTitle title="요청사항" />
                        <div className="textarea__group">
                          <textarea
                            placeholder="뉴스와이어 편집자에게 요청할 것이 있으면 적으세요. 생략해도 무방합니다."
                            rows={2}
                            value={settingPageData.msgToNwire}
                            onChange={e => settingPageDataMsgToNwireOnChange(e.target.value, settingPageData)}
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="ipt-btn__section">
                    <ul className="agree-checkbox__list">
                      <FormTitle
                        title="약관 동의"
                        required={true}
                      />
                      <li>
                        <FormInputBtn
                          type="checkbox"
                          name="agree-all"
                          id="agree-all"
                          label="아래의 내용에 모두 동의합니다."
                          checked={allTermsApproved}
                          onChange={e => {
                            setAllTermsApprovedAction(e.target.checked, settingPageData)
                          }}
                        />
                      </li>
                      <li>
                        <FormInputBtn
                          type="checkbox"
                          name="agree-ck1"
                          id="agree-ck1"
                          label="이용 약관에 동의"
                          checked={settingPageData.termsApproved}
                          onChange={e => settingPageDataTermsApprovedOnChange(e.target.checked, settingPageData)}
                        />
                        <Button
                          elem="a"
                          label={'뉴스와이어 이용약관'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => setShowTermsPopup(true)}
                        />
                      </li>
                      <li>
                        <FormInputBtn
                          type="checkbox"
                          name="agree-ck2"
                          id="agree-ck2"
                          label="개인정보 취급방침에 동의"
                          checked={settingPageData.termsApproved2}
                          onChange={e => settingPageDataTermsApproved2OnChange(e.target.checked, settingPageData)}
                        />
                        <Button
                          elem="a"
                          label={'뉴스와이어 개인정보 취급방침'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => setShowPolicyPopup(true)}
                        />
                      </li>
                      <div style={{ color: '#dc3545', fontSize: '1.2rem', lineHeight: '1.5' }}>
                        {settingPageData.termsApprovedErr}
                      </div>
                      <div style={{ color: '#dc3545', fontSize: '1.2rem', lineHeight: '1.5' }}>
                        {settingPageData.termsApproved2Err}
                      </div>
                    </ul>
                  </div>
                  <ul className="grid-col2">
                    <li>
                      <div className="select-form__section select-form-btn">
                        <FormTitle
                          title={'공유 설정'}
                          required={true}
                        />
                        <Select
                          options={extendedShareScopeList}
                          onChange={(option: SelectListOptionItem) =>
                            settingPageDataShareOnChange(option, settingPageData)
                          }
                          value={settingPageData.scrop || shareCodeData.distribute}
                          listDirection="up"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="select-form__section select-form-input">
                        <div className="select-form__group">
                          <FormTitle title={'태그'} />
                          <MbTagSearchCreateLayer
                            isOpen={true}
                            category={'ACTION'}
                            mode={'FLAT'}
                            position={'up'}
                            parentTagItems={settingPageData.tagList}
                            onCreateSuccess={(item: TagDto) =>
                              settingPageDataTagCreateSuccessOnChange(item, settingPageData)
                            }
                            onTagStatusChange={(e: ChangeEvent<HTMLInputElement>, item: TagSearchCreateLayerItem) =>
                              settingPageDataTagStatusOnChange(e, item, settingPageData)
                            }
                          />
                          <TagList
                            tagItems={settingPageData.tagList ?? []}
                            onTagItemClose={e => settingPageDataTagCloseOnChange(e, settingPageData)}
                            onAllTagItemClose={() => settingPageDataResetTagListOnChange(settingPageData)}
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </ul>
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
                      isLoading={isLoadingId === 'prev'}
                      disabled={isLoadingId !== ''}
                      icoLeftData={icoSvgData.chevronThickLeft}
                      onClick={() => actionAndPrev({ id: 'content', title: '내용' })}
                    />
                  </li>
                </ul>
                <ul className="footer-button__list type-right">
                  <li>
                    <Button
                      label={'저장하고 나가기'}
                      cate={'default'}
                      size={'m'}
                      color={'tertiary'}
                      isLoading={isLoadingId === 'out'}
                      disabled={isLoadingId !== ''}
                      onClick={e => actionAndOut(e)}
                    />
                  </li>
                  <li>
                    <Button
                      label={'다음'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      isLoading={isLoadingId === 'next'}
                      disabled={isLoadingId !== ''}
                      icoRightData={icoSvgData.chevronThickRight}
                      onClick={() => actionAndNext()}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {isCompanyConfirmModal && (
            <CompanyConfirmModal
              onClose={handleCompanyConfirmModalClose}
              onConfirm={handleCompanyConfirmModalAction}
            />
          )}
          <MbPostCodePopup
            isOpen={addressPopup}
            onClose={() => setAddressPopupAction(false)}
            onSelectAddress={e => setAddressAction(e, settingPageData)}
          />
          <TermsPopup
            isOpen={showTermsPopup}
            onClose={() => {
              setShowTermsPopup(false)
            }}
          />
          <PolicyPopup
            isOpen={showPolicyPopup}
            onClose={() => {
              setShowPolicyPopup(false)
            }}
          />
        </Fragment>
      )}
    </>
  )
}

export default SettingStep
