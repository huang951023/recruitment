import React, { Component } from 'react';
import { InputItem, TextareaItem, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import AvatarSelector from '../../component/avatarSelector/avatarSelector';
import { auth_success } from '../../redux/user/action';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Nav from '../nav/nav';

class BossInfo extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            company: '',
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
                <Nav bar='BOSS信息完善'/>
                <WhiteSpace />
                <AvatarSelector selectAvatar={ (imageName) => {
                    this.setState({
                        avatar: imageName
                    })
                }}></AvatarSelector>
                <InputItem onChange={val => this.onChange('title', val)}>招聘职位</InputItem>
                <InputItem onChange={val => this.onChange('company', val)}>公司名称</InputItem>
                <InputItem onChange={val => this.onChange('salary', val)}>职位薪资</InputItem>
                <TextareaItem
                    title="职位要求"
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

export default connect(mapStateToProps, mapDispatchToProps)(BossInfo);