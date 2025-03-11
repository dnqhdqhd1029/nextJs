/**
 * @file Layouts.ts
 * @description 레이아웃 컴포넌트 관리
 */

import BlankLayout from './BlankLayout'
import GuideLayout from './GuideLayout'
import Layout1 from './Layout1'
import Layout2 from './Layout2'
import Layout3 from './Layout3'
import Layout4 from './Layout4'
import Layout5 from './Layout5'
import Layout6 from './Layout6'

export const Layouts = {
  // 컨텐츠 내 스크롤 (브레드크럼 유무에 따른 분류)
  LAYOUT1: Layout1, // header
  LAYOUT2: Layout2, // header + 브레드크럼

  // 브라우저 스크롤
  LAYOUT3: Layout3,
  // 브라우저 스크롤 (lnb + 컨텐츠)
  LAYOUT4: Layout4,

  // 결제하기 Layout5 (Layout3과 동일, Header만 다름.)
  LAYOUT5: Layout5,

  // 고객센터 Layout6 (Layout3과 동일, Header만 다름.)
  LAYOUT6: Layout6,

  // 가이드 페이지 레이아웃
  GUIDE: GuideLayout,

  // 빈 페이지 레이아웃
  BLANK: BlankLayout,
}
