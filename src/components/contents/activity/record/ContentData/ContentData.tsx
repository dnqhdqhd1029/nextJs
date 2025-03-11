import cn from 'classnames'
import DOMPurify from 'dompurify'

import Button from '~/components/common/ui/Button'
import { downloadCompanyFile } from '~/utils/common/file'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'
const ContentData = () => {
  const { contentsTab, getActionData, userSelectGroup } = useRecordActivity()

  DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if ('target' in node) {
      node.setAttribute('target', '_blank')
      node.setAttribute('rel', 'noopener')
    }
  })

  return (
    <>
      {contentsTab === 'content' && (
        <div className="tabs-panel__section">
          <div className="tabs-panel__group">
            <ul>
              <li>
                <div className="import-info__group">
                  <div className="import-info__contents">
                    <div className="import-info__contents-title">{getActionData?.title || ''}</div>
                    {getActionData?.content && (
                      <div
                        className={cn('mail-html-css p-margin')}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(getActionData?.content?.replaceAll('ruby-text', 'block'), {
                            ADD_ATTR: ['target', 'rel'],
                          }),
                        }}
                      />
                    )}
                  </div>
                </div>
              </li>
              {/* <li>
                <div
                  className="import-info__group"
                  style={{ paddingTop: 20 }}
                >
                  <h6 className="import-info__title">첨부</h6>
                  <div className="import-info__contents">
                    {getActionData?.fileAttachList && getActionData?.fileAttachList.length > 0 && (
                      <ul className="d-link__list">
                        {getActionData?.fileAttachList.map(e => (
                          <li key={'ContentLayer_d-link__list_files' + e.fileId}>
                            <Button
                              elem="a"
                              label={e?.name || ''}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                              onClick={() => downloadCompanyFile(e, userSelectGroup)}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
export default ContentData
