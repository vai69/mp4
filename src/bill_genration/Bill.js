import { useRef } from "react";
import Bill_generation from "./Bill_generation";
import ReactToPrint from "react-to-print";
import { Button } from "react-bootstrap";

const Bill = (props) => {

  console.log(props);
  let componentRef = useRef();
  return (
    <>
      <div class="row">
        <ReactToPrint
            trigger={() => <Button>Bill Receipt</Button>}
            content={() => componentRef.current}
            />

        {/* component to be printed */}
        <Bill_generation ref={(el) => (componentRef = el)} />
          
      </div>
    </>
  )
};
export default Bill;


