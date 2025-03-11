/**
 * @file MbLoaderImage.tsx
 * @description 이미지 로딩 전에 띄우는 로딩 이미지
 */
import Image from 'next/image'

import SpinnerImg from '/public/assets/png/spinner.png'

interface Props {
  /** 보이기 여부 */
  isShow: boolean

  /** Loader width */
  width?: number

  /** Loader height */
  height?: number
}

const MbLoaderImage = ({ isShow, width = 24, height = 24 }: Props) => {
  return (
    <div
      style={{
        opacity: isShow ? 1 : 0,
        position: 'absolute',
        left: '50%',
        top: '50%',
        zIndex: 10,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div className="spinner__group s24">
        <Image
          src={SpinnerImg}
          alt=""
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}

export default MbLoaderImage
