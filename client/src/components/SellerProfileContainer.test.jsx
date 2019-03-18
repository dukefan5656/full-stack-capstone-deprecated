import React from 'react';
import { mount } from 'enzyme';

import { withProvider, mockStore } from '../setupTests';
import { Seller } from './SellerProfileContainer';


describe('Seller', () => {
	it('renders without crashing', () => {
		withProvider(mount, mockStore(), <Seller getPayload={() => Promise.resolve()} bids={[]} listings={[]} />);
	});

	it('calls getPayload', () => {
		const getPayload = jest.fn();
		getPayload.mockReturnValue(Promise.resolve());

		withProvider(mount, mockStore(), <Seller getPayload={getPayload} bids={[]} listings={[]} />, );

		expect(getPayload).toBeCalled();
	});

	it('has elements', () => {
		const wrapper = withProvider(mount, mockStore(), <Seller getPayload={() => Promise.resolve()} bids={[]} listings={[]} />);
		expect(wrapper.exists('NavBar'));
		expect(wrapper.exists('ListingForm'));
	});

	it('iterates over bids and listings', () => {
		const createObjCreator = rest => id => ({ ...rest, _id: id });
		const createBid = createObjCreator({ user: { local: {} }, listing: { user: {} } });
		const createListing = createObjCreator({ image: "./styles/images/condo-1.jpg", bids: [] });


		const bids = [createBid(0), createBid(1), createBid(2)];
		const listings = [createListing(0), createListing(1), createListing(2)];

		const store = mockStore({ currentUser: {}, entities: { listings: listings.reduce((obj, listing) => ({ ...obj, [listing._id]: listing }), {}) } });
		const wrapper = withProvider(mount, store, <Seller getPayload={() => Promise.resolve()} bids={bids} listings={listings} />);
		
		return new Promise(resolve => setTimeout(resolve, 100)).then(() => {
			wrapper.update();

			expect(wrapper.find('Connect(BidBox)').length).toEqual(3);
			expect(wrapper.find('MiniSellerListings').length).toEqual(3);
		});
	});
});