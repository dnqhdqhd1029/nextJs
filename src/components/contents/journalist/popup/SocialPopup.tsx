/**
 * @file SocialPopup.tsx
 * @description 소셜 팝업
 */

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import Tooltips from '~/components/common/ui/Tooltips'

interface Props {
  /** 팝업 열기 여부 */
  isOpen: boolean

  /**
   * 팝업 닫기
   * @returns
   */
  onClose: () => void
}

const SocialPopup = ({ isOpen, onClose }: Props) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleClose}
      title={'소셜'}
      hasCloseButton
      width={600}
      //height={400}
      className="mb-postcode-popup__section"
      showFooter={true}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'저장'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            //onClick={onConfirm ?? handleClose}
          />
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            onClick={handleClose}
          />
        </div>
      }
    >
      <div className="form-group">
        {/**/}
        <ul>
          <li>
            <div className="flex-wrap  align-items-center">
              <div className="flex-just-start align-items-center">
                <FormTitle title={'소셜 정보 제공'} />
                &nbsp;
                <Tooltips
                  tooltipId={'ipt-tt0'}
                  tooltipPlace={'top'}
                  tooltipHtml={'동의 시 미디어비 운영자가 소셜 정보를 프로필 업데이트에 참고할 수 있습니다.\n'}
                  tooltipComponent={<IcoTooltip />}
                />
              </div>
              <div>
                <FormBasicRadio
                  label="동의"
                  value="agree"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <FormBasicRadio
                  label="동의안함"
                  value="agree"
                />
              </div>
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'개인 페이지'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'네이버 언론인'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'페이스북'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'링크드인'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'X (트위터)'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'블로그'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'인스타그램'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'유튜브'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'카카오스토리'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'카페'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'개인 페이지'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'SOOP'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'네이버TV'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'카카오TV'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'틱톡'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'네이버포스트'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'밴드'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'브런치'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'팟빵'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'오디오 클립'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'기타'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'네이버 인플루언서 <br/> 검색'} />
              <FormInputText
                inputType={'text'}
                placeholder={'http://'}
              />
            </div>
          </li>
        </ul>
      </div>
    </Popup>
  )
}

export default SocialPopup
