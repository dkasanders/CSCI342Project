import Order from './Order'
const Orderlist = ({orderlist}) => { 


    const { date, orders } = orderlist;
    
    

    
    
    return (
        <>
            <p>Order Date: {orderlist.order_date}</p>
            {orders.map((order, index) => {
                return <Order key={index} order={order}/>
            })}
        </>
    )

}

export default Orderlist;