import { Fragment, useEffect, useRef } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import TagList from '~/components/common/ui/TagList'
import ExcelItems from '~/components/contents/admin/AddUser/ExcelStep/ExcelItems'
import { FILE_EXTENSIONS } from '~/constants/common'
import { useAddUser } from '~/utils/hooks/contents/admin/useAddUser'

const ExcelStep = () => {
  const {
    currentGroup,
    step,
    registerType,
    emailData,
    emailDataLoading,
    emailDataChecked,
    handlePagestepAction,
    emailAllCheckedExcelParamsOnChange,
    emailDeleteExcelParamsOnChange,
    onChangeFiles,
    setResetTagPressListAction,
    setAllResetTagPressListAction,
  } = useAddUser()

  useEffect(() => {
    console.log('emailData', emailData)
  }, [])
  return (
    <Fragment>
      <div style={{ display: step === 'email' && registerType === 'excel' ? 'block' : 'none' }}>
        <div className={cn('setting-member__section')}>
          <ul className="interval-line-list28">
            <li>
              <div className="mb-contents-pb16__group">
                <h3
                  className="setting__headings6"
                  style={{ fontWeight: 600 }}
                >
                  엑셀로 추가
                </h3>
                <p className="font-body__regular">
                  이메일이 입력된 엑셀 또는 CSV 파일로 여러 회원을 추가할 수 있습니다.
                </p>
              </div>
              <div className="button-add__section">
                <button
                  type="button"
                  className="button-add__button"
                  disabled={emailData.excelFileList.length > 0 ? true : emailDataLoading}
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
                  <span className="button-add__button-text">엑셀 업로드</span>
                  <input
                    type="file"
                    className="file-uploader__input"
                    onChangeCapture={e => onChangeFiles(e, emailData)}
                    disabled={emailData.excelFileList.length > 0 ? true : emailDataLoading}
                    accept={FILE_EXTENSIONS.excel}
                    multiple={false}
                  />
                </button>
              </div>
              <TagList
                tagItems={emailData.excelFileList}
                onTagItemClose={e => setResetTagPressListAction(e, emailData)}
                onAllTagItemClose={() => setAllResetTagPressListAction(emailData)}
              />
            </li>
            {emailData.excelList && emailData.excelList.length > 0 ? (
              <Fragment>
                <li>
                  <div className="mb-contents-pb16__group">
                    <FormTitle title="엑셀로 추가된 이메일 목록" />
                  </div>
                  <div className="guide__group">
                    <div className="guide__box g--type2">
                      <div className="table-type1__section">
                        <div style={{ borderBottom: '1px solid #d9dbdb', paddingTop: 10, paddingBottom: 20 }}>
                          <div
                            className="search-result__header-sort type-pl-14"
                            style={{ paddingLeft: 10 }}
                          >
                            <FormInputBtn
                              type="checkbox"
                              name={'search-result__header-sort'}
                              id={'search-result__header-sort'}
                              label={`총 ${emailData.excelList.length}개`}
                              checked={emailData.excelList.length === emailData.execelIdList.length}
                              onChange={e => emailAllCheckedExcelParamsOnChange(e, emailData)}
                            />
                            {emailData.execelIdList.length > 0 && (
                              <div className="header-sort__action">
                                <Button
                                  label={'삭제하기'}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-text'}
                                  onClick={() => emailDeleteExcelParamsOnChange(emailData)}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <table>
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                style={{ width: '100%', paddingLeft: 35 }}
                              >
                                이메일
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {emailData.excelList &&
                              emailData.excelList.map(e => (
                                <ExcelItems
                                  key={'excelParams.excelList' + e.id + e.email}
                                  {...e}
                                />
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <div className="mb-contents-pb16__group">
                    <FormTitle title="엑셀 샘플" />
                    <Button
                      elem="a"
                      label={'입력 샘플 다운로드'}
                      cate={'link-ico-text'}
                      size={''}
                      color={'body-link'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.excel}
                      url={'https://svc.d.mediabee.kr/sample/email_sample.xlsx'}
                      download={true}
                    />
                  </div>
                </li>
                <li className="no-padding no-border">
                  <div className="bullet-list__group">
                    <h6 className="bullet-list__title">주의 사항</h6>
                    <ul className="bullet-list">
                      <li>
                        <p className="bullet-list__text">
                          회원을 위 샘플을 참고해 엑셀 또는 CSV파일로 저장한 후 업로드하세요.
                        </p>
                      </li>
                      <li>
                        <p className="bullet-list__text">파일 사이즈는 10MB까지 허용됩니다.</p>
                      </li>
                      <li>
                        <p className="bullet-list__text">이메일은 필수 입력 필드입니다.</p>
                      </li>
                      <li>
                        <p className="bullet-list__text">한 번에 2,000개까지 이메일을 업로드할 수 있습니다.</p>
                      </li>
                    </ul>
                  </div>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
        <div className="mb-contents-footer__section">
          <div className="buttons__group type-between">
            <div className="buttons__group type-left">
              <Button
                label={'취소'}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                onClick={() => handlePagestepAction('', '', currentGroup)}
              />
            </div>
            <Button
              label={'다음'}
              cate={'default-ico-text'}
              size={'m'}
              color={'primary'}
              icoRight={true}
              disabled={!emailDataChecked}
              icoRightData={icoSvgData.chevronThickRight}
              onClick={() => emailDataChecked && handlePagestepAction('authority', 'excel', currentGroup)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ExcelStep
