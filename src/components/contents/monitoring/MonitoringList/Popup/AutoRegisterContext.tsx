export type AutoRegisterContextProps = {
  valueName: string
  onChangeAction: () => void
}

export const MonitoringEditContext = (props: AutoRegisterContextProps) => {
  return (
    <>
      <>
        <p>'{props.valueName}'모니터링을 업데이트했습니다.</p>
        <>
          <div className="toast-box1">
            <p>
              <button
                type="button"
                onClick={e => props.onChangeAction()}
              >
                모니터링명 수정
              </button>
            </p>
          </div>
        </>
      </>
    </>
  )
}
