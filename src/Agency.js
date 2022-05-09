import Customers_Per_District from "./chart_data/Customers_Per_District";
import Customers_Per_Product from "./chart_data/Customers_Per_Product";
import Customers_Per_Vendors from "./chart_data/Customers_Per_Vendors";
import Test from "./chart_data/Test";
import { useState,useEffect } from 'react';
import "./Agency.css"


const Agency = (props)=>{
        return (
            //<Customers_Per_District/>
            <>
                {/* <div class="btns-gr">
                    <button onClick={CPP(1)}  class="btn-ag"><b>Customers Per District</b></button>
                    {cpm==1 ? (<Test cnt={cpm}/>) :(<></>) }
                    <button  class="btn-ag"><b>Customer Per Product</b></button>
                    {cpm==2 ? (<Test cnt={cpm}/>) :(<></>) }
                    <button  class="btn-ag"><b>Customers Per Vendors</b></button>
                    {cpm==3 ? (<Test cnt={cpm}/>) :(<></>) }
                </div> */}
                <Customers_Per_District />
                <Customers_Per_Product />
                <Customers_Per_Vendors />

            </>
        )

    
}
export default Agency;

