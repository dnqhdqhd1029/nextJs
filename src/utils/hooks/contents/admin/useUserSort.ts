/**
 * @file useUserSort.ts
 * @description 사용자 정렬
 */

import { UserDto } from '~/types/api/service'

export const useUserSort = () => {
  const getSortedUserArray = (users: UserDto[]) => {
    let sortUsers = users.sort((a, b) => {
      const aDisplayName = a.displayName ?? ''
      const bDisplayName = b.displayName ?? ''

      if (bDisplayName < aDisplayName) return 1
      if (bDisplayName > aDisplayName) return -1
      return 0
    })

    sortUsers = sortUsers.sort((a, b) => {
      const order = ['ACTIVE', 'INACTIVE', 'UNCERTIFIED']

      return order.indexOf(a.stateCode as string) - order.indexOf(b.stateCode as string)
    })

    return sortUsers
  }

  return {
    getSortedUserArray,
  }
}
