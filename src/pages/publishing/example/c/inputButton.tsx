/**
 * @file inputCkbox.tsx
 * @description 가이드 - 체크박스 & 라디오 페이지
 */

import FormInputBtn from '~/publishing/components/common/ui/FormInputBtn'
import FormInputBtnList from '~/publishing/components/common/ui/FormInputBtnList'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">input Button</h1>

        <code className="guide__code">
          &lt;FormInputBtn 속성명=&#123;'속성값'&#125; /&gt;
          <br />
          - 속성 (string) : type, name, id, label
          <br />- 속성 (boolean == true ? false) : checked, disabled
          <br />
        </code>
        <code className="guide__code">
          &lt;FormInputBtnList 속성명=&#123;'속성값'&#125; /&gt;
          <br />
          - 속성 (string) : type, name, id, title, label, msg
          <br />- 속성 (boolean == true ? false) : required, tooltip, succeeded, failed
          <br />
        </code>

        <h2 className="guide__title">input checkbox</h2>
        <h3 className="guide__title">단일</h3>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputBtn
                  type="checkbox"
                  name="rdo-only0"
                  id="rdo-only0"
                  label="단일 라디오버튼"
                />
              </div>
              <div className="guide__box g--type2">
                <div className="ipt-checkbox-ico__group">
                  <FormInputBtn
                    type="checkbox"
                    name="ck01"
                    id="ck01"
                    label="일간지 시사정치 담당기자"
                  />
                  <div className="ipt-checkbox-ico__person">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </div>
                </div>
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">disabled</p>
              <div className="guide__box g--type2">
                <FormInputBtn
                  type="checkbox"
                  name="rdo-only1"
                  id="rdo-only1"
                  label="단일 라디오버튼"
                  disabled={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">checked & disabled</p>
              <div className="guide__box g--type2">
                <FormInputBtn
                  type="checkbox"
                  name="rdo-only2"
                  id="rdo-only2"
                  label="단일 라디오버튼"
                  disabled={true}
                  checked={true}
                />
              </div>
            </li>
          </ul>
        </div>

        <h3 className="guide__title">제목 없을 때</h3>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  type="checkbox"
                  name={'rlist0'}
                  id={'rlist0'}
                  label={'라디오 리스트형'}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지형</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  type="checkbox"
                  name={'rlist1'}
                  id={'rlist1'}
                  label={'라디오 리스트형'}
                  msg={'폼 텍스트 샘플입니다.'}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지형 (성공)</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  type="checkbox"
                  name={'rlist2'}
                  id={'rlist2'}
                  label={'라디오 리스트형'}
                  msg={'폼 텍스트 샘플입니다.'}
                  succeeded={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지형 (실패)</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  type="checkbox"
                  name={'rlist3'}
                  id={'rlist3'}
                  label={'라디오 리스트형'}
                  msg={'폼 텍스트 샘플입니다.'}
                  failed={true}
                />
              </div>
            </li>
          </ul>
        </div>

        <h3 className="guide__title">제목 있을 때</h3>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  title="제목"
                  type="checkbox"
                  name={'rlist10'}
                  id={'rlist10'}
                  label={'라디오 리스트형'}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지형</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  title="제목입니다"
                  required={true}
                  type="checkbox"
                  name={'rlist11'}
                  id={'rlist11'}
                  label={'라디오 리스트형'}
                  msg={'폼 텍스트 샘플입니다.'}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지형 (성공)</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  title="제목 툴팁형 입니다"
                  tooltip={true}
                  type="checkbox"
                  name={'rlist12'}
                  id={'rlist12'}
                  label={'라디오 리스트형'}
                  msg={'폼 텍스트 샘플입니다.'}
                  succeeded={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지형 (실패)</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  title="제목입니다"
                  type="checkbox"
                  name={'rlist13'}
                  id={'rlist13'}
                  label={'라디오 리스트형'}
                  msg={'폼 텍스트 샘플입니다.'}
                  failed={true}
                />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">input radio</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">단일</p>
              <div className="guide__box g--type2">
                <FormInputBtn
                  type="radio"
                  name="rdo-only0"
                  id="rdo-only0"
                  label="단일 라디오버튼"
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">disabled</p>
              <div className="guide__box g--type2">
                <FormInputBtn
                  type="radio"
                  name="rdo-only1"
                  id="rdo-only1"
                  label="단일 라디오버튼"
                  disabled={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">checked & disabled</p>
              <div className="guide__box g--type2">
                <FormInputBtn
                  type="radio"
                  name="rdo-only2"
                  id="rdo-only2"
                  label="단일 라디오버튼"
                  disabled={true}
                  checked={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  type="radio"
                  name={'rlist0'}
                  id={'rlist0'}
                  label={'라디오 리스트형'}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지형</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  type="radio"
                  name={'rlist1'}
                  id={'rlist1'}
                  label={'라디오 리스트형'}
                  msg={'폼 텍스트 샘플입니다.'}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지형 (성공)</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  type="radio"
                  name={'rlist2'}
                  id={'rlist2'}
                  label={'라디오 리스트형'}
                  msg={'폼 텍스트 샘플입니다.'}
                  succeeded={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지형 (실패)</p>
              <div className="guide__box g--type2">
                <FormInputBtnList
                  type="radio"
                  name={'rlist3'}
                  id={'rlist3'}
                  label={'라디오 리스트형'}
                  msg={'폼 텍스트 샘플입니다.'}
                  failed={true}
                />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">input Custom - template-ipt-btn</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">type-paragraph</p>
              <div className="guide__box g--type2">
                <div className="template-ipt-btn__section type-paragraph">
                  <FormTitle
                    title={'템플릿'}
                    required={true}
                  />
                  <ul className="template-ipt-btn__list">
                    <li>
                      <div className="template-ipt-btn__item">
                        <input
                          type="radio"
                          name="rt0"
                          id="rt0-1"
                          checked
                        />
                        <label htmlFor="rt0-1">
                          <b className="item__thumb">
                            <span className="item-thumb__txt">보고서</span>
                            <span className="item-thumb__img"></span>
                          </b>
                          <span className="item__label">제목형 템플릿</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="template-ipt-btn__item">
                        <input
                          type="radio"
                          name="rt0"
                          id="rt0-2"
                        />
                        <label htmlFor="rt0-2">
                          <b className="item__thumb">
                            <span className="item-thumb__txt">보고서</span>
                            <span className="item-thumb__img"></span>
                          </b>
                          <span className="item__label">제목 본문형 템플릿</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">type-icon</p>
              <div className="guide__box g--type2">
                <div className="template-ipt-btn__section type-icon">
                  <FormTitle
                    title={'양식'}
                    required={true}
                  />
                  <div className="font-body__group">
                    <p className="font-body__regular">동시에 여러 개를 선택할 수 있습니다.</p>
                  </div>
                  <ul className="template-ipt-btn__list">
                    <li>
                      <div className="template-ipt-btn__item">
                        <input
                          type="checkbox"
                          name="rt1"
                          id="rt1-1"
                          defaultChecked
                        />
                        <label htmlFor="rt1-1">
                          <b className="item__thumb">
                            <span className="item-thumb__img">
                              <IcoSvg data={icoSvgData.envelopeFill} />
                            </span>
                          </b>
                          <span className="item__label">이메일 본문</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="template-ipt-btn__item">
                        <input
                          type="checkbox"
                          name="rt1"
                          id="rt1-2"
                        />
                        <label htmlFor="rt1-2">
                          <b className="item__thumb">
                            <span className="item-thumb__img">
                              <IcoSvg data={icoSvgData.wordFill} />
                            </span>
                          </b>
                          <span className="item__label">워드 첨부</span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="template-ipt-btn__item">
                        <input
                          type="checkbox"
                          name="rt1"
                          id="rt1-3"
                        />
                        <label htmlFor="rt1-3">
                          <b className="item__thumb">
                            <span className="item-thumb__img">
                              <IcoSvg data={icoSvgData.pdfFill} />
                            </span>
                          </b>
                          <span className="item__label">PDF 첨부</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
