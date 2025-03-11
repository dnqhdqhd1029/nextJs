import { POST_POSITION_PATTERNS } from '~/constants/common'

/**
 * 문자열의 첫 글자를 대문자로 변환
 * @param {string} str 문자열
 * @returns {string} 첫 글자가 대문자로 변환된 문자열
 */
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 문자열의 첫 글자를 소문자로 변환
 * @param {string} str 문자열
 * @returns {string} 첫 글자가 소문자로 변환된 문자열
 */
export const unCapitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * 문자열이 존재하는지 판단
 * @param {string} str
 */
export const isExistString = (str: string | number | null | undefined): boolean => {
  return str !== 0 && str !== '' && str !== undefined && str !== 'undefined' && str !== null && str !== 'null'
}

/**
 * 한글 문자의 종성 유무을 판단하여 true, false를 반환한다.
 * @param {string} char
 * @returns {boolean}
 */
export const haveFinalConsonant = (char: string): boolean => {
  const lastChar = char.charCodeAt(char.length - 1)
  const isThereLastChar = (lastChar - 0xac00) % 28
  if (isThereLastChar) {
    return true
  }
  return false
}

interface ReplacedStringByPatterns {
  /** 전체 문장 */
  sentence: string

  /** 바꿀 단어 */
  replaceString: string

  /** 단어 앞에 넣을 패턴(html 태그 등) */
  replacePatternFront: string

  /** 단어 뒤에 넣을 패턴(html 태그 등)  */
  replacePatternBack: string
}

/**
 * 문자열을 받아 특정 단어를 패턴을 붙여서 바꿔준다.
 * @param {getReplacedStringByPatterns} object - 전체 문장, 바꿀 단어, 단어 앞에 넣을 패턴, 단어 뒤에 넣을 패턴
 * @returns {string} 바뀐 문장
 */
export const getReplacedStringByPatterns = ({
  sentence,
  replaceString,
  replacePatternFront,
  replacePatternBack,
}: ReplacedStringByPatterns): string => {
  const regexp = new RegExp(replaceString, 'gi')

  return sentence.replace(regexp, matched => {
    return `${replacePatternFront}${matched}${replacePatternBack}`
  })
}

/**
 * HTML Tag 제거 후 반환
 * @param {string} str 제거할 문자열
 * @returns {string}
 */
export const removeTags = (str: string): string => {
  return str.replace(/(<([^>]+)>)/gi, '')
}

export const getHighlightedText = (text: string, keyword: string): string => {
  // Escape special characters in the keyword
  const value = keyword.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
  const regex = new RegExp(`(${value})`, 'gi')
  return text.replace(regex, '<b class="highlight-em">$1</b>')
}

/**
 * 텍스트를 받아서 특정 키워드를 강조한다.
 * @param {string} text
 * @param {string} keyword
 * @returns {string}
 */
export const getHightlightedText = (text: string, keyword: string): string => {
  const value = `\\(${keyword}\\)`
  const regex = new RegExp(`(${value})`, 'gi')
  return text.replace(regex, '<b class="highlight-em">$1</b>')
}

/**
 * 한국어에서 글자의 종성에 따라 이어지는 조사를 치환한다.
 * @example 은/는, 이/가, 을/를, 과/와, 아/야, 이/여, 으로, 이라, 이야
 * @param {string} str 문장
 * @returns {string} 조사를 치환한 문장
 */
export const replaceKoreanPostPosition = (str: string): string => {
  let newString = str

  POST_POSITION_PATTERNS.forEach(({ pattern, replaces }) => {
    const postPositionRegEx = new RegExp(pattern)
    if (postPositionRegEx.test(str)) {
      newString = newString
        .split(pattern)
        .map((substr, index, arr) => {
          if (index === arr.length - 1) return substr // 마지막 부분은 그대로 반환

          const lastChar = substr.charCodeAt(substr.length - 1)
          const hasBatchim = (lastChar - 0xac00) % 28
          const newPostPosition = hasBatchim ? replaces[0] : replaces[1]

          return substr + newPostPosition
        })
        .join('')
    }
  })

  return newString
}

/**
 * 문자열 entity를 escape한다.
 * @param {string} str
 * @returns {string} escape된 문자열
 */
export const escapeEntities = (str: string): string => {
  const chars: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }

  return str.replace(/&|<|>|'|"/g, match => chars[match])
}

