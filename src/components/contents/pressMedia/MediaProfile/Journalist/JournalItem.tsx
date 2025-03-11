import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Skeleton from '~/components/common/ui/Skeleton'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { ESearchJournalistDocumentDto } from '~/types/contents/PressMedia'
import { apiGetJournalistImage } from '~/utils/api/image/apiGetJournalistImage'
import { handleNonBreakSpace } from '~/utils/common/number'

const JournalistItem = (props: ESearchJournalistDocumentDto) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetJournalistImage(Number(props.jrnlst_id))
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  useEffect(() => {
    if (props.jrnlst_id) getImage()
  }, [props.jrnlst_id])

  if (!props.jrnlst_id) {
    return null
  }

  return (
    <li>
      <div className="list-type3__item">
        <ul className="list-type3__item-list">
          <li className="list-type3__item-img">
            {!loading ? (
              <div className="list-type3__img">
                {imageSrc === '' ? (
                  <IcoAvatar
                    label={props.name || ''}
                    icoData={!props.isSysInfo ? icoSvgData.lockFill : icoSvgData.personFill}
                    size={'s48'}
                    icoSize={'s24'}
                  />
                ) : (
                  <img
                    src={imageSrc}
                    id={'JournalistItem_imageSrc_isSysInfo_' + props.jrnlst_id}
                    onLoad={e => {
                      const imageSrcDetail = e.target
                      //@ts-ignore
                      if (
                        //@ts-ignore
                        e.target.naturalWidth &&
                        //@ts-ignore
                        e.target.naturalHeight &&
                        //@ts-ignore
                        Number(e.target.naturalHeight) > Number(e.target.naturalWidth)
                      ) {
                        //@ts-ignore
                        document?.getElementById(`JournalistItem_imageSrc_isSysInfo_${props.jrnlst_id}`)?.className =
                          'ratio-vertical'
                      }
                    }}
                    alt={props.name || ''}
                    className="list-type3__img-ratio"
                  />
                )}
              </div>
            ) : (
              <Skeleton
                width={'500'}
                height={'500'}
              />
            )}
          </li>
          <li className="list-type3__item-contents">
            <p className="list-type3-contents__text-name">
              <a
                href={`/contacts/record/${props.jrnlst_id}`}
                className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
              >
                <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                  {props?.name || ''}
                </span>
              </a>
            </p>
            <p className="list-type3-contents__text">
              {props.department && <span>{props.department + ' '}</span>}
              {props.role && <span>{props.role}</span>}
            </p>
            {props?.coverage?.field && (
              <p className="list-type3-contents__text">{props?.coverage?.field?.join(handleNonBreakSpace(2))}</p>
            )}
          </li>
        </ul>
      </div>
    </li>
  )
}

export default JournalistItem
