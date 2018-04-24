import { getRedirectPath } from "../../util";
import { AUTH_SUCCESS, ERROR_MSG, LOAD_DATA, LOGOUT, MOD_INFO } from "./actionTypes";

//初始化状态
const initState = {
    msg: '',       //错误信息
    user: '',      //用户名
    pwd: '',       //密码
    type: '',      //用户类型
    redirectTo: '' //路径跳转
}

//User_reducer
export function userReducer(state = initState, action) {
    switch(action.type) {
        case AUTH_SUCCESS: {
            return {...state, redirectTo: getRedirectPath(action.data), msg: '', ...action.data}
        }
        case ERROR_MSG: {
            return {...state, msg: action.msg}
        }
        case MOD_INFO: {
            return {...state, ...action.data}
        }
        case LOAD_DATA: {
            return {...state, ...action.data}
        }
        case LOGOUT: {
            return {...initState, redirectTo: '/login'}
        }
        default:
            return state;
    }
}