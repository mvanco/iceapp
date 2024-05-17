import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import CurrentConfig from "../model/Config" 
import { ConsoleRepo, ConsoleError } from "../repo/ConsoleRepo"
import { DefaultUser } from "../model/User"

export default function HomePage() {

  const [user, setUser] = useState(DefaultUser);

  useEffect(() => {
    async function fetchData() {
      const profile = await ConsoleRepo.profile();
      if (typeof profile === "object") {
        setUser(profile);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="SubPage">
      <span className="headlineLarge">{user.username}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>{user.email}</span>
      <span className="titleLarge" style={{ marginTop: "24px" }}>Aktuální zůstatek: {user.credit}Kč</span>
    </div>
  )
}