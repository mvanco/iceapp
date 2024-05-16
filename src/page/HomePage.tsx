import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import CurrentConfig from "../model/Config" 

export default function HomePage() {
  return (
    <div className="SubPage">
      <h2>Home screen</h2>
      <p>{CurrentConfig.userId}</p>
    </div>
  )
}