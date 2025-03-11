import Skeleton from '~/components/common/ui/Skeleton'

interface Props {
  size?: number
}

const MbHeadSortFilterLoader = ({ size = 2 }: Props) => {
  return (
    <div className="header-sort__filter display-flex">
      <ul className="s-header__control">
        {Array.from({ length: size }).map((_, index) => (
          <li key={`mbHeadSortFilterLoad-${index}`}>
            <Skeleton
              width={'28px'}
              height={'28px'}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MbHeadSortFilterLoader
