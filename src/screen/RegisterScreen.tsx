import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Register } from "../viewmodel/RegisterViewModel";
import CurrentConfig from "../model/Config";


interface RegisterScreenProps { }

const RegisterScreen = ({ }: RegisterScreenProps) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [stadiumCode, setStadiumCode] = useState('');
  const [viewModel, setViewModel] = useState(Register.RegisterViewModel);
  const navigate = useNavigate();

  useEffect(() => {
    if (viewModel.uiState.type === Register.Type.Success) {
      navigate("/");
    } else if (viewModel.uiState.type === Register.Type.Error) {
      setTimeout(() => setViewModel(Register.RegisterViewModel.clearError()), CurrentConfig.ToastLengthShort);
    }
  }, [viewModel]);

  return (
    <div className="LoginScreenContainer">
      <div className="LoginScreen" style={(viewModel.uiState.type === Register.Type.Error) ? { display: "none" } : { display: "flex" }}>
        <h1>Registrace</h1>
        <input
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Uživatel"
        />
        <input
          type="text"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Heslo"
          style={{ marginTop: "16px" }}
        />
        <input
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="E-mail"
          style={{ marginTop: "16px" }}
        />
        <input
          type="text"
          value={stadiumCode}
          onChange={(event) => {
            setStadiumCode(event.target.value);
          }}
          placeholder="Kód stadionu"
          style={{ marginTop: "16px" }}
        />
        <button
          onClick={async () => {
            const newVM = await Register.RegisterViewModel.register(username, password, email, stadiumCode);
            setViewModel(newVM);
          }}
          style={{ marginTop: "16px", marginBottom: "64px" }}
        >Registrovat</button>
      </div>
      <div className="ErrorOverlay" style={(viewModel.uiState.type === Register.Type.Error) ? { display: "flex" } : { display: "none" }}>
        <h2>{(viewModel.uiState as Register.Error)?.errorCode || "Unknown error."}</h2>
      </div>
      <div className="Menu">
        <Link to="/">Přihlášení</Link>
      </div>
    </div>
  )
}

export default RegisterScreen