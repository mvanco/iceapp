import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import CurrentConfig from "../model/Config";
import Prediction from "../model/Prediction";
import { error } from "console";
import { history } from "../repo/Repo";


const HistoryScreen = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>();

  useEffect(() => {
    async function handleHistoryScreen() {
      const result = await history();
      if (Array.isArray(result)) {
        setPredictions(result);
      }
    }
    handleHistoryScreen();
  }, []);

  return (
    <div className="LoginScreenContainer">
      <div className="LoginScreen" style={(errorMessage != "") ? { display: "none" } : { display: "flex" }}>
        <h1>Historie předpovědí</h1>
        <Predictions items={predictions}/>
      </div>
      <div className="ErrorOverlay" style={(errorMessage != "") ? { display: "flex" } : { display: "none" }}>
        <h2>{errorMessage || "Unknown error."}</h2>
      </div>
      <div className="Menu">
        <Link to="/new">Nová předpověď</Link>
      </div>
    </div>
  )
}

interface PredictionsProps {
  items: Prediction[] | undefined;
}

function Predictions({ items }: PredictionsProps) {
  if (items === undefined || items.length == 0) {
    return (<span className="titleLarge" style={{ marginTop: "8px" }}>Není zde žádný historický záznam.</span>);
  }
  else {
    return (
      <>
        {items.map(item => (
          <PredictionElement prediction={item} />
        ))}
      </>
    );
  }
}

interface PredictionProps {
  prediction: Prediction;
}

function PredictionElement({ prediction }: PredictionProps) {
  return (
    <div className="Card" style={{ margin: "10px" }}>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Timestamp: {prediction.ts.toLocaleString()}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Latitude: {prediction.latitude}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Longitude: {prediction.longitude}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Households: {prediction.households}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Housing Median Age: {prediction.housing_median_age}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Median Income: {prediction.median_income}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Population: {prediction.population}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Total Bedrooms: {prediction.total_bedrooms}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Total Rooms: {prediction.total_rooms}</span>
      <span className="titleLarge" style={{ marginTop: "8px" }}>Ocean Proximity: {prediction.oceanProximity}</span>
      <span className="titleLarge" style={{ marginTop: "8px", color: "#8000ff" }}>Y: {prediction.y}</span>
    </div>
  );
}

export default HistoryScreen;