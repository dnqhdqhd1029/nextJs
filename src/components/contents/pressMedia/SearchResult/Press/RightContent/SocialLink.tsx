/**
 * @file SocialLink.tsx
 * @description SNS 링크
 */

import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { WEBSITE_PATTERN } from '~/constants/common'

export interface SocialLinkProps {
  url?: string
  iconType?: string
  name?: string
  iconCode?: string
}

const SocialLink = ({ url, iconType = 'code', name = '', iconCode }: SocialLinkProps) => {
  const isLink = WEBSITE_PATTERN.test(url ?? '')
  const [code, setCode] = useState('')

  const getSocialIconByName = (): string[] => {
    switch (code) {
      case 'facebook':
        return icoSvgData.facebook as string[]
      case 'twitter':
        return icoSvgData.twitter as string[]
      case 'instagram':
        return icoSvgData.instagram as string[]
      case 'linkedin':
        return icoSvgData.linkedin as string[]
      case 'youtube':
        return icoSvgData.youtube as string[]
      case 'naverjrnlst':
        return icoSvgData.naver as string[]
      case 'blog':
        return icoSvgData.blogFill as string[]
      case 'personal':
        return icoSvgData.houseDoorFill as string[]
      default:
        return ['']
    }
  }

  const getSocialIconByCode = (): string[] => {
    switch (code) {
      case '5': // facebook
        return icoSvgData.facebook as string[]
      case '4': // twitter
        return icoSvgData.twitter as string[]
      case '6': // instagram
        return icoSvgData.instagram as string[]
      case '7': // linkedin
        return icoSvgData.linkedin as string[]
      case '9': // youtube
        return icoSvgData.youtube as string[]
      case '30': // 네이버 언론인
        return icoSvgData.naver as string[]
      case '3': // 블로그
        return icoSvgData.blogFill as string[]
      case '28': // 개인 홈페이지
        return icoSvgData.houseDoorFill as string[]
      default:
        return ['']
    }
  }

  useEffect(() => {
    if (iconCode) {
      setCode(iconCode)
    }
  }, [iconCode])

  return (
    <li>
      {isLink ? (
        <Button
          elem="a"
          url={url}
          target={'_blank'}
          label={name}
          cate={'link-ico-text-sns'}
          size={''}
          color={'body-link'}
          icoLeft={true}
          icoLeftData={iconType === 'name' ? getSocialIconByName() : getSocialIconByCode()}
        />
      ) : (
        <span className="display-flex align-items__center">
          <span className={cn(`button__ico-left button-default__ico-left`)}>
            <IcoSvg data={iconType === 'name' ? getSocialIconByName() : getSocialIconByCode()} />
          </span>
          <span className="button__label ml-8">{url}</span>
        </span>
      )}
    </li>
  )
}

export default SocialLink
