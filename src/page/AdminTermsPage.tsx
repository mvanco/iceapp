import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { Login } from "../viewmodel/LoginViewModel";
import CurrentConfig from "../model/Config";
import { ConsoleRepo } from "../repo/ConsoleRepo";
import { Idle, Message, UiState, ViewModelUser } from "../viewmodel/UsersViewModel";
import { printUser } from "../utils/Utils";
import AddCreditDialog from "./AddCreditDialog";
import { RentalViewModel } from "../viewmodel/RentalViewModel";
import AddTermDialog from "./AddTermDialog";
import DeleteTermDialog from "./DeleteTermDialog";
import { SelectedTerm } from "./AddTermDialog";

function AdminTermsPage() {
  const [uiState, setUiState] = useState<RentalViewModel.UiState>(new RentalViewModel.Message(""));
  const [viewModel] = useState(new RentalViewModel(uiState, setUiState));

  useEffect(() => {
    async function fetchData() {
      viewModel.fetchData();
    };
    fetchData();
  }, []);

  async function onDeleteDialogConfirmed(answer: boolean) {
    if (answer == true) {
      viewModel.deleteRental();
    }
    else {
      viewModel.showDialog(RentalViewModel.DialogType.None);
    }
  }

  async function handleActionButtonClick() {
    if ((uiState as RentalViewModel.Idle).selectedId == null) {
      viewModel.showDialog(RentalViewModel.DialogType.AddRental);
    }
    else {
      viewModel.showDialog(RentalViewModel.DialogType.DeleteRental);
    }
  }

  async function onAddTermDialogResult(term: SelectedTerm | null) {
    if (term === null) {
      viewModel.showDialog(RentalViewModel.DialogType.None);
    }
    else {
      viewModel.addRental(term?.start !!, term?.duration !!, term?.price !!, term?.minCapacity !!, term?.maxCapacity !!);
    }
  }

  return (
    <div className="SubPageSwitcher">
      <div className="SubPage" style={'rentals' in uiState ? { display: "flex" } : { display: "none" }}>
        <span className="headlineLarge">Termíny</span>
        <div className="TermsBox">
          <div className="scrollview">
            <Terms rentals={(uiState as RentalViewModel.Idle)?.rentals ?? []} selectedId={(uiState as RentalViewModel.Idle)?.selectedId} onTermSelected={(id) => viewModel.selectTerm(id)} />
          </div>
        </div>
      </div>
      <div className="SubPage override" style={'text' in uiState ? { display: "flex" } : { display: "none" }}>
        <h2>{(uiState as Message).text}</h2>
      </div>
      <a href="#" onClick={handleActionButtonClick} style={{ position: "absolute", bottom: "32px", right: "32px" }}>{ ((uiState as RentalViewModel.Idle).selectedId == null) ? "Přidat termín" : "Zrušit termín" }</a>
      
      <AddTermDialog setTerm={onAddTermDialogResult} style={{ position: "absolute", display: ((uiState as RentalViewModel.Idle).dialogShown == RentalViewModel.DialogType.AddRental) ? "flex" : "none" }} />
      <DeleteTermDialog onConfirmed={onDeleteDialogConfirmed} style={{ position: "absolute", display: ((uiState as RentalViewModel.Idle).dialogShown == RentalViewModel.DialogType.DeleteRental) ? "flex" : "none" }} />
    </div>
  );
}

interface TermsProps {
  rentals: RentalViewModel.Term[],
  selectedId: number | null,
  onTermSelected: (id: number) => void
}

function Terms({ rentals, selectedId, onTermSelected }: TermsProps) {
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
              onChange={() => onTermSelected(rental.id)}
              style={{ marginTop: "12px", marginRight: "8px", display: (selectedId != null) ? "flex" : "none" }}
            />
            <span onClick={() => onTermSelected(rental.id)} key={rental.id} className="titleLarge" style={{ marginTop: "8px" }}>{rental.start}</span>
          </div>
        ))}
      </>
    );
  }
}


export default AdminTermsPage;