import React, { Component } from "react";
import { Carousel } from "antd-mobile";

class Carousels extends Component {
    constructor() {
        super()
        this.state = {
            img: [1, 2, 3, 4, 5]
        }
    }
    render() {
        return (
            <div>
                <Carousel 
                    className='carousel_style'
                    frameOverflow='hidden'
                    cellSpacing={10}
                    slideWidth={0.8}
                    autoplay
                    infinite
                >
                {this.state.img.map(v => (
                    <img src={require(`./image/${v}.jpg`)}
                    style={{ width: '100%', verticalAlign: 'top' }}
                    alt=''
                    key={v}
                    />
                ))}
                </Carousel>
            </div>
        )
    }
}

export default Carousels;