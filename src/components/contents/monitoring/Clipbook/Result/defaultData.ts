import moment from 'moment/moment'

import type { TabItem } from '~/components/common/ui/Tabs'
import { USER_PREVILLEGE_CODE } from '~/constants/common/user'
import { clipbookNewsListDto } from '~/stores/modules/contents/monitoring/clipbookDetail'
import { filterSubParamActionsProps } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { NavigationLinkItem, SelectListOptionItem } from '~/types/common'

export const DefaultChartData = {
  labels: [],
  series: [],
}

export const DefaultLineChartData = {
  max: 0,
  categories: [],
  data: [],
}

export const defaultReportStringFirstLine: string = `
      <tr>
        <td>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; color: #202121; font-family: 'Malgun Gothic', '맑은 고딕', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.7; letter-spacing: -0.03em;">
            <tr>
              <td style="margin: 0; padding: 20px 0 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; border: 1px solid #e1e3e3; color: #202121; font-family: 'Malgun Gothic', '맑은 고딕', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.7; letter-spacing: -0.03em;">
                   <tr><td style="height: 16px;"></td></tr>
                  <tr>
                    <td style="margin: 0; padding: 0 24px;">보고서</td>
                  </tr>
`

export const defaultReportStringSecondLine: string = `
<tr><td style="margin: 0; padding: 0; height: 20px;"></td></tr>
                  <tr>
                    <td style="margin: 0; padding: 0 24px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; color: #202121; font-family: 'Malgun Gothic', '맑은 고딕', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.7; letter-spacing: -0.03em;">
                        <tr>
                          <td style="margin: 0; padding: 0; height: 1px; background: #e1e3e3;"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="margin: 0; padding: 0 24px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; color: #202121; font-family: 'Malgun Gothic', '맑은 고딕', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.7; letter-spacing: -0.03em;">
`
export const defaultReportStringThirdLine: string = `
</table>
                    </td>
                  </tr>
                  <tr><td style="height: 16px;"></td></tr>
                </table>
              </td>
            </tr>
            <tr><td style="margin: 0; padding: 0; height: 40px;"></td></tr>
          </table>
        </td>
      </tr>
`

export const defaultReportGroupingStringThirdLine: string = `
</table>
                    </td>
                  </tr>
`

export const defaultReportGroupingStringLastLine: string = `
<tr><td style="height: 16px;"></td></tr>
                </table>
              </td>
            </tr>
            <tr><td style="margin: 0; padding: 0; height: 40px;"></td></tr>
          </table>
        </td>
      </tr>
`

export const defaultEditOptionsByData: SelectListOptionItem[] = [
  {
    id: 'tag',
    name: '태그 수정',
  },
  {
    id: 'tone',
    name: '논조 수정',
  },
]

export const defaultClipbookParamList = [
  {
    id: 'NORMAL',
    categoryNm: '클립북',
    content: [],
  },
  {
    id: 'COVERAGE',
    categoryNm: '커버리지 클립북',
    content: [],
  },
]

export const defaultMonitoringListParams = {
  timezone: '',
  periodStartYear: moment().subtract({ years: 100 }).format('YYYY'),
  periodStartMonth: moment().subtract({ years: 100 }).format('MM'),
  periodStartDay: moment().subtract({ years: 100 }).format('DD'),
  periodEndYear: moment().format('YYYY'),
  periodEndMonth: moment().format('MM'),
  periodEndDay: moment().format('DD'),
  page: 1,
  size: 20,
  sort: [`inserted!desc`, `_score!desc`, `char_len!desc`, `newsid!desc`],
  groupId: 0,
}
export const defaultFilterOptionsByData: SelectListOptionItem[] = [
  {
    id: 'inserted',
    name: '날짜',
  },
  {
    id: '_score',
    name: '관련성',
  },
  {
    id: 'char_len',
    name: '글자수',
  },
]

export const newsAutoGroupingOptionList: SelectListOptionItem[] = [
  {
    id: 'mediaType',
    name: '매체 유형',
  },
  {
    id: 'mediaValue',
    name: '매체 지수',
  },
  {
    id: 'tone',
    name: '논조',
  },
  // {
  //   id: 'tag',
  //   name: '태그',
  // },
]

export const newsSortOptionList: SelectListOptionItem[] = [
  {
    id: 'latest',
    name: '최신순',
  },
  {
    id: 'oldest',
    name: '과거순',
  },
  {
    id: 'mediaValue',
    name: '매체 지수',
  },
  {
    id: 'mediaName',
    name: '매체명',
  },
  {
    id: 'manualSort',
    name: '수동 정렬',
  },
]

