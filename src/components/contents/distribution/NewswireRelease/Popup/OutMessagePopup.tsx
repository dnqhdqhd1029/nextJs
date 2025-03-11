import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { openToast } from '~/utils/common/toast'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

interface Props {
  offRouteChangeBlocking: any
}

const OutMessagePopup = (props: Props) => {
  const router = useRouter()
  const {
    contentPageData,
    editorData,
    settingPageData,
    nwReleaseId,
    outMessagePopup,
    initOutMessagePopup,
    reUrl,
    tab,
    lockAction,
    unLockAction,
    editNewswireReleaseIdAndOut,
    contentStepValidate,
    createNewswireReleaseIdAndOut,
    settingStepValidate,
    fromDataToContents,
  } = useNewswireRelease()
  const [isLoading, setIsLoading] = useState(false)

  const widthoutData = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    if (nwReleaseId > 0) {
      const res = await unLockAction(nwReleaseId)
      res === 'S' && props.offRouteChangeBlocking(() => router.push(reUrl, undefined))
    } else {
      props.offRouteChangeBlocking(() => router.push(reUrl, undefined))
    }
    setIsLoading(() => false)
  }

  const registerAndOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    if (nwReleaseId > 0) {
      //수정하고 아웃
      if (tab.id === 'setting') {
        const check = await settingStepValidate(settingPageData)
        const lock = await lockAction(nwReleaseId)
        if (lock !== 'S') {
          openToast('다른 회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
          return
        }
        if (check) {
          const releaseData = await fromDataToContents(nwReleaseId, editorData)
          const res = await editNewswireReleaseIdAndOut(
            releaseData ? releaseData.content : contentPageData,
            settingPageData,
            releaseData ? releaseData.content.content : editorData,
            nwReleaseId,
            tab.id
          )
          if (res === 'S') {
            const unLock = await unLockAction(nwReleaseId)
            unLock === 'S' && props.offRouteChangeBlocking(() => router.push(reUrl, undefined, { shallow: true }))
          }
        } else {
          initOutMessagePopup()
        }
      } else if (tab.id === 'content') {
        const check = await contentStepValidate(contentPageData, editorData)
        if (check) {
          const releaseData = await fromDataToContents(nwReleaseId, editorData)
          const lock = await lockAction(nwReleaseId)
          if (lock !== 'S') {
            openToast('다른 회원이 작업 중입니다, 동시에 한 명만 작업할 수 있습니다', 'error')
            return
          }
          const res = await editNewswireReleaseIdAndOut(
            contentPageData,
            releaseData ? releaseData.setting : settingPageData,
            releaseData ? releaseData.content.content : editorData,
            nwReleaseId,
            tab.id
          )
          if (res === 'S') {
            const unLock = await unLockAction(nwReleaseId)
            unLock === 'S' && props.offRouteChangeBlocking(() => router.push(reUrl, undefined, { shallow: true }))
          }
        } else {
          initOutMessagePopup()
        }
      } else {
        const unLock = await unLockAction(nwReleaseId)
        unLock === 'S' && props.offRouteChangeBlocking(() => router.push(reUrl, undefined, { shallow: true }))
      }
    } else {
      //생성하고 아웃
      const check = await settingStepValidate(settingPageData)
      if (check) {
        await createNewswireReleaseIdAndOut(contentPageData, editorData)
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
