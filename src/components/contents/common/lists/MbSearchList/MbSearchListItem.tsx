/**
 * @file MbSearchList.tsx
 * @description 검색결과형 목록
 */

import { ChangeEvent, Fragment, MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import IcoAvatar from '~/components/common/ui/IcoAvatar'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import type { SearchListItem } from '~/types/contents/Common'
import { getCurrencyFormat } from '~/utils/common/number'
import { getReplacedStringByPatterns } from '~/utils/common/string'

interface Props {
  item: SearchListItem
  onCheck: (e: ChangeEvent<HTMLInputElement>, item: SearchListItem) => void
  onMediaTitleClick: (item: SearchListItem) => void
  onAuthorClick: (pid: number, mediaId: number) => void
  onItemSelected?: (item: SearchListItem) => void
}

const MbSearchList = ({ item, onCheck, onAuthorClick, onMediaTitleClick, onItemSelected }: Props) => {
  const {
    id,
    isChecked,
    isSelected,
    isDisabled,
    title,
    titleLink,
    media,
    mediaId,
    authors,
    date,
    hasImage,
    hasVideo,
    mediaValue,
    tone,
    contents,
    searchWord,
    searchWords,
    isPersonal,
  } = item

  // @ts-ignore
  const [filteredTitle, setFilteredTitle] = useState<TrustedHTML>(title)
  // @ts-ignore
  const [filteredContents, setFilteredContents] = useState<TrustedHTML | undefined>(contents)

  const handleItemClick = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()

    onItemSelected && onItemSelected(item)
  }

  const handleMediaTitleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    onMediaTitleClick && onMediaTitleClick(item)
  }

  const handleAuthorClick = (e: MouseEvent<HTMLButtonElement>, pid: number, mediaId: number) => {
    e.stopPropagation()

    onAuthorClick && onAuthorClick(pid, mediaId)
  }

  const handleTitleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (!searchWord && !searchWords) {
      return
    }

    if (searchWord) {
      setFilteredTitle(
        // @ts-ignore
        getReplacedStringByPatterns({
          sentence: title,
          replaceString: searchWord,
          replacePatternFront: '<b class="print">',
          replacePatternBack: '</b>',
        })
      )
    }

    if (searchWords) {
      let newTitle = title
      searchWords.forEach(word => {
        newTitle = getReplacedStringByPatterns({
          sentence: newTitle,
          replaceString: word,
          replacePatternFront: '<b class="print">',
          replacePatternBack: '</b>',
        })
      })
      // @ts-ignore
      setFilteredTitle(newTitle)
    }
  }, [title])

  useEffect(() => {
    if ((!searchWord && !searchWords) || !contents) {
      return
    }

    if (searchWord) {
      setFilteredContents(
        // @ts-ignore
        getReplacedStringByPatterns({
          sentence: contents,
          replaceString: searchWord,
          replacePatternFront: '<b class="print">',
          replacePatternBack: '</b>',
        })
      )
    }

    if (searchWords) {
      let newContents = ''
      searchWords.forEach(word => {
        newContents = getReplacedStringByPatterns({
          sentence: contents,
          replaceString: word,
          replacePatternFront: '<b class="print">',
          replacePatternBack: '</b>',
        })
      })
      // @ts-ignore
      setFilteredContents(newContents)
    }
  }, [contents])

  return (
    <li>
      {/* 선택 시, is-selected 클래스 추가 */}
      <div className={cn('list-type8-item__section', { 'is-selected': isSelected })}>
        <ul className="list-type8-item__list">
          <li className="list-type8-item__check">
            <FormInputBtn
              type="checkbox"
              name={id}
              id={id}
              label=""
              checked={isChecked}
              disabled={isDisabled}
              onChange={e => onCheck(e, item)}
            />
          </li>
          <li
            className="list-type8-item__contents cursor-pointer"
            onClick={handleItemClick}
          >
            <ul className="interval-mt8">
              <li>
                <div className="list-type8-item__header">
                  <div className="list-type8-item-header__ico">
                    {hasImage && <IcoSvg data={icoSvgData.image} />}
                    {hasVideo && <IcoSvg data={icoSvgData.videoPlay} />}
                  </div>
                  {titleLink ? (
                    <a
                      target="_blank"
                      href={titleLink}
                      rel="noopener noreferrer"
                      className="list-type8-item-header__title"
                      dangerouslySetInnerHTML={{ __html: `${id}::${filteredTitle}` }}
                      onClick={handleTitleLinkClick}
                    />
                  ) : (
                    <span
                      className="list-type8-item-header__title no-underline cursor-default"
                      dangerouslySetInnerHTML={{ __html: `null ${id}::${filteredTitle}` }}
                    />
                  )}

                  {isPersonal && (
                    <Tooltips
                      tooltipId={'tt10-1'}
                      tooltipPlace={'top'}
                      tooltipHtml={'개인 추가 뉴스 표시 아이콘'}
                      tooltipComponent={
                        <IcoAvatar
                          label={'이미지없음'}
                          icoData={icoSvgData.lockFill}
                          size={'s48'}
                          icoSize={'s24'}
                        />
                      }
                    />
                  )}
                </div>
              </li>
              <li>
                <ul className="list-type8-item__info">
                  <li>
                    <p className="font-body__regular">{date}</p>
                    <ul className="list-type8-item__links">
                      {media && media !== '' && (
                        <li>
                          <Button
                            elem="button"
                            label={media}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-text'}
                            onClick={handleMediaTitleClick}
                          />
                        </li>
                      )}
                      {authors && authors.length > 0 && (
                        <li>
                          <span className="list-type8-item__text">저자</span>
                          {authors.map(author => (
                            <Fragment key={`news-result-item-${author.id}-${uuid()}`}>
                              {author.journalistInfo ? (
                                <Button
                                  elem="button"
                                  label={author.name}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-text'}
                                  onClick={e =>
                                    handleAuthorClick(e, author.id, Number(author.journalistInfo?.media?.main?.id))
                                  }
                                  className="mr-6"
                                />
                              ) : (
                                <span className="mr-6">{author.name}</span>
                              )}
                            </Fragment>
                          ))}
                        </li>
                      )}
                    </ul>
                  </li>
                  <li>
                    {mediaValue !== undefined && (
                      <p className="list-type8-item-header__text">
                        <span className="media-index">
                          <IcoSvg data={icoSvgData.barChart} />
                        </span>{' '}
                        {getCurrencyFormat(mediaValue)}
                      </p>
                    )}
                    {tone && (
                      <p className="list-type8-item__text-group">
                        <span className="list-type8-item__text">논조:</span>
                        <span className="list-type8-item__text">{tone}</span>
                      </p>
                    )}
                  </li>
                </ul>
              </li>
              {/*@ts-ignore*/}
              {filteredContents && filteredContents !== '' && (
                <li>
                  <div
                    className="list-type8-item__desc"
                    dangerouslySetInnerHTML={{ __html: filteredContents }}
                  ></div>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default MbSearchList
