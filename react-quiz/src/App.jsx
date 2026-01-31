import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Footer from "./Footer";

export default function App() {
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
