import { db } from "../utils/firebase_db";
import { collection, getDocs } from "firebase/firestore";
import { useState,useEffect } from 'react';

const Vendors_per_area = ()=>{

    const [info , setInfo] = useState([]);
    const [loading, setloading]=useState(false);
    const [pin,setPin] = useState([]);
    const [cnt,setCnt] =useState([]);


        const fetch_data=async ()=>{
            const querySnapshot = await getDocs(collection(db, "customers"));
            querySnapshot.docs.forEach((element) => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
            });
            if(info.length>0)
            {
                const pincodes = info
                    .map(dataItem => dataItem.pincode) // get all media types
                    .filter((pincodes, index, array) => array.indexOf(pincodes) === index); // filter out duplicates
                
                    const counts = pincodes
                    .map(pincode => ({
                        type: pincode,
                        count: info.filter(item => item.pincode === pincode).length
                    }));
                counts.forEach((element) => {
                    console.log(element.type);
                    setPin(arr => [...arr , `${element.type}`]);
                    setCnt(arr => [...arr , `${element.count}`]);
                });
                console.log(pin);
                console.log(cnt);
                setloading(true);
            }
        }
            

        

    if(loading)
    {
        console.log(info);
        return (
            <h1>In chartjs</h1>
        )
    }
    else
    {
        fetch_data();
        return (
            <></>
        )
    }

    
}
export default Vendors_per_area;

