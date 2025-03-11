/**
 * @file spinner.tsx
 * @description spinner 페이지
 */

import Image from 'next/image'

import SpinnerImg from '/public/assets/png/spinner.png'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">spinner</h1>

        <h2 className="guide__title">size 24</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="spinner__group s24">
              <Image
                src={SpinnerImg}
                alt=""
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
        <h2 className="guide__title">size 36</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="spinner__group s36">
              <Image
                src={SpinnerImg}
                alt=""
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
        <h2 className="guide__title">size 48</h2>
        <div className="guide__group">
          <div className="guide__box g--type2">
            <div className="spinner__group s48">
              <Image
                src={SpinnerImg}
                alt=""
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
