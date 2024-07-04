import { useState } from "react";
import type { IForecastday } from "../../GlobalStyles/GlobalStyle";
import s from "./index.module.scss";
import Modal from "../../UI-UX/Modal/Modal";
import { useTheme } from "../../Contexts/Theme";
import Loader from "../../UI-UX/Loader/Loader";
import { useWeather } from "../../Contexts/WeatherData";
import ErrorComponent from "../Errors/ErrorComponent";

const DaysList = () => {
  const weatherData = useWeather();

  const forecastData = weatherData?.data?.forecast;
  const loading = weatherData?.isLoading;
  const error = weatherData?.weatherError?.isError;
  const errorMSG = weatherData?.weatherError?.ErrorMessage;

  if (loading) {
    return (
      <div style={{ position: "relative", marginTop: "100px" }}>
        <Loader />
      </div>
    );
  }

  if (error && errorMSG) {
    return <ErrorComponent ErrorMessage={errorMSG} />;
  }

  const content = forecastData?.forecastday;

  return (
    <div className={s.days}>
      {content &&
        content.map((item, index) => (
          <Item key={index} data={item} index={index} />
        ))}
    </div>
  );
};

function getDay(day: string) {
  const dateObject = new Date(day);
  return dateObject.toLocaleDateString("en-US", { weekday: "long" });
}

interface IItem {
  data: IForecastday;
  index: number;
}

function Item({ data, index }: IItem) {
  const [active, setActive] = useState(false);
  const themeContext = useTheme();
  const theme = themeContext ? themeContext.theme : undefined;

  return (
    <div
      className={`${s.days__item} ${
        theme === "dark" ? `${s.days__item_dark}` : ""
      }`}
    >
      <div className={s.days__day}>{getDay(data.date)}</div>
      <div className={s.days__img}>
        <img src="" alt="" />
      </div>
      <div className={s.days__temp}>
        <div className={s.days__tempMin}>
          <span>min</span> {data.day.mintemp_c}°
        </div>
        <div className={s.days__tempAvg}>
          <span>avg</span> {data.day.avgtemp_c}°
        </div>
        <div className={s.days__tempMax}>
          <span>max</span> {data.day.maxtemp_c}°
        </div>
      </div>
      <button
        className={`btn ${theme === "dark" ? "btn_dark" : ""}`}
        onClick={() => setActive(true)}
      >
        More info
      </button>
      <Modal active={active} setActive={setActive} index={index} />
    </div>
  );
}

export default DaysList;
