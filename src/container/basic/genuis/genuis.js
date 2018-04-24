import React,{ Component } from "react";
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from "react-redux";
import { loadingList } from "../../../redux/chatTarget/action";
import { withRouter } from "react-router-dom";
import Carousels from "../../../component/carousel/carousel";

/**
 * 牛人列表
 * 
 * @class Genuis
 * @extends {Component}
 */
class Genuis extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.onLoading('boss')

    }

    componentWillReceiveProps(nextPorps) {
        this.setState({
            data: nextPorps.userList
        })
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }

    render() {
        return (
            <div>
                <Carousels/>
                <WingBlank>
                    <WhiteSpace/>
                    {this.state.data.map(v => (
                        <Card key={v._id} onClick={() => this.handleClick(v)}>
                            <Card.Header 
                                title={v.title}
                                thumb={require(`../../../component/avatarSelector/image/${v.avatar}.png`)}
                                extra={v.company}
                            />
                            <Card.Body>
                                {v.describe}
                            </Card.Body>
                        </Card>
                    ))}
                </WingBlank>
            </div>
        )
    }
}

const mapStateToProps = state => state.listReducer

const mapDispatchToProps = dispatch => {
    return {
        onLoading: (val) => {
            dispatch(loadingList(val))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Genuis));