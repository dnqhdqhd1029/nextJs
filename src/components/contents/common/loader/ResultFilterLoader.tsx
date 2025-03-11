import Skeleton from '~/components/common/ui/Skeleton'

const ResultFilterLoader = () => {
  return (
    <div className="search-result__header-tags">
      <div
        className="header-tags__group"
        style={{ height: '28px' }}
      >
        <div className="header-tags__tit">
          <Skeleton
            width="51px"
            height="18px"
            className="type1"
          />
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="header-tags__tag"
            key={index}
          >
            <Skeleton
              width="95px"
              height="20px"
              className="type1"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultFilterLoader
