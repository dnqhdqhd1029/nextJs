/**
 * @file J13.tsx
 * @description J13 페이지
 */

import LnbFilter from '~/publishing/components/common/layouts/LnbFilter'
import Button from '~/publishing/components/common/ui/Button'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tag from '~/publishing/components/common/ui/Tag'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-lnb__section type-w1">
          <LnbFilter />
        </div>
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__header">
              <div className="search-result__header">
                <ul className="interval-mt10">
                  <li>
                    <div className="search-result__header-title">
                      <h2 className="font-heading--h6">미디어 검색</h2>
                      <Button
                        label={'검색 수정'}
                        cate={'link-text-arrow'}
                        size={'m'}
                        color={'primary'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.chevronLeft}
                      />
                      <div className="search-result__header-buttons">
                        {/* 버튼 검색 저장일 때 */}
                        <Button
                          label={'검색 저장'}
                          cate={'default'}
                          size={'s'}
                          color={'outline-secondary'}
                        />

                        {/* 드롭다운 형태 검색 저장일 때 */}
                        {/* <div className="select__section select-type1-small select-line select-align-right">
                          <button className="select__label">
                            <span className="select__label-text">검색 저장</span>
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </button>

                          <div className="select-option__section">
                            <div className="select-option__area">
                              <ul className="select-option__group">
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">이메일 보내기</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">보도자료 배포</span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </li>
                  <li>
                    {/* 
                        [D] 
                          1. 키워드 마지막 영역에 is-finished 클래스 추가
                               ㄴ 단, 제일 마지막 키워드에선 제거 (ex. 프로젝트명 참고)
                          
                          2. 2줄 이상일 땐 is-only 클래스 삭제
                          3. 2줄 이상일 땐 on/off 버튼 보여지게 => header-tags__button
                      */}
                    <div className="search-result__header-tags">
                      <div className="header-tags__group">
                        <div className="header-tags__tit">분야</div>
                        <div className="header-tags__tag">
                          <Tag
                            label={'반도체'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>
                        <div className="header-tags__tag is-finished">
                          <Tag
                            label={'디스플레이'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>

                        <div className="header-tags__tit">미디어 유형</div>
                        <div className="header-tags__tag is-finished">
                          <Tag
                            label={'업계신문'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>

                        <div className="header-tags__tit">지역</div>
                        <div className="header-tags__tag">
                          <Tag
                            label={'서울 전체'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>
                        <div className="header-tags__tag">
                          <Tag
                            label={'경남 전체'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>
                        <div className="header-tags__tag">
                          <Tag
                            label={'전주시'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>
                        <div className="header-tags__tag is-finished">
                          <Tag
                            label={'부산광역시'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>

                        <div className="header-tags__tit">직종</div>
                        <div className="header-tags__tag is-finished">
                          <Tag
                            label={'기자'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>

                        <div className="header-tags__tit">발행 주기</div>
                        <div className="header-tags__tag">
                          <Tag
                            label={'주간'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>
                        <div className="header-tags__tag is-finished">
                          <Tag
                            label={'월간'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>

                        <div className="header-tags__tit">프로젝트명</div>
                        <div className="header-tags__tag">
                          <Tag
                            label={'해외 바이어 보도자료 분석'}
                            cate={'n2'}
                            shape={'round'}
                            close={true}
                          />
                        </div>
                      </div>
                      <div className="header-tags__button">
                        <button type="button">
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="search-result__header-sort">
                      <FormInputBtn
                        type="checkbox"
                        name="total1"
                        id="total1"
                        label="2명 / 총 240명"
                      />
                      <div className="header-sort__action">
                        <Button
                          label={'목록에 저장'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                          disabled={true}
                        />
                        <Button
                          label={'이메일 보내기'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                          disabled={true}
                        />
                        <Button
                          label={'보도자료 배포'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                          disabled={true}
                        />
                        <Button
                          label={'활동 추가'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-text'}
                          disabled={true}
                        />
                      </div>
                      <div className="header-sort__filter">
                        <Button
                          label={'검색'}
                          cate={'ico-only'}
                          size={'s'}
                          color={'body-text'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.search}
                          icoSize={18}
                        />
                        <div className="select__section select-type1-small select-ico-only select-align-right">
                          <button className="select__label ico-size24">
                            <span className="select__label-text">필터(내림차순)</span>
                            <IcoSvg data={icoSvgData.sortDown} />
                          </button>

                          <div className="select-option__section">
                            <div className="select-option__area">
                              <h6 className="select-option__group-title">정렬</h6>
                              <ul className="select-option__group">
                                <li>
                                  <button className="select-option__item is-selected">
                                    <span className="select-option__item-text">미디어 가치</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">관련성</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">이름</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">미디어명</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                              </ul>
                              <h6 className="select-option__group-title">순서</h6>
                              <ul className="select-option__group">
                                <li>
                                  <button className="select-option__item is-selected">
                                    <span className="select-option__item-text">내림차순</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <span className="select-option__item-text">오름차순</span>
                                    <span className="select-option__item-ico">
                                      <IcoSvg data={icoSvgData.checkThick} />
                                    </span>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-contents-layout__contents">
              <div className="search-result__contents">
                <div className="search-result__nodata">
                  <p className="font-body__regular">언론인 검색 결과가 없습니다.</p>
                  <Button
                    label={'다시 검색하기'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-secondary'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-aside__section type-w2"></div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
