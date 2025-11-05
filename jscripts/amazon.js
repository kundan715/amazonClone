import {cart, addToCart,updateCartQuantity} from "../data/cart.js";
// import {cart as myCart} from "../data/cart.js"; here it solve name confict
// and it results that we can create a new var name cart 
import {products,loadProduct,loadProductFetch} from "../data/products.js";
import {formateCurrency} from './utils/money.js';

/*
loadProduct();// as we load the product but below code dont wait for load and redor empty
products array(undefined) so we put this code into a fun and pass to loadproduct and run
when products ele is loaded */

loadProduct(rendorProductGrid);

function rendorProductGrid(){

    let productHTML='';

    products.forEach((products)=>{
        let html=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src=${products.getImageUrl()}>
            <div class="product-rating-count link-primary">
            ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
          ${products.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${products.extraInfoHTML()}
          <div class="product-spacer"></div>


          <div class="added-to-cart add-${products.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary
          js-add-to-cart" data-product-id="${products.id}">
            Add to Cart
          </button>
        </div>`
        productHTML+=html;
    }) 
       
    document.querySelector('.js-product-grid').innerHTML=productHTML;
    updateCartQuantity();
    
    

    

    function appearAddedText(timeOut,productxId){
      if(timeOut.classCheck){
        clearTimeout(timeOut.timeoutId);
        document.querySelector(`.add-${productxId}`).
        classList.remove('added-1-opacity');
        setTimeout(()=>{
          document.querySelector(`.add-${productxId}`).
          classList.add('added-1-opacity');
        },50);
      }
      else{
        document.querySelector(`.add-${productxId}`).
        classList.add('added-1-opacity');
      }
      
      timeOut.classCheck=true;
      timeOut.timeoutId = setTimeout(()=>{
        document.querySelector(`.add-${productxId}`).
        classList.remove('added-1-opacity');
        timeOut.classCheck=false;
      },2000); 
      /*add a class to uinque class for
      'added'text to make opacity 1;*/
    }
      

    document.querySelectorAll('.js-add-to-cart').
    forEach((button)=>{
        let timeOut={
          classCheck:false,
          timeoutId:null
        };// it define a added-text have class (opacity 1)
        button.addEventListener('click',()=>{
          // console.log(button.dataset);
          // we add data attribut button so that  button have identification key;
          const productxId= button.dataset.productId;

          addToCart(productxId);

          updateCartQuantity();

          appearAddedText(timeOut,productxId);
          // it is for added text- to remove and add class;
          /*point to be noted that here we pass oject 
          becuase it passes reference and change in oject value also reflect
          on current function;*/

          
        });
    });

  }