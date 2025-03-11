/**
 * @file constants.ts
 * @description 공통 상수 정의
 */

import { PostPositionPattern } from '~/types/common'
import { base64Code } from '~/utils/common/string'

// Default Layout Setting
export const DEFAULT_LAYOUT = 'LAYOUT1'

// Default API Base Url
// export const API_BASE_URL: string = 'http://seo.beedocs.mediapass.kr:8089'
export const API_BASE_URL =
  process.env.MY_ENV_VAR === 'production' ? 'https://wwwapi.mediabee.com' : 'https://wwwapi.d.mediabee.kr'
export const API_DEMO_BASE_URL =
  process.env.MY_ENV_VAR === 'production' ? 'https://demoapi.mediabee.com' : 'https://demoapi.d.mediabee.kr'
export const API_AI_BASE_URL =
  process.env.MY_ENV_VAR === 'production' ? 'https://aiapi.mediabee.com' : 'https://aiapi.d.mediabee.kr'
// export const API_BASE_URL = 'http://beedocs.mediapass.kr:8089'
// export const API_BASE_URL: string = '/service-api'
// export const API_BASE_URL = 'http://localhost:8089'

export const SVC_DOMAIN_URL = {
  LOCAL: 'https://local.svc.d.mediabee.kr:4189',
  DEV: 'https://svc.d.mediabee.kr',
  PROD: 'https://app.mediabee.com',
}

export const API_TEMP_URL = 'http://121.254.217.101:3301/json'

export const COMMON_PRELOAD_DATA = [
  'COM_COUNTRY',
  'NEWSWIRE_STATE',
  'USER_LANDING_PAGE',
  'PUB_CYCLE',
  'MEDIA_VALUE',
  'JOURNALIST_OCCUPATION',
  'MEDIA_TYPE',
  'MEDIA_SUB_TYPE',
  'JOURNALIST_INFO_TYPE',
  'LANGUAGE',
  'MEDIA_COUNT',
  'JOURNALIST_BLOCK_YN',
  'JRNLST_SOCIAL_FILTER_ID',
  'MEDIA_JRNLIST_NAME_REVEALED_YN',
  'MEDIA_BLOCK_YN',
  'MEDIA_INFO_TYPE',
  'PORTAL_CODE',
  'ACTION_STATE',
  'ACTION_CATEGORY_ALL',
  'ACTION_STATE_FILTER',
  'NEWS_PERIOD',
  'COVERAGE_NEWS_YN',
  'CLIPBOOK_NEWS_YN',
  'TONE',
  'NEWS_MONITORING_PERIOD',
  'PUBLISHER_TYPE',
  'ACTION_LOG_WORKTYPE',
  'UPDATE_FIELD_NAME',
  'NEWS_SEARCH_MULTIMEDIA',
]

export const ALLOWED_ORIGINS = [
  'https://local.svc.d.mediabee.kr:4189',
  'https://local.demo.d.mediabee.kr:4189',
  'https://demo.d.mediabee.kr',
  'https://svc.d.mediabee.kr',
  'https://www.d.mediabee.kr',
  'https://demo.mediabee.com',
  'https://app.mediabee.com',
  'https://www.mediabee.com',
]

export const NON_BREAKING_SPACE = '\u00A0'.repeat(2)

export const DEMO_DOMAINS = ['local.demo.d.mediabee.kr', 'demo.d.mediabee.kr', 'demo.mediabee.com']

export const API_VERSION: string = 'v1'
export const DEMO_LICENSE = base64Code.encode('demo_license')

export const SHARED_LINK_URL = base64Code.encode('sharedLinkUrl')

export const IS_STAY_LOGGIN = base64Code.encode('is_stay_login')

export const ACCESS_TOKEN_NAME = base64Code.encode('X-accessToken-Svc')

export const ACCESS_TOKEN_EXPIRED_DAYS = 90

export const SITE_INNER_VERSION = btoa('SITE_INNER_VERSION')

export const USER_COOKIE_LIST = [ACCESS_TOKEN_NAME, 'groupId']

export const API_LOADING_DELAY_TIME = 350

export const USESTATE_DELAY_TIME = 120

export const RECAPTCHA_MIN_SCORE = 0.3

export const SQL_PATTERN = /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi
export const TAG_PATTERN = /(<([^>]+)>)/gi
export const KOREAN_ENGLISH_NUMBER_PATTERN = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]+$/gi

export const DEFAULT_MEDIA_VALUE = 500

export const MEDIA_VALUE_MAX_POINT = 999999999

// 사용자 회사의 모든 그룹 불러오는 갯수
export const API_LIST_TYPE_MAX_COUNT = 9999

export const SIZE_OPTIONS = [10, 20, 30, 40, 50]

// 영문 대소문자, 숫자, 특수문자 포함 12~18자리
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,18}$/

export const PASSWORD_PATTERN_FOR_JMEMBER = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/

