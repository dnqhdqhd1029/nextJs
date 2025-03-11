import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'
import { v4 as uuid } from 'uuid'

import Button from '~/components/common/ui/Button'
import { IcoTooltip } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tag from '~/components/common/ui/Tag'
import Tooltips from '~/components/common/ui/Tooltips'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { ReporterDto } from '~/types/api/service'
import { getNewsDateFormat } from '~/utils/common/date'
import { getCurrencyFormat, handleNonBreakSpace } from '~/utils/common/number'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

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
  const {
    timeZone,
    newsIdKey,
    newsLoading,
    newsIdParams,
    newsList,
    toneList,
    userClipbookListAutoSaveData,
    mediaSubTypeList,

    checkAutoRegisterClipbook,
    moveToSearch,
    ownerFunction,
  } = useMonitoringSearch()
  const [toneValue, setToneValue] = useState('')
  const [mediaSubType, setMediaSubType] = useState('')
  const { countLoading } = useAppSelector(state => state.monitoringSearchSlice)

  useEffect(() => {
    const find = toneList.find(e => e.id === newsIdParams?.tone)
    const findMediaSubtype = mediaSubTypeList.find(e => e.id === newsIdParams?.media_subtype)
    setMediaSubType(() => (findMediaSubtype ? findMediaSubtype.name : ''))
    setToneValue(() => (find ? find.name : ''))
  }, [newsIdParams])

  if (!newsIdKey) {
    return null
  }

  if (!newsIdParams) {
    return null
  }
  return (
    <div className="aside-monitoring__section">
      {!newsLoading && (
        <ul className="interval-mt28">
          <li>
            <ul className="interval-mt20">
              <li>
                <div className="aside-monitoring__header">
                  {newsIdKey ? (
                    <a
                      href={`/news/record/${Number(newsIdKey) || 0}`}
                      className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`, `colors-${'secondary'}`)}
                    >
                      <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                        자세히보기
                      </span>
                      <span
                        className={cn(`button__ico-right button-${'link-text-arrow'}__ico-right`, [`ico-size${'m'}`])}
                      >
                        <IcoSvg data={icoSvgData.chevronRight} />
                      </span>
                    </a>
                  ) : (
                    <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                      자세히보기
                    </span>
                  )}
                </div>
              </li>
              <li>
                <ul className="interval-mt16">
                  <li>
                    <ul className="interval-mt8">
                      <li>
                        <p className="font-body__regular">
                          {getNewsDateFormat(timeZone, moment(newsIdParams?.inserted).format('YYYY-MM-DD HH:mm'), true)}
                        </p>
                      </li>
                      <li>
                        <a
                          href={`/news/record/${Number(newsIdKey) || 0}`}
                          className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`)}
                        >
                          <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                            <h3 className="aside-monitoring__title">{newsIdParams?.title}</h3>
                          </span>
                        </a>
                      </li>
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
                                    className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                                  >
                                    <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                                      {newsIdParams?.mapped.mname || ''}
                                    </span>
                                  </a>
                                ) : (
                                  <span
                                    className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}
                                    style={{ marginRight: 8 }}
                                  >
                                    {newsIdParams?.mapped.mname || ''}
                                  </span>
                                )}
                                <span className="color-secondary">{mediaSubType}</span>
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
                                    className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                                    onClick={() => newsIdParams?.owner && ownerFunction(newsIdParams?.owner)}
                                  >
                                    <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
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
                          isLoading={countLoading}
                          disabled={countLoading}
                          isCountAnimation={false}
                          countIdKey={(newsIdParams?.title || '').toString() + (newsIdParams?.newsid || '').toString()}
                          countIsShow={
                            newsIdParams &&
                            // @ts-ignore
                            newsIdParams.clipBookIdTitleList &&
                            // @ts-ignore
                            newsIdParams.clipBookIdTitleList.length > 0
                          }
                          count={
                            newsIdParams &&
                            // @ts-ignore
                            newsIdParams.clipBookIdTitleList &&
                            // @ts-ignore
                            newsIdParams.clipBookIdTitleList.length > 0
                              ? // @ts-ignore
                                newsIdParams.clipBookIdTitleList.length
                              : 0
                          }
                          icoLeft={false}
                          icoLeftData={icoSvgData.checkThick}
                          onClick={() =>
                            newsIdParams &&
                            checkAutoRegisterClipbook(true, newsIdParams, userClipbookListAutoSaveData, newsList)
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
            </ul>
          </li>
          <li>
            <p className="aside-monitoring-table__title">분석</p>
            <dl className="dl-table-type1__section">
              {newsIdParams.isSysInfo && (
                <Fragment>
                  <dt>
                    <p className="dl-table-type1__text overflow-visible">
                      매체 지수{' '}
                      <Tooltips
                        tooltipId={uuid()}
                        tooltipPlace={'right'}
                        tooltipHtml={`매체 지수는 미디어의 발행 부수, 시청<br />률, 사이트 방문자 등 데이터를 종합해<br/>수치화한 지표로, 사용자가 효과적으로<br/>미디어를 선별할 수 있도록 돕습니다.`}
                        tooltipComponent={<IcoTooltip />}
                      />
                    </p>
                  </dt>
                  <dd>
                    <p className="dl-table-type1__text type-link">{getCurrencyFormat(newsIdParams?.mediaValueNew)}</p>
                  </dd>
                  <dt>
                    <p className="dl-table-type1__text">논조</p>
                  </dt>
                  <dd>
                    <p className="dl-table-type1__text type-link">{toneValue}</p>
                  </dd>
                </Fragment>
              )}
              {/*<dt>*/}
              {/*  <div className="dl-table-type1__tooltip">*/}
              {/*    <FormTitle*/}
              {/*      title={'연관도'}*/}
              {/*      tooltip={true}*/}
              {/*    >*/}
              {/*      <Tooltips*/}
              {/*        tooltipId={'tt10-4'}*/}
              {/*        tooltipPlace={'top'}*/}
              {/*        tooltipHtml={*/}
              {/*          '정의한 키워드가 뉴스에서 언급된 <br />횟수를 기준으로 뉴스를 분류하는 <br />방법입니다. <br />키워드 검색 조건을 입력했을때만 <br />분석할 수 있습니다.'*/}
              {/*        }*/}
              {/*        tooltipComponent={<IcoTooltip />}*/}
              {/*      />*/}
              {/*    </FormTitle>*/}
              {/*    /!*<p className="dl-table-type1__text">연관도</p>*!/*/}
              {/*  </div>*/}
              {/*</dt>*/}
              {/*<dd>*/}
              {/*  <p className="dl-table-type1__text type-link">높음</p>*/}
              {/*</dd>*/}
              <dt>
                <p className="dl-table-type1__text">글자수</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text type-link">
                  {newsIdParams?.char_len ? getCurrencyFormat(newsIdParams?.char_len) : '-'}
                </p>
              </dd>
              <dt>
                <p className="dl-table-type1__text">사진</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text type-link">
                  {newsIdParams?.photo_urls && newsIdParams?.photo_urls.length > 0 ? '있음' : '-'}
                </p>
              </dd>
              <dt>
                <p className="dl-table-type1__text">영상</p>
              </dt>
              <dd>
                <p className="dl-table-type1__text type-link">{newsIdParams?.video_exist ? '있음' : '-'}</p>
              </dd>
            </dl>
          </li>
          {newsIdParams && newsIdParams.taggingList && newsIdParams.taggingList.length > 0 && (
            <li>
              <p className="aside-monitoring-table__title">태그</p>
              {newsIdParams?.taggingList &&
                newsIdParams?.taggingList.length > 0 &&
                newsIdParams?.taggingList.map((e, index) => (
                  <a
                    key={'newsIdParams.taggingList' + e.taggingId + e.tagId}
                    className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
                  >
                    <span
                      className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}
                      onClick={() => moveToSearch(e)}
                    >
                      {e.tagName}
                    </span>
                    {handleNonBreakSpace(2)}
                  </a>
                ))}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default News
