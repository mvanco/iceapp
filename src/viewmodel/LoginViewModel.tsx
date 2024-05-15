export namespace Login {
  enum ErrorCode {
    IncorrectUsername,
    IncorrectPassword,
    Unknown
  }

  export enum Type {
    Error,
    Success,
    Idle,
    Loading
  }

  export interface Error {
    type: Type.Error;
    errorCode: ErrorCode;
  }

  export interface Success {
    type: Type.Success;
    username: string;
  }

  export interface Idle {
    type: Type.Idle;
  }

  export interface Loading {
    type: Type.Loading;
  }

  export type State = Error | Success | Idle | Loading;


  interface LoginViewModelType {
    uiState: State;
    login: (username: string, password: string) => Promise<LoginViewModelType>;
  }

  
  export const LoginViewModel: LoginViewModelType = {
    uiState: { type: Type.Idle },
    login: async function(username, password): Promise<LoginViewModelType> {
      if (username === "karel" && password === "heslo") {
        await new Promise( (resolve) => {
          setTimeout(() => { resolve(null) }, 1000)
        });
        return { ...this, uiState: { type: Type.Success, username: "karel" } }
      }
      else {
        return { ...this, uiState: { type: Type.Error, errorCode: ErrorCode.IncorrectPassword } }
      }
    }
  }
} 