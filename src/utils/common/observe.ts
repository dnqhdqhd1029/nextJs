let handlers = Symbol('handlers')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeObservable = (target: any) => {
  // 1. 핸들러를 저장할 곳을 초기화합니다.
  target[handlers] = []

  // 나중에 호출될 것을 대비하여 핸들러 함수를 배열에 저장합니다.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target.observe = function (handler: any) {
    this[handlers].push(handler)
  }

  // 2. 변경을 처리할 프락시를 만듭니다.
  return new Proxy(target, {
    set(target, property, value, receiver) {
      //@ts-ignore
      // eslint-disable-next-line prefer-rest-params
      let success = Reflect.set(...arguments) // 동작을 객체에 전달합니다.
      if (success) {
        // 에러 없이 프로퍼티를 제대로 설정했으면
        // 모든 핸들러를 호출합니다.
        //@ts-ignore
        target[handlers].forEach(handler => handler(property, value))
      }
      return success
    },
  })
}
