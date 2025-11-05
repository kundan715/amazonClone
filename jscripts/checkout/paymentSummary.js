import {cart} from "../../data/cart.js"
import {getProduct} from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formateCurrency from '../utils/money.js'
import { saveOrder } from "../../data/ordersData.js";





export function rendorPaymentSummary(){
   let totalItems=0;
   let productPriceCents=0;
   let shippingPriceCents=0;
   // console.log(cart);
   cart.forEach((cartItem) => {
      const product=getProduct(cartItem.productId);
      productPriceCents+=product.priceCents * cartItem.quantity;
      

      const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
      shippingPriceCents+=deliveryOption.priceCents;

      totalItems+=cartItem.quantity;
   });

   const totalBeforeTaxCents=productPriceCents+shippingPriceCents;
   const taxCents=totalBeforeTaxCents*0.1;
   const totalCents=totalBeforeTaxCents+taxCents;




   const paymentSummaryHTML=
   `     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">
            $${formateCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money
            js-payment-summary-money-shipping">
            $${formateCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money
            js-payment-summary-money-total">
            $${formateCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${formateCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formateCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
   `;
   
   document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
   
document.querySelector('.js-place-order').addEventListener('click',async()=>{
  // here we want to get order object form backend by sending cart data to it
  
  if(cart.length>0){
      let response;
      try{
      response= await fetch('https://supersimplebackend.dev/orders',
        {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          cart:cart
        })
        }
      );
      }catch(error){
        console.log('unexpected error:',error);
      }

      // console.log(response);

      const orderData= await response.json();
      // console.log(orderData); it is oject of order data type;

      saveOrder(orderData);
      // now we have to clear cart as well
      localStorage.removeItem('cart');

      window.location='orders.html';
  }
})
}
