import React, { Component } from 'react'
import logoimg from './job.png';
import './logoStyle.css';

class Logo extends Component {
    render() {
        return (
            <div className='logo_style'>
                <img src={logoimg} alt=''/>
            </div>
        )
    }
}

export default Logo;