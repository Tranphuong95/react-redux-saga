import { call, put, takeLatest } from "redux-saga/effects";
import { API_URL } from "../../config-url";
import {
  addUserFail,
  addUserSuccess,
  getListUsers,
  getListUsersFail,
  getListUsersSuccess,
  getUserFail,
  getUserSuccess,
  updateUserFail,
  updateUserSuccess,
} from "./actions";
import * as Type from "./contants";
/**
 * Vào trang  ${API_URL}/docs để xem các api
 */

function* getListUserSaga(action) {
  try {
    const results = yield call(async () => {
      return await fetch(`${API_URL}/users`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => res);
    });
    if (results?.statusCode===0) {
      yield put(getListUsersSuccess({data: results.data, pagination: results.pagination}));
    } else {
      yield put(getListUsersFail);
    }
  } catch (error) {
    console.log(error);
    yield put(getUserFail);
  }
}
//Sau khi nhận đươc action ADD_USER sẽ tiến hành gọi hàm addUserSaga
function* addUserSaga(action) {
  try {
    //POST user data
    const results = yield call(async () => {
      return await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.payload),
      })
        .then((res) => res.json())
        .then((res) => res);
    });
    //POST user data success-->get data user
    if (results.statusCode===0) {
      yield put(addUserSuccess());
    } else {
      yield put(addUserFail);
    }
  } catch (error) {
    console.log(error);
    yield put(addUserFail);
  }
}
function* getUserSaga(action) {
  try {
    const results = yield call(async () => {
      return await fetch(`${API_URL}/users/${action.payload}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => res);
    });
    if (results?.statusCode===0) {
      yield put(getUserSuccess(results));
    } else {
      yield put(getUserFail);
    }
  } catch (error) {
    console.log(error);
    yield put(getUserFail);
  }
}
function* updateUserSaga(action) {
  try {
    const results = yield call(async () => {
      const {id, userName, email, phoneNumber}=action.payload;
      return await fetch(
        `${API_URL}/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({userName, email, phoneNumber}),
        }
      )
        .then((res) => res.json())
        .then((res) => res);
    });
    if (results?.statusCode===0) {
      yield put(updateUserSuccess());
    } else {
      yield put(updateUserFail);
    }
  } catch (error) {
    console.log(error);
    yield put(addUserFail);
  }
}
//delete user

function* deleteUserSaga(action){
  try {
    const results=yield call(async()=>{
      return await fetch(
        `${API_URL}/users/${action.payload}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
        .then((res) => res.json())
        .then((res) => res);
    });
    if(results.statusCode===0){
      yield put(getListUsers())
    }
  } catch (error) {
    
  }
}
function* UsersSaga() {
  yield takeLatest(Type.GET_USERS, getListUserSaga);
  yield takeLatest(Type.ADD_USER, addUserSaga);
  yield takeLatest(Type.GET_USER, getUserSaga);
  yield takeLatest(Type.UPDATE_USER, updateUserSaga);
  yield takeLatest(Type.DELETE_USER, deleteUserSaga);
}

export default UsersSaga;
