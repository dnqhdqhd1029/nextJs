import Skeleton from '~/components/common/ui/Skeleton'

interface Props {
  size?: number
}

const SideListItemLoader = ({ size = 10 }: Props) => {
  return (
    <>
      {[...Array(size)].map((_sub, index) => (
        <Skeleton
          key={index}
          width={'100%'}
          height="21px"
          wrapperStyle={{
            width: '100%',
            padding: '5px 0',
          }}
        />
      ))}
    </>
  )
}

export default SideListItemLoader
