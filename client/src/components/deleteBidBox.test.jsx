import React from 'react';
import { shallow } from 'enzyme';

import DeleteBidBox from './deleteBidBox';

describe('DeleteBidBox', () => {
	it('does not crash', () => {
		shallow(<DeleteBidBox deleteBid={() => undefined} />);
	});

	it('calls deleteBid correctly', () => {
		const deleteBid = jest.fn();

		const wrapper = shallow(<DeleteBidBox bidId={123} deleteBid={deleteBid} />);
		wrapper.find('button').simulate('click');
		
		expect(deleteBid).toBeCalledWith(123);
	});
});