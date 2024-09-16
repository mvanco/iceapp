import CurrentConfig from "../model/Config";
import Prediction from "../model/Prediction";

enum PredictionError {
  Unknown = "unknown"
}

async function history(): Promise<Prediction[] | PredictionError> {
  try {
    const bodyData = new URLSearchParams();
    const response = await fetch(`${CurrentConfig.RestApiUrl}/history`, {
      method: 'POST',
      body: bodyData
    });

    if (!response.ok) {
      return PredictionError.Unknown;
    }

    const data = await response.json();

    for (const value of Object.values(PredictionError)) {
      if (data.error === value) {
        return value;
      }
    }

    console.error('Got data: ', data.predictions);
    return data.predictions

  } catch(error) {
    console.error('Error fetching data:', error);
    return PredictionError.Unknown;
  }
};

async function predict(
  latitude: string,
  longitude: string,
  housing_median_age: string,
  total_rooms: string,
  total_bedrooms: string,
  population: string,
  households: string,
  median_income: string,
  ocean_proximity: string
): Promise<number | PredictionError> {
  try {
    const bodyData = new URLSearchParams();
    bodyData.append("latitude", latitude);
    bodyData.append("longitude", longitude);
    bodyData.append("housing_median_age", housing_median_age);
    bodyData.append("total_rooms", total_rooms);
    bodyData.append("total_bedrooms", total_bedrooms);
    bodyData.append("population", population);
    bodyData.append("households", households);
    bodyData.append("median_income", median_income);
    bodyData.append("ocean_proximity", ocean_proximity);

    const response = await fetch(`${CurrentConfig.RestApiUrl}/predict`, {
      method: 'POST',
      body: bodyData
    });

    if (!response.ok) {
      return PredictionError.Unknown;
    }

    const data = await response.json();

    for (const value of Object.values(PredictionError)) {
      if (data.error === value) {
        return value;
      }
    }

    console.error('Got data: ', data.median_house_value);
    return data.median_house_value;

  } catch(error) {
    console.error('Error fetching data:', error);
    return PredictionError.Unknown;
  }
};

export {
  history, predict, PredictionError
}