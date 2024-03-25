// The Problem:
let myData;
console.log(`${myData} is of type ${typeof myData}`);
myData = 12;
console.log(`${myData} is of type ${typeof myData}`);
myData = "Jithin";
console.log(`${myData} is of type ${typeof myData}`);
myData = true;
console.log(`${myData} is of type ${typeof myData}`);
myData = null;
console.log(`${myData} is of type ${typeof myData}`);

/*
Even though the dynamic nature of Javascript allow flexibility. It causes problems as seen below 👇
*/

const calculateTax = (amount) => {
  return amount * 1.2;
};
console.log(
  `When we pass 10000 which is a number, we get ${calculateTax(10000)}`
);
console.log(
  `When we pass jithin which is a string we get ${calculateTax("jithin")}`
);
// Here the boolean true is coerced to 1 by javascript
console.log(`When we pass a boolean true we get ${calculateTax(true)}`);

/* Inorder to solve the about problem TypeScipt have static type feature makes type 
assumptions explicit and allows the compiler to report an error when different data 
types are used. */

// Static types are defined using type annotation

// Now we can have the TS version of the above calculate tax function.
const calculateTaxTS = (amount: number): number => {
  return amount * 1.2;
};
console.log(
  `When we pass 10000 which is a number, we get ${calculateTaxTS(10000)}`
);
/*
==================================
The below code generate type error
==================================
*/
// console.log(
//   `When we pass jithin which is a string we get ${calculateTaxTS("jithin")}`
// );

// console.log(`When we pass a boolean true we get ${calculateTaxTS(true)}`);

/* 
The type annotation on the function parameter tells the compiler that the function 
accepts only number values. The annotation that follows the function signature indicates the result type and tells the compiler that the function returns only number.
values.
*/

// Type annotations can also be applied to variables and constants.

let price: number = 20000;
let user: string = "jithin";

let taxAmount: number = calculateTaxTS(price);
let halfShare: number = taxAmount / 2;

console.log("TaxAmount is:", taxAmount);
console.log("Half Share is:", halfShare);

/*
Type inference.
A feature of the typescript compiler is that it can infer types (implicitly do type declaration for us).

if we define :
let price = 100; 

Typescript compiler will automatically infer number type for price.

The compiler is also able to infer the result of the calculateTaxTS function because 
it knows that only number parameters will be accepted, that 1.2 is a number value, and 
that the result of the multiplication operator on two number values is a number.

The result from the function is assigned to the taxAmount variable, which the compiler is also able to infer as a number. Finally, the compiler knows the type produced by the division operator on two number values and can infer the type of the halfShare variable, too.
*/

/*
==================================================
Let's see what happen when type infer doesnt match.
==================================================
*/

/*
==================================
The below code generate type error
==================================
*/

// const calculateTaxTSFixed = (amount: number) => {
//   return (amount * 1.2).toFixed(2);
// };

// let priceTS = 100;
// let taxAmountTS = calculateTaxTSFixed(priceTS);
// let halfShareTS = taxAmountTS / 2;
// console.log(`Full amount in tax: ${taxAmountTS}`);
// console.log(`Half share: ${halfShareTS}`);

/*
Here the priceTS is infer to number by the compiler. But in the calculateTaxTSFixed, the function returns a string as the toFixed() method convert the number to string. So the taxAmountTS variable get infered as a string. 

Now a division between two types happen in line number 104: 

  What happen if this is in JS?
    -The operation returns a number if the taxAmountTS can be typecoersed to a number else it return NaN.
  But in TS automatic type coersion is restricted so this gives error.
*/
