import {formateCurrency} from '../jscripts/utils/money.js';

export function getProduct(productId){
          let matchingProduct;
          //find out product having this id
          products.forEach((product)=>{
              if(product.id===productId){matchingProduct=product;}
          });
          return matchingProduct;
      }



class product{
   id;
   image;
   name;
   rating;
   priceCents;


  constructor(productDetails){
    this.id=productDetails.id;
    this.image=productDetails.image;
    this.name=productDetails.name;
    this.rating=productDetails.rating;
    this.priceCents=productDetails.priceCents;
    
  }
  getImageUrl(){
    return `images/ratings/rating-${this.rating.stars *10}.png`;
  }
  getPrice(){
    return`$${formateCurrency(this.priceCents)}`; 
  }

  extraInfoHTML(){
    return ``;
  }
}

class Clothing extends product{
  sizeChartLink;
  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink=productDetails.sizeChartLink;
  }
  extraInfoHTML(){
    return `<a href='../images/clothing-size-chart.png' target='_blank'>
      Size Chart</a>`;
  }
}

class Appliance extends product{
  instructionLink;
  warrantyLink;
  constructor(productDetails){
    super(productDetails);
    this.instructionLink=productDetails.instructionLink;
    this.warrantyLink= productDetails.warrantyLink;
  }
  extraInfoHTML(){
    return `
    <a href="${this.instructionLink}" target="_blank">Instructions</a>
    <a href="${this.warrantyLink}" target="_blank">Warranty Details</a>
    `;
  }
}

// we now load product details from backend


export let products=[];

export  function loadProduct(fun){
      const xhr= new XMLHttpRequest();

      xhr.addEventListener('load',()=>{
        // console.log(xhr.response);
        products=JSON.parse(xhr.response).map((productDetails)=>{

          if(productDetails.type==='clothing')return new Clothing(productDetails);
          // else if(productDetails.type==='appliance')return new Appliance(productDetails);
          else return new product(productDetails);
        });
        // console.log(products);

        fun();
      })
      
      // deal with the error;
      xhr.addEventListener('error',()=>{
        console.log('unexpected error ');})

      xhr.open('GET','https://supersimplebackend.dev/products');

      xhr.send();// we send the get request to above link
      // console.log('loadProduct');
       
  }

  // loadProduct();

  // 2nd chaper : get product by fetching data using fetch()function


  export  function loadProductFetch(){

      const promise= fetch('https://supersimplebackend.dev/products')
      .then((responseFetch)=>{
        // console.log(responseFetch);// it is an object
        return  responseFetch.json()// here whole statement return a promis that yes i will 
        // give you the parse JSON data form this object which is return by fetch promise

      }).then((productData)=>{
          products=productData.map((productDetails)=>{
          
          if(productDetails.type==='clothing')return new Clothing(productDetails);
          // else if(productDetails.type==='appliance')return new Appliance(productDetails);
          else return new product(productDetails);
        });
        console.log('load product');
      }).catch((error)=>{
        console.log(error);
      });

      return promise;
       
  }


