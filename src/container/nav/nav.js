import React, { Component } from "react";
import { NavBar, Popover, Icon } from "antd-mobile";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
class Nav extends Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            selected: '',
        }
    }

    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };

    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };

    render() {
        return this.props.navReducer.shownav ? (
            <div>
                <NavBar
                    mode={this.props.navReducer.navBarColor}
                    icon={<Icon type='left'/>}
                    onLeftClick={() => {this.props.history.goBack()}}
                    rightContent={
                    <Popover mask
                        overlayClassName="fortest"
                        overlayStyle={{ color: 'currentColor' }}
                        visible={this.state.visible}
                        overlay={[
                            (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">扫一扫</Item>),
                            (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>二维码</Item>),
                            (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                            <span style={{ marginRight: 5 }}>帮助</span>
                            </Item>),
                        ]}
                        align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                        }}
                        onVisibleChange={this.handleVisibleChange}
                        onSelect={this.onSelect}
                    >
                        <div style={{
                            height: '100%',
                            padding: '0 15px',
                            marginRight: '-15px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                            <Icon type="ellipsis" />
                        </div>
                    </Popover>
                }
                >{this.props.bar}</NavBar>
            </div>
        ) : null
    }
}

const mapStateToProps = state => state


export default withRouter(connect(mapStateToProps, null)(Nav));