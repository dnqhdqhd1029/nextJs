import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import Tooltips from '~/components/common/ui/Tooltips'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { apiGetMediaImage } from '~/utils/api/image/apiGetMediaImage'
import { getCurrencyFormat } from '~/utils/common/number'
import { handleNonBreakSpace } from '~/utils/common/number'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'

const MediaProfile = () => {
  const {
    journalGroupMediaKey,
    userInfo,
    filterPortalCode,
    publisherTypeList,
    journalGroupMediaParam,
    moveMediaDetail,
  } = usePressProfile()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [pubType, setPubType] = useState<string>('')

  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetMediaImage(Number(journalGroupMediaKey))
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  const getPublisherType = () => {
    if (journalGroupMediaParam && publisherTypeList) {
      const find = publisherTypeList.find(e => e.id.toString() === journalGroupMediaParam.publisher_type_code)
      setPubType(() => (find ? find.name : ''))
    }
  }

  const getPortalName = (codeArray?: string[]): TrustedHTML => {
    // @ts-ignore
    let returnArray: TrustedHTML = ''
    if (!codeArray) return returnArray

    filterPortalCode.forEach((code, index) => {
      const portal = codeArray.find(item => item === code.id)
      if (portal) {
        // @ts-ignore
        returnArray += `${code.name}`
        if (index < codeArray.length - 1) {
          // @ts-ignore
          returnArray += '<br />'
        }
      }
    })

    return returnArray
  }

  useEffect(() => {
    if (journalGroupMediaKey) getImage()
  }, [journalGroupMediaKey])

  useEffect(() => {
    if (journalGroupMediaParam) getPublisherType()
  }, [journalGroupMediaParam])

  if (!journalGroupMediaParam) {
    return null
  }

  return (
    <div className="flexible-item__group">
      <div className="profile__section">
        <ul className="interval-mt20">
          <li>
            <div className="profile__area">
              {/* 기업 프로필 */}
              <div
                className="profile-img__group type-corp"
                style={{
                  pointerEvents:
                    !journalGroupMediaParam.isSysInfo && journalGroupMediaParam?.owner?.uid === userInfo.userId
                      ? 'unset'
                      : 'none',
                }}
              >
                {!loading ? (
                  <div className="profile__img">
                    {imageSrc === '' ? (
                      <IcoAvatar
                        label={journalGroupMediaParam.name || ''}
                        icoData={!journalGroupMediaParam.isSysInfo ? icoSvgData.lockFill : icoSvgData.personFill}
                        size={'s112'}
                        icoSize={'s64'}
                      />
                    ) : (
                      <img
                        src={imageSrc}
                        alt={journalGroupMediaParam.name || ''}
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
                {!journalGroupMediaParam.isSysInfo && imageSrc !== '' && (
                  <p className="profile-img__ico">
                    <span className="hidden">잠금</span>
                  </p>
                )}
              </div>
              <div className="profile__group">
                <h3 className="profile__name type-arrow">
                  <a
                    href={`/media/record/${Number(journalGroupMediaParam.mid) || 0}`}
                    className={cn(`button-${'link-ico-text'}`, `size-${'es'}`, `colors-${'body-text'}`)}
                  >
                    <span className={cn(`font-heading--h5`, `size-${'es'}`)}>{journalGroupMediaParam?.name || ''}</span>
                    <span className={cn(`button__ico-right button-${'link-ico-text'}__ico-right`, [`ico-size${'es'}`])}>
                      <IcoSvg data={icoSvgData.chevronRight} />
                    </span>
                  </a>
                </h3>
                <p className="profile__team">
                  <span>
                    매체 지수{' '}
                    <Tooltips
                      tooltipId={'tt1'}
                      tooltipPlace={'right'}
                      tooltipHtml={`매체 지수는 미디어의 발행 부수, 시청<br />률, 사이트 방문자 등 데이터를 종합해<br/>수치화한 지표로, 사용자가 효과적으로<br/>미디어를 선별할 수 있도록 돕습니다.`}
                      tooltipComponent={<IcoTooltip />}
                    />
                  </span>
                  <span>{getCurrencyFormat(journalGroupMediaParam?.values?.combined || 0)}</span>
                </p>
              </div>
            </div>
          </li>
          <li>
            <dl className="dl-table-type2__section">
              <dt className="hidden">
                <p className="dl-table-type2__title">정보</p>
              </dt>
              <dd>
                {journalGroupMediaParam.coverage?.field && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">분야</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">
                        {journalGroupMediaParam?.coverage?.field.join(handleNonBreakSpace(2)) || ''}
                      </p>
                    </div>
                  </div>
                )}
                {journalGroupMediaParam.subtype && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">유형</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">{journalGroupMediaParam.subtype}</p>
                    </div>
                  </div>
                )}
                {journalGroupMediaParam.pub_cycle && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">발행주기</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">{journalGroupMediaParam.pub_cycle}</p>
                    </div>
                  </div>
                )}
                {journalGroupMediaParam.language && journalGroupMediaParam.language !== '한국어' && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">언어</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">{journalGroupMediaParam.language}</p>
                    </div>
                  </div>
                )}
                {journalGroupMediaParam.publisher && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">발행처</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">
                        {journalGroupMediaParam.publisher} <span style={{ color: '#b2b4b4' }}>{pubType}</span>
                      </p>
                    </div>
                  </div>
                )}
                {journalGroupMediaParam.website &&
                  journalGroupMediaParam.website.url &&
                  journalGroupMediaParam.website.url !== '' && (
                    <div className="dl-table-type2__flex">
                      <div className="dl-table-type2__flex-tit">
                        <p className="dl-table-type2__text">웹사이트</p>
                      </div>
                      <div className="dl-table-type2__flex-txt">
                        <p className="dl-table-type2__text">
                          <Button
                            elem="a"
                            target="_blank"
                            url={journalGroupMediaParam.website?.url}
                            label={journalGroupMediaParam.website?.url}
                            cate={'link-text'}
                            size={'m'}
                            color={'body-link'}
                            title={journalGroupMediaParam.website?.url}
                          />
                        </p>
                      </div>
                    </div>
                  )}
                {journalGroupMediaParam.portals && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">포털제휴</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p
                        className="dl-table-type2__text"
                        dangerouslySetInnerHTML={{ __html: getPortalName(journalGroupMediaParam.portals) }}
                      ></p>
                    </div>
                  </div>
                )}
              </dd>
              <dt>
                <p className="dl-table-type2__title">소개</p>
              </dt>
              <dd>
                <p className="dl-table-type2__text">{journalGroupMediaParam.desc}</p>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MediaProfile
