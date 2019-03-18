import React from 'react';
import { shallow } from 'enzyme';

import NoListing from './noListing';

describe('NoListing', () => {
	it('does not crash', () => {
		shallow(<NoListing />);
	});

	it('renders components', () => {
		const wrapper = shallow(<NoListing />);
		expect(wrapper.exists('NavBar'));
		expect(wrapper.exists('Link'));
	});
});