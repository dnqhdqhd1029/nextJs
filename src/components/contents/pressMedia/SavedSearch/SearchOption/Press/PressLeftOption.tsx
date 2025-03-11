import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Select from '~/components/common/ui/Select'
import TagList from '~/components/common/ui/TagList'
import Tooltips from '~/components/common/ui/Tooltips'
import DropDownButton from '~/components/contents/common/dropdownButton/DropdownButton'
import FieldContent from '~/components/contents/common/forms/FieldSearchForm/FieldSearch'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import OccupationSearch from '~/components/contents/common/forms/OccupationSearchForm/OccupationSearch'
import PressSearch from '~/components/contents/common/forms/PressForm/PressSearch'
import PublishingSearch from '~/components/contents/common/forms/PublishingSearchForm/PublishingSearch'
import type { SelectListOptionItem } from '~/types/common'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressLeftOption = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    searchDropBoxActivate,
    pressSearchOptionParams,
    generalProduct,
    mediaFieldPopupList,
    listDefine,
    pressDto,
    savedJournalKey,
    searchActivate,
    isOwner,
    filterPubCycle,
    journalistOccupationList,
    isFilterSubParam,
    filterInformation,
    filterMediaType,
    mediaLocationPopupList,
    setPressTagControl,
    setPressJournalistTagList,
    setPressMediaTagList,
    setPressTagDeleteControl,
    setPressInformationType,
    setNewsKeywordValueAction,
    setPressKeywordField,
    setResetSearchOption,
    setOpenSearchRegisterPopup,
    setPressPublishingPeriod,
    setPressOccupation,
    setBasicLocationPopupAction,
    setMediaTypePopupAction,
    setBasicFieldPopupAction,
    setPressPositionValueAction,
    setPressDepartmentAction,
    setPressKeywordAction,
    pressRegisterEditAction,
    changeSearchOption,
  } = useSavedSearch()

  return (
    <div
      className="flexible__group"
      style={{ display: listDefine === 'press' ? 'block' : 'none' }}
    >
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
                        mediaListValueList={pressSearchOptionParams.keywordParam.journalistTagList}
                        onChangeTagList={e => setPressJournalistTagList(e, pressSearchOptionParams.keywordParam)}
                      />
                    </div>
                    <TagList
                      tagItems={pressSearchOptionParams.keywordParam.journalistTagList}
                      onTagItemClose={e =>
                        setPressTagControl(e, pressSearchOptionParams.keywordParam, 'journalistTagList')
                      }
                      onAllTagItemClose={() =>
                        setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'journalistTagList')
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
                        setNewsKeywordValueAction(e.target.value, pressSearchOptionParams.keywordParam)
                      }
                      value={pressSearchOptionParams.keywordParam.newsKeywordValue}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'분야'} />
                    <FieldContent
                      keywordParam={pressSearchOptionParams.keywordParam.field}
                      setKeywordField={e => setPressKeywordField(e, pressSearchOptionParams.keywordParam)}
                      setOpenKeywordFieldPopup={() =>
                        setBasicFieldPopupAction(mediaFieldPopupList, true, pressSearchOptionParams.keywordParam)
                      }
                    />
                    <TagList
                      tagItems={pressSearchOptionParams.keywordParam.field}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOptionParams.keywordParam, 'field')}
                      onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'field')}
                    />
                  </div>
                </li>
                <li>
                  <div className="button-select-style__section">
                    <div className="button-select-style__group">
                      <FormTitle title={'지역'} />
                      <button
                        className="button-select-style__button"
                        onClick={() =>
                          setBasicLocationPopupAction(mediaLocationPopupList, true, pressSearchOptionParams)
                        }
                      >
                        <span className="button-select-style__button-txt">선택</span>
                        <span className="button-select-style__button-ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <TagList
                        tagItems={pressSearchOptionParams.keywordParam.area}
                        onTagItemClose={e => setPressTagControl(e, pressSearchOptionParams.keywordParam, 'area')}
                        onAllTagItemClose={() => setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'area')}
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
                      mediaListValueList={pressSearchOptionParams.keywordParam.mediaTagList}
                      onChangeTagList={e => setPressMediaTagList(e, pressSearchOptionParams.keywordParam)}
                    />
                    <TagList
                      tagItems={pressSearchOptionParams.keywordParam.mediaTagList}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOptionParams.keywordParam, 'mediaTagList')}
                      onAllTagItemClose={() =>
                        setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'mediaTagList')
                      }
                    />
                  </div>
                </li>
                <li>
                  <div className="button-select-style__section">
                    <div className="button-select-style__group">
                      <FormTitle title={'매체 유형'} />
                      <button
                        className="button-select-style__button"
                        onClick={() =>
                          setMediaTypePopupAction(filterMediaType, true, pressSearchOptionParams.keywordParam.mediaType)
                        }
                      >
                        <span className="button-select-style__button-txt">선택</span>
                        <span className="button-select-style__button-ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <TagList
                        tagItems={pressSearchOptionParams.keywordParam.mediaType}
                        onTagItemClose={e => setPressTagControl(e, pressSearchOptionParams.keywordParam, 'mediaType')}
                        onAllTagItemClose={() =>
                          setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'mediaType')
                        }
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-btn">
                    <FormTitle title={'직종'} />
                    <OccupationSearch
                      originList={journalistOccupationList}
                      keywordParam={pressSearchOptionParams.keywordParam.occupation}
                      setKeywordOccupation={e => setPressOccupation(e, pressSearchOptionParams.keywordParam)}
                    />
                    <TagList
                      tagItems={pressSearchOptionParams.keywordParam.occupation}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOptionParams.keywordParam, 'occupation')}
                      onAllTagItemClose={() =>
                        setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'occupation')
                      }
                    />
                  </div>
                </li>
                <li>
                  <div className="ipt-text__section">
                    <FormInputText
                      title={'직책'}
                      onAdd={e => setPressPositionValueAction(e, pressSearchOptionParams.keywordParam)}
                      value={pressSearchOptionParams.keywordParam.positionValue}
                      addBtn={
                        !(
                          pressSearchOptionParams.keywordParam.position &&
                          pressSearchOptionParams.keywordParam.position.length > 2
                        )
                      }
                    />
                    <TagList
                      tagItems={pressSearchOptionParams.keywordParam.position}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOptionParams.keywordParam, 'position')}
                      onAllTagItemClose={() =>
                        setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'position')
                      }
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormInputText
                      title={'키워드'}
                      onAdd={e => setPressKeywordAction(e, pressSearchOptionParams.keywordParam)}
                      value={pressSearchOptionParams.keywordParam.keywordValue}
                      addBtn={
                        !(
                          pressSearchOptionParams.keywordParam.keyword &&
                          pressSearchOptionParams.keywordParam.keyword.length > 2
                        )
                      }
                    />
                    <TagList
                      tagItems={pressSearchOptionParams.keywordParam.keyword}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOptionParams.keywordParam, 'keyword')}
                      onAllTagItemClose={() =>
                        setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'keyword')
                      }
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormInputText
                      title={'부서'}
                      onAdd={e => setPressDepartmentAction(e, pressSearchOptionParams.keywordParam)}
                      value={pressSearchOptionParams.keywordParam.departmentValue}
                      addBtn={
                        !(
                          pressSearchOptionParams.keywordParam.department &&
                          pressSearchOptionParams.keywordParam.department.length > 2
                        )
                      }
                    />
                    <TagList
                      tagItems={pressSearchOptionParams.keywordParam.department}
                      onTagItemClose={e => setPressTagControl(e, pressSearchOptionParams.keywordParam, 'department')}
                      onAllTagItemClose={() =>
                        setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'department')
                      }
                    />
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
                      listDirection={'up'}
                      options={filterInformation}
                      onChange={(option: SelectListOptionItem) =>
                        setPressInformationType(option, pressSearchOptionParams.keywordParam)
                      }
                      value={pressSearchOptionParams.keywordParam.informationType}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-btn">
                    <FormTitle title={'발행 주기'} />
                    <PublishingSearch
                      idKey={`pressSearchOptionParams.keywordParam.publishingPeriod-${uuid()}`}
                      direction={'up'}
                      originList={filterPubCycle}
                      keywordParam={pressSearchOptionParams.keywordParam.publishingPeriod}
                      setKeywordPublishing={e => setPressPublishingPeriod(e, pressSearchOptionParams.keywordParam)}
                    />
                    <TagList
                      tagItems={pressSearchOptionParams.keywordParam.publishingPeriod}
                      onTagItemClose={e =>
                        setPressTagControl(e, pressSearchOptionParams.keywordParam, 'publishingPeriod')
                      }
                      onAllTagItemClose={() =>
                        setPressTagDeleteControl(pressSearchOptionParams.keywordParam, 'publishingPeriod')
                      }
                    />
                  </div>
                </li>
              </ul>
            </li>
            <li className="sp-pt-4">
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
                    onClick={() =>
                      changeSearchOption(pressSearchOptionParams, pressDto, savedJournalKey, isOwner, isFilterSubParam)
                    }
                  />
                </div>
                <div className="flexible-search__button-save">
                  {!searchDropBoxActivate ? (
                    <DropDownButton
                      mainText={'검색 조건 저장'}
                      mainButtonDisabled={!searchActivate}
                      classNameTopLayerRef={
                        'select__section select-type1-medium select-type1-tertiary select-align-right'
                      }
                      buttonLayerListAction={() =>
                        pressRegisterEditAction(
                          pressDto,
                          savedJournalKey,
                          pressSearchOptionParams,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  ) : (
                    <DropDownButton
                      mainText={'검색 조건 저장'}
                      direction={'up'}
                      classNameTopLayerRef={
                        'select__section select-type1-medium select-type1-tertiary select-align-right'
                      }
                      icoSvgData={'chevronDown'}
                      topLayerList={[
                        { id: 'edit', name: '검색 조건 수정' },
                        { id: 'new', name: '새 맞춤 검색 만들기' },
                      ]}
                      mainButtonDisabled={!searchActivate}
                      topLayerListAction={e =>
                        e.id === 'edit'
                          ? pressRegisterEditAction(
                              pressDto,
                              savedJournalKey,
                              pressSearchOptionParams,
                              isOwner,
                              isFilterSubParam
                            )
                          : setOpenSearchRegisterPopup('press')
                      }
                    />
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
})

export default PressLeftOption
