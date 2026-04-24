 const API_URL = {
   CREATE_USER: "/api/v1/user",
   GET_ALL_USER: "/api/v1/user",
   UPDATE_USER: "/api/v1/user",
   DELETE_USER: "/api/v1/user",
   UPLOAD_FILE: "/api/v1/file/upload",
   REGISTER_USER: "/api/v1/user/register",
   LOGIN: "/api/v1/auth/login",
   GET_ACCOUNT_BY_ACCESS_TOKEN: "/api/v1/auth/account",
   LOGOUT: "/api/v1/auth/logout",
   GET_ALL_BOOK: "/api/v1/book",
   DELETE_BOOK: "/api/v1/book",
   CREATE_BOOK: "/api/v1/book",
   UPDATE_BOOK: "/api/v1/book",
 };

const COMMON = {
  AUTH_DELAY: 1000
}

export {API_URL, COMMON};