import { useRouter } from 'next/router'

import { ItemInterfaceWidthIsSelected, ResultListProps } from '~/types/contents/Common'

export const useContentResultList = () => {
  const router = useRouter()
  const makeResultListWithSelectedId = <T extends ItemInterfaceWidthIsSelected>({
    resultList,
    routerQueryNames,
    specificCondition,
    selectedIdDispatch,
    queryName,
  }: ResultListProps<T>) => {
    const newResultList: T[] = [...resultList]
    let sId: string | undefined

    if (specificCondition !== undefined && routerQueryNames.length > 0) {
      sId = specificCondition ? routerQueryNames[0] : routerQueryNames[1]
    } else {
      sId = routerQueryNames[0]
    }

    let hasQueryIdFlag = !!sId
    let sIdNumber: number | undefined
    let selectedItem: T | undefined

    // query 자체가 없으면 1번째 아이템으로 선정하고 return
    if (!hasQueryIdFlag) {
      selectedItem = newResultList[0]
      selectedItem.isSelected = true

      selectedIdDispatch(Number(selectedItem.id))

      if (queryName !== undefined) {
        replaceUrlWithId(queryName, selectedItem.id)
      }

      return newResultList
    }

    // query 있으면 resultList 중에서 찾아서 isSelected true로 변경
    if (sId && !isNaN(Number(sId))) {
      sIdNumber = Number(sId)
      selectedItem = newResultList.find(item => Number(item.id) === sIdNumber)

      selectedIdDispatch(sIdNumber)

      if (selectedItem) {
        selectedItem.isSelected = true
      }
    }

    return newResultList
  }

  const replaceUrlWithId = (queryName: string, id: string) => {
    if (queryName !== undefined) {
      const pathname = router.pathname
      const routerQuery = router.query
      const newQuery = {
        ...routerQuery,
        [queryName]: id,
      }

      router.replace({
        pathname,
        query: newQuery,
      })
    }
  }

  return {
    makeResultListWithSelectedId,
  }
}
