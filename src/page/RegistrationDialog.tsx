import Interest from "../model/Interest";
import { printTerm } from "../utils/Utils";
import { useState } from "react";

interface RegistrationDialogProps {
  terms: Interest[],
  setSelected: (value: number | null) => void,
  style: any
}

export default function RegistrationDialog({ terms, setSelected, style }: RegistrationDialogProps) {

  const [selectedTerm, setSelectedTerm] = useState("");

  function handleTermChange(event: any) {
    console.log(event.target.value);
    setSelectedTerm(event.target.value);
  }

  return (
    <div className="RegistrationDialog" style={style}>
      <div className="Card">
        <span className="headlineLarge">Registrace</span>
        {terms.map(term => (
          <label className="titleMedium" key={term.rentalId} style={{ marginTop: "16px" }}>
            <input
              type="radio"
              value={term.rentalId}
              checked={selectedTerm === term.rentalId.toString()}
              onChange={handleTermChange}
              style={{ marginRight: "8px" }}
            />
            {printTerm(term)}
          </label>
        ))}
        {(terms.length === 0) ? <span className="titleLarge" style={{ marginTop: "8px" }}>Není k dispozici žádný nový termín.</span> : ""}
        <div className="DialogButtons" style={{ marginTop: "32px" }}>
          <button onClick={() => setSelected(Number(selectedTerm))}>Potvrdit</button>
          <button onClick={() => setSelected(null)} style={{ marginRight: "8px" }}>Zrušit</button>
        </div>
      </div>
    </div>
  )
}