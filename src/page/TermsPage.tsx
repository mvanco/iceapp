import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import { ConsoleRepo } from "../repo/ConsoleRepo";
import Interest from "../model/Interest";
import RegistrationDialog from "./RegistrationDialog";
import { printTerm } from "../utils/Utils";
import { ConsoleError } from "../repo/ConsoleRepo";
import { delay } from "../utils/Utils";
import CurrentConfig from "../model/Config";

export default function TermsPage() {

  const [interests, setInterests] = useState<Interest[]>([]);
  const [shownDialog, setShownDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(" ");

  function hideError() {
    setErrorMessage("");
  }

  useEffect(() => {
    async function fetchData() {
      setErrorMessage("Načítám...")
      await delay(CurrentConfig.ToastLengthShort);
      const interests = await ConsoleRepo.interests();
      if (Array.isArray(interests)) {
        setInterests(interests);
        hideError();
      }
    }
    fetchData();
  }, []);

  const myTerms: Interest[] = [];
  const setSelected = async (rentalId: number | null) => {
    setShownDialog(false);
    if (rentalId != null) {
      setErrorMessage("Načítám...");
      await delay(CurrentConfig.ToastLengthShort);
      const result = await ConsoleRepo.registerTerm(rentalId);
      if (result != null) { // Error occurred.
        let errorMessage = "Unknown error."
        switch (result as ConsoleError) {
          case ConsoleError.InsufficientCredit:
            errorMessage = "Nedostatečný kredit.";
            break;
        }
        setErrorMessage(errorMessage);
        await delay(CurrentConfig.ToastLengthShort);
        hideError();
        return;
      }
      const interests = await ConsoleRepo.interests();
      if (Array.isArray(interests)) {
        setErrorMessage("Nový termín byl zapsán.");
        await delay(CurrentConfig.ToastLengthShort);
        hideError();
        setInterests(interests);
      }
    }
  };

  const registerTerm = () => {
    setShownDialog(true);
  }

  return (
    <div className="SubPageSwitcher">
      <div className="SubPage">
        <span className="headlineLarge" style={{ marginBottom: "16px" }}>Zájem o termíny</span>
        <div className="TermsBox">
          <div className="scrollview">
            <Terms items={interests.filter((value, index, array) => value.registered)} />
          </div>
        </div>
      </div>
      <div className="SubPage override" style={{ display: (errorMessage.length !== 0) ? "flex" : "none" }}>
        <h2>{errorMessage}</h2>
      </div>
      <a href="#" onClick={registerTerm} style={{ position: "absolute", bottom: "32px", right: "32px" }}>Zaregistrovat termín</a>
      <RegistrationDialog terms={interests.filter((value, index, array) => !value.registered)} setSelected={setSelected} style={{ position: "absolute", display: (shownDialog) ? "flex" : "none" }} />
    </div>
  )
}

interface TermsProps {
  items: Interest[];
}

function Terms({ items }: TermsProps) {
  if (items.length == 0) {
    return (<span className="titleLarge" style={{ marginTop: "8px" }}>Nemáte zatím zájem o žádné termíny.</span>);
  }
  else {
    return (
      <>
        {items.map(item => (
          <span className="titleLarge" style={{ marginTop: "8px" }}>{printTerm(item, true)}</span>
        ))}
      </>
    );
  }
}