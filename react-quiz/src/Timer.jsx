import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
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
