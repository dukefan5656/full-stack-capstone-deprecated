import React from 'react';
import { mount } from 'enzyme';

import { withProvider, mockStore } from '../setupTests';
import MiniSellerListings from './MiniSellerListingsComponent';

describe('MiniSellerListings', () => {
	it('does not crash', () => {
		withProvider(mount, mockStore(), <MiniSellerListings image="./styles/images/condo-1.jpg" />);
	});

	it('Link is correct', () => {
		const store = mockStore({ entities: { listings: { 123: { bids: [] }}}});

		const wrapper = withProvider(mount, store, <MiniSellerListings _id="123" image="./styles/images/condo-1.jpg" />);

		expect(wrapper.find('Link').props().to).toEqual('/listing/123');
	});
});