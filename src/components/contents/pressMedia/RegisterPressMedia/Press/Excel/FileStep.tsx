import { ChangeEvent, Fragment, MouseEvent, useEffect, useLayoutEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import TagList from '~/components/common/ui/TagList'
import FileItems from '~/components/contents/pressMedia/RegisterPressMedia/Press/Excel/FileItems'
import { FILE_EXTENSIONS } from '~/constants/common'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const FileStep = () => {
  const {
    categoryData,
    categoryDataInformationHandle,
    pressExcelParams,
    pressExcelDataLoading,
    pressFilesDeleteExcelParamsOnChange,
    pressFilesAllCheckedExcelParamsOnChange,
    categoryDataAddStepHandle,
    setResetTagPressListAction,
    setAllResetTagPressListAction,
    pressOnChangeFiles,
  } = useRegisterPressMedia()

  return (
    <Fragment>
      {categoryData.addStep === 'add' && (
        <Fragment>
          <ul className="interval-mt14">
            <li>
              <div className="mb-contents-pb16__group">
                <p className="font-body__regular">
                  업로드할 엑셀 파일은 아래 파일 샘플과 필드명이 일치해야 합니다.
                  <br />
                  입력한 언론인은 내 회사에서만 사용됩니다.
                </p>
              </div>
            </li>
            <li>
              <div className="button-select-style__section">
                <div className="button-add__section">
                  <button
                    type="button"
                    className="button-add__button"
                    disabled={pressExcelParams.excelFileList.length > 0 ? true : pressExcelDataLoading}
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
                      //onChange={e => pressOnChangeFiles(e, pressExcelParams)}
                      onChangeCapture={e => pressOnChangeFiles(e, pressExcelParams)}
                      disabled={pressExcelParams.excelFileList.length > 0 ? true : pressExcelDataLoading}
                      accept={FILE_EXTENSIONS.excel}
                      multiple={false}
                    />
                  </button>
                </div>
                <TagList
                  tagItems={pressExcelParams.excelFileList}
                  onTagItemClose={e => setResetTagPressListAction(e, pressExcelParams)}
                  onAllTagItemClose={() => setAllResetTagPressListAction(pressExcelParams)}
                />
              </div>
            </li>
            {pressExcelParams.excelList && pressExcelParams.excelList.length > 0 ? (
              <Fragment>
                <li>
                  <div className="mb-contents-pb16__group">
                    <FormTitle title="추가한 언론인" />
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
                              label={`총 ${pressExcelParams.excelList.length}개`}
                              checked={pressExcelParams.excelList.length === pressExcelParams.execelIdList.length}
                              onChange={e => pressFilesAllCheckedExcelParamsOnChange(e, pressExcelParams)}
                            />
                            {pressExcelParams.execelIdList.length > 0 && (
                              <div className="header-sort__action">
                                <Button
                                  label={'삭제하기'}
                                  cate={'link-text'}
                                  size={'m'}
                                  color={'body-text'}
                                  onClick={() => pressFilesDeleteExcelParamsOnChange(pressExcelParams)}
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
                                style={{ width: '20%', paddingLeft: 35 }}
                              >
                                이름
                              </th>
                              <th
                                scope="col"
                                style={{ width: '30%' }}
                              >
                                미디어
                              </th>
                              <th
                                scope="col"
                                style={{ width: '50%' }}
                              >
                                이메일
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {pressExcelParams.excelList &&
                              pressExcelParams.excelList.map(e => (
                                <FileItems
                                  key={'pressExcelParams.excelList' + e.id + e.name + e.mediaName}
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
                      url={'https://svc.d.mediabee.kr/sample/journalist_add_sample.xlsx'}
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
                          언론인을 위 샘플을 참고해 엑셀 또는 CSV파일로 저장해 업로드하세요.
                        </p>
                      </li>
                      <li>
                        <p className="bullet-list__text">이름, 매체, 이메일은 필수 입력 할목입니다.</p>
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
                  onClick={() => categoryDataInformationHandle('information', categoryData)}
                />
              </div>
              <Button
                label={'다음'}
                cate={'default-ico-text'}
                size={'m'}
                color={'primary'}
                icoRight={true}
                disabled={pressExcelParams.excelList.length < 1}
                icoRightData={icoSvgData.chevronThickRight}
                onClick={e => pressExcelParams.excelList.length > 0 && categoryDataAddStepHandle('list', categoryData)}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default FileStep
