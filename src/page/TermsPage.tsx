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
      <Terms items={interests}/>
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
        { items.map(item => (
          <span className="titleLarge" style={{ marginTop: "8px" }}>{printTerm(item.start)}</span>
          
        )) }
      </>
    );
  }
}

function printTerm(date: Date): string {
  const months = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];
  return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}