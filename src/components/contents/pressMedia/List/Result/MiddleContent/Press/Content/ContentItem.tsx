import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import Tooltips from '~/components/common/ui/Tooltips'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { ESearchJournalistDocumentDto } from '~/types/contents/PressMedia'
import { apiGetJournalistImage } from '~/utils/api/image/apiGetJournalistImage'
import { getCurrencyFormat } from '~/utils/common/number'
import { handleNonBreakSpace } from '~/utils/common/number'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const checkClasses = [
  'ico',
  'button__label button-link-text__label size-m',
  'button__label button-link-text-arrow__label size-m',
  'ipt-checkbox__group',
]

const ContentItem = (props: ESearchJournalistDocumentDto) => {
  const {
    contentListImageId,
    pressDto,
    journalIdKey,
    journalArrayId,
    isOwner,
    isFilterSubParam,
    setPressIdParamsAction,
    setPressSearchContentKeyList,
    setContentListImageId,
    searchContentKeyList,
  } = usePressMediaListResult()
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetJournalistImage(Number(props.jrnlst_id))
    setContentListImageId()
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  useEffect(() => {
    const temp = searchContentKeyList as ESearchJournalistDocumentDto[]
    const find = temp.find(e => e?.jrnlst_id === props?.jrnlst_id)
    setIsChecked(() => !!find)
  }, [searchContentKeyList])

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
            setPressIdParamsAction(props, journalArrayId, pressDto, isOwner, isFilterSubParam)
            e.preventDefault()
          }
        } else {
          setPressIdParamsAction(props, journalArrayId, pressDto, isOwner, isFilterSubParam)
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
              //onChange={e => props.jrnlst_id && setPressSearchContentKeyList(e, props, searchContentKeyList)}
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
          </li>
        </ul>
      </div>
    </li>
  )
}

export default ContentItem
