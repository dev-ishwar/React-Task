import { useState } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import LoginError from "./components/LoginError";

function App() {
  const [authenticated, setAuthenticated] = useState(null);

  const changeAuthenticationFlag = (flag) => {
    setAuthenticated(flag);
  };
  return (
    <>
      <Header
        authenticated={authenticated}
        setAuthentication={changeAuthenticationFlag}
      />
      {!authenticated && <Login setFormValidity={changeAuthenticationFlag} />}
      {authenticated === false && (
        <LoginError
          flag={authenticated}
          resetValidity={changeAuthenticationFlag}
        />
      )}
      {authenticated && <Home />}
    </>
  );
}

export default App;
