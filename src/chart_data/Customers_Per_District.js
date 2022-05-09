import { useState } from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const Customers_Per_District = (props)=>{

    const [loading, setloading]=useState(false);
    const [pin,setPin] = useState([]);
    const [cnt,setCnt] =useState([]);


        const fetch_data=async ()=>{
            console.log("data==="+props.info);
          if(props.info.length>0){
             const pincodes = props.info
                    .map(dataItem => dataItem.pincode) // get all media types
                    .filter((pincodes, index, array) => array.indexOf(pincodes) === index); // filter out duplicates
                
                    const counts = pincodes
                    .map(pincode => ({
                        type: pincode,
                        count: props.info.filter(item => item.pincode === pincode).length
                    }));
                    console.log(counts);
                    setPin([]);
                      setCnt([]);
                    counts.forEach((element) => {
                        console.log(element);
                        setPin(arr => [...arr , `${element.type}`]);
                        setCnt(arr => [...arr , `${element.count}`]);
                    });
                
                setloading(true);
          }
      
        }
            

        

    if(loading)
    {
        
        console.log(pin);

        const state = {
            labels:pin,
            datasets: [
              {
                label: 'customers',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: cnt
              }
            ]
          }
        return (
            <Bar
            data={state}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "customers per area"
                },
                legend: {
                  display: true,
                  position: "bottom"
               }
              }
            }}
          />
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
export default Customers_Per_District;

