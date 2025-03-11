/**
 * @file M51.tsx
 * @description M51 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import Tag from '~/publishing/components/common/ui/Tag'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">미디어 추가</h2>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <li>
                <p className="font-body__regular">추가할 미디어 정보를 입력하세요.</p>
              </li>
              <li>
                <ul className="grid-col2">
                  <li>
                    <FormInputText
                      title={'미디어명'}
                      required={true}
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'웹사이트'}
                      placeholder="http://"
                    />
                  </li>
                  <li>
                    <FormInputText title={'이메일'} />
                  </li>
                  <li>
                    <FormInputText
                      title={'전화'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'팩스'}
                      inputType="number"
                    />
                  </li>
                  <li>
                    <FormInputText
                      title={'분야'}
                      placeholder="콤마로 구분"
                    />
                  </li>
                  <li>
                    <FormInputText title={'주소'} />
                  </li>
                  <li>
                    <div className="button-select-style__section">
                      <div className="button-select-style__group">
                        <FormTitle title="미디어 목록" />
                        <Button
                          label={'목록 선택'}
                          cate={'default'}
                          size={'m'}
                          color={'outline-secondary'}
                        />
                      </div>
                      <div className="tags__section">
                        <ul className="tags__list">
                          <li>
                            <Tag
                              label={'태그1'}
                              cate={'n3'}
                              shape={'round'}
                              close={true}
                            />
                          </li>
                          <li>
                            <Tag
                              label={'태그2'}
                              cate={'n3'}
                              shape={'round'}
                              close={true}
                            />
                          </li>
                        </ul>
                        <div className="tags__delete">
                          <Button
                            label={'모두 제거'}
                            cate={'link-text'}
                            size={'s'}
                            color={'body-link'}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="mb-contents-footer__section">
              <div className="buttons__group">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'outline-secondary'}
                />
                <Button
                  label={'저장'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
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
