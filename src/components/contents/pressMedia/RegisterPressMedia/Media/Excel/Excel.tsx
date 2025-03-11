import { Fragment, useState } from 'react'

import EndStep from '~/components/contents/pressMedia/RegisterPressMedia/Media/Excel/Done'
import FileStep from '~/components/contents/pressMedia/RegisterPressMedia/Media/Excel/FileStep'
import ListStep from '~/components/contents/pressMedia/RegisterPressMedia/Media/Excel/ListStep'
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
