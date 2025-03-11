import { ChangeEvent, Fragment, MouseEvent, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { defaultTemplateTabs } from '~/components/contents/distribution/Release/Press/defaultData'
import CustomTemplate from '~/components/contents/distribution/Release/Press/TemplateStep/CustomTemplate'
import DefaultTemplate from '~/components/contents/distribution/Release/Press/TemplateStep/DefaultTemplate'
import { openToast } from '~/utils/common/toast'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

interface Props {
  offRouteChangeBlocking: any
}

const TemplateStep = (props: Props) => {
  const router = useRouter()
  const {
    templatePageData,
    settingPageData,
    tab,
    editorData,
    mailingId,
    contentPageData,
    confirmPageData,
    tabChangeAction,
    templatePageDataActiveTabOnChange,
    fromTemplateToContents,
    unLockAction,
    editStepMailingIdAndOut,
    fromDataToContents,
  } = usePressRelese()
  const [isLoadingId, setIsLoadingId] = useState<string>('')

  const actionAndOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoadingId('out')
    const releaseData = await fromDataToContents(mailingId, editorData)
    const res = await editStepMailingIdAndOut(
      settingPageData,
      templatePageData,
      releaseData ? releaseData.content : contentPageData,
      releaseData ? releaseData.confirm : confirmPageData,
      releaseData ? releaseData.content.content : editorData,
      mailingId,
      tab.id
    )
    if (res === 'S') {
      const unLock = await unLockAction(mailingId)
      unLock === 'S' && props.offRouteChangeBlocking(() => router.push('/activity/search'))
    }
    setIsLoadingId('')
  }

  const actionAndNext = async () => {
    setIsLoadingId('next')
    const releaseData = await fromDataToContents(mailingId, editorData)
    const res = await editStepMailingIdAndOut(
      settingPageData,
      templatePageData,
      releaseData ? releaseData.content : contentPageData,
      releaseData ? releaseData.confirm : confirmPageData,
      releaseData ? releaseData.content.content : editorData,
      mailingId,
      tab.id
    )
    if (res === 'S') await fromTemplateToContents(mailingId, editorData)
    setIsLoadingId('')
  }

  const actionAndPrev = async () => {
    setIsLoadingId('prev')
    const releaseData = await fromDataToContents(mailingId, editorData)
    const res = await editStepMailingIdAndOut(
      settingPageData,
      templatePageData,
      releaseData ? releaseData.content : contentPageData,
      releaseData ? releaseData.confirm : confirmPageData,
      releaseData ? releaseData.content.content : editorData,
      mailingId,
      tab.id
    )
    if (res === 'S') await tabChangeAction({ id: 'setting', title: '설정' })
    setIsLoadingId('')
  }

  return (
    <>
      {tab.id === 'template' && (
        <Fragment>
          <div className="mb-contents-layout__contents">
            <div className="distribute-steps__section">
              <div className="distribute-steps__group">
                <div
                  className="tabs__section type1-medium"
                  style={{ overflowX: 'unset' }}
                >
                  <div className="tabs-menu__group">
                    <ul className="tabs-menu__list bb-0">
                      {defaultTemplateTabs &&
                        defaultTemplateTabs.map(e => (
                          <li
                            className={templatePageData.activeTab.id === e.id ? 'is-active' : ''}
                            key={'draftTab_tabs-menu__list' + e.id}
                          >
                            <button
                              type="button"
                              className="tabs-menu__btn"
                              onClick={() => templatePageDataActiveTabOnChange(e, templatePageData)}
                            >
                              <span className="tabs-menu__name">{e.name}</span>
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="tabs-panel__section">
                  <div className="tabs-panel__group">
                    <div className="distribute-steps__ipt-btn">
                      <div className="template-ipt-btn__section type-layout">
                        {templatePageData.activeTab.id === 'sample' ? (
                          <ul className="template-ipt-btn__list">
                            {templatePageData.originTemplateList &&
                              templatePageData.originTemplateList.map(e => (
                                <DefaultTemplate
                                  key={'templatePageData.templateList_DefaultTemplate' + e.mailTemplateId}
                                  {...e}
                                />
                              ))}
                          </ul>
                        ) : (
                          <ul className="template-ipt-btn__list">
                            {templatePageData.userTemplateList &&
                              templatePageData.userTemplateList.map(e => (
                                <CustomTemplate
                                  key={'templatePageData.templateList_CustomTemplate' + e.mailTemplateId}
                                  {...e}
                                />
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-contents-layout__footer">
            <div className="distribute-steps__footer">
              <div className="footer-button__group">
                <ul className="footer-button__list">
                  <li>
                    <Button
                      label={'이전'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'tertiary'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.chevronThickLeft}
                      isLoading={isLoadingId === 'prev'}
                      disabled={isLoadingId !== ''}
                      onClick={() => actionAndPrev()}
                    />
                  </li>
                </ul>
                <ul className="footer-button__list type-right">
                  <li>
                    <Button
                      label={'저장하고 나가기'}
                      cate={'default'}
                      size={'m'}
                      color={'tertiary'}
                      isLoading={isLoadingId === 'out'}
                      disabled={isLoadingId !== ''}
                      onClick={e => actionAndOut(e)}
                    />
                  </li>
                  <li>
                    <Button
                      label={'다음'}
                      cate={'default-ico-text'}
                      size={'m'}
                      color={'primary'}
                      icoRight={true}
                      icoRightData={icoSvgData.chevronThickRight}
                      isLoading={isLoadingId === 'next'}
                      disabled={isLoadingId !== ''}
                      onClick={() => actionAndNext()}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  )
}

export default TemplateStep
