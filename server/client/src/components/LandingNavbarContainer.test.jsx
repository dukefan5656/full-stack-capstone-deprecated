import React from 'react';
import { shallow } from 'enzyme';

import LandingNavbar from './LandingNavbarContainer';

describe('LandingNavbar', () => {
	it('does not crash', () => {
		shallow(<LandingNavbar />);
	});
});