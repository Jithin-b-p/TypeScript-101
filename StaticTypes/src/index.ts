/*
======================
type assertion
======================
A type assertion tells the TypeScript compiler to treat a value as a specific type, known 
as type narrowing. A type assertion is one of the ways that you can narrow a type from a 
union. A type is asserted using the as keyword
*/

function calculateTax(amount: number, format: boolean): string | number {
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}
let taxNumber = calculateTax(100, false) as number;
let taxString = calculateTax(100, true) as string;
console.log(`Number Value: ${taxNumber.toFixed(2)}`);
console.log(`String Value: ${taxString.charAt(0)}`);

/*
In the listing, the as keyword is used to tell the compiler that the value assigned to the 
taxNumber variable is a number and that the value assigned to the taxString variable 
is a string important: No type conversion is performed by a type assertion, which only tells 
the compiler what type it should apply to a value for type checking. 
*/

// asserting to an unexpected type

function calculateTax(amount: number, format: boolean): string | number {
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}
let taxNumber = calculateTax(100, false) as number;
let taxString = calculateTax(100, true) as string;
let taxBoolean = calculateTax(100, false) as boolean;
console.log(`Number Value: ${taxNumber.toFixed(2)}`);
console.log(`String Value: ${taxString.charAt(0)}`);
console.log(`Boolean Value: ${taxBoolean}`);

// This Code return an error/
// you can force the assertion and override the compiler’s warning by first asserting to any and then to the type you require
