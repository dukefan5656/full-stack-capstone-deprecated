import React from 'react';
import { shallow } from 'enzyme';

import { BidBox } from './BidBoxContainer';


const props = {
	userId: 2,
	amount: 0,
	status: 'status',
	user: { 
		_id: 1,
		local: { email: 'bid creator email'}
	},
	listing: {
		user: { _id: 0 },
	},
	updateBid: jest.fn()
};

const listingOwnerProps = { ...props, userId: props.listing.user._id };
const bidderProps = { ...props, userId: props.user._id };


describe('BidBox', () => {
	it('does not crash', () => {
		shallow(<BidBox {...props} />);
	});

	it('returns null when hidden', () => {
		expect(shallow(<BidBox {...props} />).getElement()).toEqual(null)
	})

	it('renders when user created bid', () => {
		const wrapper = shallow(<BidBox {...bidderProps} />);
		expect(wrapper.getElement()).not.toEqual(null);
	});

	it('renders when user created listing', () => {
		const wrapper = shallow(<BidBox {...listingOwnerProps} />);
		expect(wrapper.getElement()).not.toEqual(null);
	});

	it('only listing owner can see update buttons', () => {
		const wrapper = shallow(<BidBox {...listingOwnerProps} />);
		expect(wrapper.find('button').length).toEqual(2);
	});

	it('calls updateBid correcty', () => {
		listingOwnerProps.updateBid = jest.fn();
		const wrapper = shallow(<BidBox {...listingOwnerProps} />);

		wrapper.find('button[value=\'accepted\']').simulate('click', { target: { value: 'accepted' } });
		expect(listingOwnerProps.updateBid).toBeCalledWith(props._id, 'accepted');

		wrapper.find('button[value=\'rejected\']').simulate('click', { target: { value: 'rejected' } });
		expect(listingOwnerProps.updateBid).toBeCalledWith(props._id, 'rejected');
	});
});
