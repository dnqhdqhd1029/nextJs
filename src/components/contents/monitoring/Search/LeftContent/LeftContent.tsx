import { forwardRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import { openMonitoringPopupAction } from '~/stores/modules/contents/monitoring/monitoringPopup'
import { useAppDispatch } from '~/utils/hooks/common/useRedux'
import { useMonitoringSearchOptions } from '~/utils/hooks/contents/monitoring/useMonitoringSearchOptions'

const LeftContent = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const dispatch = useAppDispatch()
  const {
    monitoringActivate,
    keywords,
    searchActivate,
    additionalParam,
    setkeywordsActionAnd,
    setkeywordsActionNot,
    setkeywordsActionOr,
    setResetSearchOption,
    monitoringCategoryList,
    openMonitoringPopup,
    moveSearchResult,
  } = useMonitoringSearchOptions()
  return (
    <div className="flexible__group">
      <div className="flexible-item__group">
        <div className="flexible-item__contents">
          <ul className="interval-mt16">
            <li>
              <h4 className="font-heading--h5">키워드</h4>
              <p className="font-body__small color-secondary">
                여러 개 입력 시 쉼표나 공백으로 분리. 정확한 단어 또는 문구 검색은 &#8220; &#8221;를 사용
              </p>
            </li>
            <li>
              <ul>
                <li>
                  <div className="after-and">
                    <FormInputText
                      title={'모두 포함'}
                      onChange={e => setkeywordsActionAnd(e.target.value, keywords)}
                      value={keywords.and}
                    />
                  </div>
                </li>
                <li>
                  <div className="after-or">
                    <FormInputText
                      title={'하나라도 포함'}
                      onChange={e => setkeywordsActionOr(e.target.value, keywords)}
                      value={keywords.or}
                    />
                  </div>
                </li>
                <li>
                  <div className="after-not">
                    <FormInputText
                      title={'제외'}
                      onChange={e => setkeywordsActionNot(e.target.value, keywords)}
                      value={keywords.not}
                    />
                  </div>
                </li>
              </ul>
            </li>
            <li className="sp-pt-4">
              <div className="flexible-search__button">
                <div className="flexible-search__button-reset">
                  <Button
                    label={'초기화'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    onClick={() => setResetSearchOption()}
                    disabled={!searchActivate}
                  />
                </div>
                <div className="flexible-search__button-search">
                  <Button
                    label={'검색'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                    disabled={!searchActivate}
                    onClick={() => moveSearchResult(keywords, additionalParam)}
                  />
                </div>
                <div className="flexible-search__button-save">
                  <Button
                    label={'검색 조건 저장'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                    disabled={!monitoringActivate}
                    onClick={() => openMonitoringPopup(monitoringCategoryList, keywords, additionalParam)}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
})

export default LeftContent
