function calculateTax(amount) {
  return amount * 1.2;
}

function calculateTax(amount, tax) {
  return amount * tax;
}

let taxValue = calculateTax(1000);
console.log(taxValue);

function calculateTax(amount, discount) {
  return amount * 1.2 - discount;
}
let taxValue = calculateTax(100, 0);
console.log(`2 args: ${taxValue}`);
taxValue = calculateTax(100);
console.log(`1 arg: ${taxValue}`);
taxValue = calculateTax(100, 10, 20);
console.log(`3 args: ${taxValue}`);
