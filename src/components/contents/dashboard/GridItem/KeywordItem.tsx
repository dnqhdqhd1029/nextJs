import { useRouter } from 'next/router'

import { dashboardContentType, GadgetItem } from '~/stores/modules/contents/dashboard/dashboardSlice'

const KeywordItem = (props: dashboardContentType) => {
  const router = useRouter()

  return (
    <tr>
      {props.date !== '' && (
        <td style={{ width: '15%' }}>
          <p className="table-type5__text date">{props.date}</p>
        </td>
      )}
      {props.title !== '' && (
        <td /* style={{ width: '67%' }} */>
          <p
            className="table-type5__text color-primary title"
            style={{ cursor: 'pointer' }}
            onClick={() => router.push(props.isLink)}
          >
            {props.title}
          </p>
        </td>
      )}
      {props.displayName !== '' && (
        <td style={{ width: '20%' }}>
          <p className="table-type5__text name">{props.displayName}</p>
        </td>
      )}
    </tr>
  )
}
export default KeywordItem
