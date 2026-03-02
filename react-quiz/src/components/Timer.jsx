import { useEffect } from "react";
import useQuiz from "../hooks/useQuiz";

export default function Timer() {
  const { state, dispatch } = useQuiz();
  const { secondsRemaining } = state;
  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;
  const timer = `🕛${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timerTick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return <div className="timer">{timer}</div>;
}
