import { Link } from "react-router-dom"
import { useState } from "react"
import { username, setUsername as setUsernameGlobal} from "../viewmodel/AppViewModel";

const LoginScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="LoginScreen">
      <h2>Login screen</h2>
      <input
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
          setUsernameGlobal(event.target.value);
        }}
        placeholder="Enter username"
      />
      <Link to="/internal" style={{ marginTop: "16px",  }}>Log in</Link>
    </div>
  )
}

export default LoginScreen