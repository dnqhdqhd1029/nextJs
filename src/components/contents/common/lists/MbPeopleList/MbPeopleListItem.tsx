/**
 * @file ListTypePeople.tsx
 * @description search-type3
 */

import { ChangeEvent, CSSProperties, MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import MbPeopleListItemNews from './MbPeopleListItemNews'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import IcoAvatar from '~/components/common/ui/IcoAvatar'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import type { PeopleListItem } from '~/types/contents/Common'
import { getStylesOfImageRatio } from '~/utils/common/image'
import { getCurrencyFormat } from '~/utils/common/number'

export interface Props {
  /** 언론인 정보 */
  item: PeopleListItem

  /** 현재 아이템 index */
  index: number

  /** 관련 뉴스 보이기 이벤트 */
  onShowRelatedNews: (index: number) => void

  /** 관련 뉴스 더 보기 이벤트 */
  onShowRelatedNewsMore: (item: PeopleListItem, relatedNewsMaxIndex: number) => void

  /** checkbox 클릭 event */
  onCheck: (e: ChangeEvent<HTMLInputElement>, item: PeopleListItem) => void

  /**
   * item select event
   */
  onSelectItem?: (item: PeopleListItem) => void

  /**
   * name click event
   */
  onNameClick?: (item: PeopleListItem) => void

  /**
   * subName click event
   */
  onSubNameClick?: (item: PeopleListItem) => void
}

const MbPeopleListItem = ({
  item,
  index,
  onShowRelatedNews,
  onShowRelatedNewsMore,
  onCheck,
  onSelectItem,
  onNameClick,
  onSubNameClick,
}: Props) => {
  const {
    id,
    isChecked = false,
    disableCheck = false,
    imageSrc,
    name,
    nameLink,
    isAddedPersonally = false,
    mediaValue,
    location,
    disableMediaValue = false,
    media,
    hasMediaLink,
    department,
    position,
    partTags,
    relatedNews,
    isSelected,
  } = item
  const [imageStyles, setImageStyles] = useState<CSSProperties>({})

  const handleClick = () => {
    onSelectItem && onSelectItem(item)
  }

  const handleInputCheck = (e: ChangeEvent<HTMLInputElement>, item: PeopleListItem) => {
    e.preventDefault()
    e.stopPropagation()
    onCheck(e, item)
  }

  const handleNameClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onNameClick && onNameClick(item)
  }

  const handleSubNameClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onSubNameClick && onSubNameClick(item)
  }

  const adjustImageSize = async () => {
    const styles = await getStylesOfImageRatio(imageSrc)
    setImageStyles(styles)
  }

  useEffect(() => {
    if (!item) {
      return
    }

    adjustImageSize()
  }, [item])

  return (
    <li key={index}>
      <div className={cn('list-type2-item__group', { 'is-selected': isSelected })}>
        <ul className="list-type2-item__list">
          {!disableCheck && (
            <li className="list-type2-item__check">
              <FormInputBtn
                type="checkbox"
                name={id}
                id={id}
                label=""
                checked={isChecked}
                onChange={e => handleInputCheck(e, item)}
              />
            </li>
          )}

          <li
            className="list-type2-item__contents"
            onClick={handleClick}
          >
            <div className="list-type2-item__header">
              <div className="list-type2-item__thumb">
                {/* 유저 개인적으로 추가한 언론인인 경우  */}
                {isAddedPersonally ? (
                  <>
                    {imageSrc === undefined || imageSrc === '' ? (
                      <Tooltips
                        tooltipId={`${id}-personally-${uuid()}`}
                        tooltipPlace={'top'}
                        tooltipHtml={'개인 추가 언론인'}
                        tooltipComponent={
                          <IcoAvatar
                            label={'이미지없음'}
                            icoData={icoSvgData.lockFill}
                            size={'s48'}
                            icoSize={'s24'}
                          />
                        }
                      />
                    ) : (
                      <div className="list-type3__img">
                        <img
                          src={imageSrc}
                          alt={name}
                          className="list-type3__img-ratio"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* DB에 있는 언론인인 경우  */}
                    {imageSrc !== undefined && imageSrc !== '' ? (
                      <div className="list-type3__img">
                        <img
                          src={imageSrc}
                          alt={name}
                          className="list-type3__img-ratio"
                        />
                      </div>
                    ) : (
                      <IcoAvatar
                        label={name}
                        icoData={icoSvgData.personFill}
                        size={'s48'}
                        icoSize={'s24'}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="list-type2-item__info">
                {!disableMediaValue && (
                  <div className="list-type2-item-header__float">
                    <p className="list-type2-item-header__text">
                      <span className="media-index">
                        <IcoSvg data={icoSvgData.barChart} />
                      </span>{' '}
                      {getCurrencyFormat(mediaValue ?? 0)}
                    </p>
                    <p className="list-type2-item-header__text">{location ?? ''}</p>
                  </div>
                )}

                {name && (
                  <p className="list-type2-item-header__name">
                    <Button
                      elem="button"
                      label={name + ' ' + id}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-text'}
                      onClick={handleNameClick}
                    />
                  </p>
                )}

                {media && (
                  <p className="list-type2-item-header__text">
                    {hasMediaLink ? (
                      <Button
                        elem="a"
                        url={'#!'}
                        label={media}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-text'}
                        onClick={handleSubNameClick}
                      />
                    ) : (
                      <span className="mr-4">{media}</span>
                    )}

                    <span>
                      {department ? department + ' ' : ''}
                      {position}
                    </span>
                  </p>
                )}

                {partTags && partTags.length > 0 && (
                  <p className="list-type2-item-header__text">{partTags.join(', ')}</p>
                )}
              </div>
            </div>
          </li>
        </ul>
        {relatedNews && relatedNews.length > 0 && (
          <MbPeopleListItemNews
            item={item}
            index={index}
            onShowRelatedNews={onShowRelatedNews}
            onShowRelatedNewsMore={onShowRelatedNewsMore}
            onSelectItem={onSelectItem}
          />
        )}
      </div>
    </li>
  )
}

export default MbPeopleListItem
