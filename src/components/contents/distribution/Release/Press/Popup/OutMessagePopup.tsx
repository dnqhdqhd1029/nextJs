import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { GroupDtoForUser } from '~/types/api/service'
import { openToast } from '~/utils/common/toast'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

interface Props {
  offRouteChangeBlocking: any
}

const OutMessagePopup = (props: Props) => {
  const router = useRouter()
  const {
    templatePageData,
    contentPageData,
    confirmPageData,
    editorData,
    settingPageData,
    mailingId,
    outMessagePopup,
    initOutMessagePopup,
    reUrl,
    tab,
    isChangedGroup,
    unLockAction,
    editStepMailingIdAndOut,
    contentStepValidate,
    createMailingIdAndOut,
    settingStepValidate,
    fromDataToContents,
    changeGroupAndMove,
  } = usePressRelese()
  const [isLoading, setIsLoading] = useState(false)

  const widthoutData = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    if (mailingId > 0) {
      const res = await unLockAction(mailingId)
      res === 'S' && props.offRouteChangeBlocking(() => router.push(reUrl, undefined))
    } else {
      props.offRouteChangeBlocking(() => router.push(reUrl, undefined))
    }
    setIsLoading(() => false)
  }

  const registerAndOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    if (mailingId > 0) {
      //수정하고 아웃
      if (tab.id === 'setting') {
        const check = await settingStepValidate(settingPageData)
        if (check) {
          const releaseData = await fromDataToContents(mailingId, editorData)
          const res = await editStepMailingIdAndOut(
            settingPageData,
            releaseData ? releaseData.template : templatePageData,
            releaseData ? releaseData.content : contentPageData,
            releaseData ? releaseData.confirm : confirmPageData,
            releaseData ? releaseData.content.content : editorData,
            mailingId,
            tab.id
          )
          if (res === 'S') {
            const unLock = await unLockAction(mailingId)
            unLock === 'S' && props.offRouteChangeBlocking(() => router.push(reUrl, undefined, { shallow: true }))
          }
        } else {
          initOutMessagePopup()
        }
      } else if (tab.id === 'template') {
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
          unLock === 'S' && props.offRouteChangeBlocking(() => router.push(reUrl, undefined, { shallow: true }))
        }
      } else if (tab.id === 'content') {
        const check = await contentStepValidate(contentPageData, editorData)
        if (check) {
          const releaseData = await fromDataToContents(mailingId, editorData)
          const res = await editStepMailingIdAndOut(
            settingPageData,
            templatePageData,
            contentPageData,
            releaseData ? releaseData.confirm : confirmPageData,
            editorData,
            mailingId,
            tab.id
          )
          if (res === 'S') {
            const unLock = await unLockAction(mailingId)
            unLock === 'S' && props.offRouteChangeBlocking(() => router.push(reUrl, undefined, { shallow: true }))
          }
        } else {
          initOutMessagePopup()
        }
      } else {
        const res = await editStepMailingIdAndOut(
          settingPageData,
          templatePageData,
          contentPageData,
          confirmPageData,
          editorData,
          mailingId,
          tab.id
        )
        if (res === 'S') {
          const unLock = await unLockAction(mailingId)
          unLock === 'S' && props.offRouteChangeBlocking(() => router.push(reUrl, undefined, { shallow: true }))
        }
      }
    } else {
      //생성하고 아웃
      const check = await settingStepValidate(settingPageData)
      if (check) {
        await createMailingIdAndOut(settingPageData)
        props.offRouteChangeBlocking(() => router.push(reUrl, undefined, { shallow: true }))
      } else {
        initOutMessagePopup()
      }
    }
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        isOpen={outMessagePopup}
        hasCloseButtonLoading={isLoading}
        onClose={() => initOutMessagePopup()}
        hasCloseButton
        width={500}
        title={'저장하기'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'저장'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={e => registerAndOut(e)}
            />
            <Button
              label={'저장 안 함'}
              cate={'default'}
              size={'m'}
              color={'tertiary'}
              disabled={isLoading}
              onClick={e => widthoutData(e)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => initOutMessagePopup()}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p
            className="font-body__regular"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            입력 및 수정된 내용이 있습니다. 저장하겠습니까?
          </p>
        </div>
      </Popup>
    </>
  )
}

export default OutMessagePopup
