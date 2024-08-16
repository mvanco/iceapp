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

  static async rentals(): Promise<Rentals.Response[] | Rentals.Error> {
    if (CurrentConfig.token === undefined) {
      return {error: Rentals.ErrorEnum.Unknown};
    }
    try {
      const bodyData = new URLSearchParams();
      bodyData.append("token", CurrentConfig.token);
      const response = await fetch(`${CurrentConfig.RestApiUrl}/rentals`, {
        method: "POST",
        body: bodyData
      });
      if (!response.ok) {
        return {error: Rentals.ErrorEnum.Unknown};
      }
      const data = await response.json();

      if (data.error !== undefined) {
        for (const value of Object.values(Rentals.ErrorEnum)) {
          if (data.error === value) {
            return {error: value};;
          }
        }
        return {error: Rentals.ErrorEnum.Unknown};
      }

      return data.rentals.map((rental: Rentals.ApiResponse) => ({
        id: rental.id,
        start: rental.start,
        duration: rental.duration,
        price: rental.price,
        minCapacity: rental.min_capacity,
        maxCapacity: rental.max_capacity,
        registered: rental.registered,
        confirmed: rental.confirmed,
        paid: rental.paid == 1
      }));
    } catch(error) {
      console.error('Error fetching data:', error);
      return {error: Rentals.ErrorEnum.Unknown};
    }
  }

  static async deleteRental(id: number) {
    if (CurrentConfig.token === undefined) {
      return {error: DeleteRental.ErrorEnum.Unknown};
    }
    try {
      const bodyData = new URLSearchParams();
      bodyData.append("token", CurrentConfig.token);
      bodyData.append("rental_id", id.toString());
      const response = await fetch(`${CurrentConfig.RestApiUrl}/delete_rental`, {
        method: "POST",
        body: bodyData
      });
      if (!response.ok) {
        return {error: DeleteRental.ErrorEnum.Unknown};
      }
      const data = await response.json();

      if (data.error !== undefined) {
        for (const value of Object.values(DeleteRental.ErrorEnum)) {
          if (data.error === value) {
            return {error: value};;
          }
        }
        return {error: DeleteRental.ErrorEnum.Unknown};
      }

      return {};
    } catch(error) {
      console.error('Error fetching data:', error);
      return {error: DeleteRental.ErrorEnum.Unknown};
    }
  }


  /**
   * Add new rental to database for currently logged-in admin.
   * @param start Start date and time of rental using format e.g. 2024-11-22T11:11
   * @param duration Rental duration in minutes
   * @param price Price in CZK or EUR
   * @param minCapacity Minimum capacity for rental
   * @param maxCapacity Maximum capacity for rental
   * @returns nothing
   */
  static async addRental(
    start: string,
    duration: number,
    price: number,
    minCapacity: number,
    maxCapacity: number
  ) {
    if (CurrentConfig.token === undefined) {
      return {error: AddRental.ErrorEnum.Unknown};
    }
    try {
      const bodyData = new URLSearchParams();
      bodyData.append("token", CurrentConfig.token);
      bodyData.append("start", start);
      bodyData.append("duration", duration.toString());
      bodyData.append("price", price.toString());
      bodyData.append("min_capacity", minCapacity.toString());
      bodyData.append("max_capacity", maxCapacity.toString());
      const response = await fetch(`${CurrentConfig.RestApiUrl}/add_rental`, {
        method: "POST",
        body: bodyData
      });
      if (!response.ok) {
        return {error: AddRental.ErrorEnum.Unknown};
      }
      const data = await response.json();

      if (data.error !== undefined) {
        for (const value of Object.values(AddRental.ErrorEnum)) {
          if (data.error === value) {
            return {error: value};;
          }
        }
        return {error: AddRental.ErrorEnum.Unknown};
      }

      return {};
    } catch(error) {
      console.error('Error fetching data:', error);
      return {error: AddRental.ErrorEnum.Unknown};
    }
  }
}

export namespace Rentals {
  export interface ApiResponse {
    id: number,
    start: string,
    duration: number,
    price: number,
    min_capacity: number,
    max_capacity: number,
    registered: number,
    confirmed: number,
    paid: number
  }
  export interface Response {
    id: number,
    start: string,
    duration: number,
    price: number,
    minCapacity: number,
    maxCapacity: number,
    registered: number,
    confirmed: number,
    paid: boolean
  }

  export enum ErrorEnum {
    Unknown = "unknown"
  }

  export interface Error {
    error: ErrorEnum
  }
}

export namespace DeleteRental {
  export interface Response {}

  export enum ErrorEnum {
     Unknown = "unknown"
  }

  export interface Error {
    error: ErrorEnum
  }
}

export namespace AddRental {
  export interface Response {}

  export enum ErrorEnum {
     Unknown = "unknown"
  }

  export interface Error {
    error: ErrorEnum
  }
}

export {
  AdminActionsRepo
}