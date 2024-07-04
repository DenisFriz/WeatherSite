import { useEffect, useState } from "react";
import s from "./index.module.scss";
import { useWeather } from "../../Contexts/WeatherData";
import { useTheme } from "../../Contexts/Theme";

type ErrorObj = {
  isError: boolean;
  errorCode: number;
  errorMessage: string;
};

type HeaderDate = {
  month: string;
  dayOfWeek: string;
  year: number | string;
};

const Header = () => {
  const themeContext = useTheme();
  const [city, setCity] = useState("");
  const theme = themeContext ? themeContext.theme : undefined;
  const [error, setError] = useState<ErrorObj>();
  const [date, setDate] = useState<HeaderDate>();
  const weatherData = useWeather();

  useEffect(() => {
    const tmpDate = new Date();
    const daysOfWeek = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    const date: HeaderDate = {
      month: months[tmpDate.getMonth()],
      dayOfWeek: daysOfWeek[tmpDate.getDay()],
      year: tmpDate.getFullYear(),
    };

    setDate(date);
  }, []);

  if (!weatherData) {
    return null;
  }
  const { updateData, updateCity } = weatherData;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim().length == 0) {
      setError({
        isError: true,
        errorCode: 402,
        errorMessage: "Please, enter the city name.",
      });
    } else {
      setError({
        isError: false,
        errorCode: 200,
        errorMessage: "",
      });
      updateData({ city: city, days: "1" });
      updateCity(city);
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value.replace(/[^a-zA-Z ]/g, ""));
  };

  return (
    <header
      className={`${s.header} ${theme === "dark" ? `${s.header_dark}` : ""}`}
    >
      <div className={s.header__dateInfo}>
        <span className={s.header__dateInfoTop}>
          {date?.month} {date?.year}
        </span>
        <span className={s.header__dateInfoBottom}>
          {date?.dayOfWeek} {date?.month} {date?.year}
        </span>
      </div>
      <form onSubmit={handleFormSubmit} className={s.header__form}>
        <input
          type="text"
          placeholder="Search City..."
          value={city}
          onChange={handleInput}
        />
        <button
          type="submit"
          className={`btn ${theme === "dark" ? "btn_dark" : ""}`}
        >
          Search
        </button>
        {error?.isError && (
          <div className={s.header__error}>{error.errorMessage}</div>
        )}
      </form>
    </header>
  );
};

export default Header;
