/**
 * @file activity.tsx
 * @description activity 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">activity</h2>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. 1</h2>
          <div className="guide__group">
            <div className="activity-detail__section">
              <ul className="interval-mt28">
                <li>
                  <ul className="grid-col2 type-interval20">
                    <li>
                      <dl className="dl-table-type1__section">
                        <dt>
                          <p className="dl-table-type1__text">활동 유형</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">약속</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">상태</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">진행 중</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">날짜</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">2022-02-17 14:00</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">소유자</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            <Button
                              label={'홍길동'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">소유자</p>
                        </dt>
                        <dd>
                          <div className="d-select-type1__section">
                            <div className="select__section select-type2-primary">
                              <button className="select__label">
                                <span className="select__label-text">홍길동</span>
                                <IcoSvg data={icoSvgData.chevronDown} />
                              </button>

                              <div className="select-option__section">
                                <div className="select-option-search__section">
                                  <FormInputSearch placeholder={'검색'} />
                                </div>

                                <div className="select-option__area">
                                  <ul className="select-option__group">
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">김세연</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">이동욱</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item is-selected">
                                        <span className="select-option__item-text">홍길동</span>
                                      </button>
                                    </li>
                                    <li>
                                      <button className="select-option__item">
                                        <span className="select-option__item-text">최진욱</span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">수정자</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            <Button
                              elem="a"
                              url="#!"
                              label={'차예린'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">언론인</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            <li>
                              <Button
                                elem="a"
                                url="#!"
                                label={'서정민'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url="#!"
                                label={'김민석'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                            <li>
                              {/* 툴팁일 때 */}
                              <Tooltips
                                tooltipId={'tt1'}
                                tooltipPlace={'top'}
                                tooltipHtml={'중앙일보 사회부 기자'}
                                tooltipContents={'최서원'}
                                url="#!"
                              />
                            </li>
                          </ul>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">매체</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            <li>
                              <Button
                                elem="a"
                                url="#!"
                                label={'중앙일보'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url="#!"
                                label={'정보보안 전문 미디어'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                          </ul>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">첨부</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            <li>
                              <Button
                                elem="a"
                                url="#!"
                                label={'신제품 기획기사 관렴 미팅 어젠다.doc'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                          </ul>
                        </dd>
                      </dl>
                    </li>
                    <li>
                      <dl className="dl-table-type1__section">
                        <dt>
                          <p className="dl-table-type1__text">생성일</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">2021-11-30 09:45</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">수정일</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">2022-02-16 12:05</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">공유</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">수정</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">프로젝트</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            <li>
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'3분기 신제품 홍보'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                          </ul>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">태그</p>
                        </dt>
                        <dd>
                          <ul className="d-link__list">
                            <li>
                              <Button
                                elem="a"
                                url={'#!'}
                                label={'신제품'}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                              />
                            </li>
                          </ul>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="import-info__group">
                    <h6 className="import-info__title">본문</h6>
                    <div className="import-info__contents">컨텐츠 영역</div>
                  </div>
                </li>

                {/* 댓글 없을 때 + 댓글 버튼이 있을 때 */}
                <li>
                  <div className="d-tabs__group">
                    <div className="tabs__section type1-small">
                      <div className="tabs-menu__group">
                        <ul className="tabs-menu__list">
                          <li className="is-active">
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">댓글</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">이력</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs-panel__section">
                        <div className="tabs-panel__group">
                          <div className="d-tabs__nodata">이 활동에 작성된 댓글이 없습니다.</div>

                          {/* 댓글 버튼이 있을 때 */}
                          <div className="d-tabs-comment__button">
                            <Button
                              label={'댓글'}
                              cate={'default'}
                              size={'s'}
                              color={'outline-secondary'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 댓글 없을 때 + 댓글 쓸 때 */}
                <li>
                  <div className="d-tabs__group">
                    <div className="tabs__section type1-small">
                      <div className="tabs-menu__group">
                        <ul className="tabs-menu__list">
                          <li className="is-active">
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">댓글</span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">이력</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs-panel__section">
                        <div className="tabs-panel__group">
                          <div className="d-tabs__nodata">이 활동에 작성된 댓글이 없습니다.</div>

                          {/* 댓글 쓸 때 */}
                          <div className="d-tabs-comment__write">
                            <div className="textarea__area">
                              <FormTitle title="댓글" />
                              <div className="textarea__group">
                                <textarea rows={6} />
                              </div>
                            </div>
                            <div className="buttons__group type-right">
                              <Button
                                label={'취소'}
                                cate={'default'}
                                size={'s'}
                                color={'link-dark'}
                              />
                              <Button
                                label={'저장'}
                                cate={'default'}
                                size={'s'}
                                color={'primary'}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 댓글 있을 때 */}
                <li>
                  <div className="d-tabs__group">
                    <div className="tabs__section type1-small">
                      <div className="tabs-menu__group">
                        <ul className="tabs-menu__list">
                          <li className="is-active">
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">댓글</span>
                              <span className="tabs-menu__number">2 </span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">이력</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs-panel__section">
                        <div className="tabs-panel__group">
                          <div className="list-type6__section">
                            <ul className="list-type6__group">
                              <li>
                                <div className="list-type6-item__section">
                                  <p className="list-type6-item__text">
                                    기자 3명을 초대해 미팅하는 것으로 결정했습니다.
                                  </p>
                                  <p className="list-type6-item__info">
                                    <Button
                                      elem="a"
                                      url="#!"
                                      label={'홍길동'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />{' '}
                                    <span>2022-02-17 10:38</span>
                                  </p>
                                  <div className="list-type6-item__control">
                                    <Button
                                      label={'수정'}
                                      cate={'ico-only'}
                                      size={'s'}
                                      color={'secondary'}
                                      icoLeft={true}
                                      icoLeftData={icoSvgData.pencil}
                                      icoSize={16}
                                      title="수정"
                                    />
                                    <Button
                                      label={'삭제'}
                                      cate={'ico-only'}
                                      size={'s'}
                                      color={'secondary'}
                                      icoLeft={true}
                                      icoLeftData={icoSvgData.trash}
                                      icoSize={16}
                                      title="삭제"
                                    />
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="list-type6-item__section">
                                  <p className="list-type6-item__text">
                                    기자 3명을 초대해 미팅하는 것으로 결정했습니다.
                                  </p>
                                  <p className="list-type6-item__info">
                                    <Button
                                      elem="a"
                                      url="#!"
                                      label={'홍길동'}
                                      cate={'link-text'}
                                      size={'m'}
                                      color={'body-link'}
                                    />{' '}
                                    <span>2022-02-17 10:38</span>
                                  </p>
                                  <div className="list-type6-item__control">
                                    <Button
                                      label={'수정'}
                                      cate={'ico-only'}
                                      size={'s'}
                                      color={'secondary'}
                                      icoLeft={true}
                                      icoLeftData={icoSvgData.pencil}
                                      icoSize={16}
                                      title="수정"
                                    />
                                    <Button
                                      label={'삭제'}
                                      cate={'ico-only'}
                                      size={'s'}
                                      color={'secondary'}
                                      icoLeft={true}
                                      icoLeftData={icoSvgData.trash}
                                      icoSize={16}
                                      title="삭제"
                                    />
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* 댓글 버튼이 있을 때 */}
                          <div className="d-tabs-comment__button">
                            <Button
                              label={'댓글'}
                              cate={'default'}
                              size={'s'}
                              color={'outline-secondary'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 이력 없을 때 */}
                <li>
                  <div className="d-tabs__group">
                    <div className="tabs__section type1-small">
                      <div className="tabs-menu__group">
                        <ul className="tabs-menu__list">
                          <li>
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">댓글</span>
                              <span className="tabs-menu__number">2 </span>
                            </button>
                          </li>
                          <li className="is-active">
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">이력</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs-panel__section">
                        <div className="tabs-panel__group">
                          <div className="tabs-panel__group">
                            <div className="d-tabs__nodata">이 활동에 이력이 없습니다.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                {/* 이력 있을 때 */}
                <li>
                  <div className="d-tabs__group">
                    <div className="tabs__section type1-small">
                      <div className="tabs-menu__group">
                        <ul className="tabs-menu__list">
                          <li>
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">댓글</span>
                              <span className="tabs-menu__number">2 </span>
                            </button>
                          </li>
                          <li className="is-active">
                            <button
                              type="button"
                              className="tabs-menu__btn"
                            >
                              <span className="tabs-menu__name">이력</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs-panel__section">
                        <div className="tabs-panel__group">
                          <div className="list-type7__section">
                            <ul className="interval-mt14">
                              <li>
                                <div className="list-type7-item__section">
                                  <p className="list-type7-item__text">
                                    <span className="date">2021-11-30 09:45</span>
                                    <span className="name">
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'홍길동'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </span>
                                    <span className="history">활동작성</span>
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="list-type7-item__section">
                                  <p className="list-type7-item__text">
                                    <span className="date">2021-11-30 09:45</span>
                                    <span className="name">
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'홍길동'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </span>
                                    <span className="history">활동 소유자 수정</span>
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="list-type7-item__section">
                                  <p className="list-type7-item__text">
                                    <span className="date">2021-11-30 09:45</span>
                                    <span className="name">
                                      <Button
                                        elem="a"
                                        url="#!"
                                        label={'홍길동'}
                                        cate={'link-text'}
                                        size={'m'}
                                        color={'body-link'}
                                      />
                                    </span>
                                    <span className="history">활동작성</span>
                                  </p>
                                </div>
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
        </div>

        {/* <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">No. </h2>
          <div className="guide__group"></div>
        </div> */}
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
