import actionTypes from './actionTypes'
let initialState = {
    counter: 1,
    loggedIn: false,
    login: {
        email_id: "",
        password: "",
        authFlag: ""
    }
}
const ProfileReducer = (state = initialState, action) => {
    console.log("In Profile Reducer");
    switch (action.type) {
        case actionTypes.USER_GET_PROFILE:
            console.log("Get user profile");
            return state;
            break;
        case actionTypes.USER_UPDATE_PROFILE:
            console.log("Update User profile");
            return state;
            break;
        default:
            return initialState;
            break;
    }
}

export default ProfileReducer;