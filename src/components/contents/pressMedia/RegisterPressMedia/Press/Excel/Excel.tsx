import { Fragment, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import EndStep from '~/components/contents/pressMedia/RegisterPressMedia/Press/Excel/Done'
import FileStep from '~/components/contents/pressMedia/RegisterPressMedia/Press/Excel/FileStep'
import ListStep from '~/components/contents/pressMedia/RegisterPressMedia/Press/Excel/ListStep'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const ExcelStep = () => {
  const { categoryData } = useRegisterPressMedia()

  return (
    <Fragment>
      {categoryData.nextStep === 'excel' && (
        <Fragment>
          <FileStep />
          <ListStep />
          <EndStep />
        </Fragment>
      )}
    </Fragment>
  )
}

export default ExcelStep
