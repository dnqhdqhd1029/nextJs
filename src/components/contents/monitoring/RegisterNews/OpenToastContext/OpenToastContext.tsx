export const MoveToNewsContext = (props: number) => {
  return (
    <span>
      이 웹페이지는 미디어비 뉴스DB에 있습니다.{' '}
      <a
        className={'toast-box1 button'}
        href={`/news/record/${Number(props) || 0}`}
      >
        뉴스 페이지로 이동{'>'}
      </a>
    </span>
  )
}
