import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import Flag from '~/components/common/ui/Flag'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import Tooltips from '~/components/common/ui/Tooltips'
import {
  DefaultPressProfileOption,
  PressProfileOption,
} from '~/components/contents/pressMedia/PressProfile/defaultData'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { apiGetJournalistImage } from '~/utils/api/image/apiGetJournalistImage'
import { getDateFormat } from '~/utils/common/date'
import { handleNonBreakSpace } from '~/utils/common/number'
import { PHONE_NUMBER_HYPHEN_PATTERN } from '~/utils/common/regex'
import { getHtmlContentFromString } from '~/utils/common/string'
import { openToast } from '~/utils/common/toast'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'

const Profile = () => {
  const router = useRouter()
  const {
    profileImageId,
    isDemoLicense,
    timeZone,
    userInfo,
    journalIdKey,
    journalContactBlockedInfo,
    journalIdKeyParam,
    journalEmailBlocking,
    userPressListAutoSaveData,
    journalContactInfo,
    journalDecodeList,
    isJournalUserBlock,
    setBlockedEmailSenderPopupAction,
    setRegisterJournalPhotoPopupAction,
    setPressMediaErrPopupAction,
    setPressMediaUnBlockPopupAction,
    setProfileImageIdActionAction,
    setAddPersonalContactAction,
    pressProfileOptionAction,
    journalistPhotoDeleteAdjust,
    ownerFunction,
    pressProfileAction,
    checkAutoRegisterPressRegist,
  } = usePressProfile()
  const profileLayerRef = useRef<HTMLDivElement>(null)
  const emailLayerRef = useRef<HTMLDivElement>(null)
  const personalEmailLayerRef = useRef<HTMLDivElement>(null)

  const [profileLayer, setProfileLayer] = useState(false)
  const [emailLayer, setEmailLayer] = useState(false)
  const [personalEmailLayer, setPersonalEmailLayer] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [isMoreMedia, setIsMoreMedia] = useState(false)
  const [emailFunctionCount, setEmailFunctionCount] = useState<string>('')

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (profileLayerRef.current && !profileLayerRef.current.contains(e.target as Node)) setProfileLayer(() => false)
      if (emailLayerRef.current && !emailLayerRef.current.contains(e.target as Node)) setEmailLayer(() => false)
      if (personalEmailLayerRef.current && !personalEmailLayerRef.current.contains(e.target as Node))
        setPersonalEmailLayer(() => false)
    },
    [profileLayer, emailLayer]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetJournalistImage(Number(journalIdKey))
    setProfileImageIdActionAction()
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  useEffect(() => {
    if (journalIdKey) getImage()
    setIsMoreMedia(() => false)
  }, [journalIdKey])

  useEffect(() => {
    if (profileImageId !== 0 && journalIdKey !== 0 && profileImageId.toString() === journalIdKey.toString()) getImage()
  }, [profileImageId, journalIdKey])

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

  if (!journalIdKeyParam) {
    return null
  }

  if (!journalIdKey) {
    return null
  }

  const getPressProfileOptions = () => {
    if (
      !journalIdKeyParam.isSysInfo &&
      (journalIdKeyParam.owner?.uid === userInfo.userId || userInfo.role === 'ADMIN')
    ) {
      return DefaultPressProfileOption
    }
    return PressProfileOption
  }

  return (
    <ul className="interval-mt20">
      <li>
        <div className="mb-lnb-control__group">
          <div className="mb-lnb-control__arrow">
            <Button
              label={'arrowLeft'}
              cate={'ico-only'}
              size={'s'}
              color={'body-text'}
              icoLeft={true}
              icoLeftData={icoSvgData.arrowLeft}
              icoSize={24}
              onClick={() => router.back()}
            />
          </div>
          <div className="mb-lnb-control__select">
            <div
              ref={profileLayerRef}
              className="select__section select-type1-small select-ico-only select-align-right"
            >
              <button
                className="select__label ico-size16"
                onClick={() => setProfileLayer(!profileLayer)}
              >
                <span className="select__label-text">설정</span>
                <IcoSvg data={icoSvgData.threeDotsVertical} />
              </button>

              <div className={cn('select-option__section', { 'display-block': profileLayer })}>
                <div className="select-option__area">
                  <ul className="select-option__group">
                    <Fragment>
                      {getPressProfileOptions().map(e => (
                        <li key={'DefaultPressProfileOption' + e.id}>
                          <button
                            className="select-option__item is-selected"
                            onClick={() => pressProfileAction(e.id, journalIdKeyParam, journalDecodeList)}
                          >
                            <span className="select-option__item-text">{e.name}</span>
                          </button>
                        </li>
                      ))}
                    </Fragment>
                    {isJournalUserBlock && isJournalUserBlock.blockedUserId > 0 ? (
                      <li>
                        <button
                          className="select-option__item"
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
                        >
                          <span className="select-option__item-text">수신 거부 해제 요청</span>
                        </button>
                      </li>
                    ) : (
                      <Fragment>
                        {journalEmailBlocking ? (
                          <li>
                            <button
                              className="select-option__item"
                              onClick={() =>
                                setBlockedEmailSenderPopupAction({
                                  isOpen: true,
                                  type: 'press',
                                  status: 'unblock',
                                  idKey: journalIdKey.toString(),
                                })
                              }
                            >
                              <span className="select-option__item-text">이메일 발송 차단 해제</span>
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button
                              className="select-option__item"
                              onClick={() =>
                                setBlockedEmailSenderPopupAction({
                                  isOpen: true,
                                  type: 'press',
                                  status: 'block',
                                  email: journalDecodeList.beemail,
                                  idKey: journalIdKey.toString(),
                                })
                              }
                            >
                              <span className="select-option__item-text">이메일 발송 차단</span>
                            </button>
                          </li>
                        )}
                      </Fragment>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="profile__section">
          <div className="profile__area">
            <div
              className="profile-img__group type-person"
              style={{
                pointerEvents:
                  !journalIdKeyParam.isSysInfo && journalIdKeyParam?.owner?.uid === userInfo.userId ? 'unset' : 'none',
              }}
            >
              {!loading ? (
                <div className="profile__img">
                  {imageSrc === '' ? (
                    <IcoAvatar
                      label={journalIdKeyParam.name || ''}
                      icoData={!journalIdKeyParam.isSysInfo ? icoSvgData.lockFill : icoSvgData.personFill}
                      size={'s112'}
                      icoSize={'s64'}
                    />
                  ) : (
                    <img
                      src={imageSrc}
                      id={'imageSrc_isSysInfo'}
                      onLoad={e => {
                        const imageSrcDetail = e.target
                        //@ts-ignore
                        if (
                          //@ts-ignore
                          imageSrcDetail.naturalWidth &&
                          //@ts-ignore
                          imageSrcDetail.naturalHeight &&
                          //@ts-ignore
                          imageSrcDetail.naturalHeight > e.target.naturalWidth
                        ) {
                          //@ts-ignore
                          document?.getElementById('imageSrc_isSysInfo')?.className = 'ratio-vertical'
                        }
                        //@ts-ignore
                        console.log('imageSrc width', e.target.naturalWidth)
                        //@ts-ignore
                        console.log('imageSrc height', e.target.naturalHeight)
                      }}
                      alt={journalIdKeyParam.name || ''}
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
              {!journalIdKeyParam.isSysInfo && imageSrc !== '' && (
                <p className="profile-img__ico">
                  <span className="hidden">잠금</span>
                </p>
              )}
              {!journalIdKeyParam.isSysInfo && journalIdKeyParam?.owner?.uid === userInfo.userId && (
                <div className={cn('select__section select-type1-small select-ico-only is-show')}>
                  <Button
                    label={'에디터'}
                    cate={'ico-only'}
                    size={'s32'}
                    color={'white'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.pencilFill2}
                    icoSize={32}
                  />
                  <div className="select-option__section">
                    <div className="select-option__area">
                      <ul className="select-option__group">
                        <li>
                          <button
                            className="select-option__item is-selected"
                            onClick={() =>
                              setRegisterJournalPhotoPopupAction({
                                isOpen: true,
                                type: imageSrc !== '' ? 'eidt' : 'add',
                                imageUrl: imageSrc,
                                filesList: [],
                              })
                            }
                          >
                            <span className="select-option__item-text">사진 등록</span>
                          </button>
                        </li>
                        {imageSrc !== '' && (
                          <li>
                            <button
                              className="select-option__item"
                              onClick={() => journalistPhotoDeleteAdjust(journalIdKey)}
                            >
                              <span className="select-option__item-text">사진 삭제</span>
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="profile__group">
              <h3 className="profile__name">
                <strong>{journalIdKeyParam.name}</strong>
                {/*@ts-ignore*/}
                {journalIdKeyParam?.manage && journalIdKeyParam?.manage?.profile_open && (
                  <Tooltips
                    tooltipId={`tt1`}
                    tooltipPlace={'top'}
                    tooltipHtml={'인증 언론인'}
                    tooltipComponent={<IcoSvg data={icoSvgData.patchCheckFill} />}
                  />
                )}
              </h3>
              {journalIdKeyParam.isSysInfo ? (
                <div className="profile__team">
                  <a
                    href={`/media/record/${Number(journalIdKeyParam?.media?.main?.id) || 0}`}
                    className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                  >
                    <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                      {journalIdKeyParam.media?.main?.name ?? ''}
                    </span>
                  </a>
                  <span>{journalIdKeyParam.media?.main?.subtype}</span>
                  {!isMoreMedia && journalIdKeyParam.media?.others && journalIdKeyParam.media?.others?.length > 0 && (
                    <Fragment>
                      {/* <span>매체</span> */}
                      <Button
                        label={
                          journalIdKeyParam.media?.others
                            ? journalIdKeyParam.media?.others?.length > 0
                              ? `${journalIdKeyParam.media?.others.map(e => e.stat === '발행')?.length ?? 0}개 +`
                              : `${journalIdKeyParam.media?.others.map(e => e.stat === '발행')?.length ?? 0}개`
                            : ''
                        }
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                        onClick={() =>
                          journalIdKeyParam.media?.others &&
                          journalIdKeyParam.media?.others?.length > 0 &&
                          setIsMoreMedia(prevState => !prevState)
                        }
                      />
                    </Fragment>
                  )}
                </div>
              ) : (
                <div className="profile__team">
                  <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                    {/*@ts-ignore*/}
                    {journalIdKeyParam.journalistUserDto?.mediaName ?? ''}
                  </span>
                </div>
              )}
              {isMoreMedia && (
                <div>
                  {journalIdKeyParam.media?.others?.map(e => {
                    if (e.stat === '발행') {
                      return (
                        <p
                          className="profile__team"
                          key={e.id}
                        >
                          <a
                            href={`/media/record/${Number(e.id) || 0}`}
                            className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                          >
                            <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                              {e.name ?? ''}
                            </span>
                          </a>
                          <span>{e.subtype}</span>
                        </p>
                      )
                    }
                  })}
                </div>
              )}
              {!journalIdKeyParam.isSysInfo ? (
                <p className="profile__team">
                  {/*@ts-ignore*/}
                  {journalIdKeyParam.journalistUserDto.department && (
                    //@ts-ignore
                    <span>{journalIdKeyParam.journalistUserDto.department}</span>
                  )}
                  {/*@ts-ignore*/}
                  {journalIdKeyParam.journalistUserDto.position && (
                    //@ts-ignore
                    <span>{journalIdKeyParam.journalistUserDto.position}</span>
                  )}
                </p>
              ) : (
                <p className="profile__team">
                  {journalIdKeyParam.department && <span>{journalIdKeyParam.department}</span>}
                  {journalIdKeyParam.role && <span>{journalIdKeyParam.role}</span>}
                </p>
              )}

              <p className="profile__btn">
                <Button
                  label={'리스트에 추가'}
                  cate={'check-number'}
                  size={'m'}
                  color={'primary'}
                  isCountAnimation={true}
                  countIdKey={
                    (journalIdKeyParam?.title || '').toString() + (journalIdKeyParam?.jrnlst_id || '').toString()
                  }
                  countIsShow={
                    journalIdKeyParam &&
                    // @ts-ignore
                    journalIdKeyParam.journalistGroupList &&
                    // @ts-ignore
                    journalIdKeyParam.journalistGroupList.length > 0
                  }
                  count={
                    journalIdKeyParam &&
                    // @ts-ignore
                    journalIdKeyParam.journalistGroupList &&
                    // @ts-ignore
                    journalIdKeyParam.journalistGroupList.length > 0
                      ? // @ts-ignore
                        journalIdKeyParam.journalistGroupList.length
                      : 0
                  }
                  icoLeft={false}
                  icoLeftData={icoSvgData.checkThick}
                  onClick={() =>
                    journalIdKeyParam &&
                    checkAutoRegisterPressRegist(true, journalIdKeyParam, userPressListAutoSaveData)
                  }
                />
              </p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="profile__section">
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
                    <p className="dl-table-type2__text">{journalDecodeList.fax}</p>
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
                      ref={emailLayerRef}
                    >
                      <div className="select__section select-type1-small">
                        <button
                          className="select__label"
                          onClick={() => {
                            if (isDemoLicense) {
                              openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
                            } else {
                              setEmailLayer(prev => !prev)
                            }
                          }}
                        >
                          <span className="select__label-text">{journalDecodeList.beemail}</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>
                        <div
                          className={cn('select-option__section', {
                            'display-block': emailLayer,
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
                      {journalIdKeyParam.email.beemail_is_shared && (
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
                    {/* {journalContactInfo.updateAt && journalContactInfo.updater?.name && (
                      <p className="dl-table-type2__title-date">
                        {journalContactInfo.updater.name} {moment(journalContactInfo.updateAt).format('YYYY-MM-DD')}
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
                            ref={personalEmailLayerRef}
                          >
                            <button
                              className="select__label height__auto"
                              onClick={() => setPersonalEmailLayer(prev => !prev)}
                              title={journalContactInfo.email}
                            >
                              <span className="select__label-text overflow-visible text-overflow__clip white-space__normal">
                                {journalContactInfo.email}
                              </span>
                              <IcoSvg data={icoSvgData.chevronDown} />
                            </button>
                            <div
                              className={cn('select-option__section', {
                                'display-block': personalEmailLayer,
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
                                      key: Number(journalContactBlockedInfo),
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
                  {journalContactInfo.updateAt && journalContactInfo.updater?.name && (
                    <div className="dl-table-type2__flex">
                      <p className="dl-table-type2__title-date">
                        {journalContactInfo.updater.name}{' '}
                        {getDateFormat(timeZone, moment(journalContactInfo.updateAt).format('YYYY-MM-DD'))}
                      </p>
                    </div>
                  )}
                </dd>
              </>
            )}
          </dl>
        </div>
      </li>
      <li>
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
                  onClick={() => {
                    setPressMediaErrPopupAction({
                      isOpen: true,
                      newsTitle:
                        `${journalIdKeyParam.name} ${journalIdKeyParam.media?.main?.name ?? ''}${
                          journalIdKeyParam.department ? ' ' + journalIdKeyParam.department : ''
                        }${journalIdKeyParam.role ? ' ' + journalIdKeyParam.role : ''}` || '',
                      type: 'press',
                      key: journalIdKey,
                      title: `정보 업데이트 요청: ${journalIdKeyParam.name} ${
                        journalIdKeyParam.media?.main?.name ?? ''
                      }${journalIdKeyParam.department ? ' ' + journalIdKeyParam.department : ''}${
                        journalIdKeyParam.role ? ' ' + journalIdKeyParam.role : ''
                      }`,
                      titleErr: '',
                      contents: '',
                      contentErr: '',
                    })
                  }}
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
      </li>
    </ul>
  )
}

export default Profile
