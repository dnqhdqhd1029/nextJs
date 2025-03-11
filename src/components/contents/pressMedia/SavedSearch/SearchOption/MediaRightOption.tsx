// import { ChangeEvent, useLayoutEffect } from 'react'
// import cn from 'classnames'
//
// import FormInputText from '~/components/common/ui/FormInputText'
// import FormTitle from '~/components/common/ui/FormTitle'
// import { IcoTooltip } from '~/components/common/ui/IcoGroup'
// import Select from '~/components/common/ui/Select'
// import TagList from '~/components/common/ui/TagList'
// import Tooltips from '~/components/common/ui/Tooltips'
// import ClipbookSearchForm from '~/components/contents/common/forms/ClipbookSearchForm/ClipbookSearchForm'
// import JournalListGroupSearchForm from '~/components/contents/common/forms/JournalListGroupSearchForm/JournalListGroupSearchForm'
// import JournalListSearchForm from '~/components/contents/common/forms/JournalListSearchForm/JournalListSearchForm'
// import MediaGroupingForm from '~/components/contents/common/forms/MediaGroupingForm/MediaGroupingForm'
// import MediaListGroupSearchForm from '~/components/contents/common/forms/MediaListGroupSearchForm/MediaListGroupSearchForm'
// import MediaSearchForm from '~/components/contents/common/forms/MediaSearchForm/MediaSearchForm'
// import MbTagSearchCreateLayer from '~/components/contents/common/layer/MbTagSearchCreateLayer/MbTagSearchCreateLayer'
// import PublishingContent from '~/components/contents/monitoring/Search/MiddleContent/PublishingContent'
// import ToneContentForm from '~/components/contents/monitoring/Search/MiddleContent/ToneContentForm'
// import MediaFieldContent from '~/components/contents/pressMedia/Search/Press/MiddleContent/MediaFieldContent'
// import PortalContent from '~/components/contents/pressMedia/Search/Press/MiddleContent/PortalContent'
// import SocialMediaContent from '~/components/contents/pressMedia/Search/Press/MiddleContent/SocialMediaContent'
// import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
// import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
// import type { TagDto } from '~/types/api/service'
// import type { SelectListOptionItem } from '~/types/common'
// import type { TagSearchCreateLayerItem } from '~/types/contents/Common'
// import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'
//
// const MediaRightOption = () => {
//   const {
//     listDefine,
//     mediaListParams,
//     mediaInfoTypeList,
//     mediaBlockYNList,
//     setMediaAdditionMediaTargetList,
//     setMediaAdditionTagControl,
//     setMediaTagAdditionDeleteControl,
//     languageList,
//     setMediaLanguageType,
//     mediaNameRevealedYNList,
//     setMediaIsJournalistType,
//     setMediaSystemType,
//     setMediaLimitType,
//   } = useSavedSearch()
//   return (
//     <div
//       className="flexible__group"
//       style={{ display: listDefine === 'media' ? 'block' : 'none' }}
//     >
//       <div className="flexible-item__group type-pb1">
//         <ul className="interval-mt16">
//           <li>
//             <h4 className="font-heading--h5">추가 검색 조건</h4>
//           </li>
//           <li>
//             <div className="flexible-item__contents">
//               <ul>
//                 <li>
//                   <FormTitle title={'언론인 리스트'} />
//                   <JournalListGroupSearchForm
//                     originId={'pressList'}
//                     tagPressList={mediaListParams.additionalParam.journalistTargetList}
//                     inputErrorMessage={''}
//                     isResultListItemReactNode={true}
//                     isNoDetail={true}
//                     onChangeTagList={e => setMediaAdditionMediaTargetList(e, mediaListParams.additionalParam)}
//                   />
//                   <TagList
//                     tagItems={mediaListParams.additionalParam.journalistTargetList}
//                     onTagItemClose={e =>
//                       setMediaAdditionTagControl(e, mediaListParams.additionalParam, 'journalistTargetList')
//                     }
//                     onAllTagItemClose={() =>
//                       setMediaTagAdditionDeleteControl(mediaListParams.additionalParam, 'journalistTargetList')
//                     }
//                   />
//                 </li>
//                 <li>
//                   <FormTitle title={'포털 제휴'} />
//                   <PortalContent />
//                   <TagList
//                     tagItems={mediaListParams.additionalParam.portal}
//                     onTagItemClose={e => setMediaAdditionTagControl(e, mediaListParams.additionalParam, 'portal')}
//                     onAllTagItemClose={() =>
//                       setMediaTagAdditionDeleteControl(mediaListParams.additionalParam, 'portal')
//                     }
//                   />
//                 </li>
//                 <li>
//                   <FormTitle title={'언어'} />
//                   <Select
//                     listDirection={'up'}
//                     options={languageList}
//                     onChange={(option: SelectListOptionItem) =>
//                       setMediaLanguageType(option, mediaListParams.additionalParam)
//                     }
//                     value={mediaListParams.additionalParam.languageParam}
//                   />
//                 </li>
//                 <li>
//                   <FormTitle
//                     title={'기자명 노출'}
//                     tooltip={true}
//                   >
//                     <Tooltips
//                       tooltipId={'tt10-5'}
//                       tooltipPlace={'bottom'}
//                       tooltipHtml={
//                         '매체의 뉴스에 기자 이름이 노출돼 있는지 확인을 할 수 있습니다.'
//                       }
//                       tooltipComponent={<IcoTooltip />}
//                     />
//                   </FormTitle>
//                   <Select
//                     listDirection={'up'}
//                     options={mediaNameRevealedYNList}
//                     onChange={(option: SelectListOptionItem) =>
//                       setMediaIsJournalistType(option, mediaListParams.additionalParam)
//                     }
//                     value={mediaListParams.additionalParam.isJournalist}
//                   />
//                 </li>
//                 <li>
//                   <FormTitle title={'정보 유형'} />
//                   <Select
//                     listDirection={'up'}
//                     options={mediaInfoTypeList}
//                     onChange={(option: SelectListOptionItem) =>
//                       setMediaSystemType(option, mediaListParams.additionalParam)
//                     }
//                     value={mediaListParams.additionalParam.system}
//                   />
//                 </li>
//                 <li>
//                   <FormTitle title={'차단 여부'} />
//                   <Select
//                     listDirection={'up'}
//                     options={mediaBlockYNList}
//                     onChange={(option: SelectListOptionItem) =>
//                       setMediaLimitType(option, mediaListParams.additionalParam)
//                     }
//                     value={mediaListParams.additionalParam.limit}
//                   />
//                 </li>
//               </ul>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   )
// }
//
// export default MediaRightOption
