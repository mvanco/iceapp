import { useState } from "react";

interface AddCreditDialogProps {
  username: string,
  setCredit: (value: number | null) => void,
  style: any
}

export default function AddCreditDialog({ username, setCredit, style }: AddCreditDialogProps) {

  const [selectedCredit, setSelectedCredit] = useState<string | number | readonly string[] | undefined>(undefined);

  return (
    <div className="RegistrationDialog" style={style}>
      <div className="Card">
        <span className="headlineLarge">{username}</span>
        <input
          type="text"
          value={selectedCredit}
          placeholder="Kredit"
          onChange={(event) => setSelectedCredit(event.target.value)}
          style={{ marginTop: "16px" }}
        />
        <div className="DialogButtons" style={{ marginTop: "32px" }}>
          <button onClick={() => {
            setCredit(Number(selectedCredit));
          }}>Potvrdit</button>
          <button onClick={() => {
            setCredit(null);
          }} style={{ marginRight: "8px" }}>Zrušit</button>
        </div>
      </div>
    </div>
  )
}