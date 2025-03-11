import { forwardRef, useRef } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import Select from '~/components/common/ui/Select'
import TagList from '~/components/common/ui/TagList'
import MediaBookSearch from '~/components/contents/common/forms/MediaBookSearchForm/MediaBookSearch'
import MediaFieldContent from '~/components/contents/common/forms/MediaFieldSearchForm/MediaFieldSearch'
import MediaGroupSearch from '~/components/contents/common/forms/MediaGroupSearch/MediaGroupSearch'
import PortalSearch from '~/components/contents/common/forms/PortalSearchForm/PortalSearchForm'
import SocialSearch from '~/components/contents/common/forms/SocialSearchForm/SociaSearchForm'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import type { SelectListOptionItem } from '~/types/common'
import { usePressSearchOptions } from '~/utils/hooks/contents/pressMedia/usePressSearch'

const MiddleContent = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    industryList,
    journalistSocialFilterList,
    filterDataList,
    portalList,
    locationList,
    pressSearchOption,
    journalistBlockYNList,
    journalistInfoTypeList,
    mediaCountList,
    languageList,
    setPressTagAdditionDeleteControl,
    setPressAdditionTagControl,
    setPressLanguageType,
    setPressLimitType,
    setPressSystemType,
    setPressCountType,
    setPortalKeywordValueAction,
    setSocialKeywordValueAction,
    setPressAdditionMediaTagList,
    setPressAdditionMediaTargetList,
    setMediaFieldKeywordValueAction,
    setMediaLocationPopupAction,
    setMediaFieldPopupAction,
  } = usePressSearchOptions()

  return (
    <div
      className="flexible__group"
      ref={getOpenRef}
    >
      <div className="flexible-item__group type-pb1">
        {/* <ul className="interval-mt16"> */}
        <ul>
          <li>
            <h4 className="font-heading--h5 fw400">추가 검색 조건</h4>
          </li>
          <li className="sp-mt-4">
            <div className="select-form__section select-form-input">
              <FormTitle title={'매체 리스트'} />
              <MediaBookSearch
                isJustCount={true}
                mediaListValueList={pressSearchOption.additionalParam.mediaTargetList}
                onChangeTagList={e => setPressAdditionMediaTargetList(e, pressSearchOption.additionalParam)}
              />
              <TagList
                tagItems={pressSearchOption.additionalParam.mediaTargetList}
                onTagItemClose={e =>
                  setPressAdditionTagControl(e, pressSearchOption.additionalParam, 'mediaTargetList')
                }
                onAllTagItemClose={() =>
                  setPressTagAdditionDeleteControl(pressSearchOption.additionalParam, 'mediaTargetList')
                }
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'매체 분야'} />
              <MediaFieldContent
                keywordParam={pressSearchOption.additionalParam.mediaField}
                setKeywordField={e => setMediaFieldKeywordValueAction(e, pressSearchOption.additionalParam)}
                setOpenKeywordFieldPopup={() =>
                  setMediaFieldPopupAction(industryList, true, pressSearchOption.additionalParam)
                }
              />
              <TagList
                tagItems={pressSearchOption.additionalParam.mediaField}
                onTagItemClose={e => setPressAdditionTagControl(e, pressSearchOption.additionalParam, 'mediaField')}
                onAllTagItemClose={() =>
                  setPressTagAdditionDeleteControl(pressSearchOption.additionalParam, 'mediaField')
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
                  onClick={() => setMediaLocationPopupAction(locationList, true, pressSearchOption.additionalParam)}
                >
                  <span className="button-select-style__button-txt">선택</span>
                  <span className="button-select-style__button-ico">
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </span>
                </button>
                <TagList
                  tagItems={pressSearchOption.additionalParam.mediaArea}
                  onTagItemClose={e => setPressAdditionTagControl(e, pressSearchOption.additionalParam, 'mediaArea')}
                  onAllTagItemClose={() =>
                    setPressTagAdditionDeleteControl(pressSearchOption.additionalParam, 'mediaArea')
                  }
                />
              </div>
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'매체 그룹'} />
              <MediaGroupSearch
                highlightedString={true}
                checkDataLimit={3}
                mediaListValueList={pressSearchOption.additionalParam.mediaGroupList}
                onChangeTagList={e => setPressAdditionMediaTagList(e, pressSearchOption.additionalParam)}
              />
              <TagList
                tagItems={pressSearchOption.additionalParam.mediaGroupList}
                onTagItemClose={e => setPressAdditionTagControl(e, pressSearchOption.additionalParam, 'mediaGroupList')}
                onAllTagItemClose={() =>
                  setPressTagAdditionDeleteControl(pressSearchOption.additionalParam, 'mediaGroupList')
                }
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'포털 제휴'} />
              <PortalSearch
                filter={filterDataList}
                originList={portalList}
                keywordParam={pressSearchOption.additionalParam.portal}
                setKeywordPortal={e => setPortalKeywordValueAction(e, pressSearchOption.additionalParam)}
              />
              <TagList
                tagItems={pressSearchOption.additionalParam.portal}
                onTagItemClose={e => setPressAdditionTagControl(e, pressSearchOption.additionalParam, 'portal')}
                onAllTagItemClose={() => setPressTagAdditionDeleteControl(pressSearchOption.additionalParam, 'portal')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'소셜 미디어'} />
              <SocialSearch
                filter={filterDataList}
                originList={journalistSocialFilterList}
                keywordParam={pressSearchOption.additionalParam.social}
                setKeywordSocial={e => setSocialKeywordValueAction(e, pressSearchOption.additionalParam)}
              />
              <TagList
                tagItems={pressSearchOption.additionalParam.social}
                onTagItemClose={e => setPressAdditionTagControl(e, pressSearchOption.additionalParam, 'social')}
                onAllTagItemClose={() => setPressTagAdditionDeleteControl(pressSearchOption.additionalParam, 'social')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'언어'} />
              <Select
                options={languageList}
                onChange={(option: SelectListOptionItem) =>
                  setPressLanguageType(option, pressSearchOption.additionalParam)
                }
                value={pressSearchOption.additionalParam.languageParam}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'소속 매체수'} />
              <Select
                options={mediaCountList}
                onChange={(option: SelectListOptionItem) =>
                  setPressCountType(option, pressSearchOption.additionalParam)
                }
                value={pressSearchOption.additionalParam.count}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'정보 유형'} />
              <Select
                options={journalistInfoTypeList}
                onChange={(option: SelectListOptionItem) =>
                  setPressSystemType(option, pressSearchOption.additionalParam)
                }
                value={pressSearchOption.additionalParam.system}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn sp-pb-0">
              <FormTitle title={'차단 여부'} />
              <Select
                options={journalistBlockYNList}
                onChange={(option: SelectListOptionItem) =>
                  setPressLimitType(option, pressSearchOption.additionalParam)
                }
                value={pressSearchOption.additionalParam.limit}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
})

export default MiddleContent
