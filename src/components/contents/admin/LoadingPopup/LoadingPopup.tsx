import Image from 'next/image'

import SpinnerImg from '/public/assets/png/spinner.png'
import Popup from '~/components/common/ui/Popup'
import { useAddUser } from '~/utils/hooks/contents/admin/useAddUser'

const LoadingPopup = () => {
  const { emailDataLoading } = useAddUser()
  return (
    <>
      <Popup
        isOpen={emailDataLoading}
        onClose={() => console.log()}
        title={''}
        width={500}
        height={330}
        hasCloseButton={false}
        showFooter={false}
        hideCancelButton
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className="spinner__group s24"
            style={{
              width: 250,
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={SpinnerImg}
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h3
            className="setting__headings6"
            style={{ fontWeight: 600 }}
          >
            엑셀 업로드중
          </h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p className="font-body__regular">업로드를 중단할 경우 새로고침 해 주세요</p>
        </div>
      </Popup>
    </>
  )
}

export default LoadingPopup
