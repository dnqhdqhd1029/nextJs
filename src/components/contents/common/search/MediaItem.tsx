import { Fragment, useEffect, useState } from 'react'

import IcoAvatar from '~/components/common/ui/IcoAvatar'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import { MediaAutoCompleteDto } from '~/types/api/service'
import { apiGetMediaImage } from '~/utils/api/image/apiGetMediaImage'
import { useGlobalSearch } from '~/utils/hooks/contents/globalSearch/useGlobalSearch'

const MediaItem = (props: MediaAutoCompleteDto) => {
  const { moveToMedia } = useGlobalSearch()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetMediaImage(Number(props.mediaId))
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  useEffect(() => {
    if (props.mediaId) getImage()
  }, [props.mediaId])

  return (
    <li>
      <a
        className="header-search-result__item justify-content__flex-start"
        href={`/media/record/${Number(props.mediaId) || 0}`}
        //onClick={() => props.mediaId && moveToMedia(props.mediaId)}
      >
        <div className="img_ratio__48 width-fit">
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
          <p className="corp">{props?.subcategory || ''}</p>
        </div>
      </a>
    </li>
  )
}

export default MediaItem
