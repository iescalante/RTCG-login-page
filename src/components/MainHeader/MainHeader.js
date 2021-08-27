import React, { useContext } from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";
import AuthContext from "../../store/auth-context";

const MainHeader = () => {
  const ctx = useContext(AuthContext);
  const header = ctx.isLoggedIn ? "Main Page" : "Login Page";
  return (
    <header className={classes["main-header"]}>
      <h1>{header}</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
