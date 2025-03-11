/**
 * @file inputText.tsx
 * @description 가이드 - form input 페이지
 */
import Link from 'next/link'

import FormInputText from '~/publishing/components/common/ui/FormInputText'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">input text</h1>

        <code className="guide__code">
          &lt;FormInputText 속성명=&#123;'속성값'&#125; /&gt;
          <br />
          - 속성 (string) : title, placeholder, value, msg
          <br />- 속성 (boolean == true ? false) : required, tooltip, disabled, succeeded, failed
          <br />
          <br />- Tooltip = true 시, Tooltips 컴포넌트 적용 ex. " 타이틀 & 툴팁 "으로 찾기
          <br />-
          <Link
            href="/example/c/tooltip"
            legacyBehavior
          >
            <a target="_blank"> Tooltips 컴포넌트 가이드 보러가기</a>
          </Link>
        </code>

        <h2 className="guide__title">디폴트</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">제목 없을 때</p>
              <div className="guide__box g--type2">
                <FormInputText />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputText title={'제목'} />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & placeholder</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목'}
                  placeholder={'제목을 입력해주세요'}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & placeholder & 입력된 값</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목'}
                  placeholder={'제목을 입력해주세요'}
                  value={'입력값'}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 메세지</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목'}
                  msg={'폼 텍스트 샘플입니다.'}
                />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">disabled</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목'}
                  disabled={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & placeholder</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목'}
                  placeholder={'제목을 입력해주세요'}
                  disabled={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 & 입력된 값</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목'}
                  placeholder={'제목을 입력해주세요'}
                  value={'입력값'}
                  disabled={true}
                />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">input 타이틀 3종</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">타이틀 기본형</p>
              <div className="guide__box g--type2">
                <FormInputText title={'제목'} />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">타이틀 & 필수항목</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목을 입력하세요 (필수항목)'}
                  required={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">타이틀 & 툴팁</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목 입력, 툴팁 있어요'}
                  tooltip={true}
                >
                  <Tooltips
                    tooltipId={'tt10-4'}
                    tooltipPlace={'top'}
                    tooltipHtml={
                      '최근 3개월 이내 뉴스에서 특정 단어를<br />언급한 언론인을 검색합니다. 단어 사이에<br />and, or, not 등 불리언 연산자를 사용하고,<br />여러 단어로 된 문장은 따옴표("")로 묶어서<br />검색할 수 있습니다.'
                    }
                    tooltipComponent={<IcoTooltip />}
                  />
                </FormInputText>
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">유효성 결과 - 성공</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">타이틀 기본형</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목'}
                  msg={'폼 텍스트 샘플입니다.'}
                  succeeded={true}
                />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">유효성 결과 - 실패</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">타이틀 기본형</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목'}
                  failed={true}
                  msg={'폼 텍스트 샘플입니다.'}
                />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">input text 추가</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">타이틀 기본형</p>
              <div className="guide__box g--type2">
                <FormInputText
                  title={'직책'}
                  addBtn={true}
                />
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
