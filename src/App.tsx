import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import DaysList from "./components/DaysList/DaysList";
import Header from "./components/Header/Header";
import Tabs from "./components/Tabs/Tabs";
import Toggle from "./UI-UX/Toggle/Toggle";
import { useTheme } from "./Contexts/Theme";

function App() {
  const themeContext = useTheme();
  const theme = themeContext ? themeContext.theme : undefined;
  return (
    <div className={`container ${theme === "dark" ? "container-dark" : ""}`}>
      <div className="main-wrapper">
        <Toggle />
        <CurrentWeather />
        <div className="main-right">
          <Header />
          <Tabs />
          <DaysList />
        </div>
      </div>
    </div>
  );
}

export default App;
