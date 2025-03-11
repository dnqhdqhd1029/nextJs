import { ChangeEvent, Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'
import moment from 'moment'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import IcoAvatar from '~/components/common/ui/IcoAvatar'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import ClipbookListPopup from '~/components/contents/common/forms/ClipbookListPopup/ClipbookListPopup'
import TagLayerSearch from '~/components/contents/common/forms/TagSearchForm/TagLayerSearch'
import LoadingPage from '~/components/contents/monitoring/News/Loading/LoadingPage'
import Notice from '~/components/contents/monitoring/News/Notice/Notice'
import NewsDeletePopup from '~/components/contents/monitoring/News/popup/NewsDelete'
import NewsEditPopup from '~/components/contents/monitoring/News/popup/NewsEditPopup'
import NewsErrReportPopup from '~/components/contents/monitoring/News/popup/NewsErrReportPopup'
import UserProfilePopup from '~/components/contents/monitoring/News/popup/UserProfilePopup'
import { ReporterDto } from '~/types/api/service'
import { getDateFormat, getNewsDateFormat } from '~/utils/common/date'
import { getCurrencyFormat, handleNonBreakSpace } from '~/utils/common/number'
import { useMonitoringSearchDetail } from '~/utils/hooks/contents/monitoring/useMonitoringSearchDetail'

const AuthorUnSysInfo = ({ id }: any) => {
  return (
    <dd>
      <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>{id || ''}</span>
    </dd>
  )
}

const AuthorSysInfo = (props: ReporterDto) => {
  return (
    <Fragment>
      {props?.flagLink ? (
        <a
          //@ts-ignore
          href={`/contacts/record/${Number(props?.pid) || 0}`}
          className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
        >
          <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>{props.name || ''}</span>
          {props?.department && props?.department !== '' && (
            <span
              style={{ paddingLeft: 5 }}
              className="color-secondary"
            >
              {props?.department}
            </span>
          )}
          <span
            className="color-secondary"
            style={{ paddingLeft: 5 }}
          >
            {/*@ts-ignore*/}
            {props?.position}
          </span>
        </a>
      ) : (
        <Fragment>
          <span
            className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}
            style={{ marginRight: 8 }}
          >
            {props.name || ''}
          </span>
          <span
            className="color-secondary"
            style={{ paddingLeft: 5 }}
          >
            {/*@ts-ignore*/}
            {props?.position}
          </span>
        </Fragment>
      )}
    </Fragment>
  )
}

