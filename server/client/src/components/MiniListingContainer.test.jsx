import React from 'react';
import { mount } from 'enzyme';

import { withRouter } from '../setupTests';
import MiniListing from './MiniListingContainer';

describe('MiniListing', () => {
	it('does not crash', () => {
		withRouter(mount, <MiniListing />);
	});

	it('Link is correct', () => {
		const wrapper = withRouter(mount, <MiniListing _id="123" />);
		expect(wrapper.find('Link').props().to).toEqual('/listing/123');
	});
});