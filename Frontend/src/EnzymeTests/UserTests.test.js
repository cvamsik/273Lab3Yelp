import React from 'react';
import { shallow, mount, render } from '../enzyme';
// import Login from '../components/Common/Login/Login'
import CustomerProfile from '../components/Customer/Profile/CustomerProfile'
describe('Restaurant Profile Page Test Suite', () => {

    it('should render the form', () => {
        const wrapper = shallow(<CustomerProfile />);

        expect(wrapper.find('#fileinput').exists()).toBe(true);
        expect(wrapper.find('form').exists()).toBe(true);
        expect(wrapper.find('input').exists()).toBe(true);
    })


    it('should change the state of the input component', () => {

        const wrapper = shallow(<CustomerProfile />);
        wrapper.find('#email_id').simulate('change',
            {
                target: { id: 'email_id', value: 'Test@Email' }
            });

        expect(wrapper.state('email_id')).toEqual('');
    })
    it('should change the state of the input component', () => {

        const wrapper = shallow(<CustomerProfile />);
        wrapper.find('#contact').simulate('change',
            {
                target: { name: 'contact', value: '123456789' }
            });

        expect(wrapper.state('contact')).toEqual('123456789');
    })
})

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