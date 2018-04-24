import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './container/login/login';
import Register from './container/register/register';
import store from './redux/Store';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GenuisInfo from './container/genuisinfo/genuisinfo';
import Basic from './container/basic/basic';
import Chat from './container/basic/chat/chat';
import ModInfo from './container/basic/modInfo/modInfo';
import './index.css';

ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/login' component={Login} ></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/genuisinfo' component={GenuisInfo}></Route>
                        <Route path='/chat/:user' component={Chat}></Route>
                        <Route path='/modinfo' component={ModInfo}></Route>
                        <Route component={Basic}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
);

registerServiceWorker();
