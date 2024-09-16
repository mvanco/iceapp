import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { predict } from "../repo/Repo";
import CurrentConfig from "../model/Config";
import { clear } from "console";
import { delay } from "../utils/Utils";


const PredictionScreen = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [households, setHouseholds] = useState('');
  const [housingMedianAge, setHousingMedianAge] = useState('');
  const [medianIncome, setMedianIncome] = useState('');
  const [population, setPopulation] = useState('');
  const [totalBedrooms, setTotalBedrooms] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [oceanProximity, setOceanProximity] = useState('');
  const [y, setY] = useState('');

  async function clearFields() {
    setLatitude("");
    setLongitude("");
    setHouseholds("");
    setHousingMedianAge("");
    setMedianIncome("");
    setPopulation("");
    setTotalBedrooms("");
    setTotalRooms("");
    setOceanProximity("");
    setY("");
  }

  return (
    <div className="LoginScreenContainer">
      <div className="LoginScreen" style={(errorMessage != "") ? { display: "none" } : { display: "flex" }}>
        <h1>Nová předpověď</h1>
        <input
          type="text"
          value={latitude}
          onChange={(event) => {
            setLatitude(event.target.value);
          }}
          placeholder="Latitude"
        />
        <input
          type="text"
          value={longitude}
          onChange={(event) => {
            setLongitude(event.target.value);
          }}
          placeholder="Longitude"
        />
        <input
          type="text"
          value={housingMedianAge}
          onChange={(event) => {
            setHousingMedianAge(event.target.value);
          }}
          placeholder="Housing Median Age"
        />
        <input
          type="text"
          value={totalRooms}
          onChange={(event) => {
            setTotalRooms(event.target.value);
          }}
          placeholder="Total Rooms"
        />
        <input
          type="text"
          value={totalBedrooms}
          onChange={(event) => {
            setTotalBedrooms(event.target.value);
          }}
          placeholder="Total Bedrooms"
        />
        <input
          required
          type="text"
          value={population}
          onChange={(event) => {
            setPopulation(event.target.value);
          }}
          placeholder="Population"
        />
        <input
          required
          type="text"
          value={households}
          onChange={(event) => {
            setHouseholds(event.target.value);
          }}
          placeholder="Households"
        />
        <input
          required
          type="text"
          value={medianIncome}
          onChange={(event) => {
            setMedianIncome(event.target.value);
          }}
          placeholder="Median Income"
        />
        <input
          required
          type="text"
          value={oceanProximity}
          onChange={(event) => {
            setOceanProximity(event.target.value);
          }}
          placeholder="Ocean Proximity"
        />
        <button
          onClick={async () => {
            const result = await predict(
              latitude, longitude, housingMedianAge, totalRooms, totalBedrooms, population, households, medianIncome, oceanProximity
            )
            if (typeof result === 'number') {
              setErrorMessage(`Median House Value: ${result}`);
              await delay(3000);
              clearFields();
              setErrorMessage(""); 
            }
          }}
          style={{ marginTop: "16px", marginBottom: "64px" }}
        >Spočítat</button>
      </div>
      <div className="ErrorOverlay" style={(errorMessage != "") ? { display: "flex" } : { display: "none" }}>
        <h2>{errorMessage || "Unknown error."}</h2>
      </div>
      <div className="Menu">
        <Link to="/">Historie předpovědí</Link>
      </div>
    </div>
  )
}

export default PredictionScreen