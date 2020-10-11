import React from 'react';
import { shallow, mount, render } from '../enzyme';
// import Login from '../components/Common/Login/Login'
import CreateEvent from '../components/Events/CreateEvent/CreateEvent'
describe('Event Page Test Suite', () => {

    it('should render the form', () => {
        const wrapper = shallow(<CreateEvent />);

        expect(wrapper.find('#event_name').exists()).toBe(true);
        expect(wrapper.find('form').exists()).toBe(true);
        expect(wrapper.find('input').exists()).toBe(true);
    })

    it('should change the state of the input component', () => {

        const wrapper = shallow(<CreateEvent />);
        wrapper.find('#event_name').simulate('change',
            {
                target: { name: 'event_name', value: 'Test Event' }
            });

        expect(wrapper.state('event_name')).toEqual('Test Event');
    })
    it('should change the state of the longitude component', () => {

        const wrapper = shallow(<CreateEvent />);
        wrapper.find('#event_longitude').simulate('change',
            {
                target: { name: 'event_longitude', value: '121' }
            });

        expect(wrapper.state('event_longitude')).toEqual('121');
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