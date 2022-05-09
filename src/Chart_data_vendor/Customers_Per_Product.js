import { db } from "../utils/firebase_db";
import { collection, getDocs } from "firebase/firestore";
import { useState,useEffect } from 'react';
import DonutChart from "react-donut-chart";
import setProducts from "../actions/setProducts";



const Customers_Per_Product = (props)=>{

    const [products , setProducts] = useState([]);
    const [count , setCount] = useState([]);
    const [subproducts , setSubProducts] = useState([]);
    const [loading, setloading]=useState(false);
    // const [reactDonutChartdata,setReactDonutChartdata]=useState([]);

    const fetch_data=async ()=>{
        
        //console.log("sub=="+JSON.stringify(props.data[1]))
        if(products.length==0&&props.data[0].length>0){
          var tmp=[];
            props.data[0].forEach((element) => {
                tmp.push(element.productName);
            });
            setProducts(tmp);
          }
            //setSubProducts([]);
          if(subproducts.length==0&&props.data[1].length>0){
            var tmp=[]
            props.data[1].forEach((element) => {
              if(element.vendorId=="JwSCk3y6VINWbbWRAnIZ")
                  tmp.push(element.ProductName);
            });
            setSubProducts(tmp);
          }
          if(products.length>0 && subproducts.length>0)
          {
              //console.log("in products count");
              var tmp=[];
              products.forEach(element => {
                let c=0;
                subproducts.forEach(ele => {
                    if (element === ele) {
                      c += 1;
                    }
                });
                tmp.push(c)
              });
              setCount(tmp);
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
      // console.log(products);
      // console.log(subproducts);
      // console.log(count);
      
      var reactDonutChartdata = [];
      for(var i=0;i<products.length;i++)
      {
          var obj={
            label:products[i],
            value: count[i],
           color: reactDonutChartBackgroundColor[i]
          }
          reactDonutChartdata.push(obj);
          //console.log(obj);
          //setReactDonutChartdata(arr=>[...arr,obj]);
      }
      //console.log("chartdata==="+reactDonutChartdata);
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

