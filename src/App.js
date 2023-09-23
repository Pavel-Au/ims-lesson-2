import "./App.css";
import { DataTable } from "./components";
import { animalsData } from "./dataModel";

export const App = () => (
  <div className="App">
    {animalsData && animalsData.length ? (
      <DataTable dataSet={animalsData} />
    ) : (
      <h2>There is no data...</h2>
    )}
  </div>
);
