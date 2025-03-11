import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import Tooltips from '~/components/common/ui/Tooltips'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { ESearchMediaDocumentDto } from '~/types/contents/PressMedia'
import { apiGetMediaImage } from '~/utils/api/image/apiGetMediaImage'
import { getCurrencyFormat } from '~/utils/common/number'
import { handleNonBreakSpace } from '~/utils/common/number'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const checkClasses = [
  'ico',
  'button__label button-link-text__label size-m',
  'button__label button-link-text-arrow__label size-m',
  'ipt-checkbox__group',
]

const ContentItem = (props: ESearchMediaDocumentDto) => {
  const {
    contentListImageId,
    pageCount,
    mediaIdKey,
    mediaDto,
    mediaArrayId,
    isOwner,
    isFilterSubParam,
    setMediaIdParamsAction,
    setMediaSearchContentKeyList,
    setContentListImageId,
    searchContentKeyList,
  } = usePressMediaListResult()
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetMediaImage(Number(props.mid))
    setContentListImageId()
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  useEffect(() => {
    const temp = searchContentKeyList as ESearchMediaDocumentDto[]
    const find = temp.find(e => e?.mid === props?.mid)
    setIsChecked(() => !!find)
  }, [searchContentKeyList])

  useEffect(() => {
    if (
      props?.mid &&
      contentListImageId !== 0 &&
      props?.mid !== 0 &&
      contentListImageId.toString() === props?.mid.toString()
    )
      getImage()
  }, [contentListImageId])

  useEffect(() => {
    getImage()
  }, [])

  return (
    <li
      id={'newsList' + props.mid}
      onClick={e => {
        const aTarget = e.target as HTMLElement
        if (aTarget.className && typeof aTarget.className === 'string') {
          const isInList = checkClasses.some(className => aTarget.className.includes(className))
          if (!isInList) {
            setMediaIdParamsAction(props, mediaArrayId, mediaDto, isOwner, isFilterSubParam)
            e.preventDefault()
          }
        } else {
          setMediaIdParamsAction(props, mediaArrayId, mediaDto, isOwner, isFilterSubParam)
          e.preventDefault()
        }
      }}
    >
      <div className={cn('list-type2-item__group', { 'is-selected': props.mid === mediaIdKey })}>
        <ul className="list-type2-item__list">
          <li
            className="list-type2-item__check"
            onClick={e => {
              props.mid && setMediaSearchContentKeyList(!isChecked, props, searchContentKeyList)
              e.preventDefault()
            }}
          >
            <FormInputBtn
              type="checkbox"
              name={'search-result__header-sort newsList' + props.mid?.toString() || ''}
              id={'search-result__header-sort newsList' + props.mid?.toString() || ''}
              checked={isChecked}
              label=""
              //onChange={e => props.mid && setMediaSearchContentKeyList(e, props, searchContentKeyList)}
            />
          </li>
          <li
            className="list-type2-item__contents"
            onClick={e => {
              setMediaIdParamsAction(props, mediaArrayId, mediaDto, isOwner, isFilterSubParam)
              e.preventDefault()
            }}
          >
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
                            tooltipHtml={'개인 추가 미디어'}
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
                        id={'imageSrc_isSysInfo_' + props.mid}
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
                            document?.getElementById(`imageSrc_isSysInfo_${props.mid}`)?.className = 'ratio-vertical'
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
                  {props.isSysInfo ? (
                    <p className="list-type2-item-header__text">
                      <span className="media-index">
                        <IcoSvg data={icoSvgData.barChart} />
                      </span>{' '}
                      {/*@ts-ignore*/}
                      {getCurrencyFormat(props?.values?.combined_new || 0)}
                    </p>
                  ) : (
                    <p className="list-type2-item-header__text">
                      {props.contacts?.main?.address && props.contacts?.main?.address}
                    </p>
                  )}
                  <p className="list-type2-item-header__text">
                    {props?.contacts?.main?.country_code && (
                      <Fragment>
                        {props?.contacts?.main?.country_code === 'KO'
                          ? props?.contacts?.main?.address && props?.contacts?.main?.address.length > 0
                            ? props?.contacts?.main?.address.split(' ')[0] +
                              ' ' +
                              props?.contacts?.main?.address.split(' ')[1]
                            : ''
                          : props?.contacts?.main?.country}
                      </Fragment>
                    )}
                  </p>
                </div>
                <p className="list-type2-item-header__name">
                  <a
                    href={`/media/record/${Number(props.mid) || 0}`}
                    className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'link-dark'}`)}
                  >
                    <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                      {props?.name || ''}
                    </span>
                  </a>
                </p>
                {props.isSysInfo ? (
                  <Fragment>
                    <p className="list-type2-item-header__text">{props?.subtype + ' '}</p>
                    <p className="list-type2-item-header__text">
                      {props?.coverage?.field?.join(handleNonBreakSpace(2))}
                    </p>
                  </Fragment>
                ) : (
                  <Fragment>
                    {props.coverage?.category &&
                      props?.coverage?.category.length > 0 &&
                      props?.coverage?.category?.join(handleNonBreakSpace(2))}
                  </Fragment>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default ContentItem
