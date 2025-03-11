import { Fragment } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const Information = () => {
  const { categoryList, categoryData, categoryDataHandle, categoryDataNextStepHandle } = useRegisterPressMedia()

  return (
    <Fragment>
      {categoryData.main === 'information' && (
        <div className="mb-contents">
          <div className="mb-contents-header__section">
            <div className="common-title__section">
              <div className="common-title__group">
                {/* <h2 className="common-title__title">{categoryData.name} 추가</h2> */}
                <h2 className="common-title__title">연락처 추가</h2>
              </div>
            </div>
          </div>
          <div
            className="tabs__section type1-medium"
            style={{ borderBottom: 'unset' }}
          >
            <ul className="interval-mt28">
              <li>
                <div className="tabs-menu__group">
                  <ul
                    className="tabs-menu__list bb-0"
                    style={{ width: 'unset' }}
                  >
                    {categoryList &&
                      categoryList.map(e => (
                        <li
                          className={cn({
                            'is-active': categoryData.id === e.id,
                          })}
                          key={'tabs-menu__group_useRegisterPressMedia' + e.main + e.id}
                          id={'useRegisterPressMedia' + e.id}
                          onClick={i => categoryDataHandle(e)}
                        >
                          <button
                            type="button"
                            className="tabs-menu__btn"
                            id={'useRegisterPressMedia_button' + e.id}
                          >
                            <span className="tabs-menu__name">{e.name}</span>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
              <li>
                <div className="tabs-panel__section">
                  <div className="tabs-panel__group">
                    <ul className="interval-mt28">
                      {categoryData.id === 'press' ? (
                        <li>
                          <p className="font-body__regular">
                            개인적으로 언론인을 추가해 관리할 수 있는 기능입니다.
                            <br />
                            추가한 언론인은 내 회사에서만 사용됩니다.
                          </p>
                        </li>
                      ) : (
                        <li>
                          <p className="font-body__regular">
                            개인적으로 매체를 추가해 관리할 수 있는 기능입니다.
                            <br />
                            추가한 매체는 내 회사에서만 사용됩니다.
                          </p>
                        </li>
                      )}
                      <li>
                        <div className="button-add__section">
                          <button
                            type="button"
                            className="button-add__button"
                            onClick={() => categoryDataNextStepHandle('personal', categoryData)}
                          >
                            <span className="button-add__button-ico">
                              {/* <IcoSvg data={icoSvgData.personFill} /> */}
                              <span className="ico-svg">
                                <img
                                  src="/assets/svg/add-person.svg"
                                  alt=""
                                />
                              </span>
                            </span>
                            {categoryData.id === 'press' ? (
                              <span className="button-add__button-text">1명씩 추가</span>
                            ) : (
                              <span className="button-add__button-text">1개씩 추가</span>
                            )}
                          </button>
                          <button
                            type="button"
                            className="button-add__button"
                            onClick={() => categoryDataNextStepHandle('excel', categoryData)}
                          >
                            <span className="button-add__button-ico">
                              {/* <IcoSvg data={icoSvgData.excelFill} /> */}
                              <span className="ico-svg">
                                <img
                                  src="/assets/svg/add-excel.svg"
                                  alt=""
                                />
                              </span>
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
      )}
    </Fragment>
  )
}

export default Information
