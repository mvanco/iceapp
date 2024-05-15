
enum LoginError {
  Incompatibility = "",
  IncorrectUsername = "incorrect-username",
  IncorrectPassword = "incorrect-password",
  Unknown = ""
}

interface LoginData {
  token: string;
  validity: string;
  userId: number;
}

export function login(username: string, password: string): LoginData | LoginError {
  return {
    token: "bla",
    validity: "bla",
    userId: 3
  }
}