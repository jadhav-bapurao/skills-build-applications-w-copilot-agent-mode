import CollectionPage from './CollectionPage.jsx'

function teamMembers(team) {
  if (!Array.isArray(team.members)) return []
  return team.members
    .map((member) => typeof member === 'string' ? member : member?.username || member?.name)
    .filter(Boolean)
}

const columns = [
  { key: 'name', label: 'Team', render: (team) => team.name || 'Unnamed team' },
  { key: 'members', label: 'Athletes', render: (team) => teamMembers(team).length || Number(team.memberCount) || 0 },
  {
    key: 'roster',
    label: 'Roster',
    render: (team) => <span className="member-list">{teamMembers(team).join(', ') || 'No members yet'}</span>,
  },
]

export default function Teams() {
  return (
    <CollectionPage columns={columns} description="Find the squads building momentum together." resource="teams" title="Teams" />
  )
}