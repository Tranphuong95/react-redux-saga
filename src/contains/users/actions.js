import * as TYPE from "./contants";

export const addUser=(body, notify)=>{
    return ({
        type: TYPE.ADD_USER,
        payload: {body, notify}
    })
}
export const addUserSuccess=(data)=>{
    return({
        type: TYPE.ADD_USER_SUCCESS, // Đùng với redux saga
        payload: {...data}
    })
};
export const addUserFail=()=>{
    return({
        type: TYPE.ADD_USER_FAIL, // Đùng với redux saga
    })
};

export const deleteUser=(id, notify)=>{
    return({
        type: TYPE.DELETE_USER,
        payload: {id, notify}
    })
}
export  const getListUsers=(notify)=>{
    return({
        type: TYPE.GET_USERS,
        payload: {notify}
    })
};
export  const getListUsersSuccess=(data)=>{
    return ({
        type: TYPE.GET_USERS_SUCCESS,
        datas: data.data,
        pagination: data.pagination
    })
};
export  const getListUsersFail=()=>{
    return({
        type: TYPE.GET_USERS_FAIL
    })
};
export  const getUser=(id, notify)=>{
    return({
        type: TYPE.GET_USER,
        payload: {id, notify}
    })
};
export  const getUserSuccess=(data)=>{
    return ({
        type: TYPE.GET_USER_SUCCESS,
        payload: data
    })
};
export  const getUserFail=(id)=>{
    return({
        type: TYPE.GET_USER_FAIL
    })
};

export  const updateUser=(body, notify)=>{
    return({
        type: TYPE.UPDATE_USER,
        payload: {body, notify}
    })
};
export  const updateUserSuccess=(data)=>{
    return ({
        type: TYPE.UPDATE_USER_SUCCESS,
        payload: {...data}
    })
};
export  const updateUserFail=()=>{
    return({
        type: TYPE.UPDATE_USER_FAIL
    })
};