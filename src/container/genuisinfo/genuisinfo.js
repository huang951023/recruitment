import React, { Component } from 'react';
import { InputItem, TextareaItem, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import AvatarSelector from '../../component/avatarSelector/avatarSelector';
import { auth_success } from '../../redux/user/action';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Nav from '../nav/nav';

class GenuisInfo extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            salary: '',
            describe: '',
            avatar: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    onSubmit() {
        this.props.onAuthSuccess(this.state)
    }

    render() {
        const path = this.props.location.pathname;
        const redirectTo = this.props.redirectTo;
        return (
            <div>
                {redirectTo && redirectTo !== path? <Redirect to={redirectTo}></Redirect> : null }
                <Nav bar='牛人信息完善'/>
                <WhiteSpace />
                <AvatarSelector selectAvatar={ (imageName) => {
                    this.setState({
                        avatar: imageName
                    })
                }}></AvatarSelector>
                <InputItem onChange={val => this.onChange('title', val)}>求职职位</InputItem>
                <InputItem onChange={val => this.onChange('salary', val)}>期望薪资</InputItem>
                <TextareaItem
                    title="个人简介"
                    rows={4}
                    autoHeight
                    labelNumber={5}
                    onChange={val => this.onChange('describe', val)}
                />
                <WhiteSpace size='xl'/>
                <WingBlank >
                    <Button type='primary' onClick={this.onSubmit}>完成</Button>
                </WingBlank>

            </div>);
    }
}

const mapStateToProps = state => state.userReducer

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthSuccess: (value) => {
            dispatch(auth_success(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenuisInfo);