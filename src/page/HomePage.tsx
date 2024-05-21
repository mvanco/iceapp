import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import CurrentConfig from "../model/Config"
import { ConsoleRepo, ConsoleError } from "../repo/ConsoleRepo"
import { DefaultUser } from "../model/User"
import { delay } from "../utils/Utils"

export default function HomePage() {

  const [user, setUser] = useState(DefaultUser);
  const [errorMessage, setErrorMessage] = useState<string>(" ");

  function hideError() {
    setErrorMessage("");
  }

  useEffect(() => {
    async function fetchData() {
      setErrorMessage("Načítám...");
      await delay(CurrentConfig.ToastLengthShort);

      const profile = await ConsoleRepo.profile();
      if (typeof profile === "object") {
        setUser(profile);
        hideError();
      }
    }
    fetchData();
  }, []);

  return (
    <div className="SubPageSwitcher">
      <div className="SubPage">
        <span className="headlineLarge">{user.username}</span>
        <span className="titleLarge" style={{ marginTop: "8px" }}>{user.email}</span>
        <span className="titleLarge" style={{ marginTop: "24px" }}>Aktuální zůstatek: {user.credit}Kč</span>
      </div>
      <div className="SubPage override" style={{ display: (errorMessage.length !== 0) ? "flex" : "none" }}>
        <h2>{errorMessage}</h2>
      </div>
    </div>
  )
}