import { ChangeEvent, forwardRef, useRef } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
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
import PeriodContent from '~/components/contents/monitoring/Search/MiddleContent/PeriodContent'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { additionalParamProps } from '~/stores/modules/contents/monitoring/newsSearch'
import type { SelectListOptionItem } from '~/types/common'
import { useMonitoringSearchOptions } from '~/utils/hooks/contents/monitoring/useMonitoringSearchOptions'

const MiddleContent = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    publishingPeriodList,
    additionalParam,
    toneList,
    mediaValueList,
    informationTypeList,
    newsMultiMediaList,
    coverageList,
    clipbookList,
    mediaTypeList,
    setAdditionalParamMediaValue,
    setAdditionalParamMediaTagList,
    setAdditionalParamJournalistTagList,
    setAdditionalParamPublishingPeriod,
    setAdditionalParamTagStatusOnChange,
    setAdditionalParamUrl,
    setAdditionalParamMediaBookList,
    setAdditionalParamClipbook,
    setAdditionalParamCoverage,
    setAdditionalParamInformationType,
    setAdditionalParamClipbookList,
    setTagControl,
    setAdditionalParamTone,
    setTagDeleteControl,
    setAdditionalParamExistMultimedia,
    setMediaTypePopupAction,
  } = useMonitoringSearchOptions()
  const getMiddleOpenRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="flexible__group"
      ref={getMiddleOpenRef}
    >
      <div className="flexible-item__group type-pb1">
        {/* <ul className="interval-mt16"> */}
        <ul>
          <li>
            <h4 className="font-heading--h5 fw400">추가 검색 조건</h4>
          </li>
          <li className="sp-mt-4">
            <div className="select-form__section select-form-btn">
              <FormTitle
                title={'기간'}
                tooltip={true}
              >
                <Tooltips
                  tooltipId={'tt10-5'}
                  tooltipPlace={'bottom'}
                  tooltipHtml={
                    '기간을 따로 선택하지 않으면 기본적으로 최근 한 달 내의 뉴스가 검색됩니다. 최대 2년치 뉴스를 검색할 수 있습니다.'
                  }
                  tooltipComponent={<IcoTooltip />}
                />
              </FormTitle>
              <PeriodContent />
              <TagList
                tagItems={additionalParam.periodTag}
                onTagItemClose={e => setTagControl(e, additionalParam, 'periodTag')}
                onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'periodTag')}
              />
            </div>
          </li>
          <li>
            <div className="button-select-style__section">
              <div className="button-select-style__group">
                <FormTitle title={'매체 유형'} />
                <button
                  className="button-select-style__button"
                  onClick={() => setMediaTypePopupAction(mediaTypeList, true, additionalParam)}
                >
                  <span className="select-form__label-text">선택</span>
                  <span className="button-select-style__button-ico">
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </span>
                </button>
                <TagList
                  tagItems={additionalParam.mediaType}
                  onTagItemClose={e => setTagControl(e, additionalParam, 'mediaType')}
                  onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'mediaType')}
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
                options={mediaValueList}
                onChange={(option: SelectListOptionItem) => setAdditionalParamMediaValue(option, additionalParam)}
                value={additionalParam.mediaValue}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'매체명'} />
              <MediaSearch
                highlightedString={true}
                checkDataLimit={3}
                mediaListValueList={additionalParam.mediaTagList}
                onChangeTagList={e => setAdditionalParamMediaTagList(e, additionalParam)}
              />
              <TagList
                tagItems={additionalParam.mediaTagList}
                onTagItemClose={e => setTagControl(e, additionalParam, 'mediaTagList')}
                onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'mediaTagList')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'저자'} />
              <PressSearch
                highlightedString={true}
                checkDataLimit={3}
                mediaListValueList={additionalParam.journalistTagList}
                onChangeTagList={e => setAdditionalParamJournalistTagList(e, additionalParam)}
              />
              <TagList
                tagItems={additionalParam.journalistTagList}
                onTagItemClose={e => setTagControl(e, additionalParam, 'journalistTagList')}
                onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'journalistTagList')}
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
                additionalParam={additionalParam.tone}
                toneList={toneList}
                onAction={(i: boolean, e: SelectListOptionItem) => setAdditionalParamTone(i, e, additionalParam)}
              />
              <TagList
                tagItems={additionalParam.tone}
                onTagItemClose={e => setTagControl(e, additionalParam, 'tone')}
                onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'tone')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'멀티미디어'} />
              <MultiMediaContentForm
                idKey={uuid()}
                additionalParam={additionalParam.existMultimedia}
                newsMultiMediaList={newsMultiMediaList}
                onAction={(i: boolean, e: SelectListOptionItem) =>
                  setAdditionalParamExistMultimedia(i, e, additionalParam)
                }
              />
              <TagList
                tagItems={additionalParam.existMultimedia}
                onTagItemClose={e => setTagControl(e, additionalParam, 'existMultimedia')}
                onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'existMultimedia')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'태그'} />
              <TagSearch
                isOpen={true}
                category={'NEWS'}
                checkDataLimit={3}
                currentRef={
                  getMiddleOpenRef && typeof getMiddleOpenRef !== 'function' ? getMiddleOpenRef.current : null
                }
                tagValueList={additionalParam.tag}
                onChangeTagList={e => setAdditionalParamTagStatusOnChange(e, additionalParam)}
              />
              <TagList
                tagItems={additionalParam.tag}
                onTagItemClose={e => setTagControl(e, additionalParam, 'tag')}
                onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'tag')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormInputText
                title={'URL'}
                onChange={e => setAdditionalParamUrl(e.target.value, additionalParam)}
                value={additionalParam.url}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'발행 주기'} />
              <PublishingSearch
                idKey={`additionalParam-${uuid()}`}
                originList={publishingPeriodList}
                keywordParam={additionalParam.publishingPeriod}
                setKeywordPublishing={e => setAdditionalParamPublishingPeriod(e, additionalParam)}
              />
              <TagList
                tagItems={additionalParam.publishingPeriod}
                onTagItemClose={e => setTagControl(e, additionalParam, 'publishingPeriod')}
                onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'publishingPeriod')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'매체 리스트'} />
              <MediaBookSearch
                isJustCount={true}
                mediaListValueList={additionalParam.mediaBookList}
                onChangeTagList={e => setAdditionalParamMediaBookList(e, additionalParam)}
              />
              <TagList
                tagItems={additionalParam.mediaBookList}
                onTagItemClose={e => setTagControl(e, additionalParam, 'mediaBookList')}
                onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'mediaBookList')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'클립북'} />
              <Select
                options={clipbookList}
                onChange={(option: SelectListOptionItem) => setAdditionalParamClipbook(option, additionalParam)}
                value={additionalParam.clipbook}
              />
            </div>
          </li>
          {additionalParam.clipbook.id === 'Y' && (
            <li>
              <div className="select-form__section select-form-input">
                <FormTitle title={'클립북 목록'} />
                <ClipbookSearch
                  currentRef={
                    getMiddleOpenRef && typeof getMiddleOpenRef !== 'function' ? getMiddleOpenRef.current : null
                  }
                  clipbookValueList={additionalParam.clipbookValue}
                  onChangeTagList={e => setAdditionalParamClipbookList(e, additionalParam)}
                />
                <TagList
                  tagItems={additionalParam.clipbookValue}
                  onTagItemClose={e => setTagControl(e, additionalParam, 'clipbookValue')}
                  onAllTagItemClose={() => setTagDeleteControl(additionalParam, 'clipbookValue')}
                />
              </div>
            </li>
          )}
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'커버리지'} />
              <Select
                options={coverageList}
                onChange={(option: SelectListOptionItem) => setAdditionalParamCoverage(option, additionalParam)}
                value={additionalParam.coverage}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn sp-pb-0">
              <FormTitle title={'정보 유형'} />
              <Select
                options={informationTypeList}
                onChange={(option: SelectListOptionItem) => setAdditionalParamInformationType(option, additionalParam)}
                value={additionalParam.informationType}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
})

export default MiddleContent
