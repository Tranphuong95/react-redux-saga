import { all } from "redux-saga/effects";
import UsersSaga from "./contains/users/saga";
function* rootSaga() {
  yield all([
    UsersSaga(),
  ]);
}

export default rootSaga;