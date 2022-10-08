import * as TYPE from "./contants";

export const addUser=(body)=>{
    return ({
        type: TYPE.ADD_USER,
        payload: body
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

export const deleteUser=(id)=>{
    return({
        type: TYPE.DELETE_USER,
        payload: id
    })
}
export  const getListUsers=()=>{
    return({
        type: TYPE.GET_USERS,
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
export  const getUser=(id)=>{
    return({
        type: TYPE.GET_USER,
        payload: id
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

export  const updateUser=(body)=>{
    return({
        type: TYPE.UPDATE_USER,
        payload: body
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