import React, { Component } from 'react'
import Logo from '../../component/logo/logo';
import { List, InputItem, WhiteSpace, WingBlank, Button, Radio, Toast } from "antd-mobile";
import { connect } from "react-redux";
import { register } from '../../redux/user/action'
import { Redirect } from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '', 
            type: 'genuis'
        }

        this.handleRegister = this.handleRegister.bind(this)
    }

    handleClick(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleRegister() {
        this.props.onRegister(this.state);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.msg) failToast(nextProps.msg)
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                        <InputItem onChange={val => this.handleClick('user',val)}>
                            <div style={{backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px', marginLeft: '20px' }}></div>
                        </InputItem>
                        <InputItem onChange={val => this.handleClick('pwd', val)} type='password' placeholder='****'>密　　码</InputItem>
                        <InputItem onChange={val => this.handleClick('repeatpwd', val)} type='password' placeholder='****'>确认密码</InputItem>
                        <RadioItem onChange={() => this.handleClick('type', 'genuis')} checked={this.state.type === 'genuis'}>牛　　人</RadioItem>
                        <RadioItem onChange={() => this.handleClick('type', 'boss')} checked={this.state.type === 'BOSS'}> B O S S </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleRegister} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

function failToast(errormsg) {
    Toast.fail(errormsg, 3);
}

const mapStateToProps = state => state.userReducer

const mapDispatchProps = (dispatch) => {
    return {
        onRegister: (value) => {
            dispatch(register(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Register);