import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Login } from "../viewmodel/LoginViewModel";
import CurrentConfig from "../model/Config";
import { ConsoleRepo } from "../repo/ConsoleRepo";
import User from "../model/User";
import { UsersViewModel } from "../viewmodel/UsersViewModel";
import { Idle, Message } from "../viewmodel/UsersViewModel";

interface AdminUsersPageProps {
}

const AdminUsersPage = ({}: AdminUsersPageProps) => {
  const [uiState, setUiState] = useState<Idle | Message>(new Idle());

  useEffect(() => {
    // Sync viewModel state with component state
    const updateState = async () => {
      await (new UsersViewModel(uiState, setUiState)).selectUser();
    };
    updateState();
  }, []);

  return (
    <div className="SubPageSwitcher">
      <div className="SubPage" style={uiState instanceof Idle ? { display: "flex" } : { display: "none" }}>
        <span className="headlineLarge">Hardcoded</span>
      </div>
      <div className="SubPage override" style={uiState instanceof Message ? { display: "flex" } : { display: "none" }}>
        <h2>OMG</h2>
      </div>
    </div>
  );
}


export default AdminUsersPage;