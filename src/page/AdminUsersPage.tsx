import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { Login } from "../viewmodel/LoginViewModel";
import CurrentConfig from "../model/Config";
import { ConsoleRepo } from "../repo/ConsoleRepo";
import User from "../model/User";
import { UsersViewModel } from "../viewmodel/UsersViewModel";
import { Idle, Message, UiState, ViewModelUser } from "../viewmodel/UsersViewModel";
import { printUser } from "../utils/Utils";
import AddCreditDialog from "./AddCreditDialog";

function AdminUsersPage() {
  const [uiState, setUiState] = useState<UiState>(new Message(""));
  const [viewModel] = useState(new UsersViewModel(uiState, setUiState));

  useEffect(() => {
    async function fetchData() {
      viewModel.fetchData();
    };
    fetchData();
  }, []);

  async function handleDialogConfirmation(credit: number | null) {
    if (credit === null) {
      await viewModel.hideDialog();
    }
    else {
      await viewModel.hideDialog(); await viewModel.changeCredit(credit ?? 0); await viewModel.fetchData();
    }
  }

  return (
    <div className="SubPageSwitcher">
      <div className="SubPage" style={'users' in uiState ? { display: "flex" } : { display: "none" }}>
        <span className="headlineLarge">Uživatelé</span>
        <div className="TermsBox">
          <div className="scrollview">
            <Users users={(uiState as Idle)?.users ?? []} selectedId={(uiState as Idle)?.selectedId} onUserSelected={(id) => viewModel.selectUser(id)} />
          </div>
        </div>
      </div>
      <div className="SubPage override" style={'text' in uiState ? { display: "flex" } : { display: "none" }}>
        <h2>{(uiState as Message).text}</h2>
      </div>
      <a href="#" onClick={() => { viewModel.showDialog() }} style={{ position: "absolute", bottom: "32px", right: "32px", display: ((uiState as Idle).selectedId != null) ? "flex" : "none" }}>Přidat kredit</a>
      <AddCreditDialog username={(uiState as Idle).selectedName ?? ""} setCredit={(selectedCredit) => { handleDialogConfirmation(selectedCredit) }} style={{ position: "absolute", display: ((uiState as Idle).dialogShown) ? "flex" : "none" }} />
    </div>
  );
}

interface UsersProps {
  users: ViewModelUser[],
  selectedId: number | null,
  onUserSelected: (id: number) => void
}

function Users({ users, selectedId, onUserSelected }: UsersProps) {
  if (users.length == 0) {
    return (<span className="titleLarge" style={{ marginTop: "8px" }}>Zatím není registrován žádný uživatel.</span>);
  }
  else {
    return (
      <>
        {users.map(user => (
          <div className="flex-row">
            <input
              type="radio"
              value={user.id}
              checked={user.id == selectedId}
              onChange={() => onUserSelected(user.id)}
              style={{ marginTop: "12px", marginRight: "8px", display: (selectedId != null) ? "flex" : "none" }}
            />
            <span onClick={() => onUserSelected(user.id)} key={user.id} className="titleLarge" style={{ width: "80px", marginTop: "8px" }}>{user.username}</span>
            <span onClick={() => onUserSelected(user.id)} className="titleLarge" style={{ width: "80px", marginTop: "8px", marginRight: "16px", textAlign: "right" }}>{user.credit}</span>
          </div>
        ))}
      </>
    );
  }
}


export default AdminUsersPage;