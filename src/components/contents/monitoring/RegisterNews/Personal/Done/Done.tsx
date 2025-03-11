import { Fragment } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import { useRegisterNews } from '~/utils/hooks/contents/monitoring/useRegisterNews'

const Done = () => {
  const router = useRouter()
  const { addStep, newsId, onChangeStep } = useRegisterNews()

  return (
    <Fragment>
      {addStep === 'done' && (
        <Fragment>
          <div className="mb-contents-pb16__group">
            <p className="font-body__regular">뉴스를 추가했습니다.</p>
          </div>
          <div className="mb-contents-footer__section">
            <div className="buttons__group type-left">
              <Button
                label={`뉴스 추가`}
                cate={'default'}
                size={'m'}
                color={'tertiary'}
                onClick={() => onChangeStep('personal')}
              />
              <Button
                elem="button"
                label={`추가한 뉴스 보기`}
                cate={'default'}
                size={'m'}
                color={'primary'}
                onClick={() => router.push(`/news/record/${Number(newsId) || 0}`)}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Done
