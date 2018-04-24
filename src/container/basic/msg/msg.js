import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";
const Item = List.Item
const Brief = Item.Brief

class Msg extends Component {
    render() {
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chat_id] = msgGroup[v.chat_id] || []
            msgGroup[v.chat_id].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a, b) => {
            let a_last = a[a.length - 1].create_time
            let b_last = b[b.length - 1].create_time
            return a_last - b_last
        })
        const chatUser = this.props.chat.users
        return (
            <div>
                <List>
                    {chatList.map(v => {
                        const id = this.props.userReducer._id === v[0].form ? v[0].to : v[0].form
                        const name = chatUser[id] ? chatUser[id].name : null
                        const avatar = chatUser[id] ? chatUser[id].avatar : null 
                        const unReadNum = v.filter(val => !val.read && val.form === id).length
                        return (<Item key={v[0]._id}
                            thumb={require(`../../../component/avatarSelector/image/${avatar}.png`)}
                            arrow='horizontal'
                            extra={<Badge text={unReadNum}></Badge>}
                            onClick={()=> this.props.history.push(`/chat/${id}`)}
                        >
                            {v[v.length-1].content}
                            <Brief>{name}</Brief>
                        </Item>)
                    })}
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(Msg);