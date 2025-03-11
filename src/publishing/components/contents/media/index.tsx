/**
 * @file index.tsx
 * @description  미디어 뉴스 리스트 페이지
 */

import { useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import Pagination from '~/publishing/components/common/ui/Pagination'

const Sample = () => {
  const [isOpen, setIsOpen] = useState({
    PasswordReset: false,
    PasswordCheck: false,
  })
  const router = useRouter()

  const togglePopup = (popupName: any, state: any) => {
    setIsOpen(prev => ({ ...prev, [popupName]: state }))
  }

  const tabs = [{ name: '언론인' }, { name: '미디어' }, { name: '트렌드' }, { name: '보도자료' }, { name: '인사' }]

  return (
    <>
      <div className="mb-container">
        <div className="mb-common-inner">
          <div className="mb-contents max-w960  bg-gray--150">
            <div className="media-wrap">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">미디어 소식</h2>
                </div>
                <div className="common-title__group">
                  <div className="common-title__title__description">한눈에 중요한 소식을 빠르고 쉽게 만나보세요</div>
                </div>
              </div>

              <div className="flex-wrap flex-just-between search-section">
                <div className="tabs__section type1-small">
                  <div className="tabs-menu__group">
                    <ul className="tabs-menu__list">
                      {tabs.map((tab, i) => {
                        return (
                          <li
                            className={`${i === 0 ? 'is-active' : ''}`}
                            key={i}
                          >
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">{tab.name}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="tabs-panel__section">
                    <div className="tabs-panel__group"></div>
                  </div>
                </div>
                <FormInputSearch placeholder={'검색'} />
              </div>
              {/*검색결과*/}

              {/*<div className="flex-wrap flex-just-between search-section">
                <div className="result__txt">‘경기인터넷신문’ 검색 결과</div>
                <FormInputSearch placeholder={'검색'} />
              </div>

              <div className="search-result">
                <div className="result__txt">검색 결과가 없습니다.</div>
              </div>*/}

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
                        <dd>조선일보 김민철 논설위원이 사회정책부장으로 선임됐다.</dd>
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
                          ▲ KBS △ 부산방송총국장 박진현 △ 창원방송총국장 하태석 △ 광주방송총국장 김한석 △ 대전방송총국장
                          박재용 △ 청주방송총국장 백성철
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
                          label={'미디어'}
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
                          ▲ KBS △ 부산방송총국장 박진현 △ 창원방송총국장 하태석 △ 광주방송총국장 김한석 △ 대전방송총국장
                          박재용 △ 청주방송총국장 백성철
                        </dd>
                      </dl>
                    </button>
                  </li>
                </ul>
              </div>

              <div className="flex-just-cen sp-my-5">
                <Pagination cate={'n3'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
