import { useContext } from "react";
import { TripContext } from "../contexts/TripProvider";

export default function useTrip() {
  const context = useContext(TripContext);

  if (context === undefined)
    throw new Error("TripContext is used outside the TripProvider");
  return context;
}
