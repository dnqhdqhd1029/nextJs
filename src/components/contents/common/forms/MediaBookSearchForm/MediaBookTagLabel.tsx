import { MbTagSearchTagItem } from '~/types/contents/Common'

interface Props {
  title: string
  isJustCount: boolean
  count: number
  emailCount: number
  isNoDetail: boolean
  updateAtDate: string
  updater: string
}

export const MediaBookTagLabel = (props: Props) => {
  return (
    <div className="display-flex justify-content__space-between full-width">
      <span
        className="display-flex justify-content__space-between"
        style={{ width: '60%' }}
      >
        <span>{props.title}</span>
        {props?.isJustCount ? (
          <span>{`${props.count}개`}</span>
        ) : (
          <span>{`${props.count}개(이메일 ${props?.emailCount}개)`}</span>
        )}
      </span>
      {!props.isNoDetail && <span>{`${props.updateAtDate} ${props.updater} 수정`}</span>}
    </div>
  )
}
