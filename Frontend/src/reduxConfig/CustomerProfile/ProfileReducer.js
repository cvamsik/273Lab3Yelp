import actionTypes from '../actionTypes'
import { initialState } from '../storeObject'

const ProfileReducer = (state = initialState, action) => {
    // console.log("load --------" + JSON.stringify(action))

    switch (action.type) {
        case actionTypes.PROFILE_UPDATE_OLD_DETAILS:
            console.log("In Profile Reducer");

            return {
                ...state,
                profile: {
                    ...state.profile,
                    oldDetails: {
                        ...state.profile.oldDetails,
                        ...action.payload
                    }
                }
            }
        case actionTypes.PROFILE_LOAD_DETAILS:
            {
                console.log("In Profile load");
                return {
                    ...state,
                    loggedIn: true,
                    signup: {
                        ...action.payload
                    },
                    profile: {
                        ...state.profile,
                        oldDetails: {
                            ...state.profile.oldDetails,
                            ...action.payload
                        }
                    }
                }
            }
        case actionTypes.PROFILE_EDIT_STATE:
            console.log("In Profile edit state");

            return {
                ...state,
                profile: {
                    ...state.profile,
                    editstate: !state.profile.editstate,
                    disabled: !state.profile.disabled
                }
            }

        case actionTypes.PROFILE_CANCEL_EDIT:
            console.log("In Profile cancel edit");

            return {
                ...state,
                signup: {
                    ...state.profile.oldDetails
                }
            }

        case actionTypes.SIGNUP_NAME:
            // let temp = {
            //     ...state,
            //     signup: {
            //         ...state.signup,
            //         name: action.payload
            //     }
            // }
            // console.log(temp)
            return {
                ...state,
                signup: {
                    ...state.signup,
                    customer_name: action.payload
                }
            }


        case actionTypes.SIGNUP_BIRTHDAY:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    birthday: action.payload
                }
            }
        case actionTypes.SIGNUP_ABOUT:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    about: action.payload
                }
            }
        case actionTypes.SIGNUP_PHONE:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    contact_number: action.payload
                }
            }
        case actionTypes.SIGNUP_USERTYPE:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    user_type: action.payload
                }
            }
        case actionTypes.SIGNUP_THINGS_LOVED:
            // let temp2 = {
            //     ...state,
            //     signup: {
            //         ...state.signup,
            //         thingsLoved: action.payload
            //     }
            // }
            // console.log(temp2);
            return {
                ...state,
                signup: {
                    ...state.signup,
                    things_loved: action.payload
                }
            }
        case actionTypes.SIGNUP_FIND_ME:
            return {
                ...state,
                signup: {
                    ...state.signup,
                    find_me: action.payload
                }
            }
        case actionTypes.SIGNUP_BLOGS:
            // console.log("blog edit")
            // console.log({
            //     ...state,
            //     signup: {
            //         ...state.signup,
            //         blog_ref: action.payload
            //     }
            // })
            return {
                ...state,
                signup: {
                    ...state.signup,
                    blog_ref: action.payload
                }
            }
        default:
            return state;
    }
}

export default ProfileReducer;