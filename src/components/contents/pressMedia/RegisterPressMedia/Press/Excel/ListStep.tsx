import { Fragment, MouseEvent, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import TagList from '~/components/common/ui/TagList'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const ListStep = () => {
  const {
    categoryData,
    pressExcelParams,
    setPressListPopupAction,
    pressExcelAllDeleteJrnlstListsAction,
    pressExcelDeleteJrnlstListsAction,
    categoryDataAddStepHandle,
    categoryDataInformationHandle,
    pressExcelValidate,
    pressExcelAddAction,
  } = useRegisterPressMedia()

  const [isLoading, setIsLoading] = useState(false)

  const actionAndNext = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    const check = await pressExcelValidate(pressExcelParams)
    if (check) {
      await pressExcelAddAction(pressExcelParams)
    }
    setIsLoading(() => false)
  }

  return (
    <Fragment>
      {categoryData.addStep === 'list' && (
        <Fragment>
          <ul className="interval-mt14">
            <li>
              <div className="mb-contents-pb16__group">
                <p className="font-body__regular">입력한 언론인을 저장할 목록이 있다면 선택하세요.</p>
              </div>
            </li>
            <li style={{ paddingTop: 20 }}>
              <div className="select-form__section select-form-btn">
                <div className="select-form__group">
                  <Button
                    label={'목록 선택'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                    onClick={() => setPressListPopupAction(true, pressExcelParams.jrnlstLists)}
                  />
                </div>
                <TagList
                  tagItems={pressExcelParams.jrnlstLists}
                  onTagItemClose={e => pressExcelDeleteJrnlstListsAction(e, pressExcelParams)}
                  onAllTagItemClose={() => pressExcelAllDeleteJrnlstListsAction(pressExcelParams)}
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
                  onClick={() => categoryDataAddStepHandle('add', categoryData)}
                />
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  disabled={isLoading}
                  onClick={() => categoryDataInformationHandle('information', categoryData)}
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