export const extendedShareScopeTargetList: SelectListOptionItem[] = [
  {
    id: 'GROUP',
    name: '이 그룹',
  },
  {
    id: 'COMPANY',
    name: '전체 그룹',
  },
]

export const defaultBasicMonitoringSetting: SelectListOptionItem[] = [
  {
    id: 'SHARE',
    name: '공유하기',
  },
]

export const tagPopupNaviLinks: TabItem[] = [
  {
    id: 'add',
    title: '추가',
  },
  {
    id: 'delete',
    title: '제외',
  },
  {
    id: 'replace',
    title: '대체(모두 제외 후 추가)',
  },
]

export const disclosureScopeFilterOptionList: SelectListOptionItem[] = [
  {
    id: '',
    name: '전체',
  },
  {
    id: USER_PREVILLEGE_CODE.WRITABLE.id,
    name: USER_PREVILLEGE_CODE.WRITABLE.shortName,
  },
  {
    id: USER_PREVILLEGE_CODE.READABLE.id,
    name: USER_PREVILLEGE_CODE.READABLE.shortName,
  },
  {
    id: USER_PREVILLEGE_CODE.PRIVATE.id,
    name: USER_PREVILLEGE_CODE.PRIVATE.shortName,
  },
]
export const extendedShareScopeList: SelectListOptionItem[] = [
  {
    id: USER_PREVILLEGE_CODE.WRITABLE.id,
    name: USER_PREVILLEGE_CODE.WRITABLE.name,
  },
  {
    id: USER_PREVILLEGE_CODE.READABLE.id,
    name: USER_PREVILLEGE_CODE.READABLE.name,
  },
  {
    id: USER_PREVILLEGE_CODE.PRIVATE.id,
    name: USER_PREVILLEGE_CODE.PRIVATE.name,
  },
]

export const subNewsFilterListList: NavigationLinkItem[] = [
  {
    id: 'filterPeriod',
    title: '기간',
    subMenus: [],
  },
  {
    id: 'filterCategoryList',
    title: '미디어유형',
    subMenus: [],
  },
  {
    id: 'filterInformation',
    title: '매체 지수',
    subMenus: [],
  },
  {
    id: 'filterMediaNameList',
    title: '매체명',
    subMenus: [],
  },
  {
    id: 'filterTone',
    title: '논조',
    subMenus: [],
  },
  {
    id: 'filterMultimedia',
    title: '멀티미디어',
    subMenus: [],
  },
  {
    id: 'filterSourceType',
    title: '정보 유형',
    subMenus: [],
  },
]

export const defaultReportFormOptionList: SelectListOptionItem[] = [
  {
    id: 'isEmail',
    name: '이메일 본문',
  },
  {
    id: 'isWord',
    name: '워드 첨부',
  },
  {
    id: 'isPdf',
    name: 'PDF 첨부',
  },
  // {
  //   id: 'tag',
  //   name: '태그',
  // },
]

export const subNewsFilterOptionsList: filterSubParamActionsProps[] = [
  {
    id: 'filterPeriod',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterCategoryList',
    isOpen: false,
    subMenu: [],
    values: [],
  },
  {
    id: 'filterInformation',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterMediaNameList',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterTone',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterMultimedia',
    isOpen: false,
    values: [],
  },
  {
    id: 'filterSourceType',
    isOpen: false,
    values: [],
  },
]

export const extendedCommonCodeTargetList: SelectListOptionItem[] = [
  {
    id: 'NEWS_MONITORING_PERIOD',
    name: 'NEWS_MONITORING_PERIOD',
  },
  {
    id: 'TONE',
    name: 'TONE',
  },
  {
    id: 'NEWS_INFO_TYPE',
    name: 'NEWS_INFO_TYPE',
  },
  {
    id: 'PUB_CYCLE',
    name: 'PUB_CYCLE',
  },
  {
    id: 'MEDIA_VALUE',
    name: 'MEDIA_VALUE',
  },
  {
    id: 'NEWS_PERIOD',
    name: 'NEWS_PERIOD',
  },
  {
    id: 'COVERAGE_NEWS_YN',
    name: 'COVERAGE_NEWS_YN',
  },
  {
    id: 'MEDIA_TYPE',
    name: 'MEDIA_TYPE',
  },
  {
    id: 'CLIPBOOK_NEWS_YN',
    name: 'CLIPBOOK_NEWS_YN',
  },
  {
    id: 'MEDIA_SUB_TYPE',
    name: 'MEDIA_SUB_TYPE',
  },
  {
    id: 'NEWS_SEARCH_MULTIMEDIA',
    name: 'NEWS_SEARCH_MULTIMEDIA',
  },
]
