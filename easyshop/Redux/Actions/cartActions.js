import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
     } from "../constants";
    
     //send or dispatch payload to the reducers,
     //reducers than store it in the state and state makes it availale to the whole 
     //application
     export const addToCart = (payload) => {
         return {
             type : ADD_TO_CART,
             payload
         }
     }

     export const removeFromCart = (payload) => {
         return{
             type : REMOVE_FROM_CART,
             payload
         }
     }
     export const clearCart = () => {
         return{
             type : CLEAR_CART
         }
     }