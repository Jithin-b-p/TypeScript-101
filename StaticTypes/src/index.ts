/*
==================
Type union
==================
On one extreme of the type safety spectrum, the any feature grants unrestricted flexibility.
At the opposite end, strict type annotations limit acceptable values to a single type.
Bridging the gap, TypeScript offers type unions, allowing you to define a collection of permitted types.
*/

const calculateTax = (amount: number, format: boolean): number | string => {
  return format ? (amount * 1.2).toFixed(2) : amount * 1.2;
};
console.log(calculateTax(100000, true));

/*
The type returned by the calculateTax function is a union of number and string.
It is important to understand that a type union is handled as a type in its own right, 
whose features are the intersection of the individual types. 

You can only use the properties and methods defined by all the types in the union, 
which can be useful for complex types but is limited by 
the small common API presented by primitive values.
*/

/*
============================
below code cause type error
============================

toFixed() is not common to number and string type.
*/

// function calculateTax2(amount: number, format: boolean): string | number {
//   const calcAmount = amount * 1.2;
//   return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
// }
// let taxNumber: string | number = calculateTax2(100, false);
// let taxString: string | number = calculateTax2(100, true);
// console.log(`Number Value: ${taxNumber.toFixed(2)}`);
