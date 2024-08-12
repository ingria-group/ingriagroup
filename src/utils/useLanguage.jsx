import { useEffect, useState } from 'react'

const useLanguage = () => {
  const [value, setValue] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('language')
      setValue(storedValue)
    }
  }, [])

  return value
}

export default useLanguage
