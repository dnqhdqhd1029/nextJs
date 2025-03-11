import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  initAction,
  initTagPopupAction,
  isLoadingAction,
  tagContentListAction,
  tagContentListButtonAction,
  tagListParamsKeywordAction,
  tagListParamsProps,
  tagPopupAction,
  tagPopupProps,
} from '~/stores/modules/contents/activity/tagActivity'
import { PageTagDto, type TagDto } from '~/types/api/service'
import { useDeleteTag } from '~/utils/api/tag/useDeleteTag'
import { apiGetTagList } from '~/utils/api/tag/useGetTagList'
import { usePostTagCreate } from '~/utils/api/tag/usePostTagCreate'
import { usePostTagNameCheck } from '~/utils/api/tag/usePostTagNameCheck'
import { usePutTag } from '~/utils/api/tag/usePutTag'
import { setObjectToBase64 } from '~/utils/common/object'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useTagActivity = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    isLoading,
    tagType,
    pageCount,
    tagPopup,
    tagListParamsKeyword,
    tagListParams,
    tagContentListButton,
    tagContentLoading,
    tagContentList,
  } = useAppSelector(state => state.tagActivitySlice)
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
      let param = {
        ...hook,
        value: e,
        valueErr: '',
      }
      if (e && e.length >= 30) {
        param = {
          ...hook,
          valueErr: '태그는 30자를 넘을 수 없습니다.',
        }
      }
      dispatch(tagPopupAction(param))
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

  const tagListParamsKeywordActionChange = useCallback(
    async (param: string) => {
      dispatch(tagListParamsKeywordAction(param))
    },
    [tagListParamsKeyword]
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

  const getSearchActionByKeyword = (keyword: string, hook: tagListParamsProps, type: string) => {
    getTagListData(
      {
        ...hook,
        name: keyword,
        page: 1,
        size: 20,
      },
      type
    )
  }

  const checkTag = async (param: tagPopupProps) => {
    const { status, message } = await checkTagName.mutateAsync({
      oldName: '',
      newName: param.value,
      category: 'ACTION',
      groupId: userSelectGroup,
    })
    if (status !== 'S') {
      dispatch(
        tagPopupAction({
          ...param,
          valueErr: '같은 이름의 태그가 이미 있습니다.',
        })
      )
    }
    return status
  }

  const createTagPopupAction = async (param: tagPopupProps, apiDto: tagListParamsProps, type: string) => {
    if (param.value === '') {
      dispatch(
        tagPopupAction({
          ...param,
          valueErr: '태그명을 입력해 주세요.',
        })
      )
    } else if (param.value.length > 30) {
      dispatch(
        tagPopupAction({
          ...param,
          valueErr: '태그는 30자를 넘을 수 없습니다.',
        })
      )
    } else {
      const checked = await checkTag(param)
      if (checked === 'S') {
        const { status, message } = await createTag.mutateAsync({
          name: param.value,
          category: 'ACTION',
          groupId: userSelectGroup,
        })
        if (status === 'S') {
          openToast(message?.message, 'success')
          await getTagListData(apiDto, type)
        } else {
          openToast(message?.message, 'error')
        }
      }
    }
  }

  const editTagPopupAction = async (param: tagPopupProps, apiDto: tagListParamsProps, type: string) => {
    if (param.value === '') {
      dispatch(
        tagPopupAction({
          ...param,
          valueErr: '태그명을 입력해 주세요.',
        })
      )
    } else if (param.value.length > 30) {
      dispatch(
        tagPopupAction({
          ...param,
          valueErr: '태그는 30자를 넘을 수 없습니다.',
        })
      )
    } else {
      const checked = await checkTag(param)
      if (checked === 'S') {
        const { status, message } = await updateTag.mutateAsync({
          id: param.key,
          info: {
            name: param.value,
          },
        })
        if (status === 'S') {
          openToast(message?.message, 'success')
          await getTagListData(apiDto, type)
        } else {
          openToast(message?.message, 'error')
        }
      }
    }
  }

  const deleteTagPopupAction = async (param: tagPopupProps, apiDto: tagListParamsProps, type: string) => {
    const { status, message } = await deleteTag.mutateAsync(Number(param.key))
    if (status === 'S') {
      openToast(message?.message, 'success')
      await getTagListData(apiDto, type)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const onMoveUrlClickCheck = (target: HTMLElement, filterUrl: string, count: number) => {
    let isCount = 0
    const isInList1 = target.closest('.list-type11-item__title type-flex-grow') !== null // Check if the target is within the list
    if (isInList1) {
      isCount += 1
    }
    const isInList5 = target.closest('.list-type11-item__more') !== null // Check if the target is within the list
    if (isInList5) {
      isCount += 1
    }
    if (isCount === 0) {
      if (count > 0) {
        router.push(`/activity/search?filter=${filterUrl}`)
      } else {
        openToast('태깅된 활동이 없습니다.', 'error')
      }
    }
  }

  const moveToSearch = async (param: TagDto) => {
    let query = {
      tagIdList: param?.count && param.count > 0 ? [param.tagId?.toString()] : [],
      activityId: 0,
    }
    return setObjectToBase64({ ...query })
  }

  const init = async () => {
    dispatch(initAction())
    await getTagListData(
      {
        name: '',
        page: 1,
        size: 20,
        sort: ['updateAt!desc'],
      },
      'total'
    )
  }

  const getTagListData = async (params: tagListParamsProps, type: string) => {
    let tempTagType = type
    let tempList: TagDto[] = []
    let tempPageCount = {
      totalCount: 0,
      totalPageCount: 0,
    }
    dispatch(isLoadingAction(true))
    const { status, data, message } = await apiGetTagList({
      name: params.name,
      category: 'ACTION',
      page: params.page,
      size: params.size,
      sort: params.sort[0],
      userId: type === 'total' ? 0 : userInfo.userId,
      groupId: userSelectGroup,
    })
    if (status === 'S') {
      const apiData = data as PageTagDto
      if (apiData.content && apiData.content.length > 0) {
        tempList = apiData.content
        tempPageCount = {
          totalCount: apiData.totalElements ?? 0,
          totalPageCount: apiData.totalPages ?? 0,
        }
      }
    } else {
      openToast(message?.message, 'error')
    }
    dispatch(
      tagContentListAction({
        apiDto: params,
        tagType: tempTagType,
        list: tempList,
        pageCount: tempPageCount,
      })
    )
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
    tagListParamsKeyword,
    tagType,

    getSearchActionByKeyword,
    createTagPopupAction,
    deleteTagPopupAction,
    editTagPopupAction,
    moveToSearch,
    init,
    getTagListData,
    onMoveUrlClickCheck,

    tagListParamsKeywordActionChange,
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
