interface Props {
  onClick: () => void
}

const GrandChildComponent = ({ onClick }: Props) => {
  return (
    <div>
      <h1>GrandChildComponent</h1>
      <div className="mt-50">
        <button
          type={'button'}
          onClick={onClick}
        >
          Click me
        </button>
      </div>
    </div>
  )
}

export default GrandChildComponent
