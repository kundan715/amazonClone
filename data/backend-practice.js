const xhr= new XMLHttpRequest();// new object of class 


xhr.addEventListener('load',()=>{
    console.log(xhr.response);// response is property not a method
})
// xhr.open('GET','https://supersimplebackend.dev');

// xhr.send();

// xhr.response// here is a problem that as it asyncronus so do not wait for comption of 
// load the respons and declared as undefined : to overcome this we add eventlistener

// xhr.open('GET','https://supersimplebackend.dev/hello');

// xhr.send();

xhr.open('GET','https://supersimplebackend.dev/products/first');

xhr.send();
//can have multiple request:documentation, images/apple.jpg

/*every response have status id: start with 4-its problem in request
5- problem in backend, 2- no problem: response delivered */

/*
    backend response in many types of data:
    1)text- /

    2)image- images/apple.jgp

    3)html- /documentation

    4)json- /products/first

    and browser rendor this response in image , html, text and all type 
    of respose send by backend
*/

