/**
 * @file ND04.tsx
 * @description ND04 페이지
 */

import FooterButton from '~/publishing/components/common/layouts/FooterButton'
import Button from '~/publishing/components/common/ui/Button'
import DatePicker from '~/publishing/components/common/ui/DatePicker'
import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import SelectTime from '~/publishing/components/common/ui/SelectTime'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner distribute">
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__header">
              <div className="distribute-steps__header">
                <h2 className="distribute-steps-header__title">보도자료 배포: 확인</h2>
                <div className="distribute-steps-header__group">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li>
                        <p className="steps__text">설정</p>
                      </li>
                      <li>
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li>
                        <p className="steps__text">내용</p>
                      </li>
                      <li className="is-active">
                        <p className="steps__text">확인</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-contents-layout__contents">
              <div className="distribute-steps__section">
                <div className="distribute-steps__group">
                  <div className="distribute-steps__title">
                    <h3 className="font-heading--h5">발송</h3>
                    <Button
                      label={'테스트 메일 발송'}
                      cate={'default'}
                      size={'s'}
                      color={'outline-secondary'}
                    />
                  </div>
                  <ul className="grid-col2 form-pb0">
                    <li>
                      <div className="ipt-btn__section">
                        <FormTitle
                          title={'발송 시간'}
                          required={true}
                        />
                        <ul className="ipt-btn__list--row">
                          <li>
                            <FormInputBtn
                              type="radio"
                              name="rdo-0"
                              id="rdo-0-0"
                              label="즉시"
                            />
                          </li>
                          <li>
                            <FormInputBtn
                              type="radio"
                              name="rdo-0"
                              id="rdo-0-1"
                              label="예약"
                              checked
                            />
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <FormTitle
                        title={'예약시간 선택'}
                        required={true}
                      />
                      <div className="datepicker-time__section">
                        <div className="datepicker-time__group">
                          <DatePicker />
                          <SelectTime placeholder={'시간 선택'} />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="distribute-steps__group">
                  <div className="distribute-steps__title">
                    <h3 className="font-heading--h5">기본정보</h3>
                    <Button
                      elem="a"
                      url={'#!'}
                      label={'수정하기'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                    />
                  </div>
                  <ul>
                    <li>
                      <dl className="dl-table-type1__section">
                        <dt>
                          <p className="dl-table-type1__text">배포명</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">
                            클라우드 기반 통합 회사 홍보 서비스 ‘미디어비’ 출시, 언론 배포 보도자료
                          </p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">보낸 사람</p>
                        </dt>
                        <dd>
                          <p className="dl-table-type1__text">홍길동</p>
                        </dd>
                        <dt>
                          <p className="dl-table-type1__text">받는 사람</p>
                        </dt>
                        <dd>
                          <p className="font-body__regular">
                            총 수신자 : 240명(중복 3명, 수신거부 2명, 발송차단 3명 제외)
                          </p>
                          <p className="font-body__regular">
                            언론인 목록: 여성잡지 기자명단 120명, 10대 일간지 IT기자 명단 64명
                          </p>
                          <p className="font-body__regular">언론인: 서정민 중앙일보, 박주희 한국일보</p>
                          <p className="font-body__regular">미디어 목록: 정보보안 전문 미디어 20개(이메일 6개)</p>
                          <p className="font-body__regular">미디어: 여성중앙</p>
                          <p className="font-body__regular">
                            메일 추가:{' '}
                            <Button
                              elem="a"
                              url={'mailto:abcd1234@gmail.com'}
                              label={'abcd1234@gmail.com'}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                            />
                          </p>
                          <div className="me-send-email__group">
                            <IcoSvg data={icoSvgData.checkLg} />
                            <p className="me-send-email__text">나에게도 보내기</p>
                          </div>
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
                </div>
                <div className="distribute-steps__group">
                  <div className="distribute-steps__title">
                    <h3 className="font-heading--h5">보도자료</h3>
                    <Button
                      elem="a"
                      url={'#!'}
                      label={'수정하기'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                    />
                  </div>
                  <div className="distribute-steps__news">
                    <div className="distribute-steps-news__contents">보도자료 내용</div>
                    <div className="distribute-steps-news__footer">
                      <p>귀하는 홍길동으로부터 미디어비 서비스를 이용해 이 메일을 받고 있습니다.</p>
                      <p>
                        수신을 원치 않으면{' '}
                        <Button
                          elem="a"
                          url={'#!'}
                          label={'수신거부'}
                          cate={'link-text'}
                          size={'s'}
                          color={'gray-500'}
                        />
                        를 클릭하여 주시기 바랍니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-contents-layout__footer">
              <div className="distribute-steps__footer">
                <FooterButton left={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
