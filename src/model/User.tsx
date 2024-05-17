export default interface User {
  username: string,
  email: string,
  credit: number
}

const DefaultUser = {
  username: "",
  email: "",
  credit: 0
};

export {
  DefaultUser
}