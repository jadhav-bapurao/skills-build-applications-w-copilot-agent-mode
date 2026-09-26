const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(resource, codespacePath) {
  const path = String(resource).replace(/^\/+|\/+$/g, '')
  const localPath = `/api/${path}/`
  const remotePath = codespacePath || `-8000.app.github.dev${localPath}`

  return codespaceName
    ? `https://${codespaceName}${remotePath}`
    : `http://localhost:8000${localPath}`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const nestedData = payload.data
  const candidates = [
    payload.results,
    payload.items,
    payload.records,
    nestedData?.results,
    nestedData?.items,
    nestedData?.records,
    nestedData,
  ]

  return candidates.find(Array.isArray) ?? []
}