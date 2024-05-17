import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import PageWrapper from "./PageWrapper"
import { ConsoleRepo } from "../repo/ConsoleRepo";
import Interest from "../model/Interest";

export default function TermsPage() {

  const [interests, setInterests] = useState<Interest[]>([]);

  useEffect(() => {
    async function fetchData() {
      const interests = await ConsoleRepo.interests();
      if (Array.isArray(interests)) {
        setInterests(interests);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="SubPage">
      <span className="headlineLarge">Zájem o termíny</span>
      {renderTerms(interests.filter((value, index, array) => value.registered))}
    </div>
  )
}

function renderTerms(interests: Interest[]) {
  if (interests.length == 0) {
    return (<span className="titleLarge" style={{ marginTop: "8px" }}>Nemáte zatím zájem o žádné termíny.</span>);
  }
  else {
    let result = "";
    for (let term of interests) {
      result += term.start + "; ";
    }

    return (<span className="titleLarge" style={{ marginTop: "8px" }}>{result}</span>);
  }
}