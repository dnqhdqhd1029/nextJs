import { CSSProperties } from 'react'

export const getImageSize = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const imageElement = document.createElement('img')

    // 이미지 로드 성공 시
    imageElement.onload = () => {
      const width = imageElement.width
      const height = imageElement.height

      // 이미지 요소를 body에서 제거
      document.body.removeChild(imageElement)

      // 이미지의 너비와 높이를 반환
      resolve({ width, height })
    }

    // 이미지 로드 실패 시
    imageElement.onerror = () => {
      // 이미지 요소를 body에서 제거
      document.body.removeChild(imageElement)
      reject(new Error('Failed to load image.'))
    }

    // 이미지 요소의 속성 설정
    imageElement.src = url
    imageElement.style.position = 'fixed'
    imageElement.style.left = '-999999px'
    imageElement.style.top = '-999999px'

    // 이미지 요소를 body에 추가
    document.body.appendChild(imageElement)
  })
}

export const getStylesOfImageRatio = async (url: string): Promise<CSSProperties> => {
  try {
    const { width, height } = await getImageSize(url)

    if (width > height) {
      return {
        width: '100%',
        height: 'auto',
      }
    } else {
      return {
        width: 'auto',
        height: '100%',
      }
    }
  } catch (error) {
    return {}
  }
}
