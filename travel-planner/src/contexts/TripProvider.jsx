import { createContext, useEffect, useReducer } from "react";

const TripContext = createContext();
const BASE_URL = "http://localhost:8000";
const initialState = {
  isLoading: false,
  error: "",
  trips: [],
  trip: null,
  cities: [],
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "error":
      return { ...state, error: payload, isLoading: false };
    case "tripsDataReceived":
      return { ...state, trips: payload, isLoading: false };
    case "tripDataReceived":
      return {
        ...state,
        trip: payload.trip,
        cities: payload.cities,
        isLoading: false,
      };
    default:
      throw new Error("Action unknown!");
  }
}

function TripProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { trips, trip, cities, isLoading, error } = state;

  useEffect(() => {
    async function fetchTrips() {
      try {
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL}/trips`);
        const trips = await res.json();

        const userTrips = trips.filter((trip) => trip.userId === 1);

        dispatch({ type: "tripsDataReceived", payload: userTrips });
      } catch (err) {
        dispatch({ type: "error", payload: err });
      }
    }
    fetchTrips();
  }, []);

  async function getCurrentTrip(id) {
    try {
      dispatch({ type: "loading" });

      const tripRes = await fetch(`${BASE_URL}/trips/${id}`);
      const trip = await tripRes.json();

      const cityRes = await fetch(`${BASE_URL}/cities`);
      const cities = await cityRes.json();

      const selectedCities = cities.filter(
        (city) => city.tripId === Number(id),
      );

      dispatch({
        type: "tripDataReceived",
        payload: { trip, cities: selectedCities },
      });
    } catch (err) {
      dispatch({ type: "error", payload: err });
    }
  }

  return (
    <TripContext.Provider
      value={{ trips, trip, cities, getCurrentTrip, isLoading, error }}
    >
      {children}
    </TripContext.Provider>
  );
}

export { TripProvider, TripContext };
