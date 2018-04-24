import { USER_LIST } from "./actionTypes";

const initState = {
    userList: []
}

export function listReducer (state = initState, action) {
    switch(action.type) {
        case USER_LIST: {
            return {...state, userList: action.data}
        }
        default: 
            return state;
    }
}