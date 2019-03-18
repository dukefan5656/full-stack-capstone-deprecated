import React from 'react';
import { shallow, mount } from 'enzyme';

import { Signup } from './SignupContainer';


describe('Signup', () => {
	it('does not crash', () => {
		const wrapper = shallow(<Signup />);
		expect(wrapper.state()).toEqual({ email: '', password: '', type: '' });
	});

	it('updates state when inputs change', () => {
		const wrapper = shallow(<Signup />);

		wrapper.find('input[name=\'email\']').simulate('change', { target: { value: 'newemail' } });
		expect(wrapper.state('email')).toEqual('newemail');
	});

	it('calls signup', () => {
		const signup = jest.fn();
		const wrapper = mount(<Signup signup={signup} />);

		wrapper.find('input[name=\'password\']').simulate('change', { target: { value: 'password' } });
		wrapper.find('input[name=\'type\'][value=\'agent\']').simulate('change', { target: { value: 'agent' } });
		wrapper.find('input[name=\'type\'][value=\'seller\']').simulate('change', { target: { value: 'seller' } });
		wrapper.find('button').simulate('submit');
		const { email, password, type } = wrapper.state();
		expect(signup).toBeCalledWith(email, password, type);
	});
});
