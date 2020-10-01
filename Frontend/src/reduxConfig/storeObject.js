export const initialState = {
    counter: 1,
    loggedIn: false,
    cart: [],
    login: {
        email_id: "",
        password: "",
        authFlag: ""
    },
    signup: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        about: "",
        phone: "",
        userType: "1",
        thingsLoved: "",
        findMe: "",
        blogs: ""
    },
    profile: {
        _id: 0,
        MODIFIED: "",
        disabled: true,
        editstate: false,
        oldDetails: {},
    }
}