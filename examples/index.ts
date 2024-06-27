/*
Create a function isLegal that returns true or false if a user is above 18. It takes a user as input.

*/

// type UserTypes = {
//   firstname: string;
//   age: number;
//   address: string;
//   lastname: string;
// };
interface UserTypes {
  firstname: string;
  lastname: string;
  age: number;
  email?: string;
}

const isLegal = (user: UserTypes) => {
  return user.age > 18;
};

// console.log(isLegal({ firstname: "jithin", lastname: "B P", age: 25 }));

// static types with union

// .defining a type
type StringOrNumber = string | number;

const printId = (id: StringOrNumber) => {
  console.log(`Id is ${id}`);
};

printId("gdydssd");
printId(323);

// enum

enum StatusCode {
  Success = 200,
  NotFound = 404,
  ServerError = 500,
}

const send = () => {
  console.log(StatusCode.Success);
};

send();
