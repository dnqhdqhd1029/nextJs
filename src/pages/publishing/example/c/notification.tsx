/**
 * @file notification.tsx
 * @description notification 페이지
 */

import Link from 'next/link'

import Button from '~/publishing/components/common/ui/Button'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  const renderToastIco = () => {
    return (
      <>
        <div className="notification-toast__ico">
          <IcoSvg data={icoSvgData.infoCircleFill} />
        </div>
      </>
    )
  }

  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">notification</h1>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">header</h2>
          <div className="guide__group">
            <ul className="guide__interval">
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-header__section colors-blue-700 button-type1">
                    <div className="notification-header__group">
                      <div className="notification-header__contents ta-l">
                        <p>
                          미디어비가 알파 서비스를 시작했습니다.
                          <br />
                          사용 중 불편하거나 개선할 점이 있으면{' '}
                          <Link
                            href="#!"
                            legacyBehavior
                          >
                            <a target="_self">고객센터</a>
                          </Link>
                          에 알려주세요. 내용을 검토 후 처리 결과를 알려드리겠습니다.
                        </p>
                      </div>
                    </div>
                    <div className="notification-header__btn">
                      <Button
                        label={'삭제'}
                        cate={'ico-only'}
                        size={'s24'}
                        color={'alert'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.iconCloseButton}
                        icoSize={16}
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-header__section colors-blue-700 button-type1">
                    <div className="notification-header__group">
                      <div className="notification-header__contents type-flex-end ta-l">
                        <p>
                          미디어비가 알파 서비스를 시작했습니다.
                          <br />
                          사용 중 불편하거나 개선할 점이 있으면 고객센터에 알려주세요. 내용을 검토 후 처리 결과를
                          알려드리겠습니다.
                        </p>
                        <p className="link">
                          <Link
                            href="#!"
                            legacyBehavior
                          >
                            <a target="_self">고객센터</a>
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="notification-header__btn">
                      <Button
                        label={'삭제'}
                        cate={'ico-only'}
                        size={'s24'}
                        color={'alert'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.iconCloseButton}
                        icoSize={16}
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-header__section colors-alert-border button-type1">
                    <div className="notification-header__group">
                      <div className="notification-header__contents ta-l">
                        <p>
                          미디어비가 알파 서비스를 시작했습니다.
                          <br />
                          사용 중 불편하거나 개선할 점이 있으면{' '}
                          <Link
                            href="#!"
                            legacyBehavior
                          >
                            <a
                              target="_self"
                              className="body-text"
                            >
                              고객센터
                            </a>
                          </Link>
                          에 알려주세요. 내용을 검토 후 처리 결과를 알려드리겠습니다.
                        </p>
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
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-header__section colors-blue-700 button-type2">
                    <div className="notification-header__group">
                      <div className="notification-header__contents">
                        <p>사용권이 만료됐습니다. 유효기간: 2021-09-26 ~ 2022-09-25</p>
                      </div>
                    </div>
                    <div className="notification-header__btn">
                      <Button
                        label={'서비스 구매'}
                        cate={'default'}
                        size={'m'}
                        color={'light'}
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-header__section colors-blue-700 button-type2">
                    <div className="notification-header__group">
                      <div className="notification-header__contents">
                        <div className="tooltip__title">
                          <p>데모 회사</p>
                          <Tooltips
                            tooltipId={'tt10-4'}
                            tooltipPlace={'top'}
                            tooltipHtml={
                              '데모 회사에 입력된 데이터는 <br />이해를 돕기 위해 미디어비 <br />작업자가 대신 입력한 가상의 <br />정보입니다.'
                            }
                            tooltipComponent={<IcoSvg data={icoSvgData.infoCircleFill} />}
                          />
                        </div>
                        <p>고객님은 지금 데모 체험 중입니다.</p>
                      </div>
                    </div>
                    <div className="notification-header__btn">
                      <Button
                        label={'구매 신청'}
                        cate={'default'}
                        size={'m'}
                        color={'light'}
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-header__section colors-alert-border button-type3">
                    <div className="notification-header__group">
                      <div className="notification-header__contents">
                        <p>배포하지 않은 보도자료 초안이 2개 있습니다.</p>

                        <p>
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'초안보기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-header__section colors-alert-border button-type1">
                    <div className="notification-header__group">
                      <div className="notification-header__contents">
                        <p>배포하지 않은 보도자료 초안이 2개 있습니다.</p>

                        <p>
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'초안보기'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />
                        </p>
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
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-header__section colors-alert-border button-type1">
                    <div className="notification-header__group">
                      <div className="notification-header__contents">
                        <p>이름과 이메일이 동일한 시스템 제공 언론인이 있습니다.</p>

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
                          color={'primary'}
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
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-header__section colors-alert-border button-type1">
                    <div className="notification-header__group">
                      <div className="notification-header__contents">
                        <p>
                          메일은 잠시 후에 발송됩니다.
                          <br />
                          실수로 메일을 보냈을 때 신속히 발송을 취소하거나 수정할 수 있습니다.
                          <br />
                          <Button
                            elem="a"
                            url={'#!'}
                            label={'발송 취소 하기'}
                            cate={'link-text-arrow'}
                            size={'m'}
                            color={'primary'}
                            icoRight={true}
                            icoRightData={icoSvgData.chevronRight}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">toast</h2>
          <div className="guide__group">
            <ul className="guide__interval">
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-toast__section">
                    <div className="notification-toast__group">
                      <div className="notification-toast__contents">안녕하세요! Alert 메시지입니다.</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-toast__section">
                    <div className="notification-toast__group">
                      <div className="notification-toast__btn">
                        <Button
                          label={'삭제'}
                          cate={'ico-only'}
                          size={'s48'}
                          color={'secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                        />
                      </div>
                      <div className="notification-toast__contents">안녕하세요! Alert 메시지입니다.</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-toast__section">
                    {renderToastIco()}
                    <div className="notification-toast__group">
                      <p className="notification-toast__contents">안녕하세요! Alert 메시지입니다.</p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-toast__section">
                    {renderToastIco()}
                    <div className="notification-toast__group">
                      <div className="notification-toast__btn">
                        <Button
                          label={'삭제'}
                          cate={'ico-only'}
                          size={'s48'}
                          color={'secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                        />
                      </div>
                      <p className="notification-toast__contents">안녕하세요! Alert 메시지입니다.</p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-toast__section">
                    <div className="notification-toast__group">
                      <h2 className="notification-toast__title">제목</h2>
                      <p className="notification-toast__contents">
                        네, Alert 메시지를 성공적으로 읽었습니다. 이 예제 텍스트는 이러한 종류의 콘텐츠에서 Alert 내의
                        간격이 어떻게 작동하는지 확인할 수 있도록 조금 더 길게 작성했습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-toast__section">
                    <div className="notification-toast__group">
                      <div className="notification-toast__btn">
                        <Button
                          label={'삭제'}
                          cate={'ico-only'}
                          size={'s48'}
                          color={'secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                        />
                      </div>
                      <h2 className="notification-toast__title">제목</h2>
                      <p className="notification-toast__contents">
                        네, Alert 메시지를 성공적으로 읽었습니다. 이 예제 텍스트는 이러한 종류의 콘텐츠에서 Alert 내의
                        간격이 어떻게 작동하는지 확인할 수 있도록 조금 더 길게 작성했습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-toast__section">
                    {renderToastIco()}
                    <div className="notification-toast__group">
                      <h2 className="notification-toast__title">제목</h2>
                      <p className="notification-toast__contents">
                        네, Alert 메시지를 성공적으로 읽었습니다. 이 예제 텍스트는 이러한 종류의 콘텐츠에서 Alert 내의
                        간격이 어떻게 작동하는지 확인할 수 있도록 조금 더 길게 작성했습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-toast__section">
                    {renderToastIco()}
                    <div className="notification-toast__group">
                      <div className="notification-toast__btn">
                        <Button
                          label={'삭제'}
                          cate={'ico-only'}
                          size={'s48'}
                          color={'secondary'}
                          icoLeft={true}
                          icoLeftData={icoSvgData.iconCloseButton2}
                          icoSize={16}
                        />
                      </div>
                      <h2 className="notification-toast__title">제목</h2>
                      <p className="notification-toast__contents">
                        네, Alert 메시지를 성공적으로 읽었습니다. 이 예제 텍스트는 이러한 종류의 콘텐츠에서 Alert 내의
                        간격이 어떻게 작동하는지 확인할 수 있도록 조금 더 길게 작성했습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">alert</h2>
          <div className="guide__group">
            <ul className="guide__interval">
              <li>
                <div className="guide__box g--type2">
                  <div className="notification-alert__section">
                    <div className="notification-alert__group">
                      <h2 className="notification-alert__title">정보</h2>
                      <div className="notification-alert__contents">
                        <p>이름과 이메일 정보가 같은 시스템 제공 언론인이 있습니다.</p>
                        <p>
                          <Button
                            elem="a"
                            url={'https://www.naver.com/'}
                            label={'장지승'}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                          />{' '}
                          <span className="color-secondary">중앙일보 문화부 기자</span>
                        </p>
                        <div className="flex-wrap">
                          <p>아래 인물을 삭제하겠습니까?</p>
                          <Button
                            label={'삭제하기'}
                            cate={'default'}
                            size={'s'}
                            color={'primary'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="notification-alert__btn">
                      <Button
                        label={'삭제'}
                        cate={'ico-only'}
                        size={'s48'}
                        color={'secondary'}
                        icoLeft={true}
                        icoLeftData={icoSvgData.iconCloseButton2}
                        icoSize={16}
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
