import React from 'react';
import { shallow, mount } from 'enzyme';

import { BidBoxForm } from './BidForm';


describe('BidBoxForm', () => {
	it('does not crash', () => {
		const wrapper = shallow(<BidBoxForm />);
		expect(wrapper.state('amount')).toEqual(0);
	});

	it('updates state when amount is changed', () => {
		const wrapper = shallow(<BidBoxForm />);

		wrapper.find('input').simulate('change', { target: { value: '123' } });
		expect(wrapper.state('amount')).toEqual('123');
	});

	it('calls bid', () => {
		const bid = jest.fn();
		const wrapper = mount(<BidBoxForm listingId="abc" bid={bid} />);

		wrapper.find('input').simulate('change', { target: { value: '123' } });
		wrapper.find('button').simulate('submit');
		expect(bid).toBeCalledWith('123', 'abc')
	})
});
