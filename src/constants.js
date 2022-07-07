//Registration
export const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
export const REGISTRATION_URL = '/UsersAccounts/registration';
//Login
export const LOGIN_URL = '/UsersAccounts/login';
