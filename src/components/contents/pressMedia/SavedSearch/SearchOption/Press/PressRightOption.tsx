import { ChangeEvent, forwardRef, useLayoutEffect, useRef } from 'react'
import cn from 'classnames'

import FormTitle from '~/components/common/ui/FormTitle'
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
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressRightOption = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    filterPortalCode,
    journalistSocialFilterList,
    filterDataList,
    mediaFieldPopupList,
    listDefine,
    pressSearchOptionParams,
    journalistInfoTypeList,
    journalistBlockYNList,
    mediaCountList,
    languageList,
    mediaLocationPopupList,
    setPressLimitType,
    setPressSystemType,
    setPressCountType,
    setPressLanguageType,
    setPressTagAdditionDeleteControl,
    setPressAdditionTagControl,
    setPressAdditionMediaTargetList,
    setPressAdditionMediaTagList,
    setPressAdditionalField,
    setPressPortal,
    setPressSocialMedia,
    setMediaLocationPopupAction,
    setMediaFieldPopupAction,
  } = useSavedSearch()

  return (
    <div
      className="flexible__group"
      ref={getOpenRef}
      style={{ display: listDefine === 'press' ? 'block' : 'none' }}
    >
      <div className="flexible-item__group type-pb1">
        {/* <ul className="interval-mt16"> */}
        <ul>
          <li>
            <h4 className="font-heading--h5">추가 검색 조건</h4>
          </li>
          <li className="sp-mt-4">
            <div className="select-form__section select-form-input">
              <FormTitle title={'매체 리스트'} />
              <MediaBookSearch
                isJustCount={true}
                mediaListValueList={pressSearchOptionParams.additionalParam.mediaTargetList}
                onChangeTagList={e => setPressAdditionMediaTargetList(e, pressSearchOptionParams.additionalParam)}
              />
              <TagList
                tagItems={pressSearchOptionParams.additionalParam.mediaTargetList}
                onTagItemClose={e =>
                  setPressAdditionTagControl(e, pressSearchOptionParams.additionalParam, 'mediaTargetList')
                }
                onAllTagItemClose={() =>
                  setPressTagAdditionDeleteControl(pressSearchOptionParams.additionalParam, 'mediaTargetList')
                }
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-input">
              <FormTitle title={'매체 분야'} />
              <MediaFieldContent
                keywordParam={pressSearchOptionParams.additionalParam.mediaField}
                setKeywordField={e => setPressAdditionalField(e, pressSearchOptionParams.additionalParam)}
                setOpenKeywordFieldPopup={() =>
                  setMediaFieldPopupAction(
                    mediaFieldPopupList,
                    true,
                    pressSearchOptionParams.additionalParam.mediaField
                  )
                }
              />
              <TagList
                tagItems={pressSearchOptionParams.additionalParam.mediaField}
                onTagItemClose={e =>
                  setPressAdditionTagControl(e, pressSearchOptionParams.additionalParam, 'mediaField')
                }
                onAllTagItemClose={() =>
                  setPressTagAdditionDeleteControl(pressSearchOptionParams.additionalParam, 'mediaField')
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
                      pressSearchOptionParams.additionalParam.mediaArea
                    )
                  }
                >
                  <span className="button-select-style__button-txt">선택</span>
                  <span className="button-select-style__button-ico">
                    <IcoSvg data={icoSvgData.chevronDown} />
                  </span>
                </button>
                <TagList
                  tagItems={pressSearchOptionParams.additionalParam.mediaArea}
                  onTagItemClose={e =>
                    setPressAdditionTagControl(e, pressSearchOptionParams.additionalParam, 'mediaArea')
                  }
                  onAllTagItemClose={() =>
                    setPressTagAdditionDeleteControl(pressSearchOptionParams.additionalParam, 'mediaArea')
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
                mediaListValueList={pressSearchOptionParams.additionalParam.mediaGroupList}
                onChangeTagList={e => setPressAdditionMediaTagList(e, pressSearchOptionParams.additionalParam)}
              />
              <TagList
                tagItems={pressSearchOptionParams.additionalParam.mediaGroupList}
                onTagItemClose={e =>
                  setPressAdditionTagControl(e, pressSearchOptionParams.additionalParam, 'mediaGroupList')
                }
                onAllTagItemClose={() =>
                  setPressTagAdditionDeleteControl(pressSearchOptionParams.additionalParam, 'mediaGroupList')
                }
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'포털 제휴'} />
              <PortalSearch
                filter={filterDataList}
                originList={filterPortalCode}
                keywordParam={pressSearchOptionParams.additionalParam.portal}
                setKeywordPortal={e => setPressPortal(e, pressSearchOptionParams.additionalParam)}
              />
              <TagList
                tagItems={pressSearchOptionParams.additionalParam.portal}
                onTagItemClose={e => setPressAdditionTagControl(e, pressSearchOptionParams.additionalParam, 'portal')}
                onAllTagItemClose={() =>
                  setPressTagAdditionDeleteControl(pressSearchOptionParams.additionalParam, 'portal')
                }
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'소셜 미디어'} />
              <SocialSearch
                filter={filterDataList}
                originList={journalistSocialFilterList}
                keywordParam={pressSearchOptionParams.additionalParam.social}
                setKeywordSocial={e => setPressSocialMedia(e, pressSearchOptionParams.additionalParam)}
              />
              <TagList
                tagItems={pressSearchOptionParams.additionalParam.social}
                onTagItemClose={e => setPressAdditionTagControl(e, pressSearchOptionParams.additionalParam, 'social')}
                onAllTagItemClose={() =>
                  setPressTagAdditionDeleteControl(pressSearchOptionParams.additionalParam, 'social')
                }
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'언어'} />
              <Select
                options={languageList}
                onChange={(option: SelectListOptionItem) =>
                  setPressLanguageType(option, pressSearchOptionParams.additionalParam)
                }
                value={pressSearchOptionParams.additionalParam.languageParam}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'소속 매체수'} />
              <Select
                options={mediaCountList}
                onChange={(option: SelectListOptionItem) =>
                  setPressCountType(option, pressSearchOptionParams.additionalParam)
                }
                value={pressSearchOptionParams.additionalParam.count}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'정보 유형'} />
              <Select
                options={journalistInfoTypeList}
                onChange={(option: SelectListOptionItem) =>
                  setPressSystemType(option, pressSearchOptionParams.additionalParam)
                }
                value={pressSearchOptionParams.additionalParam.system}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn sp-pb-0">
              <FormTitle title={'차단 여부'} />
              <Select
                options={journalistBlockYNList}
                onChange={(option: SelectListOptionItem) =>
                  setPressLimitType(option, pressSearchOptionParams.additionalParam)
                }
                value={pressSearchOptionParams.additionalParam.limit}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
})

export default PressRightOption
