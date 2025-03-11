/**
 * @file TemplateWarningMsg.tsx
 * @description
 */

interface Props {
  templateCount?: number
}
export const TemplateWarningMsg = (props: Props) => {
  return (
    <>
      템플릿은 최대 {props.templateCount}개까지 저장 가능합니다. 저장하려면 이전 단계에서
      <br />
      템플릿 일부를 삭제 후 다시 저장해보세요.
    </>
  )
}
