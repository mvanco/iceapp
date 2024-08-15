import { useState } from "react";
import { RentalViewModel } from "../viewmodel/RentalViewModel";
import moment, { max } from "moment";
import CurrentConfig from "../model/Config";

export interface SelectedTerm {
  start: string,
  duration: number,
  price: number,
  minCapacity: number,
  maxCapacity: number
}

interface AddTermDialogProps {
  setTerm: (value: SelectedTerm | null) => void,
  style: any
}

export default function AddTermDialog({ setTerm, style }: AddTermDialogProps) {
  const [startDate, setStartDate] = useState<string | undefined>(undefined); 
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [minCapacity, setMinCapacity] = useState<number | undefined>(undefined); 
  const [maxCapacity, setMaxCapacity] = useState<number | undefined>(undefined); 

  return (
    <div className="RegistrationDialog" style={style}>
      <div className="Card" style={{maxHeight: 400}}>
        <span className="headlineLarge">Nový termín</span>
        <input
          type="datetime-local"
          value={startDate || ''}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <input
          type="number"
          value={duration}
          placeholder="Doba trvání"
          onChange={(event) => setDuration(Number(event.target.value))}
          style={{ marginTop: "16px" }}
        />
        <input
          type="number"
          value={price}
          placeholder="Cena"
          onChange={(event) => setPrice(Number(event.target.value))}
          style={{ marginTop: "16px" }}
        />
        <input
          type="number"
          value={minCapacity}
          placeholder="Minimální kapacita"
          onChange={(event) => setMinCapacity(Number(event.target.value))}
          style={{ marginTop: "16px" }}
        />
        <input
          type="number"
          value={maxCapacity}
          placeholder="Maximální kapacita"
          onChange={(event) => setMaxCapacity(Number(event.target.value))}
          style={{ marginTop: "16px" }}
        />
        <div className="DialogButtons" style={{ marginTop: "32px" }}>
          <button onClick={() => {
            if (startDate === undefined || duration === undefined || price === undefined || minCapacity === undefined || maxCapacity === undefined) {
              setTerm(null);
            }
            else {
              setTerm({
                start: startDate,
                duration: Number(duration),
                price: Number(price),
                minCapacity: Number(minCapacity),
                maxCapacity: Number(maxCapacity)
              });
            }
          }}>Potvrdit</button>
          <button onClick={() => {
            setTerm(null);
          }} style={{ marginRight: "8px" }}>Zrušit</button>
        </div>
      </div>
    </div>
  )
}