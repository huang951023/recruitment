import React, { Component } from "react";
import { InputItem, List, Grid } from "antd-mobile";
import { sendMsg, receiveMsg, getMsgList } from "../../../redux/chat/action";
import { connect } from "react-redux";
import Nav from "../../nav/nav"
import { getChatId } from "../../../util";
import { emoji } from "../../../component/Emoji/emoji";
const Item = List.Item


class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {text: '', showGird: false}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const form = this.props.userReducer._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.onSendMsg({form, to, msg})
        this.setState({
            text: ''
        })
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.onGetMsgList();
            this.props.onReceMsg();
        }
    }

    fixCarousel() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        },0)
    }

    render() {
        const Emoji = emoji.split(',').map(v => ({text: v}))
        const userId = this.props.match.params.user
        const users = this.props.chat.users
        if(!users[userId]) return null
        const chatId = getChatId(this.props.userReducer._id, userId)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chat_id === chatId)
        return (
            <div>
                <Nav bar={users[userId].name}/>
                <div id='chat-me'>
                    {chatmsgs.map(v => {
                        const avatar = require(`../../../component/avatarSelector/image/${users[v.form].avatar}.png`)
                        return userId === v.form ? (
                            <div key={v._id}>
                                <List>
                                    <Item thumb={avatar}>{v.content}</Item>
                                </List>
                            </div>) : (
                            <div id='me' key={v._id}>
                                <List >
                                    <Item 
                                        extra={<img src={avatar} alt=''/>}
                                    >{v.content}</Item>
                                </List>
                            </div>)
                    })}
                </div>
                <div className='stick-footer'>
                    <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={v => this.setState({text: v})}
                        extra={
                        <div>
                            <span onClick={() => {
                                this.setState({showGird: !this.state.showGird})
                                this.fixCarousel()
                            }}>
                                <img src={require('../../../component/Emoji/Smile.png') } alt='' className='chat-page-emoji'/>
                            </span>
                            <span onClick={() => {
                                this.handleClick()
                                if(this.state.showGird) {
                                    this.setState({showGird: !this.state.showGird})
                                }
                            }} className='chat-page-submit'>发送</span>
                        </div>}
                    ></InputItem>
                    {this.state.showGird ? (<Grid
                        data={Emoji}
                        columnNum={9}
                        hasLine={false}
                        isCarousel={true}
                        carouselMaxRow={4}
                        onClick={v => {
                            this.setState({
                                text: this.state.text + v.text
                            })
                        }}
                    >
                    </Grid>) : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
    return {
        onSendMsg: (V) => {
            dispatch(sendMsg(V))
        },
        onReceMsg: () => {
            dispatch(receiveMsg())
        },
        onGetMsgList: () => {
            dispatch(getMsgList())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat); 