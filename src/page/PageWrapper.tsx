import { ReactNode } from "react"
import { Link, Outlet } from "react-router-dom"

export default function PageWrapper() {
  return (
    <>
      <Outlet/>
      <div className="Menu">
        <Link to="/internal/home">Home</Link>
        <Link to="/internal/terms">Terms</Link>
      </div>
    </>
  )
}