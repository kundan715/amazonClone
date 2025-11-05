
function CreatCart(localStorageKey){
    
const cart = {
    cartItem:undefined,

    laodFromStorage(){
    this.cartItem=  JSON.parse(localStorage.getItem(localStorageKey));

    if(!this.cartItem){
            this.cartItem=[
            {productId:'8b5a2ee1-6055-422a-a666-b34ba28b76d4',
                quantity:1,
                deliveryOptionId:'1'},
            {productId:'19c6a64a-5463-4d45-9af8-e41140a4100c',
                quantity:1,
                deliveryOptionId:'2'}
            ];
        }
    },

    
    
    
    saveToStorage(){
        localStorage.setItem(localStorageKey,
        JSON.stringify(this.cartItem)
        )
    },
    

    
    
    addToCart(productxId){
          let matchingItem;
          let quantity;
          const selectQuantity=document.querySelector(`.js-quantity-selector-${productxId}`);
          if(selectQuantity){
            quantity=Number(selectQuantity.value);
          }
          else{
            quantity=1;
          }

          this.cartItem.forEach((item)=>{
            if(productxId===item.productId)matchingItem=item;
          })

          if(matchingItem){
            matchingItem.quantity+= quantity;
          }
          else{
            this.cartItem.push({
            productId:productxId,
            quantity:quantity,
            deliveryOptionId:'1'
            })
          }
          this.saveToStorage();
          //console.log(cart);
          
    },

    
    countQuantity(){
           let cartQuantity=0;
            this.cartItem.forEach((item)=>{
            cartQuantity+=item.quantity;
            });
            return cartQuantity;
    },

    updateCartQuantity(){
            // change cart count;
            let cartQuantity=0;
            this.cartItem.forEach((item)=>{
            cartQuantity+=item.quantity;
            });
            if(cartQuantity) document.
            querySelector('.js-cart-quantity').innerHTML=this.countQuantity();
    },

    removefromCart(productId){
            // let newCart=[];
            this.cartItem=this.cartItem.filter((item)=>{
              if(item.productId!==productId)return item;
            })
            this.saveToStorage();

            // cart.forEach((cartItem)=>{
            //   if(cartItem.productId!==productId){
            //     newCart.push(cartItem);
            //   }
            // });
            // cart= newCart;
    },

    
    updateQuantity(productId, newQuantity) {
    if(newQuantity>=0 && newQuantity<1000){

    
    let matchingItem;

    this.cartItem.forEach((cartItem) => {
        if (productId === cartItem.productId) {
        matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;

    this.saveToStorage();
    }
    },

    
 
    updateDeliveryOptionId(productId,deliveryOptionId){
          if(deliveryOptionId!='1' && 
              deliveryOptionId!='2' && 
              deliveryOptionId!='3') return;
          let matchingItem;

          this.cartItem.forEach((item)=>{
            if(productId===item.productId)matchingItem=item;
          })

          if(!matchingItem)return;
          matchingItem.deliveryOptionId=deliveryOptionId;

          this.saveToStorage();
    }
};

    return cart;

}





// cart.laodFromStorage();

// cart.addToCart("58b4fc92-e98c-42aa-8c55-b6b79996769a");

// console.log(cart);

const regularCart=  CreatCart('cart-oop');

regularCart.laodFromStorage();

const businessCart= CreatCart('business-cart');

businessCart.laodFromStorage();

console.log(regularCart);
console.log(businessCart);
