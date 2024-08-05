import { ReactNode } from "react"
import { Link, Outlet } from "react-router-dom"

export default function AdminPageWrapper() {
  return (
    <>
      <Outlet/>
      <div className="Menu">
        <Link to="/admin/home">Profil</Link>
        <Link to="/admin/users">Uživatelé</Link>
      </div>
    </>
  )
}