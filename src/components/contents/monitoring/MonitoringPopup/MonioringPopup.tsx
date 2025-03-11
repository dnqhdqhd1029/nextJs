import { ChangeEvent, useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import {
  extendedShareScopeList,
  extendedShareScopeTargetList,
} from '~/components/contents/monitoring/MonitoringPopup/defaultData'
import type { SelectListOptionItem } from '~/types/common'
import { useMonitoringPopup } from '~/utils/hooks/contents/monitoring/useMonitoringPopup'

interface Props {
  returnAction?: (e: string) => void
}
const MonitoringPopup = (props: Props) => {
  const {
    monitoringPopup,
    monitoringPopupTitleOnChange,
    monitoringPopupHandleCategory,
    monitoringPopupHandleShareSetting,
    monitoringPopupHandleTarget,
    monitoringPopupHandleDefault,
    setMonitoringCheckCancelPopup,
    setMonitoringCancelPopup,
    openMonitoringSearchPopup,
    checkValidation,
    monitroingFunction,
    init,
  } = useMonitoringPopup()
  const [isLoading, setIsLoading] = useState(false)

  const create = async () => {
    setIsLoading(() => true)
    const check = await checkValidation(monitoringPopup)
    if (check) {
      await monitroingFunction(monitoringPopup)
      if (props.returnAction && monitoringPopup.isReturnAction) {
        props.returnAction('action')
      }
    }
    setIsLoading(() => false)
  }

  useEffect(() => {
    if (monitoringPopup.isOpen) {
      init()
    }
  }, [monitoringPopup.isOpen])

  return (
    <Popup
      isOpen={monitoringPopup.isOpen}
      title={'뉴스 맞춤 검색 설정'}
      hasCloseButton
      hasCloseButtonLoading={isLoading}
      width={800}
      // height={800}
      className="popup-none-scroll"
      onClose={() =>
        monitoringPopup.key > 0 ? setMonitoringCheckCancelPopup(true, monitoringPopup) : setMonitoringCancelPopup(true)
      }
      buttons={
        <div className="popup-footer__section type2">
          <ul className="buttons">
            <li className="outline">
              <Button
                label={'취소'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                disabled={isLoading}
                onClick={() =>
                  monitoringPopup.key > 0
                    ? setMonitoringCheckCancelPopup(true, monitoringPopup)
                    : setMonitoringCancelPopup(true)
                }
              />
            </li>
            <li>
              <Button
                label={monitoringPopup.confirmText}
                cate={'default-ico-text'}
                size={'m'}
                color={'primary'}
                isLoading={isLoading}
                disabled={isLoading}
                onClick={() => create()}
              />
            </li>
          </ul>
        </div>
      }
    >
      {/* <div className="popup-contents__section"> */}
      {/* <ul className="interval-mt14"> */}
      <ul>
        <li>
          <FormTitle
            title={'모니터링 이름'}
            required={true}
          />
          <FormInputText
            required={true}
            onChange={e => monitoringPopupTitleOnChange(e.target.value, monitoringPopup)}
            failed={monitoringPopup.nameErr !== ''}
            msg={monitoringPopup.nameErr}
            value={monitoringPopup.name}
          />
        </li>
        <li>
          <div className="select-form__section select-form-btn">
            <FormTitle
              title={'카테고리'}
              required={true}
            />
            <Select
              options={monitoringPopup.categoryList}
              onChange={(option: SelectListOptionItem) => monitoringPopupHandleCategory(option, monitoringPopup)}
              value={monitoringPopup.category}
              msg={monitoringPopup.categoryErr}
            />
          </div>
        </li>
        <li>
          <div className="mb-contents-pb16__group">
            <FormTitle title="검색 조건" />
            <div className="keywords__section">
              <div className="keywords__group">
                {monitoringPopup.keyword && monitoringPopup.keyword.and && monitoringPopup.keyword.and !== '' && (
                  <div className="keywords__line">
                    <p className="keywords__item type-title">모두 포함</p>
                    <p className="keywords__item">
                      <span className="keywords__tag">{monitoringPopup.keyword.and}</span>
                    </p>
                  </div>
                )}
                {monitoringPopup.keyword && monitoringPopup.keyword.or && monitoringPopup.keyword.or !== '' && (
                  <div className="keywords__line">
                    <p className="keywords__item type-title">하나라도 포함</p>
                    <p className="keywords__item">
                      <span className="keywords__tag">{monitoringPopup.keyword.or}</span>
                    </p>
                  </div>
                )}
                {monitoringPopup.keyword && monitoringPopup.keyword.not && monitoringPopup.keyword.not !== '' && (
                  <div className="keywords__line">
                    <p className="keywords__item type-title">제외</p>
                    <p className="keywords__item">
                      <span className="keywords__tag">{monitoringPopup.keyword.not}</span>
                    </p>
                  </div>
                )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.mediaType &&
                  monitoringPopup.extra.mediaType.length > 0 && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">매체 유형</p>
                      <div className="keywords__item">
                        <div className="keywords__tag">
                          {monitoringPopup &&
                            monitoringPopup.extra.mediaType.length > 0 &&
                            monitoringPopup.extra.mediaType.map(e => e.label).join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.mediaValue &&
                  monitoringPopup.extra.mediaValue.id !== '' && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">매체 지수</p>
                      <p className="keywords__item">
                        <span className="keywords__tag">{monitoringPopup.extra.mediaValue.name}</span>
                      </p>
                    </div>
                  )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.mediaTagList &&
                  monitoringPopup.extra.mediaTagList.length > 0 && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">매체명</p>
                      <div className="keywords__item">
                        <div className="keywords__tag">
                          {monitoringPopup &&
                            monitoringPopup.extra.mediaTagList.length > 0 &&
                            monitoringPopup.extra.mediaTagList.map(e => e.label).join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.journalistTagList &&
                  monitoringPopup.extra.journalistTagList.length > 0 && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">저자</p>
                      <div className="keywords__item">
                        <div className="keywords__tag">
                          {monitoringPopup &&
                            monitoringPopup.extra.journalistTagList.length > 0 &&
                            monitoringPopup.extra.journalistTagList.map(e => e.label).join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                {monitoringPopup.extra && monitoringPopup.extra.tone && monitoringPopup.extra.tone.length > 0 && (
                  <div className="keywords__line">
                    <p className="keywords__item type-title">논조</p>
                    <div className="keywords__item">
                      <div className="keywords__tag">
                        {monitoringPopup &&
                          monitoringPopup.extra.tone.length > 0 &&
                          monitoringPopup.extra.tone.map(e => e.label).join(', ')}
                      </div>
                    </div>
                  </div>
                )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.existMultimedia &&
                  monitoringPopup.extra.existMultimedia.length > 0 && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">멀티미디어</p>
                      <div className="keywords__item">
                        <div className="keywords__tag">
                          {monitoringPopup &&
                            monitoringPopup.extra.existMultimedia.length > 0 &&
                            monitoringPopup.extra.existMultimedia.map(e => e.label).join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                {monitoringPopup.extra && monitoringPopup.extra.tag && monitoringPopup.extra.tag.length > 0 && (
                  <div className="keywords__line">
                    <p className="keywords__item type-title">태그</p>
                    <div className="keywords__item">
                      <div className="keywords__tag">
                        {monitoringPopup &&
                          monitoringPopup.extra.tag.length > 0 &&
                          monitoringPopup.extra.tag.map(e => e.label).join(', ')}
                      </div>
                    </div>
                  </div>
                )}

                {monitoringPopup.extra && monitoringPopup.extra.url && monitoringPopup.extra.url !== '' && (
                  <div className="keywords__line">
                    <p className="keywords__item type-title">URL</p>
                    <p className="keywords__item">
                      <span className="keywords__tag">{monitoringPopup.extra.url}</span>
                    </p>
                  </div>
                )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.publishingPeriod &&
                  monitoringPopup.extra.publishingPeriod.length > 0 && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">발행주기</p>
                      <div className="keywords__item">
                        <div className="keywords__tag">
                          {monitoringPopup &&
                            monitoringPopup.extra.publishingPeriod.length > 0 &&
                            monitoringPopup.extra.publishingPeriod.map(e => e.label).join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.mediaBookList &&
                  monitoringPopup.extra.mediaBookList.length > 0 && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">미디어 목록</p>
                      <div className="keywords__item">
                        <div className="keywords__tag">
                          {monitoringPopup &&
                            monitoringPopup.extra.mediaBookList.length > 0 &&
                            monitoringPopup.extra.mediaBookList.map(e => e.label).join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.clipbook &&
                  monitoringPopup.extra.clipbook.id !== '' && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">클립북</p>
                      <p className="keywords__item">
                        <span className="keywords__tag">{monitoringPopup.extra.clipbook.name}</span>
                      </p>
                    </div>
                  )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.clipbookValue &&
                  monitoringPopup.extra.clipbookValue.length > 0 && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">클립북 목록</p>
                      <div className="keywords__item">
                        <div className="keywords__tag">
                          {monitoringPopup &&
                            monitoringPopup.extra.clipbookValue.length > 0 &&
                            monitoringPopup.extra.clipbookValue.map(e => e.label).join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.coverage &&
                  monitoringPopup.extra.coverage.id !== '' && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">커버리지</p>
                      <p className="keywords__item">
                        <span className="keywords__tag">{monitoringPopup.extra.coverage.name}</span>
                      </p>
                    </div>
                  )}
                {monitoringPopup.extra &&
                  monitoringPopup.extra.informationType &&
                  monitoringPopup.extra.informationType.id !== '' && (
                    <div className="keywords__line">
                      <p className="keywords__item type-title">정보 유형</p>
                      <p className="keywords__item">
                        <span className="keywords__tag">{monitoringPopup.extra.informationType.name}</span>
                      </p>
                    </div>
                  )}
              </div>
              <div className="keywords__button">
                <Button
                  label={'검색 조건 수정하기'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-link'}
                  onClick={() => openMonitoringSearchPopup(monitoringPopup.keyword, monitoringPopup.extra)}
                />
              </div>
            </div>
          </div>
        </li>
        <li>
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
                    monitoringPopupHandleShareSetting(option, monitoringPopup)
                  }
                  value={monitoringPopup.scrop}
                />
              </div>
            </li>
            <li>
              <div className="select-form__section select-form-btn">
                <FormTitle
                  title={'공유 대상'}
                  required={true}
                />
                <Select
                  options={extendedShareScopeTargetList}
                  onChange={(option: SelectListOptionItem) => monitoringPopupHandleTarget(option, monitoringPopup)}
                  value={monitoringPopup.target}
                />
              </div>
            </li>
          </ul>
        </li>
        {monitoringPopup.key < 1 && (
          <li>
            <div className="ipt-btn__section">
              <FormTitle title={'변경한 공유 설정을 목록 만들기에 기본값으로 사용하겠습니까?'} />
              <ul className="ipt-btn__list--row">
                <li>
                  <FormBasicCheckbox
                    label="기본값으로 사용"
                    name="monitoringPopup-content-add-check"
                    id="monitoringPopup-content-add-check"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      monitoringPopupHandleDefault(e.target.checked, monitoringPopup)
                    }
                    checked={monitoringPopup.isDefault}
                  />
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      {/* </div> */}
    </Popup>
  )
}

export default MonitoringPopup
