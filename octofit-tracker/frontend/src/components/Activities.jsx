import CollectionPage from './CollectionPage.jsx'

function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

const columns = [
  { key: 'type', label: 'Activity', render: (activity) => activity.type || 'Activity' },
  {
    key: 'user',
    label: 'Athlete',
    render: (activity) => activity.user?.username || activity.user?.name || activity.username || 'Unknown athlete',
  },
  {
    key: 'duration',
    label: 'Duration',
    render: (activity) => Number.isFinite(Number(activity.duration)) ? `${activity.duration} min` : 'Not recorded',
  },
  { key: 'date', label: 'Date', render: (activity) => formatDate(activity.date) },
]

export default function Activities() {
  return (
    <CollectionPage columns={columns} description="Recent movement logged by the OctoFit community." resource="activities" title="Activities" />
  )
}