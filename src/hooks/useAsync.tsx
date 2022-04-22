import { useState, useCallback, useEffect } from "react"

const useAsync = <T extends unknown>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<T>(null)
  const [error, setError] = useState<Error | null>(null)
  // The execute function wraps asyncFunction and
  // handles setting state for pending, data, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setIsLoading(true)
    setData(null)
    setError(null)
    return asyncFunction()
      .then((response) => {
        setData(response)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [asyncFunction])
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate])
  return { execute, isLoading, data, error }
}

export default useAsync
