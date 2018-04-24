import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from '../../redux/user/action';
/**
 * 
 * 
 * @class AuthRoute
 * @extends {React.Component}
 */
class AuthRoute extends React.Component {
    componentDidMount() {
        this.props.onLoading()
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => state.userReducer

const mapDispatchToProps = dispatch => {
    return {
        onLoading: () => {
            dispatch(loadData())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));