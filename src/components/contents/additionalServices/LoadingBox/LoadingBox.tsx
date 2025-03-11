import Skeleton from '~/components/common/ui/Skeleton'

const LoadingBox = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index}>
          <td></td>
          <td>
            <Skeleton
              width={'182px'}
              height={'20px'}
            />
          </td>
          <td>
            <Skeleton
              width={'240px'}
              height={'20px'}
            />
          </td>
          <td>
            <Skeleton
              width={'240px'}
              height={'20px'}
            />
          </td>
          <td></td>
        </tr>
      ))}
    </>
  )
}

export default LoadingBox
