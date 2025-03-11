/**
 * @file FooterButton.tsx
 * @description 푸터 공통
 */

interface FooterButtonProps {
  [key: string]: boolean
}

import Button from '~/publishing/components/common/ui/Button'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

const FooterButton = ({ left, center, right }: FooterButtonProps) => {
  return (
    <div className="footer-button__group">
      {left && (
        <ul className="footer-button__list">
          <li>
            <Button
              label={'이전'}
              cate={'default-ico-text'}
              size={'m'}
              color={'outline-secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.chevronThickLeft}
            />
          </li>
        </ul>
      )}

      {center && (
        <ul className="footer-button__list type-center">
          <li>
            <Button
              label={'미리보기'}
              cate={'default'}
              size={'m'}
              color={'outline-secondary'}
            />
          </li>
        </ul>
      )}

      {right && (
        <ul className="footer-button__list type-right">
          <li>
            <Button
              label={'저장하고 나가기'}
              cate={'default'}
              size={'m'}
              color={'outline-secondary'}
            />
          </li>
          <li>
            <Button
              label={'다음'}
              cate={'default-ico-text'}
              size={'m'}
              color={'primary'}
              icoRight={true}
              icoRightData={icoSvgData.chevronThickRight}
            />
          </li>
        </ul>
      )}
    </div>
  )
}

FooterButton.defaultProps = {
  left: false,
  center: false,
  right: true,
}

export default FooterButton
