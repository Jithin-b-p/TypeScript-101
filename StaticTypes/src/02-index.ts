// Any type:

/*
We can use the flexibility of JS in TS using any as type.
*/

/*
This annotation tell the compiler that the amount can have any type. One consequence of using any is that it can be assigned to all other types without triggering a compiler warning. 
The compiler trusts that the any value can be treated as a number, which means a type 
mismatch occurs at runtime.
*/

/*
=====================================
The below code cause error at runtime
=====================================
*/

// function calculateTax(amount: any): any {
//   return `$${(amount * 1.2).toFixed(2)}`;
// }
// let price = 100;
// let taxAmount = calculateTax(price);
// let halfShare = taxAmount / 2;
// console.log(`Price: ${price}`);
// console.log(`Full amount in tax: ${taxAmount}`);
// console.log(`Half share: ${halfShare}`);
// let newResult: any = calculateTax(200);
// let myNumber: number = newResult;
// console.log(`Number value: ${myNumber.toFixed(2)}`);

/*
The any value newResult is assigned to a number without causing a compiler warning. 
At runtime, the calculateTax method returns a string result, which doesn’t define 
the toFixed method invoked in the last statement
*/

/*
The TypeScript compiler will use any when it is assigning types implicitly and cannot 
identify a more specific type to use.
*/

// Implicit any:

function calculateTax2(amount): any {
  return `$${(amount * 1.2).toFixed(2)}`;
}
let price2 = 100;
let taxAmount2 = calculateTax2(price2);
let halfShare2 = taxAmount2 / 2;
let personVal2 = calculateTax2("Bob");
console.log(`Price: ${price2}`);
console.log(`Full amount in tax: ${taxAmount2}`);
console.log(`Half share: ${halfShare2}`);
console.log(`Name: ${personVal2}`);

/*
In the above code TS compiler infer the amount type as any. Which cause no compile type error. but during 
runtime the call with string "Bob" cause personVal2 as NaN
*/

/*
We can disable implicit use of any by setting compiler option "noImplicitAny" to true in tsconfig.json file.
But this doesnot prevent us from using explicit any.
*/
