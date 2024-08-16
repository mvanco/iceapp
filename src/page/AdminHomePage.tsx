import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import CurrentConfig from "../model/Config"
import { ConsoleRepo, ConsoleError } from "../repo/ConsoleRepo"
import { DefaultUser } from "../model/User"
import { delay } from "../utils/Utils"
import { AdminActionsRepo } from "../repo/AdminActionsRepo"
import { Rentals } from "../repo/AdminActionsRepo"

export default function AdminHomePage() {

  const [user, setUser] = useState(DefaultUser);
  const [regRentals, setRegRentals] = useState<Rentals.Response[]>([])
  const [conRentals, setConRentals] = useState<Rentals.Response[]>([])
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

      const rentals = await AdminActionsRepo.rentals();
      if ("error" in rentals) {
        // TODO: Print some error
      }
      else {
        setRegRentals(rentals.filter((rental) => rental.registered == 1));
        setConRentals(rentals.filter((rental) => rental.confirmed == 1));
        hideError();
      }
    }
    fetchData();
  }, []);

  function onRegRentalsClick() {

  }

  function onConRentalsClick() {

  }

  return (
    <div className="SubPageSwitcher">
      <div className="SubPage">
        <span className="headlineLarge">{user.username}</span>
        <span className="titleLarge" style={{ marginTop: "8px" }}>{user.email}</span>
        <div className="titleMedium" style={{ marginTop: "32px", display: (regRentals.length > 0) ? "flex" : "none" }}>
          <span><a href="#" onClick={onRegRentalsClick} >{CurrentConfig.T.t('term', { count: regRentals.length })}</a> {" "}k ověření zájmu</span>
        </div>
        <div className="titleMedium" style={{ marginTop: "8px", display: (conRentals.length > 0) ? "flex" : "none" }}>
          <span><a href="#" onClick={onConRentalsClick} >{CurrentConfig.T.t('term', { count: conRentals.length })}</a> {" "}k potvrzení zaplacení</span>
        </div>
        <div className="titleMedium" style={{ marginTop: "32px", display: (regRentals.length == 0 && conRentals.length == 0) ? "flex" : "none" }}>
          Nemáte žádné nové upozornění.
        </div>
      </div>
      <div className="SubPage override" style={{ display: (errorMessage.length !== 0) ? "flex" : "none" }}>
        <h2>{errorMessage}</h2>
      </div>
    </div>
  )
}