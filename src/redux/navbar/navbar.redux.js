const SHOW_NAV = 'show_nav'
const BAR_COLOR = 'bar_color'

export const showNav = () => {
    return {
        type: SHOW_NAV,
    }
}

export const setBarColor = color => {
    return {
        type: BAR_COLOR,
        barColor: color
    }
}

const initState = {
    shownav: true,
    navBarColor: 'light'
}

export function navReducer(state = initState, action) {
    switch(action.type) {
        case SHOW_NAV: {
            return {...state, shownav: !state.shownav}
        }
        case BAR_COLOR: {
            return {...state, navBarColor: action.barColor}
        }
        default: 
            return state
    }
}