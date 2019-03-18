import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


configure({ adapter: new Adapter() });

export const mockStore = configureMockStore([thunk]);

export const withRouter = (func, elem, entries=['/'], index=0) => func(
	<MemoryRouter initialEntries={entries} initialIndex={index}>
		{elem}
	</MemoryRouter>
);

export const withProvider = (func, store, elem) => withRouter(func,
	<Provider store={store}>
		{elem}
	</Provider>
);