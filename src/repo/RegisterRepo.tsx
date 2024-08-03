import CurrentConfig from "../model/Config";


enum RegisterError {
  UsernameRequired = "username-required",
  PasswordRequired = "password-required",
  EmailRequired = "email-required",
  StadiumRequired = "stadium-required",
  StadiumDoesNotExist = "stadium-does-not-exist",
  InvalidUsername = "invalid-username",
  UsernameTaken = "username-taken",
  Unknown = "unknown"
}

interface RegisterData {
}

async function register(username: string, password: string, email: string, stadiumCode: string): Promise<RegisterData | RegisterError> {
  try {
    const bodyData = new URLSearchParams();
    bodyData.append("username", username);
    bodyData.append("password", password);
    bodyData.append("email", email);
    bodyData.append("stadium_code", stadiumCode);
    const response = await fetch(`${CurrentConfig.RestApiUrl}/register`, {
      method: 'POST',
      body: bodyData
    });

    if (!response.ok) {
      return RegisterError.Unknown;
    }

    const data = await response.json();

    for (const value of Object.values(RegisterError)) {
      if (data.error === value) {
        return value;
      }
    }

    console.error('Got data: ', data.result);
    return {};

  } catch(error) {
    console.error('Error fetching data:', error);
    return RegisterError.Unknown;
  }
};

export {
  register, RegisterError
}