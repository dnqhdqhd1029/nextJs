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
import MediaFieldContent from '~/components/contents/common/forms/MediaFieldSearchForm/MediaFieldSearch'
import MediaSearch from '~/components/contents/common/forms/MediaForm/MediaSearch'
import MediaGroupSearch from '~/components/contents/common/forms/MediaGroupSearch/MediaGroupSearch'
import PublishingSearch from '~/components/contents/common/forms/PublishingSearchForm/PublishingSearch'
import type { SelectListOptionItem } from '~/types/common'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const MediaLeftOption = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    searchDropBoxActivate,
    listDefine,
    mediaDto,
    filterPubCycle,
    savedMediaKey,
    searchActivate,
    isOwner,
    isFilterSubParam,
    mediaSearchOptionParams,
    filterInformation,
    filterMediaType,
    mediaLocationPopupList,
    setResetSearchOption,
    setOpenSearchRegisterPopup,
    setMediaTagList,
    setMediaTagControl,
    setMediaTagDeleteControl,
    setMediaInformationType,
    setMediaAdditionMediaTagList,
    setMediaKeywordAction,
    mediaFieldPopupList,
    setMediaKeywordField,
    setMediaPublishingPeriod,
    setMediaLocationPopupAction,
    setMediaFieldPopupAction,
    setMediaTypePopupAction,
    changeMediaSearchOption,
    mediaRegisterEditAction,
  } = useSavedSearch()

  return (
    <div
      className="flexible__group"
      ref={getOpenRef}
      style={{ display: listDefine === 'media' ? 'block' : 'none' }}
    >
      <div className="flexible-item__group">
        <div className="flexible-item__contents">
          <ul className="interval-mt16">
            <li>
              <ul className="grid-col2">
                <li>
                  <div className="select-form__section select-form-input">
                    <div className="select-form__group">
                      <FormTitle title={'매체명'} />
                      <MediaSearch
                        highlightedString={true}
                        checkDataLimit={3}
                        mediaListValueList={mediaSearchOptionParams.keywordParam.mediaTagList}
                        onChangeTagList={e => setMediaTagList(e, mediaSearchOptionParams.keywordParam)}
                      />
                    </div>
                    <TagList
                      tagItems={mediaSearchOptionParams.keywordParam.mediaTagList}
                      onTagItemClose={e => setMediaTagControl(e, mediaSearchOptionParams.keywordParam, 'mediaTagList')}
                      onAllTagItemClose={() =>
                        setMediaTagDeleteControl(mediaSearchOptionParams.keywordParam, 'mediaTagList')
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
                          setMediaTypePopupAction(filterMediaType, true, mediaSearchOptionParams.keywordParam.mediaType)
                        }
                      >
                        <span className="button-select-style__button-txt">선택</span>
                        <span className="button-select-style__button-ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <TagList
                        tagItems={mediaSearchOptionParams.keywordParam.mediaType}
                        onTagItemClose={e => setMediaTagControl(e, mediaSearchOptionParams.keywordParam, 'mediaType')}
                        onAllTagItemClose={() =>
                          setMediaTagDeleteControl(mediaSearchOptionParams.keywordParam, 'mediaType')
                        }
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'매체 분야'} />
                    <MediaFieldContent
                      keywordParam={mediaSearchOptionParams.keywordParam.mediaField}
                      setKeywordField={e => setMediaKeywordField(e, mediaSearchOptionParams.keywordParam)}
                      setOpenKeywordFieldPopup={() =>
                        setMediaFieldPopupAction(
                          mediaFieldPopupList,
                          true,
                          mediaSearchOptionParams.keywordParam.mediaField
                        )
                      }
                    />
                    <TagList
                      tagItems={mediaSearchOptionParams.keywordParam.mediaField}
                      onTagItemClose={e => setMediaTagControl(e, mediaSearchOptionParams.keywordParam, 'mediaField')}
                      onAllTagItemClose={() =>
                        setMediaTagDeleteControl(mediaSearchOptionParams.keywordParam, 'mediaField')
                      }
                    />
                  </div>
                </li>
                <li>
                  <div className="button-select-style__section">
                    <div className="button-select-style__group">
                      <FormTitle title={'매체 지역'} />
                      <button
                        className="button-select-style__button"
                        onClick={() =>
                          setMediaLocationPopupAction(
                            mediaLocationPopupList,
                            true,
                            mediaSearchOptionParams.keywordParam.mediaArea
                          )
                        }
                      >
                        <span className="button-select-style__button-txt">선택</span>
                        <span className="button-select-style__button-ico">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </span>
                      </button>
                      <TagList
                        tagItems={mediaSearchOptionParams.keywordParam.mediaArea}
                        onTagItemClose={e => setMediaTagControl(e, mediaSearchOptionParams.keywordParam, 'mediaArea')}
                        onAllTagItemClose={() =>
                          setMediaTagDeleteControl(mediaSearchOptionParams.keywordParam, 'mediaArea')
                        }
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormInputText
                      title={'키워드'}
                      onAdd={e => setMediaKeywordAction(e, mediaSearchOptionParams.keywordParam)}
                      value={mediaSearchOptionParams.keywordParam.keywordValue}
                      addBtn={
                        !(
                          mediaSearchOptionParams.keywordParam.keyword &&
                          mediaSearchOptionParams.keywordParam.keyword.length > 2
                        )
                      }
                    />
                    <TagList
                      tagItems={mediaSearchOptionParams.keywordParam.keyword}
                      onTagItemClose={e => setMediaTagControl(e, mediaSearchOptionParams.keywordParam, 'keyword')}
                      onAllTagItemClose={() =>
                        setMediaTagDeleteControl(mediaSearchOptionParams.keywordParam, 'keyword')
                      }
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-input">
                    <FormTitle title={'매체 그룹'} />
                    <MediaGroupSearch
                      highlightedString={true}
                      checkDataLimit={3}
                      mediaListValueList={mediaSearchOptionParams.keywordParam.mediaGroupList}
                      onChangeTagList={e => setMediaAdditionMediaTagList(e, mediaSearchOptionParams.keywordParam)}
                    />
                    <TagList
                      tagItems={mediaSearchOptionParams.keywordParam.mediaGroupList}
                      onTagItemClose={e =>
                        setMediaTagControl(e, mediaSearchOptionParams.keywordParam, 'mediaGroupList')
                      }
                      onAllTagItemClose={() =>
                        setMediaTagDeleteControl(mediaSearchOptionParams.keywordParam, 'mediaGroupList')
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
                      options={filterInformation}
                      onChange={(option: SelectListOptionItem) =>
                        setMediaInformationType(option, mediaSearchOptionParams.keywordParam)
                      }
                      value={mediaSearchOptionParams.keywordParam.informationType}
                    />
                  </div>
                </li>
                <li>
                  <div className="select-form__section select-form-btn">
                    <FormTitle title={'발행 주기'} />
                    <PublishingSearch
                      idKey={`mediaSearchOptionParams-${uuid()}`}
                      originList={filterPubCycle}
                      keywordParam={mediaSearchOptionParams.keywordParam.publishingPeriod}
                      setKeywordPublishing={e => setMediaPublishingPeriod(e, mediaSearchOptionParams.keywordParam)}
                    />
                    <TagList
                      tagItems={mediaSearchOptionParams.keywordParam.publishingPeriod}
                      onTagItemClose={e =>
                        setMediaTagControl(e, mediaSearchOptionParams.keywordParam, 'publishingPeriod')
                      }
                      onAllTagItemClose={() =>
                        setMediaTagDeleteControl(mediaSearchOptionParams.keywordParam, 'publishingPeriod')
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
                      changeMediaSearchOption(
                        mediaSearchOptionParams,
                        mediaDto,
                        savedMediaKey,
                        isOwner,
                        isFilterSubParam
                      )
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
                        mediaRegisterEditAction(
                          mediaDto,
                          savedMediaKey,
                          mediaSearchOptionParams,
                          isOwner,
                          isFilterSubParam
                        )
                      }
                    />
                  ) : (
                    <DropDownButton
                      mainText={'검색 조건 저장'}
                      classNameTopLayerRef={
                        'select__section select-type1-medium select-type1-tertiary select-align-right'
                      }
                      direction={'up'}
                      icoSvgData={'chevronDown'}
                      topLayerList={[
                        { id: 'edit', name: '검색 조건 수정' },
                        { id: 'new', name: '새 맞춤 검색 만들기' },
                      ]}
                      mainButtonDisabled={!searchActivate}
                      topLayerListAction={e =>
                        e.id === 'edit'
                          ? mediaRegisterEditAction(
                              mediaDto,
                              savedMediaKey,
                              mediaSearchOptionParams,
                              isOwner,
                              isFilterSubParam
                            )
                          : setOpenSearchRegisterPopup('media')
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

export default MediaLeftOption
