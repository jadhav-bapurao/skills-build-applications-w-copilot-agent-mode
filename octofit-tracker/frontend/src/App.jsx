import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import { API_BASE_URL } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Activities', path: '/activities', index: '01' },
  { label: 'Leaderboard', path: '/leaderboard', index: '02' },
  { label: 'Teams', path: '/teams', index: '03' },
  { label: 'Athletes', path: '/users', index: '04' },
  { label: 'Workouts', path: '/workouts', index: '05' },
]

function App() {
  const apiEnvironment = API_BASE_URL.startsWith('https://') ? 'Codespaces API' : 'Local API'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/">
          <img src={octofitLogo} alt="" className="brand-logo" />
          <span className="brand-name">OctoFit<span>Tracker</span></span>
        </Link>

        <div className="sidebar-label">Training desk</div>
        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
              key={item.path}
              to={item.path}
            >
              <span className="nav-index">{item.index}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="online-mark" aria-hidden="true" />
          <span>Tracker workspace</span>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="topbar-context">
            <span className="topbar-kicker">Mergington High School</span>
            <span className="topbar-divider" aria-hidden="true">/</span>
            <span>Fitness program</span>
          </div>
          <div className="api-status">
            <span className="online-mark" aria-hidden="true" />
            <span>{apiEnvironment}</span>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
