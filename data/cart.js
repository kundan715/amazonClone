
export let cart;

laodFromStorage();

export function laodFromStorage(){
  cart=  JSON.parse(localStorage.getItem('cart'));

  if(!cart){
  cart=[];
  }
}


function saveToStorage(){
 localStorage.setItem('cart',
  JSON.stringify(cart)
 )
}

export  function addToCart(productxId){
          let matchingItem;
          let quantity;
          const selectQuantity=document.querySelector(`.js-quantity-selector-${productxId}`);
          if(selectQuantity){
            quantity=Number(selectQuantity.value);
          }
          else{
            quantity=1;
          }

          cart.forEach((item)=>{
            if(productxId===item.productId)matchingItem=item;
          })

          if(matchingItem){
            matchingItem.quantity+= quantity;
          }
          else{
            cart.push({
            productId:productxId,
            quantity:quantity,
            deliveryOptionId:'1'
            })
          }
          saveToStorage();
          //console.log(cart);
          
        }

export  function countQuantity(){
            let cartQuantity=0;
            cart.forEach((item)=>{
            cartQuantity+=item.quantity;
            });
            return cartQuantity;
        }

export  function updateCartQuantity(){
            // change cart count;
            let cartQuantity=0;
            cart.forEach((item)=>{
            cartQuantity+=item.quantity;
            });
            if(cartQuantity) document.
            querySelector('.js-cart-quantity').innerHTML=countQuantity();
        }
      
    
export  function removefromCart(productId){
            // let newCart=[];
            cart=cart.filter((item)=>{
              if(item.productId!==productId)return item;
            })
            saveToStorage();

            // cart.forEach((cartItem)=>{
            //   if(cartItem.productId!==productId){
            //     newCart.push(cartItem);
            //   }
            // });
            // cart= newCart;
        }

 
export function updateQuantity(productId, newQuantity) {
  if(newQuantity>=0 && newQuantity<1000){

  
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
  }
}


export function updateDeliveryOptionId(productId,deliveryOptionId){
          if(deliveryOptionId!='1' && 
              deliveryOptionId!='2' && 
              deliveryOptionId!='3') return;
          let matchingItem;

          cart.forEach((item)=>{
            if(productId===item.productId)matchingItem=item;
          })

          if(!matchingItem)return;
          matchingItem.deliveryOptionId=deliveryOptionId;

          saveToStorage();
}


export  function loadCart(fun){
      const xhr= new XMLHttpRequest();

      xhr.addEventListener('load',()=>{
        // console.log(xhr.response);
        fun();
      })

      xhr.open('GET','https://supersimplebackend.dev/cart');

      xhr.send();// we send the get request to above link
      
  }