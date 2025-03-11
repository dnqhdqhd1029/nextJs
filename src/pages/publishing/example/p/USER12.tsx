/**
 * @file USER12.tsx
 * @description USER12 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container bg-body responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="member__section flex-just-cen">
              <div className="log-type2__section">
                <div className="log-type2__group">
                  <ul className="interval-mt14">
                    <li>
                      <h2 className="font-heading--h5">로그인이 임시 차단되었습니다.</h2>
                    </li>
                    <li>
                      <p className="font-body__regular">ID: gildong*****@gmai*****</p>
                    </li>
                    <li>
                      <p className="font-body__regular">
                        위 ID는 5회 이상 로그인 연속 실패로 정보 보호를 위해 임시 차단되었습니다.
                        <br />
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          label={'도움말'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        을 확인한 후 다시 시도해 보거나{' '}
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          label={'고객센터'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        로 문의하기 바랍니다.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="log-type2__group">
                  <ul className="interval-mt14">
                    <li>
                      <h2 className="font-heading--h5">로그인이 임시 차단되었습니다.</h2>
                    </li>
                    <li>
                      <p className="font-body__regular">IP: 61.39.144.77</p>
                    </li>
                    <li>
                      <p className="font-body__regular">
                        위 IP는 비정상적인 대량 트래픽으로 정보 보호를 위해 임시 차단되었습니다.
                        <br />
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          label={'도움말'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        을 확인한 후 다시 시도해 보거나{' '}
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          label={'고객센터'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        로 문의하기 바랍니다.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="log-type2__group">
                  <ul className="interval-mt14">
                    <li>
                      <h2 className="font-heading--h5">로그인이 임시 차단되었습니다.</h2>
                    </li>
                    <li>
                      <p className="font-body__regular">ID: gildong*****@gmai*****</p>
                    </li>
                    <li>
                      <p className="font-body__regular">
                        위 ID는 비정상적인 대량 트래픽으로 정보 보호를 위해 임시 차단되었습니다.
                        <br />
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          label={'도움말'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        을 확인한 후 다시 시도해 보거나{' '}
                        <Button
                          elem="a"
                          url={'https://www.naver.com/'}
                          label={'고객센터'}
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                        />
                        로 문의하기 바랍니다.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="log-type2__group">
                  <ul className="interval-mt14">
                    <li>
                      <h2 className="font-heading--h5">로그인이 차단되었습니다.</h2>
                    </li>
                    <li>
                      <p className="font-body__regular">
                        5회 이상 로그인 연속 실패해 정보 보호를 위해 로그인을 차단했습니다.
                        <br />
                        아래 버튼을 눌러 인증 코드를 받아 입력하세요.
                      </p>
                    </li>
                  </ul>
                  <div className="log-type2__btn">
                    <Button
                      label={'이메일로 인증 코드 받기'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                    />
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
Sample.PublishingLayout = 'LAYOUT4'
