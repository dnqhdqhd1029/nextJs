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
import MediaFieldContent from '~/components/contents/common/forms/MediaFieldSearchForm/MediaFieldSearch'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import MediaGroupSearch from '~/components/contents/common/forms/MediaGroupSearch/MediaGroupSearch'
import PublishingSearch from '~/components/contents/common/forms/PublishingSearchForm/PublishingSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import type { SelectListOptionItem } from '~/types/common'
import { useMediaSearchOptions } from '~/utils/hooks/contents/pressMedia/useMediaSearchOptions'

const LeftContent = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    pubCycleList,
    mediaValueList,
    locationList,
    industryList,
    mediaTypeList,
    searchActivate,
    mediaSearchOption,
    setResetSearchOption,
    setSearchRegisterPopup,
    setMediaAdditionMediaTagList,
    setMediaTagList,
    setMediaInformationType,
    setPublishingKeywordValueAction,
    setMediaTagControl,
    setMediaTagDeleteControl,
    setMediaFieldKeywordValueAction,
    setMediaLocationPopupAction,
    setMediaFieldPopupAction,
    setMediaTypePopupAction,
    setMediaKeywordAction,
    moveMediaSearchResult,
  } = useMediaSearchOptions()

  return (
    <div className="flexible__group">
      <div className="flexible-item__group">
        <div className="flexible-item__contents">
          <ul className="interval-mt16">
            <li>
              <ul className="grid-col2">
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'매체명'} />
                    <MediaSearch
                      highlightedString={true}
                      checkDataLimit={3}
                      mediaListValueList={mediaSearchOption.keywordParam.mediaTagList}
                      onChangeTagList={e => setMediaTagList(e, mediaSearchOption.keywordParam)}
                    />
                    <TagList
                      tagItems={mediaSearchOption.keywordParam.mediaTagList}
                      onTagItemClose={e => setMediaTagControl(e, mediaSearchOption.keywordParam, 'mediaTagList')}
                      onAllTagItemClose={() => setMediaTagDeleteControl(mediaSearchOption.keywordParam, 'mediaTagList')}
                    />
                  </div>
                </li>
                <li>
                  <div className="button-select-style__section">
                    <div className="button-select-style__group">
                      <FormTitle title={'매체 유형'} />
                      <button
                        className="button-select-style__button"
                        onClick={() => setMediaTypePopupAction(mediaTypeList, true, mediaSearchOption.keywordParam)}
                      >
                        <span className="button-select-style__button-txt">선택</span>
                        <span className="button-select-style__button-ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <TagList
                        tagItems={mediaSearchOption.keywordParam.mediaType}
                        onTagItemClose={e => setMediaTagControl(e, mediaSearchOption.keywordParam, 'mediaType')}
                        onAllTagItemClose={() => setMediaTagDeleteControl(mediaSearchOption.keywordParam, 'mediaType')}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'매체 분야'} />
                    <MediaFieldContent
                      keywordParam={mediaSearchOption.keywordParam.mediaField}
                      setKeywordField={e => setMediaFieldKeywordValueAction(e, mediaSearchOption.keywordParam)}
                      setOpenKeywordFieldPopup={() =>
                        setMediaFieldPopupAction(industryList, true, mediaSearchOption.keywordParam)
                      }
                    />
                    <TagList
                      tagItems={mediaSearchOption.keywordParam.mediaField}
                      onTagItemClose={e => setMediaTagControl(e, mediaSearchOption.keywordParam, 'mediaField')}
                      onAllTagItemClose={() => setMediaTagDeleteControl(mediaSearchOption.keywordParam, 'mediaField')}
                    />
                  </div>
                </li>
                <li>
                  <div className="button-select-style__section">
                    <div className="button-select-style__group">
                      <FormTitle title={'매체 지역'} />
                      <button
                        className="button-select-style__button"
                        onClick={() => setMediaLocationPopupAction(locationList, true, mediaSearchOption.keywordParam)}
                      >
                        <span className="button-select-style__button-txt">선택</span>
                        <span className="button-select-style__button-ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <TagList
                        tagItems={mediaSearchOption.keywordParam.mediaArea}
                        onTagItemClose={e => setMediaTagControl(e, mediaSearchOption.keywordParam, 'mediaArea')}
                        onAllTagItemClose={() => setMediaTagDeleteControl(mediaSearchOption.keywordParam, 'mediaArea')}
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormInputText
                      title={'키워드'}
                      onAdd={e => setMediaKeywordAction(e, mediaSearchOption.keywordParam)}
                      value={mediaSearchOption.keywordParam.keywordValue}
                      addBtn={
                        !(mediaSearchOption.keywordParam.keyword && mediaSearchOption.keywordParam.keyword.length > 2)
                      }
                    />
                    <TagList
                      tagItems={mediaSearchOption.keywordParam.keyword}
                      onTagItemClose={e => setMediaTagControl(e, mediaSearchOption.keywordParam, 'keyword')}
                      onAllTagItemClose={() => setMediaTagDeleteControl(mediaSearchOption.keywordParam, 'keyword')}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'매체 그룹'} />
                    <MediaGroupSearch
                      highlightedString={true}
                      checkDataLimit={3}
                      mediaListValueList={mediaSearchOption.keywordParam.mediaGroupList}
                      onChangeTagList={e => setMediaAdditionMediaTagList(e, mediaSearchOption.keywordParam)}
                    />
                    <TagList
                      tagItems={mediaSearchOption.keywordParam.mediaGroupList}
                      onTagItemClose={e => setMediaTagControl(e, mediaSearchOption.keywordParam, 'mediaGroupList')}
                      onAllTagItemClose={() =>
                        setMediaTagDeleteControl(mediaSearchOption.keywordParam, 'mediaGroupList')
                      }
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
                        setMediaInformationType(option, mediaSearchOption.keywordParam)
                      }
                      value={mediaSearchOption.keywordParam.informationType}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-btn">
                    <FormTitle title={'발행 주기'} />
                    <PublishingSearch
                      idKey={`mediaSearchOption-${uuid()}`}
                      originList={pubCycleList}
                      keywordParam={mediaSearchOption.keywordParam.publishingPeriod}
                      setKeywordPublishing={e => setPublishingKeywordValueAction(e, mediaSearchOption.keywordParam)}
                    />
                    <TagList
                      tagItems={mediaSearchOption.keywordParam.publishingPeriod}
                      onTagItemClose={e => setMediaTagControl(e, mediaSearchOption.keywordParam, 'publishingPeriod')}
                      onAllTagItemClose={() =>
                        setMediaTagDeleteControl(mediaSearchOption.keywordParam, 'publishingPeriod')
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
                    onClick={() => moveMediaSearchResult(mediaSearchOption)}
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
