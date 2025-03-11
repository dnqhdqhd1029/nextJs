// /**
//  * @file usePressReleaseTemplate.ts
//  * @description 보도자료 배포
//  */
//
// import { useCallback, useState } from 'react'
//
// import { templateTabs } from '~/components/contents/distribution/PressRelease/defaultData'
// import { setTabAction } from '~/stores/modules/contents/pressRelease/release'
// import { StepItem } from '~/types/common'
// import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'
//
// export const usePressReleaseTemplate = () => {
//   const dispatch = useAppDispatch()
//   const { tab, pressReleaseCount } = useAppSelector(state => state.pressRelease)
//   const storeLicenseInfo = useAppSelector(state => state.user.licenseInfo)
//
//   const [activeTab, setActiveTab] = useState<StepItem>(templateTabs[0])
//   const [templateType, setTemplateType] = useState('rt1_mediabee')
//
//   const [templateList, setTemplateList] = useState<{ id: string; name: string }[]>([])
//
//   const setStepAction = useCallback(
//     (e: StepItem) => {
//       dispatch(setTabAction(e))
//     },
//     [dispatch]
//   )
//
//   const setActiveTabAction = useCallback(
//     (e: string) => {
//       const find = templateTabs.find(i => i.id === e)
//       if (find) setActiveTab(() => find)
//     },
//     [activeTab, templateType, setActiveTab, setTemplateType]
//   )
//
//   const setTemplateTypeAction = useCallback((data: string) => {}, [templateType, setTemplateType])
//
//   return {
//     activeTab,
//     templateType,
//     templateList,
//
//     tab,
//     storeLicenseInfo,
//     pressReleaseCount,
//
//     setStepAction,
//
//     setActiveTabAction,
//     setTemplateTypeAction,
//
//     setTemplateType,
//   }
// }
