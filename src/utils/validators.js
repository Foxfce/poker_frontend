import {string, object, ref} from 'yup';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerSchema = object({
  username : string().email('Invalid email input').required("Please insert your Email"),
  password: string().min(4).required("Please insert your password"),
  confirmPassword: string().oneOf([ref("password")], `confirmPassword must match password`),
}).noUnknown();
// for exclude unwanted variable in schema

export const loginSchema = object({
  username : string().email('Invalid email input').required("Please insert your Email"),
  password: string().required("Please insert your password"),
}).noUnknown();