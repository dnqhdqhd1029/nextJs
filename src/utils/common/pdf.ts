import html2canvas from 'html2canvas'
import JsPdf from 'jspdf'

import { CostomFont } from '~/utils/common/NotoSansKR-Regular'

interface Params {
  selector: string
  fileName: string
  linkText?: string
  linkUrl?: string
  openPdf?: boolean
}

export const makePdf = () => {
  const converToImg = async (selector: string) => {
    // html to imageFile
    const paper = document.querySelector(selector) as HTMLElement

    if (!paper) {
      console.log('Selector is not exist')
      return
    }

    const canvas = await html2canvas(paper, { scale: 1.5 })

    return canvas.toDataURL('image/png', 1.0)
  }

  const converToPdf = (
    imageFile: any,
    fileName: string,
    linkText?: string,
    linkUrl?: string,
    openPdf?: boolean
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const doc = new JsPdf('landscape', 'mm', 'a4')
      doc.addFileToVFS('CustomFont.ttf', CostomFont)
      doc.addFont('CustomFont.ttf', 'CustomFont', 'normal')
      doc.setFont('CustomFont') // 폰트 설정

      // 페이지 크기 가져오기 (가로 모드이므로 너비와 높이가 바뀜)
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      const img = new Image()
      img.src = imageFile
      img.onload = () => {
        const imgWidth = img.width
        const imgHeight = img.height

        let finalWidth, finalHeight
        // 이미지 비율에 따라 크기 조정
        if (imgWidth / imgHeight > pageWidth / pageHeight) {
          finalWidth = pageWidth
          finalHeight = (imgHeight * pageWidth) / imgWidth
        } else {
          finalHeight = pageHeight
          finalWidth = (imgWidth * pageHeight) / imgHeight
        }

        doc.addImage(imageFile, 'SVG', 0, 0, finalWidth, finalHeight, undefined, 'FAST')

        // 텍스트와 링크 추가
        if (linkText && linkUrl) {
          const textYPosition = finalHeight // 이미지 아래에 텍스트 위치
          const textXPosition = 8.3 // 텍스트 왼쪽 여백
          doc.setTextColor(52, 152, 219)
          doc.setFontSize(7) // 폰트 크기 설정
          doc.text(linkText, textXPosition, textYPosition)
          const linkWidth = doc.getTextWidth(linkText)
          doc.link(textXPosition, textYPosition - 2, linkWidth, 2, { url: linkUrl })

          // 밑줄 그리기
          const underlineYPosition = textYPosition + 1 // 밑줄 Y 좌표
          doc.setDrawColor(52, 152, 219) // 파란색 밑줄
          doc.line(textXPosition, underlineYPosition, textXPosition + linkWidth, underlineYPosition) // 밑줄 그리기
        }

        // PDF 파일 처리
        const pdfFile = new File([doc.output('blob')], `${fileName}.pdf`, {
          type: 'application/pdf',
        })

        // PDF 파일 저장 또는 출력
        if (openPdf) {
          window.open(doc.output('bloburl'))
        }

        resolve(pdfFile)
      }

      img.onerror = reject
    })
  }

  // viewWithPdf 함수 수정
  return {
    viewWithPdf: async (params: Params) => {
      const imageFile = await converToImg(params.selector)
      return await converToPdf(imageFile, params.fileName, params.linkText, params.linkUrl, params.openPdf ?? true)
    },
  }
}
