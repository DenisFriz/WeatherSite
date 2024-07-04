import { useTheme } from "../../Contexts/Theme";
import { useWeather } from "../../Contexts/WeatherData";
import Loader from "../../UI-UX/Loader/Loader";
import ErrorComponent from "../Errors/ErrorComponent";
import s from "./index.module.scss";

const CurrentWeather = () => {
  const themeContext = useTheme();
  const theme = themeContext ? themeContext.theme : undefined;
  const weatherData = useWeather();

  const loading = weatherData?.isLoading;
  const error = weatherData?.weatherError?.isError;
  const errorMSG = weatherData?.weatherError?.ErrorMessage;

  if (loading)
    return (
      <div style={{ position: "relative", marginTop: "100px" }}>
        <Loader />
      </div>
    );

  if (error && errorMSG) {
    return <ErrorComponent ErrorMessage={errorMSG} />;
  }

  const data = weatherData?.data;

  if (!data) return null;

  return (
    <div
      className={`${s.currentWeather} ${
        theme === "dark" ? `${s.currentWeather_dark}` : ""
      }`}
    >
      <h3 className={s.currentWeather__title}>
        {data.location.name + ", " + data.location.country}
      </h3>
      <p className={s.currentWeather__subtitle}>
        Today, {data.location.localtime}
      </p>
      <div className={s.currentWeather__content}>
        <div className={s.wrapperImg}>
          <img
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTJCq_dgaPULdy0GgzMuCDy4BqQW11izhCKo7vZotEts8vAFLlZ"
            alt="Img"
          />
        </div>
        <div className={s.currentWeather__degrees}>
          {data.current.temp_c} °C
        </div>
      </div>
      <div className={s.currentWeather__detailInfo}>
        <ul className={s.currentWeather__list}>
          <li className={s.currentWeather__link}>
            <div className={s.currentWeather__item}>
              Pressure in millibars
              <div className="detail-info">{data.current.pressure_mb} mb</div>
            </div>
          </li>
          <li className={s.currentWeather__link}>
            <div className={s.currentWeather__item}>
              Humidity
              <div className="detail-info">{data.current.humidity} %</div>
            </div>
          </li>
          <li className={s.currentWeather__link}>
            <div className={s.currentWeather__item}>
              Cloud
              <div className="detail-info">{data.current.cloud} %</div>
            </div>
          </li>
          <li className={s.currentWeather__link}>
            <div className={s.currentWeather__item}>
              Wind gust
              <div className="detail-info">{data.current.gust_kph} km/h</div>
            </div>
          </li>
          <li className={s.currentWeather__link}>
            <div className={s.currentWeather__item}>
              Wind speed
              <div className="detail-info">{data.current.wind_kph} km/h</div>
            </div>
          </li>
        </ul>
      </div>
      <div className={s.currentWeather__detailInfo}>
        <ul className={s.currentWeather__list}>
          <li className={s.currentWeather__link}>
            <div className={s.currentWeather__item}>
              <img src="" />
              5:30
              <div className="detail-info">93%</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CurrentWeather;
