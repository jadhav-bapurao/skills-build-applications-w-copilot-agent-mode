import { Link, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

function Home() {
  return (
    <section aria-labelledby="page-title" className="py-5">
      <p className="text-uppercase text-secondary fw-semibold small mb-2">OctoFit Tracker</p>
      <h1 id="page-title" className="display-5 fw-bold">Your movement, in one place.</h1>
      <p className="lead text-secondary">Track activities, find your team, and keep moving.</p>
    </section>
  )
}

function App() {
  return (
    <div className="container">
      <header className="d-flex align-items-center border-bottom py-3">
        <Link className="navbar-brand fw-bold text-decoration-none text-dark" to="/">
          <img src={octofitLogo} alt="" height="36" className="me-2" />
          OctoFit Tracker
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
