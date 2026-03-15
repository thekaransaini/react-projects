// "https://api.bigdatacloud.net/data/reverse-geocode-client"
/* curl -s https://api.frankfurter.dev/v1/currencies */
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import CityItem from "./CityItem";
import useUrlPosition from "../hooks/useUrlPosition";
import ErrorMsg from "./ErrorMsg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL_CURRENCY = "https://api.frankfurter.dev/v1/currencies";
const BASE_URL_CITY =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function Form() {
  const [lat, lng] = useUrlPosition();
  const [tripName, setTripName] = useState("");
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);
  const [cityInfo, setCityInfo] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [baseCurrency, setBaseCurrency] = useState("");
  const [currencyList, setCurrencyList] = useState({});

  console.log(cities);

  function handleAddCity(cityInfo) {
    setCities((curr) => [...curr, cityInfo]);
    setCityName("");
  }

  useEffect(() => {
    async function fetchCityData() {
      try {
        const res = await fetch(
          `${BASE_URL_CITY}?latitude=${lat}&longitude=${lng}`,
        );
        const data = await res.json();
        const {
          city,
          countryCode,
          countryName,
          latitude,
          longitude,
          locality,
        } = data;

        setCityName(city ? city : locality);

        const cityInfo = {
          cityName: city ? city : locality,
          country: countryName,
          countryCode,
          lat: latitude,
          lng: longitude,
        };
        console.log(cityInfo);

        setCityInfo(cityInfo);

        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  useEffect(() => {
    async function fetchCurrencyList() {
      try {
        const res = await fetch(`${BASE_URL_CURRENCY}`);
        const data = await res.json();

        setCurrencyList(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCurrencyList();
  }, []);

  return (
    <form className={styles.form}>
      <div className={styles.formFields}>
        <div className={styles.row}>
          <label htmlFor="tripName">Trip name</label>
          <input
            id="tripName"
            onChange={(e) => setTripName(e.target.value)}
            value={tripName}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="startDate">Departure date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="endDate">Return date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="baseCurrency">
            Preferred currency for total expense
          </label>
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            <option value="">Select currency</option>
            {Object.entries(currencyList).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <span>
          <input
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <button
            className={styles.btn}
            onClick={(e) => {
              e.preventDefault();
              handleAddCity(cityInfo);
            }}
          >
            + Add city
          </button>
        </span>
      </div>

      <ul className={styles.cityList}>
        {cities.length === 0 && (
          <ErrorMsg
            message="No cities added yet,
Start by adding your first destination 🌍"
          />
        )}
        {cities.map((city) => (
          <CityItem city={city} key={city.cityName} />
        ))}
      </ul>

      <div className={styles.buttons}>
        <button className={styles.btn}>&larr; Back</button>
        <button className={styles.btn}>Add trip</button>
      </div>
    </form>
  );
}
