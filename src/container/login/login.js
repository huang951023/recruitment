import React, { Component } from 'react'
import Logo from '../../component/logo/logo';
import { List, InputItem, WhiteSpace, WingBlank, Button, Toast } from "antd-mobile";
import { connect } from 'react-redux';
import { login } from '../../redux/user/action';
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)
        this.linkRegister = this.linkRegister.bind(this)
        this.state = {
            user: '',
            pwd: '',
            msg: '',
        }

        this.handleClick = this.handleClick.bind(this)
    }

    linkRegister() {
        this.props.history.push('/register')
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleClick() {
        this.props.onLogin(this.state)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.msg) failToast(nextProps.msg)
    }


    render() {
        return (
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null } 
                        <InputItem onChange={value => this.handleChange('user', value)}>
                            <div style={{backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }}></div>
                        </InputItem>
                        <InputItem onChange={value => {this.handleChange('pwd', value)}} type='password' placeholder='****'>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleClick}>登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.linkRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

function failToast(errormsg) {
    Toast.fail(errormsg, 3);
}

const mapStateToProps = state => state.userReducer

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (value) => {
            dispatch(login(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);