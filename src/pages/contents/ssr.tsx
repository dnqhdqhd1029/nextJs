/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file page.tsx
 * @description 페이지 설명
 */

interface Props {
  data: any
}

export const SamplePage = ({ data }: Props) => {
  return (
    <>
      {data.map((item: any) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
        </div>
      ))}
    </>
  )
}

export default SamplePage
SamplePage.Layout = 'SSR'

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