// 영문 대소문자, 숫자, 특수문자만 포함 가능
export const ENGLISH_NUMBER_SPECIAL_CHARACTERS_PATTERN =
  /^[a-zA-Z0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]+$/

// 비밀번호 설명 텍스트
export const PASSWORD_PATTER_DESCRIPTION = '* 8~18자이고 영문 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.'

export const EMAIL_PATTERN_DESCRIPTION = '올바른 이메일 형식이 아닙니다.'

export const NUMBER_PATTERN = /[^0-9]/g

export const ONLY_NUMBER_PATTERN = /^\d+$/

// 이메일 패턴
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 특수문자, 괄호, 점 제거 패턴
export const SPECIAL_CHARACTERS_PATTERN = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/gi

// 특수문자, 괄호, 점 제거 패턴
export const SPECIAL_CHARACTERS_PATTERN_EXIST_EMAIL = /[\!\#\$\%\^\&\*\)\(\+\=\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/gi

// 웹사이트 패턴
export const WEBSITE_PATTERN =
  /^(https?:\/\/|http:\/\/)([\da-z.-]+\.[a-z.]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/[^\s]*)?$/i

// 유튜브 주소 패턴
export const YOUTUBE_PATTERN =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\/)?([a-zA-Z0-9_-]{11})([&?].*)?$/

// 한국 휴대전화 번호 형식 정규식 패턴
export const TELEPHONE_NUMBER_PATTERN = /^010-?\d{3,4}-?\d{4}$/

// 한국 휴대전화, 유선전화 번호 정규식 패턴
export const PHONE_NUMBER_PATTERN = /^(01[0-9]|0\d{1,2})-?\d{3,4}-?\d{4}$/

// 사업자등록번호 패턴
export const BUSINESS_NUMBER_PATTERN = /^\d{3}-\d{2}-\d{5}$/

export const NOT_PAGES_LIST = ['/static/', '/favicon.ico', '/images/', '/fonts/', '/_next/', '/api/', '/assets/']

export const ACCEPT_IMAGE_EXT =
  'image/jpg, image/jpeg, image/png, image/gif, image/GIF, image/JPG, image/JPEG, image/PNG'

export const FILE_EXTENSIONS = {
  excel: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv',
}

export const MIME_TYPE = {
  excel: 'application/vnd.ms-excel',
  excelX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export const POST_POSITION_PATTERNS: PostPositionPattern[] = [
  { pattern: '((은|는))', replaces: ['은', '는'] },
  { pattern: '((이|가))', replaces: ['이', '가'] },
  { pattern: '((을|를))', replaces: ['을', '를'] },
  { pattern: '((과|와))', replaces: ['과', '와'] },
  { pattern: '((아|야))', replaces: ['아', '야'] },
  { pattern: '((이|여))', replaces: ['이', '여'] },
  { pattern: '((으)로)', replaces: ['으로', '로'] },
  { pattern: '((이)라)', replaces: ['이라', '라'] },
  { pattern: '((이)야)', replaces: ['이야', '야'] },
]

export const PRESS_SEARCH_STORE = '#press-search-store'
export const MEDIA_SEARCH_STORE = '#media-search-store'

export const SEE_MORE_COUNT = 10
export const AUTO_COMPLETE_COUNT = 15

export const DEBOUNCE_DELAY_TIME = 250
export const DEBOUNCE_RESULT_LIST_DELAY_TIME = 200
export const DEBOUNCE_SIDE_LIST_DELAY_TIME = 750

export const SETTING_OPTION_FUNCTION = {
  DETAIL: 'DETAIL',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  COPY: 'COPY',
  SHARE: 'SHARE',
}

export const EMPTY_FILE_STRING = '__EMPTY#@!__@#FILE__'

// 언론인/미디어
export const PRESS_PROFILE_SAME_DATA_EXIST_CHECK_FLAG = btoa('pressMediaProfileSameDataExist')
export const MEDIA_PROFILE_SAME_DATA_EXIST_CHECK_FLAG = btoa('pressMediaProfileSameDataExistCheck')

// 모니터링
export const MONITORING_NEWS_SAME_DATA_EXIST_CHECK_FLAG = btoa('monitoringNewsSameDataExistCheck')

// 사이드 필터 체크 아이템 리미트
export const FILTER_CHECK_ITEM_LIMIT = 30

// 이메일 발송 대기 시간(초 단위)
export const EMAIL_SEND_WAITING_TIME = 60 * 60 * 24 // 1일(임시 설정값). TODO: 30초로 해야 함.

export const SPECIAL_KEYS = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'Insert',
  'Delete',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'Escape',
  'CapsLock',
  'Control',
  'Alt',
  'ContextMenu',
  'Enter',
  'Space',
]

export const URL_REGEXP = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
export const URL_REGEXP_DESCRIPTION = '올바른 웹사이트 URL 형식이 아닙니다.'
