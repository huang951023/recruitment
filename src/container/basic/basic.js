import React, { Component } from "react";
import { connect } from "react-redux";
import Boss from "./boss/boss";
import { Switch, Route } from "react-router-dom";
import { TabBar } from "antd-mobile";
import Genuis from "./genuis/genuis";
import UserInfo from "./userInfo/userInfo";
import { receiveMsg, getMsgList } from "../../redux/chat/action";
import Nav from "../nav/nav";
import Msg from "./msg/msg";

/**
 * 
 * 
 * @class Basic
 * @extends {Component}
 */
class Basic extends Component {
    constructor() {
        super()
        this.state = {
            shownav: true
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.onGetMsgList();
            this.props.onReceMsg();
        }
    }

    render() {
        const user = this.props
        const { pathname } = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'list',
                title: '牛人列表',
                component: Boss,
                hide: user.userReducer.type === 'genuis'
            },
            {
                path: '/genuis',
                text: '找工作',
                icon: 'list',
                title: '工作列表',
                component: Genuis,
                hide: user.userReducer.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'friend',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/personal',
                text: '我的',
                icon: 'user',
                title: '个人中心',
                component: UserInfo
            }
        ];

        return (
            <div>
                {this.state.shownav ? (<Nav bar={navList.find(v => v.path === pathname).title} />) : null}
                <div>
                    <Switch>
                        {navList.map(val => 
                            <Route key={val.path} path={val.path} component={val.component}/>
                        )}
                    </Switch>
                </div>
                <TabBar>
                    {navList.filter(v => !v.hide).map(v => (
                        <TabBar.Item
                            badge={v.path === '/msg' ? this.props.chat.unread : 0}
                            key={v.path}
                            title={v.text}
                            icon={{uri: require(`./footBar/image/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./footBar/image/${v.icon}-active.png`)}}
                            selected={pathname === v.path}
                            onPress={() => {
                                if(pathname !== v.path) {
                                    this.props.history.push(v.path)
                                }
                            }}
                        ></TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
    return {
        onReceMsg: () => {
            dispatch(receiveMsg())
        },
        onGetMsgList: () => {
            dispatch(getMsgList())
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Basic);