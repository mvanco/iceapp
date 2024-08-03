import CurrentConfig from "../model/Config";
import { register, RegisterError } from "../repo/RegisterRepo";

export namespace Register {
  enum ErrorCode {
    UsernameRequired = "Jméno nebylo zadáno.",
    PasswordRequired = "Heslo nebylo zadáno",
    EmailRequired = "Email je vyžadován.",
    StadiumRequired = "Kód stadionu je vyžadován",
    StadiumDoesNotExist = "Tento kód stadionu neexistuje.",
    InvalidUsername = "Toto uživatelské jméno nelze použít.",
    UsernameTaken = "Uživatelské jméno je obsazeno.",
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
  }

  export interface Idle {
    type: Type.Idle;
  }

  export interface Loading {
    type: Type.Loading;
  }

  export type State = Error | Success | Idle | Loading;


  interface RegisterViewModelType {
    uiState: State;
    register: (username: string, password: string, email: string, stadiumCode: string) => Promise<RegisterViewModelType>;
    clearError: () => RegisterViewModelType
  }

  
  export const RegisterViewModel: RegisterViewModelType = {
    uiState: { type: Type.Idle },
    register: async function(username, password, email, stadiumCode): Promise<RegisterViewModelType> {
      const result = await register(username, password, email, stadiumCode);

      if (typeof result === "object") {
        return { ...this, uiState: { type: Type.Success } }
      } else {
        let error = ErrorCode.Unknown;
        switch (result as RegisterError) {
          case RegisterError.UsernameRequired: error = ErrorCode.UsernameRequired; break;
          case RegisterError.PasswordRequired: error = ErrorCode.PasswordRequired; break;
          case RegisterError.EmailRequired: error = ErrorCode.EmailRequired; break;
          case RegisterError.StadiumRequired: error = ErrorCode.StadiumRequired; break;
          case RegisterError.StadiumDoesNotExist: error = ErrorCode.StadiumDoesNotExist; break;
          case RegisterError.InvalidUsername: error = ErrorCode.InvalidUsername; break;
          case RegisterError.UsernameTaken: error = ErrorCode.UsernameTaken; break;
          case RegisterError.Unknown: error = ErrorCode.Unknown; break;
        }
        return { ...this, uiState: { type: Type.Error, errorCode: error } }
      }
    },
    clearError: function(): RegisterViewModelType {
      return { ...this, uiState: { type: Type.Idle } }
    }
  }
} 