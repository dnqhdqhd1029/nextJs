import { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import Flag from '~/components/common/ui/Flag'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import { getDateFormat } from '~/utils/common/date'
import { handleNonBreakSpace } from '~/utils/common/number'
import { PHONE_NUMBER_HYPHEN_PATTERN } from '~/utils/common/regex'
import { getHtmlContentFromString } from '~/utils/common/string'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const Profile = () => {
  const {
    journalTab,
    timeZone,
    isJournalUserBlock,
    journalIdKey,
    journalContactBlockedInfo,
    journalDecodeList,
    journalEmailBlocking,
    journalContactInfo,
    setAddPersonalContactAction,
    setPressMediaErrPopupAction,
    setPressMediaUnBlockPopupAction,
    journalIdKeyParam,
    setBlockedEmailSenderPopupAction,
    pressProfileOptionAction,
    ownerFunction,
  } = usePressMediaListResult()
  const isOpenRef = useRef<HTMLDivElement>(null)
  const personalOpenRef = useRef<HTMLDivElement>(null)
  const [isPeronsalOpen, setIsPersonalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [emailFunctionCount, setEmailFunctionCount] = useState<string>('')

  const handleClick = useCallback((e: MouseEvent) => {
    if (isOpenRef.current && !isOpenRef.current.contains(e.target as Node)) setIsOpen(() => false)
    if (personalOpenRef.current && !personalOpenRef.current.contains(e.target as Node)) setIsPersonalOpen(() => false)
  }, [])

  useEffect(() => {
    const tempEmailFunctionCount = [
      // @ts-ignore
      journalIdKeyParam && journalIdKeyParam?.email && journalIdKeyParam?.email?.beemail_is_shared ? 1 : 0,
      isJournalUserBlock?.blockedUserId > 0 ? 1 : 0,
      journalEmailBlocking ? 1 : 0,
    ].reduce((acc, curr) => acc + curr, 0)

    setEmailFunctionCount(() => {
      if (tempEmailFunctionCount > 2) return 'b3'
      if (tempEmailFunctionCount > 1) return 'b2'
      if (tempEmailFunctionCount > 0) return 'b1'
      return ''
    })
  }, [journalIdKeyParam, isJournalUserBlock, journalEmailBlocking])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  if (!journalIdKeyParam) {
    return null
  }

  return (
    <div style={{ display: journalTab === 'profile' ? 'block' : 'none' }}>
      <div className={cn('profile__section', { 'tab-content__container': true })}>
        <dl className="dl-table-type2__section">
          {journalIdKeyParam.isSysInfo ? (
            <>
              {journalIdKeyParam.coverage?.field && (
                <>
                  <dt>
                    <p className="dl-table-type2__title">분야</p>
                  </dt>
                  <dd>
                    <p className="dl-table-type2__text">
                      {journalIdKeyParam?.coverage?.field.join(handleNonBreakSpace(2)) || ''}
                    </p>
                  </dd>
                </>
              )}
            </>
          ) : (
            <>
              {/*@ts-ignore*/}
              {journalIdKeyParam.journalistUserDto?.fieldsByUser && (
                <>
                  <dt>
                    <p className="dl-table-type2__title">분야</p>
                  </dt>
                  <dd>
                    {/*@ts-ignore*/}
                    <p className="dl-table-type2__text">
                      {/*@ts-ignore*/}
                      {journalIdKeyParam.journalistUserDto?.fieldsByUser.join(handleNonBreakSpace(2)) || ''}
                    </p>
                  </dd>
                </>
              )}
            </>
          )}

          {journalIdKeyParam.program && (
            <>
              <dt>
                <p className="dl-table-type2__title">프로그램</p>
              </dt>
              <dd>
                <p
                  className="dl-table-type2__text"
                  dangerouslySetInnerHTML={{ __html: getHtmlContentFromString(journalIdKeyParam.program) }}
                ></p>
              </dd>
            </>
          )}

          {journalIdKeyParam.isSysInfo && (
            <>
              {/*@ts-ignore*/}
              {journalIdKeyParam?.manage && journalIdKeyParam?.manage?.profile_open && journalIdKeyParam.career && (
                <>
                  <dt>
                    <p className="dl-table-type2__title">경력</p>
                  </dt>
                  <dd>
                    <p
                      className="dl-table-type2__text"
                      dangerouslySetInnerHTML={{ __html: getHtmlContentFromString(journalIdKeyParam.career) }}
                    ></p>
                  </dd>
                </>
              )}
            </>
          )}
          {journalIdKeyParam.isSysInfo && (
            <>
              {/*@ts-ignore*/}
              {journalIdKeyParam?.manage && journalIdKeyParam?.manage?.profile_open && journalIdKeyParam.writings && (
                <>
                  <dt>
                    <p className="dl-table-type2__title">저서</p>
                  </dt>
                  <dd>
                    <p
                      className="dl-table-type2__text"
                      dangerouslySetInnerHTML={{ __html: getHtmlContentFromString(journalIdKeyParam.writings) }}
                    ></p>
                  </dd>
                </>
              )}
            </>
          )}
          {journalIdKeyParam.isSysInfo && (
            <>
              {/*@ts-ignore*/}
              {journalIdKeyParam?.manage && journalIdKeyParam?.manage?.profile_open && journalIdKeyParam.awards && (
                <>
                  <dt>
                    <p className="dl-table-type2__title">수상</p>
                  </dt>
                  <dd>
                    <p
                      className="dl-table-type2__text"
                      dangerouslySetInnerHTML={{ __html: getHtmlContentFromString(journalIdKeyParam.awards) }}
                    ></p>
                  </dd>
                </>
              )}
            </>
          )}
          {journalIdKeyParam.isSysInfo && (
            <>
              {/*@ts-ignore*/}
              {journalIdKeyParam?.manage &&
                //@ts-ignore
                journalIdKeyParam?.manage?.profile_open &&
                journalIdKeyParam.education && (
                  <>
                    <dt>
                      <p className="dl-table-type2__title">학교</p>
                    </dt>
                    <dd>
                      <p
                        className="dl-table-type2__text"
                        dangerouslySetInnerHTML={{ __html: getHtmlContentFromString(journalIdKeyParam.education) }}
                      ></p>
                    </dd>
                  </>
                )}
            </>
          )}

          <dt>
            <p className="dl-table-type2__title">연락처</p>
          </dt>
          <dd>
            {journalDecodeList.landline && journalDecodeList.landline !== '' && (
              <div className="dl-table-type2__flex">
                <div className="dl-table-type2__flex-tit">
                  <p className="dl-table-type2__text">전화</p>
                </div>
                <div className="dl-table-type2__flex-txt">
                  <p className="dl-table-type2__text">
                    {journalDecodeList?.landline.replace(PHONE_NUMBER_HYPHEN_PATTERN, `$1-$2-$3`) || '-'}
                  </p>
                </div>
              </div>
            )}

            {journalIdKeyParam.isSysInfo ? (
              <>
                {/*@ts-ignore*/}
                {journalIdKeyParam?.manage &&
                  // @ts-ignore
                  journalIdKeyParam?.manage?.profile_open &&
                  journalDecodeList.mobile &&
                  journalDecodeList.mobile !== '' && (
                    <div className="dl-table-type2__flex">
                      <div className="dl-table-type2__flex-tit">
                        <p className="dl-table-type2__text">휴대전화</p>
                      </div>
                      <div className="dl-table-type2__flex-txt">
                        <p className="dl-table-type2__text">
                          {journalDecodeList?.mobile.replace(PHONE_NUMBER_HYPHEN_PATTERN, `$1-$2-$3`) || '-'}
                        </p>
                      </div>
                    </div>
                  )}
              </>
            ) : (
              <>
                {/*@ts-ignore*/}
                {journalDecodeList?.mobile &&
                  // @ts-ignore
                  journalDecodeList.mobile !== '' && (
                    <div className="dl-table-type2__flex">
                      <div className="dl-table-type2__flex-tit">
                        <p className="dl-table-type2__text">휴대전화</p>
                      </div>
                      <div className="dl-table-type2__flex-txt">
                        <p className="dl-table-type2__text">
                          {journalDecodeList?.mobile.replace(PHONE_NUMBER_HYPHEN_PATTERN, `$1-$2-$3`) || '-'}
                        </p>
                      </div>
                    </div>
                  )}
              </>
            )}

            {journalDecodeList.fax && journalDecodeList.fax !== '' && (
              <div className="dl-table-type2__flex">
                <div className="dl-table-type2__flex-tit">
                  <p className="dl-table-type2__text">팩스</p>
                </div>
                <div className="dl-table-type2__flex-txt">
                  <p className="dl-table-type2__text">
                    {journalDecodeList?.fax.replace(PHONE_NUMBER_HYPHEN_PATTERN, `$1-$2-$3`) || '-'}
                  </p>
                </div>
              </div>
            )}

            {journalIdKeyParam.email && journalDecodeList.beemail && (
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
                        <span className="select__label-text">{journalDecodeList.beemail}</span>
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
                                onClick={() => pressProfileOptionAction('email', journalIdKeyParam, '')}
                              >
                                <span className="select-option__item-text">이메일 보내기</span>
                              </button>
                            </li>
                            <li>
                              <button
                                className="select-option__item"
                                onClick={() => pressProfileOptionAction('release', journalIdKeyParam, '')}
                              >
                                <span className="select-option__item-text">보도자료 배포</span>
                              </button>
                            </li>
                            <li>
                              <button className="select-option__item">
                                <a
                                  className="select-option__item-text"
                                  href={`mailto:${journalDecodeList.beemail}`}
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
                    {/*@ts-ignore*/}
                    {journalIdKeyParam.email?.beemail_is_shared && (
                      <Tooltips
                        tooltipId={uuid()}
                        tooltipPlace={'top'}
                        tooltipHtml={
                          '이 이메일은 언론사 내에서 동료 <br />언론인이 함께 쓰는 메일이므로, <br />사용에 주의하시기 바랍니다.'
                        }
                        isCusorDefault={true}
                        tooltipComponent={
                          <Flag
                            label={'공용'}
                            color={'gray-500'}
                            size={'es'}
                          />
                        }
                      />
                    )}
                    {isJournalUserBlock && isJournalUserBlock.blockedUserId > 0 && (
                      <Tooltips
                        tooltipId={uuid()}
                        tooltipPlace={'top'}
                        tooltipHtml={'이 언론인은 내가 보내는 <br />이메일을 수신차단했습니다.'}
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
                                key: isJournalUserBlock?.blockedUserId || 0,
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
                    {journalEmailBlocking && (
                      <Tooltips
                        tooltipId={uuid()}
                        tooltipPlace={'top'}
                        tooltipHtml={'내가 이 언론인에게 메일을 <br />보내지 않도록 설정했습니다.'}
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
                                type: 'press',
                                status: 'unblock',
                                idKey: journalIdKey.toString(),
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
            {journalIdKeyParam.messenger && (
              <div className="dl-table-type2__flex">
                <div className="dl-table-type2__flex-tit">
                  <p className="dl-table-type2__text">메신저</p>
                </div>
                <div className="dl-table-type2__flex-txt">
                  <ul className="type-social">
                    {journalIdKeyParam.messenger?.nested &&
                      journalIdKeyParam.messenger?.nested.length > 0 &&
                      journalIdKeyParam.messenger?.nested.map(e => (
                        <li key={'journalIdKeyParam.messenger?.nested' + e.id}>
                          <p className="dl-table-type2__text">
                            {e.provider} {e.id}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}

            {journalIdKeyParam.isSysInfo ? (
              <>
                {journalIdKeyParam.media?.main?.location?.address && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">주소</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">{journalIdKeyParam.media?.main?.location?.address}</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/*@ts-ignore*/}
                {journalIdKeyParam.journalistUserDto?.address && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">주소</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      {/*@ts-ignore*/}
                      <p className="dl-table-type2__text">{journalIdKeyParam.journalistUserDto?.address}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {journalIdKeyParam.isSysInfo && (
              <>
                {journalIdKeyParam.social !== undefined &&
                  journalIdKeyParam.social?.nested &&
                  journalIdKeyParam.social.nested.length > 0 && (
                    <div className="dl-table-type2__flex">
                      <div className="dl-table-type2__flex-tit">
                        <p className="dl-table-type2__text">소셜</p>
                      </div>
                      <div className="dl-table-type2__flex-txt">
                        <ul className="type-social">
                          {journalIdKeyParam.social.nested.map((item, index) => (
                            <li key={`social-links-${item.channel_code}${index}`}>
                              <Button
                                elem="a"
                                url={item.link}
                                target={'_blank'}
                                label={item.channel || ''}
                                cate={'link-ico-text-sns'}
                                size={''}
                                color={'body-link'}
                                icoLeft={true}
                                icoLeftData={
                                  item.channel_code?.toLowerCase() === 'facebook'
                                    ? icoSvgData.facebook
                                    : item.channel_code?.toLowerCase() === 'x'
                                    ? icoSvgData.twitter
                                    : item.channel_code?.toLowerCase() === 'instagram'
                                    ? icoSvgData.instagram
                                    : item.channel_code?.toLowerCase() === 'linkedin'
                                    ? icoSvgData.linkedin
                                    : item.channel_code?.toLowerCase() === 'youtube'
                                    ? icoSvgData.youtube
                                    : item.channel_code?.toLowerCase() === 'naverjrnlst'
                                    ? icoSvgData.naver
                                    : item.channel_code?.toLowerCase() === 'blog'
                                    ? icoSvgData.blog
                                    : item.channel_code?.toLowerCase() === 'kakaostory'
                                    ? icoSvgData.kakaostory
                                    : item.channel_code?.toLowerCase() === 'personal'
                                    ? icoSvgData.home
                                    : icoSvgData.others
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
              </>
            )}
          </dd>
          {journalContactInfo && journalContactInfo.contactUserAddedId !== 0 && (
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
                        journalContactInfo?.contactUserAddedId &&
                        setAddPersonalContactAction({
                          isOpen: true,
                          type: journalContactInfo.contactUserAddedId.toString(),
                          email: journalContactInfo.email ? journalContactInfo.email : '',
                          emailErr: '',
                          website: '',
                          websiteErr: '',
                          fax: '',
                          phone: journalContactInfo.phone ? journalContactInfo.phone : '',
                          telephone: journalContactInfo.mobile ? journalContactInfo.mobile : '',
                          address: journalContactInfo.address ? journalContactInfo.address : '',
                        })
                      }
                    />
                  </div>
                  {/* {journalContactInfo.updateAt && journalContactInfo.updater?.displayName && (
                    <p className="dl-table-type2__title-date">
                      {journalContactInfo.updater.displayName}{' '}
                      {moment(journalContactInfo.updateAt).format('YYYY-MM-DD')}
                    </p>
                  )} */}
                </div>
              </dt>
              <dd>
                {journalContactInfo.email && (
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
                            title={journalContactInfo.email}
                          >
                            <span className="select__label-text overflow-visible text-overflow__clip white-space__normal">
                              {journalContactInfo.email}
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
                                      pressProfileOptionAction(
                                        'targetEmail',
                                        journalIdKeyParam,
                                        journalContactInfo?.email || ''
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
                                      pressProfileOptionAction(
                                        'targetRelease',
                                        journalIdKeyParam,
                                        journalContactInfo?.email || ''
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
                                      href={`mailto:${journalContactInfo.email}`}
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
                        {journalContactInfo?.contactUserAddedId && journalContactBlockedInfo > 0 && (
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
                                key: Number(journalContactBlockedInfo),
                                title: '',
                                titleErr: '',
                                contents: '',
                                contentErr: '',
                              })
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {journalContactInfo.phone && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">전화</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">
                        {journalContactInfo?.phone.replace(PHONE_NUMBER_HYPHEN_PATTERN, `$1-$2-$3`) || '-'}
                      </p>
                    </div>
                  </div>
                )}
                {journalContactInfo.mobile && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">휴대전화</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">
                        {journalContactInfo?.mobile.replace(PHONE_NUMBER_HYPHEN_PATTERN, `$1-$2-$3`) || '-'}
                      </p>
                    </div>
                  </div>
                )}

                {journalContactInfo.address && (
                  <div className="dl-table-type2__flex">
                    <div className="dl-table-type2__flex-tit">
                      <p className="dl-table-type2__text">주소</p>
                    </div>
                    <div className="dl-table-type2__flex-txt">
                      <p className="dl-table-type2__text">{journalContactInfo.address}</p>
                    </div>
                  </div>
                )}

                {journalContactInfo.updateAt && journalContactInfo.updater?.displayName && (
                  <div className="dl-table-type2__flex">
                    <p className="dl-table-type2__title-date">
                      {journalContactInfo.updater.displayName}{' '}
                      {getDateFormat(timeZone, moment(journalContactInfo.updateAt).format('YYYY-MM-DD'))}
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
          {journalIdKeyParam.isSysInfo && !journalContactInfo && (
            <li>
              <Button
                label={'개인적 연락처 추가'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() =>
                  setAddPersonalContactAction({
                    isOpen: true,
                    type: 'press',
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
          {journalIdKeyParam.isSysInfo && (
            <li>
              <Button
                label={'정보 업데이트 요청'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() =>
                  setPressMediaErrPopupAction({
                    isOpen: true,
                    newsTitle:
                      `${journalIdKeyParam.name} ${journalIdKeyParam.media?.main?.name ?? ''}${
                        journalIdKeyParam.department ? ' ' + journalIdKeyParam.department : ''
                      }${journalIdKeyParam.role ? ' ' + journalIdKeyParam.role : ''}` || '',
                    type: 'press',
                    key: journalIdKey,
                    title: `정보 업데이트 요청: ${journalIdKeyParam.name} ${journalIdKeyParam.media?.main?.name ?? ''}${
                      journalIdKeyParam.department ? ' ' + journalIdKeyParam.department : ''
                    }${journalIdKeyParam.role ? ' ' + journalIdKeyParam.role : ''}`,
                    titleErr: '',
                    contents: '',
                    contentErr: '',
                  })
                }
              />
            </li>
          )}

          {/*@ts-ignore*/}
          {!journalIdKeyParam.isSysInfo && journalIdKeyParam.journalistUserDto && (
            <li>
              <p className="profile__footer-writer">
                <Button
                  // @ts-ignore
                  label={journalIdKeyParam.journalistUserDto.updater.displayName}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-link'}
                  onClick={() =>
                    // @ts-ignore
                    journalIdKeyParam.journalistUserDto &&
                    // @ts-ignore
                    journalIdKeyParam.journalistUserDto.updater &&
                    // @ts-ignore
                    journalIdKeyParam.journalistUserDto.updater.userId &&
                    // @ts-ignore
                    ownerFunction(journalIdKeyParam.journalistUserDto.updater.userId)
                  }
                />
                <span>
                  {/*@ts-ignore*/}
                  {journalIdKeyParam.journalistUserDto.cuType === 'CREATE' ? '작성' : '수정'} {/*@ts-ignore*/}
                  {getDateFormat(timeZone, moment(journalIdKeyParam.journalistUserDto.updateAt).format('YYYY-MM-DD'))}
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
