/**
 * @file PageHeader.tsx
 * @description 페이지 제목
 */

import Button from '~/components/common/ui/Button'

interface Props {
  title: string
  addButtonTitlte?: string
  addFunc?: () => void
  noButton?: boolean
}

const PageHeaderWithButton = ({ title, addButtonTitlte, addFunc, noButton = false }: Props) => {
  return (
    <div className="setting__header">
      <div className="common-title__section">
        <div className="common-title__group">
          <h2 className="common-title__title">{title}</h2>
          {!noButton && (
            <div className="common-title__buttons">
              <Button
                label={addButtonTitlte ?? ''}
                cate={'default'}
                size={'m'}
                color={'primary'}
                onClick={addFunc}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageHeaderWithButton
