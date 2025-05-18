import React from "react";

const ThemeSwitcher = ({ theme }) => {
  return <div className={`theme-indicator ${theme}`}>Current Theme: {theme}</div>;
};

export default ThemeSwitcher;
