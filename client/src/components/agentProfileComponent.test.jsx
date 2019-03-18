import React from 'react';
import { mount } from 'enzyme';

import { mockStore, withRouter, withProvider } from '../setupTests';
import { Agent } from './agentProfileComponent';


describe('Agent', () => {
	it('does not crash', () => {
		withRouter(mount, <Agent getPayload={() => Promise.resolve()} bids={[]} />);
	});

	it('requests payload on mount', () => {
		const getPayload = jest.fn();
		getPayload.mockReturnValue(Promise.resolve());

		withRouter(mount, <Agent getPayload={getPayload} bids={[]} />);

		expect(getPayload).toBeCalled();
	});

	it('has elements', () => {
		const createBid = id => ({ _id: id, user: { local: {} }, listing: { user: {} } });
		const bids = [ createBid(0), createBid(1), createBid(2) ];

		const store = mockStore({ currentUser: {} });
		const wrapper = withProvider(mount, store, <Agent getPayload={() => Promise.resolve()} bids={bids} />);

		return new Promise(resolve => setTimeout(resolve, 100)).then(() => {
			wrapper.update();

			expect(wrapper.exists('NavBar'));
			expect(wrapper.exists('Link'));
			expect(wrapper.find('Connect(BidBox)').length).toEqual(3);
		});
	});
});
