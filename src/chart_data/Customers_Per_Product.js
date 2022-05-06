import { db } from "../utils/firebase_db";
import { collection, getDocs } from "firebase/firestore";
import { useState,useEffect } from 'react';
import DonutChart from "react-donut-chart";



const Customers_Per_Product = ()=>{

    const [products , setProducts] = useState([]);
    const [count , setCount] = useState([]);
    const [subproducts , setSubProducts] = useState([]);
    const [loading, setloading]=useState(false);
    // const [reactDonutChartdata,setReactDonutChartdata]=useState([]);

    const fetch_data=async ()=>{
        //setProducts([]);
        const querySnapshot = await getDocs(collection(db, "Products"));
        if(products.length==0){
          setProducts([]);
            querySnapshot.docs.forEach((element) => {
                var data = element.data();
                console.log(data.productName)
                setProducts(arr => [...arr , data.productName]);
            });
          }
            //setSubProducts([]);
          if(subproducts.length==0){
            const queryS = await getDocs(collection(db, "subscription"));
            setSubProducts([]);
            queryS.docs.forEach((element) => {
                var data = element.data();
                //console.log(data.productName)
                setSubProducts(arr => [...arr , data.ProductName]);
            });
          }
          if(products.length>0 && subproducts.length>0)
          {
              console.log("in products count");
              setCount([])
              products.forEach(element => {
                let c=0;
                subproducts.forEach(ele => {
                    if (element === ele) {
                      c += 1;
                    }
                });
                setCount(arr => [...arr,c]);
              });
              setloading(true);
          }
           
            //console.log(products);
    }

    //  = [
    //     {
    //       label: "NDC",
    //       value: 25,
    //       color: "#00E396"
    //     },
    //     {
    //       label: "RDC",
    //       value: 65,
    //       color: "#FEB019"
    //     },
    //     {
    //       label: "STOCKIST",
    //       value: 100,
    //       color: "#FF4560"
    //     },
    //     {
    //       label: "HOSPITAL",
    //       value: 15,
    //       color: "#775DD0"
    //     }
    //   ];
      const reactDonutChartBackgroundColor = [
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#800000",
        "#00FFFF",
        "#FF00FF",
        "#2F4F4F",
        "#DDA0DD",
        "#BC8F8F",
        "#AAB8C2",
        "#DB4437"
      ];
      const reactDonutChartInnerRadius = 0.5;
      const reactDonutChartSelectedOffset = 0.04;
      const reactDonutChartHandleClick = (item, toggled) => {
        if (toggled) {
          console.log(item);
        }
      };
      let reactDonutChartStrokeColor = "#FFFFFF";
      const reactDonutChartOnMouseEnter = (item) => {
        let color = reactDonutChartdata.find((q) => q.label === item.label).color;
        reactDonutChartStrokeColor = color;
      };


    if(loading&&count.length>0)
    {
      console.log(products);
      console.log(subproducts);
      console.log(count);
      
      var reactDonutChartdata = [];
      for(var i=0;i<count.length;i++)
      {
          var obj={
            label:products[i],
            value: count[i],
           color: reactDonutChartBackgroundColor[i]
          }
          reactDonutChartdata.push(obj);
          console.log(obj);
          //setReactDonutChartdata(arr=>[...arr,obj]);
      }
      console.log(reactDonutChartdata);
        return (
            <div className="App">
            <DonutChart
                width={500}
                onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
                strokeColor={reactDonutChartStrokeColor}
                data={reactDonutChartdata}
                colors={reactDonutChartBackgroundColor}
                innerRadius={reactDonutChartInnerRadius}
                selectedOffset={reactDonutChartSelectedOffset}
                onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
            />
            </div>
        );
    }
    else{
      if(!loading)
          fetch_data();
        return (
            <></>
        )
    }

    
}
export default Customers_Per_Product;

