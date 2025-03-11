export type AutoRegisterContextProps = {
  valueName: string
  onChangeAction: () => void
}

export const MediaAutoRegisterContext = (props: AutoRegisterContextProps) => {
  return (
    <>
      <>
        <p>미디어 목록에 담았습니다.</p>
        <>
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
        </>
      </>
    </>
  )
}

export const PressAutoRegisterContext = (props: AutoRegisterContextProps) => {
  return (
    <>
      <>
        <p>언론인 목록에 담았습니다.</p>
        <>
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
        </>
      </>
    </>
  )
}

export const SavedSearchEditContext = (props: AutoRegisterContextProps) => {
  return (
    <>
      <>
        <p>'{props.valueName}'맞춤 검색을 업데이트했습니다.</p>
        <>
          <div className="toast-box1">
            <p>
              <button
                type="button"
                onClick={e => props.onChangeAction()}
              >
                맞춤 검색명 수정
              </button>
            </p>
          </div>
        </>
      </>
    </>
  )
}
