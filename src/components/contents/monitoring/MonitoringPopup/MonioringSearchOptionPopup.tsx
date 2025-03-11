import { ChangeEvent, useRef } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import TagList from '~/components/common/ui/TagList'
import Tooltips from '~/components/common/ui/Tooltips'
import ClipbookSearch from '~/components/contents/common/forms/ClipbookForm/ClipbookSearch'
import MediaBookSearch from '~/components/contents/common/forms/MediaBookSearchForm/MediaBookSearch'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import MultiMediaContentForm from '~/components/contents/common/forms/MultiMediaContentForm/MultiMediaContentForm'
import PressSearch from '~/components/contents/common/forms/PressForm/PressSearch'
import PublishingSearch from '~/components/contents/common/forms/PublishingSearchForm/PublishingSearch'
import TagSearch from '~/components/contents/common/forms/TagSearchForm/TagSearch'
import ToneContentForm from '~/components/contents/common/forms/ToneContentForm/ToneContentForm'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import type { SelectListOptionItem } from '~/types/common'
import { useMonitoringPopup } from '~/utils/hooks/contents/monitoring/useMonitoringPopup'

const MonioringSearchOptionPopup = () => {
  const {
    monitoringSearchPopup,
    setkeywordsActionAnd,
    setkeywordsActionOr,
    setkeywordsActionNot,
    setTagControl,
    setTagDeleteControl,
    setAdditionalParamMediaValue,
    setAdditionalParamMediaTagList,
    setAdditionalParamJournalistTagList,
    setAdditionalParamTagStatusOnChange,
    setAdditionalParamUrl,
    setAdditionalParamMediaBookList,
    setAdditionalParamClipbook,
    setAdditionalParamCoverage,
    setAdditionalParamInformationType,
    setAdditionalParamClipbookList,
    setInitMonitoringSearchPopup,
    setAdditionalParamPublishingPeriod,
    setResetSearchOptionControl,
    setAdditionalParamExistMultimedia,
    setAdditionalParamTone,
    setMediaTypePopupAction,
    monitoringSearchPopupAdjust,
  } = useMonitoringPopup()
  const getMiddleOpenRef = useRef<HTMLDivElement>(null)

  return (
    <Popup
      isOpen={monitoringSearchPopup.isOpen}
      title={'뉴스 맞춤 검색 설정'}
      hasCloseButton
      width={1140}
      // height={800}
      onClose={() => setInitMonitoringSearchPopup()}
      buttons={
        <div className="popup-footer__section type2">
          <ul className="buttons">
            <li className="outline">
              <Button
                label={'취소'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                onClick={() => setInitMonitoringSearchPopup()}
              />
            </li>
            <li>
              <Button
                label={'적용'}
                cate={'default-ico-text'}
                size={'m'}
                color={'primary'}
                disabled={!monitoringSearchPopup.searchActivate}
                onClick={() =>
                  monitoringSearchPopupAdjust(monitoringSearchPopup.keywords, monitoringSearchPopup.additionalParam)
                }
              />
            </li>
          </ul>
        </div>
      }
    >
      <div
        className="mb-contents-layout__section"
        ref={getMiddleOpenRef}
      >
        {/* <div className="mb-contents-layout__contents"> */}
        <div className="flexible__section type-n2 sp-p-0">
          <div className="flexible__group">
            <div className="flexible-item__group">
              <div className="flexible-item__contents">
                <ul className="interval-mt16">
                  <li>
                    <h4 className="font-heading--h5">키워드</h4>
                    <p className="font-body__small color-secondary">
                      여러 개 입력 시 쉼표나 공백으로 분리. 정확한 단어 또는 문구 검색은 &#8220; &#8221;를 사용
                    </p>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <div className="after-and">
                          <FormInputText
                            title={'모두 포함'}
                            onChange={e => setkeywordsActionAnd(e.target.value, monitoringSearchPopup.keywords)}
                            value={monitoringSearchPopup.keywords.and}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="after-or">
                          <FormInputText
                            title={'하나라도 포함'}
                            onChange={e => setkeywordsActionOr(e.target.value, monitoringSearchPopup.keywords)}
                            value={monitoringSearchPopup.keywords.or}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="after-not">
                          <FormInputText
                            title={'제외'}
                            onChange={e => setkeywordsActionNot(e.target.value, monitoringSearchPopup.keywords)}
                            value={monitoringSearchPopup.keywords.not}
                          />
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="sp-pt-4">
                    <div
                      className="flexible-search__button"
                      style={{ marginBottom: 20 }}
                    >
                      <div className="flexible-search__button-reset">
                        <Button
                          label={'초기화'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() => setResetSearchOptionControl()}
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flexible__group">
            <div className="flexible-item__group type-pb1">
              {/* <ul className="interval-mt16"> */}
              <ul>
                <li>
                  <h4 className="font-heading--h5">추가 검색 조건</h4>
                </li>
                <li>
                  <div className="flexible-item__contents">
                    <ul>
                      <li className="sp-mt-4">
                        <div className="button-select-style__section">
                          <div className="button-select-style__group">
                            <FormTitle title={'매체 유형'} />
                            <button
                              className="button-select-style__button"
                              onClick={() =>
                                setMediaTypePopupAction(
                                  monitoringSearchPopup.mediaTypeList,
                                  true,
                                  monitoringSearchPopup.additionalParam
                                )
                              }
                            >
                              <span className="select-form__label-text">선택</span>
                              <span className="button-select-style__button-ico">
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </span>
                            </button>
                            <TagList
                              tagItems={monitoringSearchPopup.additionalParam.mediaType}
                              onTagItemClose={e => setTagControl(e, monitoringSearchPopup.additionalParam, 'mediaType')}
                              onAllTagItemClose={() =>
                                setTagDeleteControl(monitoringSearchPopup.additionalParam, 'mediaType')
                              }
                            />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-btn">
                          {/* <FormTitle title={'매체 지수'} /> */}
                          <FormTitle
                            title={'매체 지수'}
                            tooltip={true}
                          >
                            <Tooltips
                              tooltipId={'tt10-6'}
                              tooltipPlace={'bottom'}
                              tooltipHtml={
                                '매체의 영향력을 나타내는 지수로, 발행 부수, 시청률, 방문자 수 등을 종합하여 산출됩니다. 지수가 높을수록 더 많은 독자에게 노출될 가능성이 큽니다.'
                              }
                              tooltipComponent={<IcoTooltip />}
                            />
                          </FormTitle>
                          <Select
                            options={monitoringSearchPopup.mediaValueList}
                            onChange={(option: SelectListOptionItem) =>
                              setAdditionalParamMediaValue(option, monitoringSearchPopup.additionalParam)
                            }
                            value={monitoringSearchPopup.additionalParam.mediaValue}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-input">
                          <FormTitle title={'매체명'} />
                          <MediaSearch
                            highlightedString={true}
                            checkDataLimit={3}
                            mediaListValueList={monitoringSearchPopup.additionalParam.mediaTagList}
                            onChangeTagList={e =>
                              setAdditionalParamMediaTagList(e, monitoringSearchPopup.additionalParam)
                            }
                          />
                          <TagList
                            tagItems={monitoringSearchPopup.additionalParam.mediaTagList}
                            onTagItemClose={e =>
                              setTagControl(e, monitoringSearchPopup.additionalParam, 'mediaTagList')
                            }
                            onAllTagItemClose={() =>
                              setTagDeleteControl(monitoringSearchPopup.additionalParam, 'mediaTagList')
                            }
                          />
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-input">
                          <FormTitle title={'저자'} />
                          <PressSearch
                            highlightedString={true}
                            checkDataLimit={3}
                            mediaListValueList={monitoringSearchPopup.additionalParam.journalistTagList}
                            onChangeTagList={e =>
                              setAdditionalParamJournalistTagList(e, monitoringSearchPopup.additionalParam)
                            }
                          />
                          <TagList
                            tagItems={monitoringSearchPopup.additionalParam.journalistTagList}
                            onTagItemClose={e =>
                              setTagControl(e, monitoringSearchPopup.additionalParam, 'journalistTagList')
                            }
                            onAllTagItemClose={() =>
                              setTagDeleteControl(monitoringSearchPopup.additionalParam, 'journalistTagList')
                            }
                          />
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-btn">
                          <FormTitle
                            title={'논조'}
                            tooltip={true}
                          >
                            <Tooltips
                              tooltipId={'tt10-5'}
                              tooltipPlace={'top'}
                              tooltipHtml={
                                '뉴스 내용을 감성 분석하여 보도의 분위기와 태도를 알려줍니다. 분석 결과는 긍정, 부정, 중립의 세 가지 범주로 제공됩니다.'
                              }
                              tooltipComponent={<IcoTooltip />}
                            />
                          </FormTitle>
                          <ToneContentForm
                            idKey={uuid()}
                            additionalParam={monitoringSearchPopup.additionalParam.tone}
                            toneList={monitoringSearchPopup.toneList}
                            onAction={(i: boolean, e: SelectListOptionItem) =>
                              setAdditionalParamTone(i, e, monitoringSearchPopup.additionalParam)
                            }
                          />
                          <TagList
                            tagItems={monitoringSearchPopup.additionalParam.tone}
                            onTagItemClose={e => setTagControl(e, monitoringSearchPopup.additionalParam, 'tone')}
                            onAllTagItemClose={() => setTagDeleteControl(monitoringSearchPopup.additionalParam, 'tone')}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-btn">
                          <FormTitle title={'멀티미디어'} />
                          <MultiMediaContentForm
                            idKey={uuid()}
                            additionalParam={monitoringSearchPopup.additionalParam.existMultimedia}
                            newsMultiMediaList={monitoringSearchPopup.newsMultiMediaList}
                            onAction={(i: boolean, e: SelectListOptionItem) =>
                              setAdditionalParamExistMultimedia(i, e, monitoringSearchPopup.additionalParam)
                            }
                          />
                          <TagList
                            tagItems={monitoringSearchPopup.additionalParam.existMultimedia}
                            onTagItemClose={e =>
                              setTagControl(e, monitoringSearchPopup.additionalParam, 'existMultimedia')
                            }
                            onAllTagItemClose={() =>
                              setTagDeleteControl(monitoringSearchPopup.additionalParam, 'existMultimedia')
                            }
                          />
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-input">
                          <div className="select-form__group">
                            <FormTitle title={'태그'} />
                            <TagSearch
                              isOpen={true}
                              category={'NEWS'}
                              checkDataLimit={3}
                              currentRef={
                                getMiddleOpenRef && typeof getMiddleOpenRef !== 'function'
                                  ? getMiddleOpenRef.current
                                  : null
                              }
                              tagValueList={monitoringSearchPopup.additionalParam.tag}
                              onChangeTagList={e =>
                                setAdditionalParamTagStatusOnChange(e, monitoringSearchPopup.additionalParam)
                              }
                            />
                            <TagList
                              tagItems={monitoringSearchPopup.additionalParam.tag}
                              onTagItemClose={e => setTagControl(e, monitoringSearchPopup.additionalParam, 'tag')}
                              onAllTagItemClose={() =>
                                setTagDeleteControl(monitoringSearchPopup.additionalParam, 'tag')
                              }
                            />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ipt-text__section">
                          <FormInputText
                            title={'URL'}
                            onChange={e => setAdditionalParamUrl(e.target.value, monitoringSearchPopup.additionalParam)}
                            value={monitoringSearchPopup.additionalParam.url}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-input">
                          <FormTitle title={'발행 주기'} />
                          <PublishingSearch
                            idKey={`monitoringSearchPopup-${uuid()}`}
                            originList={monitoringSearchPopup.publishingPeriodList}
                            keywordParam={monitoringSearchPopup.additionalParam.publishingPeriod}
                            setKeywordPublishing={e =>
                              setAdditionalParamPublishingPeriod(e, monitoringSearchPopup.additionalParam)
                            }
                          />
                          <TagList
                            tagItems={monitoringSearchPopup.additionalParam.publishingPeriod}
                            onTagItemClose={e =>
                              setTagControl(e, monitoringSearchPopup.additionalParam, 'publishingPeriod')
                            }
                            onAllTagItemClose={() =>
                              setTagDeleteControl(monitoringSearchPopup.additionalParam, 'publishingPeriod')
                            }
                          />
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-input">
                          <FormTitle title={'매체 리스트'} />
                          <MediaBookSearch
                            isJustCount={true}
                            mediaListValueList={monitoringSearchPopup.additionalParam.mediaBookList}
                            onChangeTagList={e =>
                              setAdditionalParamMediaBookList(e, monitoringSearchPopup.additionalParam)
                            }
                          />
                          <TagList
                            tagItems={monitoringSearchPopup.additionalParam.mediaBookList}
                            onTagItemClose={e =>
                              setTagControl(e, monitoringSearchPopup.additionalParam, 'mediaBookList')
                            }
                            onAllTagItemClose={() =>
                              setTagDeleteControl(monitoringSearchPopup.additionalParam, 'mediaBookList')
                            }
                          />
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-btn">
                          <FormTitle title={'클립북'} />
                          <Select
                            options={monitoringSearchPopup.clipbookList}
                            onChange={(option: SelectListOptionItem) =>
                              setAdditionalParamClipbook(option, monitoringSearchPopup.additionalParam)
                            }
                            value={monitoringSearchPopup.additionalParam.clipbook}
                          />
                        </div>
                      </li>
                      {monitoringSearchPopup.additionalParam.clipbook.id === 'Y' && (
                        <li>
                          <div className="select-form__section select-form-input">
                            <FormTitle title={'클립북 목록'} />
                            <ClipbookSearch
                              currentRef={
                                getMiddleOpenRef && typeof getMiddleOpenRef !== 'function'
                                  ? getMiddleOpenRef.current
                                  : null
                              }
                              clipbookValueList={monitoringSearchPopup.additionalParam.clipbookValue}
                              onChangeTagList={e =>
                                setAdditionalParamClipbookList(e, monitoringSearchPopup.additionalParam)
                              }
                            />
                            <TagList
                              tagItems={monitoringSearchPopup.additionalParam.clipbookValue}
                              onTagItemClose={e =>
                                setTagControl(e, monitoringSearchPopup.additionalParam, 'clipbookValue')
                              }
                              onAllTagItemClose={() =>
                                setTagDeleteControl(monitoringSearchPopup.additionalParam, 'clipbookValue')
                              }
                            />
                          </div>
                        </li>
                      )}
                      <li>
                        <div className="select-form__section select-form-btn">
                          <FormTitle title={'커버리지'} />
                          <Select
                            options={monitoringSearchPopup.coverageList}
                            onChange={(option: SelectListOptionItem) =>
                              setAdditionalParamCoverage(option, monitoringSearchPopup.additionalParam)
                            }
                            value={monitoringSearchPopup.additionalParam.coverage}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="select-form__section select-form-btn sp-pb-0">
                          <FormTitle title={'정보 유형'} />
                          <Select
                            options={monitoringSearchPopup.informationTypeList}
                            onChange={(option: SelectListOptionItem) =>
                              setAdditionalParamInformationType(option, monitoringSearchPopup.additionalParam)
                            }
                            value={monitoringSearchPopup.additionalParam.informationType}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </Popup>
  )
}

export default MonioringSearchOptionPopup
