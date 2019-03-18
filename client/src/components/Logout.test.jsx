import React from 'react';
import { shallow } from 'enzyme';

import { Logout } from './Logout';

describe('Logout', () => {
	it('does not crash', () => {
		shallow(<Logout logOut={() => undefined} />);
	});

	it('calls logOut', () => {
		const logOut = jest.fn();

		shallow(<Logout logOut={logOut} />);
		
		expect(logOut).toBeCalled();
	});

	it('renders null', () => {
		expect(shallow(<Logout logOut={() => undefined} />).getElement()).toEqual(null);
	});
});