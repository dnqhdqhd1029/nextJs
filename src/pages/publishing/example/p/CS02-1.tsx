/**
 * @file CS02-1.tsx
 * @description CS02-1 페이지
 */

import Image from 'next/image'

import tempImg from '/public/assets/png/temp_600x400_g.png'
import Button from '~/publishing/components/common/ui/Button'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1 type-max-w1400">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="customer-center__section">
              <div className="customer-detail__section">
                <div className="customer-detail__header">
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
                      <h2 className="common-title__title">도움말</h2>
                    </div>
                  </div>
                </div>
                <div className="customer-detail__group">
                  <div className="customer-detail__contents">
                    <div className="customer-detail-contents__section">
                      <div className="customer-detail-contents__group">
                        {/* 타이틀 */}
                        <h2>언론인 목록 만들기</h2>
                        <p>
                          미디어 목록을 보는 데 사용할 수 있는 몇 가지 옵션이 있습니다. 이 옵션을 사용하면 목록에 있는
                          미디어 연락처 또는 콘센트와 관련된 데이터를 보는 방법을 지정할 수 있습니다 . 첫 번째 보기 옵션
                          세트는 내 목록 페이지의 오른쪽 상단에서 찾을 수 있습니다. 여기에서 결과를 목록 또는 분석(차트
                          대시보드)으로 볼 수 있는 선택 사항을 찾을 수 있습니다. 이 두 가지 보기 모두 아래에서 더 자세히
                          설명됩니다.
                        </p>

                        {/* 서브타이틀 */}
                        <h3>목록 시작하기</h3>
                        <p>
                          미디어 목록을 보는 데 사용할 수 있는 몇 가지 옵션이 있습니다. 이 옵션을 사용하면 목록에 있는
                          미디어 연락처 또는 콘센트와 관련된 데이터를 보는 방법을 지정할 수 있습니다 . 첫 번째 보기 옵션
                          세트는 내 목록 페이지의 오른쪽 상단에서 찾을 수 있습니다. 여기에서 결과를 목록 또는 분석(차트
                          대시보드)으로 볼 수 있는 선택 사항을 찾을 수 있습니다. 이 두 가지 보기 모두 아래에서 더 자세히
                          설명됩니다.
                        </p>
                        <figure>
                          <Image
                            src={tempImg}
                            width={600}
                            height={400}
                            alt="temp 이미지"
                          />
                        </figure>
                      </div>
                      <div className="customer-detail-contents__footer">
                        <p className="customer-detail-contents-footer__text">도움이 되었나요?</p>
                        <div className="customer-detail-contents-footer__buttons">
                          <Button
                            label={'예'}
                            cate={'default-ico-text'}
                            size={'m'}
                            color={'outline-secondary'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.likeYes}
                          />
                          <Button
                            label={'아니오'}
                            cate={'default-ico-text'}
                            size={'m'}
                            color={'outline-secondary'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.likeNo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="customer-detail__aside">
                    <ul className="customer-detail-menu__depth1">
                      <li>
                        {/* 클릭 시, is-opened */}
                        <button
                          type="button"
                          className="customer-detail-menu__button is-opened"
                        >
                          <span className="customer-detail-menu__text">언론인</span>
                          <span className="customer-detail-menu__ico">
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </span>
                        </button>
                        <ul className="customer-detail-menu__depth2">
                          <li>
                            {/* 선택 시, is-selected */}
                            <button
                              type="button"
                              className="customer-detail-menu__button is-selected"
                            >
                              <span className="customer-detail-menu__text">언론인 목록 만들기</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 맞춤 검색</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 목록 만들기</span>
                            </button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="customer-detail-menu__button"
                        >
                          <span className="customer-detail-menu__text">미디어</span>
                          <span className="customer-detail-menu__ico">
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </span>
                        </button>
                        <ul className="customer-detail-menu__depth2">
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 목록 만들기</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 맞춤 검색</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 목록 만들기</span>
                            </button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="customer-detail-menu__button"
                        >
                          <span className="customer-detail-menu__text">모니터링</span>
                          <span className="customer-detail-menu__ico">
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </span>
                        </button>
                        <ul className="customer-detail-menu__depth2">
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 목록 만들기</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 맞춤 검색</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 목록 만들기</span>
                            </button>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="customer-detail-menu__button"
                        >
                          <span className="customer-detail-menu__text">활동</span>
                          <span className="customer-detail-menu__ico">
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </span>
                        </button>
                        <ul className="customer-detail-menu__depth2">
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 목록 만들기</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 맞춤 검색</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="customer-detail-menu__button"
                            >
                              <span className="customer-detail-menu__text">언론인 목록 만들기</span>
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT6'
