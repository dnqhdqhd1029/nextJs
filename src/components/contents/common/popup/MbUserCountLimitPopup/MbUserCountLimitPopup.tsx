/**
 * @file MbUserCountLimitPopup.tsx
 * @description 서비스 이용 제한 안내
 */

import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { userCountLimitAction } from '~/stores/modules/contents/auth/auth'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
import { useSignOut } from '~/utils/hooks/common/useSignOut'

const MbUserCountLimitPopup = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { signOut } = useSignOut()
  const { userInfo, userCountLimit, licenseInfo } = useAppSelector(state => state.authSlice)

  const handleClick = async () => {
    const isAdmin = userInfo?.role === 'ADMIN'
    if (isAdmin) {
      dispatch(
        userCountLimitAction({
          isOpen: false,
          active: true,
        })
      )
      await router.replace('/admin/user')
    } else {
      openToast('접근 권한이 없습니다', 'error')
    }
  }

  return (
    <Popup
      isOpen={userCountLimit.isOpen}
      title={'서비스 이용 제한 안내'}
      hasCloseButton={false}
      onClose={() => {}}
      width={'500px'}
      buttons={<></>}
    >
      <p className="font-body__regular">
        현재 회원 수가 사용권에 회원 수인 {getCurrencyFormat(licenseInfo.userLimit)}명을 초과했습니다.
        <br />
        일부 회원을 비활성화해야 정상적으로 서비스를 이용할 수 있습니다.
      </p>
      <div className="mt-24 mb-12 display-flex justify-content__center">
        <Button
          label={'사용자 관리 바로가기'}
          cate={'default'}
          size={'m'}
          color={'secondary'}
          onClick={() => handleClick()}
        />

        <Button
          label={'로그아웃'}
          cate={'default'}
          size={'m'}
          color={'tertiary'}
          onClick={() => signOut()}
          className="ml-12"
        />
      </div>
    </Popup>
  )
}

export default MbUserCountLimitPopup
//
// /**
//  * @file MbUserCountLimitPopup.tsx
//  * @description 서비스 이용 제한 안내
//  */
//
// import { useRouter } from 'next/router'
//
// import Button from '~/components/common/ui/Button'
// import Popup from '~/components/common/ui/Popup'
// import { LicenseDto } from '~/types/api/service'
// import { getCurrencyFormat } from '~/utils/common/number'
// import { openToast } from '~/utils/common/toast'
// import { useAppSelector } from '~/utils/hooks/common/useRedux'
// import { useSignOut } from '~/utils/hooks/common/useSignOut'
//
// interface Props {
//   isOpen: boolean
//   licenseInfo: LicenseDto
//   onClose: () => void
// }
//
// const MbUserCountLimitPopup = ({ isOpen, onClose, licenseInfo }: Props) => {
//   const router = useRouter()
//   const { signOut } = useSignOut()
//   const storeUserInfo = useAppSelector(state => state.user.userInfo)
//
//   const handleClick = async () => {
//     const isAdmin = storeUserInfo?.role === 'ADMIN'
//     if (isAdmin) {
//       await router.replace('/admin/user')
//       onClose()
//     } else {
//       openToast('접근 권한이 없습니다', 'error')
//     }
//   }
//
//   const handleLogout = () => {
//     signOut()
//   }
//
//   if (!licenseInfo) {
//     return null
//   }
//
//   return (
//     <Popup
//       isOpen={isOpen}
//       title={'서비스 이용 제한 안내'}
//       hasCloseButton={false}
//       onClose={() => {}}
//       width={'500px'}
//       buttons={<></>}
//     >
//       <p className="font-body__regular">
//         현재 회원 수가 사용권에 회원 수인 {getCurrencyFormat(licenseInfo.userLimit)}명을 초과했습니다.
//         <br />
//         일부 회원을 비활성화해야 정상적으로 서비스를 이용할 수 있습니다.
//       </p>
//       <div className="mt-24 mb-12 display-flex justify-content__center">
//         <Button
//           label={'사용자 관리 바로가기'}
//           cate={'default'}
//           size={'m'}
//           color={'secondary'}
//           onClick={handleClick}
//         />
//
//         <Button
//           label={'로그아웃'}
//           cate={'default'}
//           size={'m'}
//           color={'tertiary'}
//           onClick={handleLogout}
//           className="ml-12"
//         />
//       </div>
//     </Popup>
//   )
// }
//
// export default MbUserCountLimitPopup
