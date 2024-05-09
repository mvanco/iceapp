import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import { username } from "../viewmodel/AppViewModel"

export default function HomePage() {
  return (
    <div className="SubPage">
      <h2>Home screen</h2>
      <p>{username}</p>
    </div>
  )
}