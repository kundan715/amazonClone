import { orders } from "../data/ordersData.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import formateCurrency from "./utils/money.js";
import { formatDateToDayMonth } from "./utils/Date.js";
import { getProduct } from "../data/products.js";
import { loadProductFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";

loadProductFetch().then(()=>{createHTML()})



function createHTML(){
    console.log(orders);
    let orderHTML='';

    orders.forEach((order)=>{
       
        const orderContainer=
        `<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDateToDayMonth(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formateCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-details-grid ">
            ${createProductHTML(order.products,order.id)}
          </div>
        </div>
        `
        orderHTML+=orderContainer;
    })

    document.querySelector('.js-orders-grid').innerHTML=orderHTML;
    
    document.querySelectorAll('.js-buy-again-button').forEach((button)=>{
      button.addEventListener('click',()=>{
        const productId=button.dataset.productId;
        addToCart(productId);
      })
    })
}



function createProductHTML(productArray,orderId){
        let productHTML='';
        productArray.forEach((productDetails)=>{
            const product=getProduct(productDetails.productId);
            const productContainer=
            `<div class="product-image-container">
              <img src=${product.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on:${formatDateToDayMonth(productDetails.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary
              js-buy-again-button"
              data-product-id=${product.id}>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderId}&productId=${product.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            `
            productHTML+=productContainer;
        })
        
        return productHTML;
}



