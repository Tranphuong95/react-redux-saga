import * as Type from "./contants";
const initialState = {
  usersData: {
    data: [],
    pagination: { page: 1, limit: 10 },
  },
  user: {},
  loading: false,
  success: false,
  addSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};
const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_USERS:
    case Type.GET_USER:
      return { ...state, loading: true, success: false };
    case Type.ADD_USER:
      return { ...state, loading: true, addSuccess: false };
    case Type.UPDATE_USER:
      return { ...state, loading: true, updateSuccess: false };
    case Type.DELETE_USER:
      return { ...state, loading: true, deleteSuccess: false };
    case Type.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        usersData: { data: action.datas, pagination: action.pagination },
      };
    case Type.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload.data,
      };
    case Type.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        addSuccess: true,
      };
    case Type.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSuccess: true,
      };
    case Type.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: true,
      };
    case Type.GET_USERS_FAIL:
    case Type.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case Type.ADD_USER_FAIL:
      return {
        ...state,
        loading: false,
        addSuccess: false,
      };
    case Type.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        updateSuccess: false,
      };
    case Type.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      };
    default:
      return state;
  }
};
export default UserReducers;
