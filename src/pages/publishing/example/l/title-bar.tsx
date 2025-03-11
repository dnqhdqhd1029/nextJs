/**
 * @file title-bar.tsx
 * @description title-bar 페이지
 */

import { useState } from 'react'

import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  const [search, setSearch] = useState(false)

  return (
    <>
      <div className="common-title__section">
        <div className="common-title__group">
          <div className="common-title__path">
            <Button
              label={'arrowLeft'}
              cate={'ico-only'}
              size={'s'}
              color={'body-text'}
              icoLeft={true}
              icoLeftData={icoSvgData.arrowLeft}
              icoSize={24}
            />
          </div>
          <h2 className="common-title__title">회원 정보</h2>
          <div className="common-title__buttons">
            <Button
              label={'클립북에 추가'}
              cate={'default'}
              size={'m'}
              color={'primary'}
            />
          </div>
        </div>
      </div>

      <div style={{ height: '30px' }}></div>

      <div className="common-title__section">
        <div className="common-title__group">
          <h2 className="common-title__title">회원 정보</h2>
          <div className="common-title__buttons">
            <div className="steps__group">
              <ul className="steps__list">
                <li className="is-active">
                  <p className="steps__text">파일</p>
                </li>
                <li>
                  <p className="steps__text">목록</p>
                </li>
                <li>
                  <p className="steps__text">완료</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '30px' }}></div>

      <div className="common-title__section">
        <div className="common-title__group">
          <div className="common-title__ico type-check">
            <IcoSvg data={icoSvgData.checkCircleFill} />
          </div>
          <h2 className="common-title__title">회원 정보</h2>
        </div>
      </div>

      <div style={{ height: '30px' }}></div>

      <div className="common-title__section">
        <div className="common-title__group">
          <div className="common-title__path">
            <Button
              label={'arrowLeft'}
              cate={'ico-only'}
              size={'s'}
              color={'body-text'}
              icoLeft={true}
              icoLeftData={icoSvgData.arrowLeft}
              icoSize={24}
            />
          </div>
          <h2 className="common-title__title">회원 정보</h2>
          <div className="common-title__buttons type-search">
            {search ? (
              <>
                <FormInputSearch />
                <Button
                  label={'정렬'}
                  cate={'ico-only'}
                  size={'s'}
                  color={'transparent'}
                  icoLeft={true}
                  icoLeftData={icoSvgData.iconCloseButton2}
                  icoSize={16}
                  onClick={() => setSearch(false)}
                />
              </>
            ) : (
              <Button
                label={'검색'}
                cate={'ico-only'}
                size={'s'}
                color={'body-text'}
                icoLeft={true}
                icoLeftData={icoSvgData.search}
                icoSize={18}
                onClick={() => setSearch(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
