import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import { getDateFormat, getNewsDateFormat } from '~/utils/common/date'
import { getCurrencyFormat, getDecimalPointCurrencyFormat, getDecimalPointPercentFormat } from '~/utils/common/number'
import { handleNonBreakSpace } from '~/utils/common/number'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const Profile = () => {
  const {
    mediaTab,
    timeZone,
    mediaIdKey,
    setAddPersonalContactAction,
    isMediaUserBlock,
    publisherTypeList,
    mediaContactInfo,
    mediaEmailBlocking,
    filterPortalCode,
    setPressMediaErrPopupAction,
    setPressMediaUnBlockPopupAction,
    mediaIdKeyParam,
    setBlockedEmailSenderPopupAction,
    mediaProfileOptionAction,
    ownerFunction,
  } = usePressMediaListResult()
  const isOpenRef = useRef<HTMLDivElement>(null)
  const personalOpenRef = useRef<HTMLDivElement>(null)
  const [isPeronsalOpen, setIsPersonalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [pubType, setPubType] = useState<string>('')
  const [emailFunctionCount, setEmailFunctionCount] = useState<string>('')
  const [isEmail, setIsEmail] = useState(false)

  const handleClick = useCallback((e: MouseEvent) => {
    if (isOpenRef.current && !isOpenRef.current.contains(e.target as Node)) setIsOpen(() => false)
    if (personalOpenRef.current && !personalOpenRef.current.contains(e.target as Node)) setIsPersonalOpen(() => false)
  }, [])

  const getPublisherType = () => {
    if (mediaIdKeyParam && publisherTypeList) {
      const find = publisherTypeList.find(e => e.id.toString() === mediaIdKeyParam.publisher_type_code)
      setPubType(() => (find ? find.name : ''))
    }
    if (mediaIdKeyParam) {
      let isEmailData = false
      if (mediaIdKeyParam.isSysInfo) {
        if (mediaIdKeyParam.contacts?.all?.beemail && mediaIdKeyParam.contacts?.all?.beemail !== '') {
          isEmailData = true
        }
      } else {
        // @ts-ignore
        if (mediaIdKeyParam.email && mediaIdKeyParam?.email !== '') {
          isEmailData = true
        }
      }
      setIsEmail(() => isEmailData)
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
    if (mediaIdKeyParam) getPublisherType()
  }, [mediaIdKeyParam])

  useEffect(() => {
    const tempEmailFunctionCount = [
      isMediaUserBlock && isMediaUserBlock?.blockedUserId > 0 ? 1 : 0,
      mediaEmailBlocking ? 1 : 0,
    ].reduce((acc, curr) => acc + curr, 0)

    setEmailFunctionCount(() => {
      if (tempEmailFunctionCount > 2) return 'b3'
      if (tempEmailFunctionCount > 1) return 'b2'
      if (tempEmailFunctionCount > 0) return 'b1'
      return ''
    })
  }, [isMediaUserBlock, mediaEmailBlocking])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  if (!mediaIdKeyParam) {
    return null
  }

  return (
    <div style={{ display: mediaTab === 'profile' ? 'block' : 'none' }}>
      <div className={cn('profile__section', { 'tab-content__container': true })}>
        <dl className="dl-table-type2__section">
          <dt className="hidden">
            <p className="dl-table-type2__title">정보</p>
          </dt>
          {mediaIdKeyParam.isSysInfo ? (
            <>
              {mediaIdKeyParam.coverage?.field &&
                mediaIdKeyParam.coverage?.field.length > 0 &&
                mediaIdKeyParam?.coverage?.field.toString() !== '' && (
                  <>
                    <div className="dl-table-type2__flex">
                      <div className="dl-table-type2__flex-tit">
                        <p className="dl-table-type2__text">분야</p>
                      </div>
                      <div className="dl-table-type2__flex-txt">
                        <p className="dl-table-type2__text">
                          {mediaIdKeyParam?.coverage?.field.join(handleNonBreakSpace(2)) || ''}
                        </p>
                      </div>
                    </div>
                  </>
                )}
            </>
          ) : (
            <>
              {mediaIdKeyParam.coverage?.category &&
                mediaIdKeyParam.coverage?.category.length > 0 &&
                mediaIdKeyParam?.coverage?.category.toString() !== '' && (
                  <>
                    <div className="dl-table-type2__flex">
                      <div className="dl-table-type2__flex-tit">
                        <p className="dl-table-type2__text">분야</p>
                      </div>
                      <div className="dl-table-type2__flex-txt">
                        <p className="dl-table-type2__text">
                          {mediaIdKeyParam?.coverage?.category.join(handleNonBreakSpace(2)) || ''}
                        </p>
                      </div>
                    </div>
                  </>
                )}
            </>
          )}
          {/*@ts-ignore*/}
          {mediaIdKeyParam.isSysInfo && mediaIdKeyParam.values.combined_new && (
            <div className="dl-table-type2__flex">
              <div className="dl-table-type2__flex-tit">
                <p className="dl-table-type2__text">
                  매체 지수{' '}
                  <Tooltips
                    tooltipId={uuid()}
                    tooltipPlace={'right'}
                    tooltipHtml={`매체 지수는 미디어의 발행 부수, 시청<br />률, 사이트 방문자 등 데이터를 종합해<br/>수치화한 지표로, 사용자가 효과적으로<br/>미디어를 선별할 수 있도록 돕습니다.`}
                    tooltipComponent={<IcoTooltip />}
                  />
                </p>
              </div>
              <div className="dl-table-type2__flex-txt">
                <p className="dl-table-type2__text">
                  {/*@ts-ignore*/}
                  {getDecimalPointCurrencyFormat(mediaIdKeyParam.values.combined_new)}
                </p>
              </div>
            </div>
          )}
          {/*@ts-ignore*/}
          {mediaIdKeyParam.values.abc && (
            <div className="dl-table-type2__flex">
              <div className="dl-table-type2__flex-tit">
                <p className="dl-table-type2__text">발행부수</p>
              </div>
              <div className="dl-table-type2__flex-txt">
                {/*@ts-ignore*/}
                <p className="dl-table-type2__text">{getCurrencyFormat(mediaIdKeyParam.values.abc)}</p>
              </div>
            </div>
          )}
          {mediaIdKeyParam.pub_cycle && (
            <div className="dl-table-type2__flex">
              <div className="dl-table-type2__flex-tit">
                <p className="dl-table-type2__text">발행주기</p>
              </div>
              <div className="dl-table-type2__flex-txt">
                <p className="dl-table-type2__text">{mediaIdKeyParam.pub_cycle}</p>
              </div>
            </div>
          )}
          {mediaIdKeyParam.language && mediaIdKeyParam.language !== '한국어' && (
            <div className="dl-table-type2__flex">
              <div className="dl-table-type2__flex-tit">
                <p className="dl-table-type2__text">언어</p>
              </div>
              <div className="dl-table-type2__flex-txt">
                <p className="dl-table-type2__text">{mediaIdKeyParam.language}</p>
              </div>
            </div>
          )}
          {mediaIdKeyParam.publisher && (
            <div className="dl-table-type2__flex">
              <div className="dl-table-type2__flex-tit">
                <p className="dl-table-type2__text">발행처</p>
              </div>
              <div className="dl-table-type2__flex-txt">
                <p className="dl-table-type2__text">
                  {mediaIdKeyParam.publisher} {mediaIdKeyParam.publisher}{' '}
                  <span style={{ color: '#b2b4b4' }}>{pubType}</span>
                </p>
              </div>
            </div>
          )}
          {mediaIdKeyParam.website && mediaIdKeyParam.website.url && mediaIdKeyParam.website.url !== '' && (
            <div className="dl-table-type2__flex">
              <div className="dl-table-type2__flex-tit">
                <p className="dl-table-type2__text">웹사이트</p>
              </div>
              <div className="dl-table-type2__flex-txt">
                <p className="dl-table-type2__text">
                  <Button
                    elem="a"
                    target="_blank"
                    url={mediaIdKeyParam.website?.url}
                    label={mediaIdKeyParam.website?.url}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    title={mediaIdKeyParam.website?.url}
                  />
                </p>
              </div>
            </div>
          )}
          {mediaIdKeyParam.portals && (
            <div className="dl-table-type2__flex">
              <div className="dl-table-type2__flex-tit">
                <p className="dl-table-type2__text">포털제휴</p>
              </div>
              <div className="dl-table-type2__flex-txt">
                <p
                  className="dl-table-type2__text"
                  dangerouslySetInnerHTML={{ __html: getPortalName(mediaIdKeyParam.portals) }}
                ></p>
              </div>
            </div>
          )}

          {mediaIdKeyParam.desc && (
            <>
              <dt>
                <p className="dl-table-type2__title">소개</p>
              </dt>
              <dd>
                <p className="dl-table-type2__text">{mediaIdKeyParam.desc}</p>
              </dd>
            </>
          )}

          <dt>
            <p className="dl-table-type2__title">연락처</p>
          </dt>
          <dd>
            {mediaIdKeyParam.contacts?.main?.phone &&
              mediaIdKeyParam.contacts?.main?.phone?.length > 0 &&
              mediaIdKeyParam.contacts?.main?.phone?.toString() !== '' && (
                <div className="dl-table-type2__flex">
                  <div className="dl-table-type2__flex-tit">
                    <p className="dl-table-type2__text">전화</p>
                  </div>
                  <div className="dl-table-type2__flex-txt">
                    <p className="dl-table-type2__text">{mediaIdKeyParam.contacts?.main?.phone.toString()}</p>
                  </div>
                </div>
              )}

            {mediaIdKeyParam.contacts?.main?.fax &&
              mediaIdKeyParam.contacts?.main?.fax?.length > 0 &&
              mediaIdKeyParam.contacts?.main?.fax?.toString() !== '' && (
                <div className="dl-table-type2__flex">
                  <div className="dl-table-type2__flex-tit">
                    <p className="dl-table-type2__text">팩스</p>
                  </div>
                  <div className="dl-table-type2__flex-txt">
                    <p className="dl-table-type2__text">{mediaIdKeyParam.contacts?.main?.fax?.toString()}</p>
                  </div>
                </div>
              )}

            {isEmail && (
              <div className="dl-table-type2__flex">
                <div className="dl-table-type2__flex-tit">
                  <p className="dl-table-type2__text">이메일</p>
                </div>
                <div className="dl-table-type2__flex-txt contact-type">
                  <div
                    className={`type-email ${emailFunctionCount}`}
                    ref={isOpenRef}
                  >
                    <div className="select__section select-type1-small">
                      <button
                        className="select__label"
                        onClick={() => setIsOpen(prev => !prev)}
                      >
                        <span className="select__label-text">
                          {/*@ts-ignore*/}
                          {mediaIdKeyParam.isSysInfo
                            ? mediaIdKeyParam.contacts?.all?.beemail || ''
                            : // @ts-ignore
                              mediaIdKeyParam?.email || ''}
                        </span>
                        <IcoSvg data={icoSvgData.chevronDown} />
                      </button>
                      <div
                        className={cn('select-option__section', {
                          'display-block': isOpen,
                        })}
                        style={{ background: '#fff' }}
                      >
                        <div className="select-option__area">
                          <ul className="select-option__group">
                            <li>
                              <button
                                className="select-option__item"
                                onClick={() => mediaProfileOptionAction('email', mediaIdKeyParam, '')}
                              >
                                <span className="select-option__item-text">이메일 보내기</span>
                              </button>
                            </li>
                            <li>
                              <button
                                className="select-option__item"
                                onClick={() => mediaProfileOptionAction('release', mediaIdKeyParam, '')}
                              >
                                <span className="select-option__item-text">보도자료 배포</span>
                              </button>
                            </li>
                            <li>
                              <button className="select-option__item">
                                <a
                                  className="select-option__item-text"
                                  href={`mailto:${
                                    mediaIdKeyParam.isSysInfo
                                      ? mediaIdKeyParam.contacts?.all?.beemail || ''
                                      : // @ts-ignore
                                        mediaIdKeyParam?.email || ''
                                  }`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  PC에서 이메일 보내기
                                </a>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="type-btn">
                    {isMediaUserBlock && isMediaUserBlock.blockedUserId > 0 && (
                      <Tooltips
                        tooltipId={uuid()}
                        tooltipPlace={'top'}
                        tooltipHtml={'이 매체는는 내가 보내는 <br />이메일을 수신차단했습니다.'}
                        isCusorDefault={true}
                        tooltipComponent={
                          <Button
                            label={'수신거부'}
                            cate={'gray'}
                            size={'es'}
                            color={'gray'}
                            // className="ml-8"
                            onClick={() =>
                              setPressMediaUnBlockPopupAction({
                                isOpen: true,
                                type: '',
                                key: isMediaUserBlock?.blockedUserId || 0,
                                title: '',
                                titleErr: '',
                                contents: '',
                                contentErr: '',
                              })
                            }
                          />
                        }
                      />
                    )}
                    {mediaEmailBlocking && (
                      <Tooltips
                        tooltipId={uuid()}
                        tooltipPlace={'top'}
                        tooltipHtml={'내가 이 매체에게 메일을 <br />보내지 않도록 설정했습니다.'}
                        isCusorDefault={true}
                        tooltipComponent={
                          <Button
                            label={'발송 차단'}
                            cate={'gray'}
                            size={'es'}
                            color={'gray'}
                            icoRight={true}
                            icoRightData={icoSvgData.iconCloseButton2}
                            // className="ml-8"
                            onClick={() =>
                              setBlockedEmailSenderPopupAction({
                                isOpen: true,
                                type: 'media',
                                status: 'unblock',
                                idKey: mediaIdKey.toString(),
                              })
                            }
                          />
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {mediaIdKeyParam.contacts?.main?.address && (
              <div className="dl-table-type2__flex">
                <div className="dl-table-type2__flex-tit">
                  <p className="dl-table-type2__text">주소</p>
                </div>
                <div className="dl-table-type2__flex-txt">
                  <p className="dl-table-type2__text">{mediaIdKeyParam.contacts?.main?.address}</p>
                </div>
              </div>
            )}
          </dd>
          {mediaContactInfo && mediaContactInfo.contactUserAddedId !== 0 && (
            <>
              <dt>
                <div className="dl-table-type2__title-group">
                  <p className="dl-table-type2__title">개인적 연락처</p>
                  <div className="dl-table-type2__title-edit">
                    <Button
                      label={'에디터'}
                      cate={'ico-only'}
                      size={'es'}
                      color={'gray-500'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.pencilFill2}
                      icoSize={12}
                      onClick={() =>
                        mediaContactInfo?.contactUserAddedId &&
                        setAddPersonalContactAction({
                          isOpen: true,
                          type: mediaContactInfo.contactUserAddedId.toString(),
                          email: mediaContactInfo.email ? mediaContactInfo.email : '',
                          emailErr: '',
                          website: mediaContactInfo.wsite ? mediaContactInfo.wsite : '',
                          websiteErr: '',
                          fax: mediaContactInfo.fax ? mediaContactInfo.fax : '',
                          phone: mediaContactInfo.phone ? mediaContactInfo.phone : '',
                          telephone: mediaContactInfo.mobile ? mediaContactInfo.mobile : '',
                          address: mediaContactInfo.address ? mediaContactInfo.address : '',
                        })
                      }
                    />
                  </div>
                  {/* {mediaContactInfo.updateAt && mediaContactInfo.updater?.displayName && (
                    <p className="dl-table-type2__title-date">
                      {mediaContactInfo.updater.displayName} {moment(mediaContactInfo.updateAt).format('YYYY-MM-DD')}
                    </p>
                  )} */}
                </div>
              </dt>
              <dd>
                {mediaContactInfo.email && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">이메일</p>
                    </div>
                    <div className="dl-table-type2__flex-txt flex-direction___column flex-wrap">
                      <div className="type-email">
                        <div
                          className="select__section select-type1-small"
                          ref={personalOpenRef}
                        >
                          <button
                            className="select__label height__auto"
                            onClick={() => setIsPersonalOpen(prev => !prev)}
                            title={mediaContactInfo.email}
                          >
                            <span className="select__label-text overflow-visible text-overflow__clip white-space__normal">
                              {mediaContactInfo.email}
                            </span>
                            <IcoSvg data={icoSvgData.chevronDown} />
                          </button>
                          <div
                            className={cn('select-option__section', {
                              'display-block': isPeronsalOpen,
                            })}
                            style={{ background: '#fff' }}
                          >
                            <div className="select-option__area">
                              <ul className="select-option__group">
                                <li>
                                  <button
                                    className="select-option__item"
                                    onClick={() =>
                                      mediaProfileOptionAction(
                                        'targetEmail',
                                        mediaIdKeyParam,
                                        mediaContactInfo?.email || ''
                                      )
                                    }
                                  >
                                    <span className="select-option__item-text">이메일 보내기</span>
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="select-option__item"
                                    onClick={() =>
                                      mediaProfileOptionAction(
                                        'targetRelease',
                                        mediaIdKeyParam,
                                        mediaContactInfo?.email || ''
                                      )
                                    }
                                  >
                                    <span className="select-option__item-text">보도자료 배포</span>
                                  </button>
                                </li>
                                <li>
                                  <button className="select-option__item">
                                    <a
                                      className="select-option__item-text"
                                      href={`mailto:${mediaContactInfo.email}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      PC에서 이메일 보내기
                                    </a>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {mediaContactInfo.phone && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">전화</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">{mediaContactInfo.phone}</p>
                    </div>
                  </div>
                )}
                {mediaContactInfo.wsite && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">웹사이트</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">{mediaContactInfo.wsite}</p>
                    </div>
                  </div>
                )}
                {mediaContactInfo.fax && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">팩스</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">{mediaContactInfo.fax}</p>
                    </div>
                  </div>
                )}
                {mediaContactInfo.address && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">주소</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">{mediaContactInfo.address}</p>
                    </div>
                  </div>
                )}
                {mediaContactInfo.updateAt && mediaContactInfo.updater?.displayName && (
                  <div className="dl-table-type2__flex">
                    <p className="dl-table-type2__title-date">
                      {mediaContactInfo.updater.displayName}{' '}
                      {getNewsDateFormat(timeZone, moment(mediaContactInfo.updateAt).format('YYYY-MM-DD HH:mm'))}
                    </p>
                  </div>
                )}
              </dd>
            </>
          )}
        </dl>
      </div>

      <div className="profile__footer">
        <ul className="interval-mt14">
          {mediaIdKeyParam.isSysInfo && !mediaContactInfo && (
            <li>
              <Button
                label={'개인적 연락처 추가'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() =>
                  setAddPersonalContactAction({
                    isOpen: true,
                    type: 'media',
                    email: '',
                    website: '',
                    websiteErr: '',
                    fax: '',
                    emailErr: '',
                    phone: '',
                    telephone: '',
                    address: '',
                  })
                }
              />
            </li>
          )}
          {mediaIdKeyParam.isSysInfo && (
            <li>
              <Button
                label={'정보 업데이트 요청'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() =>
                  setPressMediaErrPopupAction({
                    isOpen: true,
                    newsTitle: mediaIdKeyParam?.name || '',
                    type: 'media',
                    key: mediaIdKey,
                    title: `정보 업데이트 요청: ${mediaIdKeyParam.name}`,
                    titleErr: '',
                    contents: '',
                    contentErr: '',
                  })
                }
              />
            </li>
          )}

          {/*@ts-ignore*/}
          {!mediaIdKeyParam.isSysInfo && mediaIdKeyParam.mediaUserDto && (
            <li>
              <p className="profile__footer-writer">
                <Button
                  // @ts-ignore
                  label={mediaIdKeyParam.mediaUserDto.updater.displayName}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-link'}
                  onClick={() =>
                    // @ts-ignore
                    mediaIdKeyParam.mediaUserDto &&
                    // @ts-ignore
                    mediaIdKeyParam.mediaUserDto.updater &&
                    // @ts-ignore
                    mediaIdKeyParam.mediaUserDto.updater.userId &&
                    // @ts-ignore
                    ownerFunction(mediaIdKeyParam.mediaUserDto.updater.userId)
                  }
                />
                <span>
                  {/*@ts-ignore*/}
                  {mediaIdKeyParam.mediaUserDto.cuType === 'CREATE' ? '작성' : '수정'} {/*@ts-ignore*/}
                  {getDateFormat(timeZone, moment(mediaIdKeyParam.mediaUserDto.updateAt).format('YYYY-MM-DD'))}
                </span>
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Profile
