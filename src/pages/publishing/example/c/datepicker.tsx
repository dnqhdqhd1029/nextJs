/**
 * @file datepicker.tsx
 * @description 가이드 - datepicker 페이지
 */
import Link from 'next/link'

import DatePicker from '~/publishing/components/common/ui/DatePicker'
import DatePickerRange from '~/publishing/components/common/ui/DatePickerRange'
import { PageType } from '~/types/common'

const About: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">Datepicker Page</h1>

        <code className="guide__code">
          문서&nbsp;:&nbsp;
          <Link
            href="https://reactdatepicker.com/#example-custom-day-class-name"
            legacyBehavior
          >
            <a target="_blank">https://reactdatepicker.com/#example-custom-day-class-name</a>
          </Link>
        </code>

        <h2 className="guide__title">단일</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <DatePicker />

                <code className="guide__code">&lt;DatePicker /&gt;</code>
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">Range</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <DatePickerRange />
                <code className="guide__code">&lt;DatePickerRange /&gt;</code>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default About
About.PublishingLayout = 'BLANK'
