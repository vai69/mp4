import { db } from "../utils/firebase_db";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState,useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const Customers_Per_Vendors = ()=>{

    const [vendors,setVendors]=useState([]);
    const [name,setNames]=useState([]);
    const [customers,setCustomer]=useState([]);
    const [cnt,setCnt] =useState([]);
    const [loading,setLoading]=useState(false);
        const fetch_data=async ()=>{
            if(vendors.length==0){
                var tmp=[];
                var tname=[];
                const q = query(collection(db, "vendors"), where("Agency", "==", "GyfrtgrRCkOANqoppXWH"));

                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    tmp.push(doc.id);
                    tname.push(doc.data().firnName);
                    console.log(doc.id, " => ", doc.data());
                });
                setVendors(tmp);
                setNames(tname);
            }
            if(vendors.length>0)
            {
                const queryS = await getDocs(collection(db, "subscription"));
                var tmp=[];
                queryS.docs.forEach((element) => {
                    var data = element.data();
                    tmp.push(data.vendorId);
                });
                setCustomer(tmp);
            }
            if(customers.length>0)
            {
                var tmp=[]
                vendors.forEach((element) => {
                    var c=0;
                    customers.forEach((t) => {
                        if(t==element)
                            c+=1;
                    });
                    tmp.push(c);
                });
                setCnt(tmp);
                setLoading(true);
            }
        }
            

        

    if(loading)
    {
        console.log("Name== "+name);
        console.log("Customerss== "+cnt);
        return (
            <></>
        )
    }
    else
    {
        //console.log(info.length);
        
        fetch_data();
        return (
            <></>
        )
    }

    
}
export default Customers_Per_Vendors

