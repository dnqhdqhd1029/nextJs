import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  initState,
  initTagPopupAction,
  isLoadingAction,
  resetTagListParamsAction,
  tagContentListAction,
  tagContentListButtonAction,
  tagContentListContextAction,
  tagListParamsAction,
  tagListParamsProps,
  tagPopupAction,
  tagPopupProps,
} from '~/stores/modules/contents/monitoring/monitoringTag'
import { BaseResponseCommonObject, PageTagDto, type TagDto } from '~/types/api/service'
import { useDeleteTag } from '~/utils/api/tag/useDeleteTag'
import { apiGetTagList, useGetTagList } from '~/utils/api/tag/useGetTagList'
import { usePostTagCreate } from '~/utils/api/tag/usePostTagCreate'
import { usePostTagNameCheck } from '~/utils/api/tag/usePostTagNameCheck'
import { usePutTag } from '~/utils/api/tag/usePutTag'
import { apiGetUsers } from '~/utils/api/user/useGetAllUsers'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useTagMonitoring = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    pageCount,
    tagPopup,
    tagContentListContext,
    tagType,
    tagListParams,
    tagContentListButton,
    tagContentLoading,
    tagContentList,
    isLoading,
  } = useAppSelector(state => state.monitoringTagSlice)
  const { licenseInfo, userInfo, userSelectGroup } = useAppSelector(state => state.authSlice)

  const checkTagName = usePostTagNameCheck()
  const createTag = usePostTagCreate()
  const updateTag = usePutTag()
  const deleteTag = useDeleteTag()

  const setInitTagPopupAction = useCallback(() => dispatch(initTagPopupAction()), [tagPopup])

  const setTagContentListButtonAction = useCallback(
    (param: boolean) => dispatch(tagContentListButtonAction(param)),
    [tagContentListButton]
  )

  const openPopup = useCallback(
    (e: string, key: number, target: string) => {
      dispatch(
        tagPopupAction({
          isOpen: true,
          type: e,
          title: e === 'create' ? '태그 만들기' : e === 'delete' ? '태그 삭제' : '태그 수정',
          confirmText: e === 'create' ? '저장' : e === 'delete' ? '삭제' : '수정',
          value: e !== 'create' ? target : '',
          valueErr: '',
          key,
          target,
        })
      )
    },
    [tagPopup]
  )

  const inputValueOnChange = useCallback(
    (e: string, hook: tagPopupProps) => {
      dispatch(
        tagPopupAction({
          ...hook,
          value: e,
          valueErr: '',
        })
      )
    },
    [tagPopup.value, tagPopup.valueErr]
  )

  const handleChangeSize = useCallback(
    (e: number, hook: tagListParamsProps, type: string) => {
      getTagListData(
        {
          ...hook,
          page: 1,
          size: e,
        },
        type
      )
    },
    [tagListParams.size, tagListParams.page]
  )

  const handlePaginationChange = useCallback(
    (e: number, hook: tagListParamsProps, type: string) => {
      getTagListData(
        {
          ...hook,
          page: e,
          size: hook.size,
        },
        type
      )
    },
    [tagListParams.size, tagListParams.page]
  )

  const handleChangeSort = useCallback(
    (e: string[], hook: tagListParamsProps, type: string) => {
      getTagListData(
        {
          ...hook,
          sort: e,
          page: 1,
        },
        type
      )
    },
    [tagListParams.sort]
  )

  const tagContentListContextActionChange = useCallback(
    async (e: string) => {
      dispatch(tagContentListContextAction(e))
    },
    [tagContentListContext]
  )

  const handleKeywordsChange = useCallback(
    (e: string, hook: tagListParamsProps, type: string) => {
      getTagListData(
        {
          ...hook,
          name: e,
          page: 1,
          size: 20,
        },
        type
      )
    },
    [tagListParams.name]
  )

  const init = async () => {
    dispatch(initState())
    await getTagListData(
      {
        page: 1,
        size: 20,
        sort: ['updateAt!desc'],
        name: '',
      },
      'total'
    )
  }

  const onMoveUrlClickCheck = (target: HTMLElement, filterUrl: string) => {
    let isCount = 0
    const isInList1 = target.closest('.list-type11-item__title') !== null // Check if the target is within the list
    if (isInList1) {
      isCount += 1
    }
    const isInList5 = target.closest('.list-type11-item__more') !== null // Check if the target is within the list
    if (isInList5) {
      isCount += 1
    }
    if (isCount === 0) {
      router.push(`/news/search-result?filter=${filterUrl}`)
    }
  }

  const getTagListData = async (param: tagListParamsProps, type: string) => {
    let tempTagType = type
    let tempList: TagDto[] = []
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 0,
    }
    dispatch(isLoadingAction(true))
    try {
      const {
        status,
        data: apiData,
        message,
      } = await apiGetTagList({
        name: param.name,
        page: param.page,
        size: param.size,
        // @ts-ignore
        sort: param.sort,
        category: 'NEWS',
        groupId: userSelectGroup,
        userId: type === 'total' ? 0 : userInfo.userId,
      })
      if (status === 'S') {
        const res = apiData as PageTagDto
        if (res.content && res.content.length > 0) {
          tempList = res.content
          tempPageCount = {
            totalCount: res.totalElements ?? 0,
            totalPageCount: res.totalPages ?? 0,
          }
        }
      } else {
        openToast(message?.message, 'error')
      }
    } catch (e) {}
    dispatch(
      tagContentListAction({
        tagType: tempTagType,
        list: tempList,
        apiDto: param,
        pageCount: tempPageCount,
      })
    )
  }

  const resetKeyword = async (hook: tagListParamsProps) => {
    dispatch(
      resetTagListParamsAction({
        params: {
          ...hook,
          name: '',
        },
        button: false,
      })
    )
  }

  const getSearchActionByKeyword = (keyword: string, hook: tagListParamsProps, type: string) => {
    getTagListData(
      {
        ...hook,
        name: keyword,
      },
      type
    )
  }

  const checkTag = async (param: tagPopupProps) => {
    const { status, message } = await checkTagName.mutateAsync({
      oldName: '',
      newName: param.value,
      category: 'NEWS',
      groupId: userSelectGroup,
    })
    if (status !== 'S') {
      dispatch(
        tagPopupAction({
          ...param,
          valueErr: message?.message ?? '같은 이름의 태그가 이미 있습니다.',
        })
      )
    }
    return status
  }

  const createTagPopupAction = async (param: tagPopupProps, apiDto: tagListParamsProps, type: string) => {
    if (param.value !== '') {
      const checked = await checkTag(param)
      if (checked === 'S') {
        const { status, message } = await createTag.mutateAsync({
          name: param.value,
          category: 'NEWS',
          groupId: userSelectGroup,
        })
        if (status === 'S') {
          await getTagListData(apiDto, type)
          openToast(message?.message, 'success')
          dispatch(initTagPopupAction())
        } else {
          openToast(message?.message, 'error')
        }
      }
    } else {
      dispatch(
        tagPopupAction({
          ...param,
          valueErr: '태그명을 입력해 주세요.',
        })
      )
    }
  }

  const editTagPopupAction = async (param: tagPopupProps, apiDto: tagListParamsProps, type: string) => {
    if (param.value !== '') {
      const checked = await checkTag(param)
      if (checked === 'S') {
        const { status, message } = await updateTag.mutateAsync({
          id: param.key,
          info: {
            name: param.value,
          },
        })
        if (status === 'S') {
          await getTagListData(apiDto, type)
          openToast(message?.message, 'success')
          dispatch(initTagPopupAction())
        } else {
          openToast(message?.message, 'error')
        }
      }
    } else {
      dispatch(
        tagPopupAction({
          ...param,
          valueErr: '태그명을 입력해 주세요.',
        })
      )
    }
  }

  const deleteTagPopupAction = async (param: tagPopupProps, apiDto: tagListParamsProps, type: string) => {
    const { status, message } = await deleteTag.mutateAsync(Number(param.key))
    if (status === 'S') {
      await getTagListData(apiDto, type)
      openToast(message?.message, 'success')
      dispatch(initTagPopupAction())
    } else {
      openToast(message?.message, 'error')
    }
  }

  const moveToSearch = async (param: TagDto) => {
    let query = {
      and: '',
      clipbook: { id: '', name: '선택' },
      clipbookValue: [],
      coverage: { id: '', name: '선택' },
      endPeriod: new Date(),
      informationType: { id: '', name: '선택' },
      journalistTagList: [],
      mediaBookList: [],
      mediaTagList: [],
      mediaType: [],
      mediaValue: { id: '', name: '선택' },
      news_id: 0,
      not: '',
      or: '',
      period: { id: '', name: '선택' },
      periodTag: [],
      publishingPeriod: [],
      startPeriod: new Date(),
      tag: [{ id: param.tagId, label: param.name }],
      tone: [],
      url: '',
    }
    return setObjectToBase64({ ...query })
  }

  return {
    userSelectGroup,
    licenseInfo,
    userInfo,
    pageCount,
    tagListParams,
    tagContentListButton,
    tagContentLoading,
    tagContentList,
    isLoading,
    tagPopup,
    tagContentListContext,
    tagType,

    init,
    resetKeyword,
    getSearchActionByKeyword,
    createTagPopupAction,
    deleteTagPopupAction,
    editTagPopupAction,
    moveToSearch,
    getTagListData,
    onMoveUrlClickCheck,

    tagContentListContextActionChange,
    openPopup,
    inputValueOnChange,
    setInitTagPopupAction,
    handleKeywordsChange,
    handleChangeSize,
    handlePaginationChange,
    setTagContentListButtonAction,
    handleChangeSort,
  }
}
