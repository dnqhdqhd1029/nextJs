/**
 * @file tooltip.tsx
 * @description 가이드 - 툴팁 페이지
 */

import Link from 'next/link'

import FormInputText from '~/publishing/components/common/ui/FormInputText'
import { IcoTooltip } from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tooltips from '~/publishing/components/common/ui/Tooltips'
import { PageType } from '~/types/common'
const Main: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">Tooltip Page</h1>

        <code className="guide__code">
          문서&nbsp;:&nbsp;
          <Link
            href="https://react-tooltip.com/docs/examples/styling"
            legacyBehavior
          >
            <a target="_blank">https://react-tooltip.com/docs/examples/styling</a>
          </Link>
        </code>

        <h2 className="guide__title">단일</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2 test-ico">
                <Tooltips
                  tooltipId={'tt1'}
                  tooltipPlace={'top'}
                  tooltipHtml={'조직 내에서 여러 명이 공용<br />으로 사용하는 메일'}
                  tooltipContents={'안녕하세요'}
                />
              </div>
            </li>
            <li className="guide__item">
              <div className="guide__box g--type2 test-ico">
                <Tooltips
                  tooltipId={'tt10-1'}
                  tooltipPlace={'top'}
                  tooltipHtml={'top'}
                  tooltipComponent={<IcoSvg data={icoSvgData.patchCheckFill} />}
                />
              </div>
            </li>
            <li className="guide__item">
              <div className="guide__box g--type2 test-ico">
                <Tooltips
                  tooltipId={'tt10-2'}
                  tooltipPlace={'bottom'}
                  tooltipHtml={'bottom'}
                  tooltipComponent={<IcoSvg data={icoSvgData.personFill} />}
                />
              </div>
            </li>
            <li className="guide__item">
              <div className="guide__box g--type2 test-ico">
                <Tooltips
                  tooltipId={'tt10-3'}
                  tooltipPlace={'left'}
                  tooltipHtml={'left'}
                  tooltipComponent={<IcoSvg data={icoSvgData.playCircleFill} />}
                />
              </div>
            </li>
            <li className="guide__item">
              <div className="guide__box g--type2 test-ico">
                <Tooltips
                  tooltipId={'tt10-4'}
                  tooltipPlace={'right'}
                  tooltipHtml={'right'}
                  tooltipComponent={<IcoSvg data={icoSvgData.infoCircleFill} />}
                />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">응용</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <FormInputText
                  title={'제목 입력, 툴팁 있어요'}
                  tooltip={true}
                >
                  <Tooltips
                    tooltipId={'ipt-tt0'}
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
      </section>
    </>
  )
}

export default Main
Main.PublishingLayout = 'BLANK'
