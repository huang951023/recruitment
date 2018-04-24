import { MSG_LIST, MSG_RECV } from "./actionTypes";

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

export function chat(state = initState, action) {
    switch(action.type) {
        case MSG_LIST: {
            return {
                ...state, 
                users: action.users, 
                chatmsg: action.msgs, 
                unread: action.msgs.filter(v => !v.read && v.to === action.to_id).length
            }
        }
        case MSG_RECV: {
            let n = action.id === action.msg._id ? 1 : 0
            return {...state, chatmsg: [...state.chatmsg, action.msg], unread: state.unread + n}
        }
        // case MSG_READ: {
        //     return
        // }
        default:
            return state
    }
}