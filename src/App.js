import Customers_Per_District from "./chart_data/Customers_Per_District";
import Customers_Per_Product from "./chart_data/Customers_Per_Product";
import { useState,useEffect } from 'react';

function App() {
  const[cpm ,setCmp]=useState(false);
  const CPP=()=>{
    setCmp(true);
  }
  return (
    <>
      {/* <Customers_Per_District /> */}
      <button onClick={CPP}>Customers_Per_Product</button>
      {cpm ?
        (<Customers_Per_Product />) :(<></>)
      }
      <h1>In home</h1>
    </>
  );
}

export default App;
