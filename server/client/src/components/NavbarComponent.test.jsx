import React from 'react';
import { mount } from 'enzyme';

import { withRouter } from '../setupTests';
import Navbar from './NavbarComponent';

describe('Navbar', () => {
	it('does not crash', () => {
		withRouter(mount, <Navbar />);
	});
});