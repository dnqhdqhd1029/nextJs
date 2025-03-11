import { ChangeEvent, Fragment, MouseEvent, useEffect, useLayoutEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormBasicCheckbox from '~/components/common/ui/FormBasicCheckbox'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import TagList from '~/components/common/ui/TagList'
import FileItems from '~/components/contents/monitoring/RegisterNews/AddByExcel/FileStep/FileItems'
import { FILE_EXTENSIONS } from '~/constants/common'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const FileStep = () => {
  const {
    addStep,
    excelParams,
    excelDataLoading,
    filesAllCheckedExcelParamsOnChange,
    filesDeleteExcelParamsOnChange,
    setResetTagPressListAction,
    setAllResetTagPressListAction,
    onChangeFiles,
    onChangeAddStep,
    onChangeStep,
  } = useRegisterNews()

  return (
    <Fragment>
      {addStep === 'add' && (
        <Fragment>
          <ul className="interval-mt14">
            <li>
              <div className="mb-contents-pb16__group">
                <p className="font-body__regular">
                  업로드할 엑셀 파일은 아래 파일 샘플과 필드명이 일치해야 합니다.
                  <br />
                  입력한 뉴스는 내 회사에서만 사용됩니다.
                </p>
              </div>
            </li>
            <li>
              <div className="button-select-style__section">
                <div className="button-add__section">
                  <button
                    type="button"
                    className="button-add__button"
                    disabled={excelParams.excelFileList.length > 0 ? true : excelDataLoading}
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
                      onChangeCapture={e => onChangeFiles(e, excelParams)}
                      disabled={excelParams.excelFileList.length > 0 ? true : excelDataLoading}
                      accept={FILE_EXTENSIONS.excel}
                      multiple={false}
                    />
                  </button>
                </div>
                <TagList
                  tagItems={excelParams.excelFileList}
                  onTagItemClose={e => setResetTagPressListAction(e, excelParams)}
                  onAllTagItemClose={() => setAllResetTagPressListAction(excelParams)}
                />
              </div>
            </li>
            {excelParams.excelList && excelParams.excelList.length > 0 ? (
              <Fragment>
                <li>
                  <div className="mb-contents-pb16__group">
                    <FormTitle title="추가한 뉴스" />
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
                              label={`총 ${excelParams.excelList.length}개`}
                              checked={excelParams.excelList.length === excelParams.execelIdList.length}
                              onChange={e => filesAllCheckedExcelParamsOnChange(e, excelParams)}
                            />
                            {excelParams.execelIdList.length > 0 && (
                              <div className="header-sort__action">
                                <Button
                                  label={'삭제하기'}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-text'}
                                  onClick={() => filesDeleteExcelParamsOnChange(excelParams)}
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
                                style={{ width: '80%', paddingLeft: 35 }}
                              >
                                제목
                              </th>
                              <th scope="col">날짜</th>
                            </tr>
                          </thead>
                          <tbody>
                            {excelParams.excelList &&
                              excelParams.excelList.map(e => (
                                <FileItems
                                  key={'excelParams.excelList' + e.title + e.date}
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
                      url={'https://svc.d.mediabee.kr/sample/news_add_sample.xlsx'}
                      download={true}
                    />
                  </div>
                </li>
                <li>
                  <div className="bullet-list__group">
                    <h6 className="bullet-list__title">주의 사항</h6>
                    <ul className="bullet-list">
                      <li>
                        <p className="bullet-list__text">
                          뉴스는 위 샘플을 참고해 엑셀 또는 CSV파일로 저장해 업로드하세요.
                        </p>
                      </li>
                      <li>
                        <p className="bullet-list__text">제목은 필수 입력 항목입니다.</p>
                      </li>
                      <li>
                        <p className="bullet-list__text">날짜를 입력하지 않으면 오늘 날짜가 입력됩니다.</p>
                      </li>
                      <li>
                        <p className="bullet-list__text">
                          필드 내에 2개 이상의 정보를 입력하는 경우, 세미콜론(;)으로 구분해야 합니다.
                        </p>
                      </li>
                      <li>
                        <p className="bullet-list__text">한 번에 2,000개까지 뉴스를 업로드할 수 있습니다.</p>
                      </li>
                    </ul>
                  </div>
                </li>
              </Fragment>
            )}
          </ul>
          <div className="mb-contents-footer__section">
            <div className="buttons__group type-between">
              <div className="buttons__group type-left">
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  onClick={() => onChangeStep('information')}
                />
              </div>
              <Button
                label={'다음'}
                cate={'default-ico-text'}
                size={'m'}
                color={'primary'}
                icoRight={true}
                disabled={excelParams.excelList.length < 1}
                icoRightData={icoSvgData.chevronThickRight}
                onClick={e => excelParams.excelList.length > 0 && onChangeAddStep('clipbook')}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default FileStep
