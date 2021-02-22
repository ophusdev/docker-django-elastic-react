import {React} from "react";
import './App.css';

import Header from "./components/Header/Header";
import MapGrid from "./components/Map/MapGrid";

function App() {

  return (
    <>
      <nav>
        <Header />
      </nav>
      <main>
      
      <MapGrid />
      </main>
    </>
  );
}

export default App;
