import { useState } from "react";
import { RentalViewModel } from "../viewmodel/RentalViewModel";
import moment, { max } from "moment";
import CurrentConfig from "../model/Config"

interface DeleteTermDialogProps {
  onConfirmed: (value: boolean) => void,
  style: any
}

export default function DeleteTermDialog({ onConfirmed, style }: DeleteTermDialogProps) {
  return (
    <div className="RegistrationDialog" style={style}>
      <div className="Card">
        <span className="headlineLarge">Skutečně zrušit?</span>
        <div className="DialogButtons" style={{ marginTop: "32px" }}>
          <button onClick={() => {
            onConfirmed(true);
          }}>Potvrdit</button>
          <button onClick={() => {
            onConfirmed(false);
          }} style={{ marginRight: "8px" }}>Zrušit</button>
        </div>
      </div>
    </div>
  )
}