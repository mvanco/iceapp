import { Rentals } from "../repo/AdminActionsRepo";
import { printTerm } from "../utils/Utils";
import { useState } from "react";

interface HandleNotificationDialogProps {
  title: string,
  rentals: Rentals.Response[],
  setSelected: (value: number | null) => void,
  style: any
}

export default function HandleNotificationDialog({ title, rentals, setSelected, style }: HandleNotificationDialogProps) {

  const [selectedRental, setSelectedRental] = useState<number | null>(null);

  function handleRentalChange(event: any) {
    console.log(event.target.value);
    setSelectedRental(Number(event.target.value));
  }

  return (
    <div className="RegistrationDialog" style={style}>
      <div className="Card">
        <span className="headlineLarge">{title}</span>
        {rentals.map(rental => (
          <label className="titleMedium" key={rental.id} style={{ marginTop: "16px" }}>
            <input
              type="radio"
              value={rental.id}
              checked={selectedRental === rental.id}
              onChange={handleRentalChange}
              style={{ marginRight: "8px" }}
            />
            {rental.start}
          </label>
        ))}
        {(rentals.length === 0) ? <span className="titleLarge" style={{ marginTop: "8px" }}>Není na výběr žádný termín.</span> : ""}
        <div className="DialogButtons" style={{ marginTop: "32px" }}>
          <button onClick={() => {
            setSelectedRental(null);
            setSelected(selectedRental);
          }}>Potvrdit</button>
          <button onClick={() => {
            setSelectedRental(null);
            setSelected(null);
          }} style={{ marginRight: "8px" }}>Zrušit</button>
        </div>
      </div>
    </div>
  )
}