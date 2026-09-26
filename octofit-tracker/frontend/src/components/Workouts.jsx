import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Workout', render: (workout) => workout.name || 'Untitled workout' },
  { key: 'description', label: 'Details', render: (workout) => workout.description || 'No description' },
  {
    key: 'level',
    label: 'Level',
    render: (workout) => {
      const level = workout.level || 'All levels'
      return <span className="level-pill" data-level={level.toLowerCase()}>{level}</span>
    },
  },
]

export default function Workouts() {
  return (
    <CollectionPage columns={columns} description="Suggested sessions for your next training block." resource="workouts" title="Workouts" />
  )
}