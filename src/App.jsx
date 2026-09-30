import { useEffect, useState } from 'react'
import AppHeader from './components/AppHeader.jsx'
import Login from './pages/Login.jsx'
import Menu from './pages/Menu.jsx'
import Orders from './pages/Orders.jsx'

const PAGES = { orders: Orders, menu: Menu }
const DEFAULT_PAGE = 'orders'

const pageFromHash = () => {
  const page = window.location.hash.slice(1)
  return page in PAGES ? page : DEFAULT_PAGE
}

/** Minimal hash routing (#orders, #menu) so the header links and browser back button work. */
function useHashPage() {
  const [page, setPage] = useState(pageFromHash)
  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return page
}

function App() {
  // No auth backend yet: any submitted credentials sign the user in.
  const [signedIn, setSignedIn] = useState(false)
  const page = useHashPage()

  if (!signedIn) return <Login onSubmit={() => setSignedIn(true)} />

  const Page = PAGES[page]
  return (
    <div className="flex h-dvh min-h-0 flex-col bg-canvas">
      <AppHeader
        branchName="Downtown Main Branch"
        activePage={page}
        onLogout={() => setSignedIn(false)}
      />
      <Page />
    </div>
  )
}

export default App
