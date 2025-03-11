export const usePatterTest = () => {
  const test = (value: string) => {
    // if (isSqlPattern || isTagPattern) {
    //   return false
    // }
    return true
  }

  return {
    test,
  }
}
