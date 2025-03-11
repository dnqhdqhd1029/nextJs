// import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
// import cn from 'classnames'
//
// import Button from '~/components/common/ui/Button'
// import FormInputText from '~/components/common/ui/FormInputText'
// import FormTitle from '~/components/common/ui/FormTitle'
// import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
// import IcoSvg from '~/components/common/ui/IcoSvg'
// import Select from '~/components/common/ui/Select'
// import TagList from '~/components/common/ui/TagList'
// import MediaGroupingForm from '~/components/contents/common/forms/MediaGroupingForm/MediaGroupingForm'
// import MediaSearchForm from '~/components/contents/common/forms/MediaSearchForm/MediaSearchForm'
// import FieldContent from '~/components/contents/pressMedia/Search/Media/LeftContent/FieldContent'
// import PublishingContent from '~/components/contents/pressMedia/Search/Media/LeftContent/PublishingContent'
// import type { SelectListOptionItem } from '~/types/common'
// import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'
// import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'
//
// const MediaLeftOption = () => {
//   const {
//     listDefine,
//     mediaTypeList,
//     mediaValueList,
//     mediaListParams,
//     setMediaTagList,
//     setMediaTagControl,
//     setMediaTagDeleteControl,
//     setMediaTypePopupActionByMediaTab,
//     setMediaLocationPopupActionByMediaTab,
//     mediaLocationPopupList,
//     setMediaKeywordAction,
//     setMediaAdditionMediaTagList,
//     setMediaInformationType,
//   } = useSavedSearch()
//
//   const shareIdOpenRef = useRef<HTMLDivElement>(null)
//   const [isOption, setIsOption] = useState(false)
//
//   const handleClick = useCallback(
//     (e: MouseEvent) => {
//       if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
//     },
//     [isOption]
//   )
//
//   useEffect(() => {
//     window.addEventListener('mousedown', e => handleClick(e))
//     return () => window.removeEventListener('mousedown', e => handleClick(e))
//   }, [])
//
//   return (
//     <div
//       className="flexible__group"
//       style={{ display: listDefine === 'media' ? 'block' : 'none' }}
//     >
//       <div className="flexible-item__group">
//         <div className="flexible-item__contents">
//           <ul className="interval-mt16">
//             <li>
//               <ul>
//                 <li>
//                   <div className="select-form__section select-form-input">
//                     <div className="select-form__group">
//                       <FormTitle title={'매체명'} />
//                       <MediaSearchForm
//                         originId={'media'}
//                         tagPressList={mediaListParams.keywordParam.mediaTagList}
//                         inputErrorMessage={''}
//                         onChangeTagList={e => setMediaTagList(e, mediaListParams.keywordParam)}
//                       />
//                     </div>
//                     <TagList
//                       tagItems={mediaListParams.keywordParam.mediaTagList}
//                       onTagItemClose={e => setMediaTagControl(e, mediaListParams.keywordParam, 'mediaTagList')}
//                       onAllTagItemClose={() => setMediaTagDeleteControl(mediaListParams.keywordParam, 'mediaTagList')}
//                     />
//                   </div>
//                 </li>
//                 <li>
//                   <div className="select-form__section select-form-input">
//                     <div className="button-select-style__group">
//                       <FormTitle title={'매체 유형'} />
//                       <div className={cn('select-form__section select-form-btn')}>
//                         <div className="select-form__group">
//                           <button
//                             className="select-form__label"
//                             onClick={() =>
//                               setMediaTypePopupActionByMediaTab(true, mediaTypeList[0].id, mediaListParams.keywordParam)
//                             }
//                           >
//                             <span className="select-form__label-text">선택</span>
//                             <IcoSvg data={icoSvgData.chevronDown} />
//                           </button>
//                         </div>
//                       </div>
//                       <TagList
//                         tagItems={mediaListParams.keywordParam.mediaType}
//                         onTagItemClose={e => setMediaTagControl(e, mediaListParams.keywordParam, 'mediaType')}
//                         onAllTagItemClose={() => setMediaTagDeleteControl(mediaListParams.keywordParam, 'mediaType')}
//                       />
//                     </div>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="select-form__section select-form-input">
//                     <FormTitle title={'매체 분야'} />
//                     <FieldContent />
//                     <TagList
//                       tagItems={mediaListParams.keywordParam.mediaField}
//                       onTagItemClose={e => setMediaTagControl(e, mediaListParams.keywordParam, 'mediaField')}
//                       onAllTagItemClose={() => setMediaTagDeleteControl(mediaListParams.keywordParam, 'mediaField')}
//                     />
//                   </div>
//                 </li>
//                 <li>
//                   <div className="select-form__section select-form-input">
//                     <div className="button-select-style__group">
//                       <FormTitle title={'매체 지역'} />
//                       <div className={cn('select-form__section select-form-btn')}>
//                         <div className="select-form__group">
//                           <button
//                             className="select-form__label"
//                             onClick={() =>
//                               setMediaLocationPopupActionByMediaTab(
//                                 true,
//                                 mediaLocationPopupList[0],
//                                 mediaListParams,
//                                 'keyword'
//                               )
//                             }
//                           >
//                             <span className="select-form__label-text">선택</span>
//                             <IcoSvg data={icoSvgData.chevronDown} />
//                           </button>
//                         </div>
//                       </div>
//                       <TagList
//                         tagItems={mediaListParams.keywordParam.mediaArea}
//                         onTagItemClose={e => setMediaTagControl(e, mediaListParams.keywordParam, 'mediaArea')}
//                         onAllTagItemClose={() => setMediaTagDeleteControl(mediaListParams.keywordParam, 'mediaArea')}
//                       />
//                     </div>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="select-form__section select-form-input">
//                     <FormInputText
//                       title={'키워드'}
//                       onAdd={e => setMediaKeywordAction(e, mediaListParams.keywordParam)}
//                       value={mediaListParams.keywordParam.keywordValue}
//                       addBtn={true}
//                     />
//                     <TagList
//                       tagItems={mediaListParams.keywordParam.keyword}
//                       onTagItemClose={e => setMediaTagControl(e, mediaListParams.keywordParam, 'keyword')}
//                       onAllTagItemClose={() => setMediaTagDeleteControl(mediaListParams.keywordParam, 'keyword')}
//                     />
//                   </div>
//                 </li>
//                 <li>
//                   <FormTitle title={'매체 그룹'} />
//                   <MediaGroupingForm
//                     originId={'mediaIdGroupList'}
//                     tagPressList={mediaListParams.keywordParam.mediaGroupList}
//                     inputErrorMessage={''}
//                     onChangeTagList={e => setMediaAdditionMediaTagList(e, mediaListParams.keywordParam)}
//                   />
//                   <TagList
//                     tagItems={mediaListParams.keywordParam.mediaGroupList}
//                     onTagItemClose={e => setMediaTagControl(e, mediaListParams.keywordParam, 'mediaGroupList')}
//                     onAllTagItemClose={() => setMediaTagDeleteControl(mediaListParams.keywordParam, 'mediaGroupList')}
//                   />
//                 </li>
//                 <li>
//                   <div className="select-form__section select-form-input">
//                     <div className="select-form__section select-form-btn">
//                       <FormTitle title={'매체 지수'} />
//                       <Select
//                         options={mediaValueList}
//                         onChange={(option: SelectListOptionItem) =>
//                           setMediaInformationType(option, mediaListParams.keywordParam)
//                         }
//                         value={mediaListParams.keywordParam.informationType}
//                       />
//                     </div>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="select-form__section select-form-input">
//                     <FormTitle title={'발행 주기'} />
//                     <PublishingContent />
//                     <TagList
//                       tagItems={mediaListParams.keywordParam.publishingPeriod}
//                       onTagItemClose={e => setMediaTagControl(e, mediaListParams.keywordParam, 'publishingPeriod')}
//                       onAllTagItemClose={() =>
//                         setMediaTagDeleteControl(mediaListParams.keywordParam, 'publishingPeriod')
//                       }
//                     />
//                   </div>
//                 </li>
//               </ul>
//             </li>
//             <li>
//               <div className="flexible-search__button">
//                 <div className="flexible-search__button-reset">
//                   <Button
//                     label={'초기화'}
//                     cate={'link-text'}
//                     size={'m'}
//                     color={'body-link'}
//                     onClick={() => setResetSearchOption(monitoringCategoryData)}
//                     disabled={!searchActivate}
//                   />
//                 </div>
//                 <div className="flexible-search__button-search">
//                   <Button
//                     label={'검색'}
//                     cate={'default'}
//                     size={'m'}
//                     color={'primary'}
//                     disabled={!searchActivate}
//                     onClick={() =>
//                       monitoringCategoryData &&
//                       changeSearchOption(monitoringListParams, monitoringParams, monitoringDate, monitoringCategoryData)
//                     }
//                   />
//                 </div>
//                 <div className="flexible-search__button-save">
//                   <div
//                     className="select__section select-type1-medium select-line select-align-right"
//                     ref={shareIdOpenRef}
//                   >
//                     <button
//                       className="select__label"
//                       onClick={() => setIsOption(!isOption)}
//                     >
//                       <span className="select__label-text">검색 조건 저장</span>
//                       <IcoSvg data={icoSvgData.chevronDown} />
//                     </button>
//
//                     <div className={cn('select-option__section', { 'display-block': isOption })}>
//                       <div className="select-option__area">
//                         <ul className="select-option__group">
//                           <li>
//                             <button
//                               className="select-option__item"
//                               onClick={() =>
//                                 updateMonitroing(monitoringIdParams, monitoringParams, monitoringCategoryList)
//                               }
//                             >
//                               <span className="select-option__item-text">검색 조건 수정</span>
//                             </button>
//                           </li>
//                           <li>
//                             <button
//                               className="select-option__item"
//                               onClick={() => openMonitoringPopup(monitoringCategoryList, monitoringParams)}
//                             >
//                               <span className="select-option__item-text">새 모니터링 만들기</span>
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export default MediaLeftOption
