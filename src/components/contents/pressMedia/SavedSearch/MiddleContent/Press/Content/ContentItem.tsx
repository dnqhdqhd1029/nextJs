import { Fragment, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import Tooltips from '~/components/common/ui/Tooltips'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { pressNewsItem } from '~/stores/modules/contents/pressMedia/pressMediaSearchResult'
import { pressNewsData } from '~/stores/modules/contents/pressMedia/savedSearch'
import { ESearchJournalistDocumentDto } from '~/types/contents/PressMedia'
import { apiGetJournalistImage } from '~/utils/api/image/apiGetJournalistImage'
import { getDateFormat } from '~/utils/common/date'
import { getCurrencyFormat } from '~/utils/common/number'
import { handleNonBreakSpace } from '~/utils/common/number'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const checkClasses = [
  'ico',
  'button__label button-link-text__label size-m',
  'button__label button-link-text-arrow__label size-m',
  'ipt-checkbox__group',
]

const ContentItem = (props: ESearchJournalistDocumentDto) => {
  const {
    contentListImageId,
    timeZone,
    pressNewsList,
    isSearchedNewsOpen,
    journalIdKey,
    pressDto,
    savedJournalKey,
    isOwner,
    isFilterSubParam,
    pressListParams,
    setPressIdParamsAction,
    setPressSearchContentKeyList,
    setContentListImageId,
    searchContentKeyList,
    settingsRefinedValue,
  } = useSavedSearch()
  const [isOpenNews, setIsOpenNews] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [isExpand, setIsExpand] = useState(1)
  const [newsLoading, setNewsLoading] = useState<boolean>(true)
  const [newsData, setNewsData] = useState<pressNewsItem[]>([])

  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetJournalistImage(Number(props.jrnlst_id))
    setContentListImageId()
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  const getNews = async () => {
    setNewsLoading(() => true)
    if (pressNewsList && pressNewsList.length > 0) {
      const find = pressNewsList.find(e => e?.journalistId === props?.jrnlst_id)
      setNewsData(() => (find && find.newsList && find.newsList.length > 0 ? find.newsList : []))
      setNewsLoading(() => false)
    }
  }

  useEffect(() => {
    const temp = searchContentKeyList as ESearchJournalistDocumentDto[]
    const find = temp.find(e => e?.jrnlst_id === props?.jrnlst_id)
    setIsChecked(() => !!find)
  }, [searchContentKeyList])

  useEffect(() => {
    setIsOpenNews(isSearchedNewsOpen)
    setIsExpand(prevState => (!isSearchedNewsOpen ? 1 : prevState))
  }, [isSearchedNewsOpen])

  useEffect(() => {
    if (
      pressListParams.keywordParam.newsKeywordValue &&
      pressListParams.keywordParam.newsKeywordValue !== '' &&
      pressNewsList.length > 0
    ) {
      getNews()
    }
  }, [pressNewsList])

  useEffect(() => {
    if (
      props?.jrnlst_id &&
      contentListImageId !== 0 &&
      props?.jrnlst_id !== 0 &&
      contentListImageId.toString() === props?.jrnlst_id.toString()
    )
      getImage()
  }, [contentListImageId])

  useEffect(() => {
    if (props.jrnlst_id) getImage()
  }, [])

  return (
    <li
      id={'newsList' + props.jrnlst_id}
      onClick={e => {
        const aTarget = e.target as HTMLElement
        if (aTarget.className && typeof aTarget.className === 'string') {
          const isInList = checkClasses.some(className => aTarget.className.includes(className))
          if (!isInList) {
            setPressIdParamsAction(props, pressListParams, savedJournalKey, pressDto, isOwner, isFilterSubParam)
            e.preventDefault()
          }
        } else {
          setPressIdParamsAction(props, pressListParams, savedJournalKey, pressDto, isOwner, isFilterSubParam)
          e.preventDefault()
        }
      }}
    >
      <div className={cn('list-type2-item__group', { 'is-selected': props.jrnlst_id === journalIdKey })}>
        <ul className="list-type2-item__list">
          <li
            className="list-type2-item__check"
            onClick={e => {
              props.jrnlst_id && setPressSearchContentKeyList(!isChecked, props, searchContentKeyList)
              e.preventDefault()
            }}
          >
            <FormInputBtn
              type="checkbox"
              name={'search-result__header-sort newsList' + props.jrnlst_id?.toString() || ''}
              id={'search-result__header-sort newsList' + props.jrnlst_id?.toString() || ''}
              checked={isChecked}
              label=""
            />
          </li>
          <li className="list-type2-item__contents">
            <div className="list-type2-item__header">
              <div className="list-type2-item__thumb">
                {!loading ? (
                  <div className="list-type3__img">
                    {imageSrc === '' ? (
                      <>
                        {!props.isSysInfo ? (
                          <Tooltips
                            tooltipId={`personally-${uuid()}`}
                            tooltipPlace={'top'}
                            tooltipHtml={'개인 추가 언론인'}
                            tooltipComponent={
                              <IcoAvatar
                                label={props?.name || ''}
                                icoData={icoSvgData.lockFill}
                                size={'s48'}
                                icoSize={'s24'}
                              />
                            }
                          />
                        ) : (
                          <IcoAvatar
                            label={props?.name || ''}
                            icoData={icoSvgData.personFill}
                            size={'s48'}
                            icoSize={'s24'}
                          />
                        )}
                      </>
                    ) : (
                      <img
                        src={imageSrc}
                        id={'imageSrc_isSysInfo_' + props.jrnlst_id}
                        onLoad={e => {
                          const imageSrcDetail = e.target
                          //@ts-ignore
                          if (
                            //@ts-ignore
                            e.target.naturalWidth &&
                            //@ts-ignore
                            e.target.naturalHeight &&
                            //@ts-ignore
                            Number(e.target.naturalHeight) > Number(e.target.naturalWidth)
                          ) {
                            //@ts-ignore
                            document?.getElementById(`imageSrc_isSysInfo_${props.jrnlst_id}`)?.className =
                              'ratio-vertical'
                          }
                        }}
                        alt={props.name || ''}
                        className="list-type3__img-ratio"
                      />
                    )}
                  </div>
                ) : (
                  <Skeleton
                    width={'500'}
                    height={'500'}
                  />
                )}
              </div>
              <div className="list-type2-item__info">
                <div className="list-type2-item-header__float">
                  {props.isSysInfo && (
                    <p className="list-type2-item-header__text">
                      <span className="media-index">
                        <IcoSvg data={icoSvgData.barChart} />
                      </span>{' '}
                      {getCurrencyFormat(props?.media?.main?.price || 0)}
                    </p>
                  )}
                  <p className="list-type2-item-header__text">
                    {props.media &&
                      props.media.main &&
                      props.media?.main?.location &&
                      props.media?.main?.location?.address &&
                      props.media?.main?.location?.address.length > 1 &&
                      props.media?.main?.location?.address.split(' ')[0] +
                        ' ' +
                        props.media?.main?.location?.address.split(' ')[1]}
                  </p>
                  <p className="list-type2-item-header__text">{props?.coverage?.category}</p>
                </div>
                <p className="list-type2-item-header__name">
                  <a
                    href={`/contacts/record/${Number(props.jrnlst_id) || 0}`}
                    className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'link-dark'}`)}
                  >
                    <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                      {props?.name || ''}
                    </span>
                  </a>
                </p>
                <p className="list-type2-item-header__text">
                  {props?.media?.main?.id ? (
                    <a
                      href={`/media/record/${Number(props?.media?.main?.id) || 0}`}
                      className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'link-dark'}`)}
                    >
                      <span
                        className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}
                        style={{ paddingRight: 3 }}
                      >
                        {/*@ts-ignore*/}
                        {props.isSysInfo ? props?.media?.main?.name + ' ' || '' : props?.media?.name + ' ' || ''}
                      </span>
                    </a>
                  ) : (
                    <span
                      className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}
                      style={{ paddingRight: 3 }}
                    >
                      {/*@ts-ignore*/}
                      {props.isSysInfo ? props?.media?.main?.name + ' ' || '' : props?.media?.name + ''}
                    </span>
                  )}
                  {!props.isSysInfo && <Fragment>{props?.department && props?.department + ' '}</Fragment>}
                  {!props.isSysInfo && <Fragment>{props?.role && props?.role + ' '}</Fragment>}
                  {/*{!props.isSysInfo && (*/}
                  {/*  <Fragment>*/}
                  {/*    {props.journalistUserDto &&*/}
                  {/*      props.journalistUserDto.fieldsByUser &&*/}
                  {/*      props?.journalistUserDto?.fieldsByUser?.join(handleNonBreakSpace(2))}*/}
                  {/*  </Fragment>*/}
                  {/*)}*/}
                  {props.isSysInfo && (
                    <Fragment>
                      {props.department && <span style={{ paddingRight: 3 }}>{props.department + ' '}</span>}
                      {props.role && <span>{props.role}</span>}
                    </Fragment>
                  )}
                </p>
                <p className="list-type2-item-header__text">
                  {props?.coverage?.field && props?.coverage?.field?.join(handleNonBreakSpace(2))}
                </p>
              </div>
            </div>
            {/*@ts-ignore*/}
            {pressListParams.keywordParam.newsKeywordValue &&
              pressListParams.keywordParam.newsKeywordValue !== '' &&
              // @ts-ignore
              props.newsCount &&
              // @ts-ignore
              Number(props.newsCount) > 0 && (
                <div className="list-type2-item__news">
                  <div
                    className={cn('accordion-type2__group', {
                      'is-opened': isOpenNews,
                    })}
                  >
                    <button
                      className={cn('accordion-type2__btn')}
                      onClick={e => {
                        e.preventDefault()
                        if (!newsLoading) {
                          setIsOpenNews(!isOpenNews)
                        }
                      }}
                    >
                      <span className="accordion-type2__btn-txt">검색된 뉴스 {Number(props.newsCount)}개</span>
                      <span className="accordion-type2__btn-ico">
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </span>
                    </button>
                    {isOpenNews && (
                      <div className="accordion-type2-panel__group">
                        <div className="list-type1__section">
                          <motion.ul
                            className={cn('list-type1__group')}
                            initial={{
                              height: 0,
                            }}
                            animate={{
                              height: isOpenNews ? 'auto' : 0,
                            }}
                            transition={filterTransition}
                          >
                            {newsData &&
                              newsData.length > 0 &&
                              newsData
                                .slice(
                                  0,
                                  (parseInt(settingsRefinedValue['mour_ui_number'])
                                    ? parseInt(settingsRefinedValue['mour_ui_number'])
                                    : 5) * isExpand
                                )
                                .map((e, index) => (
                                  <li key={`/news/record/${Number(e.newsid) || 0}` + index}>
                                    <div className="list-type1__item">
                                      <div className="list-type1__text">
                                        <a
                                          href={`/news/record/${Number(e.newsid) || 0}`}
                                          className={cn(
                                            `button-${'link-text-arrow'}`,
                                            `size-${'m'}`,
                                            `colors-${'primary'}`
                                          )}
                                        >
                                          <span
                                            className={cn(
                                              `button__label button-${'link-text-arrow'}__label`,
                                              `size-${'m'}`
                                            )}
                                          >
                                            {e.title}
                                          </span>
                                        </a>
                                        <p>
                                          {getDateFormat(timeZone, e?.inserted || '')} {e.authors} {e.mname}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                          </motion.ul>
                          {newsData.length >
                            isExpand *
                              (parseInt(settingsRefinedValue['mour_ui_number'])
                                ? parseInt(settingsRefinedValue['mour_ui_number'])
                                : 5) && (
                            <div className="list-type1__more">
                              <Button
                                label={'더보기'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                                onClick={e => {
                                  setIsExpand(prevState => prevState + 1)
                                  e.preventDefault()
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </li>
        </ul>
      </div>
    </li>
  )
}

export default ContentItem
