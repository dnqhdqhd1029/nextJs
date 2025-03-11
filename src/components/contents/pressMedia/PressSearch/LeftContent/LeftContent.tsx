import { forwardRef } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import Select from '~/components/common/ui/Select'
import TagList from '~/components/common/ui/TagList'
import Tooltips from '~/components/common/ui/Tooltips'
import FieldContent from '~/components/contents/common/forms/FieldSearchForm/FieldSearch'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import OccupationSearch from '~/components/contents/common/forms/OccupationSearchForm/OccupationSearch'
import PressSearch from '~/components/contents/common/forms/PressForm/PressSearch'
import PublishingSearch from '~/components/contents/common/forms/PublishingSearchForm/PublishingSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import type { SelectListOptionItem } from '~/types/common'
import { usePressSearchOptions } from '~/utils/hooks/contents/pressMedia/usePressSearch'

const LeftContent = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    pubCycleList,
    mediaValueList,
    journalistOccupationList,
    locationList,
    industryList,
    mediaTypeList,
    generalProduct,
    searchActivate,
    pressSearchOption,
    setResetSearchOption,
    setSearchRegisterPopup,
    setPressTagDeleteControl,
    setPressTagControl,
    setPressJournalistTagList,
    setFieldKeywordValueAction,
    setNewsKeywordValueAction,
    setPressMediaTagList,
    setOccupationKeywordValueAction,
    setPublishingKeywordValueAction,
    setPressInformationType,
    setBasicLocationPopupAction,
    setBasicFieldPopupAction,
    setMediaTypePopupAction,
    movePressSearchResult,
    setPressDepartmentAction,
    setPressKeywordAction,
    setPressPositionValueAction,
  } = usePressSearchOptions()

  return (
    <div className="flexible__group">
      <div className="flexible-item__group">
        <div className="flexible-item__contents">
          <ul className="interval-mt16">
            <li>
              <ul className="grid-col2">
                <li>
                  <div className="select-form__section select-form-input">
                    <div className="select-form__group">
                      <FormTitle title={'이름'} />
                      <PressSearch
                        highlightedString={true}
                        checkDataLimit={3}
                        mediaListValueList={pressSearchOption.keywordParam.journalistTagList}
                        onChangeTagList={e => setPressJournalistTagList(e, pressSearchOption.keywordParam)}
                      />
                    </div>
                    <TagList
                      tagItems={pressSearchOption.keywordParam.journalistTagList}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'journalistTagList')}
                      onAllTagItemClose={() =>
                        setPressTagDeleteControl(pressSearchOption.keywordParam, 'journalistTagList')
                      }
                    />
                  </div>
                </li>
                <li>
                  <div className="ipt-text__section">
                    <FormTitle
                      title={'뉴스로 검색'}
                      tooltip={true}
                    >
                      <Tooltips
                        tooltipId={'tt10-5'}
                        tooltipPlace={'bottom'}
                        tooltipHtml={
                          '최근 3개월 이내 뉴스에서 특정 키워드를 언급한 언론인을 검색합니다. 예를 들어 ‘미디어비’를 키워드로 검색하면 해당 기간 동안 기사에서 ‘미디어비’를 언급한 기자를 모두 찾을 수 있습니다. 키워드 입력 시 AND, OR, NOT 등의 불리언 연산자를 사용할 수 있으며, 여러 단어로 된 문장은 따옴표 ("")로 묶어 검색할 수 있습니다.'
                        }
                        tooltipComponent={<IcoTooltip />}
                      />
                    </FormTitle>
                    <FormInputText
                      disabled={generalProduct.productCode === 'ST'}
                      onChange={e =>
                        generalProduct.productCode !== 'ST' &&
                        setNewsKeywordValueAction(e.target.value, pressSearchOption.keywordParam)
                      }
                      value={pressSearchOption.keywordParam.newsKeywordValue}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'분야'} />
                    <FieldContent
                      keywordParam={pressSearchOption.keywordParam.field}
                      setKeywordField={e => setFieldKeywordValueAction(e, pressSearchOption.keywordParam)}
                      setOpenKeywordFieldPopup={() =>
                        setBasicFieldPopupAction(industryList, true, pressSearchOption.keywordParam)
                      }
                    />
                    <TagList
                      tagItems={pressSearchOption.keywordParam.field}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'field')}
                      onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOption.keywordParam, 'field')}
                    />
                  </div>
                </li>
                <li>
                  <div className="button-select-style__section">
                    <div className="button-select-style__group">
                      <FormTitle title={'지역'} />
                      <button
                        className="button-select-style__button"
                        onClick={() => setBasicLocationPopupAction(locationList, true, pressSearchOption.keywordParam)}
                      >
                        <span className="button-select-style__button-txt">선택</span>
                        <span className="button-select-style__button-ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <TagList
                        tagItems={pressSearchOption.keywordParam.area}
                        onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'area')}
                        onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOption.keywordParam, 'area')}
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'매체명'} />
                    <MediaSearch
                      highlightedString={true}
                      checkDataLimit={3}
                      mediaListValueList={pressSearchOption.keywordParam.mediaTagList}
                      onChangeTagList={e => setPressMediaTagList(e, pressSearchOption.keywordParam)}
                    />
                    <TagList
                      tagItems={pressSearchOption.keywordParam.mediaTagList}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'mediaTagList')}
                      onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOption.keywordParam, 'mediaTagList')}
                    />
                  </div>
                </li>
                {/* <li>
                  <div className="button-select-style__section">
                    <div className="button-select-style__group">
                      <FormTitle title={'매체 유형'} />
                      <div className="select-form__group">
                        <button
                          className="select-form__label"
                          onClick={() => setMediaTypePopupAction(mediaTypeList, true, pressSearchOption.keywordParam)}
                        >
                          <span className="select-form__label-text">선택</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>
                      </div>
                      <TagList
                        tagItems={pressSearchOption.keywordParam.mediaType}
                        onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'mediaType')}
                        onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOption.keywordParam, 'mediaType')}
                      />
                    </div>
                  </div>
                </li> */}
                <li>
                  <div className="button-select-style__section">
                    <div className="button-select-style__group">
                      <FormTitle title={'매체 유형'} />
                      <button
                        className="button-select-style__button"
                        onClick={() => setMediaTypePopupAction(mediaTypeList, true, pressSearchOption.keywordParam)}
                      >
                        <span className="button-select-style__button-txt">선택</span>
                        <span className="button-select-style__button-ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <TagList
                        tagItems={pressSearchOption.keywordParam.mediaType}
                        onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'mediaType')}
                        onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOption.keywordParam, 'mediaType')}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-btn">
                    <FormTitle title={'직종'} />
                    <OccupationSearch
                      originList={journalistOccupationList}
                      keywordParam={pressSearchOption.keywordParam.occupation}
                      setKeywordOccupation={e => setOccupationKeywordValueAction(e, pressSearchOption.keywordParam)}
                    />
                    <TagList
                      tagItems={pressSearchOption.keywordParam.occupation}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'occupation')}
                      onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOption.keywordParam, 'occupation')}
                    />
                  </div>
                </li>
                <li>
                  <div className="ipt-text__section">
                    <FormInputText
                      title={'직책'}
                      onAdd={e => setPressPositionValueAction(e, pressSearchOption.keywordParam)}
                      value={pressSearchOption.keywordParam.positionValue}
                      addBtn={
                        !(pressSearchOption.keywordParam.position && pressSearchOption.keywordParam.position.length > 2)
                      }
                    />
                    <TagList
                      tagItems={pressSearchOption.keywordParam.position}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'position')}
                      onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOption.keywordParam, 'position')}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormInputText
                      title={'키워드'}
                      onAdd={e => setPressKeywordAction(e, pressSearchOption.keywordParam)}
                      value={pressSearchOption.keywordParam.keywordValue}
                      addBtn={
                        !(pressSearchOption.keywordParam.keyword && pressSearchOption.keywordParam.keyword.length > 2)
                      }
                    />
                    <TagList
                      tagItems={pressSearchOption.keywordParam.keyword}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'keyword')}
                      onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOption.keywordParam, 'keyword')}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormInputText
                      title={'부서'}
                      onAdd={e => setPressDepartmentAction(e, pressSearchOption.keywordParam)}
                      value={pressSearchOption.keywordParam.departmentValue}
                      addBtn={
                        !(
                          pressSearchOption.keywordParam.department &&
                          pressSearchOption.keywordParam.department.length > 2
                        )
                      }
                    />
                    <TagList
                      tagItems={pressSearchOption.keywordParam.department}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'department')}
                      onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOption.keywordParam, 'department')}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-btn">
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
                        setPressInformationType(option, pressSearchOption.keywordParam)
                      }
                      value={pressSearchOption.keywordParam.informationType}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-btn">
                    <FormTitle title={'발행 주기'} />
                    <PublishingSearch
                      idKey={`pressSearchOption-${uuid()}`}
                      originList={pubCycleList}
                      keywordParam={pressSearchOption.keywordParam.publishingPeriod}
                      setKeywordPublishing={e => setPublishingKeywordValueAction(e, pressSearchOption.keywordParam)}
                    />
                    <TagList
                      tagItems={pressSearchOption.keywordParam.publishingPeriod}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOption.keywordParam, 'publishingPeriod')}
                      onAllTagItemClose={() =>
                        setPressTagDeleteControl(pressSearchOption.keywordParam, 'publishingPeriod')
                      }
                    />
                  </div>
                </li>
              </ul>
            </li>
            <li className="sp-pt-4">
              {/* <div className="select-form__section select-form-input"> */}
              <div className="flexible-search__button">
                <div className="flexible-search__button-reset">
                  <Button
                    label={'초기화'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    onClick={() => setResetSearchOption()}
                    disabled={!searchActivate}
                  />
                </div>
                <div className="flexible-search__button-search">
                  <Button
                    label={'검색'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                    disabled={!searchActivate}
                    onClick={() => movePressSearchResult(pressSearchOption)}
                  />
                </div>
                <div className="flexible-search__button-save">
                  <Button
                    label={'검색 조건 저장'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                    disabled={!searchActivate}
                    onClick={() => setSearchRegisterPopup(true, 'press')}
                  />
                </div>
              </div>
              {/* </div> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
})

export default LeftContent
