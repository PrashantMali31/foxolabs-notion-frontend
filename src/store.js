import {createStore,applyMiddleware,compose, combineReducers} from "redux"

import reducer from "./redux/reducers"
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const combin = combineReducers({
  user: reducer
})
const allMiddleware = [thunk, promise];
const middleware = applyMiddleware(...allMiddleware);


const store = createStore(combin, compose(middleware));

export default store
