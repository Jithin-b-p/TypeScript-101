/*
Type guard
*/

function calculateTax(amount: number, format: boolean): string | number {
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}
let taxValue = calculateTax(100, false);

if (typeof taxValue === "number") {
  console.log(`Number Value: ${taxValue.toFixed(2)}`);
} else if (typeof taxValue === "string") {
  console.log(`String Value: ${taxValue.charAt(0)}`);
}

/*
The compiler doesn’t implement the typeof keyword, which is part of the JavaScript 
specification. Instead, the compiler trusts that the statements in the conditional block 
will be executed at runtime only if the value being tested is of the specified type. This 
knowledge allows the compiler to treat the value as the type being tested. The TypeScript compiler knows that the statements inside the if code block will be 
executed only if taxValue is a number and allows the number type’s toFixed method 
to be used without the need for a type assertion,
*/
// type guarding with switch statement

switch (typeof taxValue) {
  case "number":
    console.log(`Number Value: ${taxValue.toFixed(2)}`);
    break;
  case "string":
    console.log(`String Value: ${taxValue.charAt(0)}`);
    break;
}
