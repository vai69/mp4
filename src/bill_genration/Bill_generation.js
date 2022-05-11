import { useState } from "react";
import { connect } from "react-redux";
import setBill from "../actions/setBill";
import setProducts from "../actions/setProducts";
import { db } from "../utils/firebase_db";
import { app } from "../utils/firebase_db";
import { collection, getDocs } from "firebase/firestore";
import "./Bill_generation.css"

const Bill_generation = (props) => {

 
  const [loading, setloading]=useState(false);
  
  const [Bal, setBal]=useState(0);
  
  const [curr, setCurr]=useState(0);
  
  const [adjust, setAdjust]=useState(0);
  
  
    const fetch_data=async()=>{
        if(props.Bill_data.length==0)
        {
            var bill_rpt={};
            var docid="";
            const querySnapshot = await getDocs(collection(db, "Billing Report"));
            querySnapshot.docs.forEach((element) => {
                var data = element.data();
                console.log(data.FName);
                if(data.FName=="Sukant"&&data.LName=="Jadhav")
                {
                    bill_rpt=data;
                    docid=element.id;
                    
                }
            });
            console.log("bill_rpt==="+bill_rpt);
            if(bill_rpt.length>0)
            {
                setBal(bill_rpt.balance);
                setCurr(bill_rpt.currBill);
                setAdjust(bill_rpt.AdjustMent);
            }

            if(props.Prod_data.length==0)
            {
                var tmp=[];
                const querySnapshot = await getDocs(collection(db, "Products"));
                querySnapshot.docs.forEach((element) => {
                    var data = element.data();
                    tmp.push(data);
                });
                props.setProducts(tmp);
            }
            var date1 = new Date("06/15/2019");
            var date2 = new Date("06/20/2019");
            var Difference_In_Time = date2.getTime() - date1.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            console.log(Difference_In_Days);
            var price=0;
            props.Prod_data.forEach((doc)=>{
                if(doc.productName=="Loksatta")
                    price=doc.sundayPrice;
            });
            console.log("docid"+docid);
            
            if(docid=="")
            {
                //insertBal);
                console.log("In 1==")
                 console.log(Bal);
                  console.log(price);
                  const docRef = firebase.firestore().collection('Projects').doc();
                  const userRef = db.collection("Billing Report").add({
                        FName:"Meenatai",
                        LName:"Tupe",
                        product:"Loksatta",
                        Adjustment:0,
                        Balance:Bal,
                        currentBill:price*Difference_In_Days,
                        totalBill:price*Difference_In_Days
                });
                
            }
            else
            {
                 //update
                 console.log("In 2==")
                 console.log(Bal);
                  console.log(price);
                 db.collection("users").doc(doc.id).update({
                    Balance:Bal,
                    currentBill:price*Difference_In_Days,
                    totalBill:price*Difference_In_Days+Bal
                 });
            }
            setloading(true);
            
            
        }
    }
  if(loading){
    console.log(props);
            
        return (
            <>
                <div class="main_div">
                    <h2>Receipt</h2>
                    <h4>Name: Customer Name</h4>
                    <table>
                        <tr>
                            <th>Discription</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                        </tr>
                        <tr>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                        </tr>
                    
                    </table>
                </div>
            </>
        )
  }
  else
  {
      fetch_data();
      return (<></>)
  }
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setBill: (payload) => dispatch(setBill(payload)),
  setProducts: (payload) => dispatch(setProducts(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bill_generation);