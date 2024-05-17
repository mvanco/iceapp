import CurrentConfig from "../model/Config";
import User from "../model/User";
import Interest from "../model/Interest";

enum ConsoleError {
  InvalidToken = "invalid-token",
  InsufficientCredit = "insufficient-credit",
  Unknown = "unknown"
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
      return [{ duration: 2, price: 3, rentalId: 3, start: new Date("2024-03-23"), registered: true }];
    } catch(error) {
      console.error('Error fetching data:', error);
      return ConsoleError.Unknown;
    }
  }
}

export {
  ConsoleRepo, ConsoleError
}




