import CurrentConfig from "../model/Config";


enum LoginError {
  Incompatibility = "incompatibility",
  IncorrectUsername = "incorrect-username",
  IncorrectPassword = "incorrect-password",
  Unknown = "unknown"
}

interface LoginData {
  token: string;
  validity: string;
  userId: number;
}

async function login(username: string, password: string): Promise<LoginData | LoginError> {
  try {
    const bodyData = JSON.stringify({
      username: username,
      password: password,
      device_id: "unknown"
    })
    const response = await fetch(`${CurrentConfig.RestApiUrl}/login`, {
      method: 'POST',
      body: bodyData,
    });

    if (!response.ok) {
      return LoginError.Unknown;
    }

    const data = await response.json();

    for (const value of Object.values(LoginError)) {
      if (data.error === value) {
        return value;
      }
    }

    console.error('Got data: ', data.result);
    return { token: data.result.token, userId: data.result.user_id, validity: data.result.validity }

  } catch (error) {
    console.error('Error fetching data:', error);
    return LoginError.Unknown;
  }
};

export {
  login, LoginError
}