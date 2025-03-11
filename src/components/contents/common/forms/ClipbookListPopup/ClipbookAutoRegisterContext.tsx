import { Fragment } from 'react'

export type AutoRegisterContextProps = {
  valueName: string
  onChangeAction: () => void
}

export type AddRegisterContextProps = {
  valueName: { id: number; name: string }[]
  onChangeAction: (e: number) => void
  onChangeTotalAction: () => void
}

export const ClipbookAutoRegisterContext = (props: AutoRegisterContextProps) => {
  return (
    <Fragment>
      <p>클립북에 추가했습니다.</p>
      <Fragment>
        <div className="toast-box1">
          <p style={{ color: '#0094a8' }}>{props.valueName}</p>

          <p>
            <button
              type="button"
              onClick={e => props.onChangeAction()}
            >
              변경
            </button>
          </p>
        </div>
      </Fragment>
    </Fragment>
  )
}

export const ClipbookAddContext = (props: AddRegisterContextProps) => {
  return (
    <Fragment>
      <p>뉴스를 클립북에 추가했습니다.</p>
      {props.valueName && props.valueName.length > 0 && (
        <Fragment>
          {props.valueName.length > 5 ? (
            <Fragment>
              {props.valueName.slice(0, 5).map(e => (
                <div
                  key={'ClipbookAddContext' + e.id + e.name}
                  className="toast-box1"
                >
                  <p
                    style={{ color: '#0094a8', cursor: 'pointer' }}
                    onClick={k => props.onChangeAction(e.id)}
                  >
                    {e.name}
                  </p>
                </div>
              ))}
              <div className="toast-box1">
                <p
                  style={{ color: '#0094a8', cursor: 'pointer' }}
                  onClick={k => props.onChangeTotalAction()}
                >
                  전체 클립북 {'>'}
                </p>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {props.valueName.map(e => (
                <div
                  key={'ClipbookAddContext' + e.id + e.name}
                  className="toast-box1"
                >
                  <p
                    style={{ color: '#0094a8', cursor: 'pointer' }}
                    onClick={k => props.onChangeAction(e.id)}
                  >
                    {e.name}
                  </p>
                </div>
              ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
