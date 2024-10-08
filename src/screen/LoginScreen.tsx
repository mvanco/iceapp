import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Login } from "../viewmodel/LoginViewModel";
import CurrentConfig from "../model/Config";
import { ConsoleRepo } from "../repo/ConsoleRepo";
import User from "../model/User";

const navigateToInternal = (username: string, password: string) => {
  Login.LoginViewModel.login(username, password)
}

interface LoginScreenProps {
  setLoggedIn: (value: boolean) => void
}

const LoginScreen = ({setLoggedIn}: LoginScreenProps) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viewModel, setViewModel] = useState(Login.LoginViewModel);
  const navigate = useNavigate();

  useEffect(() => {
    async function handleLoginScreen() {
      if (viewModel.uiState.type === Login.Type.Success) {
        const profile = await ConsoleRepo.profile();
        if ((profile as User)?.username?.startsWith('admin_') === true) {
          navigate("/admin");
        }
        else {
          navigate("/internal");
        }
      } else if (viewModel.uiState.type === Login.Type.Error) {
        setTimeout(() => setViewModel(Login.LoginViewModel.clearError()), CurrentConfig.ToastLengthShort);
      }
    }
    handleLoginScreen();
  }, [viewModel]);

  return (
    <div className="LoginScreenContainer">
      <div className="LoginScreen" style={(viewModel.uiState.type === Login.Type.Error) ? { display: "none" } : { display: "flex" }}>
        <h1>Attendance</h1>
        <input
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Uživatel"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Heslo"
          style={{ marginTop: "16px" }}
        />
        <button
          onClick={async () => {
            const newVM = await Login.LoginViewModel.login(username, password);
            setViewModel(newVM);
            setLoggedIn(newVM.uiState.type == Login.Type.Success);
          }}
          style={{ marginTop: "16px", marginBottom: "64px" }}
        >Přihlásit</button>
      </div>
      <div className="ErrorOverlay" style={(viewModel.uiState.type === Login.Type.Error) ? { display: "flex" } : { display: "none" }}>

        <h2>{(viewModel.uiState as Login.Error)?.errorCode || "Unknown error."}</h2>
      </div>
      <div className="Menu">
        <Link to="/register">Registrace</Link>
      </div>
    </div>
  )
}

export default LoginScreen;