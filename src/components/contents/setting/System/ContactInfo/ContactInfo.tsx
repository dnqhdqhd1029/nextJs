import { Fragment, useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import DOMPurify from 'dompurify'

import Button from '~/components/common/ui/Button'
import EmailLink from '~/components/common/ui/EmailLink'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import ContactInfoPopup from '~/components/contents/setting/ContactInfo/Popup/ContactInfoPopup'
import { DefaultSettingLinks } from '~/components/contents/setting/System/defaultData'
import { EMAIL_PATTERN } from '~/constants/common'
import { useContactInfo } from '~/utils/hooks/contents/setting/useContactInfo'

const ContactInfo = () => {
  const [contactViewInfo, setContactViewInfo] = useState<string>('')
  const { contactInfo, setContactInfoPopupTypesAction } = useContactInfo()

  useEffect(() => {
    const { info } = contactInfo
    let strContactViewInfo = ''
    if (!!info) {
      const arrInfo = info.split('\n')
      arrInfo.forEach(data => {
        if (EMAIL_PATTERN.test(data)) {
          strContactViewInfo += ReactDOMServer.renderToString(<EmailLink email={data} />)
        } else if (!!!data.trim()) {
          strContactViewInfo += `<br/>`
        } else {
          strContactViewInfo += `<p>${data}</p>`
        }
      })
    }

    setContactViewInfo(strContactViewInfo)
  }, [contactInfo.info])

  return (
    <Fragment>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar
              headerTitle={'설정'}
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
                        <h2 className="common-title__title">이메일 서명</h2>
                      </div>
                    </div>
                  </div>

                  <div className="setting-contents__section">
                    <ul className="interval-mt42 max-width__m">
                      <li>
                        <p>이메일과 보도자료를 보낼 때 맨 아래에 붙는 연락처 정보를 설정할 수 있습니다.</p>
                        <p className="mt-8">서명에는 유효한 이메일을 반드시 넣어야 합니다.</p>
                        <p className="mt-8">서명의 이메일로 이메일과 보도자료의 회신 메일을 받을 수 있습니다.</p>
                      </li>
                      <li>
                        <div
                          className="font-body__regular pre-wrap mt-24"
                          style={{ border: '1px solid #eee', padding: '20px' }}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(contactViewInfo?.replaceAll('ruby-text', 'block'), {
                              ADD_ATTR: ['target', 'rel'],
                            }),
                          }}
                        >
                          {/* {contactInfo.info} */}
                          {/* <br />
                          {contactInfo.email} */}
                        </div>
                      </li>
                      <li>
                        <Button
                          label={'이메일 서명 설정'}
                          cate={'default'}
                          size={'m'}
                          color={'primary'}
                          onClick={() => setContactInfoPopupTypesAction(true, contactInfo)}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactInfoPopup />
    </Fragment>
  )
}

export default ContactInfo
