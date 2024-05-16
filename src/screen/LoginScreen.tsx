import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Login } from "../viewmodel/LoginViewModel";

const navigateToInternal = (username: string, password: string) => {
  Login.LoginViewModel.login(username, password)
}

const LoginScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viewModel, setViewModel] = useState(Login.LoginViewModel);
  const navigate = useNavigate();

  useEffect(() => {
    if (viewModel.uiState.type === Login.Type.Success) {
      navigate("/internal");
    } else if (viewModel.uiState.type === Login.Type.Error) {
      setTimeout(() => setViewModel(Login.LoginViewModel.clearError()), 1000);
    }
  }, [viewModel]);

  return (
    <div className="LoginScreen">
      <h2>{(viewModel.uiState.type === Login.Type.Error ) ? viewModel.uiState.errorCode : "Login"}</h2>
      <input
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        placeholder="Enter username"
      />
      <input
        type="text"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Enter password"
        style={{ marginTop: "16px" }}
      />
      <button
        onClick={ async () => setViewModel(await Login.LoginViewModel.login(username, password)) }
        style={{ marginTop: "16px" }}
      >Log in</button>
    </div>
  )
}

export default LoginScreen