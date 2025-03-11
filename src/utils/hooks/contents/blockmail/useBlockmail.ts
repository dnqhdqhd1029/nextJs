import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { BaseResponseCommonObject } from '~/types/api/service'
import {
  BlockedInfoParams,
  BlockedUserParams,
  UnBlockedUserParams,
  useBlockUserAction,
  useGetBlockmailInfo,
  useGetUnBlockmailInfo,
  useUnBlockUserAction,
} from '~/utils/api/blockmail/useBlockmail'
import { openToast } from '~/utils/common/toast'

export const useBlockmail = () => {
  const router = useRouter()

  const [blockInfo, setBlockInfo] = useState<BlockedInfoParams | null>(null)
  const [blockUser, setBlockUser] = useState<BlockedUserParams | null>(null)
  const [unBlockUser, setUnBlockUser] = useState<UnBlockedUserParams | null>(null)
  const [isErrPage, setIsErrPage] = useState(false)
  const [isCompletePage, setIsCompletePage] = useState(false)

  const { isLoading: blockLoading, data: getOriginalBlockRaw } = useGetBlockmailInfo(
    {
      fr: router.query.fr ? (router.query.fr as string) : '',
      to: router.query.to ? (router.query.to as string) : '',
      key: router.query.key ? (router.query.key as string) : '',
    },
    {
      enabled: router.pathname === '/blockmail' && blockInfo !== null,
    }
  )
  const { isLoading: unBlockLoading, data: getOriginalUnBlockRaw } = useGetUnBlockmailInfo(
    {
      fr: router.query.fr ? (router.query.fr as string) : '',
      to: router.query.to ? (router.query.to as string) : '',
      key: router.query.key ? (router.query.key as string) : '',
    },
    {
      enabled: router.pathname === '/unblockmail' && blockInfo !== null,
    }
  )
  const blockUserEmailAction = useBlockUserAction()
  const unblockUserEmailAction = useUnBlockUserAction()

  const blockAction = async (props: BlockedUserParams) => {
    const { status, data, message } = await blockUserEmailAction.mutateAsync(props)
    if (status === 'S') {
      setIsCompletePage(() => true)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const unblockAction = async (props: UnBlockedUserParams) => {
    const { status, data, message } = await unblockUserEmailAction.mutateAsync(props)
    if (status === 'S') {
      setIsCompletePage(() => true)
    } else {
      openToast(message?.message, 'error')
    }
  }

  useEffect(() => {
    if (router.query) {
      if (router.query.fr && router.query.to && router.query.key) {
        const res = {
          fr: router.query.fr as string,
          to: router.query.to as string,
          key: router.query.key as string,
        }
        setBlockInfo(() => res)
      }
      console.log('router.query', router.query)
    }
  }, [router.query])

  useEffect(() => {
    if (!getOriginalBlockRaw) return
    const { status, data, message } = getOriginalBlockRaw as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as BlockedUserParams
      setIsErrPage(() => false)
      setIsCompletePage(() => false)
      setBlockUser(() => res)
    } else {
      openToast(message?.message, 'error')
      setIsErrPage(() => true)
    }
  }, [getOriginalBlockRaw])

  useEffect(() => {
    if (!getOriginalUnBlockRaw) return
    const { status, data, message } = getOriginalUnBlockRaw as BaseResponseCommonObject
    if (status === 'S') {
      const res = data as UnBlockedUserParams
      setIsErrPage(() => false)
      setIsCompletePage(() => false)
      setUnBlockUser(() => res)
    } else {
      openToast(message?.message, 'error')
      setIsErrPage(() => true)
    }
  }, [getOriginalUnBlockRaw])

  return {
    blockLoading,
    unBlockLoading,
    isErrPage,
    blockUser,
    isCompletePage,
    unBlockUser,

    blockAction,
    unblockAction,
  }
}
