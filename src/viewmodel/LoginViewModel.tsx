import CurrentConfig from "../model/Config";
import { login, LoginError } from "../repo/LoginRepo";

export namespace Login {
  enum ErrorCode {
    IncorrectUsername = "Uživatelské jméno neexistuje.",
    IncorrectPassword = "Špatné heslo.",
    Unknown = "Nastala neznámá chyba."
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
    userId: number;
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
    clearError: () => LoginViewModelType
  }

  
  export const LoginViewModel: LoginViewModelType = {
    uiState: { type: Type.Idle },
    login: async function(username, password): Promise<LoginViewModelType> {
      const result = await login(username, password);

      if (typeof result === "object" && "token" in result) {
        CurrentConfig.token = result.token;
        CurrentConfig.userId = result.userId;
        CurrentConfig.validity = result.validity;
        return { ...this, uiState: { type: Type.Success, userId: result.userId } }
      } else {
        return { ...this, uiState: { type: Type.Error, errorCode: ErrorCode.IncorrectPassword } }
      }
    },
    clearError: function(): LoginViewModelType {
      return { ...this, uiState: { type: Type.Idle } }
    }
  }
} 