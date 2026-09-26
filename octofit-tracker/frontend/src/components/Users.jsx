import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'username', label: 'Athlete', render: (user) => user.username || user.name || 'Unnamed athlete' },
  { key: 'email', label: 'Email', render: (user) => user.email || 'Not provided' },
]

export default function Users() {
  return (
    <CollectionPage columns={columns} description="Athlete profiles registered with OctoFit Tracker." resource="users" title="Athletes" />
  )
}