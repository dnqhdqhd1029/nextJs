import Skeleton from '~/components/common/ui/Skeleton'

const TagSearchLoader = () => {
  return (
    <>
      <div>
        <Skeleton
          width={'150px'}
          height="27px"
          wrapperStyle={{
            display: 'flex',
            paddingBottom: '6px',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        />
      </div>
      <div>
        <Skeleton
          width={'100%'}
          height="35px"
          wrapperStyle={{
            display: 'flex',
            paddingBottom: '14px',
            width: '100%',
            alignItems: 'center',
          }}
        />
      </div>
    </>
  )
}

export default TagSearchLoader
