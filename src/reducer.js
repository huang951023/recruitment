import { combineReducers } from 'redux';
import { userReducer } from "./redux/user/reducer";
import { listReducer } from './redux/chatTarget/reducer';
import { chat } from './redux/chat/reducer';
import { navReducer } from './redux/navbar/navbar.redux';

export default combineReducers({userReducer, listReducer, chat, navReducer});
