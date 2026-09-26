import CollectionPage from './CollectionPage.jsx'
import { apiUrl } from '../api.js'

const endpoint = apiUrl('leaderboard', '-8000.app.github.dev/api/leaderboard/')

const columns = [
  { key: 'rank', label: 'Rank', render: (_entry, index) => <span className="rank-value">{index + 1}</span> },
  {
    key: 'athlete',
    label: 'Athlete',
    render: (entry) => entry.user?.username || entry.username || entry.user?.name || 'Unknown athlete',
  },
  { key: 'points', label: 'Points', render: (entry) => <span className="points-value">{Number(entry.points) || 0}</span> },
]

export default function Leaderboard() {
  return (
    <CollectionPage columns={columns} description="A snapshot of points earned across the fitness program." endpoint={endpoint} resource="leaderboard" title="Leaderboard" />
  )
}