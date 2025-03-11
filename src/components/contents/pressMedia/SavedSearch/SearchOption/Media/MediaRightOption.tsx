import { forwardRef } from 'react'

import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import Select from '~/components/common/ui/Select'
import TagList from '~/components/common/ui/TagList'
import Tooltips from '~/components/common/ui/Tooltips'
import JournalListGroupSearchForm from '~/components/contents/common/forms/JournalListGroupSearchForm/JournalListGroupSearchForm'
import PortalSearch from '~/components/contents/common/forms/PortalSearchForm/PortalSearchForm'
import PressBookSearch from '~/components/contents/common/forms/PressBookSearchForm/PressBookSearch'
import type { SelectListOptionItem } from '~/types/common'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const MediaRightOption = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    mediaSearchOptionParams,
    filterDataList,
    filterPortalCode,
    listDefine,
    mediaBlockYNList,
    filterMediaInfoType,
    mediaNameRevealedYNList,
    languageList,
    setMediaAdditionMediaTargetList,
    setMediaAdditionTagControl,
    setMediaTagAdditionDeleteControl,
    setMediaLanguageType,
    setMediaIsJournalistType,
    setMediaSystemType,
    setMediaLimitType,
    setMediaPortal,
  } = useSavedSearch()
  return (
    <div
      className="flexible__group"
      style={{ display: listDefine === 'media' ? 'block' : 'none' }}
    >
      <div className="flexible-item__group type-pb1">
        {/* <ul className="interval-mt16"> */}
        <ul>
          <li>
            <h4 className="font-heading--h5">추가 검색 조건</h4>
          </li>
          <li className="sp-mt-4">
            <div className="select-form__section select-form-input">
              <FormTitle title={'언론인 리스트'} />
              <PressBookSearch
                isJustCount={true}
                mediaListValueList={mediaSearchOptionParams.additionalParam.journalistTargetList}
                onChangeTagList={e => setMediaAdditionMediaTargetList(e, mediaSearchOptionParams.additionalParam)}
              />
              <TagList
                tagItems={mediaSearchOptionParams.additionalParam.journalistTargetList}
                onTagItemClose={e =>
                  setMediaAdditionTagControl(e, mediaSearchOptionParams.additionalParam, 'journalistTargetList')
                }
                onAllTagItemClose={() =>
                  setMediaTagAdditionDeleteControl(mediaSearchOptionParams.additionalParam, 'journalistTargetList')
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
                keywordParam={mediaSearchOptionParams.additionalParam.portal}
                setKeywordPortal={e => setMediaPortal(e, mediaSearchOptionParams.additionalParam)}
              />
              <TagList
                tagItems={mediaSearchOptionParams.additionalParam.portal}
                onTagItemClose={e => setMediaAdditionTagControl(e, mediaSearchOptionParams.additionalParam, 'portal')}
                onAllTagItemClose={() =>
                  setMediaTagAdditionDeleteControl(mediaSearchOptionParams.additionalParam, 'portal')
                }
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'언어'} />
              <Select
                listDirection={'down'}
                options={languageList}
                onChange={(option: SelectListOptionItem) =>
                  setMediaLanguageType(option, mediaSearchOptionParams.additionalParam)
                }
                value={mediaSearchOptionParams.additionalParam.languageParam}
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
                listDirection={'down'}
                options={mediaNameRevealedYNList}
                onChange={(option: SelectListOptionItem) =>
                  setMediaIsJournalistType(option, mediaSearchOptionParams.additionalParam)
                }
                value={mediaSearchOptionParams.additionalParam.isJournalist}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn">
              <FormTitle title={'정보 유형'} />
              <Select
                listDirection={'down'}
                options={filterMediaInfoType}
                onChange={(option: SelectListOptionItem) =>
                  setMediaSystemType(option, mediaSearchOptionParams.additionalParam)
                }
                value={mediaSearchOptionParams.additionalParam.system}
              />
            </div>
          </li>
          <li>
            <div className="select-form__section select-form-btn sp-pb-0">
              <FormTitle title={'차단 여부'} />
              <Select
                listDirection={'down'}
                options={mediaBlockYNList}
                onChange={(option: SelectListOptionItem) =>
                  setMediaLimitType(option, mediaSearchOptionParams.additionalParam)
                }
                value={mediaSearchOptionParams.additionalParam.limit}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
})

export default MediaRightOption
