import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 rounded-full bg-blue-400 p-2 dark:bg-blue-500 dark:focus:outline-transparent md:right-10"
      >
        {theme === "dark" ? (
          <HiOutlineSun className="h-6 w-6" />
        ) : (
          <HiOutlineMoon className="h-6 w-6" />
        )}
      </button>
      <footer>
        <p className="mb-4 text-center">Made with love by nerdy-guy</p>
      </footer>
    </div>
  );
};

export default Footer;
