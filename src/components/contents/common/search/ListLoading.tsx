import Skeleton from '~/components/common/ui/Skeleton'

const ListLoader = () => {
  return (
    <div
      className="pt-12 pl-12 pr-12 pb-12 overflow-hidden position-absolute"
      style={{ left: 0, right: 0, top: 0, bottom: 0, background: '#fff', zIndex: 2 }}
    >
      <Skeleton
        width={'100%'}
        height={'40px'}
        className="mb-12"
      />
      <Skeleton
        width={'100%'}
        height={'40px'}
        className="mb-12"
      />
      <Skeleton
        width={'100%'}
        height={'40px'}
        className="mb-12"
      />
      <Skeleton
        width={'100%'}
        height={'40px'}
        className="mb-12"
      />
    </div>
  )
}

export default ListLoader
