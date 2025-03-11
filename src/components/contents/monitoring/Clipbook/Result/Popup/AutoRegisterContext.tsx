export type AutoRegisterContextProps = {
  valueName: string
  onChangeAction: () => void
}

export const ClipbookAutoRegisterContext = (props: AutoRegisterContextProps) => {
  return (
    <>
      <>
        <p>클립북에 담았습니다.</p>
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
