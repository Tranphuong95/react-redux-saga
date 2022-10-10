import { call, put, takeLatest } from "redux-saga/effects";
import { API_URL } from "../../config-url";
import {
  addUserFail,
  addUserSuccess,
  deleteUserFail,
  deleteUserSuccess,
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
      yield put(getListUsersFail());
    }
  } catch (error) {
    console.log(error);
    yield put(getUserFail());
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
        body: JSON.stringify(action.payload.body),
      })
        .then((res) => res.json())
        .then((res) => res);
    });
    //POST user data success-->get data user
    if (results.statusCode===0) {
      yield put(addUserSuccess());
      action.payload.notify("Thêm mới thành công", {variant: "success", anchorOrigin:{
        vertical: 'top',
        horizontal: 'right',
      }} )
    } else {
      yield put(addUserFail());
      action.payload.notify("Thêm mới thất bại", {variant: "error", anchorOrigin:{
        vertical: 'top',
        horizontal: 'right',
      }} )
    }
  } catch (error) {
    console.log(error);
    yield put(addUserFail());
    action.payload.notify("Thêm mới thất bại", {variant: "error", anchorOrigin:{
      vertical: 'top',
      horizontal: 'right',
    }} )
  }
}
function* getUserSaga(action) {
  try {
    const results = yield call(async () => {
      return await fetch(`${API_URL}/users/${action.payload.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => res);
    });
    if (results?.statusCode===0) {
      yield put(getUserSuccess(results));
    } else {
      yield put(getUserFail());
    }
  } catch (error) {
    console.log(error);
    yield put(getUserFail());
  }
}
function* updateUserSaga(action) {
  try {
    const results = yield call(async () => {
      const {id, userName, email, phoneNumber}=action.payload.body;
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
      action.payload.notify("Cập nhật thông tin user thành công", {variant: "success", anchorOrigin:{
        vertical: 'top',
        horizontal: 'right',
      }} )
    } else {
      yield put(updateUserFail());
      action.payload.notify("Cập nhật thông tin user thất bại", {variant: "error", anchorOrigin:{
        vertical: 'top',
        horizontal: 'right',
      }} )
    }
  } catch (error) {
    console.log(error);
    yield put(updateUserFail());
    action.payload.notify("Cập nhật thông tin user thất bại", {variant: "error", anchorOrigin:{
      vertical: 'top',
      horizontal: 'right',
    }} )
  }
}
//delete user

function* deleteUserSaga(action){
  try {
    console.log("action", action)
    const results=yield call(async()=>{
      return await fetch(
        `${API_URL}/users/${action.payload.id}`,
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
      yield put(deleteUserSuccess())
      yield put(getListUsers(action.payload.notify))
      action.payload.notify("Xóa user thành công", {variant: "success", anchorOrigin:{
        vertical: 'top',
        horizontal: 'right',
      }} )
    }
    else{
      yield put(deleteUserFail());
      action.payload.notify("Xóa user thất bại", {variant: "error", anchorOrigin:{
        vertical: 'top',
        horizontal: 'right',
      }} )
    }
  } catch (error) {
    yield put(deleteUserFail());
    action.payload.notify("Xóa user thất bại", {variant: "error", anchorOrigin:{
      vertical: 'top',
      horizontal: 'right',
    }} )
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
