import actionTypes from './actionTypes'

let initialState = {
    loggedIn: false
}

const loginReducer = (state = initialState, action) => {
    console.log("In login Reducer");
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            console.log("logging in");
            return state;
            break;
        case actionTypes.USER_LOGOUT:
            console.log("logging out");
            return state;
            break;
        default:
            return state;
            break;
    }
}

export default loginReducer;