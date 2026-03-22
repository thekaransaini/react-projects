import { createContext, useEffect, useReducer, useState } from "react";

const TripContext = createContext();
const BASE_URL = "http://localhost:8000";
const initialState = {
  isLoading: false,
  error: "",
  trips: [],
  trip: null,
  packingList: [],
  expenses: [],
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
        packingList: payload.packingList,
        expenses: payload.expenses,
        isLoading: false,
      };
    case "newTripCreated":
      return {
        ...state,
        trips: [...state.trips, payload],
        isLoading: false,
      };
    case "newCitiesCreated":
      return {
        ...state,
        cities: [...state.cities, payload],
        isLoading: false,
      };
    case "tripDeleted":
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== payload),
        cities: state.cities.filter((city) => city.tripId !== payload),
        isLoading: false,
      };
    case "newPackingItemCreated":
      return {
        ...state,
        packingList: [...state.packingList, payload],
        isLoading: false,
      };
    case "updatePackingItem":
      return {
        ...state,
        packingList: state.packingList.map((item) =>
          item.id === payload.id ? { ...item, packed: payload.packed } : item,
        ),
        isLoading: false,
      };
    case "deletePackingItem":
      return {
        ...state,
        packingList: state.packingList.filter((item) => item.id !== payload),
        isLoading: false,
      };
    case "newExpenseCreated":
      return {
        ...state,
        expenses: [...state.expenses, payload],
        isLoading: false,
      };
    case "deleteExpense":
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== payload),
        isLoading: false,
      };
    default:
      throw new Error("Action unknown!");
  }
}

function TripProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { trips, trip, cities, isLoading, error, packingList, expenses } =
    state;
  const [currencyRates, setCurrencyRates] = useState({});

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

  useEffect(() => {
    async function fetchCurrencyRates() {
      if (!trip?.id) return;
      try {
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${trip.baseCurrency}`,
        );
        const data = await res.json();
        setCurrencyRates(data.rates);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchCurrencyRates();
  }, [trip]);

  const totalTripExpense = expenses.reduce((acc, expense) => {
    const totalItemPrice = Number(expense.quantity) * Number(expense.rate);
    const convertedTotalItemPrice =
      trip.baseCurrency === expense.currency
        ? totalItemPrice
        : totalItemPrice / currencyRates[expense.currency];
    return acc + convertedTotalItemPrice;
  }, 0);

  const formattedTotalTripExpense = totalTripExpense.toLocaleString("en-IN", {
    style: "currency",
    currency: trip?.baseCurrency || "INR",
    minimumFractionDigits: 2,
  });

  async function getCurrentTrip(id) {
    try {
      dispatch({ type: "loading" });

      const tripRes = await fetch(`${BASE_URL}/trips/${id}`);
      const trip = await tripRes.json();

      const cityRes = await fetch(`${BASE_URL}/cities?tripId=${id}`);
      const selectedCities = await cityRes.json();

      const packingListRes = await fetch(
        `${BASE_URL}/packingItems?tripId=${id}`,
      );
      const packingList = await packingListRes.json();
      // console.log(packingListRes);
      // console.log(packingList);

      const expensesRes = await fetch(`${BASE_URL}/expenses?tripId=${id}`);
      const expenses = await expensesRes.json();
      // console.log(expensesRes);
      // console.log(expenses);

      dispatch({
        type: "tripDataReceived",
        payload: { trip, cities: selectedCities, packingList, expenses },
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
    try {
      dispatch({ type: "loading" });
      const tripRes = await fetch(`${BASE_URL}/trips`, {
        method: "POST",
        body: JSON.stringify(trip),
        headers: { "Content-Type": "application/json" },
      });

      const newTrip = await tripRes.json();

      dispatch({ type: "newTripCreated", payload: newTrip });

      for (const city of cities) {
        const { cityName, country, countryCode, lat, lng, order } = city;
        await fetch(`${BASE_URL}/cities`, {
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
      }
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error creating the trip...",
      });
    }
  }

  async function deleteTrip(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities?tripId=${id}`);
      const tripCities = await res.json();

      await Promise.all(
        tripCities.map((city) =>
          fetch(`${BASE_URL}/cities/${city.id}`, {
            method: "DELETE",
          }),
        ),
      );

      await fetch(`${BASE_URL}/trips/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "tripDeleted", payload: id });
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error in deleting the trip...",
      });
    }
  }

  async function createPackingItem(id, item) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/packingItems`, {
        method: "POST",
        body: JSON.stringify({
          tripId: id,
          itemName: item.itemName,
          quantity: item.quantity,
          packed: item.packed,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "newPackingItemCreated", payload: data });
      // console.log(res);
      // console.log(data);
      // console.log(packingList);
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error in creating the packing item...",
      });
    }
  }

  async function updatePackingItem(packed, id) {
    console.log("triprovider", id, packed);
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/packingItems/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          packed: packed,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(res);
      console.log(data);
      dispatch({ type: "updatePackingItem", payload: { id, packed } });
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error in updating the packing item...",
      });
    }
  }

  async function deletePackingItem(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/packingItems/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      dispatch({ type: "deletePackingItem", payload: id });
      console.log(res);
      console.log(data);
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error in deleting the packing item...",
      });
    }
  }

  async function createExpense(id, expense) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/expenses`, {
        method: "POST",
        body: JSON.stringify({
          tripId: id,
          itemName: expense.itemName,
          quantity: expense.quantity,
          rate: expense.rate,
          currency: expense.currency,
          category: expense.category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "newExpenseCreated", payload: data });
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error in creating the packing item...",
      });
    }
  }

  async function deleteExpense(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/expenses/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      dispatch({ type: "deleteExpense", payload: id });
      console.log(res);
      console.log(data);
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error in deleting the packing item...",
      });
    }
  }

  return (
    <TripContext.Provider
      value={{
        trips,
        trip,
        cities,
        packingList,
        expenses,
        getCurrentTrip,
        isLoading,
        error,
        createTrip,
        deleteTrip,
        createPackingItem,
        updatePackingItem,
        deletePackingItem,
        createExpense,
        deleteExpense,
        formattedTotalTripExpense,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export { TripProvider, TripContext };
