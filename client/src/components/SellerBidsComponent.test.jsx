import React from 'react';
import { shallow } from 'enzyme';

import ReceivedBids from './SellerBidsComponent';

describe('ReceivedBids', () => {
	it('does not crash', () => {
		shallow(<ReceivedBids />);
	});

	it('renders props', () => {
		const wrapper = shallow(<ReceivedBids agent="agent" amount="0" />)
		expect(wrapper.find('li').map(li => li.text())).toEqual(['agent', '0']);
	});
})