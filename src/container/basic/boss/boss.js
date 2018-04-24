import React,{ Component } from "react";
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from "react-redux";
import { loadingList } from "../../../redux/chatTarget/action";
import Carousels from "../../../component/carousel/carousel";

class Boss extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.onLoading('genuis')
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.userList
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
                                extra={v.salary}
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

export default connect(mapStateToProps, mapDispatchToProps)(Boss);