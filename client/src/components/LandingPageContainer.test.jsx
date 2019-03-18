import React from 'react';
import { mount } from 'enzyme';

import { withRouter } from '../setupTests';
import LandingPage from './LandingPageContainer';

describe('LandingPage', () => {
	it('does not crash', () => {
		withRouter(mount, <LandingPage />);
	});
});