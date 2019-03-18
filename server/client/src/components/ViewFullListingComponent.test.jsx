import React from 'react';
import { shallow } from 'enzyme';

import { FullListing } from './ViewFullListingComponent';

const createGetListing = () => {
	const gl = jest.fn();
	gl.mockReturnValue(new Promise(resolve => resolve()));
	return gl;
}

const props = {
	match: {
		params: {
			id: 0
		}
	},
	getListing: createGetListing()
}


describe('FullListing', () => {
	test('does not crash', () => {
		shallow(<FullListing {...props} />);
	});

	test('calls getPayload', () => {
		const getListing = createGetListing();
		shallow(<FullListing {...props} getListing={getListing} />);
		expect(getListing).toBeCalled();
	});

	test('shows text for non-existant listings', () => {
		const wrapper = shallow(<FullListing {...props} />);
		expect(wrapper.find('h1').text()).toEqual('Loading');

		return new Promise(resolve => setTimeout(resolve, 100)).then(() => {
			expect(wrapper.exists('NoListing'));
		});
	});

	test('renders components', () => {
		const createBid = id => ({ _id: id, user: { local: {} }, listing: { user: {} } });

		const listing = { user: {}, bids: [ createBid(0), createBid(1), createBid(2) ] };
		const wrapper = shallow(<FullListing {...props} listing={listing} />);

		return new Promise(resolve => setTimeout(resolve, 100)).then(() => {
			expect(wrapper.exists('DeleteBox'));
			expect(wrapper.exists('Link'));
			expect(wrapper.find('Connect(BidBox)').length).toEqual(3);
		});
	})
});