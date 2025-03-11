/**
 * @file button.tsx
 * @description 가이드 - 버튼 모음 페이지
 */

// import Button from '~/publishing/components/common/ui/Button'
// import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
// import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h2 className="guide__title">버튼</h2>
        <code className="guide__code">
          &lt;Button 속성명=&#123;'속성값'&#125; /&gt;
          <br />- 속성 : elem, url, target, label, size, cate, color, count, icoLeft, icoLeftData, icoRight,
          icoRightData, icoSize, disabled, onClick
        </code>
        <code className="guide__code">
          - size : m, l, s, es, navbar, s24, s48
          <br />
          - cate: default, default-ico-only, default-ico-text, check-number, gray, ico-only, link-ico, link-ico-text,
          link-ico-text-sns, link-text, link-text-arrow
          <br />- color : primary, outline-primary, invisible-primary, secondary, outline-secondary,
          invisible-secondary, link, link-dark, success, outline-success, danger, outline-danger, light, dark,
          outline-dark, outline-form, gray, body-text, body-selected, body-link, alert
        </code>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">check & number</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'리스트에 추가'}
                    cate={'check-number'}
                    size={'m'}
                    color={'primary'}
                    count={10}
                    isCountAnimation={false}
                    countIsShow={true}
                    icoLeft={false}
                    icoLeftData={icoSvgData.checkThick}
                    disabled={false}
                  />
                  <p className="cate">primary / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'클립북에 추가'}
                    cate={'check-number'}
                    size={'m'}
                    color={'primary'}
                    count={6}
                    isCountAnimation={false}
                    countIsShow={true}
                    icoLeft={false}
                    icoLeftData={icoSvgData.checkThick}
                    isLoading={true}
                    className={cn(`button-count__animation`)}
                  />
                  <p className="cate">primary</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">default</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'primary'}
                    disabled={true}
                  />
                  <p className="cate">primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'primary'}
                  />
                  <p className="cate">primary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                  />
                  <p className="cate">primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'primary'}
                  />
                  <p className="cate">primary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'primary'}
                  />
                  <p className="cate">primary / es</p>
                </div>
              </li>
            </ul>
            {/* <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-primary'}
                    disabled={true}
                  />
                  <p className="cate">outline-primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-primary'}
                  />
                  <p className="cate">outline-primary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-primary'}
                  />
                  <p className="cate">outline-primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'outline-primary'}
                  />
                  <p className="cate">outline-primary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'outline-primary'}
                  />
                  <p className="cate">outline-primary / es</p>
                </div>
              </li>
            </ul> */}
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'tertiary'}
                    disabled={true}
                  />
                  <p className="cate">tertiary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'tertiary'}
                  />
                  <p className="cate">tertiary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                  />
                  <p className="cate">tertiary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'tertiary'}
                  />
                  <p className="cate">tertiary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'tertiary'}
                  />
                  <p className="cate">tertiary / es</p>
                </div>
              </li>
            </ul>
            {/* <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'secondary'}
                    disabled={true}
                  />
                  <p className="cate">secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'secondary'}
                  />
                  <p className="cate">secondary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'secondary'}
                  />
                  <p className="cate">secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'secondary'}
                  />
                  <p className="cate">secondary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'secondary'}
                  />
                  <p className="cate">secondary / es</p>
                </div>
              </li>
            </ul> */}
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-secondary'}
                    disabled={true}
                  />
                  <p className="cate">outline-secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-secondary'}
                  />
                  <p className="cate">outline-secondary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-secondary'}
                  />
                  <p className="cate">outline-secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'outline-secondary'}
                  />
                  <p className="cate">outline-secondary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'outline-secondary'}
                  />
                  <p className="cate">outline-secondary / es</p>
                </div>
              </li>
            </ul>

            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'link'}
                    disabled={true}
                  />
                  <p className="cate">link / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'link'}
                  />
                  <p className="cate">link / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'link'}
                  />
                  <p className="cate">link / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'link'}
                  />
                  <p className="cate">link / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'link'}
                  />
                  <p className="cate">link / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'link-dark'}
                    disabled={true}
                  />
                  <p className="cate">link-dark / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'link-dark'}
                  />
                  <p className="cate">link-dark / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'link-dark'}
                  />
                  <p className="cate">link-dark / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'link-dark'}
                  />
                  <p className="cate">link-dark / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'link-dark'}
                  />
                  <p className="cate">link-dark / es</p>
                </div>
              </li>
            </ul>
            {/* <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'success'}
                    disabled={true}
                  />
                  <p className="cate">success / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'success'}
                  />
                  <p className="cate">success / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'success'}
                  />
                  <p className="cate">success / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'success'}
                  />
                  <p className="cate">success / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'success'}
                  />
                  <p className="cate">success / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-success'}
                    disabled={true}
                  />
                  <p className="cate">outline-success / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-success'}
                  />
                  <p className="cate">outline-success / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-success'}
                  />
                  <p className="cate">outline-success / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'outline-success'}
                  />
                  <p className="cate">outline-success / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'outline-success'}
                  />
                  <p className="cate">outline-success / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'danger'}
                    disabled={true}
                  />
                  <p className="cate">danger / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'danger'}
                  />
                  <p className="cate">danger / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'danger'}
                  />
                  <p className="cate">danger / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'danger'}
                  />
                  <p className="cate">danger / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'danger'}
                  />
                  <p className="cate">danger / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-danger'}
                    disabled={true}
                  />
                  <p className="cate">outline-danger / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-danger'}
                  />
                  <p className="cate">outline-danger / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-danger'}
                  />
                  <p className="cate">outline-danger / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'outline-danger'}
                  />
                  <p className="cate">outline-danger / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'outline-danger'}
                  />
                  <p className="cate">outline-danger / es</p>
                </div>
              </li>
            </ul> */}
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'light'}
                    disabled={true}
                  />
                  <p className="cate">light / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'light'}
                  />
                  <p className="cate">light / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'light'}
                  />
                  <p className="cate">light / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'light'}
                  />
                  <p className="cate">light / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'light'}
                  />
                  <p className="cate">light / es</p>
                </div>
              </li>
            </ul>
            {/* <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'dark'}
                    disabled={true}
                  />
                  <p className="cate">dark / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'dark'}
                  />
                  <p className="cate">dark / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'dark'}
                  />
                  <p className="cate">dark / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'dark'}
                  />
                  <p className="cate">dark / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'dark'}
                  />
                  <p className="cate">dark / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-dark'}
                    disabled={true}
                  />
                  <p className="cate">outline-dark / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'l'}
                    color={'outline-dark'}
                  />
                  <p className="cate">outline-dark / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-dark'}
                  />
                  <p className="cate">outline-dark / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'s'}
                    color={'outline-dark'}
                  />
                  <p className="cate">outline-dark / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default'}
                    size={'es'}
                    color={'outline-dark'}
                  />
                  <p className="cate">outline-dark / es</p>
                </div>
              </li>
            </ul> */}
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">default ico only</h2>
          <div className="guide__group">
            {/* <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">primary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'m'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'s'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">primary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'es'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">primary / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'outline-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">outline-primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'outline-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-primary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'m'}
                    color={'outline-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'s'}
                    color={'outline-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-primary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'es'}
                    color={'outline-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-primary / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'outline-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">invisible-primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'invisible-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">invisible-primary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'m'}
                    color={'invisible-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">invisible-primary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'s'}
                    color={'invisible-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">invisible-primary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'es'}
                    color={'invisible-primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">invisible-primary / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">secondary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'m'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'s'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">secondary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'es'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">secondary / es</p>
                </div>
              </li>
            </ul> */}
            {/* <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">outline-secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-secondary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'m'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'s'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-secondary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'es'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-secondary / es</p>
                </div>
              </li>
            </ul> */}
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'invisible-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">invisible-secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'invisible-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">invisible-secondary / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'m'}
                    color={'invisible-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">invisible-secondary / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'s'}
                    color={'invisible-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">invisible-secondary / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'es'}
                    color={'invisible-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">invisible-secondary / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'light'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">light / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'light'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">light / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'m'}
                    color={'light'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">light / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'s'}
                    color={'light'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">light / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'es'}
                    color={'light'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">light / es</p>
                </div>
              </li>
            </ul>
            {/* <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'dark'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">dark / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'dark'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">dark / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'m'}
                    color={'dark'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">dark / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'s'}
                    color={'dark'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">dark / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'es'}
                    color={'dark'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">dark / es</p>
                </div>
              </li>
            </ul> */}
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'outline-form'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">outline-form / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'l'}
                    color={'outline-form'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-form / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'m'}
                    color={'outline-form'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-form / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'s'}
                    color={'outline-form'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-form / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-only'}
                    size={'es'}
                    color={'outline-form'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">outline-form / es</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">default ico text</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'l'}
                    color={'tertiary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">아이콘 왼쪽 / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'l'}
                    color={'tertiary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'tertiary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'s'}
                    color={'tertiary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'es'}
                    color={'tertiary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'l'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">아이콘 왼쪽 / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'l'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'s'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'es'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / es</p>
                </div>
              </li>
            </ul>
            {/* <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'l'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">아이콘 왼쪽 / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'l'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'s'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'es'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 왼쪽 / es</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'l'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.plusLg}
                    disabled={true}
                  />
                  <p className="cate">아이콘 오른쪽 / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'l'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 오른쪽 / l</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 오른쪽 / m</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'s'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 오른쪽 / s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'버튼'}
                    cate={'default-ico-text'}
                    size={'es'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.plusLg}
                  />
                  <p className="cate">아이콘 오른쪽 / es</p>
                </div>
              </li>
            </ul> */}
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">check & number</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'리스트에 추가'}
                    cate={'check-number'}
                    size={'m'}
                    color={'primary'}
                    count={10}
                    isCountAnimation={false}
                    countIsShow={true}
                    icoLeft={false}
                    icoLeftData={icoSvgData.checkThick}
                    disabled={true}
                  />
                  <p className="cate">primary / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'클립북에 추가'}
                    cate={'check-number'}
                    size={'m'}
                    color={'primary'}
                    count={6}
                    isCountAnimation={false}
                    countIsShow={true}
                    icoLeft={false}
                    icoLeftData={icoSvgData.checkThick}
                    isLoading={true}
                    className={cn(`button-count__animation`)}
                  />
                  <p className="cate">primary</p>
                </div>
              </li>
            </ul>
            {/* <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'저장됨'}
                    cate={'check-number'}
                    size={'m'}
                    color={'secondary'}
                    count={0}
                    icoLeft={false}
                    icoLeftData={icoSvgData.checkThick}
                    disabled={true}
                  />
                  <p className="cate">secondary / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'저장됨'}
                    cate={'check-number'}
                    size={'m'}
                    color={'secondary'}
                    count={6}
                    icoLeft={false}
                    icoLeftData={icoSvgData.checkThick}
                  />
                  <p className="cate">secondary</p>
                </div>
              </li>
            </ul> */}
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">gray</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'수신거부'}
                    cate={'gray'}
                    size={'s'}
                    color={'gray'}
                    disabled={true}
                  />
                  <p className="cate">gray / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'수신거부'}
                    cate={'gray'}
                    size={'s'}
                    color={'gray'}
                  />
                  <p className="cate">gray</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'수신거부'}
                    cate={'gray'}
                    size={'es'}
                    color={'gray'}
                    disabled={true}
                  />
                  <p className="cate">gray / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'수신거부'}
                    cate={'gray'}
                    size={'es'}
                    color={'gray'}
                  />
                  <p className="cate">gray</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'발송 차단'}
                    cate={'gray'}
                    size={'es'}
                    color={'gray'}
                    disabled={true}
                  />
                  <p className="cate">gray / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'발송 차단'}
                    cate={'gray'}
                    size={'es'}
                    color={'gray'}
                  />
                  <p className="cate">gray</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'발송 차단'}
                    cate={'gray'}
                    size={'es'}
                    color={'gray'}
                    icoRight={true}
                    icoRightData={icoSvgData.iconCloseButton2}
                  />
                  <p className="cate">gray / 아이콘 오른쪽</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">ico only</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'편집'}
                    cate={'ico-only'}
                    size={'es'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.pencilFill2}
                    icoSize={12}
                    disabled={true}
                  />
                  <p className="cate">pencilFill2 / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'편집'}
                    cate={'ico-only'}
                    size={'es'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.pencilFill2}
                    icoSize={12}
                  />
                  <p className="cate">pencilFill2</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'정렬'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.sortDown}
                    icoSize={24}
                    disabled={true}
                  />
                  <p className="cate">sortDown / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'정렬'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.sortDown}
                    icoSize={24}
                  />
                  <p className="cate">sortDown</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'정렬'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.sortUp}
                    icoSize={24}
                    disabled={true}
                  />
                  <p className="cate">sortUp / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'정렬'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.sortUp}
                    icoSize={24}
                  />
                  <p className="cate">sortUp</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'검색'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.search}
                    icoSize={18}
                    disabled={true}
                  />
                  <p className="cate">search / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'검색'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.search}
                    icoSize={18}
                  />
                  <p className="cate">search</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'threeDotsVertical'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.threeDotsVertical}
                    icoSize={16}
                    disabled={true}
                  />
                  <p className="cate">threeDotsVertical / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'threeDotsVertical'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.threeDotsVertical}
                    icoSize={16}
                  />
                  <p className="cate">threeDotsVertical</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'arrowLeft'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.arrowLeft}
                    icoSize={24}
                    disabled={true}
                  />
                  <p className="cate">arrowLeft / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'arrowLeft'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'body-text'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.arrowLeft}
                    icoSize={24}
                  />
                  <p className="cate">arrowLeft</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div
                  className="guide__box g--type2"
                  style={{ background: 'black' }}
                >
                  <Button
                    label={'삭제'}
                    cate={'ico-only'}
                    size={'s24'}
                    color={'alert'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                    disabled={true}
                  />
                  <p className="cate">iconCloseButton / disabled</p>
                </div>
              </li>
              <li className="guide__item">
                <div
                  className="guide__box g--type2"
                  style={{ background: 'black' }}
                >
                  <Button
                    label={'삭제'}
                    cate={'ico-only'}
                    size={'s24'}
                    color={'alert'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.iconCloseButton}
                    icoSize={16}
                  />
                  <p className="cate">iconCloseButton / disabled</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">link ico</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.newswire.co.kr/'}
                    target="_blank"
                    label={'도움말'}
                    cate={'link-ico'}
                    size={'navbar'}
                    color={'body-selected'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.questionLg}
                  />
                  <p className="cate">a태그 (현재창) / questionLg </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.newswire.co.kr/'}
                    target={'_blank'}
                    label={'도움말'}
                    cate={'link-ico'}
                    size={'navbar'}
                    color={'body-selected'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.questionLg}
                  />
                  <p className="cate">a태그 (새창) / questionLg</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">link ico text</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
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
                  <p className="cate">a태그 / naver </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://twitter.com/?lang=ko'}
                    target={'_blank'}
                    label={'트위터'}
                    cate={'link-ico-text-sns'}
                    size={''}
                    color={'body-link'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.twitter}
                  />
                  <p className="cate">a태그 / twitter </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
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
                  <p className="cate">a태그 / facebook </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
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
                  <p className="cate">a태그 / linkedin </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
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
                  <p className="cate">a태그 / youtube </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://blog.naver.com/'}
                    target={'_blank'}
                    label={'블로그'}
                    cate={'link-ico-text-sns'}
                    size={''}
                    color={'body-link'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.blogFill}
                  />
                  <p className="cate">a태그 / blogFill </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.newswire.co.kr/'}
                    target={'_blank'}
                    label={'개인 페이지'}
                    cate={'link-ico-text-sns'}
                    size={''}
                    color={'body-link'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.houseDoorFill}
                  />
                  <p className="cate">a태그 / houseDoorFill </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.instagram.com/'}
                    target={'_blank'}
                    label={'인스타그램'}
                    cate={'link-ico-text-sns'}
                    size={''}
                    color={'body-link'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.instagram}
                  />
                  <p className="cate">a태그 / instagram </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">link ico text</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'#!'}
                    label={'소셜미디어 추가'}
                    cate={'link-ico-text'}
                    size={''}
                    color={'body-link'}
                    icoLeft={true}
                    // icoSize={}
                    icoLeftData={icoSvgData.plus}
                  />
                  <p className="cate">a태그 / 왼쪽 </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    label={'입력 샘플 다운로드'}
                    cate={'link-ico-text'}
                    size={''}
                    color={'body-link'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.excelFill}
                  />
                  <p className="cate">왼쪽 </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'#!'}
                    label={'중앙일보'}
                    cate={'link-ico-text'}
                    size={'es'}
                    color={'body-text'}
                    icoRight={true}
                    icoRightData={icoSvgData.chevronThickRight}
                    icoSize={14}
                  />
                  <p className="cate">a태그 / 오른쪽 </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">link text</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'장지승'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                  />
                  <p className="cate">a태그 / link</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">link text dark</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'장지승'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-text'}
                  />
                  <p className="cate">a태그 / link</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">link text arrow</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'자세히보기'}
                    cate={'link-text-arrow'}
                    size={'m'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronLeft}
                  />
                  <p className="cate">a태그 / 왼쪽 화살표 primary </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'자세히보기'}
                    cate={'link-text-arrow'}
                    size={'s'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronLeft}
                  />
                  <p className="cate">a태그 / 왼쪽 화살표 primary </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'자세히보기'}
                    cate={'link-text-arrow'}
                    size={'m'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronLeft}
                  />
                  <p className="cate">a태그 / 왼쪽 화살표 secondary </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'자세히보기'}
                    cate={'link-text-arrow'}
                    size={'s'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronLeft}
                  />
                  <p className="cate">a태그 / 왼쪽 화살표 secondary </p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'자세히보기'}
                    cate={'link-text-arrow'}
                    size={'m'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.chevronRight}
                  />
                  <p className="cate">a태그 / 오른쪽 화살표 primary </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'자세히보기'}
                    cate={'link-text-arrow'}
                    size={'s'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.chevronRight}
                  />
                  <p className="cate">a태그 / 오른쪽 화살표 primary </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'자세히보기'}
                    cate={'link-text-arrow'}
                    size={'m'}
                    color={'secondary'}
                    icoRight={true}
                    icoRightData={icoSvgData.chevronRight}
                  />
                  <p className="cate">a태그 / 오른쪽 화살표 secondary </p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Button
                    elem="a"
                    url={'https://www.naver.com/'}
                    label={'자세히보기'}
                    cate={'link-text-arrow'}
                    size={'s'}
                    color={'secondary'}
                    icoRight={true}
                    icoRightData={icoSvgData.chevronRight}
                  />
                  <p className="cate">a태그 / 오른쪽 화살표 secondary </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className="guide__section"
        style={{ marginTop: '30px' }}
      >
        <h2 className="guide__title">추가 버튼</h2>
        <div style={{ marginTop: '20px' }}>
          <div className="guide__group">
            <div className="button-add__section">
              <button
                type="button"
                className="button-add__button"
              >
                <span className="button-add__button-ico">
                  <IcoSvg data={icoSvgData.personFill} />
                </span>
                <span className="button-add__button-text">1개씩 추가</span>
              </button>
              <button
                type="button"
                className="button-add__button"
              >
                <span className="button-add__button-ico">
                  <IcoSvg data={icoSvgData.excelFill} />
                </span>
                <span className="button-add__button-text">엑셀로 추가</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
