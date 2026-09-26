import { useEffect, useState } from 'react'
import { apiUrl, normalizeCollection } from '../api.js'

export default function useCollection(resource) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(apiUrl(resource), { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
        setRecords(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message || 'Unable to reach the API')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [resource, attempt])

  return {
    records,
    loading,
    error,
    refresh: () => setAttempt((currentAttempt) => currentAttempt + 1),
  }
}