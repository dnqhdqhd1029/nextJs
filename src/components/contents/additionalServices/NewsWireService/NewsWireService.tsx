/**
 * @file UserService.tsx
 * @description 부가 서비스 - 뉴스와이어
 */
import { useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import LoadingBox from '~/components/contents/additionalServices/LoadingBox/LoadingBox'
import { RECAPTCHA_MIN_SCORE } from '~/constants/common'
import { getCurrencyFormat } from '~/utils/common/number'
import { useRecaptcha } from '~/utils/hooks/common/useRecaptcha'
import { useAdditionalServices } from '~/utils/hooks/contents/additionalServices/useAdditionalServices'

const NewsWireService = () => {
  const {
    listItemLoading,
    selectedValue,
    itemList,
    itemKey,
    itemType,
    setItemTypeAction,
    setServicePopupAction,
    openRequestPopup,
    popupTypes,
    additionalServiceDone,
  } = useAdditionalServices()
  const { isV3Failed, setIsV3Failed, v2Token, setV2Token, textRecaptchaV3, testRecaptchaV2 } = useRecaptcha({
    minScore: RECAPTCHA_MIN_SCORE,
  })

  const checkV2Recaptcha = async (token: string | null) => {
    if (!token) return
    const result = await testRecaptchaV2(token)
    setIsV3Failed(false)
    if (result) await additionalServiceDone(itemKey, itemType)
  }

  const checkV3Recaptcha = async () => {
    const v3Result = await textRecaptchaV3()
    !v3Result ? setIsV3Failed(true) : await additionalServiceDone(itemKey, itemType)
  }
  const onChangeData = async (e: React.MouseEvent<HTMLTableRowElement>, count: string, id: string) => {
    e.preventDefault()
    setItemTypeAction(count, id)
  }

  return (
    <>
      {selectedValue.id === '137' && (
        <>
          <li>
            <div className="service-addition__table">
              <div className="table-type4__section">
                <table>
                  <colgroup>
                    <col width={'6%'} />
                    <col width={'19%'} />
                    <col
                      span={3}
                      width={'25%'}
                    />
                  </colgroup>
                  <caption>caption</caption>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">수량</th>
                      <th scope="col">가격(부가세 별도)</th>
                      <th scope="col">단가</th>
                      <th scope="col">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItemLoading ? (
                      <LoadingBox />
                    ) : (
                      <>
                        {itemList.map((e, index) => (
                          <tr
                            key={index}
                            onClick={i => onChangeData(i, e.count.toString(), selectedValue.id.toString())}
                          >
                            <td>
                              <FormBasicRadio
                                name={selectedValue.id + e.count.toString()}
                                id={selectedValue.id + e.count.toString()}
                                checked={itemKey === selectedValue.id.toString() && itemType === e.count.toString()}
                                onChange={() => setItemTypeAction(e.count.toString(), selectedValue.id.toString())}
                              />
                            </td>
                            <td>{getCurrencyFormat(e.count)}개</td>
                            <td>{getCurrencyFormat(e.price)}원</td>
                            <td>{getCurrencyFormat(e.computedPrice)}원</td>
                            <td></td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </li>
          <li>
            <div className="service-addition__text">
              <span className="type-bold">
                구매한 부가 서비스는 사용권의 유효기간 내에서만 사용할 수 있습니다. 사용권의 유효기간이 지나면 소멸해 쓸
                수 없습니다.
              </span>
              <Button
                label={'환불 규정'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() => setServicePopupAction(true)}
              />
            </div>
            <div className="service-addition__text">
              <span>
                더 많은 뉴스와이어 배포 서비스 추가가 필요하면 견적을 요청하세요. 견적 후 카드 결제도 가능합니다.
              </span>
              <Button
                label={'견적 요청'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() => openRequestPopup(popupTypes)}
              />
            </div>
          </li>
          {isV3Failed && (
            <li>
              <div className="display-flex justify-content__center align-items__center mt-8 mb-8">
                <ReCAPTCHA
                  size="normal"
                  sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
                  onChange={token => checkV2Recaptcha(token)}
                />
              </div>
            </li>
          )}
          <li>
            <div className="mb-contents-footer__section">
              <div className="buttons__group button-min-w120">
                <Button
                  label={'선택하기'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                  disabled={itemType === ''}
                  onClick={() => checkV3Recaptcha()}
                />
              </div>
            </div>
          </li>
        </>
      )}
    </>
  )
}

export default NewsWireService
