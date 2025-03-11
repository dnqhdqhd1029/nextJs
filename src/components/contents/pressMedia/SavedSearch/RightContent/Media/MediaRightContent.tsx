import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import Tabs from '~/components/common/ui/Tabs'
import { personalTabs, ProfileTabs } from '~/components/contents/pressMedia/SavedSearch/defaultData'
import Activity from '~/components/contents/pressMedia/SavedSearch/RightContent/Media/Activity'
import News from '~/components/contents/pressMedia/SavedSearch/RightContent/Media/News'
import Profile from '~/components/contents/pressMedia/SavedSearch/RightContent/Media/Profile'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { apiGetMediaImage } from '~/utils/api/image/apiGetMediaImage'
import { getCurrencyFormat } from '~/utils/common/number'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'
const MediaRightContent = () => {
  const {
    profileImageId,
    mediaTab,
    mediaIdKey,
    userMediaListAutoSaveData,
    licenseInfo,
    mediaApiList,
    userInfo,
    mediaIdKeyParam,
    setProfileImageId,
    setRegisterMediaPhotoPopupAction,
    mediaPhotoDeleteAdjust,
    checkAutoRegisterMediaRegist,
    changeMediaTab,
  } = useSavedSearch()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const { countLoading } = useAppSelector(state => state.savedSearchSlice)

  const getImage = async () => {
    setLoading(() => true)
    const imageSrc = await apiGetMediaImage(Number(mediaIdKey))
    setProfileImageId()
    setImageSrc(() => imageSrc)
    setLoading(() => false)
  }

  useEffect(() => {
    if (mediaIdKey) getImage()
  }, [mediaIdKey])

  useEffect(() => {
    if (profileImageId !== 0 && mediaIdKey !== 0 && profileImageId.toString() === mediaIdKey.toString()) getImage()
  }, [profileImageId, mediaIdKey])

  if (!mediaIdKeyParam) {
    return null
  }
  if (!mediaIdKey) {
    return null
  }

  return (
    <div className="aside-profile__section">
      <ul className="interval-mt20">
        <li>
          <div className="aside-profile__header">
            {mediaIdKey ? (
              <a
                href={`/media/record/${Number(mediaIdKey) || 0}`}
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
                className="profile-img__group type-corp"
                style={{
                  pointerEvents:
                    !mediaIdKeyParam.isSysInfo && mediaIdKeyParam?.owner?.uid === userInfo.userId ? 'unset' : 'none',
                }}
              >
                {!loading ? (
                  <div className="profile__img">
                    {imageSrc === '' ? (
                      <IcoAvatar
                        label={mediaIdKeyParam.name || ''}
                        icoData={!mediaIdKeyParam.isSysInfo ? icoSvgData.lockFill : icoSvgData.personFill}
                        size={'s112'}
                        icoSize={'s64'}
                      />
                    ) : (
                      <img
                        src={imageSrc}
                        id={'mediaIdKey_imageSrc_isSysInfo_' + mediaIdKey}
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
                            document?.getElementById(`mediaIdKey_imageSrc_isSysInfo_${mediaIdKey}`)?.className =
                              'ratio-vertical'
                          }
                        }}
                        alt={mediaIdKeyParam.name || ''}
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
                {!mediaIdKeyParam.isSysInfo && imageSrc !== '' && (
                  <p className="profile-img__ico">
                    <span className="hidden">잠금</span>
                  </p>
                )}
                {/*@ts-ignore*/}
                {!mediaIdKeyParam.isSysInfo && mediaIdKeyParam.owner.uid === userInfo.userId && (
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
                                setRegisterMediaPhotoPopupAction({
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
                                onClick={() => mediaPhotoDeleteAdjust(mediaIdKey)}
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
                    href={`/media/record/${Number(mediaIdKey) || 0}`}
                    className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`)}
                  >
                    <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                      <strong>{mediaIdKeyParam.name}</strong>
                    </span>
                  </a>
                </h3>
                {mediaIdKeyParam.isSysInfo && (
                  <p className="profile__team">{mediaIdKeyParam.subtype ? mediaIdKeyParam.subtype : ''}</p>
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
                    countIdKey={(mediaIdKeyParam?.name || '').toString() + (mediaIdKeyParam?.mid || '').toString()}
                    countIsShow={
                      mediaIdKeyParam &&
                      // @ts-ignore
                      mediaIdKeyParam.mediaListList &&
                      // @ts-ignore
                      mediaIdKeyParam.mediaListList.length > 0
                    }
                    count={
                      mediaIdKeyParam &&
                      // @ts-ignore
                      mediaIdKeyParam.mediaListList &&
                      // @ts-ignore
                      mediaIdKeyParam.mediaListList.length > 0
                        ? // @ts-ignore
                          mediaIdKeyParam.mediaListList.length
                        : 0
                    }
                    icoLeft={false}
                    icoLeftData={icoSvgData.checkThick}
                    onClick={() =>
                      mediaIdKeyParam &&
                      checkAutoRegisterMediaRegist(true, mediaIdKeyParam, userMediaListAutoSaveData, mediaApiList)
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
              activeId={mediaTab}
              onChange={tabId => changeMediaTab(tabId, mediaIdKey, mediaIdKeyParam)}
              items={
                !mediaIdKeyParam.isSysInfo ? personalTabs : licenseInfo.flagMonitoring ? ProfileTabs : personalTabs
              }
              type="small"
            />
          </div>
          <Profile />
          <Activity />
          <News />
        </li>
      </ul>
    </div>
  )
}

export default MediaRightContent
