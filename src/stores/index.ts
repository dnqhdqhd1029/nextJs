import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import { WebStorage } from 'redux-persist/lib/types'
//import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from '~/stores/reducer'
import rootSaga from '~/stores/saga'

export function createPersistStorage(): WebStorage {
  const isServer = typeof window === 'undefined'

  // Returns noop (dummy) storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null)
      },
      setItem() {
        return Promise.resolve()
      },
      removeItem() {
        return Promise.resolve()
      },
    }
  }

  return createWebStorage('local')
}

const persistConfig = {
  key: 'root', // 로컬스토리지에 저장할 키값
  storage: createPersistStorage(), // localStorage or sessionStorage
  whitelist: ['authSlice', 'extraSlice'], // 저장할 리듀서
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const getLoginSliceState = (): any => {
  return store.getState()
}

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }).concat(sagaMiddleware),
  })
  sagaMiddleware.run(rootSaga)
  return store
}

export const store = makeStore()

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']

export const wrapper = createWrapper(makeStore)
