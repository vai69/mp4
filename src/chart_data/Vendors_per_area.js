import { db } from "../utils/firebase_db";
import { collection, getDocs } from "firebase/firestore";
import { useState,useEffect } from 'react';

const Vendors_per_area = ()=>{

    const [info , setInfo] = useState([]);
    const [loading, setloading]=useState(false);

        useEffect(() => {

        const fetch_data=async ()=>{
            console.log("here");
            const querySnapshot = await getDocs(collection(db, "customers"));
            console.log(querySnapshot);
            querySnapshot.docs.forEach((element) => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
            });
            setloading(true);
            console.log("Info===== "+info);
            
        
    }

        fetch_data();
        
    });
    if(loading)
    {
        return (
            <h1>In chartjs</h1>
        )
    }
    else
    {
        return (
            <></>
        )
    }

    // const mediaTypes = data
    // .map(dataItem => dataItem.media_type) // get all media types
    // .filter((mediaType, index, array) => array.indexOf(mediaType) === index); // filter out duplicates
  
    // const counts = mediaTypes
    // .map(mediaType => ({
    //     type: mediaType,
    //     count: data.filter(item => item.media_type === mediaType).length
    // }));
}
export default Vendors_per_area;

