import React from 'react';
import { shallow, mount, render } from '../enzyme';
// import Login from '../components/Common/Login/Login'
import LandingPage from '../components/Common/LandingPage/LandingPage'
describe('Landing Page Test Suite', () => {

    it('should render the form', () => {
        const wrapper = shallow(<LandingPage />);

        expect(wrapper.find('form').exists()).toBe(true);
        expect(wrapper.find('button').exists()).toBe(true);
        expect(wrapper.find('input').exists()).toBe(true);
    })
})

// describe('Email Test Suite', () => {

//     it('should change the state of the Login component', () => {

//         const wrapper = shallow(<Login />);
//         wrapper.find('#email').simulate('blur',
//             {
//                 target: { name: 'email', value: 'logrocket@mail.com' }
//             });

//         expect(wrapper.state('email')).toEqual('logrocket@mail.com');
//     })
// })

// describe('Password Test Suite', () => {

//     it('should change the state of the Login component', () => {

//         const wrapper = mount(<Login />);
//         wrapper.find('#password').simulate('blur',
//             {
//                 target: { name: 'password', value: 'my log is rocket' }
//             });

//         expect(wrapper.state('password')).toEqual('my log is rocket');
//     })
// })