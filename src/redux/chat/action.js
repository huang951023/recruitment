import Axios from "axios";
import { MSG_LIST, MSG_RECV } from "./actionTypes";
import io from "socket.io-client";
const socket = io('ws://localhost:8088')

const msgList = (msgs, users, _id) => {
    return {
        type: MSG_LIST,
        msgs: msgs,
        users: users,
        to_id: _id
    }
}

const receMsg = (msg, _id) => {
    return {
        type: MSG_RECV,
        msg: msg,
        id: _id
    }
}

export const sendMsg = ({form, to, msg}) => {
    return dispatch => {
        socket.emit('send', {form, to, msg})
    }
}

export const receiveMsg = () => {
    return (dispatch, getState) => {
        const _id = getState().userReducer._id
        socket.on('receive', data => {
            dispatch(receMsg(data, _id))
        })
    }
}

export const getMsgList = dispatch => {
    return (dispatch, getState) => {
        Axios.get('/user/getmsglist').then(res => {
            if (res.status === 200 && res.data.code === 1) {
                const to_id = getState().userReducer._id
                dispatch(msgList(res.data.msgs, res.data.users, to_id))
            }
        })
    }
}