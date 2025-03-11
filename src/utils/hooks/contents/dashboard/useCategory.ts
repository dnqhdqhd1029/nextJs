import { commonCodeCategoryAction } from '~/stores/modules/contents/activity/searchActivity'
import { monitoringCategoryListAction } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { ActionDtoForList } from '~/types/api/service'
import { SelectListOptionItem } from '~/types/common'
import { apiGetCommonCode, CommonCode } from '~/utils/api/common/useGetCommonCode'
import { useAppDispatch } from '~/utils/hooks/common/useRedux'

export interface IReturnList {
  content: Array<ActionDtoForList>
  totalElements: number
}

export const useCategory = () => {
  const dispatch = useAppDispatch()

  const setCommonCategoryCode = async (parentCode: string) => {
    const { status, data, message } = await apiGetCommonCode({ parentCode })
    if (parentCode === 'ACTION_CATEGORY_ALL') {
      dispatch(commonCodeCategoryAction(data as CommonCode[]))
    } else if (parentCode === 'MONITORING_CATEGORY') {
      dispatch(
        monitoringCategoryListAction(
          (data as CommonCode[]).map(d => {
            return { id: d.code, name: d.name }
          }) as SelectListOptionItem[]
        )
      )
    }
  }

  return {
    setCommonCategoryCode,
  }
}
