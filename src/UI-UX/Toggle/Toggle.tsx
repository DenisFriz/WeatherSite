import { useTheme } from "../../Contexts/Theme";
import s from "./index.module.scss";

const Toggle = () => {
  const themeContext = useTheme();
  const theme = themeContext ? themeContext.theme : undefined;
  const changeTheme = themeContext ? themeContext.changeTheme : undefined;

  return (
    <div className={s.toggle__container}>
      <input
        type="checkbox"
        id="check"
        className={s.toggle}
        onChange={changeTheme}
        value={theme}
      />
      <label htmlFor="check">{theme === "light" ? "Light mode" : "Dark mode"}</label>
    </div>
  );
};

export default Toggle;
