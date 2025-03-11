import Link from 'next/link'

import FileUploader from '~/publishing/components/common/ui/FileUploader'
import FileUploader2 from '~/publishing/components/common/ui/FileUploader2'
import FileUploaderThumb from '~/publishing/components/common/ui/FileUploaderThumb'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Pagination from '~/publishing/components/common/ui/Pagination'
import UploadFileByDrop from '~/publishing/components/common/ui/UploadFileByDrop'
import UploadFileByInput from '~/publishing/components/common/ui/UploadFileByInput'
import { PageType } from '~/types/common'

const About: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">Dropzone Page</h1>

        <code className="guide__code">
          1. 문서&nbsp;:&nbsp;
          <Link
            href="https://www.files-ui.com/getting-started"
            legacyBehavior
          >
            <a target="_blank">https://www.files-ui.com/getting-started</a>
          </Link>
          <br />
          2. 에러 시 file-uploader__list &gt; li : file-status-error 클래스추가
          <br />
          3. 파일별 삭제 아이콘 변경으로 작동 안됨. 현재 디자인 대로 아이콘 변경 및 기능 요청.
          <br />
          4. 파일별 삭제 아이콘 =&gt; 디폴트 : 노출X / 마우스 오버 : 노출 O
        </code>

        <h2 className="guide__title">Upload files by dropping</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <UploadFileByDrop />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">Upload files by input[type=file] (사용중)</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <UploadFileByInput />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">file-type1 (사용중)</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <FileUploader2 />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">file-type2</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <FileUploader />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">popup type5, No. 8 사용</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <div className="file-uploader-button__section">
                  <ul className="interval-mt28">
                    <li>
                      <div className="popup-file-list__header">
                        <p className="font-body__regular">
                          ppt, pdf, xls, zip, hwp, doc 파일 형식의 3MB 이하 파일을 업로드 할 수 있습니다. 아래에서
                          파일을 선택하거나, 새로운 파일을 추가하세요.
                        </p>

                        <div className="file-uploader-button__header">
                          <div className="file-uploader-button__group">
                            {/* input 마우스오버, 클릭 기준 type-over / type-press 클래스 적용 */}
                            <button
                              type="button"
                              className="file-uploader-button__upload"
                            >
                              <span className="file-uploader-button__text">파일 업로드</span>
                            </button>
                            <input
                              type="file"
                              className="file-uploader-button__input"
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="popup-file-list__group">
                        <div className="file-uploader-button__list">
                          <ul className="file-uploader-button-list__group">
                            <li>
                              {/* 해당 영역 클릭했을 때 is-selected 클래스 추가 */}
                              <div className="file-uploader-button-list__item is-selected">
                                <p className="file-uploader-button-item__name">신제품 기획기사 미팅 어젠다.pdf</p>
                                <p className="file-uploader-button-item__size">230 KB</p>
                                <button
                                  type="button"
                                  className="file-uploader-button-item__delete"
                                >
                                  <IcoSvg data={icoSvgData.trash} />
                                  <span className="text">파일 삭제</span>
                                </button>
                              </div>
                            </li>
                            <li>
                              <div className="file-uploader-button-list__item">
                                <p className="file-uploader-button-item__name">
                                  삼성 멀티캠퍼스 신제품 기획기사 미팅 어젠다.pdf삼성 멀티캠퍼스 신제품 기획기사 미팅
                                  어젠다.pdf삼성 멀티캠퍼스 신제품 기획기사 미팅 어젠다.pdf
                                </p>
                                <p className="file-uploader-button-item__size">1,432 KB</p>
                                <button
                                  type="button"
                                  className="file-uploader-button-item__delete"
                                >
                                  <IcoSvg data={icoSvgData.trash} />
                                  <span className="text">파일 삭제</span>
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className="popup-file-list__pagination">
                          <Pagination cate={'n1'} />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">SET30 / popup-type1, No. 9 등 사용</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <div className="file-uploader-button__section type-only">
                  <FormTitle title="사업자등록증" />
                  <div className="file-uploader-button__header">
                    <div className="file-uploader-button__group">
                      {/* input 마우스오버, 클릭 기준 type-over / type-press 클래스 적용 */}
                      <button
                        type="button"
                        className="file-uploader-button__upload"
                      >
                        <span className="file-uploader-button__text">파일 찾기</span>
                      </button>
                      <input
                        type="file"
                        className="file-uploader-button__input"
                        multiple
                      />
                    </div>
                    <p className="file-uploader-button__text">5MB 이하 이미지와 문서 첨부 가능</p>
                  </div>

                  <div className="file-uploader-button__list">
                    <ul className="file-uploader-button-list__group">
                      <li>
                        <div className="file-uploader-button-list__item">
                          <p className="file-uploader-button-item__name">신제품 기획기사 미팅 어젠다.pdf</p>
                          <button
                            type="button"
                            className="file-uploader-button-item__delete"
                          >
                            <IcoSvg data={icoSvgData.trash} />
                            <span className="text">파일 삭제</span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">FileUploaderThumb 사용</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box g--type2">
                <div style={{ width: '400px', border: '1px dashed #999' }}>
                  <FileUploaderThumb />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default About
About.PublishingLayout = 'BLANK'
