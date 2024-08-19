import CurrentConfig from "../model/Config";
import User from "../model/User";
import Interest from "../model/Interest";
import moment from "moment";

enum ConsoleError {
  InvalidToken = "invalid-token",
  InsufficientCredit = "insufficient-credit",
  Unknown = "unknown"
}

interface InterestsResponse {
  start: string,
  duration: number,
  price: number,
  rental_id: number,
  registered: number
}

class ConsoleRepo {
  static async profile(): Promise<User | ConsoleError> {
    if (CurrentConfig.token === undefined) {
      return ConsoleError.InvalidToken;
    }
    try {
      const bodyData = new URLSearchParams();
      bodyData.append("token", CurrentConfig.token);
      const response = await fetch(`${CurrentConfig.RestApiUrl}/profile`, {
        method: 'POST',
        body: bodyData
      });
      if (!response.ok) {
        return ConsoleError.Unknown;
      }
      const data = await response.json();
      for (const value of Object.values(ConsoleError)) {
        if (data.error === value) {
          return value;
        }
      }
      return { username: data.username, email: data.email, credit: data.credit };
    } catch(error) {
      console.error('Error fetching data:', error);
      return ConsoleError.Unknown;
    }
  }

  static async interests(): Promise<Interest[] | ConsoleError> {
    if (CurrentConfig.token === undefined) {
      return ConsoleError.InvalidToken;
    }
    try {
      const bodyData = new URLSearchParams();
      bodyData.append("token", CurrentConfig.token);
      const response = await fetch(`${CurrentConfig.RestApiUrl}/interests`, {
        method: 'POST',
        body: bodyData
      });
      if (!response.ok) {
        return ConsoleError.Unknown;
      }
      const data = await response.json();
      for (const value of Object.values(ConsoleError)) {
        if (data.error === value) {
          return value;
        }
      }
      if (Array.isArray(data.interests)) {
        const result: Interest[] = data.interests.map((value: InterestsResponse) => {
          return { start: moment(value.start, "DD.MM.'YY HH:mm").toDate(), duration: value.duration, price: value.price, rentalId: value.rental_id, registered: (value.registered === 1) }
        });
        return result;
      }
      else {
        return ConsoleError.Unknown;
      }
    } catch(error) {
      console.error('Error fetching data:', error);
      return ConsoleError.Unknown;
    }
  }

  static async registerTerm(rentalId: number): Promise<null | ConsoleError> {
    if (CurrentConfig.token === undefined) {
      return ConsoleError.InvalidToken;
    }
    try {
      const bodyData = new URLSearchParams();
      bodyData.append("token", CurrentConfig.token);
      bodyData.append("rental_id", rentalId.toString());
      const response = await fetch(`${CurrentConfig.RestApiUrl}/register_term`, {
        method: 'POST',
        body: bodyData
      });
      if (!response.ok) {
        return ConsoleError.Unknown;
      }
      const data = await response.json();
      for (const value of Object.values(ConsoleError)) {
        if (data.error === value) {
          return value;
        }
      }
      return null;
    } catch(error) {
      console.error('Error fetching data:', error);
      return ConsoleError.Unknown;
    }
  }
}

export {
  ConsoleRepo, ConsoleError
}




