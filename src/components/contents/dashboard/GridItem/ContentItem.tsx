import { useRouter } from 'next/router'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { dashboardContentType, GadgetItem } from '~/stores/modules/contents/dashboard/dashboardSlice'
import { getCurrencyFormat } from '~/utils/common/number'

const ContentItem = (props: dashboardContentType) => {
  const router = useRouter()

  return (
    <tr>
      {props.contentType !== '' && (
        <td
          scope="row"
          // style={{ width: '15%' }}
          style={{ width: '7.3%' }}
        >
          <p className="content-type">
            {props?.contentId === 'PHONE_CALL' && <IcoSvg data={icoSvgData.actPhone} />}
            {props?.contentId === 'MAILING' && <IcoSvg data={icoSvgData.actEmail} />}
            {props?.contentId === 'PROMISE' && <IcoSvg data={icoSvgData.actPromise} />}
            {props?.contentId === 'NOTE' && <IcoSvg data={icoSvgData.actNote} />}
            {props?.contentId === 'PRESS_RELEASE' && <IcoSvg data={icoSvgData.actPressRelease} />}
            {props?.contentId === 'INQUIRY' && <IcoSvg data={icoSvgData.actQuestion} />}
            {props?.contentId === 'NEWSWIRE_RELEASE' && <IcoSvg data={icoSvgData.actNewswire} />}
            {/* {props.contentType} */}
          </p>
        </td>
      )}
      {props.title !== '' && (
        <td>
          <div className="table-type5__flex">
            <p
              className="table-type5__text color-primary title"
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(props.isLink)}
            >
              {props.title}
            </p>
            {props.count !== '' && (
              <p
                className="table-type5__text color-secondary"
                style={{ paddingLeft: 4 }}
              >
                {getCurrencyFormat(props.count)}
              </p>
            )}
          </div>
        </td>
      )}
      {props.displayName !== '' && (
        <td
          scope="row"
          style={{ width: '20%' }}
        >
          <p className="table-type5__text name">{props.displayName}</p>
        </td>
      )}
      {props.date !== '' && (
        <td
          scope="row"
          style={{ width: '15%' }}
        >
          <p className="table-type5__text date">{props.date}</p>
        </td>
      )}
    </tr>
  )
}
export default ContentItem
