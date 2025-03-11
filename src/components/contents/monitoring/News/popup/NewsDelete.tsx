import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useMonitoringSearchDetail } from '~/utils/hooks/contents/monitoring/useMonitoringSearchDetail'

const NewsDeletePopup = () => {
  const router = useRouter()
  const { deletePopup, setSelectedDeleteData, selectedDeleteAction, init } = useMonitoringSearchDetail()
  const [isLoading, setIsLoading] = useState(false)
  const value = useRef(0)

  const activityAction = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(() => true)
    const res = await selectedDeleteAction(deletePopup.key)
    if (res === 'S') {
      value.current++
    } else {
      setIsLoading(() => false)
    }
  }

  useEffect(() => {
    if (value.current !== 0) {
      const action = setInterval(() => {
        console.log(value.current) // value의 현재 값인 vaule.current를 가져오도록 한다.
        setIsLoading(() => false)
        value.current = 0
        router.back()
      }, 1500)
      return () => clearInterval(action)
    }
  }, [value.current])

  return (
    <>
      <Popup
        isOpen={deletePopup.isOpen}
        onClose={() => setSelectedDeleteData(0, '', false)}
        hasCloseButton
        title={'뉴스 삭제'}
        width={500}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'삭제'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={e => activityAction(e)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => setSelectedDeleteData(0, '', false)}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            삭제하겠습니까?
            <br />
            삭제대상: {deletePopup.title}
          </p>
        </div>
      </Popup>
    </>
  )
}

export default NewsDeletePopup
