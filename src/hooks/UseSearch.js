import { useEffect, useState, useRef } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [validation, setValidation] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setValidation('No se puede buscar una película vacía...')
      return
    }

    if (search.match(/^\d+$/)) {
      setValidation('No se puede buscar una película con un número...')
      return
    }

    if (search.length < 3) {
      setValidation('La búsqueda debe tener al menos tres caracteres...')
      return
    }

    setValidation(null)
  }, [search])

  return { search, updateSearch, validation }
}
