import { USER_LIST } from "./actionTypes";
import Axios from "axios";

function userList(data) {
    return {
        type: USER_LIST,
        data: data
    }
}

export function loadingList(type) {
    return dispatch => {
        Axios.get(`/user/list?type=${type}`).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                dispatch(userList(res.data.data))
            }
        })
    }
}