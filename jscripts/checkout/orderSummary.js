import {cart, removefromCart,updateQuantity,updateDeliveryOptionId} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import formateCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
//above one is default export :when we set a function as default then syntax used. above is named export
import {deliveryOption, getDeliveryOption} from '../../data/deliveryOptions.js';
import { rendorPaymentSummary } from './paymentSummary.js';
import { rendorCheckoutHeader } from './checkoutHeader.js';
import { getDeliveryDate } from '../utils/jumpingDays.js';



export function rendorOrderSummary(){

      let cartSummaryHTML ='';


      cart.forEach((cartItem)=>{
          
          const productId=cartItem.productId;
          let matchingProduct= getProduct(productId);
          
          //find out delivery option whose id matches with cartitem so main delivery date became variable
          const deliveryOptionId=cartItem.deliveryOptionId;
          let delivery_Option=getDeliveryOption(deliveryOptionId);
          
          //get date from selected option by using how many days after it deliver
          const today= dayjs();

          //we have to remove weekend as we only count working day which skipped

          const deliveryDate=getDeliveryDate(today,delivery_Option.deliveryDays);
          const dateString=deliveryDate.format('dddd,MMMM D');

          cartSummaryHTML+=`
              <div class="cart-item-container 
              js-cart-item-container-${matchingProduct.id}
              js-cart-item-container">
                  <div class="delivery-date">
                    Delivery date: ${dateString}
                  </div>

                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src="${matchingProduct.image}">

                    <div class="cart-item-details">
                      <div class="product-name 
                      js-product-name-${matchingProduct.id}">
                      ${matchingProduct.name}
                      </div>
                      <div class="product-price">
                        ${matchingProduct.getPrice()}
                      </div>
                      <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                        <span>
                          Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        
                        <span class="update-quantity-link link-primary
                        js-update-link"
                        data-product-id=${matchingProduct.id}>
                          Update
                        </span>

                        <div class="quantity-input-class">
                          <input type="text" class="quantity-input js-quantity-input-${matchingProduct.id}">
                          <span class="save-quantity-link link-primary
                          " 
                          data-product-id=${matchingProduct.id}>save</span>
                        </div>
                          
                        
                        <span class="delete-quantity-link link-primary js-delete-link
                        js-delete-link-${matchingProduct.id}"
                        data-product-id=${matchingProduct.id}>
                          Delete
                        </span>
                      </div>
                    </div>

                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      ${deliveryOptionHTML(matchingProduct,cartItem)}
                    </div>
                  </div>
              </div>
          `;
      });

      document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;
      //update checkout count

      // updateCheckOut();
      // console.log(dayjs());



      document.querySelectorAll('.js-delete-link')
        .forEach((link)=>{
          link.addEventListener('click',()=>{
            // console.log('delete');
            // first remove ele from cart then update the html
            const productId= link.dataset.productId;
            

            removefromCart(productId);
            // updateCheckOut();
            // // const container= document.querySelector
            // // (`.js-cart-item-container-${productId}`);
            // // console.log(container);
            // // container.remove();

            rendorCheckoutHeader();
            // change in payment summary
            rendorPaymentSummary();
            // also rendonr order summary instead of updating it using dom
            rendorOrderSummary();
            
        
          });
        })


        /* to remove item from screen when delete clicked:
        1: use dom to get element to remove 2: use remove() method */

        document.querySelectorAll('.js-update-link').forEach((link)=>{
          
          link.addEventListener('click',()=>{
            let product_id =link.dataset.productId;
            
            const container= document.querySelector(`.js-cart-item-container-${product_id}`);
            // console.log(container);
          // above we find out container where update take place
            container.classList.add('is-editing-quantity');
            // console.log(document.querySelector('.is-editing-quantity'));
          })
        })

        document.querySelectorAll('.save-quantity-link').forEach((link)=>{

          link.addEventListener('click',()=>{
            const product_id=link.dataset.productId;

            let container=document.querySelector(`.js-cart-item-container-${product_id}`);
            //note that while using add or remove function dont use '.xxx' use 'xxx'

            let new_quantity=Number(document.querySelector(`.js-quantity-input-${product_id}`).value);
            // console.log(new_quantity);

            
            updateQuantity(product_id,new_quantity);
            
            // updateCheckOut()
            
            // document.querySelector(`.quantity-label-${product_id}`).innerHTML=new_quantity;
            container.classList.remove('is-editing-quantity');

            rendorCheckoutHeader();
            rendorOrderSummary();
            // update the payment summary
            rendorPaymentSummary();
            
          
            
          })
        })


        function deliveryOptionHTML(matchingProduct,cartItem){
          //it is for to check whether radio ele is same in cartItem deliveryOptionId
          

          let html='';
          deliveryOption.forEach((deliveryOption)=>{

            const ischecked= deliveryOption.id===cartItem.deliveryOptionId;
            // console.log(ischecked);
            const today= dayjs();
            const deliveryDate=getDeliveryDate(today,deliveryOption.deliveryDays);
            const dateString=deliveryDate.format('dddd,MMMM D');

            const priceString= !deliveryOption.priceCents ? 'FREE':
              `$ ${formateCurrency(deliveryOption.priceCents)}`;
              html+=`<div class="delivery-option js-delivery-option
              js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
                    data-product-id=${matchingProduct.id}
                    data-delivery-option-id=${deliveryOption.id}>
                        <input type="radio"
                          ${ischecked ? 'checked':''}
                          class="delivery-option-input
                          js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                          name="delivery-option-${matchingProduct.id}">
                        <div>
                          <div class="delivery-option-date">
                            ${dateString}
                          </div>
                          <div class="delivery-option-price">
                            ${priceString} - Shipping
                          </div>
                        </div>
                      </div>
              `;
          })
          return html;
        }

      // to add listener to all options(3*no of cartpoducts)
        document.querySelectorAll('.js-delivery-option')
        .forEach((element)=>{
          element.addEventListener('click',()=>{
            const {productId,deliveryOptionId}= element.dataset;
            
            updateDeliveryOptionId(productId,deliveryOptionId)

            rendorOrderSummary();
            //update payment summary when option of del changes  
            rendorPaymentSummary();
          });
        });


}

/*mvc : model view controller 
code split into three parts
1. model: saves and manage the data -> here it perform by  cart.js
2. view: takes the data and present of page-> here checkpage page is view part
3. controller: runs some code when we iteract with page -> bottom event listners of checkout
   model-> view ->controller->module  a loop where after intration data changes 
   we need to re render this on page by view part
   ******* mvc is design pattern */
