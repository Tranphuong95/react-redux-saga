import { combineReducers } from "redux";
import UserReducers from "./contains/users/reducer";

const rootReducers = combineReducers({
    userReducers: UserReducers,
})
export default rootReducers