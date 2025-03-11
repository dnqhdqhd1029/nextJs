import { Fragment, useEffect, useState } from 'react'

import IcoAvatar from '~/components/common/ui/IcoAvatar'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import { JournalistAutoCompleteDto } from '~/types/api/service'
import { apiGetJournalistImage } from '~/utils/api/image/apiGetJournalistImage'
import { useGlobalSearch } from '~/utils/hooks/contents/globalSearch/useGlobalSearch'

const JournalItem = (props: JournalistAutoCompleteDto) => {
  const { moveToJournal } = useGlobalSearch()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetJournalistImage(Number(props.journalistId))
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  useEffect(() => {
    if (props.journalistId) getImage()
  }, [props.journalistId])

  return (
    <li>
      <a
        className="header-search-result__item justify-content__flex-start"
        href={`/contacts/record/${Number(props.journalistId) || 0}`}
        //onClick={() => props.journalistId && moveToJournal(props.journalistId)}
      >
        <div className="img_ratio__48">
          {loading ? (
            <Skeleton
              width={'48px'}
              height={'48px'}
            />
          ) : (
            <Fragment>
              {imageSrc === '' ? (
                <IcoAvatar
                  label={props.name || ''}
                  icoData={icoSvgData.personFill}
                  size={'s48'}
                  icoSize={'s24'}
                />
              ) : (
                <img
                  src={imageSrc}
                  alt={props.name || ''}
                />
              )}
            </Fragment>
          )}
        </div>
        <div className="header-search-result__item-txt text-align__left">
          <p className="name">{props.name}</p>
          <p className="corp">
            {props?.mediaName || ''} {props?.department || ''} {props?.position || ''}
          </p>
        </div>
      </a>
    </li>
  )
}

export default JournalItem
