

const Order= ({order}) => { 
    return (
        <div>
            <img src={order.images[0]}/>
            <p>{order.name}</p>
            <p>{order.description}</p>
            <p>{order.price}</p>     
        </div>
    )

}

export default Order;