import Agency from "./Agency";
import Vendor from "./Vendor";
import Routs from "./Routs";
import Test from "./chart_data/Test";
import { useState,useEffect } from 'react';
import { connect } from "react-redux";
import setCustomer from "./actions/setCustomer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App(props) {
  
  const CPP=()=>{
    console.log("Nothing");
    if(props.Cust_data.length==0)
        props.setCustomer([1,2,3]);
    if(props.Cust_data.length==0)
        props.setCustomer([1,2,3]);

  }
  return (
    <>
      <Router>
      <Routes>
        <Route index path="/" element={<Routs OnClickFunc={CPP}/>} />
            <Route path="/Agency" element={<Agency Customer={props.Cust_data}/>} />
          <Route path="/Vendor" element={<Vendor/>} />
      </Routes>
      </Router>
      
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

