/**
 * @file MbTableBoard.tsx
 * @description
 */
import { ReactNode } from 'react'

import TableBoardContent from '~/components/contents/common/board/MbTableBoard/TableBoardContent'
import TableBoardFooter from '~/components/contents/common/board/MbTableBoard/TableBoardFooter'
import TableBoardHeader from '~/components/contents/common/board/MbTableBoard/TableBoardHeader'
import { getComponent } from '~/utils/common/component'

const TableBoardHeaderType = (<TableBoardHeader />).type
const TableBoardContentType = (<TableBoardContent />).type
const TableBoardFooterType = (<TableBoardFooter />).type

interface Props {
  children: ReactNode
}

const MbTableBoard = ({ children }: Props) => {
  const tableBoardHeaderComponent = getComponent(children, TableBoardHeaderType)
  const tableBoardContentComponent = getComponent(children, TableBoardContentType)
  const tableBoardFooterComponent = getComponent(children, TableBoardFooterType)

  return (
    <>
      <div className="setting-contents__section">
        <ul className="interval-mt16">
          <li>{tableBoardHeaderComponent && tableBoardHeaderComponent}</li>
          <li>
            <div className="setting-contents-list__section type-table">
              {tableBoardContentComponent && tableBoardContentComponent}
              {tableBoardFooterComponent && tableBoardFooterComponent}
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MbTableBoard

MbTableBoard.Header = TableBoardHeader
MbTableBoard.Content = TableBoardContent
MbTableBoard.Footer = TableBoardFooter