const News = () => {
  const router = useRouter()
  const {
    newsEditPopup,
    timeZone,
    newsApiParams,
    userClipbookListAutoSaveData,
    newsLoading,
    newsIdParams,
    tagStatusOnChange,
    init,
    moveToSearch,
    optionActions,
    ownerFunction,
    afterClipbookAction,
    checkAutoRegisterClipbook,
  } = useMonitoringSearchDetail()
  const shareIdOpenRef = useRef<HTMLDivElement>(null)
  const [isOption, setIsOption] = useState(false)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (shareIdOpenRef.current && !shareIdOpenRef.current.contains(e.target as Node)) setIsOption(() => false)
    },
    [isOption]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Notice />
      <div className="mb-container responsive-type1 type-max-w1400">
        <div className="mb-common-inner">
          <div className="mb-contents">
            <div className="activity__section">
              <div className="mb-contents-header__section type-control">
                <div className="common-title__section">
                  <div className="common-title__group">
                    <div className="common-title__path">
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
                    <div className="common-title__buttons">
                      <div
                        ref={shareIdOpenRef}
                        // className="select__section select-type1-small select-line select-align-right"
                        className={cn('select__section select-type1-small select-type1-tertiary select-align-right', {
                          'is-show': isOption,
                        })}
                      >
                        <button
                          className="select__label"
                          onClick={() => setIsOption(!isOption)}
                        >
                          <span className="select__label-text">작업하기</span>
                          <IcoSvg data={icoSvgData.chevronDown} />
                        </button>
                        <div className={cn('select-option__section', { 'display-block': isOption })}>
                          <div className="select-option__area">
                            <ul className="select-option__group">
                              {newsIdParams &&
                                newsIdParams.optionList.map(e => (
                                  <li key={'news_option_select' + e.name}>
                                    <button
                                      className="select-option__item"
                                      onClick={() => newsIdParams && optionActions(e.id, newsIdParams)}
                                    >
                                      <span className="select-option__item-text">{e.name}</span>
                                    </button>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="monitoring__section">
                <div className="aside-monitoring__section">
                  <ul className="interval-mt28">
                    <li>
                      <ul className="interval-mt16">
                        <li>
                          <ul className="interval-mt8">
                            <li>
                              <p className="font-body__regular">
                                {getNewsDateFormat(
                                  timeZone,
                                  moment(newsIdParams?.inserted).format('YYYY-MM-DD HH:mm'),
                                  true
                                )}
                              </p>
                            </li>
                            {newsIdParams && (
                              <li>
                                <div className="monitoring-header__title">
                                  <h3 className="aside-monitoring__title">{newsIdParams?.title}</h3>
                                  {newsIdParams?.video_exist && <IcoSvg data={icoSvgData.videoPlay} />}
                                  {newsIdParams?.photo_urls && newsIdParams?.photo_urls.length > 0 && (
                                    <IcoSvg data={icoSvgData.image} />
                                  )}
                                  {!newsIdParams?.isSysInfo && (
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: '3.5px',
                                        paddingTop: '1px',
                                      }}
                                    >
                                      <Tooltips
                                        tooltipId={'tt10-1'}
                                        tooltipPlace={'top'}
                                        tooltipHtml={'개인 추가 뉴스'}
                                        tooltipComponent={<IcoSvg data={icoSvgData.addNews} />}
                                      />
                                    </div>
                                  )}
                                </div>
                              </li>
                            )}
                            <li>
                              <ul className="grid-col2 type-interval20">
                                <li>
                                  <dl className="dl-table-type1__section">
                                    <dt>
                                      <p className="dl-table-type1__text">매체</p>
                                    </dt>
                                    {newsIdParams?.mapped && newsIdParams?.mapped.mid && newsIdParams?.mapped.mname ? (
                                      <dd>
                                        <p className="dl-table-type1__text type-link">
                                          {newsIdParams?.mapped?.mid && Number(newsIdParams?.mapped?.mid) !== 0 ? (
                                            <a
                                              href={`/media/record/${Number(newsIdParams?.mapped?.mid) || 0}`}
                                              className={cn(
                                                `button-${'link-text'}`,
                                                `size-${'m'}`,
                                                `colors-${'body-link'}`
                                              )}
                                            >
                                              <span
                                                className={cn(
                                                  `button__label button-${'link-text'}__label`,
                                                  `size-${'m'}`
                                                )}
                                              >
                                                {newsIdParams?.mapped.mname || ''}
                                              </span>
                                            </a>
                                          ) : (
                                            <span
                                              className={cn(
                                                `button__label button-${'link-text'}__label`,
                                                `size-${'m'}`
                                              )}
                                              style={{ marginRight: 8 }}
                                            >
                                              {newsIdParams?.mapped.mname || ''}
                                            </span>
                                          )}
                                          <span className="color-secondary">{newsIdParams?.mediaSubType}</span>
                                        </p>
                                      </dd>
                                    ) : (
                                      <dd>
                                        <p className="dl-table-type1__text type-link">알수없음</p>
                                      </dd>
                                    )}
                                    {newsIdParams?.isSysInfo ? (
                                      <Fragment>
                                        {newsIdParams?.reporterList &&
                                          newsIdParams?.reporterList.length > 0 &&
                                          newsIdParams?.reporterList.map((e, index) => {
                                            if (index === 0) {
                                              return (
                                                <Fragment key={'newsIdParams?.mapped.mname' + e.name}>
                                                  <dt>
                                                    <p className="dl-table-type1__text">저자</p>
                                                  </dt>
                                                  <dd>
                                                    <AuthorSysInfo {...e} />
                                                  </dd>
                                                </Fragment>
                                              )
                                            } else {
                                              return (
                                                <Fragment key={'newsIdParams?.mapped.mname' + e.name}>
                                                  <dt></dt>
                                                  <dd>
                                                    <AuthorSysInfo {...e} />
                                                  </dd>
                                                </Fragment>
                                              )
                                            }
                                          })}
                                      </Fragment>
                                    ) : (
                                      <Fragment>
                                        {newsIdParams?.reporterList && newsIdParams?.reporterList.length > 0 ? (
                                          <Fragment>
                                            {newsIdParams?.reporterList.map((e, index) => {
                                              if (index === 0) {
                                                return (
                                                  <Fragment key={'newsIdParams?.mapped.mname' + e.name}>
                                                    <dt>
                                                      <p className="dl-table-type1__text">저자</p>
                                                    </dt>
                                                    <dd>
                                                      <AuthorSysInfo {...e} />
                                                    </dd>
                                                  </Fragment>
                                                )
                                              } else {
                                                return (
                                                  <Fragment key={'newsIdParams?.mapped.mname' + e.name}>
                                                    <dt></dt>
                                                    <dd>
                                                      <AuthorSysInfo {...e} />
                                                    </dd>
                                                  </Fragment>
                                                )
                                              }
                                            })}
                                            {newsIdParams?.unmapped &&
                                              newsIdParams?.unmapped.length > 0 &&
                                              newsIdParams?.unmapped.map((e, index) => {
                                                return (
                                                  <Fragment key={'newsIdParams?.unmapped.mname' + e}>
                                                    <dt></dt>
                                                    <AuthorUnSysInfo id={e} />
                                                  </Fragment>
                                                )
                                              })}
                                          </Fragment>
                                        ) : (
                                          <Fragment>
                                            {newsIdParams?.unmapped &&
                                              newsIdParams?.unmapped.length > 0 &&
                                              newsIdParams?.unmapped.map((e, index) => {
                                                if (index === 0) {
                                                  return (
                                                    <Fragment key={'newsIdParams?.unmapped.mname' + e}>
                                                      <dt>
                                                        <p className="dl-table-type1__text">저자</p>
                                                      </dt>
                                                      <AuthorUnSysInfo id={e} />
                                                    </Fragment>
                                                  )
                                                } else {
                                                  return (
                                                    <Fragment key={'newsIdParams?.unmapped.mname' + e}>
                                                      <dt></dt>
                                                      <AuthorUnSysInfo id={e} />
                                                    </Fragment>
                                                  )
                                                }
                                              })}
                                          </Fragment>
                                        )}
                                      </Fragment>
                                    )}
                                    {newsIdParams?.owner && newsIdParams?.owner && (
                                      <Fragment>
                                        <dt>
                                          <p className="dl-table-type1__text">작성자</p>
                                        </dt>
                                        <dd>
                                          <p className="dl-table-type1__text type-link">
                                            <a
                                              className={cn(
                                                `button-${'link-text'}`,
                                                `size-${'m'}`,
                                                `colors-${'body-link'}`
                                              )}
                                              onClick={() => newsIdParams?.owner && ownerFunction(newsIdParams?.owner)}
                                            >
                                              <span
                                                className={cn(
                                                  `button__label button-${'link-text'}__label`,
                                                  `size-${'m'}`
                                                )}
                                              >
                                                {/*@ts-ignore*/}
                                                {newsIdParams?.owner?.displayName || ''}
                                              </span>
                                            </a>
                                          </p>
                                        </dd>
                                      </Fragment>
                                    )}
                                  </dl>
                                </li>
                                <li>
                                  <dl className="dl-table-type1__section">
                                    {newsIdParams?.regis_at && newsIdParams?.regis_at !== '' && (
                                      <>
                                        <dt>
                                          <p className="dl-table-type1__text">수집일</p>
                                        </dt>
                                        <dd>
                                          <p className="dl-table-type1__text">
                                            {newsIdParams?.regis_at && newsIdParams?.regis_at !== '' ? (
                                              <p className="dl-table-type1__text">
                                                {getDateFormat(
                                                  timeZone,
                                                  moment(newsIdParams?.regis_at).format('YYYY-MM-DD HH:mm')
                                                )}
                                              </p>
                                            ) : (
                                              <p className="dl-table-type1__text">-</p>
                                            )}
                                          </p>
                                        </dd>
                                      </>
                                    )}
                                    {newsIdParams?.clipbookData && newsIdParams?.clipbookData.length > 0 && (
                                      <Fragment>
                                        <dt>
                                          <p className="dl-table-type1__text">클립북</p>
                                        </dt>
                                        <dd>
                                          {newsIdParams?.clipbookData &&
                                            newsIdParams?.clipbookData.length > 0 &&
                                            newsIdParams?.clipbookData.map(e => (
                                              <p
                                                className="dl-table-type1__text type-link"
                                                key={'newsIdParams.clipBookIdList' + e.id}
                                              >
                                                <a
                                                  href={`/news/clipbook-result?clipbook_id=${e.id}`}
                                                  className={cn(
                                                    `button-${'link-text'}`,
                                                    `size-${'m'}`,
                                                    `colors-${'body-link'}`
                                                  )}
                                                >
                                                  <span
                                                    className={cn(
                                                      `button__label button-${'link-text'}__label`,
                                                      `size-${'m'}`
                                                    )}
                                                  >
                                                    {e.label || '-'}
                                                  </span>
                                                </a>
                                              </p>
                                            ))}
                                        </dd>
                                      </Fragment>
                                    )}
                                  </dl>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <ul className="aside-monitoring__buttons">
                            <li>
                              <Button
                                label={'클립북에 추가'}
                                cate={'check-number'}
                                size={'m'}
                                color={'primary'}
                                isCountAnimation={true}
                                countIdKey={
                                  (newsIdParams?.title || '').toString() + (newsIdParams?.newsid || '').toString()
                                }
                                countIsShow={
                                  newsIdParams !== null &&
                                  // @ts-ignore
                                  newsIdParams.clipbookData &&
                                  // @ts-ignore
                                  newsIdParams.clipbookData.length > 0
                                }
                                count={
                                  newsIdParams &&
                                  // @ts-ignore
                                  newsIdParams.clipbookData &&
                                  // @ts-ignore
                                  newsIdParams.clipbookData.length > 0
                                    ? // @ts-ignore
                                      newsIdParams.clipbookData.length
                                    : 0
                                }
                                icoLeft={false}
                                icoLeftData={icoSvgData.checkThick}
                                onClick={() =>
                                  newsIdParams &&
                                  checkAutoRegisterClipbook(true, newsIdParams, userClipbookListAutoSaveData)
                                }
                              />
                            </li>
                            <li>
                              {/* <Button
                                label={'뉴스 보기'}
                                cate={'default'}
                                size={'m'}
                                color={'tertiary'}
                                disabled={newsIdParams?.link ? newsIdParams?.link === '' : true}
                                onClick={() => newsIdParams?.link && window.open(newsIdParams.link)}
                              /> */}
                              <Button
                                label={'뉴스 보기'}
                                cate={'default-ico-text'}
                                size={'m'}
                                color={'tertiary'}
                                icoRight={true}
                                icoRightData={icoSvgData.externalLink}
                                disabled={newsIdParams?.link ? newsIdParams?.link === '' : true}
                                onClick={() => newsIdParams?.link && window.open(newsIdParams.link)}
                              />
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="table-type2__section">
                        <table>
                          <caption>caption</caption>
                          <thead>
                            <tr>
                              <th scope="col">
                                매체 지수{' '}
                                <span>
                                  <Tooltips
                                    className={'adjust-y'}
                                    tooltipId={'tt10-2'}
                                    tooltipPlace={'right'}
                                    tooltipHtml={`매체 지수는 미디어의 발행 부수, 시청<br />률, 사이트 방문자 등 데이터를 종합해<br/>수치화한 지표로, 사용자가 효과적으로<br/>미디어를 선별할 수 있도록 돕습니다.`}
                                    tooltipComponent={<IcoTooltip />}
                                  />
                                </span>
                              </th>
                              <th scope="col">논조</th>
                              <th scope="col">글자수</th>
                              <th scope="col">사진</th>
                              <th scope="col">영상</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{getCurrencyFormat(newsIdParams?.mediaValueNew)}</td>
                              <td>
                                <div className="editor__group">{newsIdParams?.toneValue}</div>
                              </td>
                              <td>{newsIdParams?.char_len ? getCurrencyFormat(newsIdParams?.char_len) : '-'}</td>
                              {/* <td>
                                {newsIdParams?.photo_urls && newsIdParams?.photo_urls.length > 0 ? (
                                  <IcoSvg data={icoSvgData.image} />
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td>{newsIdParams?.video_exist ? <IcoSvg data={icoSvgData.videoPlay} /> : '-'}</td> */}
                              <td>{newsIdParams?.photo_urls && newsIdParams?.photo_urls.length > 0 ? '있음' : '-'}</td>
                              <td>{newsIdParams?.video_exist ? '있음' : '-'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </li>
                    <li>
                      <div className="title-select__section">
                        <div className="title-select__header">
                          <p className="aside-monitoring-table__title">태그</p>
                          <TagLayerSearch
                            isOpen={!newsEditPopup.isOpen}
                            placeholder={'검색 또는 새 태그 만들기'}
                            category={'NEWS'}
                            tagValueList={newsIdParams?.tagList || []}
                            onChangeTagList={e => newsIdParams && tagStatusOnChange(e, newsIdParams, newsApiParams)}
                          />
                        </div>
                        <div className="title-select__tags">
                          {newsIdParams?.tagList &&
                            newsIdParams?.tagList.length > 0 &&
                            newsIdParams?.tagList.map((e, index) => (
                              <a
                                key={e.id + e.label + 'title-select__tags'}
                                className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                              >
                                <span
                                  className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}
                                  onClick={() => moveToSearch(e)}
                                >
                                  {e.label}
                                </span>
                                {handleNonBreakSpace(2)}
                              </a>
                            ))}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {newsLoading && <LoadingPage />}
        </div>
      </div>
      <ClipbookListPopup onChangeInitAction={() => newsIdParams && afterClipbookAction(newsApiParams, newsIdParams)} />
      <NewsDeletePopup />
      <NewsErrReportPopup />
      <NewsEditPopup />
      <UserProfilePopup />
    </>
  )
}

export default News
