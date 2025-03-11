/**
 * @file index.tsx
 * @description  미디어 뉴스 리스트 페이지
 */
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import tempImg from '/public/assets/png/temp.jpg'
import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import SharePopup from '~/publishing/components/contents/media/popup/SharePopup'
const Sample = () => {
  const [isOpen, setIsOpen] = useState({
    SharePopup: false,
  })
  const router = useRouter()

  const togglePopup = (popupName: any, state: any) => {
    setIsOpen(prev => ({ ...prev, [popupName]: state }))
  }

  const tabs = [{ name: '언론인' }, { name: '미디어' }, { name: '트렌드' }, { name: '보도자료' }, { name: '인사' }]

  return (
    <>
      <div className="mb-container">
        <div className="mb-common-inner sp-px-0  overflow-y">
          <div className="mb-contents  ">
            <div className="media-wrap max-w960 pb-0">
              <div className="detail-section">
                <div className="detail-section__title">
                  <div className="category">
                    <Button
                      label={'인사'}
                      cate={'link-text'}
                      size={'m'}
                      color={'primary'}
                    />
                  </div>
                  <dl>
                    <dt>
                      [특집] 전문기자 뽑는다고 ‘경알못’이 해결되나?라고 묻거나 전문기자가 지금 언론사에
                      필요하냐?묻거나[특집] 전문기자 뽑는다고 ‘경알못’이 해결되나?라고 묻거나 전문기자가 지금 언론사에
                      필요하냐?묻거나
                    </dt>
                    <dd>
                      <div className="flex-just-between">
                        <span className="date">2024-06-18 15:10</span>
                        <Button
                          label={'공유하기'}
                          cate={'ico-only'}
                          size={'es'}
                          color={'dark'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.share}
                          icoSize={24}
                          onClick={() => togglePopup('SharePopup', true)}
                        />
                      </div>
                    </dd>
                  </dl>
                </div>
                <div className="detail-section__contents">
                  <figure>
                    <Image
                      src={tempImg}
                      width={600}
                      height={400}
                      alt="temp 이미지"
                    />
                  </figure>

                  <p>
                    고 신임 위원장은 “참여 민주주의의 한 축인 지역언론이 여러 어려움에 처해있다”며 “우리 회원사들이 힘을
                    합쳐 지속가능한 지역언론 발전 방안을 모색해 나가자”고 강조했다. 고 신임 위원장은 “참여 민주주의의 한
                    축인 지역언론이 여러 어려움에 처해있다”며 “우리 회원사들이 힘을 합쳐 지속가능한 지역언론 발전 방안을
                    모색해 나가자”고 강조했다
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-contents bg-gray--150  ">
            <div className="media-wrap max-w960">
              <div className="detail-section">
                <div className="flex-just-between align-items-center">
                  <div>최신글</div>
                  <div className="navigation flex-just-end">
                    <Pagination cate={'n2'} />
                  </div>
                </div>
                <div className="detail-section__list">
                  <div className="list-card-type2__section">
                    <ul className="list-card-type2__list">
                      <li>
                        <button
                          type="button"
                          onClick={() => router.push('/publishing/media/detail')}
                        >
                          <div className="temp">
                            <img
                              src="/assets/png/temp.jpg"
                              alt=""
                            />
                          </div>
                          <div className="date">
                            <span>2024-11-30</span>
                            <Button
                              label={'인사'}
                              cate={'link-text'}
                              size={'m'}
                              color={'primary'}
                            />
                          </div>
                          <dl>
                            <dt>
                              [특집] 전문기자 뽑는다고 ‘경알못’이 해결되나?라고 묻거나 전문기자가 지금 언론사에
                              필요하냐?묻거나[특집] 전문기자 뽑는다고 ‘경알못’이 해결되나?라고 묻거나 전문기자가 지금
                              언론사에 필요하냐?묻거나
                            </dt>
                            <dd>
                              조선일보 김민철 논설위원이 사회정책부장으로 선임됐다. 김민철 신임 부장은 1992년 조선일보에
                              입사해 정치부·사회정책부 등을 거쳐 2015년 …
                            </dd>
                          </dl>
                        </button>
                      </li>

                      <li>
                        <button type="button">
                          <div className="temp">
                            <img
                              src="/assets/png/temp.jpg"
                              alt=""
                            />
                          </div>
                          <div className="date">
                            <span>2024-11-30</span>
                            <Button
                              label={'언론인'}
                              cate={'link-text'}
                              size={'m'}
                              color={'primary'}
                            />
                          </div>
                          <dl>
                            <dt>[특집] 전문기자 뽑는다고 ‘경알못’이 해결되나?라고 묻거나 전문기자가 지금 언론사에</dt>
                            <dd>
                              조선일보 김민철 논설위원이 사회정책부장으로 선임됐다. 김민철 신임 부장은 1992년 조선일보에
                            </dd>
                          </dl>
                        </button>
                      </li>
                      <li>
                        <button type="button">
                          <div className="temp">
                            <img
                              src="/assets/png/temp.jpg"
                              alt=""
                            />
                          </div>
                          <div className="date">
                            <span>2024-11-30</span>
                            <Button
                              label={'언론인'}
                              cate={'link-text'}
                              size={'m'}
                              color={'primary'}
                            />
                          </div>
                          <dl>
                            <dt>언론인 인사 – 1월 1주 2025년</dt>
                            <dd>
                              ▲ KBS △ 부산방송총국장 박진현 △ 창원방송총국장 하태석 △ 광주방송총국장 김한석 △
                              대전방송총국장 박재용 △ 청주방송총국장 백성철
                            </dd>
                          </dl>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="detail-section__profile">
                  <div className="flex-just-cen ">
                    <Button
                      label={'인증회원'}
                      cate={'ico-only'}
                      size={'m'}
                      color={'blue-700'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.patchCheckFill}
                      icoSize={32}
                    />
                    <div className="title ml-5">언론인이신가요? 프로필을 등록해 혜택을 누리세요.</div>
                  </div>
                  <div className="mt-10">
                    홍보 담당자에게 나를 쉽게 알리고 원하는 분야의 보도자료를 편리하게 받아볼 수 잇습니다.
                  </div>
                  <div className="flex-just-cen mt-20">
                    <Button
                      label={'프로필 등록하기'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                      onClick={() => router.push('/publishing/join')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SharePopup
        isOpen={isOpen.SharePopup}
        onClose={() => togglePopup('SharePopup', false)}
      />
    </>
  )
}

export default Sample
