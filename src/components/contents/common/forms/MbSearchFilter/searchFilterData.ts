import type { MbSearchFilterItem } from '~/types/contents/Common'

export const filterTreeData: MbSearchFilterItem[] = [
  {
    id: 'category',
    title: '분야',
    checkedItems: [],
    checked: false,
    subItems: [
      {
        id: 'category-all',
        title: '전분야',
        checkedCount: 0,
        checked: false,
        checkedItems: [],
        searchTerm: '',
        subItems: [
          {
            id: 'category-all-realtime',
            title: '실시간',
            count: 165,
            checked: false,
          },
          {
            id: 'category-all-issue',
            title: '이슈',
            count: 115,
            checked: false,
          },
        ],
      },
      {
        id: 'category-it_electronics',
        title: 'IT/전자',
        checkedCount: 0,
        checked: false,
        checkedItems: [],
        searchTerm: '',
        subItems: [
          {
            id: 'category-it_electronics-1',
            title: 'LG전자',
            count: 165,
            checked: false,
          },
          {
            id: 'category-it_electronics-2',
            title: '삼성전자',
            count: 115,
            checked: false,
          },
          {
            id: 'category-it_electronics-3',
            title: '삼성전자3',
            count: 115,
            checked: false,
          },
          {
            id: 'category-it_electronics-4',
            title: '삼성전자4',
            count: 115,
            checked: false,
          },
          {
            id: 'category-it_electronics-5',
            title: '삼성전자5',
            count: 115,
            checked: false,
          },
          {
            id: 'category-it_electronics-6',
            title: '삼성전자6',
            count: 115,
            checked: false,
          },
          {
            id: 'category-it_electronics-7',
            title: '삼성전자7',
            count: 115,
            checked: false,
          },
          {
            id: 'category-it_electronics-8',
            title: '삼성전자8',
            count: 115,
            checked: false,
          },
          {
            id: 'category-it_electronics-9',
            title: '삼성전자9',
            count: 115,
            checked: false,
          },
          {
            id: 'category-it_electronics-10',
            title: '삼성전자10',
            count: 115,
            checked: false,
          },
          {
            id: 'category-it_electronics-11',
            title: '삼성전자11',
            count: 115,
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 'media_value',
    title: '매체 지수',
    checked: false,
    radioType: true,
    selectedItem: null,
    subItems: [
      {
        id: 'media_value-10',
        title: '상위 10%',
        checked: false,
      },
      {
        id: 'media_value-20',
        title: '상위 20%',
        checked: false,
      },
      {
        id: 'media_value-30',
        title: '상위 30%',
        checked: false,
      },
      {
        id: 'media_value-40',
        title: '상위 40%',
        checked: false,
        isRestricted: true,
      },
      {
        id: 'media_value-50',
        title: '상위 50%',
        checked: false,
        isRestricted: true,
      },
    ],
  },
  {
    id: 'social_media',
    title: '소셜미디어',
    checked: false,
    searchTerm: '',
    checkedItems: [],
    subItems: [
      {
        id: 'social_media-1',
        title: '페이스북',
        checked: false,
      },
      {
        id: 'social_media-2',
        title: '홈페이지',
        checked: false,
      },
      {
        id: 'social_media-3',
        title: '인스타그램',
        checked: false,
      },
      {
        id: 'social_media-4',
        title: '페이스북2',
        checked: false,
      },
      {
        id: 'social_media-5',
        title: '홈페이지2',
        checked: false,
      },
      {
        id: 'social_media-6',
        title: '인스타그램2',
        checked: false,
      },
      {
        id: 'social_media-7',
        title: '페이스북3',
        checked: false,
      },
      {
        id: 'social_media-8',
        title: '홈페이지3',
        checked: false,
      },
      {
        id: 'social_media-9',
        title: '인스타그램3',
        checked: false,
      },
      {
        id: 'social_media-10',
        title: '페이스북4',
        checked: false,
      },
      {
        id: 'social_media-11',
        title: '홈페이지4',
        checked: false,
      },
      {
        id: 'social_media-12',
        title: '인스타그램4',
        checked: false,
      },
    ],
  },
  {
    id: 'period',
    title: '기간',
    checked: false,
    dateType: true,
    dateRange: {
      startDate: null,
      endDate: null,
    },
    selectedDateValue: '',
    subItems: [
      {
        id: 'period-1',
        title: '오늘',
        dateValue: 'today',
        checked: false,
      },
      {
        id: 'period-2',
        title: '지난 3일',
        dateValue: 'last3days',
        checked: false,
      },
      {
        id: 'period-3',
        title: '지난 일주일',
        dateValue: 'last7days',
        checked: false,
      },
      {
        id: 'period-4',
        title: '지난 한달',
        dateValue: 'last1month',
        checked: false,
        disabled: true,
      },
      {
        id: 'period-5',
        title: '직접 입력',
        checked: false,
        directDate: true,
      },
    ],
  },
  {
    id: 'period2',
    title: '기간2',
    checked: false,
    dateType: true,
    dateRange: {
      startDate: null,
      endDate: null,
    },
    selectedDateValue: '',
  },
]
