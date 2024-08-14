import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { Login } from "../viewmodel/LoginViewModel";
import CurrentConfig from "../model/Config";
import { ConsoleRepo } from "../repo/ConsoleRepo";
import { Idle, Message, UiState, ViewModelUser } from "../viewmodel/UsersViewModel";
import { printUser } from "../utils/Utils";
import AddCreditDialog from "./AddCreditDialog";
import { RentalViewModel } from "../viewmodel/RentalViewModel";

function AdminTermsPage() {
  const [uiState, setUiState] = useState<RentalViewModel.UiState>(new RentalViewModel.Message(""));
  const [viewModel] = useState(new RentalViewModel(uiState, setUiState));

  useEffect(() => {
    async function fetchData() {
      viewModel.fetchData();
    };
    fetchData();
  }, []);

  return (
    <div className="SubPageSwitcher">
      <div className="SubPage" style={'rentals' in uiState ? { display: "flex" } : { display: "none" }}>
        <span className="headlineLarge">Termíny</span>
        <div className="TermsBox">
          <div className="scrollview">
            <Terms rentals={(uiState as RentalViewModel.Idle)?.rentals ?? []} selectedId={(uiState as RentalViewModel.Idle)?.selectedId} onUserSelected={(id) => viewModel.selectUser(id)} />
          </div>
        </div>
      </div>
      <div className="SubPage override" style={'text' in uiState ? { display: "flex" } : { display: "none" }}>
        <h2>{(uiState as Message).text}</h2>
      </div>
      <a href="#" onClick={() => { viewModel.showDialog(RentalViewModel.DialogType.AddRental) }} style={{ position: "absolute", bottom: "32px", right: "32px", display: ((uiState as RentalViewModel.Idle).selectedId == null) ? "flex" : "none" }}>Přidat termín</a>
    </div>
  );
}

interface TermsProps {
  rentals: RentalViewModel.Term[],
  selectedId: number | null,
  onUserSelected: (id: number) => void
}

function Terms({ rentals, selectedId, onUserSelected }: TermsProps) {
  if (rentals.length == 0) {
    return (<span className="titleLarge" style={{ marginTop: "8px" }}>Zatím není registrován žádný uživatel.</span>);
  }
  else {
    return (
      <>
        {rentals.map(rental => (
          <div className="flex-row">
            <input
              type="radio"
              value={rental.id}
              checked={rental.id == selectedId}
              onChange={() => onUserSelected(rental.id)}
              style={{ marginTop: "12px", marginRight: "8px", display: (selectedId != null) ? "flex" : "none" }}
            />
            <span onClick={() => onUserSelected(rental.id)} key={rental.id} className="titleLarge" style={{ marginTop: "8px" }}>{rental.start}</span>
          </div>
        ))}
      </>
    );
  }
}


export default AdminTermsPage;