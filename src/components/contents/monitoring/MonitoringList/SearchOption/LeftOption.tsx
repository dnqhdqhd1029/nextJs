import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const LeftOption = forwardRef<HTMLDivElement>((_, getOpenRef) => {
  const {
    searchDropBoxActivate,
    monitoringListParams,
    isOwner,
    isFilterSubParam,
    monitoringDate,
    monitoringIdParams,
    monitoringCategoryData,
    monitoringSearchOptionParams,
    searchActivate,
    setkeywordsActionAnd,
    setkeywordsActionOr,
    setkeywordsActionNot,
    setResetSearchOption,
    monitoringCategoryList,
    openMonitoringPopup,
    changeSearchOption,
    updateMonitroing,
  } = useMonitoringSearch()
  const shareIdOpenRef = useRef<HTMLDivElement>(null)
  const [isOption, setIsOption] = useState(false)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

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
                      onChange={e => setkeywordsActionAnd(e.target.value, monitoringSearchOptionParams)}
                      value={monitoringSearchOptionParams.and}
                    />
                  </div>
                </li>
                <li>
                  <div className="after-or">
                    <FormInputText
                      title={'하나라도 포함'}
                      onChange={e => setkeywordsActionOr(e.target.value, monitoringSearchOptionParams)}
                      value={monitoringSearchOptionParams.or}
                    />
                  </div>
                </li>
                <li>
                  <div className="after-not">
                    <FormInputText
                      title={'제외'}
                      onChange={e => setkeywordsActionNot(e.target.value, monitoringSearchOptionParams)}
                      value={monitoringSearchOptionParams.not}
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
                    onClick={() =>
                      monitoringCategoryData &&
                      changeSearchOption(
                        monitoringListParams,
                        monitoringSearchOptionParams,
                        monitoringDate,
                        monitoringCategoryData,
                        isOwner,
                        isFilterSubParam
                      )
                    }
                  />
                </div>
                <div className="flexible-search__button-save">
                  {!searchDropBoxActivate ? (
                    <div
                      className="select__section select-type1-medium select-type1-tertiary select-align-right"
                      ref={shareIdOpenRef}
                    >
                      <button
                        className="select__label"
                        disabled={!searchActivate}
                        onClick={() => {
                          setIsOption(() => false)
                          updateMonitroing(
                            monitoringListParams,
                            monitoringIdParams,
                            monitoringSearchOptionParams,
                            monitoringDate,
                            isOwner,
                            isFilterSubParam
                          )
                        }}
                      >
                        <span className="select__label-text">검색 조건 저장</span>
                      </button>
                    </div>
                  ) : (
                    <div
                      // className="select__section select-type1-medium select-line select-align-right"
                      className={cn('select__section select-type1-medium select-type1-tertiary select-align-right', {
                        'is-show': isOption,
                      })}
                      ref={shareIdOpenRef}
                    >
                      <button
                        className="select__label"
                        disabled={!searchActivate}
                        onClick={() => setIsOption(!isOption)}
                      >
                        <span className="select__label-text">검색 조건 저장</span>
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </button>

                      <div className={cn('select-option__section', { 'display-block': isOption })}>
                        <div className="select-option__area">
                          <ul className="select-option__group">
                            <li>
                              <button
                                className="select-option__item"
                                onClick={() => {
                                  setIsOption(() => false)
                                  updateMonitroing(
                                    monitoringListParams,
                                    monitoringIdParams,
                                    monitoringSearchOptionParams,
                                    monitoringDate,
                                    isOwner,
                                    isFilterSubParam
                                  )
                                }}
                              >
                                <span className="select-option__item-text">검색 조건 수정</span>
                              </button>
                            </li>
                            <li>
                              <button
                                className="select-option__item"
                                onClick={() => {
                                  setIsOption(() => false)
                                  openMonitoringPopup(monitoringCategoryList, monitoringSearchOptionParams)
                                }}
                              >
                                <span className="select-option__item-text">새 모니터링 만들기</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
})

export default LeftOption
