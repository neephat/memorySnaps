import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const myStore = createStore(rootReducer, applyMiddleware(logger, thunk));
export default myStore
