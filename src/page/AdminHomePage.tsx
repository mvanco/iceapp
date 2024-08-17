import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import CurrentConfig from "../model/Config"
import { ConsoleRepo, ConsoleError } from "../repo/ConsoleRepo"
import { DefaultUser } from "../model/User"
import { delay } from "../utils/Utils"
import { AdminActionsRepo } from "../repo/AdminActionsRepo"
import { Rentals } from "../repo/AdminActionsRepo"
import HandleNotificationDialog from "./HandleNotificationDialog"

export default function AdminHomePage() {

  const [user, setUser] = useState(DefaultUser);
  const [regRentals, setRegRentals] = useState<Rentals.Response[]>([])
  const [conRentals, setConRentals] = useState<Rentals.Response[]>([])
  const [errorMessage, setErrorMessage] = useState<string>(" ");

  enum DialogType {
    None = 0,
    ConfirmUsers = 1,
    PayRental = 2
  }

  const [dialogShown, setDialogShown] = useState<DialogType>(DialogType.None);

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
      }

      const rentals = await AdminActionsRepo.rentals();
      if ("error" in rentals) {
        // TODO: Print some error
      }
      else {
        setRegRentals(rentals.filter((rental) => (rental.registered >= rental.minCapacity) && !rental.paid));
        setConRentals(rentals.filter((rental) => (rental.confirmed >= rental.minCapacity) && !rental.paid));
        hideError();
      }
    }
    fetchData();
  }, []);

  function onRegRentalsClick() {
    setDialogShown(DialogType.ConfirmUsers);
  }

  function onConRentalsClick() {
    setDialogShown(DialogType.PayRental);
  }

  async function handleDialogClick(type: DialogType, rentalId: number | null) {
    if (rentalId == null) {
      setDialogShown(DialogType.None);
    }
    else {
      switch (type) {
        case DialogType.ConfirmUsers:
          await AdminActionsRepo.confirmUsers(rentalId);
          break;
  
        case DialogType.PayRental:
          await AdminActionsRepo.payRental(rentalId);
          break;
      }

      setDialogShown(DialogType.None);
    }
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
      <HandleNotificationDialog
        title={(dialogShown == DialogType.ConfirmUsers) ? "Ověření zájmu" : "Potvrzení zaplacení"}
        rentals={(dialogShown == DialogType.ConfirmUsers) ? regRentals : conRentals}
        setSelected={(id) => handleDialogClick(dialogShown, id)}
        style={{ position: "absolute", display: (dialogShown != DialogType.None) ? "flex" : "none" }} />
      <div className="SubPage override" style={{ display: (errorMessage.length !== 0) ? "flex" : "none" }}>
        <h2>{errorMessage}</h2>
      </div>
    </div>
  )
}