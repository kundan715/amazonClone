import {formateCurrency} from "../jscripts/utils/money.js";

function checkFunction(input,output){
    if(formateCurrency(input)===output)return 'passed'
    else return 'failed';
}
//group of related test is called test suit

console.log('test suit: foromate currancy')

console.log('test for normal input');

console.log(checkFunction(4507,'45.07'));

console.log('test for 0');

console.log(checkFunction(0,'0.00'));

console.log('round up to the nearest number');

console.log(checkFunction(3400.3,'34.00'));


//above is called automated test: using code to test code

