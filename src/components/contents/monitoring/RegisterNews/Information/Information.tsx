import { Fragment } from 'react'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const RegisterNewsInformation = () => {
  const { step, onChangeStep } = useRegisterNews()
  return (
    <Fragment>
      {step === 'information' && (
        <Fragment>
          <div className="mb-contents-header__section">
            <div className="common-title__section">
              <div className="common-title__group">
                <h2 className="common-title__title">뉴스 추가</h2>
              </div>
            </div>
          </div>
          <div
            className="tabs__section type1-medium"
            style={{ borderBottom: 'unset' }}
          >
            <ul className="interval-mt28">
              <li>
                <p className="font-body__regular">
                  개인적으로 뉴스를 추가해 관리할 수 있는 기능입니다.
                  <br />
                  추가한 뉴스는 내 회사에서만 사용됩니다.
                </p>
              </li>
              <li>
                <div className="button-add__section">
                  <button
                    type="button"
                    className="button-add__button"
                    onClick={() => onChangeStep('personal')}
                  >
                    <span className="button-add__button-ico">
                      {/* <IcoSvg data={icoSvgData.newspaperTxt} /> */}
                      <span className="ico-svg">
                        <img
                          src="/assets/svg/add-news.svg"
                          alt=""
                        />
                      </span>
                    </span>
                    <span className="button-add__button-text">1개씩 추가</span>
                  </button>
                  <button
                    type="button"
                    className="button-add__button"
                    onClick={() => onChangeStep('excel')}
                  >
                    <span className="button-add__button-ico">
                      {/*  <IcoSvg data={icoSvgData.excelFill} /> */}
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
        </Fragment>
      )}
    </Fragment>
  )
}

export default RegisterNewsInformation
