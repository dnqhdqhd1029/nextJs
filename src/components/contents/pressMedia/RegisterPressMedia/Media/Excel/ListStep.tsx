import { Fragment, MouseEvent, useState } from 'react'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import TagList from '~/components/common/ui/TagList'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const ListStep = () => {
  const {
    categoryData,
    categoryDataAddStepHandle,
    categoryDataInformationHandle,
    mediaExcelParams,
    setMediaListPopupAction,
    mediaExcelAllDeleteJrnlstListsAction,
    mediaExcelDeleteJrnlstListsAction,
    mediaExcelValidate,
    mediaExcelAddAction,
  } = useRegisterPressMedia()

  const [isLoading, setIsLoading] = useState(false)

  const actionAndNext = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    const check = await mediaExcelValidate(mediaExcelParams)
    if (check) {
      await mediaExcelAddAction(mediaExcelParams)
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
                <p className="font-body__regular">추가하려는 매체를 목록에 담고 싶으면 선택하세요.</p>
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
                    onClick={() => setMediaListPopupAction(true, mediaExcelParams.mediaBookLists)}
                  />
                </div>
                <TagList
                  tagItems={mediaExcelParams.mediaBookLists}
                  onTagItemClose={e => mediaExcelDeleteJrnlstListsAction(e, mediaExcelParams)}
                  onAllTagItemClose={() => mediaExcelAllDeleteJrnlstListsAction(mediaExcelParams)}
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
