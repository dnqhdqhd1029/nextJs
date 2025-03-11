import { Fragment, useEffect, useState } from 'react'
import cn from 'classnames'

import FormInputToggle from '~/components/common/ui/FormInputToggle'
import Select from '~/components/common/ui/Select'
import {
  newsAutoGroupingOptionList,
  newsSortOptionList,
} from '~/components/contents/monitoring/MonitoringList/defaultData'
import MonitoringReportGrouping from '~/components/contents/monitoring/MonitoringList/Popup/MonitoringReportGrouping'
import MonitoringReportNewsItem from '~/components/contents/monitoring/MonitoringList/Popup/MonitoringReportNewsItem'
import type { SelectListOptionItem } from '~/types/common'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const MonitoringReportNews = () => {
  const {
    toneList,
    mediaSubTotalTypeList,
    mediaValuePointList,
    reportPopup,
    setMonitoringReportPopupNewsGroupType,
    setMonitoringReportPopupNewsGrouping,
    setMonitoringReportPopupNewsArrayList,
  } = useMonitoringSearch()
  const [isLoading, setIsLoading] = useState(false)
  const actionButton = async () => {
    setIsLoading(() => true)
    setIsLoading(() => false)
  }

  return (
    <div className="popup-contents__section">
      <ul className="interval-mt28">
        <li>
          <ul className="grid-col2">
            <li>
              <div className="template-news__section">
                <ul className="interval-mt8">
                  <li>
                    <div className="template-news__header">
                      <p className="template-news__title">뉴스 정렬</p>
                    </div>
                  </li>
                  <li>
                    <p className="font-body__regular">
                      보고서의 뉴스 순서 정렬. 뉴스가 정렬된 후 언제든지 다시 뉴스 정렬 순서를 변경할 수 있습니다.
                    </p>
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <Select
                        options={newsSortOptionList}
                        value={reportPopup.newsStep.newsArrayList}
                        onChange={(e: SelectListOptionItem) => setMonitoringReportPopupNewsArrayList(e, reportPopup)}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="template-news__section">
                <ul className="interval-mt8">
                  <li>
                    <div className="template-news__header">
                      <p
                        className="template-news__title"
                        style={{ paddingRight: 10 }}
                      >
                        뉴스 자동 그룹핑
                      </p>
                      <FormInputToggle
                        name="newsAutomaticGrouping"
                        id="newsAutomaticGrouping"
                        checked={reportPopup.newsStep.isNewsGrouping}
                        reverse={true}
                        onChange={e =>
                          setMonitoringReportPopupNewsGrouping(e.target.checked, reportPopup, mediaSubTotalTypeList)
                        }
                      />
                    </div>
                  </li>
                  <li>
                    <p className="font-body__regular">
                      매체 유형, 매체 지수, 논조, 태그에 따라 뉴스를 자동으로
                      <br />
                      그룹화합니다.
                    </p>
                  </li>
                  <li
                    className={cn({
                      'display-none': !reportPopup.newsStep.isNewsGrouping,
                    })}
                  >
                    <div className="select-form__section select-form-btn">
                      <Select
                        options={newsAutoGroupingOptionList}
                        value={reportPopup.newsStep.newsGroupType}
                        onChange={(e: SelectListOptionItem) =>
                          setMonitoringReportPopupNewsGroupType(
                            e,
                            reportPopup,
                            mediaValuePointList,
                            toneList,
                            mediaSubTotalTypeList
                          )
                        }
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        {!reportPopup.newsStep.isNewsGrouping ? (
          <MonitoringReportNewsItem />
        ) : (
          <Fragment>
            {reportPopup.newsStep.groupingNewsList &&
              reportPopup.newsStep.groupingNewsList.length > 0 &&
              reportPopup.newsStep.groupingNewsList.map((e, index) => (
                <MonitoringReportGrouping
                  key={`news-group-item-${e.id}`}
                  item={e}
                  index={index}
                />
              ))}
          </Fragment>
        )}
      </ul>
    </div>
  )
}

export default MonitoringReportNews
