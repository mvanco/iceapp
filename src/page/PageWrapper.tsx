import { ReactNode } from "react"
import { Link, Outlet } from "react-router-dom"

export default function PageWrapper() {
  return (
    <div className="match-parent flex-column">
      <Outlet/>
      <div className="Menu">
        <Link to="/internal/home">Home</Link>&nbsp;
        <Link to="/internal/terms">Terms</Link>
      </div>
    </div>
  )
}