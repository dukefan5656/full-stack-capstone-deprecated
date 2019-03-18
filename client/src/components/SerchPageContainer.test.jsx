import React from 'react';
import { shallow, mount } from 'enzyme';

import { withRouter } from '../setupTests';
import Search from './SerchPageContainer';

describe('Search', () => {
	it('does not crash', () => {
		const wrapper = shallow(<Search />);
		expect(wrapper.state()).toEqual({
      searchCity: "",
      searchZip: "",
      searchType: "",
      results: []
    });
	});

	it('updates form state', () => {
		const wrapper = shallow(<Search />);
		
		const expectedState = ['searchCity', 'searchZip', 'searchType']
			.reduce((obj, key) => ({ ...obj, [key]: key }), {});

		for (const name of Object.keys(expectedState)){
			wrapper.find(`[name='${name}']`).simulate('change', { target: { value: name } });
		}
		
		expect(wrapper.state()).toEqual({ ...expectedState, results: []});
	});

	describe('handleSubmit', () => {
		it('is called', () => {
			const handleSubmit = jest.fn();
			const wrapper = withRouter(mount, <Search />);
			wrapper.find(Search).instance().handleSubmit = handleSubmit;

			wrapper.find('button[type=\'submit\']').simulate('submit');	
			expect(handleSubmit).toBeCalled();
		});

		it('updates state results', () => {
			const search = jest.fn();
			search.mockReturnValue(Promise.resolve({ json: () => Promise.resolve([{_id: 1}, {_id: 2}, {_id: 3}]) }));

			const wrapper = withRouter(mount, <Search />);
			wrapper.find(Search).instance().search = search;
	
			wrapper.find('button[type=\'submit\']').simulate('submit');
			return new Promise(resolve => setTimeout(resolve, 250)).then(() => {
				expect(wrapper.find(Search).state('results')).toEqual([{_id: 1}, {_id: 2}, {_id: 3}])
			});
		});
	});

	it('search returns array', () => 
		withRouter(mount, <Search />).find(Search).instance().search().then(response => {
			expect(response.ok);
			return response.json()
		}).then(json => {
			expect(Array.isArray(json));
		})
	);
});