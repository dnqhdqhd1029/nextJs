/**
 * @file icons.tsx
 * @description 가이드 - icon 페이지
 */

import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import {
  IcoChevronThickLeft,
  IcoChevronThickRight,
  IcoRequired,
  IcoTooltip,
} from '~/publishing/components/common/ui/IcoGroup'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import IcoSvgCircle from '~/publishing/components/common/ui/IcoSvgCircle'
import IcoSymbol from '~/publishing/components/common/ui/IcoSymbol'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import icoSvgDataCircle from '~/publishing/components/common/ui/json/icoSvgDataCircle.json'
import { PageType } from '~/types/common'

type typeArr = undefined | string[]
interface DataType {
  [key: string]: string[]
}
interface DataCircleType {
  [key: string]: { path: string[]; circle: string[][] }
}

const Sample: PageType = () => {
  const renderIcoSvg = () => {
    const $data: DataType = icoSvgData
    const arrName: typeArr = []
    const arrPath = []

    for (const key in $data) {
      arrPath.push($data[key])
      arrName.push(key)
    }

    return arrPath.map((a, i) => (
      <li
        className="guide__item"
        key={i}
      >
        <div className="guide__box">
          <IcoSvg data={a} />
          <p className="cate">이름 : {arrName[i]}</p>
        </div>
      </li>
    ))
  }

  const renderIcoSvgCircle = () => {
    const $data: DataCircleType = icoSvgDataCircle
    const arrName: typeArr = []
    const arrPath = []

    for (const key in $data) {
      arrPath.push($data[key])
      arrName.push(key)
    }

    return arrPath.map((a, i) => (
      <li
        className="guide__item"
        key={i}
      >
        <div className="guide__box">
          <IcoSvgCircle data={a} />
          <p className="cate">이름 : {arrName[i]}</p>
        </div>
      </li>
    ))
  }

  return (
    <>
      <section className="guide__section">
        <h1 className="guide__hidden">Icon</h1>
        <code className="guide__code">
          import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
          <br />
          import icoSvgDataCircle from '~/publishing/components/common/ui/json/icoSvgDataCircle.json'
        </code>
        <code className="guide__code">IcoSvg data=icoSvgDataCircle.이름</code>
        <code className="guide__code">@include icoSvg(사이즈, 컬러)</code>

        <div
          className="guide__group ico-svg__list"
          style={{ marginTop: '20px' }}
        >
          <h2 className="guide__title">Icon Svg</h2>
          <ul className="guide__list--row">{renderIcoSvg()}</ul>
        </div>

        <code
          className="guide__code"
          style={{ marginTop: '100px' }}
        >
          import IcoSvgCircle from '~/publishing/components/common/ui/IcoSvgCircle'
          <br />
          import icoSvgDataCircle from '~/publishing/components/common/ui/json/icoSvgDataCircle.json'
        </code>
        <code className="guide__code">IcoSvgCircle data=icoSvgDataCircle.이름</code>
        <code className="guide__code">IcoSvgCircle json 작성 시, "circle":[cx, cy, r, transform]</code>
        <div
          className="guide__group ico-svg__list"
          style={{ marginTop: '20px' }}
        >
          <h2 className="guide__title">Icon Svg Circle</h2>
          <ul className="guide__list--row">{renderIcoSvgCircle()}</ul>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__title">Icon avatar</h2>
          <code className="guide__code">
            &lt;IcoAvatar 속성명=&#123;'속성값'&#125; /&gt;
            <br />- 속성 : label, icoData
          </code>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <IcoAvatar
                    label={'아이콘이름'}
                    icoData={icoSvgData.personFill}
                    size={'s48'}
                    icoSize={'s24'}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__title">Icon Symbol</h2>
          <code className="guide__code">
            &lt;IcoSymbol 속성명=&#123;'속성값'&#125; /&gt;
            <br />- 속성 : label, icoData
          </code>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <IcoSymbol
                    label={'아이콘이름'}
                    icoData={icoSvgData.checkThick}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <h2
          className="guide__title"
          style={{ marginTop: '30px' }}
        >
          Icon 컴포넌트형
        </h2>

        <code className="guide__code">import &#123;이름&#125; from '~/publishing/components/common/ui/GroupIcons'</code>
        <code className="guide__code">&lt;이름 /&gt;</code>

        <div
          className="guide__group"
          style={{ marginTop: '20px' }}
        >
          <ul className="guide__list--row">
            <li className="guide__item">
              <div className="guide__box">
                <IcoRequired />
                <p className="cate">이름 : IcoRequired</p>
              </div>
            </li>
            <li className="guide__item">
              <div className="guide__box">
                <IcoTooltip />
                <p className="cate">이름 : IcoTooltip</p>
              </div>
            </li>
            <li className="guide__item">
              <div className="guide__box">
                <IcoChevronThickLeft />
                <p className="cate">이름 : IcoChevronThickLeft</p>
              </div>
            </li>
            <li className="guide__item">
              <div className="guide__box">
                <IcoChevronThickRight />
                <p className="cate">이름 : IcoChevronThickRight</p>
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
