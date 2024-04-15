# Static Types

This section explores TypeScript's type system, contrasting it with JavaScript's. We'll delve into type inference capabilities of the TypeScript compiler and showcase features for precise data type control. These features range from guiding the compiler on expected code behavior to configuration adjustments.

### The problem:

```
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

```

![](./images/run2.png)

The above code shows us the dynamic nature of JavaScript. Even though this allow our code to be flexible, it cause problems as shown below 👇

```
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

```

![](./images/run1.png)

This code will get executed without any error in javascript.
Passing a string as argument cause the returned value a NaN and passing a boolean cause the returned value as 1 due to type coersion by javascript.

**_Inorder to solve the about problem TypeScipt have static type feature makes type
assumptions explicit and allows the compiler to report an error when different data
types are used._**

## Type Annotation

In TypeScript we uses **type annotation** for static typing as shown below:

```
// Now we can have the TS version of the above calculate tax function.
const calculateTax = (amount: number): number => {
  return amount * 1.2;
};
console.log(
  `When we pass 10000 which is a number, we get ${calculateTax(10000)}`
);

```

![](./images/typeannotation.png)

```
console.log(`When we pass jithin which is a string we get ${calculateTax("jithin")}`
);
console.log(`When we pass a boolean true we get ${calculateTax(true)}`);

```

**This above log cause compiler error.❌**

![](./images/error1.png)

**Applying type annotation on variables and constants.**

```
let price: number = 20000;
let user: string = "jithin";

let taxAmount: number = calculateTaxTS(price);
let halfShare: number = taxAmount / 2;

console.log("TaxAmount is:", taxAmount);
console.log("Half Share is:", halfShare);
```

## Type Inference

A feature of the typescript compiler is that it can infer types (implicitly do type declaration for us).

if we define :

```
let price = 100;

```

Typescript compiler will automatically infer number type for price.

The compiler is also able to infer the result of the calculateTax function because
it knows that only number parameters will be accepted, that 1.2 is a number value, and
that the result of the multiplication operator on two number values is a number.

The result from the function is assigned to the taxAmount variable, which the compiler is also able to infer as a number. Finally, the compiler knows the type produced by the division operator on two number values and can infer the type of the halfShare variable, too.

**_Now you will have a doubt What will happen if the type inferencing doesn't match. We will see about that below.👇_**

```

const calculateTax = (amount: number) => {
  return (amount * 1.2).toFixed(2);
};

let price = 100;
let taxAmount = calculateTax(price);
let halfShare = taxAmount / 2;
console.log(`Full amount in tax: ${taxAmount}`);
console.log(`Half share: ${halfShare}`);

```

Here the price is infer to number by the compiler. But in the calculateTax, the function returns a string, as the toFixed() method convert the number to string. So the taxAmount variable get infered as a string.

Now a division between two types happen (taxAmount / 2). ([taAamount-string][2-number])

**What happen if this is in JS?**
-The operation returns a number if the taxAmountTS can be typecoersed to a number else it return NaN.

But in **TS automatic type coersion is restricted** so this gives error❌.
![](./images/error2.png)

## 'any' type

While preserving JavaScript's flexibility, TypeScript offers the any type for scenarios where stricter type checking is undesirable, allowing any data type to be assigned to variables, function parameters, or return values.

we can refactor the about example with any:

```
const calculateTax = (amount: any): any => {
return (amount \* 1.2).toFixed(2);
}
```

These annotations tell the compiler that the amount parameter can accept any value
and that the function’s result may be of any type. The use of the any type stops the
compiler from reporting the error produced. **We are responsible for ensuring that your code doesn’t
misuse types.**

### Implicit any

The TypeScript compiler will use any when it is assigning types implicitly and cannot
identify a more specific type to use.
It is good practice to disable the implicit use of any by setting the compiler’s
noImplicityAny setting:

```
{
 "compilerOptions": {
 "target": "ES2022",
 "outDir": "./dist",
 "rootDir": "./src",
 "declaration": true,
 "noImplicitAny": true
 }
}

```

**The compiler will display this warning when it cannot infer a more specific type,
although this doesn’t prevent the explicit use of any.** 👈🏼

## Type union

TypeScript offers a spectrum of type safety. any allows any data type, providing maximum flexibility. On the other hand, type annotations for a single type strictly limit values. Finding a middle ground are type unions, which **define a set of allowed types**.

![](./images/type%20union.png)

```
function calculateTax(amount: number, format: boolean): string | number {
 const calcAmount = amount * 1.2;
 return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}
let taxNumber = calculateTax(100, false);
let taxString = calculateTax(100, true);

```

The type returned by the calculateTax function is the union of the string and number types. It doesn't have a single, clear output type. Instead, it can return either a string or a number. The function can only use features that both strings and numbers have in common (intersection), which in most cases is very limited.

You can see in below image that only toString() is common to both. So string | number type will get only this method to use.

![](./images/effectoftypeunion.png)

Look at the below code to get more clarity !!

```
let taxNumber: string | number = calculateTax(100, false);
let taxString: string | number = calculateTax(100, true);
console.log(`Number Value: ${taxNumber.toFixed(2)}`);
console.log(`String Value: ${taxString.charAt(0)}`);

```

The about code on calculateTax function cause error ❌

![](./images/typeunion%20error.png)

## Type assertion

In TypeScript, a type assertion instructs the compiler to treat a value as a specific type. This is useful for type narrowing, which means converting a broader type (like a union) to a more specific one. To perform a type assertion, you use the as keyword followed by the desired target type.

![](./images/asserting.png)

```
function calculateTax(amount: number, format: boolean): string | number {
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}

let taxNumber = calculateTax(100, false) as number;
let taxString = calculateTax(100, true) as string;

console.log(`Number Value: ${taxNumber.toFixed(2)}`);
console.log(`String Value: ${taxString.charAt(0)}`);

```

