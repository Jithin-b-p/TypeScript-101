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

console.log(isLegal({ firstname: "jithin", lastname: "B P", age: 25 }));
