import { ChangeEvent, forwardRef, useEffect, useLayoutEffect, useRef } from 'react'
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
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import type { SelectListOptionItem } from '~/types/common'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const RightOption = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    publishingPeriodList,
    editPageOpen,
    monitoringSearchOptionParams,
    mediaValueList,
    informationTypeList,
    coverageList,
    clipbookList,
    mediaTypeList,
    newsMultiMediaList,
    toneList,
    setAdditionalParamMediaValue,
    setAdditionalParamMediaTagList,
    setAdditionalParamJournalistTagList,
    setMonitoringParamsPublishingPeriod,
    setAdditionalParamTagStatusOnChange,
    setAdditionalParamUrl,
    setAdditionalParamMediaBookList,
    setAdditionalParamClipbook,
    setAdditionalParamCoverage,
    setAdditionalParamInformationType,
    setAdditionalParamClipbookList,
    setMonitoringParamsTone,
    setTagControl,
    setMonitoringParamsExistMultimedia,
    setTagDeleteControl,
    setMediaTypePopupAction,
  } = useMonitoringSearch()
  const getMiddleOpenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('RightOption monitoringSearchOptionParams', monitoringSearchOptionParams)
  }, [monitoringSearchOptionParams])
  return (
    <div
      className="flexible__group"
      ref={getMiddleOpenRef}
    >
      <div className="flexible-item__group type-pb1">
        {/* <ul className="interval-mt16"> */}
        <ul>
          <li>
            <h4 className="font-heading--h5">추가 검색 조건</h4>
          </li>
          <li className="sp-mt-4">
            <div className="button-select-style__section">
              <div className="button-select-style__group">
                <FormTitle title={'매체 유형'} />
                <button
                  className="button-select-style__button"
                  onClick={() =>
                    mediaTypeList &&
                    mediaTypeList.length > 0 &&
                    setMediaTypePopupAction(mediaTypeList, true, monitoringSearchOptionParams)
                  }
                >
                  <span className="select-form__label-text">선택</span>
                  <span className="button-select-style__button-ico">
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </span>
                </button>
                <TagList
                  tagItems={monitoringSearchOptionParams.mediaType}
                  onTagItemClose={e => setTagControl(e, monitoringSearchOptionParams, 'mediaType')}
                  onAllTagItemClose={() => setTagDeleteControl(monitoringSearchOptionParams, 'mediaType')}
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
                onChange={(option: SelectListOptionItem) =>
                  setAdditionalParamMediaValue(option, monitoringSearchOptionParams)
                }
                value={monitoringSearchOptionParams.mediaValue}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'매체명'} />
              <MediaSearch
                highlightedString={true}
                checkDataLimit={3}
                mediaListValueList={monitoringSearchOptionParams.mediaTagList}
                onChangeTagList={e => setAdditionalParamMediaTagList(e, monitoringSearchOptionParams)}
              />
              <TagList
                tagItems={monitoringSearchOptionParams.mediaTagList}
                onTagItemClose={e => setTagControl(e, monitoringSearchOptionParams, 'mediaTagList')}
                onAllTagItemClose={() => setTagDeleteControl(monitoringSearchOptionParams, 'mediaTagList')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'저자'} />
              <PressSearch
                highlightedString={true}
                checkDataLimit={3}
                mediaListValueList={monitoringSearchOptionParams.journalistTagList}
                onChangeTagList={e => setAdditionalParamJournalistTagList(e, monitoringSearchOptionParams)}
              />
              <TagList
                tagItems={monitoringSearchOptionParams.journalistTagList}
                onTagItemClose={e => setTagControl(e, monitoringSearchOptionParams, 'journalistTagList')}
                onAllTagItemClose={() => setTagDeleteControl(monitoringSearchOptionParams, 'journalistTagList')}
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
                additionalParam={monitoringSearchOptionParams.tone}
                toneList={toneList}
                onAction={(i: boolean, e: SelectListOptionItem) =>
                  setMonitoringParamsTone(i, e, monitoringSearchOptionParams)
                }
              />
              <TagList
                tagItems={monitoringSearchOptionParams.tone}
                onTagItemClose={e => setTagControl(e, monitoringSearchOptionParams, 'tone')}
                onAllTagItemClose={() => setTagDeleteControl(monitoringSearchOptionParams, 'tone')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'멀티미디어'} />
              <MultiMediaContentForm
                idKey={uuid()}
                additionalParam={monitoringSearchOptionParams.existMultimedia}
                newsMultiMediaList={newsMultiMediaList}
                onAction={(i: boolean, e: SelectListOptionItem) =>
                  setMonitoringParamsExistMultimedia(i, e, monitoringSearchOptionParams)
                }
              />
              <TagList
                tagItems={monitoringSearchOptionParams.existMultimedia}
                onTagItemClose={e => setTagControl(e, monitoringSearchOptionParams, 'existMultimedia')}
                onAllTagItemClose={() => setTagDeleteControl(monitoringSearchOptionParams, 'existMultimedia')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'태그'} />
              <TagSearch
                isOpen={editPageOpen}
                category={'NEWS'}
                checkDataLimit={3}
                currentRef={
                  getMiddleOpenRef && typeof getMiddleOpenRef !== 'function' ? getMiddleOpenRef.current : null
                }
                tagValueList={monitoringSearchOptionParams.tag}
                onChangeTagList={e => setAdditionalParamTagStatusOnChange(e, monitoringSearchOptionParams)}
              />
              <TagList
                tagItems={monitoringSearchOptionParams.tag}
                onTagItemClose={e => setTagControl(e, monitoringSearchOptionParams, 'tag')}
                onAllTagItemClose={() => setTagDeleteControl(monitoringSearchOptionParams, 'tag')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormInputText
                title={'URL'}
                onChange={e => setAdditionalParamUrl(e.target.value, monitoringSearchOptionParams)}
                value={monitoringSearchOptionParams.url}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'발행 주기'} />
              <PublishingSearch
                idKey={`monitoringSearchOptionParams-${uuid()}`}
                originList={publishingPeriodList}
                keywordParam={monitoringSearchOptionParams.publishingPeriod}
                setKeywordPublishing={e => setMonitoringParamsPublishingPeriod(e, monitoringSearchOptionParams)}
              />
              <TagList
                tagItems={monitoringSearchOptionParams.publishingPeriod}
                onTagItemClose={e => setTagControl(e, monitoringSearchOptionParams, 'publishingPeriod')}
                onAllTagItemClose={() => setTagDeleteControl(monitoringSearchOptionParams, 'publishingPeriod')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'매체 리스트'} />
              <MediaBookSearch
                isJustCount={true}
                mediaListValueList={monitoringSearchOptionParams.mediaBookList}
                onChangeTagList={e => setAdditionalParamMediaBookList(e, monitoringSearchOptionParams)}
              />
              <TagList
                tagItems={monitoringSearchOptionParams.mediaBookList}
                onTagItemClose={e => setTagControl(e, monitoringSearchOptionParams, 'mediaBookList')}
                onAllTagItemClose={() => setTagDeleteControl(monitoringSearchOptionParams, 'mediaBookList')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'클립북'} />
              <Select
                options={clipbookList}
                onChange={(option: SelectListOptionItem) =>
                  setAdditionalParamClipbook(option, monitoringSearchOptionParams)
                }
                value={monitoringSearchOptionParams.clipbook}
              />
            </div>
          </li>
          {monitoringSearchOptionParams.clipbook.id === 'Y' && (
            <li>
              <div className="select-form__section select-form-input">
                <FormTitle title={'클립북 목록'} />
                <ClipbookSearch
                  currentRef={
                    getMiddleOpenRef && typeof getMiddleOpenRef !== 'function' ? getMiddleOpenRef.current : null
                  }
                  clipbookValueList={monitoringSearchOptionParams.clipbookValue}
                  onChangeTagList={e => setAdditionalParamClipbookList(e, monitoringSearchOptionParams)}
                />
                <TagList
                  tagItems={monitoringSearchOptionParams.clipbookValue}
                  onTagItemClose={e => setTagControl(e, monitoringSearchOptionParams, 'clipbookValue')}
                  onAllTagItemClose={() => setTagDeleteControl(monitoringSearchOptionParams, 'clipbookValue')}
                />
              </div>
            </li>
          )}
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'커버리지'} />
              <Select
                options={coverageList}
                onChange={(option: SelectListOptionItem) =>
                  setAdditionalParamCoverage(option, monitoringSearchOptionParams)
                }
                value={monitoringSearchOptionParams.coverage}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn sp-pb-0">
              <FormTitle title={'정보 유형'} />
              <Select
                options={informationTypeList}
                onChange={(option: SelectListOptionItem) =>
                  setAdditionalParamInformationType(option, monitoringSearchOptionParams)
                }
                value={monitoringSearchOptionParams.informationType}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
})

export default RightOption
