import GrandChildComponent from './GrandChildComponent'

interface Props {
  onClick: () => void
}

const ChildComponent = ({ onClick }: Props) => {
  return (
    <div>
      <p>ChildComponent</p>
      <GrandChildComponent onClick={onClick} />
    </div>
  )
}

export default ChildComponent
