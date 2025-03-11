import { useCallback, useEffect } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Skeleton from '~/components/common/ui/Skeleton'
import { useHeader } from '~/utils/hooks/contents/header/useHeader'

const GroupIconPage = () => {
  const {
    groupBar,
    isLoading,
    licenseInfo,
    userInfo,
    currentGroup,
    containerRef,
    setGroupBar,
    userAllGroups,
    useAllGroupByUserLoading,
    selectDefaultUserGroup,
  } = useHeader()

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setGroupBar(false)
    },
    [groupBar]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div
      className="header-corp__group"
      style={{ minWidth: '90px' }}
    >
      {isLoading ? (
        <Skeleton
          width={'90px'}
          height={'32px'}
        />
      ) : (
        <div
          className="select__section select-type3-n4"
          ref={containerRef}
        >
          {licenseInfo.flagGroup ? (
            <>
              <button
                className="select__label"
                onClick={() => setGroupBar(!groupBar)}
              >
                <span className="select__label-text">{currentGroup && currentGroup.name}</span>
                <IcoSvg data={!groupBar ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
              </button>
              <div className={cn('select-option__section', { 'display-block': groupBar })}>
                <div className="select-option__area">
                  <span className="select-option__group-title prevent-hover-active">{userInfo.company?.name}</span>
                  {!useAllGroupByUserLoading ? (
                    <ul className="select-option__group">
                      {userAllGroups.map((group, index) => (
                        <li key={group.groupId + 'userGroups' + group.groupId + index.toString()}>
                          <button
                            className={cn('select-option__item', {
                              'is-selected': currentGroup.groupId === group.groupId,
                            })}
                            onClick={() => selectDefaultUserGroup(group, currentGroup)}
                          >
                            <span className="select-option__item-text">{group.name}</span>
                            {currentGroup.groupId === group.groupId && (
                              <span className="select-option__item-ico">
                                <IcoSvg data={icoSvgData.checkThick} />
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="select-option__group">
                      <li style={{ marginTop: 5 }}>
                        <Skeleton
                          width={'120px'}
                          height={'60px'}
                        />
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </>
          ) : (
            <span className="select__label prevent-hover-active">
              <span className="select__label-text">{userInfo.company?.name}</span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default GroupIconPage
