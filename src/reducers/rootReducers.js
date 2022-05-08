export default (state, action) => {
    console.log("pay==="+action.type);
    switch (action.type) {
      case "dataCustomers":
        return {
          Cust_data: action.payload
        };
      case "dataProducts":
        return {
          Prod_data: action.payload
        };
    case "dataSubscription":
        return {
          Sub_data: action.payload
        };
    case "dataVendors":
        return {
            Ven_data: action.payload
        };

      default:
        return state;
    }
  };