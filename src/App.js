import Customers_Per_District from "./chart_data/Customers_Per_District";
import Customers_Per_Product from "./chart_data/Customers_Per_Product";
import Customers_Per_Vendors from "./chart_data/Customers_Per_Vendors";
import Test from "./chart_data/Test";
import { useState,useEffect } from 'react';
import { connect } from "react-redux";
import setCustomer from "./actions/setCustomer";
import './App.css';

function App(props) {
  const[cpm ,setCmp]=useState(false);
  
  const CPP=()=>{
    if(props.Cust_data.length==0)
        props.setCustomer([1,2,3]);
    setCmp(true);
  }
  return (
    <>
        <div className="agency"><h1>Agency</h1></div>
        <div><h1>Vendors</h1></div>

    </>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setCustomer: (payload) => dispatch(setCustomer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

