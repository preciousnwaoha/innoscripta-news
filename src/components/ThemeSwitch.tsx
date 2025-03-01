import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/generalSlice";
import { RootState } from "../store";
import Icon from "./ui/Icon";

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch = ({ className = "" }: ThemeSwitchProps) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.general);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className={`theme-switch ${className}`}>
      <Icon
        onClick={handleToggleTheme}
        icon={
          theme === "light" ? (
            <MdDarkMode fontSize={24} />
          ) : (
            <MdLightMode fontSize={24} />
          )
        }
      />
    </div>
  );
};

export default ThemeSwitch;
