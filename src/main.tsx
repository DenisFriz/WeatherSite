import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.scss";
import WeatherData from "./Contexts/WeatherData.tsx";
import Theme from "./Contexts/Theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Theme>
    <WeatherData>
      <App />
    </WeatherData>
  </Theme>
);
