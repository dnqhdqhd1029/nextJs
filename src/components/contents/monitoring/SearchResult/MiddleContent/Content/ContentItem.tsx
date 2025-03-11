import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'
import { v4 as uuid } from 'uuid'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Tooltips from '~/components/common/ui/Tooltips'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import type { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { getDateFormat } from '~/utils/common/date'
import { getCurrencyFormat } from '~/utils/common/number'
import { handleNonBreakSpace } from '~/utils/common/number'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const checkClasses = [
  'ico',
  'list-type8-item-header__title',
  'button__label button-link-text__label size-m',
  'ipt-checkbox__group',
]

const ContentItem = (props: MonitoringSearchNewsDocumentDto) => {
  const {
    timeZone,
    newsIdKey,
    monitoringParams,
    monitoringListParams,
    toneList,
    pageCount,
    setNewsIdParamsAction,
    searchContentKeyList,
    setSearchContentKeyList,
  } = useMonitoringSearchResult()
  const [toneValue, setToneValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const find = searchContentKeyList.find(e => e?.newsid === props?.newsid)
    setIsChecked(() => !!find)
  }, [searchContentKeyList])

  useEffect(() => {
    const find = toneList.find(e => e.id === props.tone)
    setToneValue(() => (find ? find.name : ''))
  }, [])

  return (
    <li
      id={'newsList' + props.newsid + props?.title}
      onClick={e => {
        const aTarget = e.target as HTMLElement
        if (aTarget.className && typeof aTarget.className === 'string') {
          console.log('aTarget.className', aTarget.className)
          const isInList = checkClasses.some(className => aTarget.className.includes(className))
          if (!isInList) {
            setNewsIdParamsAction(props, monitoringParams, monitoringListParams)
            e.preventDefault()
          }
        } else {
          setNewsIdParamsAction(props, monitoringParams, monitoringListParams)
          e.preventDefault()
        }
      }}
    >
      <div className={cn('list-type8-item__section', { 'is-selected': props.newsid === newsIdKey })}>
        <ul className="list-type8-item__list">
          <li
            className="list-type8-item__check"
            onClick={e => {
              props.newsid && setSearchContentKeyList(!isChecked, props, searchContentKeyList)
              e.preventDefault()
            }}
          >
            <FormInputBtn
              type="checkbox"
              name={'search-result__header-sort newsList' + props.newsid?.toString() || ''}
              id={'search-result__header-sort newsList' + props.newsid?.toString() || ''}
              checked={isChecked}
              label=""
              //onChange={e => props.newsid && setSearchContentKeyList(e, props, searchContentKeyList)}
            />
          </li>
          <li className="list-type8-item__contents">
            {/* <ul className="interval-mt8"> */}
            <ul>
              <li>
                <div className="list-type8-item__header">
                  <div className="list-type8-item-header__ico">
                    {props.video_exist && <IcoSvg data={icoSvgData.videoPlay} />}
                    {props.photo_urls && props.photo_urls.length > 0 && <IcoSvg data={icoSvgData.image} />}
                    {!props.isSysInfo && (
                      <div style={{ marginLeft: '3.5px' }}>
                        <Tooltips
                          tooltipId={`personally-${uuid()}`}
                          tooltipPlace={'top'}
                          tooltipHtml={'개인 추가 뉴스'}
                          tooltipComponent={<IcoSvg data={icoSvgData.addNews} />}
                        />
                      </div>
                    )}
                  </div>
                  <p className="list-type8-item-header__title">
                    <a href={`/news/record/${Number(props.newsid) || 0}`}>
                      <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                        {props.title || ''}
                      </span>
                    </a>
                  </p>
                </div>
              </li>
              <li>
                <ul className="list-type8-item__info">
                  <li>
                    <p className="font-body__regular">
                      {getDateFormat(timeZone, moment(props.inserted).format('YYYY-MM-DD'))}
                    </p>
                    <ul className="list-type8-item__links">
                      {props?.mapped && props?.mapped.mid && props?.mapped.mname && (
                        <li>
                          <a
                            href={`/media/record/${Number(props?.mapped?.mid) || 0}`}
                            className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'link-dark'}`)}
                          >
                            <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                              {props?.mapped.mname || ''}
                            </span>
                          </a>
                          {handleNonBreakSpace(2)}
                        </li>
                      )}
                      {props?.reporterList && props?.reporterList.length > 0 && (
                        <li>
                          {/* <span className="list-type8-item__text">저자</span> */}
                          {props?.reporterList[0]?.flagLink ? (
                            <a
                              href={`/contacts/record/${Number(props?.reporterList[0]?.pid) || 0}`}
                              className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'link-dark'}`)}
                            >
                              <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                                {props?.reporterList.map(e => e.name).join(',') || ''}
                              </span>
                            </a>
                          ) : (
                            <Fragment>
                              <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
                                {props?.reporterList.map(e => e.name).join(',') || ''}
                              </span>
                            </Fragment>
                          )}
                        </li>
                      )}
                    </ul>
                  </li>
                  {props.isSysInfo && (
                    <li>
                      <p className="list-type8-item-header__text">
                        <span className="media-index">
                          <IcoSvg data={icoSvgData.barChart} />
                        </span>{' '}
                        {getCurrencyFormat(props?.mediaValueNew)}
                      </p>
                      <p className="list-type8-item__text-group">
                        <span className="list-type8-item__text">{toneValue !== '' ? toneValue : '알수없음'}</span>
                      </p>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default ContentItem
