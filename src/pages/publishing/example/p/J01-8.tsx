/**
 * @file J01-8.tsx
 * @description J01-8 페이지
 */

import Image from 'next/image'

import tempImg from '/public/assets/png/temp.jpg'
import temp2Img from '/public/assets/png/temp2.jpg'
import Button from '~/publishing/components/common/ui/Button'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="notification-header__section colors-alert-border button-type1">
        <div className="notification-header__group">
          <div className="notification-header__contents">
            <p>이름과 이메일이 동일한 시스템 제공 언론인이 있습니다. </p>

            <p>
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'장지승'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />{' '}
              <span className="color-secondary">서울경제신문 편집국 기자</span>
            </p>

            <p>아래 인물을 삭제하겠습니까?</p>
            <Button
              label={'삭제하기'}
              cate={'default'}
              size={'s'}
              color={'dark'}
            />
          </div>
        </div>
        <div className="notification-header__btn">
          <Button
            label={'삭제'}
            cate={'ico-only'}
            size={'s24'}
            color={'secondary'}
            icoLeft={true}
            icoLeftData={icoSvgData.iconCloseButton}
            icoSize={16}
          />
        </div>
      </div>
      <code
        className="guide__code"
        style={{ marginTop: '50px' }}
      >
        IcoAvatar(프로필) : type-person(사람) / type-corp(기업) 구분
      </code>
      <div style={{ padding: '50px' }}>
        <div className="profile__area">
          {/* 사람 프로필 */}
          <div className="profile-img__group type-person">
            <div className="profile__img">
              <IcoAvatar
                label={'아이콘이름'}
                icoData={icoSvgData.personFill}
                size={'s112'}
                icoSize={'s64'}
              />
            </div>

            <p className="profile-img__ico">
              <span className="hidden">잠금</span>
            </p>

            <div className="select__section select-type1-small select-ico-only is-show">
              <Button
                label={'에디터'}
                cate={'ico-only'}
                size={'s32'}
                color={'white'}
                icoLeft={true}
                icoLeftData={icoSvgData.pencilFill2}
                icoSize={32}
              />

              <div className="select-option__section">
                <div className="select-option__area">
                  <ul className="select-option__group">
                    <li>
                      <button className="select-option__item">
                        <span className="select-option__item-text">사진 등록</span>
                      </button>
                    </li>
                    <li>
                      <button className="select-option__item">
                        <span className="select-option__item-text">사진 삭제</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="profile__group">
            <h3 className="profile__name">
              <strong>서정민</strong>
              <IcoSvg data={icoSvgData.patchCheckFill} />
            </h3>

            <div className="profile__team">
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'중앙일보'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
              <span>미디어</span>
              <Button
                label={'1개 +'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
            </div>

            {/* <!-- 1개 + 영역 클릭 후 */}
            <p className="profile__team">
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'중앙일보'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
              <span>종합일간신문</span>
            </p>
            <p className="profile__team">
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'중앙일보'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
              <span>업계잡지</span>
            </p>
            {/* 클릭 후 --> */}

            <p className="profile__team">
              <span>문화부 기자 겸 부데스크</span>
            </p>
            <p className="profile__btn">
              <Button
                label={'목록에 저장'}
                cate={'default'}
                size={'m'}
                color={'primary'}
              />
            </p>
          </div>
        </div>
      </div>
      <div style={{ padding: '50px' }}>
        <div className="profile__area">
          {/* 사람 프로필 */}
          <div className="profile-img__group type-person">
            <div className="profile__img">
              <Image
                src={tempImg}
                width={500}
                height={500}
                alt="temp 프로필 이미지"
              />
            </div>

            <p className="profile-img__ico">
              <span className="hidden">잠금</span>
            </p>

            <div className="select__section select-type1-small select-ico-only is-show">
              <Button
                label={'에디터'}
                cate={'ico-only'}
                size={'s32'}
                color={'white'}
                icoLeft={true}
                icoLeftData={icoSvgData.pencilFill2}
                icoSize={32}
              />

              <div className="select-option__section">
                <div className="select-option__area">
                  <ul className="select-option__group">
                    <li>
                      <button className="select-option__item">
                        <span className="select-option__item-text">사진 등록</span>
                      </button>
                    </li>
                    <li>
                      <button className="select-option__item">
                        <span className="select-option__item-text">사진 삭제</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="profile__group">
            <h3 className="profile__name">
              <strong>서정민</strong>
              <IcoSvg data={icoSvgData.patchCheckFill} />
            </h3>

            <div className="profile__team">
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'중앙일보'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
              <span>미디어</span>
              <Button
                label={'1개 +'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
            </div>

            {/* <!-- 1개 + 영역 클릭 후 */}
            <p className="profile__team">
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'중앙일보'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
              <span>종합일간신문</span>
            </p>
            <p className="profile__team">
              <Button
                elem="a"
                url={'https://www.naver.com/'}
                label={'중앙일보'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
              />
              <span>업계잡지</span>
            </p>
            {/* 클릭 후 --> */}

            <p className="profile__team">
              <span>문화부 기자 겸 부데스크</span>
            </p>
            <p className="profile__btn">
              <Button
                label={'저장됨'}
                cate={'check-number'}
                size={'m'}
                color={'primary'}
                count={10}
                icoLeft={true}
                icoLeftData={icoSvgData.checkThick}
              />
            </p>
          </div>
        </div>
      </div>
      <div style={{ padding: '50px' }}>
        <div className="profile__area">
          {/* 기업 프로필 */}
          <div className="profile-img__group type-corp">
            <div className="profile__img">
              <IcoAvatar
                label={'기업 아이콘'}
                icoData={icoSvgData.company}
                size={'s112'}
                icoSize={'s64'}
              />
            </div>

            <p className="profile-img__ico">
              <span className="hidden">잠금</span>
            </p>

            <div className="select__section select-type1-small select-ico-only is-show">
              <Button
                label={'에디터'}
                cate={'ico-only'}
                size={'s32'}
                color={'white'}
                icoLeft={true}
                icoLeftData={icoSvgData.pencilFill2}
                icoSize={32}
              />

              <div className="select-option__section">
                <div className="select-option__area">
                  <ul className="select-option__group">
                    <li>
                      <button className="select-option__item">
                        <span className="select-option__item-text">사진 등록</span>
                      </button>
                    </li>
                    <li>
                      <button className="select-option__item">
                        <span className="select-option__item-text">사진 삭제</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="profile__group">
            <h3 className="profile__name type-arrow">
              <Button
                elem="a"
                url={'#!'}
                label={'중앙일보'}
                cate={'link-ico-text'}
                size={'es'}
                color={'body-text'}
                icoRight={true}
                icoRightData={icoSvgData.chevronThickRight}
                icoSize={14}
              />
            </h3>
            <p className="profile__team">
              <span>미디어 가치</span>
              <span>62,510</span>
            </p>
          </div>
        </div>
      </div>
      <div style={{ padding: '50px' }}>
        <div className="profile__area">
          {/* 기업 프로필 */}
          <div className="profile-img__group type-corp">
            <div className="profile__img">
              <Image
                src={temp2Img}
                width={500}
                height={500}
                alt="temp 프로필 이미지"
              />
            </div>

            <p className="profile-img__ico">
              <span className="hidden">잠금</span>
            </p>

            <div className="select__section select-type1-small select-ico-only is-show">
              <Button
                label={'에디터'}
                cate={'ico-only'}
                size={'s32'}
                color={'white'}
                icoLeft={true}
                icoLeftData={icoSvgData.pencilFill2}
                icoSize={32}
              />

              <div className="select-option__section">
                <div className="select-option__area">
                  <ul className="select-option__group">
                    <li>
                      <button className="select-option__item">
                        <span className="select-option__item-text">사진 등록</span>
                      </button>
                    </li>
                    <li>
                      <button className="select-option__item">
                        <span className="select-option__item-text">사진 삭제</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="profile__group">
            <h3 className="profile__name type-arrow">
              <Button
                elem="a"
                url={'#!'}
                label={'중앙일보'}
                cate={'link-ico-text'}
                size={'es'}
                color={'body-text'}
                icoRight={true}
                icoRightData={icoSvgData.chevronThickRight}
                icoSize={14}
              />
            </h3>
            <p className="profile__team">
              <span>미디어 가치</span>
              <span>62,510</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
