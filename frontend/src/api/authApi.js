import axios from "axios";
 const API_BASE_URL = 'http://localhost:3000/api/auth'
 const api = axios.create ({
  baseURL:API_BASE_URL,
  headers:{
    'Content-Type':'application/json',
  }
 })
 export const loginUser = (data) =>{
  return api.post('/login',data)
 }
  export const registerUser = (data) =>{
  return api.post('/register',data)
 }