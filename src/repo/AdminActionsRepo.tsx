import CurrentConfig from "../model/Config";
import User from "../model/User";
import Interest from "../model/Interest";

export enum UsersErrorEnum {
  Unknown = "unknown"
}

 export interface UsersError {
  error: UsersErrorEnum;
}

export interface UserResponse {
  id: number,
  username: string,
  credit: number
}

enum ChangeCreditErrorEnum {
  Unknown = "unknown"
}

interface ChangeCreditError {
  error: ChangeCreditErrorEnum
}

interface ChangeCreditResponse {
  previous_credit: number,
  current_credit: number
}

class AdminActionsRepo {
  static async users(): Promise<UserResponse[] | UsersError> {
    if (CurrentConfig.token === undefined) {
      return {error: UsersErrorEnum.Unknown};
    }
    try {
      const bodyData = new URLSearchParams();
      bodyData.append("token", CurrentConfig.token);
      const response = await fetch(`${CurrentConfig.RestApiUrl}/users`, {
        method: 'POST',
        body: bodyData
      });
      if (!response.ok) {
        return {error: UsersErrorEnum.Unknown};
      }
      const data = await response.json();

      //console.error('Successful fetch', data);
      for (const value of Object.values(UsersErrorEnum)) {
        if (data.error === value) {
          return {error: value};;
        }
      }
      return data.users;
    } catch(error) {
      console.error('Error fetching data:', error);
      return {error: UsersErrorEnum.Unknown};
    }
  }

  static async changeCredit(user: number, credit: number): Promise<ChangeCreditResponse | ChangeCreditError> {
    if (CurrentConfig.token === undefined) {
      return {error: ChangeCreditErrorEnum.Unknown};
    }
    try {
      const bodyData = new URLSearchParams();
      bodyData.append("token", CurrentConfig.token);
      bodyData.append("user", user.toString());
      bodyData.append("credit", credit.toString());
      const response = await fetch(`${CurrentConfig.RestApiUrl}/change_credit`, {
        method: 'POST',
        body: bodyData
      });
      //console.error('Successful fetch', response);
      if (!response.ok) {
        return {error: ChangeCreditErrorEnum.Unknown};
      }
      const data = await response.json();
      for (const value of Object.values(ChangeCreditErrorEnum)) {
        if (data.error === value) {
          return {error: value};
        }
      }
      return data;
    } catch(error) {
      console.error('Error fetching data:', error);
      return {error: ChangeCreditErrorEnum.Unknown};
    }
  }
}

export {
  AdminActionsRepo
}