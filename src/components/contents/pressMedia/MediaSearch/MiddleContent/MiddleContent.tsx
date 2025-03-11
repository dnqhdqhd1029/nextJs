import { forwardRef } from 'react'

import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import Select from '~/components/common/ui/Select'
import TagList from '~/components/common/ui/TagList'
import Tooltips from '~/components/common/ui/Tooltips'
import PortalSearch from '~/components/contents/common/forms/PortalSearchForm/PortalSearchForm'
import PressBookSearch from '~/components/contents/common/forms/PressBookSearchForm/PressBookSearch'
import type { SelectListOptionItem } from '~/types/common'
import { useMediaSearchOptions } from '~/utils/hooks/contents/pressMedia/useMediaSearchOptions'

const MiddleContent = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    mediaSearchOption,
    mediaNameRevealedYNList,
    portalList,
    mediaInfoTypeList,
    filterDataList,
    languageList,
    mediaBlockYNList,
    setMediaAdditionTagControl,
    setMediaTagAdditionDeleteControl,
    setJournalistTargetListTargetList,
    setMediaLanguageType,
    setPortalKeywordValueAction,
    setMediaIsJournalistType,
    setMediaLimitType,
    setMediaSystemType,
  } = useMediaSearchOptions()

  return (
    <div className="flexible__group">
      <div className="flexible-item__group type-pb1">
        {/* <ul className="interval-mt16"> */}
        <ul>
          <li>
            <h4 className="font-heading--h5 fw400">추가 검색 조건</h4>
          </li>
          <li className="sp-mt-4">
            <div className="select-form__section select-form-input">
              <FormTitle title={'언론인 리스트'} />
              <PressBookSearch
                isJustCount={true}
                mediaListValueList={mediaSearchOption.additionalParam.journalistTargetList}
                onChangeTagList={e => setJournalistTargetListTargetList(e, mediaSearchOption.additionalParam)}
              />
              <TagList
                tagItems={mediaSearchOption.additionalParam.journalistTargetList}
                onTagItemClose={e =>
                  setMediaAdditionTagControl(e, mediaSearchOption.additionalParam, 'journalistTargetList')
                }
                onAllTagItemClose={() =>
                  setMediaTagAdditionDeleteControl(mediaSearchOption.additionalParam, 'journalistTargetList')
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
                keywordParam={mediaSearchOption.additionalParam.portal}
                setKeywordPortal={e => setPortalKeywordValueAction(e, mediaSearchOption.additionalParam)}
              />
              <TagList
                tagItems={mediaSearchOption.additionalParam.portal}
                onTagItemClose={e => setMediaAdditionTagControl(e, mediaSearchOption.additionalParam, 'portal')}
                onAllTagItemClose={() => setMediaTagAdditionDeleteControl(mediaSearchOption.additionalParam, 'portal')}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'언어'} />
              <Select
                options={languageList}
                onChange={(option: SelectListOptionItem) =>
                  setMediaLanguageType(option, mediaSearchOption.additionalParam)
                }
                value={mediaSearchOption.additionalParam.languageParam}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle
                title={'기자명 노출'}
                tooltip={true}
              >
                <Tooltips
                  tooltipId={'tt10-5'}
                  tooltipPlace={'bottom'}
                  tooltipHtml={'매체의 뉴스에 기자 이름이 노출돼 있는지 확인을 할 수 있습니다.'}
                  tooltipComponent={<IcoTooltip />}
                />
              </FormTitle>
              <Select
                options={mediaNameRevealedYNList}
                onChange={(option: SelectListOptionItem) =>
                  setMediaIsJournalistType(option, mediaSearchOption.additionalParam)
                }
                value={mediaSearchOption.additionalParam.isJournalist}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'정보 유형'} />
              <Select
                options={mediaInfoTypeList}
                onChange={(option: SelectListOptionItem) =>
                  setMediaSystemType(option, mediaSearchOption.additionalParam)
                }
                value={mediaSearchOption.additionalParam.system}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn sp-pb-0">
              <FormTitle title={'차단 여부'} />
              <Select
                options={mediaBlockYNList}
                onChange={(option: SelectListOptionItem) =>
                  setMediaLimitType(option, mediaSearchOption.additionalParam)
                }
                value={mediaSearchOption.additionalParam.limit}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
})

export default MiddleContent
