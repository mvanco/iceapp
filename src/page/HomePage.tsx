import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import { getSessionId } from "../model/Session" 

export default function HomePage() {
  return (
    <div className="SubPage">
      <h2>Home screen</h2>
      <p>{getSessionId()}</p>
    </div>
  )
}