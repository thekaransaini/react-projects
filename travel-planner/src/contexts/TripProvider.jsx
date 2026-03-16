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
  const { trips, cities } = state;

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
    case "newTripCreated":
      return {
        ...state,
        trips: [...trips, payload],
        isLoading: false,
      };
    case "newCitiesCreated":
      return {
        ...state,
        cities: [...cities, payload],
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

        const res = await fetch(`${BASE_URL}/trips?userId=${1}`);
        const userTrips = await res.json();

        dispatch({ type: "tripsDataReceived", payload: userTrips });
      } catch {
        dispatch({
          type: "error",
          payload:
            "There was an error loading data..., Try Again by refreshing the page",
        });
      }
    }
    fetchTrips();
  }, []);

  async function getCurrentTrip(id) {
    try {
      dispatch({ type: "loading" });

      const tripRes = await fetch(`${BASE_URL}/trips/${id}`);
      const trip = await tripRes.json();

      const cityRes = await fetch(`${BASE_URL}/cities?tripId=${id}`);
      const selectedCities = await cityRes.json();

      dispatch({
        type: "tripDataReceived",
        payload: { trip, cities: selectedCities },
      });
    } catch {
      dispatch({
        type: "error",
        payload:
          "There was an error loading the trip..., Try Again by refreshing the page",
      });
    }
  }

  async function createTrip(trip, cities) {
    const tripRes = await fetch(`${BASE_URL}/trips`, {
      method: "POST",
      body: JSON.stringify(trip),
      headers: { "Content-Type": "application/json" },
    });

    const newTrip = await tripRes.json();

    dispatch({ type: "newTripCreated", payload: newTrip });

    for (const city of cities) {
      const { cityName, country, countryCode, lat, lng, order } = city;
      const citiesRes = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify({
          tripId: newTrip.id,
          cityName,
          country,
          countryCode,
          lat,
          lng,
          order,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newCities = await citiesRes.json();

      dispatch({ type: "newCitiesCreated", payload: newCities });
    }
  }

  return (
    <TripContext.Provider
      value={{
        trips,
        trip,
        cities,
        getCurrentTrip,
        isLoading,
        error,
        createTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export { TripProvider, TripContext };
