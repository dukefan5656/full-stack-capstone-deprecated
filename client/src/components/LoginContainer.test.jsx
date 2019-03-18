import React from 'react';
import { shallow, mount } from 'enzyme';

import { withRouter } from '../setupTests';
import { Login } from './LoginContainer';


describe('Login', () => {
	it('does not crash', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.state()).toEqual({ email: '', password: '' });
	});

	it('updates state when inputs change', () => {
		const wrapper = shallow(<Login />);

		wrapper.find('input[name=\'email\']').simulate('change', { target: { value: 'newemail' } });
		expect(wrapper.state('email')).toEqual('newemail');
	});

	it('calls login', () => {
		const login = jest.fn();
		const wrapper = withRouter(mount, <Login login={login} />);

		wrapper.find('input[name=\'password\']').simulate('change', { target: { value: 'password' } });
		wrapper.find('button').simulate('submit');

		const { email, password } = wrapper.find(Login).state();
		expect(login).toBeCalledWith(email, password);
	});
});
