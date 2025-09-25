import React from "react";
import DoubleTickLogo from "../../public/assets/Doubletick Logo.png";

const Header = () => {
  return (
    <div className="header-container">
      <img src={DoubleTickLogo} alt="logo" className="logo" />
    </div>
  );
};

export default Header;
