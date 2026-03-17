// "https://api.bigdatacloud.net/data/reverse-geocode-client"
/* curl -s https://api.frankfurter.dev/v1/currencies */
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import CityItem from "./CityItem";
import useUrlPosition from "../hooks/useUrlPosition";
import ErrorMsg from "./ErrorMsg";
import useTrip from "../hooks/useTrip";
import DatePicker from "react-datepicker";
import Loader from "./Loader";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, Link } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { createTrip } = useTrip();
  const navigate = useNavigate();

  function handleAddCity(cityInfo) {
    const { cityName, country, countryCode, lat, lng } = cityInfo;
    setCities((curr) => {
      const newCity = {
        cityName,
        country,
        countryCode,
        lat,
        lng,
        id: Date.now(),
        order: curr.length + 1,
      };

      return [...curr, newCity];
    });
    setCityName("");
  }

  function handleDeleteCity(id) {
    setCities((curr) => curr.filter((city) => city.id !== id));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trip = {
      userId: 1,
      tripName,
      baseCurrency,
      startDate,
      endDate,
    };
    // console.log(trip);
    // console.log(cities);
    await createTrip(trip, cities);
    navigate("/app/trips");
  }

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoading(true);
        setError("");
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

        if (!countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉",
          );

        setCityName(city ? city : locality);

        const cityInfo = {
          cityName: city ? city : locality,
          country: countryName,
          countryCode,
          lat: latitude,
          lng: longitude,
        };

        setCityInfo(cityInfo);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  useEffect(() => {
    async function fetchCurrencyList() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${BASE_URL_CURRENCY}`);
        const data = await res.json();

        setCurrencyList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCurrencyList();
  }, []);

  if (isLoading) return <Loader />;
  if (!lat && !lng)
    return <ErrorMsg message="Start by clicking somewhere on the map" />;
  if (error) return <ErrorMsg message={error} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formFields}>
        <Link className={styles.backBtn} to="/app/trips">
          <i className="fa-solid fa-left-long"></i>
        </Link>
        <div className={styles.row}>
          <label htmlFor="tripName">Trip name</label>
          <input
            id="tripName"
            placeholder="My first trip"
            required
            onChange={(e) => setTripName(e.target.value)}
            value={tripName}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="startDate">Departure date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            required
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
            required
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
            placeholder="Delhi"
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
          <CityItem city={city} key={city.id} onDeleteCity={handleDeleteCity} />
        ))}
      </ul>

      <div className={styles.buttons}>
        <button className={styles.btn}>Add trip</button>
      </div>
    </form>
  );
}
