import FormTitle from '~/components/common/ui/FormTitle'
import Skeleton from '~/components/common/ui/Skeleton'
import { useCompanyInfo } from '~/utils/hooks/contents/setting/useCompanyInfo'
const CompanyInfoLoading = () => {
  const { companyInfoData, onChangeFiles } = useCompanyInfo()
  return (
    <ul className="interval-mt42">
      <li>
        <ul>
          <li>
            <ul className="grid-col2">
              <li>
                <FormTitle
                  title={'회사명'}
                  required={true}
                />
                <Skeleton
                  width="468px"
                  height="35px"
                />
              </li>
              <li>
                <FormTitle title={'대표자명'} />
                <Skeleton
                  width="468px"
                  height="35px"
                />
              </li>
              <li>
                <div className="select-form__section select-form-btn">
                  <FormTitle
                    title={'회사 분류'}
                    required={true}
                  />
                  <Skeleton
                    width="468px"
                    height="35px"
                  />
                </div>
              </li>
              <li>
                <div className="select-form__section select-form-btn">
                  <FormTitle
                    title={'사원수'}
                    required={true}
                  />
                  <Skeleton
                    width="468px"
                    height="35px"
                  />
                </div>
              </li>
              <li>
                <FormTitle title={'사업자등록번호'} />
                <Skeleton
                  width="468px"
                  height="35px"
                />
              </li>
              <li>
                <FormTitle title={'웹사이트'} />
                <Skeleton
                  width="468px"
                  height="35px"
                />
              </li>
            </ul>
          </li>
          <li>
            <div className="form-address__section">
              <FormTitle
                title="주소"
                required={true}
              />
              <ul className="form-address__country">
                <li className="select">
                  <Skeleton
                    width="468px"
                    height="35px"
                  />
                </li>
              </ul>
              <ul className="form-address__detail">
                <li>
                  <Skeleton
                    width="960px"
                    height="35px"
                  />
                </li>
                <li>
                  <Skeleton
                    width="960px"
                    height="35px"
                  />
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <li>
        <div className="file-uploader-button__section type-only">
          <FormTitle title="사업자등록증" />
          <div className="file-uploader-button__header">
            <div className="file-uploader-button__group">
              <button
                type="button"
                className="file-uploader-button__upload"
              >
                <span className="file-uploader-button__text">파일 찾기</span>
              </button>
              <input
                type="file"
                className="file-uploader-button__input"
                onChangeCapture={e => onChangeFiles(e, companyInfoData)}
                multiple
              />
            </div>
            <p className="file-uploader-button__text">5MB 이하 이미지와 문서 첨부 가능</p>
          </div>
          <div className="file-uploader__list-container">
            <ul className="file-uploader__list">
              {Array.from({ length: 2 }).map((_, index) => (
                <li
                  className="file-uploader__list-item"
                  key={'file-uploader__list-item' + index}
                >
                  <Skeleton
                    width="960px"
                    height="29px"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    </ul>
  )
}

export default CompanyInfoLoading
