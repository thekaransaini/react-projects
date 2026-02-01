import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Footer from "./Footer";

export default function App() {
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        console.log(res);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <StartScreen />
      </Main>
      <Footer></Footer>
    </div>
  );
}
