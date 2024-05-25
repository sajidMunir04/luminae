import { useEffect } from "react"

interface Props {
    customerId: string
}

function OrdersList(props : Props) {
    useEffect(() => {
        const fetchOrdersData = async() => {
            const response = fetch('/api/')
        }

        fetchOrdersData();
    },[])
}

export default OrdersList;