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

export const MediaAutoRegisterContext = (props: AutoRegisterContextProps) => {
  return (
    <Fragment>
      <p>매체 리스트에 담았습니다.</p>
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

export const PressAutoRegisterContext = (props: AutoRegisterContextProps) => {
  return (
    <Fragment>
      <p>언론인 리스트에 담았습니다.</p>
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

export const MediaAddRegisterContext = (props: AddRegisterContextProps) => {
  return (
    <Fragment>
      <p>매체를 리스트에 추가했습니다.</p>
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
                  전체 리스트 {'>'}
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

export const PressAddRegisterContext = (props: AddRegisterContextProps) => {
  return (
    <Fragment>
      <p>언론인을 리스트에 추가했습니다.</p>
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
                  전체 리스트 {'>'}
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
