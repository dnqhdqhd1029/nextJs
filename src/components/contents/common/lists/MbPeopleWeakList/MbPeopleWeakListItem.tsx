import Button from '~/components/common/ui/Button'
import IcoAvatar from '~/components/common/ui/IcoAvatar'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import type { PeopleWeakListItem } from '~/types/contents/Common'

interface Props {
  item: PeopleWeakListItem
  onNameClick?: (item: PeopleWeakListItem) => void
  onSubNameClick?: (item: PeopleWeakListItem) => void
}

const MbPeopleWeakListItem = ({ item, onNameClick, onSubNameClick }: Props) => {
  const { name, imageSrc, imageStyle, subName, department, hasSubNameLink, tags } = item

  const handleNameClick = (item: PeopleWeakListItem) => {
    onNameClick && onNameClick(item)
  }

  const handleSubNameClick = (item: PeopleWeakListItem) => {
    hasSubNameLink && onSubNameClick && onSubNameClick(item)
  }

  return (
    <li>
      <div className="list-type3__item">
        <ul className="list-type3__item-list">
          <li className="list-type3__item-img">
            {imageSrc ? (
              <div className="list-type3__img">
                <img
                  src={imageSrc}
                  alt={name}
                  className="list-type3__img-ratio"
                />
              </div>
            ) : (
              <IcoAvatar
                label={'이미지없음'}
                icoData={icoSvgData.personFill}
                size={'s48'}
                icoSize={'s24'}
              />
            )}
          </li>
          <li className="list-type3__item-contents">
            <p className="list-type3-contents__text-name">
              <Button
                elem="button"
                label={name ?? ''}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() => handleNameClick(item)}
              />
            </p>
            <p className="list-type3-contents__text">
              {subName && (
                <>
                  {hasSubNameLink ? (
                    <Button
                      elem="a"
                      url={'#!'}
                      label={subName ?? ''}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-text'}
                      onClick={() => handleSubNameClick}
                    />
                  ) : (
                    <span className="mr-4">{subName}</span>
                  )}

                  {department && <span>{department}</span>}
                </>
              )}
            </p>
            {tags && <p className="list-type3-contents__text">{tags}</p>}
          </li>
        </ul>
      </div>
    </li>
  )
}

export default MbPeopleWeakListItem
