import { getCookie } from "cookies-next";
import { CustomerInfo } from "./useStoreCustomer";


export function useGetCustomer(){
    const customerData : CustomerInfo =  {
        customerEmail: "",
        customerFirstName: "",
        customerLastName: "",
        customerPhone: "",
        customerAddress: "",
        customerRegion: "",
        customerCountry: ""
    } 
    
    if (getCookie('customerInfo') !== undefined) {
        const storedData : CustomerInfo = JSON.parse(getCookie('customerInfo') as string);

        if (storedData) {
            customerData.customerAddress = storedData.customerAddress;
            customerData.customerFirstName = storedData.customerFirstName;
            customerData.customerLastName = storedData.customerLastName;
            customerData.customerEmail = storedData.customerEmail;
            customerData.customerPhone = storedData.customerPhone;
            customerData.customerRegion = storedData.customerRegion;
            customerData.customerCountry = storedData.customerCountry;
        }
    }

    return customerData;
}