import React from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PersonalInfo from "./pages/PersonalInfo";
import GalleryPage from "./pages/GalleryPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>{" "}
        <Route path="/home" exact>
          <Home />
        </Route>{" "}
        <Route path="/register" exact>
          <RegisterPage />
        </Route>{" "}
        <Route path="/login" exact>
          <LoginPage />
        </Route>{" "}
        <Route path="/gallery" exact>
          <GalleryPage />
        </Route>{" "}
        <Route path="/personal" exact>
          <PersonalInfo />
        </Route>{" "}
      </Switch>{" "}
    </Router>
  );
}

export default App;
