import CollectionPage from './CollectionPage.jsx'
import { apiUrl } from '../api.js'

const endpoint = apiUrl('users', '-8000.app.github.dev/api/users/')

const columns = [
  { key: 'username', label: 'Athlete', render: (user) => user.username || user.name || 'Unnamed athlete' },
  { key: 'email', label: 'Email', render: (user) => user.email || 'Not provided' },
]

export default function Users() {
  return (
    <CollectionPage columns={columns} description="Athlete profiles registered with OctoFit Tracker." endpoint={endpoint} resource="users" title="Athletes" />
  )
}