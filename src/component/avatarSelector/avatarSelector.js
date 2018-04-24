import React, { Component } from "react";
import { Grid, List } from 'antd-mobile';
import { PropTypes } from "prop-types";
import './avatar.css'

class AvatarSelector extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const avatarList = 'boy,girl,boss,man,woman,boy2,job,koala,tiger,chick'
                            .split(',')
                            .map(v => ({
                                icon: require(`./image/${v}.png`),
                                text: v
                            }))
        const selected = this.state.icon ? (<div className='avatar_selected'>
                                                <span className='avatar_text'>选择头像</span>
                                                <img alt= '' className='avatar_image' src={this.state.icon}/>
                                            </div>)
                                            : (<div className='avatar_selected'>
                                                <span className='avatar_text'> 选择头像</span>
                                            </div>)

        return (
            <div>
                <List>
                    <Grid data={avatarList}
                        carouselMaxRow={2} 
                        columnNum={5}
                        onClick={e => {
                            this.setState(e)
                            this.props.selectAvatar(e.text)
                        }}
                    />
                    {selected}
                </List>
            </div>
        )
    }
}

AvatarSelector.propTypes = {
    selectAvatar: PropTypes.func.isRequired
}

export default AvatarSelector;