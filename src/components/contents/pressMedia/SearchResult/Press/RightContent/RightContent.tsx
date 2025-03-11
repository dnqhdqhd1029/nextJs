import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import Tabs from '~/components/common/ui/Tabs'
import Tooltips from '~/components/common/ui/Tooltips'
import { personalTabs, ProfileTabs } from '~/components/contents/pressMedia/SearchResult/defaultData'
import Activity from '~/components/contents/pressMedia/SearchResult/Press/RightContent/Activity'
import News from '~/components/contents/pressMedia/SearchResult/Press/RightContent/News'
import Profile from '~/components/contents/pressMedia/SearchResult/Press/RightContent/Profile'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { apiGetJournalistImage } from '~/utils/api/image/apiGetJournalistImage'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'
const PressRightContent = () => {
  const {
    profileImageId,
    journalApiList,
    journalTab,
    userInfo,
    journalIdKey,
    userPressListAutoSaveData,
    journalIdKeyParam,
    licenseInfo,
    setRegisterJournalPhotoPopupAction,
    setProfileImageId,
    checkAutoRegisterPressRegist,
    changeJournalTab,
    journalistPhotoDeleteAdjust,
  } = usePressMediaSearchResult()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const [isMoreMedia, setIsMoreMedia] = useState(false)
  const { countLoading } = useAppSelector(state => state.pressMediaSearchResultSlice)

  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetJournalistImage(Number(journalIdKey))
    setProfileImageId()
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

  if (!journalIdKeyParam) {
    return null
  }

  if (!journalIdKey) {
    return null
  }

  return (
    <div className="aside-profile__section">
      <ul className="interval-mt20">
        <li>
          <div className="aside-profile__header">
            {journalIdKey ? (
              <a
                href={`/contacts/record/${Number(journalIdKey) || 0}`}
                className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`, `colors-${'secondary'}`)}
              >
                <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                  자세히보기
                </span>
                <span className={cn(`button__ico-right button-${'link-text-arrow'}__ico-right`, [`ico-size${'m'}`])}>
                  <IcoSvg data={icoSvgData.chevronRight} />
                </span>
              </a>
            ) : (
              <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>자세히보기</span>
            )}
          </div>
        </li>
        <li>
          <div className="profile__section">
            <div className="profile__area">
              <div
                className="profile-img__group type-person"
                style={{
                  pointerEvents:
                    !journalIdKeyParam.isSysInfo && journalIdKeyParam?.owner?.uid === userInfo.userId
                      ? 'unset'
                      : 'none',
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
                        id={'journalIdKeyParam_imageSrc_isSysInfo_' + journalIdKey}
                        onLoad={e => {
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
                            document?.getElementById(
                              `journalIdKeyParam_imageSrc_isSysInfo_${journalIdKey}`
                            )?.className = 'ratio-vertical'
                          }
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
                {/*@ts-ignore*/}
                {!journalIdKeyParam.isSysInfo &&
                  //@ts-ignore
                  journalIdKeyParam.owner &&
                  //@ts-ignore
                  journalIdKeyParam.owner.uid &&
                  //@ts-ignore
                  journalIdKeyParam.owner.uid === userInfo.userId && (
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
                  <a
                    href={`/contacts/record/${Number(journalIdKey) || 0}`}
                    className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`)}
                  >
                    <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                      <strong>{journalIdKeyParam.name}</strong>
                    </span>
                  </a>
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
                              ? journalIdKeyParam.media?.others?.length > 0 &&
                                (journalIdKeyParam?.media?.others.filter(e => e.stat === '발행') || []).length > 0
                                ? `${
                                    (journalIdKeyParam?.media?.others.filter(e => e.stat === '발행') || []).length ?? 0
                                  }개 +`
                                : `${
                                    (journalIdKeyParam?.media?.others.filter(e => e.stat === '발행') || []).length ?? 0
                                  }개`
                              : ''
                          }
                          cate={'link-text'}
                          size={'m'}
                          color={'body-link'}
                          onClick={() =>
                            journalIdKeyParam.media?.others &&
                            journalIdKeyParam.media?.others?.length > 0 &&
                            (journalIdKeyParam?.media?.others.filter(e => e.stat === '발행') || []).length > 0 &&
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
                      {journalIdKeyParam.journalistUserDto?.mediaName + ' ' ?? ''}
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
                      <span>{journalIdKeyParam.journalistUserDto.department + ' '}</span>
                    )}
                    {/*@ts-ignore*/}
                    {journalIdKeyParam.journalistUserDto.position && (
                      //@ts-ignore
                      <span>{journalIdKeyParam.journalistUserDto.position + ' '}</span>
                    )}
                  </p>
                ) : (
                  <p className="profile__team">
                    {journalIdKeyParam.department && <span>{journalIdKeyParam.department + ' '}</span>}
                    {journalIdKeyParam.role && <span>{journalIdKeyParam.role + ' '}</span>}
                  </p>
                )}
                <p className="profile__btn">
                  <Button
                    label={'리스트에 추가'}
                    cate={'check-number'}
                    size={'m'}
                    color={'primary'}
                    isLoading={countLoading}
                    disabled={countLoading}
                    isCountAnimation={false}
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
                      checkAutoRegisterPressRegist(true, journalIdKeyParam, userPressListAutoSaveData, journalApiList)
                    }
                  />
                </p>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div className="press-information__tab">
            <Tabs
              activeId={journalTab}
              onChange={tabId => changeJournalTab(tabId, journalIdKey, journalIdKeyParam)}
              items={
                !journalIdKeyParam.isSysInfo ? personalTabs : licenseInfo.flagMonitoring ? ProfileTabs : personalTabs
              }
              type="small"
            />
          </div>
          <Profile />
          <News />
          <Activity />
        </li>
      </ul>
    </div>
  )
}

export default PressRightContent
