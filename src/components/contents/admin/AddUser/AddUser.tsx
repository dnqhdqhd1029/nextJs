import { useEffect, useLayoutEffect } from 'react'
import cn from 'classnames'

import AuthStep from '~/components/contents/admin/AddUser/AuthStep/AuthStep'
import ExcelStep from '~/components/contents/admin/AddUser/ExcelStep/ExcelStep'
import FirstStep from '~/components/contents/admin/AddUser/FirstStep/FirstStep'
import OneByOneStep from '~/components/contents/admin/AddUser/OneByOneStep/OneByOneStep'
import LoadingPopup from '~/components/contents/admin/LoadingPopup/LoadingPopup'
import { useAddUser } from '~/utils/hooks/contents/admin/useAddUser'

const AddUser = () => {
  const { init } = useAddUser()

  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <FirstStep />
            <OneByOneStep />
            <ExcelStep />
            <AuthStep />
          </div>
        </div>
      </div>
      <LoadingPopup />
    </>
  )
}

export default AddUser
