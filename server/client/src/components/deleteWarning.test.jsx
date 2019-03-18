import React from 'react';
import { shallow, mount } from 'enzyme';

import DeleteBox from './deleteWarning';


describe('DeleteBox', () => {
	it('does not crash', () => {
		shallow(<DeleteBox />);
	});

	it('calls deleteListing with listingId', () => {
		const deleteListing = jest.fn();
		const wrapper = mount(<DeleteBox listingId="abc" bidIds={[0, 1]} deleteListing={deleteListing} />);

		wrapper.find('button').first().simulate('click');
		expect(deleteListing).toBeCalledWith('abc', [0, 1]);
	});
});