The output of above code expression narrows down taxNumber to a number type and taxString to string type so that we can perform type specific methods on them.

![](./images/typeassertionsucess.png)

**_No type conversion is performed by a type assertion, which only tells
the compiler what type it should apply to a value for type checking._**

### Asserting to an unexpected type

```
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

```

In the above code we are type asserting to a non-sepecified type of boolean. This code cause error.❌

![](./images/errortypeassertion2.png)

## Type guard

For primitive values, the typeof keyword can be used to test for a specific type without
needing a type assertion. So that we can apply type specific methods without any error. Let's look into
calculateTax function with type guard.

```
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
```

This function will not give us error. The compiler doesn’t implement the typeof keyword, which is part of the JavaScript
specification. Instead, the compiler trusts that the statements in the conditional block will be executed at runtime only if the value being tested is of the specified type. This knowledge allows the compiler to treat the value as the type being tested. The TypeScript compiler knows that the statements inside the if code block will be executed only if taxValue is a number and allows the number type’s toFixed method to be used without the need for a type assertion.

We can do the if block with switch statement. This will be more readable.

```
switch (typeof taxValue) {
  case "number":
    console.log(`Number Value: ${taxValue.toFixed(2)}`);
    break;
  case "string":
    console.log(`String Value: ${taxValue.charAt(0)}`);
    break;
}
```

## 'never' Type

TypeScript provides the never type for situations where a type guard has dealt with all of the possible types for a value. Observe in the below example, the switch statement is a type guard for the number and string types, which are the only types that will be returned in the string | number union from the function. Once all the possible types have been handled, the compiler will only allow a value to be assigned to the never type

```
function calculateTax(amount: number, format: boolean): string | number {
 const calcAmount = amount * 1.2;
 return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}

let taxValue = calculateTax(100, false);
switch (typeof taxValue) {
 case "number":
 console.log(`Number Value: ${taxValue.toFixed(2)}`);
 break;
 case "string":
 console.log(`String Value: ${taxValue.charAt(0)}`);
 break;
 default:
 let value: never = taxValue;
 console.log(`Unexpected type for value: ${value}`);
}
```

Something has gone wrong if execution reaches the default clause of the switch statement, and TypeScript provides the never type to ensure you can’t accidentally use a value once type guards have been used to exhaustively narrow a value to all of its possible types.

## Unknown type

TypeScript supports the unknown type, which is a safer alternative to any. An unknown value can be assigned only any or itself unless a type assertion or type guard is used.

```
function calculateTax(amount: number, format: boolean): string | number {
 const calcAmount = amount * 1.2;
 return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}
let taxValue = calculateTax(100, false);
switch (typeof taxValue) {
 case "number":
 console.log(`Number Value: ${taxValue.toFixed(2)}`);
 break;
 case "string":
 console.log(`String Value: ${taxValue.charAt(0)}`);
 break;
 default:
 let value: never = taxValue;
 console.log(`Unexpected type for value: ${value}`);
}
let newResult: unknown = calculateTax(200, false);
let myNumber: number = newResult;
console.log(`Number value: ${myNumber.toFixed(2)}`)
```

An unknown value can’t be assigned to another type without a type assertion, so the
compiler produces the following error ❌ when it compiles the code:
![](./images/unknownerror.png)

Now we can do **type assertion**

```
function calculateTax(amount: number, format: boolean): string | number {
 const calcAmount = amount * 1.2;
 return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}
let taxValue = calculateTax(100, false);
switch (typeof taxValue) {
 case "number":
 console.log(`Number Value: ${taxValue.toFixed(2)}`);
 break;
 case "string":
 console.log(`String Value: ${taxValue.charAt(0)}`);
 break;
 default:
 let value: never = taxValue;
 console.log(`Unexpected type for value: ${value}`);
}
let newResult: unknown = calculateTax(200, false);
let myNumber: number = newResult as number;
console.log(`Number value: ${myNumber.toFixed(2)}`)
```

This is a successful compilation.✅

![](./images/unknownsuccess.png)

## nullable types

TypeScript treats null and undefined as legal values for all types. The reason for this is convenience because a lot of existing JavaScript code that may be required for integration into an application uses these values as part of its normal operation, but it does lead to inconsistencies in type checking.
In addition to type inconsistencies, nullable values can lead to runtime errors that are difficult to detect during development and often encountered
by users.

### Restricting nullable assignments

The use of null and undefined can be restricted by enabling the strickNullChecks comiler setting.

```
{
 "compilerOptions": {
 "target": "ES2022",
 "outDir": "./dist",
 "rootDir": "./src",
 "declaration": true,
 "noImplicitAny": true,
 "strictNullChecks": true
 }
}
```

This will cause error when null or undefined is encountered by compiler.

### Removing null from a union with an assertion

![](./images/nullassertion.png)

```
function calculateTax(amount: number, format: boolean): string | number | null {
  if (amount === 0) {
    return null;
  }
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}

let taxValue: string | number = calculateTax(100, false)!;
switch (typeof taxValue) {
 case "number":
  console.log(`Number Value: ${taxValue.toFixed(2)}`);
  break;
 case "string":
  console.log(`String Value: ${taxValue.charAt(0)}`);
  break;
  default:
    if (taxValue === null) {
      console.log("Value is null");
    } else {
      console.log(typeof taxValue);
      let value: never = taxValue;
      console.log(`Unexpected type for value: ${value}`);
    }
}

```

A non-null assertion should be used only when you know that a null
value cannot occur. A runtime error will be caused if you apply the assertion
and a null value does occur. A safer approach is to use a type guard.
