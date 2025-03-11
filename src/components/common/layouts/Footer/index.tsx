/**
 * @file Footer.tsx
 * @description 푸터 공통
 */
import Link from 'next/link'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import MediaBeeLogo from '~/components/common/ui/MediaBeeLogo'

const Footer = () => {
  return (
    <footer>
      <div className="footer-section">
        <div className="footer-section__group">
          <Link
            href="/"
            legacyBehavior
          >
            <a className="footer-logo">
              <MediaBeeLogo />
            </a>
          </Link>

          <div className="footer-descriptions">
            미디어비는 언론 홍보 전문 플랫폼입니다. 국내 최대의 미디어 데이터베이스를 바탕으로 언론 홍보에 필요한 모든
            기능을 사용할 수 있습니다.
          </div>

          <div className="footer-demo">
            <Button
              elem="button"
              label={'데모 체험하기'}
              cate={'default'}
              size={'s'}
              color={'tertiary'}
            />
          </div>

          <div className="footer-help">
            <span className="mr-10">고객센터</span>

            <Button
              elem="button"
              label={'02-737-3600'}
              cate={'link-text-arrow'}
              size={'m'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.actPhone}
              className={'mr-10'}
            />
            <Button
              label={'문의하기'}
              cate={'link-text-arrow'}
              size={'m'}
              color={'secondary'}
              icoRight={true}
              icoRightData={icoSvgData.chevronThickRight}
            />
          </div>

          <div className="footer-sns">
            <Button
              elem="button"
              label={'02-737-3600'}
              cate={'ico-only'}
              size={'m'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.facebook}
            />
            <Button
              elem="button"
              label={'02-737-3600'}
              cate={'ico-only'}
              size={'m'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.instagram}
            />

            <Button
              elem="button"
              label={'02-737-3600'}
              cate={'ico-only'}
              size={'m'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.twitter}
            />
            <Button
              elem="button"
              label={'02-737-3600'}
              cate={'ico-only'}
              size={'m'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.linkedin}
            />
          </div>
        </div>
        <div className="footer-section__group">
          <div className="footer-lnb">
            <dl>
              <dt>
                <a href="#none"> PR서비스 </a>
              </dt>
              <dd>
                <a href="#none">개요</a>
              </dd>
              <dd>
                <a href="#none">미디어 데이터베이스</a>
              </dd>
              <dd>
                <a href="#none">모니터링 및 알림</a>
              </dd>
              <dd>
                <a href="#none">보도자료 배포</a>
              </dd>
              <dd>
                <a href="#none">캠페인</a>
              </dd>
              <dd>
                <a href="#none">보고서·분석</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="#none">언론인</a>
              </dt>
              <dd>
                <a href="#none">언론인 로그인</a>
              </dd>
              <dd>
                <a href="#none">언론 솔루션</a>
              </dd>
              <dd>
                <a href="#none">프로필 등록</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="#none">미디어 소식</a>
              </dt>
              <dd>
                <a href="#none">언론인</a>
              </dd>
              <dd>
                <a href="#none">미디어</a>
              </dd>
              <dd>
                <a href="#none">트렌드</a>
              </dd>
              <dd>
                <a href="#none">인사</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="#none">고객사례</a>
              </dt>
            </dl>
            <dl>
              <dt>
                <a href="#none">상품 안내</a>
              </dt>
            </dl>
          </div>

          <div className="footer-etcs">
            <div className="footer-etcs__group">
              <div className="footer-etcs__item">
                <a href="#none">이용약관</a>
              </div>
              <div className="footer-etcs__item">
                <a href="#none">개인정보 처리방침</a>
              </div>
              <div className="footer-etcs__item">
                <a href="#none">이메일무단수집거부</a>
              </div>
            </div>
            <div className="footer-etcs__group">
              <div className="footer-etcs__item">
                <a href="#none">뉴스와이어 바로 가기 </a>
              </div>
            </div>
          </div>
          <div className="footer-address">
            <address>
              서울시 중구 서소문로11길 19 배재정동빌딩 A동 6층 사업자등록번호: 101-86-07713 <br />
              통신판매업신고: 종로 제01-3225호 이메일: <a href="mailto:cs@mediabee.com">cs@mediabee.com</a>
            </address>
            <span className="copy">© Mediabee All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
