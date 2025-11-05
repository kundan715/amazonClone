import { loadProductFetch,getProduct } from "../data/products.js";
import { orders } from "../data/ordersData.js";
import { getOrderById, getOrderdProductById } from "../data/ordersData.js";
import { formatToDayMonthDate } from "./utils/Date.js";




// for inner data of traking we use url of page

loadProductFetch().then(()=>{
    rendorTrakingPage();
})

function rendorTrakingPage(){
    const url= new URL(window.location.href)
    const productId=url.searchParams.get('productId');
    const orderId=url.searchParams.get('orderId');

    const order=getOrderById(orderId);
    const product=getProduct(productId);
    const OrderdProduct= getOrderdProductById(orderId,productId);
    // console.log(prouctId,orderId);
    const trackingHTML=
    `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formatToDayMonthDate(OrderdProduct.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
         ${product.name}
        </div>

        <div class="product-info">
          Quantity:${OrderdProduct.quantity}
        </div>

        <img class="product-image" src=${product.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
      `

      document.querySelector('.js-main-div').innerHTML=trackingHTML;
}