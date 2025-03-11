import Skeleton from '~/components/common/ui/Skeleton'

const MbSearchFilterLoader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        background: '#fff',
      }}
    >
      <div
        style={{ height: '47.2px' }}
        className="display-flex justify-content__space-between align-items__center"
      >
        <Skeleton
          width="50px"
          height="24px"
          className="ml-20"
        />
        <Skeleton
          width="50px"
          height="24px"
          className="mr-10"
        />
      </div>
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={`aside-filterItem-${index}`}
            width="100%"
            height="20.5px"
            wrapperStyle={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              padding: '0 24px',
              height: '32.5px',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default MbSearchFilterLoader
