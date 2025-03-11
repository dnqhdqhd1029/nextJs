/**
 * @file reporter.tsx
 * @description reporter 페이지
 */

import { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Confirm from '~/components/common/ui/Confirm'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import ConfirmModal from '~/components/contents/distribution/Release/Press/ConfirmStep/ConfirmModal'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import AwardPopup from '~/publishing/components/contents/reporter/popup/AwardPopup'
import ContactPopup from '~/publishing/components/contents/reporter/popup/ContactPopup'
import EtcPopup from '~/publishing/components/contents/reporter/popup/EtcPopup'
import FieldPopup from '~/publishing/components/contents/reporter/popup/FieldPopup'
import ProfilePopup from '~/publishing/components/contents/reporter/popup/ProfilePopup'
import SettingPopup from '~/publishing/components/contents/reporter/popup/SettingPopup'
import SocialPopup from '~/publishing/components/contents/reporter/popup/SocialPopup'
import { useAlarm } from '~/utils/hooks/common/useAlarm'
import { useCustomerCenter } from '~/utils/hooks/contents/customerCenter/useCustomerCenter'

const Sample = () => {
  const { initCustomerCenter } = useCustomerCenter()
  const { setConfirm } = useAlarm()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState({
    EtcPopup: false,
    SocialPopup: false,
    ContactPopup: false,
    SettingPopup: false,
    MediaPopup: false,
    AwardPopup: false,
    FieldPopup: false,
    MediaLocationPopup: false,
    ProfilePopup: false,
  })

  const showConfirm = () => {
    console.log('Confirm 열기 버튼 클릭') // 로그 추가
    setConfirm({
      title: '삭제 확인',
      message: '정말 삭제하시겠습니까?',
      open: true,
      onConfirm: () => alert('삭제되었습니다!'),
      onCancel: () => alert('취소되었습니다.'),
    })
  }

  // const showConfirm = () => {
  //   console.log('Confirm 열기 버튼 클릭') // 로그 추가
  //   setConfirm({
  //     title: '삭제 확인',
  //     message: '정말 삭제하시겠습니까?',
  //     open: true,
  //     onConfirm: () => {
  //       console.log('삭제 확인 버튼 클릭')
  //     },
  //     onCancel: () => {
  //       console.log('삭제 취소 버튼 클릭')
  //     },
  //     backdropStyle: {
  //       width: 400,
  //       height: 200,
  //       backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //     },
  //   })
  // }
  useLayoutEffect(() => {
    initCustomerCenter()
  }, [])

  const togglePopup = (popupName: any, state: any) => {
    setIsOpen(prev => ({ ...prev, [popupName]: state }))
  }

  return (
    <>
      <div className="mb-container">
        <div className="mb-common-inner overflow-auto">
          <div className="mb-contents bg-gray--150">
            <div className="reporter-wrap">
              <div className="reporter-wrap__section">
                <div className="reporter-wrap__section__group">
                  <div className="reporter-main-profile">
                    <div className="flex-wrap">
                      <div className="reporter-main-profile__img">
                        <div className="reporter-profile-img__group  ">
                          <div className="profile__img">
                            {/*사진입력 전*/}
                            <div className="profile__before">
                              <Button
                                label={'이미지'}
                                cate={'ico-only'}
                                size={'s50'}
                                color={'white'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.personFill}
                                icoSize={40}
                              />
                              <div className="select__section">
                                <Button
                                  label={'이미지 추가'}
                                  cate={'ico-only'}
                                  size={'s32'}
                                  color={'white'}
                                  icoLeft={true}
                                  icoLeftData={icoSvgData.addNews}
                                  icoSize={16}
                                  onClick={() => togglePopup('ProfilePopup', true)}
                                />
                              </div>
                            </div>

                            {/*사진입력후
                          <div className="profile__after">
                            <div className="upload-img">
                              <Image
                                src={tempImg}
                                width={500}
                                height={500}
                                alt="temp 프로필 이미지"
                              />
                            </div>

                            <div className="select__section">
                              <Button
                                label={'에디터'}
                                cate={'ico-only'}
                                size={'s32'}
                                color={'white'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.trash}
                                icoSize={16}
                              />
                            </div>
                          </div>*/}
                          </div>
                          {/*<p className="profile__ico">
                            <Button
                              label={'프로필 수정'}
                              cate={'ico-only'}
                              size={'es'}
                              color={'gray-700'}
                              icoLeft={true}
                              icoLeftData={icoSvgData.pencilFill2}
                              icoSize={12}
                            />
                          </p>*/}
                        </div>
                      </div>
                      <div className="reporter-main-profile__detail">
                        <dl>
                          <dt>
                            <div className="flex-just-start align-items-center">
                              홍길동
                              <Tooltips
                                tooltipId={'tt10-1'}
                                tooltipPlace={'right'}
                                tooltipHtml={'이 회원은 인증된 언론인입니다.\n'}
                                tooltipComponent={
                                  <Button
                                    label={'인증회원'}
                                    cate={'ico-only'}
                                    size={'es'}
                                    color={'blue-700'}
                                    icoLeft={true}
                                    icoLeftData={icoSvgData.patchCheckFill}
                                    icoSize={16}
                                    //onClick={() => setIsOpen(true)}
                                  />
                                }
                              />
                            </div>
                          </dt>
                          <dd>
                            <div className="flex-wrap-column">
                              <div className="flex-just-start">
                                <div>매체명</div>
                                <div className="flex-wrap align-items-center">
                                  중앙일보
                                  <Button
                                    label={'에디터'}
                                    cate={'ico-only'}
                                    size={'es'}
                                    color={'gray-500'}
                                    icoLeft={true}
                                    icoLeftData={icoSvgData.pencilFill2}
                                    icoSize={12}
                                    //onClick={() => setIsOpen(true)}
                                  />
                                </div>
                              </div>
                              <div className="flex-just-start">
                                <div>부서</div>
                                <div>편집국 경제팀</div>
                              </div>
                              <div className="flex-just-start">
                                <div>직책</div>
                                <div>팀장</div>
                              </div>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>

                    <div className="reporter-main-profile__detail clearfix">
                      <dl>
                        <dd>
                          <div className="flex-wrap-column">
                            <div className="flex-just-start  column">
                              <div>담당 분야</div>
                              <div>
                                <div className="label">
                                  <span>경제</span>
                                  <span>금융</span>
                                  <span>증권시장</span>
                                  <span>경제동향</span>
                                  <span>증권업</span>
                                  <span>보험</span>
                                  <span>금융정책</span>
                                  <Button
                                    label={'에디터'}
                                    cate={'ico-only'}
                                    size={'es'}
                                    color={'gray-500'}
                                    icoLeft={true}
                                    icoLeftData={icoSvgData.pencilFill2}
                                    icoSize={12}
                                    onClick={() => togglePopup('FieldPopup', true)}
                                    //onClick={() => togglePopup('MediaLocationPopup', true)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex-just-start align-items-start">
                              {/*수정일떄만 소개 text 가 나옵니다.*/}
                              {/*<div>소개</div>*/}
                              <div className="discription">
                                <textarea readOnly>
                                  중앙일보 사회부 정치부에서 기사를 썼습니다. 사건에서 삶과 사람을 들여다보고 말과
                                  글에서 영혼의 무늬를 읽어내는 일을 좋아합니다.
                                </textarea>
                              </div>
                            </div>
                          </div>
                        </dd>
                        {/*<dd className="flex-just-end mt-10">
                          <Button
                            label={'저장'}
                            cate={'default'}
                            size={'s'}
                            color={'primary'}
                          />
                          <Button
                            label={'취소'}
                            cate={'default'}
                            size={'s'}
                            className={'ml-5'}
                            color={'outline-primary'}
                          />
                        </dd>*/}
                      </dl>
                    </div>
                    <div className="btn-group">
                      <Button
                        label={'수정'}
                        cate={'default'}
                        size={'s'}
                        color={'outline-secondary'}
                        onClick={() => router.push('/publishing/reporter/modify')}
                      />
                    </div>
                  </div>
                </div>

                <div className="flexible__section type-n1">
                  <div className="flexible__group">
                    <div className="flexible-item__group">
                      <dl>
                        <dt>
                          수상{' '}
                          <Button
                            label={'에디터'}
                            cate={'ico-only'}
                            size={'es'}
                            color={'gray-500'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.pencilFill2}
                            icoSize={12}
                            onClick={() => togglePopup('AwardPopup', true)}
                          />
                        </dt>
                        <dd>
                          2012 제23회 이길용 체육기자상, 한국체육기자연맹
                          <br /> 1998 한국편집기자상
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          저서{' '}
                          <Button
                            label={'에디터'}
                            cate={'ico-only'}
                            size={'es'}
                            color={'gray-500'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.pencilFill2}
                            icoSize={12}
                            onClick={() => togglePopup('AwardPopup', true)}
                          />
                        </dt>
                        <dd>
                          2019 2만원의 철학, 중앙북스(books) <br />
                          2010 너만의 승부수를 던져라, 을유문화사
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          경력{' '}
                          <Button
                            label={'에디터'}
                            cate={'ico-only'}
                            size={'es'}
                            color={'gray-500'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.pencilFill2}
                            icoSize={12}
                            onClick={() => togglePopup('AwardPopup', true)}
                          />
                        </dt>
                        <dd>
                          2024 중앙일보 편집국 경제팀 증권 전문기자 <br />
                          2020 중앙일보 편집국 국제외교안보팀 워싱턴 특파원(부장) 2019 중앙일보 편집국 국제외교안보팀
                          워싱턴 특파원 <br />
                          2018 중앙일보 편집국 글로벌경제팀 팀장
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          학교{' '}
                          <Button
                            label={'에디터'}
                            cate={'ico-only'}
                            size={'es'}
                            color={'gray-500'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.pencilFill2}
                            icoSize={12}
                            onClick={() => togglePopup('AwardPopup', true)}
                          />
                        </dt>
                        <dd>
                          1994 연세대 언론홍보대학원 신문전공 <br />
                          1988 연세대 국어국문학과 졸업
                          <br />
                          1983 부산 해운대고 졸업
                        </dd>
                      </dl>
                    </div>
                    <div className="flexible-item__group">
                      <dl>
                        <dt>
                          기타{' '}
                          <Button
                            label={'에디터'}
                            cate={'ico-only'}
                            size={'es'}
                            color={'gray-500'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.pencilFill2}
                            icoSize={12}
                            onClick={() => togglePopup('EtcPopup', true)}
                          />
                        </dt>
                        <dd>
                          <div className="flex-wrap-column">
                            <div className="flex-just-start">
                              <div>직종</div>
                              <div>기자</div>
                            </div>
                            <div className="flex-just-start">
                              <div>언어</div>
                              <div>한국어</div>
                            </div>
                            <div className="flex-just-start">
                              <div>고정물</div>
                              <div>Biz & Now, 비즈 칼럼, 뉴스7 경제가 좋다</div>
                            </div>
                            <div className="flex-just-start">
                              <div>출생지</div>
                              <div>서울</div>
                            </div>
                            <div className="flex-just-start">
                              <div>출생년도</div>
                              <div>1981년</div>
                            </div>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="flexible__group">
                    <div className="flexible-item__group">
                      <dl>
                        <dt>
                          소셜{' '}
                          <Button
                            label={'에디터'}
                            cate={'ico-only'}
                            size={'es'}
                            color={'gray-500'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.pencilFill2}
                            icoSize={12}
                            onClick={() => togglePopup('SocialPopup', true)}
                          />
                        </dt>
                        <dd>
                          <ul className="type-social">
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.naver.com/'}
                                target={'_blank'}
                                label={'개인 페이지'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.home}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.naver.com/'}
                                target={'_blank'}
                                label={'네이버 언론인'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.naver}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://kr.linkedin.com/'}
                                target={'_blank'}
                                label={'링크드인'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.linkedin}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://kr.linkedin.com/'}
                                target={'_blank'}
                                label={'인스타그램'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.instagram}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://ko-kr.facebook.com/'}
                                target={'_blank'}
                                label={'페이스북'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.facebook}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.youtube.com/'}
                                target={'_blank'}
                                label={'유튜브'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.youtube}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.youtube.com/'}
                                target={'_blank'}
                                label={'블로그'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.blog}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://twitter.com/?lang=ko'}
                                target={'_blank'}
                                label={'엑스'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.twitter}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.youtube.com/'}
                                target={'_blank'}
                                label={'카카오스토리'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.kakaostory}
                              />
                            </li>
                            <li>
                              <Button
                                elem="a"
                                url={'https://www.youtube.com/'}
                                target={'_blank'}
                                label={'기타'}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={icoSvgData.others}
                              />
                            </li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                    <div className="flexible-item__group">
                      <dl>
                        <dt>
                          연락처{' '}
                          <Button
                            label={'에디터'}
                            cate={'ico-only'}
                            size={'es'}
                            color={'gray-500'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.pencilFill2}
                            icoSize={12}
                            onClick={() => togglePopup('ContactPopup', true)}
                          />
                        </dt>
                        <dd>
                          <div className="flex-wrap-column">
                            <div className="flex-just-start">
                              <div>이메일(ID)</div>
                              <div>hgd123@gmail.com</div>
                            </div>
                            <div className="flex-just-start">
                              <div>휴대전화</div>
                              <div>010-1234-4567</div>
                            </div>
                            <div className="flex-just-start">
                              <div>전화번호</div>
                              <div>02-123-4567</div>
                            </div>
                            <div className="flex-just-start">
                              <div>팩스</div>
                              <div>02-123-4567</div>
                            </div>
                            <div className="flex-just-start ">
                              <div>메신저ID</div>
                              <div className="flex-wrap-column justify-content-start align-items-start">
                                <Button
                                  elem="a"
                                  url={'https://www.youtube.com/'}
                                  target={'_blank'}
                                  label={'카카오톡 채널'}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-link'}
                                />
                                <Button
                                  elem="a"
                                  url={'https://www.youtube.com/'}
                                  target={'_blank'}
                                  label={'틱톡'}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-link'}
                                />
                              </div>
                            </div>
                            <div className="flex-just-start">
                              <div>연락시간</div>
                              <div>6시 ~ 18시</div>
                            </div>
                          </div>
                        </dd>
                      </dl>
                    </div>
                    <div className="flexible-item__group">
                      <dl>
                        <dt>
                          설정{' '}
                          <Button
                            label={'에디터'}
                            cate={'ico-only'}
                            size={'es'}
                            color={'gray-500'}
                            icoLeft={true}
                            icoLeftData={icoSvgData.pencilFill2}
                            icoSize={12}
                            onClick={() => togglePopup('SettingPopup', true)}
                          />
                        </dt>
                        <dd>
                          <div className="flex-wrap-column">
                            <div className="flex-just-start">
                              <div>
                                프로필 노출
                                <span className="sp-mx-1">
                                  <Tooltips
                                    tooltipId={'ipt-tt0'}
                                    tooltipPlace={'top'}
                                    tooltipHtml={'미디어비를 사용하는 기업 홍보 담당자에게 노출됩니다.'}
                                    tooltipComponent={<IcoTooltip />}
                                  />
                                </span>
                              </div>
                            </div>
                            <div className="flex-just-start">
                              <div>휴대전화 정보</div>
                            </div>
                            <div className="flex-just-start">
                              <div>
                                소셜 정보 제공
                                <span className="sp-mx-1">
                                  <Tooltips
                                    tooltipId={'ipt-tt0'}
                                    tooltipPlace={'top'}
                                    tooltipHtml={
                                      '동의 시 미디어비 운영자가 소셜 정보를 프로필 업데이트에 참고할 수 있습니다.\n'
                                    }
                                    tooltipComponent={<IcoTooltip />}
                                  />
                                </span>
                                동의
                              </div>
                            </div>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="aside-wrap">
                <div className="aside-wrap-card">
                  <dl className="ta-c">
                    <dt className="font-body__lead--semi--medium">프로필완성도</dt>
                    <dd className="percent mb-20">30%</dd>
                    <dd>
                      <Button
                        label={'소개 작성하기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'primary'}
                      />{' '}
                      <br />
                      <Button
                        label={'경력 작성하기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'primary'}
                      />
                      <br />
                      <Button
                        label={'학교 작성하기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'primary'}
                      />
                    </dd>
                  </dl>
                </div>

                <div className="aside-wrap-card">
                  <dl className="ta-c">
                    <dt className="font-body__semi--large-medium">새로운 출발을 알리세요</dt>
                    <dd>새로운 직책이나 일을 맡게 되셨나요? 인터뷰를 통해 업계에 당신을 널리 알리세요.</dd>
                    <dd className="flex-just-cen mt-20">
                      <Button
                        label={'인터뷰 작성하기'}
                        cate={'default'}
                        size={'m'}
                        color={'outline-secondary'}
                      />
                    </dd>
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      <EtcPopup
        isOpen={isOpen.EtcPopup}
        onClose={() => togglePopup('EtcPopup', false)}
      />
      <AwardPopup
        isOpen={isOpen.AwardPopup}
        onClose={() => togglePopup('AwardPopup', false)}
      />
      <ContactPopup
        isOpen={isOpen.ContactPopup}
        onClose={() => togglePopup('ContactPopup', false)}
      />
      <SettingPopup
        isOpen={isOpen.SettingPopup}
        onClose={() => togglePopup('SettingPopup', false)}
      />
      <FieldPopup
        isOpen={isOpen.FieldPopup}
        onClose={() => togglePopup('FieldPopup', false)}
      />

      <SocialPopup
        isOpen={isOpen.SocialPopup}
        onClose={() => togglePopup('SocialPopup', false)}
      />
      <ProfilePopup
        isOpen={isOpen.ProfilePopup}
        onClose={() => togglePopup('ProfilePopup', false)}
      />
      {/*<ConfirmModal />*/}
      <Confirm />
    </>
  )
}

export default Sample
