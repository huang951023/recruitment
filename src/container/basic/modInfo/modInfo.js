import React, { Component } from "react";
import Nav from "../../nav/nav";
import AvatarSelector from "../../../component/avatarSelector/avatarSelector";
import { connect } from "react-redux";
import { InputItem, TextareaItem, WhiteSpace, Button, Modal, Toast } from "antd-mobile";
import { updataInfo } from "../../../redux/user/action";
const alert = Modal.alert;

class ModInfo extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.state = {
            title: '',
            company: '',
            salary: '',
            describe: '',
            avatar: ''
        }
        this.showAlert = this.showAlert.bind(this)
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    componentWillMount() {
        this.setState({
            ...this.props.userReducer
        })
    }

    componentWillReceiveProps(nextProps) {
        Toast.success('修改成功！！！')
    }

    showAlert() {

        alert('设置', '确认修改用户信息吗?', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确认', onPress: () => {
                this.props.onHandleClick(this.state)
            }},
        ]);
    }
    
    render() {
        console.log(this.props)
        return(
            <div>
                <Nav />
                <AvatarSelector selectAvatar={(v)=>{this.onChange('avatar', v)}}/>
                {this.props.userReducer.type === 'genuis' ? (
                    <div>
                    <InputItem onChange={val => this.onChange('title', val)}>求职职位</InputItem>
                    <InputItem onChange={val => this.onChange('salary', val)}>期望薪资</InputItem>
                    <TextareaItem
                    title="个人简介"
                    rows={6}
                    labelNumber={5}
                    onChange={val => this.onChange('describe', val)}
                />
                    </div>
                ) : (
                    <div>
                        <InputItem onChange={val => this.onChange('title', val)}>招聘职位</InputItem>
                        <InputItem onChange={val => this.onChange('company', val)}>公司名称</InputItem>
                        <InputItem onChange={val => this.onChange('salary', val)}>职位薪资</InputItem>
                        <TextareaItem
                            title="职位要求"
                            rows={6}
                            labelNumber={5}
                            onChange={val => this.onChange('describe', val)}
                        />
                    </div>
                )}
                <WhiteSpace />
                <Button type='primary' onClick={this.showAlert}>设置</Button>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
    return {
        onHandleClick: (v) => {
            dispatch(updataInfo(v))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModInfo);