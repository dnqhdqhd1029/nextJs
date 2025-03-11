/**
 * @file J50.tsx
 * @description J50 페이지
 */

import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">언론인 추가</h2>
                </div>
              </div>
            </div>

            <div className="tabs__section type1-medium border-none">
              <ul className="interval-mt28">
                <li>
                  <div className="tabs-menu__group">
                    <ul className="tabs-menu__list bb-0">
                      <li className="is-active">
                        <button
                          type="button"
                          className="tabs-menu__btn"
                        >
                          <span className="tabs-menu__name">언론인</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="tabs-menu__btn"
                        >
                          <span className="tabs-menu__name">미디어</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  {/* 언론인 */}
                  <div className="tabs-panel__section">
                    <div className="tabs-panel__group">
                      <ul className="interval-mt28">
                        <li>
                          <p className="font-body__regular">
                            개인적으로 언론인을 추가해 관리할 수 있는 기능입니다.
                            <br />
                            추가한 언론인은 내 회사에서만 사용됩니다.
                          </p>
                        </li>
                        <li>
                          <div className="button-add__section">
                            <button
                              type="button"
                              className="button-add__button"
                            >
                              <span className="button-add__button-ico">
                                <IcoSvg data={icoSvgData.personFill} />
                              </span>
                              <span className="button-add__button-text">1명씩 추가</span>
                            </button>
                            <button
                              type="button"
                              className="button-add__button"
                            >
                              <span className="button-add__button-ico">
                                <IcoSvg data={icoSvgData.excelFill} />
                              </span>
                              <span className="button-add__button-text">엑셀로 추가</span>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
