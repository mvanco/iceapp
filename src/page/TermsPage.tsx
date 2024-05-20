import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import { ConsoleRepo } from "../repo/ConsoleRepo";
import Interest from "../model/Interest";
import RegistrationDialog from "./RegistrationDialog";
import { printTerm } from "../utils/Utils";

export default function TermsPage() {

  const [interests, setInterests] = useState<Interest[]>([]);
  const [shownDialog, setShownDialog] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const interests = await ConsoleRepo.interests();
      if (Array.isArray(interests)) {
        setInterests(interests);
      }
    }
    fetchData();
  }, []);

  const myTerms: Interest[] = [];
  const setSelected = (rentalId: number | null) => {
    if (rentalId != null) {
      ConsoleRepo.registerTerm(rentalId).then(async () => {
        const interests = await ConsoleRepo.interests();
        if (Array.isArray(interests)) {
          setInterests(interests);
        }
      });
    }
    setShownDialog(false);
  };

  const registerTerm = () => {
    setShownDialog(true);
  }

  return (
    <div className="SubPageSwitcher">
      <div className="SubPage">
        <span className="headlineLarge">Zájem o termíny</span>
        <Terms items={interests.filter((value, index, array) => value.registered)} />
      </div>
      <RegistrationDialog terms={interests.filter((value, index, array) => !value.registered)} setSelected={setSelected} style={{ position: "absolute", display: (shownDialog) ? "flex" : "none" }}/>
      <a href="#" onClick={registerTerm} style={{ position: "absolute", bottom: "32px", right: "32px"}}>Zaregistrovat termín</a>
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