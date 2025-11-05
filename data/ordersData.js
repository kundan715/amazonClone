


export const orders=JSON.parse( localStorage.getItem('orders'))|| [];

export function saveOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

export  function getOrderById(orderId){
    let matchingOder;
    orders.forEach((order)=>{
        if(order.id===orderId){matchingOder=order;}
    })
    return matchingOder
}

export function getOrderdProductById(oderId,productId){
    let order=getOrderById(oderId);
    let matchingProduct;
    order.products.forEach((item)=>{
       if(item.productId==productId)matchingProduct=item;
    })
    return matchingProduct;
}