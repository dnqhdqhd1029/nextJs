/**
 * @file ND03.tsx
 * @description ND03 페이지
 */

import FooterButton from '~/publishing/components/common/layouts/FooterButton'
import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner distribute">
        <div className="mb-contents">
          <div className="mb-contents-layout__section">
            <div className="mb-contents-layout__header">
              <div className="distribute-steps__header">
                <h2 className="distribute-steps-header__title">보도자료 배포: 내용</h2>
                <div className="distribute-steps-header__group">
                  <div className="steps__group">
                    <ul className="steps__list">
                      <li>
                        <p className="steps__text">설정</p>
                      </li>
                      <li>
                        <p className="steps__text">템플릿</p>
                      </li>
                      <li className="is-active">
                        <p className="steps__text">내용</p>
                      </li>
                      <li>
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
                  <ul>
                    <li>
                      <FormInputText
                        title={'제목'}
                        required={true}
                      />
                    </li>
                    <li>
                      <div className="mb-contents-pb16__group">
                        <div className="form-default__header form-pb0">
                          <FormTitle
                            title="내용"
                            required={true}
                          />
                          <Button
                            label={'워드 파일 불러오기'}
                            cate={'default'}
                            size={'s'}
                            color={'outline-secondary'}
                          />
                        </div>
                        <div className="editor__section">에디터영역</div>
                        <div className="form-default__footer">
                          <Button
                            label={'템플릿 저장'}
                            cate={'default'}
                            size={'s'}
                            color={'outline-secondary'}
                          />
                        </div>
                      </div>
                    </li>
                    <li>파일 업로드</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-contents-layout__footer">
              <div className="distribute-steps__footer">
                <FooterButton
                  left={true}
                  center={true}
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
Sample.PublishingLayout = 'LAYOUT1'
