import { ReactNode, createContext, useContext, useState } from "react";

interface ITheme {
  theme: "light" | "dark";
  changeTheme: () => void;
}

const ThemeContext = createContext<ITheme | null>(null);

const Theme = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const changeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const data: ITheme = {
    theme,
    changeTheme,
  };
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export default Theme;
