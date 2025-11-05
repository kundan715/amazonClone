import { rendorOrderSummary } from "./checkout/orderSummary.js";
import { rendorPaymentSummary } from "./checkout/paymentSummary.js";
import { rendorCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";



// if we write a promise function above it run side by side with function :not wait for above one

//loadProduct(()=>{
//         rendorCheckoutHeader();
//         rendorOrderSummary();
//         rendorPaymentSummary();
// });

       

// as we a rendor the cart but dont have product so first we need to load it then run below
        /*
        new Promise((resolve)=>{
                // console.log('start promise');
                loadProduct(()=>{
                        // console.log('loading end');
                        resolve();
                })
        }).then(()=>{
                rendorCheckoutHeader();
                rendorOrderSummary();
                rendorPaymentSummary();
                // console.log('next step');
        })
        */

        
        /*
        new Promise((resolve)=>{
                console.log('start promise1');
                loadProduct(()=>{
                        console.log('loading product end');
                        resolve('value1');//this value return to next .then 
                })


        }).then((value)=>{
                console.log(value);
                return new Promise((resolve)=>{
                        console.log('start promise2');
                        loadCart(()=>{
                                console.log('loading Cart end');
                                resolve();
                        })
                })
                
               
        }).then(()=>{
                console.log('redor data start');
                rendorCheckoutHeader();
                rendorOrderSummary();
                rendorPaymentSummary();
        })*/


        //array of promises
        
        

        /*
        Promise.all([
                
                loadProductFetch(),
                new Promise((resolve)=>{
                               
                                loadCart(()=>{
                                        // console.log('loading Cart end');
                                        resolve('value2');
                                })
                })
        ]).then((value)=>{
                // console.log(value);// value get a oject of both values
                rendorCheckoutHeader();
                rendorOrderSummary();
                rendorPaymentSummary();
        })

        */

        // write above using await and async

        async function loadData(){
            try{
                // throw 'error1 created by throw syncronous way';     
            await loadProductFetch()

            const value=await new Promise((resolve,reject)=>{
                    loadCart(()=>{
                            // console.log('loading Cart end');
                        //     reject('error created by reject: asyncronous way')
                            resolve('value3');
                    })
            })
            }catch(error){
                console.log('unexpected error:',error);
            }
            rendorCheckoutHeader();
            rendorOrderSummary();
            rendorPaymentSummary();
        }

        loadData();
        




// async and await function
        // async fuction return a promis ,and return value(value2) similare to response value


        /*
        async function loadData(){
            console.log('load data');
            //we use await :to wait for above compilation
            await loadProductFetch();
            return 'value2';
        }
        
        /* this is same promise version of above
        function loadData(){
            return new Promise(()=>{
                console.log('load data');
                resolve();
            }).then(()=>{
                loadProductFetch();
                resolve('value2');
            }).then((value)=>{
                return value;
            });
        }
        
        loadData().then((value)=>{
            console.log(value);
        })
        
        */





 


