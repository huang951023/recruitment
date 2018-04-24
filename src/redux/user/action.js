import Axios from "axios";
import { AUTH_SUCCESS, ERROR_MSG, LOAD_DATA, LOGOUT, MOD_INFO,  } from "./actionTypes";

//action
function authSuccess(data) {
    return {
        type: AUTH_SUCCESS,
        data: data
    }
}

const modInfo = data => {
    return {
        type: MOD_INFO,
        data: data
    }
}

function errorMsg(msg) {
    return {
        msg,
        type: ERROR_MSG
    }
}

function loadingData(data) {
    return {
        type: LOAD_DATA,
        data: data
    }
}

export function logOut() {
    return {
        type: LOGOUT
    }
}

/**
 * 异步action creator
 * 信息完善时派发
 * @export
 * @param {any} data 
 * @returns 
 */
export function auth_success(data) {
    return dispatch => {
        Axios.post('/user/updata', data).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

/**
 * 异步action creator
 * 登录时派发
 * @export
 * @param {any} {user, pwd} 
 * @returns 
 */
export function login({user, pwd}) {
    if(!user || !pwd) return errorMsg('用户名或密码为空');
    return dispatch => {
        Axios.post('/user/login', {user, pwd}).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                dispatch(authSuccess(res.data.type))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

/**
 * 异步action creator
 * 注册时派发
 * @export
 * @param {any} {user, pwd, repeatpwd, type} 
 * @returns 
 */
export function register({user, pwd, repeatpwd, type}) {
    if(!user || !pwd) return errorMsg('用户名或密码为空')
    if(pwd !== repeatpwd) return errorMsg('两次密码不相同')
    return dispatch => {
        Axios.post('/user/register', {user, pwd, type}).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                dispatch(authSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

/**
 * 异步action creator
 * 页面刷新时,根据cookie想服务器请求数据
 * @export
 * @returns 
 */
export function loadData() {
    return dispatch => {
        Axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 1) {
                    dispatch(loadingData(res.data.data))
                } else {
                }
            }
        }).catch(err => console.log(err))
    }
}

/**
 * 异步action creator
 * 修改用户属性时派发
 * @export
 * @param {any} {title, company, salary, describe, avatar} 
 * @returns 
 */
export const updataInfo = ({title, company, salary, describe, avatar}) => {
    return dispatch => {
        Axios.post('/user/modinfo', {title, company, salary, describe, avatar}).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                dispatch(modInfo(res.data.data))
            }
        })
    }
}