/**
 * 텍스트를 받아서 빈값, null, undefined가 아닐 경우 true를 반환한다.
 * @param {string} text 텍스트 값
 * @returns {boolean} 빈값, null, undefined가 아닐 경우 true
 */
export const getBooleanValueForString = (text: string): boolean => {
  return text !== '' && text !== undefined && text !== 'undefined' && text !== null && text !== 'null'
}

/**
 * 데이터가 없을 경우 '-'로 표시한다.
 * @param {string | number | undefined} data
 * @returns string 데이터가 없을 경우 '-'로 반환
 */
export const getApiStringDataFormat = (data: string | undefined): string => {
  const returnValue = data as string
  return getBooleanValueForString(returnValue) ? returnValue : '-'
}

/**
 * object를 base64로 인코딩한다.
 * @param str
 */
export const setObjectToBase64 = (str: object) => {
  try {
    return btoa(JSON.stringify(str))
  } catch (e) {
    return ''
  }
}

/**
 * base64를 object로 디코딩한다.
 * @param str
 */
export const getObjectFromBase64 = (str: string) => {
  try {
    return JSON.parse(atob(str))
  } catch (e) {
    return {}
  }
}

/**
 * 문자열을 base64로 인코딩, 디코딩한다.
 */
export const base64Code = {
  encode: (str: string) => {
    return btoa(str)
  },
  decode: (str: string) => {
    return atob(str)
  },
}

/**
 * 문자열이 존재하는지 판단
 * @param str
 */
export const checkStringExist = (str: string | undefined | null) => {
  return str !== '' && str !== undefined && str !== null
}

/**
 * 문자열을 HTML 태그로 변환한다.
 * @param content
 */
export const getHtmlContentFromString = (content?: string | string[]) => {
  if (!content) return ''
  if (Array.isArray(content)) return content.join('<br />')
  return content.replace(/\n/g, '<br />')
}

/**
 * 검색 Query를 배열로 변환한다.
 * @param {string} queryString - 검색 Query
 * @returns {string[]} - 검색 Query를 배열로 변환한 값
 */
export const convertQueryStringToStringArray = (queryString: string) => {
  // 따옴표 안의 문자열을 일시적으로 치환하기 위한 유니크한 토큰
  const placeholder = '__PLACEHOLDER__'

  // 따옴표 안의 문자열을 찾아 임시 배열에 저장하고, 원본 문자열에서는 토큰으로 대체
  let quotedStrings: string[] = []
  const modifiedString = queryString.replace(/"(.*?)"/g, (match, group1) => {
    quotedStrings.push(group1)
    return placeholder
  })

  // 공백과 쉼표를 기준으로 문자열 분리
  let parts = modifiedString.split(/,\s*|\s+/)

  // 토큰을 원래 따옴표 안의 문자열로 대체
  parts = parts.map(part => (part === placeholder ? quotedStrings.shift() || '' : part))

  return parts
}

/**
 * 한글을 로마자로 변환한다.
 * @param {string} hangul 한글 문자열
 * @returns {string} 로마자로 변환된 문자열
 */
export const getRomanFromKorean = (hangul: string): string => {
  const cho = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h']
  const jung = [
    'a',
    'ae',
    'ya',
    'yae',
    'eo',
    'e',
    'yeo',
    'ye',
    'o',
    'wa',
    'wae',
    'oe',
    'yo',
    'u',
    'wo',
    'we',
    'wi',
    'yu',
    'eu',
    'ui',
    'i',
  ]
  const jong = [
    '',
    'g',
    'kk',
    'ks',
    'n',
    'nj',
    'nh',
    'd',
    'l',
    'lg',
    'lm',
    'lb',
    'ls',
    'lt',
    'lp',
    'lh',
    'm',
    'b',
    'bs',
    's',
    'ss',
    'ng',
    'j',
    'ch',
    'k',
    't',
    'p',
    'h',
  ]

  let result = ''

  for (let i = 0; i < hangul.length; i++) {
    const charCode = hangul.charCodeAt(i)
    if (charCode >= 0xac00 && charCode <= 0xd7a3) {
      const uniVal = charCode - 0xac00
      const choIndex = Math.floor(uniVal / (21 * 28))
      const jungIndex = Math.floor((uniVal - choIndex * 21 * 28) / 28)
      const jongIndex = uniVal % 28

      result += cho[choIndex] + jung[jungIndex] + jong[jongIndex]
    } else {
      result += hangul[i]
    }
  }

  return result
}
