/**
 * @file
 * @description
 */
import Skeleton from '~/components/common/ui/Skeleton'

const ResultListLoader = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton
          key={index}
          width={'100%'}
          height="78px"
          style={{
            boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
            borderRadius: 0,
            background: '#f0f0f0',
          }}
          className="type1"
          wrapperStyle={{
            margin: index !== 0 ? '8px 0 0' : '0',
          }}
        />
      ))}
    </>
  )
}

export default ResultListLoader
