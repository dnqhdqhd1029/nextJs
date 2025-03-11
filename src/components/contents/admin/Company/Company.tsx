import { Fragment } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'

import 'moment/locale/ko'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import { DefaultSettingLinks } from '~/components/contents/admin/defaultData'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import MbPostCodePopup from '~/components/contents/common/popup/MbPostCodePopup'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useCompanyInfo } from '~/utils/hooks/contents/setting/useCompanyInfo'
import { useMyLicense } from '~/utils/hooks/contents/setting/useMyLicense'

const AdminCompany = () => {
  const {
    companyInfoLoading,
    addressPopup,
    companyInfoData,
    setAddressAction,
    companyTypeList,
    userCountList,
    regionList,
    setUserCountAction,
    setRegionAction,
    setIsOverseasPolicy,
    setTypeAction,
    setAddressPopupAction,
    onDeleteUserFile,
    onChangeFiles,
    saveCompanyInfo,
    setNmAction,
    setBusinessNmAction,
    setWebsiteAction,
    setSubAddressAction,
  } = useCompanyInfo()

  return (
    <Fragment>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar
              headerTitle={'관리자'}
              naviList={DefaultSettingLinks}
              isCustomerInfo={true}
            />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__contents">
                <div className="setting__contents">
                  <div className="setting__header">
                    <div className="common-title__section">
                      <div className="common-title__group">
                        <h2 className="common-title__title">회사 관리</h2>
                      </div>
                    </div>
                  </div>
                  <div className="setting-contents__section">
                    <div className="setting-contents-form__section">
                      <ul className="grid-col2">
                        <li>
                          <FormInputText
                            title={'회사명'}
                            value={companyInfoData.companyNm}
                            required={true}
                            readonly={true}
                          />
                        </li>
                        <li>
                          <FormInputText
                            title={'대표자명'}
                            onChange={e => setNmAction(e.target.value, companyInfoData)}
                            value={companyInfoData.name}
                          />
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle
                              title={'회사 분류'}
                              required={true}
                            />
                            <Select
                              options={companyTypeList}
                              value={companyInfoData.type}
                              onChange={e => setTypeAction(e, companyInfoData)}
                            />
                          </div>
                        </li>
                        <li>
                          <div className="select-form__section select-form-btn">
                            <FormTitle
                              title={'사원수'}
                              required={true}
                            />
                            <Select
                              options={userCountList}
                              value={companyInfoData.userCount}
                              onChange={e => setUserCountAction(e, companyInfoData)}
                            />
                          </div>
                        </li>
                        <li>
                          <FormInputText
                            title={'사업자등록번호'}
                            extraInputType={'businessNm'}
                            onChangeExtra={e => setBusinessNmAction(e, companyInfoData)}
                            value={companyInfoData.businessNm}
                          />
                        </li>

                        <li>
                          <FormInputText
                            title={'웹사이트'}
                            onChange={e => setWebsiteAction(e.target.value, companyInfoData)}
                            value={companyInfoData.website}
                          />
                        </li>
                      </ul>
                      <div className="form-address__section">
                        <FormTitle
                          title="주소"
                          required={true}
                        />
                        <ul className="form-address__country">
                          <li className="select">
                            <Select
                              options={
                                companyInfoData.isOverseas
                                  ? [{ id: '', name: '선택' }, ...regionList.filter(e => e.id !== 'KOR')]
                                  : regionList
                              }
                              value={companyInfoData.region}
                              disabled={!companyInfoData.isOverseas}
                              msg={companyInfoData.regionNm}
                              failed={companyInfoData.regionNm !== ''}
                              onChange={e => setRegionAction(e, companyInfoData)}
                            />
                          </li>
                          <li className="checkbox">
                            <FormInputBtn
                              type="checkbox"
                              name="form-address__country_checkbox"
                              id="address__country_checkbox"
                              label="해외 주소 입력"
                              checked={companyInfoData.isOverseas}
                              onChange={event => setIsOverseasPolicy(event, companyInfoData, regionList)}
                            />
                          </li>
                        </ul>
                        <ul className="form-address__detail">
                          {!companyInfoData.isOverseas && (
                            <li className="search">
                              <FormInputText
                                failed={companyInfoData.addressNmErr !== ''}
                                msg={companyInfoData.addressNmErr}
                                value={companyInfoData.addressNm}
                              />
                              <Button
                                label={'주소 검색'}
                                cate={'default'}
                                size={'m'}
                                color={'tertiary'}
                                onClick={() => setAddressPopupAction(true)}
                              />
                            </li>
                          )}
                          <li>
                            <FormInputText
                              onChange={e => setSubAddressAction(e.target.value, companyInfoData)}
                              value={companyInfoData.subAddressNm}
                            />
                          </li>
                        </ul>
                      </div>
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
                            {companyInfoData.filesList.map((item, i) => (
                              <li
                                className="file-uploader__list-item"
                                key={'file-uploader__list-item' + item.id}
                              >
                                <span className="file-uploader__list-item-title cursor-pointer hover-text-decoration__underline width__auto">
                                  {item?.file?.name || item.filename} ({item.size}
                                  {'kb'})
                                </span>
                                <button
                                  type="button"
                                  className="file-uploader__list-item-delete"
                                  onClick={e => onDeleteUserFile(item, companyInfoData)}
                                >
                                  Delete
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mb-contents-footer__section">
                        <div className="buttons__group button-min-w120">
                          <Button
                            label={'저장'}
                            cate={'default'}
                            size={'m'}
                            color={'primary'}
                            onClick={() => saveCompanyInfo(companyInfoData)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MbPostCodePopup
        isOpen={addressPopup}
        onClose={() => setAddressPopupAction(false)}
        onSelectAddress={e => setAddressAction(e, companyInfoData)}
      />
    </Fragment>
  )
}
export default AdminCompany
