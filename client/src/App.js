import React from "react";
import { WeatherProvider } from "./context/WeatherContext";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

const App = () => {
  return (
    <div>
      <WeatherProvider>
        <div>
          <div>
            <center>
              <h1 style={{ margin: "30px" }}>Weather Dashboard</h1>
            </center>
            <SearchBar />
            <WeatherDisplay />
          </div>
        </div>
      </WeatherProvider>
    </div>
  );
};

export default App;
