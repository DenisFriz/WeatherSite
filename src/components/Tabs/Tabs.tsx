import s from "./index.module.scss";
import { useWeather } from "../../Contexts/WeatherData";
import { useTheme } from "../../Contexts/Theme";

type TabsItems = "Today" | "Tomorrow" | "Next 7 day";

const TabsList: TabsItems[] = ["Today", "Tomorrow", "Next 7 day"];

const Tabs = () => {
  const themeContext = useTheme();
  const theme = themeContext ? themeContext.theme : undefined;
  const weatherContext = useWeather();
  const currentCity = weatherContext ? weatherContext.currentCity : undefined;

  const updateWeatherData = weatherContext
    ? weatherContext.updateData
    : undefined;

  const handleClickTabs = async (tab: TabsItems) => {
    if (!currentCity || !updateWeatherData) return null;

    switch (tab) {
      case "Today": {
        await updateWeatherData({ city: currentCity, days: "1" });
        break;
      }
      case "Tomorrow": {
        await updateWeatherData({ city: currentCity, days: "2" });
        break;
      }
      case "Next 7 day": {
        await updateWeatherData({ city: currentCity, days: "7" });
        break;
      }
      default:
        console.error("Unknown tab:", tab);
        return;
    }
  };

  return (
    <div className={s.tabs}>
      <ul className={s.tabs__list}>
        {TabsList.map((tab, index) => (
          <li
            key={index}
            className={`${s.tabs__link} ${
              theme === "dark" ? `${s.tabs__link_dark}` : null
            }`}
            onClick={() => handleClickTabs(tab)}
          >
            <div className={s.tabs__item}>{tab}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
