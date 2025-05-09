export const validator = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{1,}$/,
  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$/
}
