import React,{ Component } from "react";
import { connect } from "react-redux";
import { Result, List, Switch, Button, WhiteSpace, Modal, Picker } from "antd-mobile";
import browserCookie from "browser-cookies";
import { logOut } from "../../../redux/user/action";
import { withRouter, Redirect } from "react-router-dom";
import { showNav, setBarColor } from "../../../redux/navbar/navbar.redux";
const alert = Modal.alert;

/**
 * 个人中心组件
 * 
 * @class UserInfo
 * @extends {Component}
 */
class UserInfo extends Component {
    constructor(props) {
        super(props)
        this.showAlert = this.showAlert.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.changeColor = this.changeColor.bind(this)
        this.state = {
            data: [
                {
                    label: 'light',
                    value: 'light'
                },
                {
                    label: 'dark',
                    value: 'dark'
                }
            ]
        }
    }

    showAlert() {
        alert('注销', '确认退出', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确认', onPress: () => {
                browserCookie.erase('user_id')
                this.props.onLogOut()
            }},
        ]);
    } 

    handleClick() {
        this.props.onShowNav()
    }

    changeColor(val) {
        this.props.onHandleClick(val)
    }

    render() {
        const color = this.props.navReducer.navBarColor
        return this.props.userReducer.user ? (
            <div>
                <Result 
                    img={<img src={require(`../../../component/avatarSelector/image/${this.props.userReducer.avatar}.png`)} alt=''/>}
                    title={this.props.userReducer.user}
                    message={this.props.userReducer.type === 'boss' ? this.props.userReducer.company : null}
                />
                <List renderHeader={() => '简介'}>
                    <List.Item>
                        {this.props.userReducer.title}
                        {this.props.userReducer.describe.split('\n').map(v => (
                            <List.Item.Brief key={v}>{v}</List.Item.Brief>
                        ))}
                    </List.Item>
                </List>
                <List renderHeader={() => '设置'} className='my-list'>
                <List.Item arrow="horizontal" platform="android" onClick={() => this.props.history.push('/modinfo')}>设置</List.Item>
                <List.Item extra={<Switch checked={this.props.navReducer.shownav} onChange={this.handleClick} />}>导航栏</List.Item>
                <Picker data={this.state.data} 
                        cols={1} 
                        className="forss"
                        title='选择导航栏颜色'
                        extra={color}
                        onChange={(val) => {
                            console.log(val[0])
                            this.changeColor(val[0])}}
                >
                    <List.Item arrow="horizontal" key='222'>导航栏颜色</List.Item>
                </Picker>
                </List>
                <WhiteSpace size='lg'/>
                <Button type='primary' onClick={this.showAlert}>退出登录</Button>
            </div>
        ) : <Redirect to={this.props.userReducer.redirectTo}/>
    }
}

const mapStateToProps = state => {
    return {
        userReducer: state.userReducer,
        navReducer: state.navReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => {
            dispatch(logOut())
        },
        onShowNav: () => {
            dispatch(showNav())
        },
        onHandleClick: (val) => {
            dispatch(setBarColor(val))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo)) ;