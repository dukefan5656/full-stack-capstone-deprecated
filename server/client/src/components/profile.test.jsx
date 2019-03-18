import React from 'react';
import { shallow } from 'enzyme';

import { Profile } from './profile';

describe('Profile', () => {
	it('renders without crashing', () => {
		shallow(<Profile />);
	});

	it('renders seller profile', () => {
		const wrapper = shallow(<Profile userType="seller" />);
		expect(wrapper.exists('Connect(Seller)'));
	});

	it('renders agent profile', () => {
		const wrapper = shallow(<Profile userType="agent" />);
		expect(wrapper.exists('Connect(Agent)'));
	});
});