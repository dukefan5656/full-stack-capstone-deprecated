import React from 'react';
import { shallow } from 'enzyme';

import LandingDescription from './LandingDescriptionContainer';

describe('LandingDescription', () => {
	it('does not crash', () => {
		shallow(<LandingDescription />);
	});
});