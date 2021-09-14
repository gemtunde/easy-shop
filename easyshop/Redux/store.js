
import { createStore , combineReducers, applyMiddleware} from "redux";
import  thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//import reducer
import cartItems from "./Reducers/cartItem";

const reducer = combineReducers({
    cartItems : cartItems
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store ;
