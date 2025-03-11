import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'

/**
 * 활동 타입에 따른 아이콘 반환
 * @param {string} type 활동 아이콘 타입
 * @returns {string[]} svg code(icoSvgData)
 */
export const getActivityIcon = (type: string): string[] => {
  let icon: string[] = []
  switch (type) {
    case 'NEWSWIRE_RELEASE': // 뉴스와이어
      icon = icoSvgData.newspaperTxt
      break
    case 'PRESS_RELEASE': // 보도자료
      icon = icoSvgData.building
      break
    case 'MAILING': // 메일
      icon = icoSvgData.envelope
      break
    case 'INQUIRY': // 문의
      icon = icoSvgData.chatLeftText
      break
    case 'PHONE_CALL': // 전화
      icon = icoSvgData.telephone
      break
    case 'PROMISE': // 약속
      icon = icoSvgData.clock
      break
    case 'NOTE': // 노트
      icon = icoSvgData.fileEarmarkText
      break
  }
  return icon
}
