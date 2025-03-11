import { Fragment, MouseEvent, useState } from 'react'

import Button from '~/components/common/ui/Button'
import TagList from '~/components/common/ui/TagList'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const ListStep = () => {
  const {
    addStep,
    excelParams,
    setResetExcelParamsClipBookAction,
    setAllResetExcelParamsClipBookAction,
    setClipbookPopupAction,
    onChangeStep,
    excelAddAction,
    onChangeAddStep,
  } = useRegisterNews()

  const [isLoading, setIsLoading] = useState(false)

  const actionAndNext = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    await excelAddAction(excelParams)
    setIsLoading(() => false)
  }
  return (
    <Fragment>
      {addStep === 'clipbook' && (
        <Fragment>
          <ul className="interval-mt14">
            <li>
              <div className="mb-contents-pb16__group">
                <p className="font-body__regular">입력한 뉴스를 저장할 클립북이 있다면 선택하세요.</p>
              </div>
            </li>
            <li style={{ paddingTop: 20 }}>
              <div className="select-form__section select-form-btn">
                <div className="select-form__group">
                  <Button
                    label={'클립북 선택'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                    onClick={() => setClipbookPopupAction(true, excelParams.clipbookList)}
                  />
                </div>
                <TagList
                  tagItems={excelParams.clipbookList}
                  onTagItemClose={e => setResetExcelParamsClipBookAction(e, excelParams)}
                  onAllTagItemClose={() => setAllResetExcelParamsClipBookAction(excelParams)}
                />
              </div>
            </li>
          </ul>
          <div className="mb-contents-footer__section">
            <div className="buttons__group type-between">
              <div className="buttons__group type-left">
                <Button
                  label={'이전'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  disabled={isLoading}
                  icoLeft={true}
                  icoLeftData={icoSvgData.chevronThickLeft}
                  onClick={() => onChangeAddStep('add')}
                />
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  disabled={isLoading}
                  onClick={() => onChangeStep('information')}
                />
              </div>
              <Button
                label={'다음'}
                cate={'default-ico-text'}
                size={'m'}
                color={'primary'}
                icoRight={true}
                isLoading={isLoading}
                disabled={isLoading}
                icoRightData={icoSvgData.chevronThickRight}
                onClick={e => actionAndNext(e)}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ListStep
