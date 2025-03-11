/**
 * @file EtcPopup.tsx
 * @description 기타 팝업
 */

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'

interface Props {
  /** 팝업 열기 여부 */
  isOpen: boolean

  /**
   * 팝업 닫기
   * @returns
   */
  onClose: () => void
}

const EtcPopup = ({ isOpen, onClose }: Props) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleClose}
      title={'기타'}
      hasCloseButton
      width={600}
      //height={400}
      className="popup-none-scroll"
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
            <div className="flex-wrap align-items-center">
              <FormTitle title={'직종'} />
              <Select
                options={[
                  { id: '0', name: '선택' },
                  { id: '1', name: '기자' },
                  { id: '2', name: '편집국장' },
                  { id: '3', name: '논설위원' },
                  { id: '4', name: '편집자' },
                  { id: '5', name: '객원기자' },
                  { id: '6', name: '사진영상' },
                  { id: '7', name: 'PD' },
                  { id: '8', name: '아나운서' },
                ]}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap align-items-center">
              <FormTitle title={'언어'} />
              <Select
                options={[
                  { id: '0', name: '선택' },
                  { id: '1', name: '한국어' },
                  { id: '2', name: '네덜란드어' },
                  { id: '3', name: '독일어' },
                  { id: '4', name: '러시아어' },
                  { id: '5', name: '말레이시아어' },
                  { id: '6', name: '몽골어' },
                  { id: '7', name: '방글라데시어' },
                  { id: '8', name: '베트남어' },
                  { id: '9', name: '스페인어' },
                  { id: '10', name: '아랍어' },
                  { id: '11', name: '영어' },
                  { id: '12', name: '이탈리아어' },
                  { id: '13', name: '인도네시아어' },
                  { id: '14', name: '일본어' },
                  { id: '15', name: '중국어' },
                  { id: '16', name: '크로아티아어' },
                  { id: '17', name: '태국어' },
                  { id: '18', name: '터키어' },
                  { id: '19', name: '포르투갈어' },
                  { id: '20', name: '프랑스어' },
                  { id: '21', name: '힌디어' },
                  { id: '22', name: '기타' },
                ]}
              />
            </div>
          </li>
          <li>
            <div className="flex-wrap  ">
              <FormTitle title={'고정물'} />
              <div className="textarea__group">
                <textarea
                  rows={2}
                  maxLength={500}
                />
              </div>
            </div>
          </li>
          <li>
            <div className="flex-wrap  align-items-center">
              <FormTitle title={'출생지'} />
              <div className="w40p">
                <FormInputText inputType={'text'} />
              </div>
            </div>
          </li>
          <li>
            <div className="flex-wrap  align-items-center">
              <FormTitle title={'출생년도'} />
              <Select
                options={[
                  { id: '0', name: '선택' },
                  { id: '1', name: '1920년' },
                  { id: '2', name: '1921년' },
                  { id: '3', name: '1922년' },
                  { id: '4', name: '1923년' },
                  { id: '5', name: '1924년' },
                  { id: '6', name: '1925년' },
                  { id: '7', name: '1926년' },
                ]}
              />
            </div>
          </li>
        </ul>
      </div>
    </Popup>
  )
}

export default EtcPopup
